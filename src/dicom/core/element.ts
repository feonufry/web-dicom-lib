
// tslint:disable:no-implicit-dependencies
import {
    DicomElement as DicomElementInterface,
    DicomElementData,
    DicomElementPath,
    DicomElementValues,
    Tag,
    VR,
} from "WebDicom";
// tslint:enable:no-implicit-dependencies

import {assertNotNull} from "../../helpers/assertions";

export const UNDEFINED_LENGTH_32 = 0xFFFFFFFF;

export class DicomElement<TVR = VR, TValue = DicomElementValues> implements DicomElementInterface<TVR, TValue> {

    public readonly path: DicomElementPath;
    public readonly tag: Tag;
    public readonly vr: TVR;
    public readonly valueLength: number;
    public readonly value: TValue;

    public constructor(data: DicomElementData<TVR, TValue>) {
        assertNotNull(data, "data");
        assertNotNull(data.path, "data.path");
        assertNotNull(data.tag, "data.tag");
        // TODO: assertNotNull(data.vr, "data.vr");
        assertNotNull(data.valueLength, "data.valueLength");

        this.path = data.path;
        this.tag = data.tag;
        this.vr = data.vr;
        this.valueLength = data.valueLength;
        this.value = data.value;
    }
}
