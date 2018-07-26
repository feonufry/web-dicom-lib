
// tslint:disable-next-line:no-implicit-dependencies
import {AnyDicomElement, Tag as TagInterface, VR} from "WebDicom";

import {TransferSyntaxReader} from "./transfer-syntax-reader";
import {InputStream} from "../../../blobs/streams";
import {assertNotNull, assertRange, assertType} from "../../../helpers/assertions";
import {RootDataSetPath, SequenceItemPath} from "../../core/path";
import {dicomElement, lazyDicomElement} from "../dicom-file-tokens";
import {Tag} from "../../core/tag";
import {UNDEFINED_LENGTH_32} from "../../core/element";
import {WebDicomError} from "../../../web-dicom-error";
import {hasValue, isGroupLength, isPrivateCreator, isUnlimited} from "../../core/elements";
import {Tags} from "../../dictionary/tags";

const TAG_GROUP_OFFSET = 0;
const TAG_ELEMENT_OFFSET = 2;
const TAG_SIZE = 4;

const LENGTH_OFFSET = 4;
const LENGTH_SIZE = 4;

const EMPTY_BUFFER = new ArrayBuffer(0);

export class ImplicitVrReader implements TransferSyntaxReader {

    private dataSetPath: RootDataSetPath | SequenceItemPath = new RootDataSetPath();

    public constructor(private readonly input: InputStream,
                       private readonly lazyLoadThreshold: number) {
        assertNotNull(input, "input");
        assertNotNull(lazyLoadThreshold, "lazyLoadThreshold");
        assertType(lazyLoadThreshold, "number", "lazyLoadThreshold");
        assertRange(lazyLoadThreshold, 1, Number.POSITIVE_INFINITY, "lazyLoadThreshold");
    }

    public rebase(path: RootDataSetPath | SequenceItemPath): void {
        assertNotNull(path, "path");
        this.dataSetPath = path;
    }

    public async * readAsync(): AsyncIterableIterator<AnyDicomElement> {
        // See http://dicom.nema.org/medical/dicom/current/output/html/part05.html#sect_7.1.3

        while (!this.input.eof()) {
            const { tag, valueLength } = await this.readTagValueLengthAsync();
            const elementPath = this.dataSetPath.tag(tag);
            const vr = await this.guessVr(tag);

            if (this.shouldBeLazy(vr, valueLength)) {
                const stream = this.getLazyValue(valueLength);
                yield lazyDicomElement(elementPath, tag, vr, valueLength, stream, true /*littleEndian*/);
            } else {
                const buffer = await this.readValueAsync(vr, valueLength);
                const element = dicomElement(elementPath, tag, vr, valueLength, buffer, true /*littleEndian*/);
                yield element;
            }
        }
    }

    private async readTagValueLengthAsync(): Promise<{ tag: TagInterface; valueLength: number }> {
        const tagLengthSize = TAG_SIZE + LENGTH_SIZE;
        const buffer = await this.readBufferAsync(
            tagLengthSize,
            "tag_length_incomplete",
            "Tag and Value Length are incomplete");
        const view = new DataView(buffer);

        const tag = parseTag(view);
        // Value Length (32-bit unsigned integer)
        const valueLength = view.getUint32(LENGTH_OFFSET, true /*littleEndian*/);

        return { tag, valueLength };
    }

    private async readValueAsync(vr: VR, valueLength: number): Promise<ArrayBuffer> {
        const valueBuffer = !hasValue(vr)
            ? EMPTY_BUFFER
            : await this.readBufferAsync(
                valueLength, "value_incomplete", "Value is incomplete");

        /*Values of each File Meta Element shall be padded when necessary to achieve an even length,
        as specified in PS3.5 by their corresponding Value Representation.*/
        if (hasValue(vr) && valueLength !== UNDEFINED_LENGTH_32 && valueLength % 2 === 1) {
            this.input.seekRelative(1);
        }

        return valueBuffer;
    }

    private shouldBeLazy(vr: VR, valueLength: number): boolean {
        if (!isUnlimited(vr) || !hasValue(vr)) {
            return false;
        }
        return valueLength > this.lazyLoadThreshold;
    }

    private getLazyValue(valueLength: number): InputStream {
        const position = this.input.getPosition();
        const lazy = this.input.slice(valueLength);
        if (lazy != null) {
            this.input.seekRelative(valueLength + (valueLength % 2));
            return lazy;
        }

        throw new WebDicomError(
            "parsing_failed",
            "value_incomplete",
            `(@ ${position}) Could not provide a lazy value beyond end of stream.`);
    }

    private async guessVr(tag: TagInterface): Promise<VR> {
        const DEFAULT_VR: VR = "UN";
        const tagDescription = Tags.find(tag);
        if (tagDescription != null) {
            return tagDescription.vr;
        }
        if (isGroupLength(tag)) {
            return "UL";
        }
        if (isPrivateCreator(tag)) {
            return "LO";
        }

        const rawTag = await this.input.readAsync(TAG_SIZE);
        if (rawTag == null) {
            return DEFAULT_VR;
        }
        this.input.seekRelative(-TAG_SIZE);
        const nextTag = parseTag(new DataView(rawTag));
        if (Tags.Item.tag.sameAs(nextTag) || Tags.SequenceDelimitationItem.tag.sameAs(nextTag)) {
            return "SQ";
        }
        return DEFAULT_VR;
    }

    private async readBufferAsync(size: number, failureCode: string, failureMessage?: string): Promise<ArrayBuffer> {
        if (size === 0 || size === UNDEFINED_LENGTH_32) {
            return EMPTY_BUFFER;
        }
        const position = this.input.getPosition();
        const buffer = await this.input.readAsync(size);
        if (buffer == null || buffer.byteLength < size) {
            const bytesRead = buffer != null ? buffer.byteLength : 0;
            const message = failureMessage || "Failed to read DICOM file";
            throw new WebDicomError(
                "parsing_failed",
                failureCode,
                `(@ ${position}) ${message}. Expected ${size} bytes but got ${bytesRead}`);
        }
        return buffer;
    }
}

function parseTag(view: DataView): TagInterface {
    // Group Number (16-bit unsigned integer)
    const group = view.getUint16(TAG_GROUP_OFFSET, true /*littleEndian*/);
    // Element Number (16-bit unsigned integer)
    const element = view.getUint16(TAG_ELEMENT_OFFSET, true /*littleEndian*/);
    return new Tag(group, element);
}
