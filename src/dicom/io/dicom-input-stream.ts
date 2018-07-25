// tslint:disable:no-implicit-dependencies
import {
    AnyDicomElement,
    DicomStreamToken,
    DicomInputStream as DicomInputStreamInterface,
    DicomInputStreamConfig,
    DicomPath,
    SequenceItemPath,
    DicomElementPath,
    FilePreambleToken, DicomPrefixToken, DicomElement,
    SequenceEndToken,
    ItemEndToken,
} from "WebDicom";
// tslint:enable:no-implicit-dependencies

import {InputStream} from "../../blobs/streams";
import {assertNotNull} from "../../helpers/assertions";
import {
    FILE_META_INFO_PREAMBLE_LENGTH,
    FILE_META_INFO_SIGNATURE_LENGTH,
} from "./dicom-file-tokens";
import {ExplicitVrReader} from "./transferSyntax/explicit-vr-reader";
import {Tags} from "../dictionary/tags";
import {WebDicomError} from "../../web-dicom-error";
import {TransferSyntaxes} from "../dictionary/transfer-syntaxes";
import {TransferSyntaxReader} from "./transferSyntax/transfer-syntax-reader";
import {ImplicitVrReader} from "./transferSyntax/implicit-vr-reader";
import {RootDataSetPath} from "../core/path";
import {UNDEFINED_LENGTH_32} from "../core/element";
import {isGroupLength, isItemSupport} from "../core/elements";

const FILE_META_INFO_PREFIX_LENGTH = FILE_META_INFO_PREAMBLE_LENGTH + FILE_META_INFO_SIGNATURE_LENGTH;

interface FileMetadataInfo {
    transferSyntax: string;
}

interface ExpectedEnd {
    type: "sequence" | "item";
    position: number;
}

// tslint:disable:max-classes-per-file

class ReadingState {
    public readonly reader: TransferSyntaxReader;
    public dataSetPath!: DicomPath;
    public readonly ends: ExpectedEnd[] = [];

    public constructor(input: InputStream, fileMetaInfo: FileMetadataInfo) {
        this.reader = createTransferSyntaxReader(input, fileMetaInfo.transferSyntax);
        this.setDataSetPath(new RootDataSetPath());
    }

    public startSequence(element: DicomElement<"SQ", undefined>, position: number): DicomElementPath {
        this.setDataSetPath(element.path.sequenceItem(0));
        if (element.valueLength !== UNDEFINED_LENGTH_32) {
            this.ends.push({ type: "sequence", position: position + element.valueLength });
        }
        return element.path;
    }

    public startSequenceItem(element: AnyDicomElement, position: number): SequenceItemPath {
        const itemPath: SequenceItemPath = (this.dataSetPath as SequenceItemPath).next();
        const length = element.valueLength === UNDEFINED_LENGTH_32 ? null : element.valueLength;
        this.setDataSetPath(itemPath);
        if (length != null) {
            this.ends.push({ type: "item", position: position + length });
        }
        return itemPath;
    }

    public endSequenceItem(position: number): SequenceItemPath {
        if (this.isEnded("item", position)) {
            this.ends.pop();
        }
        return this.dataSetPath as SequenceItemPath;
    }

    public endSequence(position: number): DicomElementPath {
        if (this.isEnded("sequence", position)) {
            this.ends.pop();
        }
        const sequencePath: DicomElementPath = (this.dataSetPath as SequenceItemPath).sequence;
        this.setDataSetPath(sequencePath.dataSetPath);
        return sequencePath;
    }

    public isSequenceItemEnded(position: number): boolean {
        return this.isEnded("item", position);
    }

    public isSequenceEnded(position: number): boolean {
        return this.isEnded("sequence", position);
    }

    private isEnded(type: "item" | "sequence", position: number): boolean {
        if (this.ends.length === 0) {
            return false;
        }
        const top = this.ends[this.ends.length - 1];
        return top.type === type && top.position < position;
    }

    private setDataSetPath(dataSetPath: RootDataSetPath | SequenceItemPath): void {
        this.dataSetPath = dataSetPath;
        this.reader.rebase(dataSetPath);
    }
}

export class DicomInputStream implements DicomInputStreamInterface {

    private readonly fileMetaInfo: FileMetadataInfo;
    private readonly config: DicomInputStreamConfig;

    public constructor(
            private readonly input: InputStream,
            config?: DicomInputStreamConfig) {
        assertNotNull(input, "input");
        this.fileMetaInfo = {
            transferSyntax: TransferSyntaxes.ImplicitVRLittleEndian,
        };
        this.config = config || {
            emitItemElements: false,
            emitGroupLength: false,
        };
    }

