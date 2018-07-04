
// tslint:disable:no-implicit-dependencies
import {
    AnyDicomElement,
    DicomElementPath,
    Tag as TagInterface,
    VR,
} from "WebDicom";
import {DicomElement} from "../core/element";
import {InputStream} from "../../blobs/streams";
import {LazyValue} from "../core/lazy-value";
import {Tag} from "../core/tag";
// tslint:enable:no-implicit-dependencies

export const FILE_META_INFO_SIGNATURE_LENGTH = 4;
export const FILE_META_INFO_PREAMBLE_LENGTH = 128;

// Suppression: Method has a regular structure
// tslint:disable-next-line:cyclomatic-complexity
export function dicomElement(
        path: DicomElementPath,
        tag: TagInterface,
        vr: VR,
        valueLength: number,
        buffer: ArrayBuffer,
        littleEndian: boolean): AnyDicomElement {

    switch (vr) {
        case undefined:
            return createDicomElement(path, tag, undefined, valueLength, undefined);

        // Domain
        case "AE":
            return createDicomElement(path, tag, vr, valueLength, readMultiValueStringFromBuffer(buffer));
        // TODO: AT
        case "CS":
            return createDicomElement(path, tag, vr, valueLength, readMultiValueStringFromBuffer(buffer));
        case "AS":
            return createDicomElement(path, tag, vr, valueLength, readMultiValueStringFromBuffer(buffer));
        case "PN":
            return createDicomElement(path, tag, vr, valueLength, readMultiValueStringFromBuffer(buffer));
        case "UI":
            return createDicomElement(path, tag, vr, valueLength, readMultiValueStringFromBuffer(buffer));
        case "AT":
            return createDicomElement(path, tag, vr, valueLength, readTagFromBuffer(buffer, littleEndian));

        // Date/time
        case "DA":
            return createDicomElement(path, tag, vr, valueLength, readMultiValueStringFromBuffer(buffer));
        case "DT":
            return createDicomElement(path, tag, vr, valueLength, readMultiValueStringFromBuffer(buffer));
        case "TM":
            return createDicomElement(path, tag, vr, valueLength, readMultiValueStringFromBuffer(buffer));

        // Number
        case "IS":
            return createDicomElement(path, tag, vr, valueLength, readMultiValueStringFromBuffer(buffer));
        case "DS":
            return createDicomElement(path, tag, vr, valueLength, readMultiValueStringFromBuffer(buffer));
        case "US":
            return createDicomElement(path, tag, vr, valueLength, readUint16FromBuffer(buffer, littleEndian));
        case "UL":
            return createDicomElement(path, tag, vr, valueLength, readUint32FromBuffer(buffer, littleEndian));
        case "SS":
            return createDicomElement(path, tag, vr, valueLength, readInt16FromBuffer(buffer, littleEndian));
        case "SL":
            return createDicomElement(path, tag, vr, valueLength, readInt32FromBuffer(buffer, littleEndian));
        case "FL":
            return createDicomElement(path, tag, vr, valueLength, readFloatFromBuffer(buffer, littleEndian));
        case "FD":
            return createDicomElement(path, tag, vr, valueLength, readDoubleFromBuffer(buffer, littleEndian));

        // Text
        case "SH":
            return createDicomElement(path, tag, vr, valueLength, readMultiValueStringFromBuffer(buffer));
        case "LO":
            return createDicomElement(path, tag, vr, valueLength, readMultiValueStringFromBuffer(buffer));
        case "ST":
            return createDicomElement(path, tag, vr, valueLength, readStringFromBuffer(buffer));
        case "LT":
            return createDicomElement(path, tag, vr, valueLength, readStringFromBuffer(buffer));
        case "UT":
            return createDicomElement(path, tag, vr, valueLength, readStringFromBuffer(buffer));
        case "UC":
            return createDicomElement(path, tag, vr, valueLength, readStringFromBuffer(buffer));
        case "UR":
            return createDicomElement(path, tag, vr, valueLength, readStringFromBuffer(buffer));

        // Binary
        case "OB":
            return createDicomElement(path, tag, vr, valueLength, new Uint8Array(buffer));
        case "OW":
            return createDicomElement(path, tag, vr, valueLength, new Uint16Array(buffer));
        case "UN":
            return createDicomElement(path, tag, vr, valueLength, new Uint8Array(buffer));
        case "SQ":
            return createDicomElement(path, tag, vr, valueLength, undefined);
    }
    throw new Error(`VR ${vr} is not supported yet`);
}

