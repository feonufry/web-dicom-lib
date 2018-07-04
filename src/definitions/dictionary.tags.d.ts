import {TagDescriptor} from "WebDicom";

declare module "WebDicom" {

    interface TagDescriptor<TVR = VR, TValue = DicomElementValues> {
        readonly tag: Tag;
        readonly keyword: string;
        readonly name: string;
        readonly vr: TVR;

        readonly matches(element: DicomElement): element is DicomElement<TVR, TValue>;
    }

    interface TagsDictionary {
        readonly FileMetaInformationGroupLength: TagDescriptor<"UL", number[]>;
        readonly FileMetaInformationVersion: TagDescriptor<"OB", Uint8Array>;
        readonly MediaStorageSOPClassUID: TagDescriptor<"UI", string[]>;
        readonly MediaStorageSOPInstanceUID: TagDescriptor<"UI", string[]>;
        readonly TransferSyntaxUID: TagDescriptor<"UI", string[]>;
        readonly ImplementationClassUID: TagDescriptor<"UI", string[]>;
        readonly ImplementationVersionName: TagDescriptor<"SH", string[]>;
        readonly SourceApplicationEntityTitle: TagDescriptor<"AE", string[]>;
        readonly SendingApplicationEntityTitle: TagDescriptor<"AE", string[]>;
        readonly ReceivingApplicationEntityTitle: TagDescriptor<"AE", string[]>;
        readonly PrivateInformationCreatorUID: TagDescriptor<"UI", string[]>;
        readonly PrivateInformation: TagDescriptor<"OB", Uint8Array>;
        readonly SpecificCharacterSet: TagDescriptor<"CS", string[]>;
        readonly ImageType: TagDescriptor<"CS", string[]>;
        readonly SOPClassUID: TagDescriptor<"UI", string[]>;
        readonly SOPInstanceUID: TagDescriptor<"UI", string[]>;
        readonly StudyDate: TagDescriptor<"DA", string[]>;
        readonly SeriesDate: TagDescriptor<"DA", string[]>;
        readonly AcquisitionDate: TagDescriptor<"DA", string[]>;
        readonly StudyTime: TagDescriptor<"TM", string[]>;
        readonly SeriesTime: TagDescriptor<"TM", string[]>;
        readonly AcquisitionTime: TagDescriptor<"TM", string[]>;
        readonly AccessionNumber: TagDescriptor<"SH", string[]>;
        readonly Modality: TagDescriptor<"CS", string[]>;
        readonly Manufacturer: TagDescriptor<"LO", string[]>;
        readonly StudyDescription: TagDescriptor<"LO", string[]>;
        readonly SeriesDescription: TagDescriptor<"LO", string[]>;
        readonly Item: TagDescriptor<undefined, undefined>;
        readonly ItemDelimitationItem: TagDescriptor<undefined, undefined>;
        readonly SequenceDelimitationItem: TagDescriptor<undefined, undefined>;

        readonly find(tag: Tag | number): TagDescriptor | null;
    }

}
