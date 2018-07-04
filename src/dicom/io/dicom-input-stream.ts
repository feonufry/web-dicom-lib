// tslint:disable:no-implicit-dependencies
import {
    DicomStreamToken,
    DicomInputStream as DicomInputStreamInterface,
    DicomPath,
    SequenceItemPath,
    DicomElementPath,
    FilePreambleToken, DicomPrefixToken,
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

const FILE_META_INFO_PREFIX_LENGTH = FILE_META_INFO_PREAMBLE_LENGTH + FILE_META_INFO_SIGNATURE_LENGTH;

interface FileMetadataInfo {
    transferSyntax: string;
}

export class DicomInputStream implements DicomInputStreamInterface {

    private readonly fileMetaInfo: FileMetadataInfo;

    public constructor(private readonly input: InputStream) {
        assertNotNull(input, "input");
        this.fileMetaInfo = {
            transferSyntax: TransferSyntaxes.ImplicitVRLittleEndian,
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

        const reader = createTransferSyntaxReader(this.input, this.fileMetaInfo.transferSyntax);
        let dataSetPath: DicomPath = new RootDataSetPath();
        reader.rebase(dataSetPath);
        for await (const element of reader.readAsync()) {
            yield { element, type: "element" };
            if (element.vr === "SQ") {
                yield { type: "sequenceBegin", path: element.path };
                dataSetPath = element.path.sequenceItem(0);
                reader.rebase(dataSetPath);
                continue;
            }
            if (Tags.Item.tag.sameAs(element.tag)) {
                const itemPath: SequenceItemPath = (dataSetPath as SequenceItemPath).next();
                const length = element.valueLength === UNDEFINED_LENGTH_32 ? null : element.valueLength;
                yield { length, path: itemPath, type: "itemBegin" };
                dataSetPath = itemPath;
                reader.rebase(dataSetPath);
                continue;
            }
            if (Tags.ItemDelimitationItem.tag.sameAs(element.tag)) {
                yield { path: dataSetPath as SequenceItemPath, type: "itemEnd" };
                continue;
            }
            if (Tags.SequenceDelimitationItem.tag.sameAs(element.tag)) {
                const sequencePath: DicomElementPath = (dataSetPath as SequenceItemPath).sequence;
                yield { path: sequencePath, type: "sequenceEnd" };
                dataSetPath = sequencePath.dataSetPath;
                reader.rebase(dataSetPath);
                continue;
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
