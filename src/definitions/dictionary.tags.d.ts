
declare module "WebDicom" {

    interface TagDescriptor<TVR = VR, TValue = DicomElementValues> {
        readonly tag: Tag;
        readonly keyword: string;
        readonly name: string;
        readonly vr: TVR;

        readonly matches(element: DicomElement): element is DicomElement<TVR, TValue>;
    }

    interface TagsDictionary {
        // Group 0x0002
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

        readonly find(tag: Tag | number): TagDescriptor | null;
    }

}