    public async * readAsync(): AsyncIterableIterator<DicomStreamToken> {
        const prefix = await this.input.readAsync(FILE_META_INFO_PREFIX_LENGTH);
        if (prefix == null) {
            throw dicomParserError(0, "invalid_prefix", "Could not read File preamble and DICOM prefix");
        }
        if (isValidDicomFilePrefix(prefix)) {
            yield preamble(prefix);
            yield dicomPrefix();
        } else {
            // TODO: Try to guess
            throw dicomParserError(0, "invalid_prefix", "File preamble and/or DICOM prefix are invalid");
        }

        yield * this.readFileMetadataInfoAsync();
        yield * this.readDicomDataSet();
    }

    private async * readDicomDataSet(): AsyncIterableIterator<DicomStreamToken> {
        const readingState = new ReadingState(this.input, this.fileMetaInfo);
        for await (const element of readingState.reader.readAsync()) {
            const position = this.input.getPosition();

            yield* enumerateLengthBasedEnds(readingState, position);

            if (this.shouldEmit(element)) {
                yield {element, type: "element"};
            }

            if (element.vr === "SQ") {
                const path = readingState.startSequence(element, position);
                yield { path, type: "sequenceBegin" };
                continue;
            }
            if (Tags.Item.tag.sameAs(element.tag)) {
                const path = readingState.startSequenceItem(element, position);
                yield { path, type: "itemBegin" };
                continue;
            }
            if (Tags.ItemDelimitationItem.tag.sameAs(element.tag)) {
                const path = readingState.endSequenceItem(position);
                yield { path, type: "itemEnd" };
                continue;
            }
            if (Tags.SequenceDelimitationItem.tag.sameAs(element.tag)) {
                const path = readingState.endSequence(position);
                yield { path, type: "sequenceEnd" };
            }
        }
    }

    private async * readFileMetadataInfoAsync(): AsyncIterableIterator<DicomStreamToken> {
        let metaInfoSize = -1;
        const reader = createTransferSyntaxReader(this.input, TransferSyntaxes.ExplicitVRLittleEndian);
        for await (const element of reader.readAsync()) {
            yield {element, type: "element"};
            if (Tags.FileMetaInformationGroupLength.matches(element)) {
                metaInfoSize = element.value[0] + FILE_META_INFO_PREFIX_LENGTH;
            }
            if (Tags.TransferSyntaxUID.matches(element)) {
                this.fileMetaInfo.transferSyntax = element.value[0];
            }

            if (metaInfoSize > 0 && this.input.getPosition() >= metaInfoSize) {
                break;
            }
        }
    }

    private shouldEmit(element: AnyDicomElement): boolean {
        if (isItemSupport(element.tag)) {
            return this.config.emitItemElements;
        }
        if (isGroupLength(element.tag)) {
            return this.config.emitGroupLength;
        }
        return true;
    }
}

function isValidDicomFilePrefix(prefix: ArrayBuffer): boolean {
    if (prefix.byteLength !== FILE_META_INFO_PREFIX_LENGTH) {
        return false;
    }
    const magicNumber = new Uint8Array(
        prefix.slice(FILE_META_INFO_PREAMBLE_LENGTH, FILE_META_INFO_PREFIX_LENGTH));

    return magicNumber[0] === 0x44
        && magicNumber[1] === 0x49
        && magicNumber[2] === 0x43
        && magicNumber[3] === 0x4D;
}

function dicomParserError(position: number, failureCode: string, failureMessage: string): WebDicomError {
    const message = failureMessage || "Failed to read DICOM file";
    return new WebDicomError(
        "parsing_failed",
        failureCode,
        `(@ ${position}) ${message}`);
}

function createTransferSyntaxReader(stream: InputStream, transferSyntax: string): TransferSyntaxReader {
    switch (transferSyntax) {
        case TransferSyntaxes.ImplicitVRLittleEndian:
            return new ImplicitVrReader(stream, 1048576);
        case TransferSyntaxes.ExplicitVRBigEndian:
            return new ExplicitVrReader(false, stream, 1048576);
        default:
            return new ExplicitVrReader(true, stream, 1048576);
    }
}

function preamble(prefix: ArrayBuffer): FilePreambleToken {
    return {
        type: "file_preamble",
        bytes: new Uint8Array(prefix.slice(0, FILE_META_INFO_PREAMBLE_LENGTH)),
    };
}

function dicomPrefix(): DicomPrefixToken {
    return {
        type: "dicom_prefix",
    };
}

function* enumerateLengthBasedEnds(state: ReadingState, position: number):
        IterableIterator<ItemEndToken | SequenceEndToken> {
    while (true) {
        if (state.isSequenceItemEnded(position)) {
            const path = state.endSequenceItem(position);
            yield { path, type: "itemEnd" };
            continue;
        }
        if (state.isSequenceEnded(position)) {
            const path = state.endSequence(position);
            yield { path, type: "sequenceEnd" };
            continue;
        }
        return;
    }
}