// Suppression: Method has a regular structure
// tslint:disable-next-line:cyclomatic-complexity
export function lazyDicomElement(
    path: DicomElementPath,
    tag: TagInterface,
    vr: VR,
    valueLength: number,
    stream: InputStream,
    littleEndian: boolean): AnyDicomElement {

    switch (vr) {
        case "OB":
            return createDicomElement(path, tag, vr, valueLength, new LazyValue<Uint8Array>(stream, littleEndian));
        case "OW":
            return createDicomElement(path, tag, vr, valueLength, new LazyValue<Uint16Array>(stream, littleEndian));
        case "OF":
            return createDicomElement(path, tag, vr, valueLength, new LazyValue<Float32Array>(stream, littleEndian));
        case "OD":
            return createDicomElement(path, tag, vr, valueLength, new LazyValue<Float64Array>(stream, littleEndian));
        case "UN":
            return createDicomElement(path, tag, vr, valueLength, new LazyValue<Uint8Array>(stream, littleEndian));
    }
    throw new Error(`VR ${vr} is not supported yet by Lazy Loading`);
}

function readMultiValueStringFromBuffer(buffer: ArrayBuffer): string[] {
    const multiValueString = String.fromCharCode.apply(null, new Uint8Array(buffer)) as string;
    return multiValueString.split("\\");
}

function readStringFromBuffer(buffer: ArrayBuffer): string {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
}

function readValuesFromBuffer<T>(
        buffer: ArrayBuffer,
        bytesPerNumber: number,
        numberReader: (view: DataView, offset: number) => T): T[] {
    const values: T[] = [];
    const view = new DataView(buffer);
    for (let offset = 0; offset < view.byteLength; offset += bytesPerNumber) {
        values.push(numberReader(view, offset));
    }
    return values;
}

function readTagFromBuffer(buffer: ArrayBuffer, littleEndian: boolean): TagInterface[] {
    return readValuesFromBuffer(
        buffer,
        Uint16Array.BYTES_PER_ELEMENT * 2,
        (view, offset) => new Tag(
            view.getUint16(offset, littleEndian),
            view.getUint16(offset + Uint16Array.BYTES_PER_ELEMENT, littleEndian)));
}

function readUint16FromBuffer(buffer: ArrayBuffer, littleEndian: boolean): number[] {
    return readValuesFromBuffer(
        buffer,
        Uint16Array.BYTES_PER_ELEMENT,
        (view, offset) => view.getUint16(offset, littleEndian));
}

function readInt16FromBuffer(buffer: ArrayBuffer, littleEndian: boolean): number[] {
    return readValuesFromBuffer(
        buffer,
        Int16Array.BYTES_PER_ELEMENT,
        (view, offset) => view.getInt16(offset, littleEndian));
}

function readUint32FromBuffer(buffer: ArrayBuffer, littleEndian: boolean): number[] {
    return readValuesFromBuffer(
        buffer,
        Uint32Array.BYTES_PER_ELEMENT,
        (view, offset) => view.getUint32(offset, littleEndian));
}

function readInt32FromBuffer(buffer: ArrayBuffer, littleEndian: boolean): number[] {
    return readValuesFromBuffer(
        buffer,
        Int32Array.BYTES_PER_ELEMENT,
        (view, offset) => view.getInt32(offset, littleEndian));
}

function readFloatFromBuffer(buffer: ArrayBuffer, littleEndian: boolean): number[] {
    return readValuesFromBuffer(
        buffer,
        Float32Array.BYTES_PER_ELEMENT,
        (view, offset) => view.getFloat32(offset, littleEndian));
}

function readDoubleFromBuffer(buffer: ArrayBuffer, littleEndian: boolean): number[] {
    return readValuesFromBuffer(
        buffer,
        Float64Array.BYTES_PER_ELEMENT,
        (view, offset) => view.getFloat64(offset, littleEndian));
}

function createDicomElement<TVR, TValue>(
        path: DicomElementPath, tag: TagInterface, vr: TVR,
        valueLength: number, value: TValue): DicomElement<TVR, TValue> {
    return new DicomElement<TVR, TValue>({ path, tag, vr, valueLength, value });
}
