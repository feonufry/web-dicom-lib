
// tslint:disable:no-implicit-dependencies
import {
    DicomElement,
    Tag as TagInterface,
    TagDescriptor as TagDescriptorInterface,
    TagsDictionary,
    VR,
    DicomElementValues,
} from "WebDicom";
// tslint:enable:no-implicit-dependencies

import {Tag} from "../core/tag";
import {assertNotNull} from "../../helpers/assertions";

class TagDescriptor<TVR extends VR, TValue extends DicomElementValues> implements TagDescriptorInterface<TVR, TValue> {
    public readonly name: string;

    public constructor(
            public readonly tag: TagInterface,
            public readonly vr: TVR,
            public readonly keyword: string,
            name?: string) {
        this.name = name || keyword;
    }

    public matches(element: DicomElement): element is DicomElement<TVR, TValue> {
        assertNotNull(element, "element");
        return element.tag.sameAs(this.tag);
    }
}

interface TagsDictionaryIndexable extends TagsDictionary {
    [key: string]: TagDescriptorInterface | ((tag: Tag | number) => TagDescriptorInterface | null);
}
export const Tags: TagsDictionaryIndexable = {
    find,
    FileMetaInformationGroupLength: new TagDescriptor<"UL", number[]>(
        new Tag(0x0002, 0x0000),
        "UL",
        "FileMetaInformationGroupLength",
        "File Meta Information Group Length",
    ),
    FileMetaInformationVersion: new TagDescriptor<"OB", Uint8Array>(
        new Tag(0x0002, 0x0001),
        "OB",
        "FileMetaInformationVersion",
        "File Meta Information Version",
    ),
    MediaStorageSOPClassUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0002, 0x0002),
        "UI",
        "MediaStorageSOPClassUID",
        "Media Storage SOP Class UID",
    ),
    MediaStorageSOPInstanceUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0002, 0x0003),
        "UI",
        "MediaStorageSOPInstanceUID",
        "Media Storage SOP Instance UID",
    ),
    TransferSyntaxUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0002, 0x0010),
        "UI",
        "TransferSyntaxUID",
        "Transfer Syntax UID",
    ),
    ImplementationClassUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0002, 0x0012),
        "UI",
        "ImplementationClassUID",
        "Implementation Class UID",
    ),
    ImplementationVersionName: new TagDescriptor<"SH", string[]>(
        new Tag(0x0002, 0x0013),
        "SH",
        "ImplementationVersionName",
        "Implementation Version Name",
    ),
    SourceApplicationEntityTitle: new TagDescriptor<"AE", string[]>(
        new Tag(0x0002, 0x0016),
        "AE",
        "SourceApplicationEntityTitle",
        "Source Application Entity Title",
    ),
    SendingApplicationEntityTitle: new TagDescriptor<"AE", string[]>(
        new Tag(0x0002, 0x0017),
        "AE",
        "SendingApplicationEntityTitle",
        "Sending Application Entity Title",
    ),
    ReceivingApplicationEntityTitle: new TagDescriptor<"AE", string[]>(
        new Tag(0x0002, 0x0018),
        "AE",
        "ReceivingApplicationEntityTitle",
        "Receiving Application Entity Title",
    ),
    PrivateInformationCreatorUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0002, 0x0100),
        "UI",
        "PrivateInformationCreatorUID",
        "Private Information Creator UID",
    ),
    PrivateInformation: new TagDescriptor<"OB", Uint8Array>(
        new Tag(0x0002, 0x0102),
        "OB",
        "PrivateInformation",
        "Private Information",
    ),
    SpecificCharacterSet: new TagDescriptor<"CS", string[]>(
        new Tag(0x0008, 0x0005),
        "CS",
        "SpecificCharacterSet",
        "Specific Character Set",
    ),
    ImageType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0008, 0x0008),
        "CS",
        "ImageType",
        "Image Type",
    ),
    SOPClassUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0008, 0x0016),
        "UI",
        "SOPClassUID",
        "SOP Class UID",
    ),
    SOPInstanceUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0008, 0x0018),
        "UI",
        "SOPInstanceUID",
        "SOP Instance UID",
    ),
    StudyDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x0008, 0x0020),
        "DA",
        "StudyDate",
        "Study Date",
    ),
    SeriesDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x0008, 0x0021),
        "DA",
        "SeriesDate",
        "Series Date",
    ),
    AcquisitionDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x0008, 0x0022),
        "DA",
        "AcquisitionDate",
        "Acquisition Date",
    ),
    StudyTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x0008, 0x0030),
        "TM",
        "StudyTime",
        "Study Time",
    ),
    SeriesTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x0008, 0x0031),
        "TM",
        "SeriesTime",
        "Series Time",
    ),
    AcquisitionTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x0008, 0x0032),
        "TM",
        "AcquisitionTime",
        "Acquisition Time",
    ),
    AccessionNumber: new TagDescriptor<"SH", string[]>(
        new Tag(0x0008, 0x0050),
        "SH",
        "AccessionNumber",
        "Accession Number",
    ),
    Modality: new TagDescriptor<"CS", string[]>(
        new Tag(0x0008, 0x0060),
        "CS",
        "Modality",
    ),
    Manufacturer: new TagDescriptor<"LO", string[]>(
        new Tag(0x0008, 0x0070),
        "LO",
        "Manufacturer",
    ),
    StudyDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0008, 0x1030),
        "LO",
        "StudyDescription",
        "Study Description",
    ),
    SeriesDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0008, 0x103E),
        "LO",
        "SeriesDescription",
        "Series Description",
    ),
    Item: new TagDescriptor<undefined, undefined>(
        new Tag(0xFFFE, 0xE000),
        undefined,
        "Item",
    ),
    ItemDelimitationItem: new TagDescriptor<undefined, undefined>(
        new Tag(0xFFFE, 0xE00D),
        undefined,
        "ItemDelimitationItem",
        "Item Delimitation Item",
    ),
    SequenceDelimitationItem: new TagDescriptor<undefined, undefined>(
        new Tag(0xFFFE, 0xE0DD),
        undefined,
        "SequenceDelimitationItem",
        "Sequence Delimitation Item",
    ),
};

const TagIndex = new Map<number, TagDescriptorInterface>();
for (const tagKey of Object.keys(Tags)) {
    const descriptor = Tags[tagKey];
    if (typeof descriptor === "function") {
        continue;
    }
    TagIndex.set(descriptor.tag.toNumber(), descriptor);
}

function find(tag: Tag | number): TagDescriptorInterface | null {
    assertNotNull(tag, "tag");
    const tagNumber = typeof tag === "number" ? tag : tag.toNumber();
    return TagIndex.get(tagNumber) || null;
}
