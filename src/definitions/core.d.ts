import {DicomElement, LazyValue} from "WebDicom";

declare module "WebDicom" {

    type VR = "AE" | "AT" | "UI" | "AS" | "PN" | "UR"
        | "CS" | "LO" | "LT" | "ST" | "UC" | "UT"
        | "DS" | "IS" | "SL" | "SH" | "SS" | "UL" | "US"
        | "DA" | "DT" | "TM"
        | "FL" | "FD"
        | "OB" | "OD" | "OF" | "OL" | "OW" | "UN"
        | "SQ"
        | undefined;

    interface Tag {
        readonly group: number;
        readonly element: number;
        readonly toNumber(): number;
        readonly sameAs(other?: Tag | number | null): boolean;
    }

    interface TagConstructor {
        new (group: number, element: number): Tag;
    }

    interface RootDataSetPath {
        toString(): string;
        tag(tag: Tag): DicomElementPath;
    }

    interface RootDataSetPathConstructor {
        new (): RootDataSetPath;
    }

    interface SequenceItemPath {
        sequence: DicomElementPath;
        itemNumber: number;
        toString(): string;
        tag(tag: Tag): DicomElementPath;
        next(): SequenceItemPath;
    }

    interface SequenceItemPathConstructor {
        new (sequence: DicomElementPath, itemNumber: number): SequenceItemPath;
    }

    interface DicomElementPath {
        dataSetPath: SequenceItemPath | RootDataSetPath;
        tag: Tag;
        toString(): string;
        sequenceItem(itemNumber: number): SequenceItemPath;
    }

    interface DicomElementPathConstructor {
        new (dataSetPath: SequenceItemPath | RootDataSetPath, tag: Tag): DicomElementPath;
    }

    type DicomPath = RootDataSetPath | SequenceItemPath | DicomElementPath;

    type DicomElementValues = string
        | string[]
        | number[]
        | Tag[]
        | Uint8Array
        | Uint16Array
        | Float32Array
        | Float64Array
        | LazyValue<Uint8Array>
        | LazyValue<Uint16Array>
        | LazyValue<Float32Array>
        | LazyValue<Float64Array>
        | undefined;

    interface DicomElementData<TVR = VR, TValue = DicomElementValues> {
        readonly path: DicomElementPath;
        readonly tag: Tag;
        readonly vr: TVR;
        readonly valueLength: number;
        readonly value: TValue;
    }

    interface DicomElement<TVR = VR, TValue = DicomElementValues> extends DicomElementData<TVR, TValue> {
    }

    interface LazyValue<T> {
    }

    type AnyDicomElement =
        // Domain
        DicomElement<"AE", string[]>
        | DicomElement<"AT", Tag[]>
        | DicomElement<"CS", string[]>
        | DicomElement<"UI", string[]>
        | DicomElement<"AS", string[]>
        | DicomElement<"PN", string[]>
        | DicomElement<"SQ", undefined>

        // Date/time
        | DicomElement<"DA", string[]>
        | DicomElement<"DT", string[]>
        | DicomElement<"TM", string[]>

        // Number
        | DicomElement<"DS", string[]>
        | DicomElement<"IS", string[]>
        | DicomElement<"SS", number[]>
        | DicomElement<"SL", number[]>
        | DicomElement<"US", number[]>
        | DicomElement<"UL", number[]>
        | DicomElement<"FL", number[]>
        | DicomElement<"FD", number[]>

        // Text
        | DicomElement<"SH", string[]>
        | DicomElement<"LO", string[]>
        | DicomElement<"ST", string>
        | DicomElement<"LT", string>
        | DicomElement<"UT", string> // TODO: unlimited
        | DicomElement<"UC", string> // TODO: unlimited
        | DicomElement<"UR", string> // TODO: unlimited

        // Binary
        | DicomElement<"OB", Uint8Array>
        | DicomElement<"OB", LazyValue<Uint8Array>>
        | DicomElement<"OW", Uint16Array>
        | DicomElement<"OW", LazyValue<Uint16Array>>
        | DicomElement<"OF", Float32Array>
        | DicomElement<"OF", LazyValue<Float32Array>>
        | DicomElement<"OD", Float64Array>
        | DicomElement<"OD", LazyValue<Float64Array>>
        | DicomElement<"UN", Uint8Array>
        | DicomElement<"UN", LazyValue<Uint8Array>>
        | DicomElement<undefined, undefined>;
}
