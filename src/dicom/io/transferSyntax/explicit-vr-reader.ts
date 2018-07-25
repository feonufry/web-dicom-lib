
// tslint:disable-next-line:no-implicit-dependencies
import {AnyDicomElement, VR} from "WebDicom";

import {TransferSyntaxReader} from "./transfer-syntax-reader";
import {InputStream} from "../../../blobs/streams";
import {assertNotNull, assertRange, assertType} from "../../../helpers/assertions";
import {dicomElement, lazyDicomElement} from "../dicom-file-tokens";
import {WebDicomError} from "../../../web-dicom-error";
import {Tag} from "../../core/tag";
import {RootDataSetPath, SequenceItemPath} from "../../core/path";
import {UNDEFINED_LENGTH_32} from "../../core/element";
import {hasValue, isItemSupport, isUnlimited} from "../../core/elements";

const TAG_GROUP_OFFSET = 0;
const TAG_ELEMENT_OFFSET = 2;
const TAG_SIZE = 4;

const VR_OFFSET = 4;
const VR_SIZE = 2;

const LENGTH_OFFSET = 6;
const LENGTH_SIZE = 2;

const UNLIMITED_LENGTH_SIZE = 4;

const EMPTY_BUFFER = new ArrayBuffer(0);

export class ExplicitVrReader implements TransferSyntaxReader {

    private dataSetPath: RootDataSetPath | SequenceItemPath = new RootDataSetPath();

    public constructor(
            private readonly littleEndian: boolean,
            private readonly input: InputStream,
            private readonly lazyLoadThreshold: number) {
        assertNotNull(littleEndian, "littleEndian");
        assertType(littleEndian, "boolean", "littleEndian");
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
        // See http://dicom.nema.org/medical/dicom/current/output/html/part05.html#sect_7.1.2
        while (!this.input.eof()) {
            const { tag, vr, valueLength } = await this.readTagVrValueLengthAsync();
            const elementPath = this.dataSetPath.tag(tag);

            if (this.shouldBeLazy(vr, valueLength)) {
                const stream = this.getLazyValue(valueLength);
                yield lazyDicomElement(elementPath, tag, vr, valueLength, stream, this.littleEndian);
            } else {
                const buffer = await this.readValueAsync(vr, valueLength);
                yield dicomElement(elementPath, tag, vr, valueLength, buffer, this.littleEndian);
            }
        }
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

    private async readTagVrValueLengthAsync(): Promise<{ tag: Tag; vr: VR; valueLength: number }> {
        const tagVrLengthSize = TAG_SIZE + VR_SIZE + LENGTH_SIZE;
        let buffer = await this.readBufferAsync(
            tagVrLengthSize,
            "tag_vr_length_incomplete",
            "Tag, VR and Value Length are incomplete");
        let view = new DataView(buffer);
        const tag = this.readTag(view);
        let valueLength: number;

        if (isItemSupport(tag)) {
            view = new DataView(buffer, TAG_SIZE);
            valueLength = this.readUnlimitedLength(view);
            return { tag, valueLength, vr: undefined };
        }

        const vr = readVr(view);
        if (isUnlimited(vr)) {
            buffer = await this.readBufferAsync(
                UNLIMITED_LENGTH_SIZE, "value_length_incomplete", "Value Length is incomplete");
            view = new DataView(buffer);
            valueLength = this.readUnlimitedLength(view);
        } else {
            valueLength = this.readLength(view);
        }
        return { tag, vr, valueLength };
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

    private readTag(view: DataView): Tag {
        // Group Number (16-bit unsigned integer)
        const group = view.getUint16(TAG_GROUP_OFFSET, this.littleEndian);
        // Element Number (16-bit unsigned integer)
        const element = view.getUint16(TAG_ELEMENT_OFFSET, this.littleEndian);

        return new Tag(group, element);
    }

    private readLength(view: DataView): number {
        // Value Length (16-bit unsigned integer)
        return view.getUint16(LENGTH_OFFSET, this.littleEndian);
    }

    private readUnlimitedLength(view: DataView): number {
        // Value Length (32-bit unsigned integer)
        return view.getUint32(0, this.littleEndian);
    }

    private shouldBeLazy(vr: VR, valueLength: number): boolean {
        if (!isUnlimited(vr) || !hasValue(vr)) {
            return false;
        }
        return valueLength > this.lazyLoadThreshold;
    }
}

function readVr(view: DataView): VR {
    // VR (2 single byte characters)
    return String.fromCharCode(
        view.getUint8(VR_OFFSET),
        view.getUint8(VR_OFFSET + 1)) as VR;
}
