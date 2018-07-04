// tslint:disable:no-implicit-dependencies
import {
    Tag,
    RootDataSetPath as RootDataSetPathInterface,
    SequenceItemPath as SequenceItemPathInterface,
    DicomElementPath as DicomElementPathInterface,
} from "WebDicom";
// tslint:enable:no-implicit-dependencies

import {assertNotNull, assertRange, assertType} from "../../helpers/assertions";

// tslint:disable:max-classes-per-file

export class RootDataSetPath implements RootDataSetPathInterface {
    public toString(): string {
        return "";
    }

    public tag(tag: Tag): DicomElementPathInterface {
        return new DicomElementPath(this, tag);
    }
}

export class SequenceItemPath implements SequenceItemPathInterface {
    private readonly fullPath: string;

    public constructor(
        public readonly sequence: DicomElementPathInterface,
        public readonly itemNumber: number) {
        assertNotNull(sequence, "sequence");
        assertNotNull(itemNumber, "itemNumber");
        assertType(itemNumber, "number", "itemNumber");
        assertRange(itemNumber, 0, Number.POSITIVE_INFINITY, "itemNumber");

        this.fullPath = `${sequence.toString()}.#${itemNumber}`;
    }

    public toString(): string {
        return this.fullPath;
    }

    public tag(tag: Tag): DicomElementPathInterface {
        return new DicomElementPath(this, tag);
    }

    public next(): SequenceItemPathInterface {
        return new SequenceItemPath(this.sequence, this.itemNumber + 1);
    }
}

export class DicomElementPath implements DicomElementPathInterface {
    private readonly fullPath: string;

    public constructor(
            public readonly dataSetPath: SequenceItemPathInterface | RootDataSetPathInterface,
            public readonly tag: Tag) {
        assertNotNull(dataSetPath, "dataSetPath");
        assertNotNull(tag, "tag");

        const parent = dataSetPath.toString();
        this.fullPath = parent !== ""
            ? `${parent}.${tag.toString()}`
            : tag.toString();
    }

    public toString(): string {
        return this.fullPath;
    }

    public sequenceItem(itemNumber: number): SequenceItemPathInterface {
        return new SequenceItemPath(this, itemNumber);
    }
}
