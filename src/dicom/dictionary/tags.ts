
// tslint:disable:no-implicit-dependencies
import {
    DicomElement,
    LazyValue,
    Tag as TagInterface,
    TagDescriptor as TagDescriptorInterface,
    TagsDictionary,
    VR,
    DicomElementValues,
} from "WebDicom";
// tslint:enable:no-implicit-dependencies

import {Tag} from "../core/tag";
import {assertNotNull} from "../../helpers/assertions";

// tslint:disable:max-file-line-count

class TagDescriptor<TVR extends VR, TValue extends DicomElementValues> implements TagDescriptorInterface<TVR, TValue> {
    public readonly keyword: string;

    public constructor(
            public readonly tag: TagInterface,
            public readonly vr: TVR,
            public readonly name: string,
            keyword?: string) {
        this.keyword = keyword || buildTagKeyword(name);
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

    // Group 0x0002

    FileMetaInformationGroupLength: new TagDescriptor<"UL", number[]>(
        new Tag(0x0002, 0x0000),
        "UL", "File Meta Information Group Length",
    ),
    FileMetaInformationVersion: new TagDescriptor<"OB", Uint8Array>(
        new Tag(0x0002, 0x0001),
        "OB", "File Meta Information Version",
    ),
    MediaStorageSOPClassUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0002, 0x0002),
        "UI", "Media Storage SOP Class UID",
    ),
    MediaStorageSOPInstanceUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0002, 0x0003),
        "UI", "Media Storage SOP Instance UID",
    ),
    TransferSyntaxUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0002, 0x0010),
        "UI", "Transfer Syntax UID",
    ),
    ImplementationClassUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0002, 0x0012),
        "UI", "Implementation Class UID",
    ),
    ImplementationVersionName: new TagDescriptor<"SH", string[]>(
        new Tag(0x0002, 0x0013),
        "SH", "Implementation Version Name",
    ),
    SourceApplicationEntityTitle: new TagDescriptor<"AE", string[]>(
        new Tag(0x0002, 0x0016),
        "AE", "Source Application Entity Title",
    ),
    SendingApplicationEntityTitle: new TagDescriptor<"AE", string[]>(
        new Tag(0x0002, 0x0017),
        "AE", "Sending Application Entity Title",
    ),
    ReceivingApplicationEntityTitle: new TagDescriptor<"AE", string[]>(
        new Tag(0x0002, 0x0018),
        "AE", "Receiving Application Entity Title",
    ),
    PrivateInformationCreatorUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0002, 0x0100),
        "UI", "Private Information Creator UID",
    ),
    PrivateInformation: new TagDescriptor<"OB", Uint8Array>(
        new Tag(0x0002, 0x0102),
        "OB", "Private Information",
    ),


    // Group 0x0008

    LengthToEnd: new TagDescriptor<"UL", number[]>(
        new Tag(0x0008, 0x0001), "UL", "Length to End"),
    SpecificCharacterSet: new TagDescriptor<"CS", string[]>(
        new Tag(0x0008, 0x0005), "CS", "Specific Character Set"),
    LanguageCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x0006), "SQ", "Language Code Sequence"),
    ImageType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0008, 0x0008), "CS", "Image Type"),
    RecognitionCode: new TagDescriptor<"SH", string[]>(
        new Tag(0x0008, 0x0010), "SH", "Recognition Code"),
    InstanceCreationDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x0008, 0x0012), "DA", "Instance Creation Date"),
    InstanceCreationTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x0008, 0x0013), "TM", "Instance Creation Time"),
    InstanceCreatorUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0008, 0x0014), "UI", "Instance Creator UID"),
    InstanceCoercionDateTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x0008, 0x0015), "DT", "Instance Coercion DateTime"),
    SOPClassUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0008, 0x0016), "UI", "SOP Class UID"),
    SOPInstanceUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0008, 0x0018), "UI", "SOP Instance UID"),
    RelatedGeneralSOPClassUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0008, 0x001A), "UI", "Related General SOP Class UID"),
    OriginalSpecializedSOPClassUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0008, 0x001B), "UI", "Original Specialized SOP Class UID"),
    StudyDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x0008, 0x0020), "DA", "Study Date"),
    SeriesDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x0008, 0x0021), "DA", "Series Date"),
    AcquisitionDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x0008, 0x0022), "DA", "Acquisition Date"),
    ContentDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x0008, 0x0023), "DA", "Content Date"),
    OverlayDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x0008, 0x0024), "DA", "Overlay Date"),
    CurveDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x0008, 0x0025), "DA", "Curve Date"),
    AcquisitionDateTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x0008, 0x002A), "DT", "Acquisition DateTime"),
    StudyTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x0008, 0x0030), "TM", "Study Time"),
    SeriesTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x0008, 0x0031), "TM", "Series Time"),
    AcquisitionTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x0008, 0x0032), "TM", "Acquisition Time"),
    ContentTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x0008, 0x0033), "TM", "Content Time"),
    OverlayTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x0008, 0x0034), "TM", "Overlay Time"),
    CurveTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x0008, 0x0035), "TM", "Curve Time"),
    DataSetType: new TagDescriptor<"US", number[]>(
        new Tag(0x0008, 0x0040), "US", "Data Set Type"),
    DataSetSubtype: new TagDescriptor<"LO", string[]>(
        new Tag(0x0008, 0x0041), "LO", "Data Set Subtype"),
    NuclearMedicineSeriesType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0008, 0x0042), "CS", "Nuclear Medicine Series Type"),
    AccessionNumber: new TagDescriptor<"SH", string[]>(
        new Tag(0x0008, 0x0050), "SH", "Accession Number"),
    IssuerOfAccessionNumberSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x0051), "SQ", "Issuer of Accession Number Sequence"),
    QueryRetrieveLevel: new TagDescriptor<"CS", string[]>(
        new Tag(0x0008, 0x0052), "CS", "Query/Retrieve Level"),
    QueryRetrieveView: new TagDescriptor<"CS", string[]>(
        new Tag(0x0008, 0x0053), "CS", "Query/Retrieve View"),
    RetrieveAETitle: new TagDescriptor<"AE", string[]>(
        new Tag(0x0008, 0x0054), "AE", "Retrieve AE Title"),
    StationAETitle: new TagDescriptor<"AE", string[]>(
        new Tag(0x0008, 0x0055), "AE", "Station  AE Title"),
    InstanceAvailability: new TagDescriptor<"CS", string[]>(
        new Tag(0x0008, 0x0056), "CS", "Instance Availability"),
    FailedSOPInstanceUIDList: new TagDescriptor<"UI", string[]>(
        new Tag(0x0008, 0x0058), "UI", "Failed SOP Instance UID List"),
    Modality: new TagDescriptor<"CS", string[]>(
        new Tag(0x0008, 0x0060), "CS", "Modality"),
    ModalitiesInStudy: new TagDescriptor<"CS", string[]>(
        new Tag(0x0008, 0x0061), "CS", "Modalities in Study"),
    SOPClassesInStudy: new TagDescriptor<"UI", string[]>(
        new Tag(0x0008, 0x0062), "UI", "SOP Classes in Study"),
    AnatomicRegionsInStudyCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x0063), "SQ", "Anatomic Regions in Study Code Sequence"),
    ConversionType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0008, 0x0064), "CS", "Conversion Type"),
    PresentationIntentType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0008, 0x0068), "CS", "Presentation Intent Type"),
    Manufacturer: new TagDescriptor<"LO", string[]>(
        new Tag(0x0008, 0x0070), "LO", "Manufacturer"),
    InstitutionName: new TagDescriptor<"LO", string[]>(
        new Tag(0x0008, 0x0080), "LO", "Institution Name"),
    InstitutionAddress: new TagDescriptor<"ST", string>(
        new Tag(0x0008, 0x0081), "ST", "Institution Address"),
    InstitutionCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x0082), "SQ", "Institution Code Sequence"),
    ReferringPhysicianName: new TagDescriptor<"PN", string[]>(
        new Tag(0x0008, 0x0090), "PN", "Referring Physician's Name"),
    ReferringPhysicianAddress: new TagDescriptor<"ST", string>(
        new Tag(0x0008, 0x0092), "ST", "Referring Physician's Address"),
    ReferringPhysicianTelephoneNumbers: new TagDescriptor<"SH", string[]>(
        new Tag(0x0008, 0x0094), "SH", "Referring Physician's Telephone Numbers"),
    ReferringPhysicianIdentificationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x0096), "SQ", "Referring Physician Identification Sequence"),
    ConsultingPhysicianName: new TagDescriptor<"PN", string[]>(
        new Tag(0x0008, 0x009C), "PN", "Consulting Physician's Name"),
    ConsultingPhysicianIdentificationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x009D), "SQ", "Consulting Physician Identification Sequence"),
    CodeValue: new TagDescriptor<"SH", string[]>(
        new Tag(0x0008, 0x0100), "SH", "Code Value"),
    ExtendedCodeValue: new TagDescriptor<"LO", string[]>(
        new Tag(0x0008, 0x0101), "LO", "Extended Code Value"),
    CodingSchemeDesignator: new TagDescriptor<"SH", string[]>(
        new Tag(0x0008, 0x0102), "SH", "Coding Scheme Designator"),
    CodingSchemeVersion: new TagDescriptor<"SH", string[]>(
        new Tag(0x0008, 0x0103), "SH", "Coding Scheme Version"),
    CodeMeaning: new TagDescriptor<"LO", string[]>(
        new Tag(0x0008, 0x0104), "LO", "Code Meaning"),
    MappingResource: new TagDescriptor<"CS", string[]>(
        new Tag(0x0008, 0x0105), "CS", "Mapping Resource"),
    ContextGroupVersion: new TagDescriptor<"DT", string[]>(
        new Tag(0x0008, 0x0106), "DT", "Context Group Version"),
    ContextGroupLocalVersion: new TagDescriptor<"DT", string[]>(
        new Tag(0x0008, 0x0107), "DT", "Context Group Local Version"),
    ExtendedCodeMeaning: new TagDescriptor<"LT", string>(
        new Tag(0x0008, 0x0108), "LT", "Extended Code Meaning"),
    CodingSchemeResourcesSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x0109), "SQ", "Coding Scheme Resources Sequence"),
    CodingSchemeURLType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0008, 0x010A), "CS", "Coding Scheme URL Type"),
    ContextGroupExtensionFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0008, 0x010B), "CS", "Context Group Extension Flag"),
    CodingSchemeUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0008, 0x010C), "UI", "Coding Scheme UID"),
    ContextGroupExtensionCreatorUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0008, 0x010D), "UI", "Context Group Extension Creator UID"),
    CodingSchemeURL: new TagDescriptor<"UR", string>(
        new Tag(0x0008, 0x010E), "UR", "Coding Scheme URL"),
    ContextIdentifier: new TagDescriptor<"CS", string[]>(
        new Tag(0x0008, 0x010F), "CS", "Context Identifier"),
    CodingSchemeIdentificationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x0110), "SQ", "Coding Scheme Identification Sequence"),
    CodingSchemeRegistry: new TagDescriptor<"LO", string[]>(
        new Tag(0x0008, 0x0112), "LO", "Coding Scheme Registry"),
    CodingSchemeExternalID: new TagDescriptor<"ST", string>(
        new Tag(0x0008, 0x0114), "ST", "Coding Scheme External ID"),
    CodingSchemeName: new TagDescriptor<"ST", string>(
        new Tag(0x0008, 0x0115), "ST", "Coding Scheme Name"),
    CodingSchemeResponsibleOrganization: new TagDescriptor<"ST", string>(
        new Tag(0x0008, 0x0116), "ST", "Coding Scheme Responsible Organization"),
    ContextUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0008, 0x0117), "UI", "Context UID"),
    MappingResourceUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0008, 0x0118), "UI", "Mapping Resource UID"),
    LongCodeValue: new TagDescriptor<"UC", string[]>(
        new Tag(0x0008, 0x0119), "UC", "Long Code Value"),
    URNCodeValue: new TagDescriptor<"UR", string>(
        new Tag(0x0008, 0x0120), "UR", "URN Code Value"),
    EquivalentCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x0121), "SQ", "Equivalent Code Sequence"),
    MappingResourceName: new TagDescriptor<"LO", string[]>(
        new Tag(0x0008, 0x0122), "LO", "Mapping Resource Name"),
    ContextGroupIdentificationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x0123), "SQ", "Context Group Identification Sequence"),
    MappingResourceIdentificationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x0124), "SQ", "Mapping Resource Identification Sequence"),
    TimezoneOffsetFromUTC: new TagDescriptor<"SH", string[]>(
        new Tag(0x0008, 0x0201), "SH", "Timezone Offset From UTC"),
    ResponsibleGroupCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x0220), "SQ", "Responsible Group Code Sequence"),
    EquipmentModality: new TagDescriptor<"CS", string[]>(
        new Tag(0x0008, 0x0221), "CS", "Equipment Modality"),
    ManufacturerRelatedModelGroup: new TagDescriptor<"LO", string[]>(
        new Tag(0x0008, 0x0222), "LO", "Manufacturer's Related Model Group"),
    PrivateDataElementCharacteristicsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x0300), "SQ", "Private Data Element Characteristics Sequence"),
    PrivateGroupReference: new TagDescriptor<"US", number[]>(
        new Tag(0x0008, 0x0301), "US", "Private Group Reference"),
    PrivateCreatorReference: new TagDescriptor<"LO", string[]>(
        new Tag(0x0008, 0x0302), "LO", "Private Creator Reference"),
    BlockIdentifyingInformationStatus: new TagDescriptor<"CS", string[]>(
        new Tag(0x0008, 0x0303), "CS", "Block Identifying Information Status"),
    NonidentifyingPrivateElements: new TagDescriptor<"US", number[]>(
        new Tag(0x0008, 0x0304), "US", "Nonidentifying Private Elements"),
    IdentifyingPrivateElements: new TagDescriptor<"US", number[]>(
        new Tag(0x0008, 0x0306), "US", "Identifying Private Elements"),
    DeidentificationActionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x0305), "SQ", "Deidentification Action Sequence"),
    DeidentificationAction: new TagDescriptor<"CS", string[]>(
        new Tag(0x0008, 0x0307), "CS", "Deidentification Action"),
    PrivateDataElement: new TagDescriptor<"US", number[]>(
        new Tag(0x0008, 0x0308), "US", "Private Data Element"),
    PrivateDataElementValueMultiplicity: new TagDescriptor<"UL", number[]>(
        new Tag(0x0008, 0x0309), "UL", "Private Data Element Value Multiplicity"),
    PrivateDataElementValueRepresentation: new TagDescriptor<"CS", string[]>(
        new Tag(0x0008, 0x030A), "CS", "Private Data Element Value Representation"),
    PrivateDataElementNumberOfItems: new TagDescriptor<"UL", number[]>(
        new Tag(0x0008, 0x030B), "UL", "Private Data Element Number of Items"),
    PrivateDataElementName: new TagDescriptor<"UC", string[]>(
        new Tag(0x0008, 0x030C), "UC", "Private Data Element Name"),
    PrivateDataElementKeyword: new TagDescriptor<"UC", string[]>(
        new Tag(0x0008, 0x030D), "UC", "Private Data Element Keyword"),
    PrivateDataElementDescription: new TagDescriptor<"UT", string>(
        new Tag(0x0008, 0x030E), "UT", "Private Data Element Description"),
    PrivateDataElementEncoding: new TagDescriptor<"UT", string>(
        new Tag(0x0008, 0x030F), "UT", "Private Data Element Encoding"),
    PrivateDataElementDefinitionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x0310), "SQ", "Private Data Element Definition Sequence"),
    NetworkID: new TagDescriptor<"AE", string[]>(
        new Tag(0x0008, 0x1000), "AE", "Network ID"),
    StationName: new TagDescriptor<"SH", string[]>(
        new Tag(0x0008, 0x1010), "SH", "Station Name"),
    StudyDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0008, 0x1030), "LO", "Study Description"),
    ProcedureCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x1032), "SQ", "Procedure Code Sequence"),
    SeriesDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0008, 0x103E), "LO", "Series Description"),
    SeriesDescriptionCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x103F), "SQ", "Series Description Code Sequence"),
    InstitutionalDepartmentName: new TagDescriptor<"LO", string[]>(
        new Tag(0x0008, 0x1040), "LO", "Institutional Department Name"),
    PhysiciansOfRecord: new TagDescriptor<"PN", string[]>(
        new Tag(0x0008, 0x1048), "PN", "Physician(s) of Record"),
    PhysiciansOfRecordIdentificationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x1049), "SQ", "Physician(s) of Record Identification Sequence"),
    PerformingPhysicianName: new TagDescriptor<"PN", string[]>(
        new Tag(0x0008, 0x1050), "PN", "Performing Physician's Name"),
    PerformingPhysicianIdentificationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x1052), "SQ", "Performing Physician Identification Sequence"),
    NameOfPhysiciansReadingStudy: new TagDescriptor<"PN", string[]>(
        new Tag(0x0008, 0x1060), "PN", "Name of Physician(s) Reading Study"),
    PhysiciansReadingStudyIdentificationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x1062), "SQ", "Physician(s) Reading Study Identification Sequence"),
    OperatorsName: new TagDescriptor<"PN", string[]>(
        new Tag(0x0008, 0x1070), "PN", "Operators' Name"),
    OperatorIdentificationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x1072), "SQ", "Operator Identification Sequence"),
    AdmittingDiagnosesDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0008, 0x1080), "LO", "Admitting Diagnoses Description"),
    AdmittingDiagnosesCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x1084), "SQ", "Admitting Diagnoses Code Sequence"),
    ManufacturerModelName: new TagDescriptor<"LO", string[]>(
        new Tag(0x0008, 0x1090), "LO", "Manufacturer's Model Name"),
    ReferencedResultsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x1100), "SQ", "Referenced Results Sequence"),
    ReferencedStudySequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x1110), "SQ", "Referenced Study Sequence"),
    ReferencedPerformedProcedureStepSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x1111), "SQ", "Referenced Performed Procedure Step Sequence"),
    ReferencedSeriesSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x1115), "SQ", "Referenced Series Sequence"),
    ReferencedPatientSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x1120), "SQ", "Referenced Patient Sequence"),
    ReferencedVisitSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x1125), "SQ", "Referenced Visit Sequence"),
    ReferencedOverlaySequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x1130), "SQ", "Referenced Overlay Sequence"),
    ReferencedStereometricInstanceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x1134), "SQ", "Referenced Stereometric Instance Sequence"),
    ReferencedWaveformSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x113A), "SQ", "Referenced Waveform Sequence"),
    ReferencedImageSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x1140), "SQ", "Referenced Image Sequence"),
    ReferencedCurveSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x1145), "SQ", "Referenced Curve Sequence"),
    ReferencedInstanceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x114A), "SQ", "Referenced Instance Sequence"),
    ReferencedRealWorldValueMappingInstanceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x114B), "SQ", "Referenced Real World Value Mapping Instance Sequence"),
    ReferencedSOPClassUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0008, 0x1150), "UI", "Referenced SOP Class UID"),
    ReferencedSOPInstanceUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0008, 0x1155), "UI", "Referenced SOP Instance UID"),
    DefinitionSourceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x1156), "SQ", "Definition Source Sequence"),
    SOPClassesSupported: new TagDescriptor<"UI", string[]>(
        new Tag(0x0008, 0x115A), "UI", "SOP Classes Supported"),
    ReferencedFrameNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x0008, 0x1160), "IS", "Referenced Frame Number"),
    SimpleFrameList: new TagDescriptor<"UL", number[]>(
        new Tag(0x0008, 0x1161), "UL", "Simple Frame List"),
    CalculatedFrameList: new TagDescriptor<"UL", number[]>(
        new Tag(0x0008, 0x1162), "UL", "Calculated Frame List"),
    TimeRange: new TagDescriptor<"FD", number[]>(
        new Tag(0x0008, 0x1163), "FD", "Time Range"),
    FrameExtractionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x1164), "SQ", "Frame Extraction Sequence"),
    MultiFrameSourceSOPInstanceUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0008, 0x1167), "UI", "Multi-frame Source SOP Instance UID"),
    RetrieveURL: new TagDescriptor<"UR", string>(
        new Tag(0x0008, 0x1190), "UR", "Retrieve URL"),
    TransactionUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0008, 0x1195), "UI", "Transaction UID"),
    WarningReason: new TagDescriptor<"US", number[]>(
        new Tag(0x0008, 0x1196), "US", "Warning Reason"),
    FailureReason: new TagDescriptor<"US", number[]>(
        new Tag(0x0008, 0x1197), "US", "Failure Reason"),
    FailedSOPSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x1198), "SQ", "Failed SOP Sequence"),
    ReferencedSOPSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x1199), "SQ", "Referenced SOP Sequence"),
    OtherFailuresSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x119A), "SQ", "Other Failures Sequence"),
    StudiesContainingOtherReferencedInstancesSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x1200), "SQ", "Studies Containing Other Referenced Instances Sequence"),
    RelatedSeriesSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x1250), "SQ", "Related Series Sequence"),
    LossyImageCompressionRetired: new TagDescriptor<"CS", string[]>(
        new Tag(0x0008, 0x2110), "CS", "Lossy Image Compression (Retired)"),
    DerivationDescription: new TagDescriptor<"ST", string>(
        new Tag(0x0008, 0x2111), "ST", "Derivation Description"),
    SourceImageSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x2112), "SQ", "Source Image Sequence"),
    StageName: new TagDescriptor<"SH", string[]>(
        new Tag(0x0008, 0x2120), "SH", "Stage Name"),
    StageNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x0008, 0x2122), "IS", "Stage Number"),
    NumberOfStages: new TagDescriptor<"IS", number[]>(
        new Tag(0x0008, 0x2124), "IS", "Number of Stages"),
    ViewName: new TagDescriptor<"SH", string[]>(
        new Tag(0x0008, 0x2127), "SH", "View Name"),
    ViewNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x0008, 0x2128), "IS", "View Number"),
    NumberOfEventTimers: new TagDescriptor<"IS", number[]>(
        new Tag(0x0008, 0x2129), "IS", "Number of Event Timers"),
    NumberOfViewsInStage: new TagDescriptor<"IS", number[]>(
        new Tag(0x0008, 0x212A), "IS", "Number of Views in Stage"),
    EventElapsedTimes: new TagDescriptor<"DS", number[]>(
        new Tag(0x0008, 0x2130), "DS", "Event Elapsed Time(s)"),
    EventTimerNames: new TagDescriptor<"LO", string[]>(
        new Tag(0x0008, 0x2132), "LO", "Event Timer Name(s)"),
    EventTimerSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x2133), "SQ", "Event Timer Sequence"),
    EventTimeOffset: new TagDescriptor<"FD", number[]>(
        new Tag(0x0008, 0x2134), "FD", "Event Time Offset"),
    EventCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x2135), "SQ", "Event Code Sequence"),
    StartTrim: new TagDescriptor<"IS", number[]>(
        new Tag(0x0008, 0x2142), "IS", "Start Trim"),
    StopTrim: new TagDescriptor<"IS", number[]>(
        new Tag(0x0008, 0x2143), "IS", "Stop Trim"),
    RecommendedDisplayFrameRate: new TagDescriptor<"IS", number[]>(
        new Tag(0x0008, 0x2144), "IS", "Recommended Display Frame Rate"),
    TransducerPosition: new TagDescriptor<"CS", string[]>(
        new Tag(0x0008, 0x2200), "CS", "Transducer Position"),
    TransducerOrientation: new TagDescriptor<"CS", string[]>(
        new Tag(0x0008, 0x2204), "CS", "Transducer Orientation"),
    AnatomicStructure: new TagDescriptor<"CS", string[]>(
        new Tag(0x0008, 0x2208), "CS", "Anatomic Structure"),
    AnatomicRegionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x2218), "SQ", "Anatomic Region Sequence"),
    AnatomicRegionModifierSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x2220), "SQ", "Anatomic Region Modifier Sequence"),
    PrimaryAnatomicStructureSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x2228), "SQ", "Primary Anatomic Structure Sequence"),
    AnatomicStructureSpaceOrRegionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x2229), "SQ", "Anatomic Structure, Space or Region Sequence"),
    PrimaryAnatomicStructureModifierSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x2230), "SQ", "Primary Anatomic Structure Modifier Sequence"),
    TransducerPositionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x2240), "SQ", "Transducer Position Sequence"),
    TransducerPositionModifierSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x2242), "SQ", "Transducer Position Modifier Sequence"),
    TransducerOrientationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x2244), "SQ", "Transducer Orientation Sequence"),
    TransducerOrientationModifierSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x2246), "SQ", "Transducer Orientation Modifier Sequence"),
    AnatomicStructureSpaceOrRegionCodeSequenceTrial: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x2251), "SQ", "Anatomic Structure Space Or Region Code Sequence (Trial)"),
    AnatomicPortalOfEntranceCodeSequenceTrial: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x2253), "SQ", "Anatomic Portal Of Entrance Code Sequence (Trial)"),
    AnatomicApproachDirectionCodeSequenceTrial: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x2255), "SQ", "Anatomic Approach Direction Code Sequence (Trial)"),
    AnatomicPerspectiveDescriptionTrial: new TagDescriptor<"ST", string>(
        new Tag(0x0008, 0x2256), "ST", "Anatomic Perspective Description (Trial)"),
    AnatomicPerspectiveCodeSequenceTrial: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x2257), "SQ", "Anatomic Perspective Code Sequence (Trial)"),
    AnatomicLocationOfExaminingInstrumentDescriptionTrial: new TagDescriptor<"ST", string>(
        new Tag(0x0008, 0x2258), "ST", "Anatomic Location Of Examining Instrument Description (Trial)"),
    AnatomicLocationOfExaminingInstrumentCodeSequenceTrial: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x2259), "SQ", "Anatomic Location Of Examining Instrument Code Sequence (Trial)"),
    AnatomicStructureSpaceOrRegionModifierCodeSequenceTrial: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x225A), "SQ", "Anatomic Structure Space Or Region Modifier Code Sequence (Trial)"),
    OnAxisBackgroundAnatomicStructureCodeSequenceTrial: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x225C), "SQ", "On Axis Background Anatomic Structure Code Sequence (Trial)"),
    AlternateRepresentationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x3001), "SQ", "Alternate Representation Sequence"),
    IrradiationEventUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0008, 0x3010), "UI", "Irradiation Event UID"),
    SourceIrradiationEventSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x3011), "SQ", "Source Irradiation Event Sequence"),
    RadiopharmaceuticalAdministrationEventUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0008, 0x3012), "UI", "Radiopharmaceutical Administration Event UID"),
    IdentifyingComments: new TagDescriptor<"LT", string>(
        new Tag(0x0008, 0x4000), "LT", "Identifying Comments"),
    FrameType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0008, 0x9007), "CS", "Frame Type"),
    ReferencedImageEvidenceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x9092), "SQ", "Referenced Image Evidence Sequence"),
    ReferencedRawDataSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x9121), "SQ", "Referenced Raw Data Sequence"),
    CreatorVersionUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0008, 0x9123), "UI", "Creator-Version UID"),
    DerivationImageSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x9124), "SQ", "Derivation Image Sequence"),
    SourceImageEvidenceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x9154), "SQ", "Source Image Evidence Sequence"),
    PixelPresentation: new TagDescriptor<"CS", string[]>(
        new Tag(0x0008, 0x9205), "CS", "Pixel Presentation"),
    VolumetricProperties: new TagDescriptor<"CS", string[]>(
        new Tag(0x0008, 0x9206), "CS", "Volumetric Properties"),
    VolumeBasedCalculationTechnique: new TagDescriptor<"CS", string[]>(
        new Tag(0x0008, 0x9207), "CS", "Volume Based Calculation Technique"),
    ComplexImageComponent: new TagDescriptor<"CS", string[]>(
        new Tag(0x0008, 0x9208), "CS", "Complex Image Component"),
    AcquisitionContrast: new TagDescriptor<"CS", string[]>(
        new Tag(0x0008, 0x9209), "CS", "Acquisition Contrast"),
    DerivationCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x9215), "SQ", "Derivation Code Sequence"),
    ReferencedPresentationStateSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x9237), "SQ", "Referenced Presentation State Sequence"),
    ReferencedOtherPlaneSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x9410), "SQ", "Referenced Other Plane Sequence"),
    FrameDisplaySequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0008, 0x9458), "SQ", "Frame Display Sequence"),
    RecommendedDisplayFrameRateInFloat: new TagDescriptor<"FL", number[]>(
        new Tag(0x0008, 0x9459), "FL", "Recommended Display Frame Rate in Float"),
    SkipFrameRangeFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0008, 0x9460), "CS", "Skip Frame Range Flag"),

    // Group 0x0010

    PatientName: new TagDescriptor<"PN", string[]>(
        new Tag(0x0010, 0x0010), "PN", "Patient's Name"),
    PatientID: new TagDescriptor<"LO", string[]>(
        new Tag(0x0010, 0x0020), "LO", "Patient ID"),
    IssuerOfPatientID: new TagDescriptor<"LO", string[]>(
        new Tag(0x0010, 0x0021), "LO", "Issuer of Patient ID"),
    TypeOfPatientID: new TagDescriptor<"CS", string[]>(
        new Tag(0x0010, 0x0022), "CS", "Type of Patient ID"),
    IssuerOfPatientIDQualifiersSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0010, 0x0024), "SQ", "Issuer of Patient ID Qualifiers Sequence"),
    SourcePatientGroupIdentificationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0010, 0x0026), "SQ", "Source Patient Group Identification Sequence"),
    GroupOfPatientsIdentificationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0010, 0x0027), "SQ", "Group of Patients Identification Sequence"),
    SubjectRelativePositionInImage: new TagDescriptor<"US", number[]>(
        new Tag(0x0010, 0x0028), "US", "Subject Relative Position in Image"),
    PatientBirthDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x0010, 0x0030), "DA", "Patient's Birth Date"),
    PatientBirthTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x0010, 0x0032), "TM", "Patient's Birth Time"),
    PatientBirthDateInAlternativeCalendar: new TagDescriptor<"LO", string[]>(
        new Tag(0x0010, 0x0033), "LO", "Patient's Birth Date in Alternative Calendar"),
    PatientDeathDateInAlternativeCalendar: new TagDescriptor<"LO", string[]>(
        new Tag(0x0010, 0x0034), "LO", "Patient's Death Date in Alternative Calendar"),
    PatientAlternativeCalendar: new TagDescriptor<"CS", string[]>(
        new Tag(0x0010, 0x0035), "CS", "Patient's Alternative Calendar"),
    PatientSex: new TagDescriptor<"CS", string[]>(
        new Tag(0x0010, 0x0040), "CS", "Patient's Sex"),
    PatientInsurancePlanCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0010, 0x0050), "SQ", "Patient's Insurance Plan Code Sequence"),
    PatientPrimaryLanguageCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0010, 0x0101), "SQ", "Patient's Primary Language Code Sequence"),
    PatientPrimaryLanguageModifierCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0010, 0x0102), "SQ", "Patient's Primary Language Modifier Code Sequence"),
    QualityControlSubject: new TagDescriptor<"CS", string[]>(
        new Tag(0x0010, 0x0200), "CS", "Quality Control Subject"),
    QualityControlSubjectTypeCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0010, 0x0201), "SQ", "Quality Control Subject Type Code Sequence"),
    StrainDescription: new TagDescriptor<"UC", string[]>(
        new Tag(0x0010, 0x0212), "UC", "Strain Description"),
    StrainNomenclature: new TagDescriptor<"LO", string[]>(
        new Tag(0x0010, 0x0213), "LO", "Strain Nomenclature"),
    StrainStockNumber: new TagDescriptor<"LO", string[]>(
        new Tag(0x0010, 0x0214), "LO", "Strain Stock Number"),
    StrainSourceRegistryCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0010, 0x0215), "SQ", "Strain Source Registry Code Sequence"),
    StrainStockSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0010, 0x0216), "SQ", "Strain Stock Sequence"),
    StrainSource: new TagDescriptor<"LO", string[]>(
        new Tag(0x0010, 0x0217), "LO", "Strain Source"),
    StrainAdditionalInformation: new TagDescriptor<"UT", string>(
        new Tag(0x0010, 0x0218), "UT", "Strain Additional Information"),
    StrainCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0010, 0x0219), "SQ", "Strain Code Sequence"),
    GeneticModificationsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0010, 0x0221), "SQ", "Genetic Modifications Sequence"),
    GeneticModificationsDescription: new TagDescriptor<"UC", string[]>(
        new Tag(0x0010, 0x0222), "UC", "Genetic Modifications Description"),
    GeneticModificationsNomenclature: new TagDescriptor<"LO", string[]>(
        new Tag(0x0010, 0x0223), "LO", "Genetic Modifications Nomenclature"),
    GeneticModificationsCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0010, 0x0229), "SQ", "Genetic Modifications Code Sequence"),
    OtherPatientIDs: new TagDescriptor<"LO", string[]>(
        new Tag(0x0010, 0x1000), "LO", "Other Patient IDs"),
    OtherPatientNames: new TagDescriptor<"PN", string[]>(
        new Tag(0x0010, 0x1001), "PN", "Other Patient Names"),
    OtherPatientIDsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0010, 0x1002), "SQ", "Other Patient IDs Sequence"),
    PatientBirthName: new TagDescriptor<"PN", string[]>(
        new Tag(0x0010, 0x1005), "PN", "Patient's Birth Name"),
    PatientAge: new TagDescriptor<"AS", string[]>(
        new Tag(0x0010, 0x1010), "AS", "Patient's Age"),
    PatientSize: new TagDescriptor<"DS", number[]>(
        new Tag(0x0010, 0x1020), "DS", "Patient's Size"),
    PatientSizeCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0010, 0x1021), "SQ", "Patient's Size Code Sequence"),
    PatientBodyMassIndex: new TagDescriptor<"DS", number[]>(
        new Tag(0x0010, 0x1022), "DS", "Patient's Body Mass Index"),
    MeasuredAPDimension: new TagDescriptor<"DS", number[]>(
        new Tag(0x0010, 0x1023), "DS", "Measured AP Dimension"),
    MeasuredLateralDimension: new TagDescriptor<"DS", number[]>(
        new Tag(0x0010, 0x1024), "DS", "Measured Lateral Dimension"),
    PatientWeight: new TagDescriptor<"DS", number[]>(
        new Tag(0x0010, 0x1030), "DS", "Patient's Weight"),
    PatientAddress: new TagDescriptor<"LO", string[]>(
        new Tag(0x0010, 0x1040), "LO", "Patient's Address"),
    InsurancePlanIdentification: new TagDescriptor<"LO", string[]>(
        new Tag(0x0010, 0x1050), "LO", "Insurance Plan Identification"),
    PatientMotherBirthName: new TagDescriptor<"PN", string[]>(
        new Tag(0x0010, 0x1060), "PN", "Patient's Mother's Birth Name"),
    MilitaryRank: new TagDescriptor<"LO", string[]>(
        new Tag(0x0010, 0x1080), "LO", "Military Rank"),
    BranchOfService: new TagDescriptor<"LO", string[]>(
        new Tag(0x0010, 0x1081), "LO", "Branch of Service"),
    MedicalRecordLocator: new TagDescriptor<"LO", string[]>(
        new Tag(0x0010, 0x1090), "LO", "Medical Record Locator"),
    ReferencedPatientPhotoSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0010, 0x1100), "SQ", "Referenced Patient Photo Sequence"),
    MedicalAlerts: new TagDescriptor<"LO", string[]>(
        new Tag(0x0010, 0x2000), "LO", "Medical Alerts"),
    Allergies: new TagDescriptor<"LO", string[]>(
        new Tag(0x0010, 0x2110), "LO", "Allergies"),
    CountryOfResidence: new TagDescriptor<"LO", string[]>(
        new Tag(0x0010, 0x2150), "LO", "Country of Residence"),
    RegionOfResidence: new TagDescriptor<"LO", string[]>(
        new Tag(0x0010, 0x2152), "LO", "Region of Residence"),
    PatientTelephoneNumbers: new TagDescriptor<"SH", string[]>(
        new Tag(0x0010, 0x2154), "SH", "Patient's Telephone Numbers"),
    PatientTelecomInformation: new TagDescriptor<"LT", string>(
        new Tag(0x0010, 0x2155), "LT", "Patient's Telecom Information"),
    EthnicGroup: new TagDescriptor<"SH", string[]>(
        new Tag(0x0010, 0x2160), "SH", "Ethnic Group"),
    Occupation: new TagDescriptor<"SH", string[]>(
        new Tag(0x0010, 0x2180), "SH", "Occupation"),
    SmokingStatus: new TagDescriptor<"CS", string[]>(
        new Tag(0x0010, 0x21A0), "CS", "Smoking Status"),
    AdditionalPatientHistory: new TagDescriptor<"LT", string>(
        new Tag(0x0010, 0x21B0), "LT", "Additional Patient History"),
    PregnancyStatus: new TagDescriptor<"US", number[]>(
        new Tag(0x0010, 0x21C0), "US", "Pregnancy Status"),
    LastMenstrualDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x0010, 0x21D0), "DA", "Last Menstrual Date"),
    PatientReligiousPreference: new TagDescriptor<"LO", string[]>(
        new Tag(0x0010, 0x21F0), "LO", "Patient's Religious Preference"),
    PatientSpeciesDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0010, 0x2201), "LO", "Patient Species Description"),
    PatientSpeciesCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0010, 0x2202), "SQ", "Patient Species Code Sequence"),
    PatientSexNeutered: new TagDescriptor<"CS", string[]>(
        new Tag(0x0010, 0x2203), "CS", "Patient's Sex Neutered"),
    AnatomicalOrientationType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0010, 0x2210), "CS", "Anatomical Orientation Type"),
    PatientBreedDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0010, 0x2292), "LO", "Patient Breed Description"),
    PatientBreedCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0010, 0x2293), "SQ", "Patient Breed Code Sequence"),
    BreedRegistrationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0010, 0x2294), "SQ", "Breed Registration Sequence"),
    BreedRegistrationNumber: new TagDescriptor<"LO", string[]>(
        new Tag(0x0010, 0x2295), "LO", "Breed Registration Number"),
    BreedRegistryCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0010, 0x2296), "SQ", "Breed Registry Code Sequence"),
    ResponsiblePerson: new TagDescriptor<"PN", string[]>(
        new Tag(0x0010, 0x2297), "PN", "Responsible Person"),
    ResponsiblePersonRole: new TagDescriptor<"CS", string[]>(
        new Tag(0x0010, 0x2298), "CS", "Responsible Person Role"),
    ResponsibleOrganization: new TagDescriptor<"LO", string[]>(
        new Tag(0x0010, 0x2299), "LO", "Responsible Organization"),
    PatientComments: new TagDescriptor<"LT", string>(
        new Tag(0x0010, 0x4000), "LT", "Patient Comments"),
    ExaminedBodyThickness: new TagDescriptor<"FL", number[]>(
        new Tag(0x0010, 0x9431), "FL", "Examined Body Thickness"),

    // Group 0x0012

    ClinicalTrialSponsorName: new TagDescriptor<"LO", string[]>(
        new Tag(0x0012, 0x0010), "LO", "Clinical Trial Sponsor Name"),
    ClinicalTrialProtocolID: new TagDescriptor<"LO", string[]>(
        new Tag(0x0012, 0x0020), "LO", "Clinical Trial Protocol ID"),
    ClinicalTrialProtocolName: new TagDescriptor<"LO", string[]>(
        new Tag(0x0012, 0x0021), "LO", "Clinical Trial Protocol Name"),
    ClinicalTrialSiteID: new TagDescriptor<"LO", string[]>(
        new Tag(0x0012, 0x0030), "LO", "Clinical Trial Site ID"),
    ClinicalTrialSiteName: new TagDescriptor<"LO", string[]>(
        new Tag(0x0012, 0x0031), "LO", "Clinical Trial Site Name"),
    ClinicalTrialSubjectID: new TagDescriptor<"LO", string[]>(
        new Tag(0x0012, 0x0040), "LO", "Clinical Trial Subject ID"),
    ClinicalTrialSubjectReadingID: new TagDescriptor<"LO", string[]>(
        new Tag(0x0012, 0x0042), "LO", "Clinical Trial Subject Reading ID"),
    ClinicalTrialTimePointID: new TagDescriptor<"LO", string[]>(
        new Tag(0x0012, 0x0050), "LO", "Clinical Trial Time Point ID"),
    ClinicalTrialTimePointDescription: new TagDescriptor<"ST", string>(
        new Tag(0x0012, 0x0051), "ST", "Clinical Trial Time Point Description"),
    LongitudinalTemporalOffsetFromEvent: new TagDescriptor<"FD", number[]>(
        new Tag(0x0012, 0x0052), "FD", "Longitudinal Temporal Offset from Event"),
    LongitudinalTemporalEventType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0012, 0x0053), "CS", "Longitudinal Temporal Event Type"),
    ClinicalTrialCoordinatingCenterName: new TagDescriptor<"LO", string[]>(
        new Tag(0x0012, 0x0060), "LO", "Clinical Trial Coordinating Center Name"),
    PatientIdentityRemoved: new TagDescriptor<"CS", string[]>(
        new Tag(0x0012, 0x0062), "CS", "Patient Identity Removed"),
    DeidentificationMethod: new TagDescriptor<"LO", string[]>(
        new Tag(0x0012, 0x0063), "LO", "De-identification Method"),
    DeidentificationMethodCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0012, 0x0064), "SQ", "De-identification Method Code Sequence"),
    ClinicalTrialSeriesID: new TagDescriptor<"LO", string[]>(
        new Tag(0x0012, 0x0071), "LO", "Clinical Trial Series ID"),
    ClinicalTrialSeriesDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0012, 0x0072), "LO", "Clinical Trial Series Description"),
    ClinicalTrialProtocolEthicsCommitteeName: new TagDescriptor<"LO", string[]>(
        new Tag(0x0012, 0x0081), "LO", "Clinical Trial Protocol Ethics Committee Name"),
    ClinicalTrialProtocolEthicsCommitteeApprovalNumber: new TagDescriptor<"LO", string[]>(
        new Tag(0x0012, 0x0082), "LO", "Clinical Trial Protocol Ethics Committee Approval Number"),
    ConsentForClinicalTrialUseSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0012, 0x0083), "SQ", "Consent for Clinical Trial Use Sequence"),
    DistributionType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0012, 0x0084), "CS", "Distribution Type"),
    ConsentForDistributionFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0012, 0x0085), "CS", "Consent for Distribution Flag"),
    EthicsCommitteeApprovalEffectivenessStartDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x0012, 0x0086), "DA", "Ethics Committee Approval Effectiveness Start Date"),
    EthicsCommitteeApprovalEffectivenessEndDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x0012, 0x0087), "DA", "Ethics Committee Approval Effectiveness End Date"),

    // Group 0x0014

    CADFileFormat: new TagDescriptor<"ST", string>(
        new Tag(0x0014, 0x0023), "ST", "CAD File Format"),
    ComponentReferenceSystem: new TagDescriptor<"ST", string>(
        new Tag(0x0014, 0x0024), "ST", "Component Reference System"),
    ComponentManufacturingProcedure: new TagDescriptor<"ST", string>(
        new Tag(0x0014, 0x0025), "ST", "Component Manufacturing Procedure"),
    ComponentManufacturer: new TagDescriptor<"ST", string>(
        new Tag(0x0014, 0x0028), "ST", "Component Manufacturer"),
    MaterialThickness: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x0030), "DS", "Material Thickness"),
    MaterialPipeDiameter: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x0032), "DS", "Material Pipe Diameter"),
    MaterialIsolationDiameter: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x0034), "DS", "Material Isolation Diameter"),
    MaterialGrade: new TagDescriptor<"ST", string>(
        new Tag(0x0014, 0x0042), "ST", "Material Grade"),
    MaterialPropertiesDescription: new TagDescriptor<"ST", string>(
        new Tag(0x0014, 0x0044), "ST", "Material Properties Description"),
    MaterialPropertiesFileFormatRetired: new TagDescriptor<"ST", string>(
        new Tag(0x0014, 0x0045), "ST", "Material Properties File Format (Retired)"),
    MaterialNotes: new TagDescriptor<"LT", string>(
        new Tag(0x0014, 0x0046), "LT", "Material Notes"),
    ComponentShape: new TagDescriptor<"CS", string[]>(
        new Tag(0x0014, 0x0050), "CS", "Component Shape"),
    CurvatureType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0014, 0x0052), "CS", "Curvature Type"),
    OuterDiameter: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x0054), "DS", "Outer Diameter"),
    InnerDiameter: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x0056), "DS", "Inner Diameter"),
    ComponentWelderIDs: new TagDescriptor<"LO", string[]>(
        new Tag(0x0014, 0x0100), "LO", "Component Welder IDs"),
    SecondaryApprovalStatus: new TagDescriptor<"CS", string[]>(
        new Tag(0x0014, 0x0101), "CS", "Secondary Approval Status"),
    SecondaryReviewDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x0014, 0x0102), "DA", "Secondary Review Date"),
    SecondaryReviewTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x0014, 0x0103), "TM", "Secondary Review Time"),
    SecondaryReviewerName: new TagDescriptor<"PN", string[]>(
        new Tag(0x0014, 0x0104), "PN", "Secondary Reviewer Name"),
    RepairID: new TagDescriptor<"ST", string>(
        new Tag(0x0014, 0x0105), "ST", "Repair ID"),
    MultipleComponentApprovalSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0014, 0x0106), "SQ", "Multiple Component Approval Sequence"),
    OtherApprovalStatus: new TagDescriptor<"CS", string[]>(
        new Tag(0x0014, 0x0107), "CS", "Other Approval Status"),
    OtherSecondaryApprovalStatus: new TagDescriptor<"CS", string[]>(
        new Tag(0x0014, 0x0108), "CS", "Other Secondary Approval Status"),
    ActualEnvironmentalConditions: new TagDescriptor<"ST", string>(
        new Tag(0x0014, 0x1010), "ST", "Actual Environmental Conditions"),
    ExpiryDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x0014, 0x1020), "DA", "Expiry Date"),
    EnvironmentalConditions: new TagDescriptor<"ST", string>(
        new Tag(0x0014, 0x1040), "ST", "Environmental Conditions"),
    EvaluatorSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0014, 0x2002), "SQ", "Evaluator Sequence"),
    EvaluatorNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x0014, 0x2004), "IS", "Evaluator Number"),
    EvaluatorName: new TagDescriptor<"PN", string[]>(
        new Tag(0x0014, 0x2006), "PN", "Evaluator Name"),
    EvaluationAttempt: new TagDescriptor<"IS", number[]>(
        new Tag(0x0014, 0x2008), "IS", "Evaluation Attempt"),
    IndicationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0014, 0x2012), "SQ", "Indication Sequence"),
    IndicationNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x0014, 0x2014), "IS", "Indication Number"),
    IndicationLabel: new TagDescriptor<"SH", string[]>(
        new Tag(0x0014, 0x2016), "SH", "Indication Label"),
    IndicationDescription: new TagDescriptor<"ST", string>(
        new Tag(0x0014, 0x2018), "ST", "Indication Description"),
    IndicationType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0014, 0x201A), "CS", "Indication Type"),
    IndicationDisposition: new TagDescriptor<"CS", string[]>(
        new Tag(0x0014, 0x201C), "CS", "Indication Disposition"),
    IndicationROISequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0014, 0x201E), "SQ", "Indication ROI Sequence"),
    IndicationPhysicalPropertySequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0014, 0x2030), "SQ", "Indication Physical Property Sequence"),
    PropertyLabel: new TagDescriptor<"SH", string[]>(
        new Tag(0x0014, 0x2032), "SH", "Property Label"),
    CoordinateSystemNumberOfAxes: new TagDescriptor<"IS", number[]>(
        new Tag(0x0014, 0x2202), "IS", "Coordinate System Number of Axes"),
    CoordinateSystemAxesSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0014, 0x2204), "SQ", "Coordinate System Axes Sequence"),
    CoordinateSystemAxisDescription: new TagDescriptor<"ST", string>(
        new Tag(0x0014, 0x2206), "ST", "Coordinate System Axis Description"),
    CoordinateSystemDataSetMapping: new TagDescriptor<"CS", string[]>(
        new Tag(0x0014, 0x2208), "CS", "Coordinate System Data Set Mapping"),
    CoordinateSystemAxisNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x0014, 0x220A), "IS", "Coordinate System Axis Number"),
    CoordinateSystemAxisType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0014, 0x220C), "CS", "Coordinate System Axis Type"),
    CoordinateSystemAxisUnits: new TagDescriptor<"CS", string[]>(
        new Tag(0x0014, 0x220E), "CS", "Coordinate System Axis Units"),
    CoordinateSystemAxisValues: new TagDescriptor<"OB", Uint8Array | LazyValue<Uint8Array>>(
        new Tag(0x0014, 0x2210), "OB", "Coordinate System Axis Values"),
    CoordinateSystemTransformSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0014, 0x2220), "SQ", "Coordinate System Transform Sequence"),
    TransformDescription: new TagDescriptor<"ST", string>(
        new Tag(0x0014, 0x2222), "ST", "Transform Description"),
    TransformNumberOfAxes: new TagDescriptor<"IS", number[]>(
        new Tag(0x0014, 0x2224), "IS", "Transform Number of Axes"),
    TransformOrderOfAxes: new TagDescriptor<"IS", number[]>(
        new Tag(0x0014, 0x2226), "IS", "Transform Order of Axes"),
    TransformedAxisUnits: new TagDescriptor<"CS", string[]>(
        new Tag(0x0014, 0x2228), "CS", "Transformed Axis Units"),
    CoordinateSystemTransformRotationAndScaleMatrix: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x222A), "DS", "Coordinate System Transform Rotation and Scale Matrix"),
    CoordinateSystemTransformTranslationMatrix: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x222C), "DS", "Coordinate System Transform Translation Matrix"),
    InternalDetectorFrameTime: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x3011), "DS", "Internal Detector Frame Time"),
    NumberOfFramesIntegrated: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x3012), "DS", "Number of Frames Integrated"),
    DetectorTemperatureSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0014, 0x3020), "SQ", "Detector Temperature Sequence"),
    SensorName: new TagDescriptor<"ST", string>(
        new Tag(0x0014, 0x3022), "ST", "Sensor Name"),
    HorizontalOffsetOfSensor: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x3024), "DS", "Horizontal Offset of Sensor"),
    VerticalOffsetOfSensor: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x3026), "DS", "Vertical Offset of Sensor"),
    SensorTemperature: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x3028), "DS", "Sensor Temperature"),
    DarkCurrentSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0014, 0x3040), "SQ", "Dark Current Sequence"),
    GainCorrectionReferenceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0014, 0x3060), "SQ", "Gain Correction Reference Sequence"),
    KVUsedInGainCalibration: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x3071), "DS", "KV Used in Gain Calibration"),
    MAUsedInGainCalibration: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x3072), "DS", "MA Used in Gain Calibration"),
    NumberOfFramesUsedForIntegration: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x3073), "DS", "Number of Frames Used for Integration"),
    FilterMaterialUsedInGainCalibration: new TagDescriptor<"LO", string[]>(
        new Tag(0x0014, 0x3074), "LO", "Filter Material Used in Gain Calibration"),
    FilterThicknessUsedInGainCalibration: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x3075), "DS", "Filter Thickness Used in Gain Calibration"),
    DateOfGainCalibration: new TagDescriptor<"DA", string[]>(
        new Tag(0x0014, 0x3076), "DA", "Date of Gain Calibration"),
    TimeOfGainCalibration: new TagDescriptor<"TM", string[]>(
        new Tag(0x0014, 0x3077), "TM", "Time of Gain Calibration"),
    BadPixelImage: new TagDescriptor<"OB", Uint8Array | LazyValue<Uint8Array>>(
        new Tag(0x0014, 0x3080), "OB", "Bad Pixel Image"),
    CalibrationNotes: new TagDescriptor<"LT", string>(
        new Tag(0x0014, 0x3099), "LT", "Calibration Notes"),
    PulserEquipmentSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0014, 0x4002), "SQ", "Pulser Equipment Sequence"),
    PulserType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0014, 0x4004), "CS", "Pulser Type"),
    PulserNotes: new TagDescriptor<"LT", string>(
        new Tag(0x0014, 0x4006), "LT", "Pulser Notes"),
    ReceiverEquipmentSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0014, 0x4008), "SQ", "Receiver Equipment Sequence"),
    AmplifierType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0014, 0x400A), "CS", "Amplifier Type"),
    ReceiverNotes: new TagDescriptor<"LT", string>(
        new Tag(0x0014, 0x400C), "LT", "Receiver Notes"),
    PreAmplifierEquipmentSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0014, 0x400E), "SQ", "Pre-Amplifier Equipment Sequence"),
    PreAmplifierNotes: new TagDescriptor<"LT", string>(
        new Tag(0x0014, 0x400F), "LT", "Pre-Amplifier Notes"),
    TransmitTransducerSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0014, 0x4010), "SQ", "Transmit Transducer Sequence"),
    ReceiveTransducerSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0014, 0x4011), "SQ", "Receive Transducer Sequence"),
    NumberOfElements: new TagDescriptor<"US", number[]>(
        new Tag(0x0014, 0x4012), "US", "Number of Elements"),
    ElementShape: new TagDescriptor<"CS", string[]>(
        new Tag(0x0014, 0x4013), "CS", "Element Shape"),
    ElementDimensionA: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x4014), "DS", "Element Dimension A"),
    ElementDimensionB: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x4015), "DS", "Element Dimension B"),
    ElementPitchA: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x4016), "DS", "Element Pitch A"),
    MeasuredBeamDimensionA: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x4017), "DS", "Measured Beam Dimension A"),
    MeasuredBeamDimensionB: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x4018), "DS", "Measured Beam Dimension B"),
    LocationOfMeasuredBeamDiameter: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x4019), "DS", "Location of Measured Beam Diameter"),
    NominalFrequency: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x401A), "DS", "Nominal Frequency"),
    MeasuredCenterFrequency: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x401B), "DS", "Measured Center Frequency"),
    MeasuredBandwidth: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x401C), "DS", "Measured Bandwidth"),
    ElementPitchB: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x401D), "DS", "Element Pitch B"),
    PulserSettingsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0014, 0x4020), "SQ", "Pulser Settings Sequence"),
    PulseWidth: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x4022), "DS", "Pulse Width"),
    ExcitationFrequency: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x4024), "DS", "Excitation Frequency"),
    ModulationType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0014, 0x4026), "CS", "Modulation Type"),
    Damping: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x4028), "DS", "Damping"),
    ReceiverSettingsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0014, 0x4030), "SQ", "Receiver Settings Sequence"),
    AcquiredSoundpathLength: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x4031), "DS", "Acquired Soundpath Length"),
    AcquisitionCompressionType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0014, 0x4032), "CS", "Acquisition Compression Type"),
    AcquisitionSampleSize: new TagDescriptor<"IS", number[]>(
        new Tag(0x0014, 0x4033), "IS", "Acquisition Sample Size"),
    RectifierSmoothing: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x4034), "DS", "Rectifier Smoothing"),
    DACSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0014, 0x4035), "SQ", "DAC Sequence"),
    DACType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0014, 0x4036), "CS", "DAC Type"),
    DACGainPoints: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x4038), "DS", "DAC Gain Points"),
    DACTimePoints: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x403A), "DS", "DAC Time Points"),
    DACAmplitude: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x403C), "DS", "DAC Amplitude"),
    PreAmplifierSettingsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0014, 0x4040), "SQ", "Pre-Amplifier Settings Sequence"),
    TransmitTransducerSettingsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0014, 0x4050), "SQ", "Transmit Transducer Settings Sequence"),
    ReceiveTransducerSettingsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0014, 0x4051), "SQ", "Receive Transducer Settings Sequence"),
    IncidentAngle: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x4052), "DS", "Incident Angle"),
    CouplingTechnique: new TagDescriptor<"ST", string>(
        new Tag(0x0014, 0x4054), "ST", "Coupling Technique"),
    CouplingMedium: new TagDescriptor<"ST", string>(
        new Tag(0x0014, 0x4056), "ST", "Coupling Medium"),
    CouplingVelocity: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x4057), "DS", "Coupling Velocity"),
    ProbeCenterLocationX: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x4058), "DS", "Probe Center Location X"),
    ProbeCenterLocationZ: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x4059), "DS", "Probe Center Location Z"),
    SoundPathLength: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x405A), "DS", "Sound Path Length"),
    DelayLawIdentifier: new TagDescriptor<"ST", string>(
        new Tag(0x0014, 0x405C), "ST", "Delay Law Identifier"),
    GateSettingsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0014, 0x4060), "SQ", "Gate Settings Sequence"),
    GateThreshold: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x4062), "DS", "Gate Threshold"),
    VelocityOfSound: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x4064), "DS", "Velocity of Sound"),
    CalibrationSettingsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0014, 0x4070), "SQ", "Calibration Settings Sequence"),
    CalibrationProcedure: new TagDescriptor<"ST", string>(
        new Tag(0x0014, 0x4072), "ST", "Calibration Procedure"),
    ProcedureVersion: new TagDescriptor<"SH", string[]>(
        new Tag(0x0014, 0x4074), "SH", "Procedure Version"),
    ProcedureCreationDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x0014, 0x4076), "DA", "Procedure Creation Date"),
    ProcedureExpirationDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x0014, 0x4078), "DA", "Procedure Expiration Date"),
    ProcedureLastModifiedDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x0014, 0x407A), "DA", "Procedure Last Modified Date"),
    CalibrationTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x0014, 0x407C), "TM", "Calibration Time"),
    CalibrationDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x0014, 0x407E), "DA", "Calibration Date"),
    ProbeDriveEquipmentSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0014, 0x4080), "SQ", "Probe Drive Equipment Sequence"),
    DriveType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0014, 0x4081), "CS", "Drive Type"),
    ProbeDriveNotes: new TagDescriptor<"LT", string>(
        new Tag(0x0014, 0x4082), "LT", "Probe Drive Notes"),
    DriveProbeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0014, 0x4083), "SQ", "Drive Probe Sequence"),
    ProbeInductance: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x4084), "DS", "Probe Inductance"),
    ProbeResistance: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x4085), "DS", "Probe Resistance"),
    ReceiveProbeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0014, 0x4086), "SQ", "Receive Probe Sequence"),
    ProbeDriveSettingsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0014, 0x4087), "SQ", "Probe Drive Settings Sequence"),
    BridgeResistors: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x4088), "DS", "Bridge Resistors"),
    ProbeOrientationAngle: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x4089), "DS", "Probe Orientation Angle"),
    UserSelectedGainY: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x408B), "DS", "User Selected Gain Y"),
    UserSelectedPhase: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x408C), "DS", "User Selected Phase"),
    UserSelectedOffsetX: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x408D), "DS", "User Selected Offset X"),
    UserSelectedOffsetY: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x408E), "DS", "User Selected Offset Y"),
    ChannelSettingsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0014, 0x4091), "SQ", "Channel Settings Sequence"),
    ChannelThreshold: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x4092), "DS", "Channel Threshold"),
    ScannerSettingsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0014, 0x409A), "SQ", "Scanner Settings Sequence"),
    ScanProcedure: new TagDescriptor<"ST", string>(
        new Tag(0x0014, 0x409B), "ST", "Scan Procedure"),
    TranslationRateX: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x409C), "DS", "Translation Rate X"),
    TranslationRateY: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x409D), "DS", "Translation Rate Y"),
    ChannelOverlap: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x409F), "DS", "Channel Overlap"),
    ImageQualityIndicatorType: new TagDescriptor<"LO", string[]>(
        new Tag(0x0014, 0x40A0), "LO", "Image Quality Indicator Type"),
    ImageQualityIndicatorMaterial: new TagDescriptor<"LO", string[]>(
        new Tag(0x0014, 0x40A1), "LO", "Image Quality Indicator Material"),
    ImageQualityIndicatorSize: new TagDescriptor<"LO", string[]>(
        new Tag(0x0014, 0x40A2), "LO", "Image Quality Indicator Size"),
    LINACEnergy: new TagDescriptor<"IS", number[]>(
        new Tag(0x0014, 0x5002), "IS", "LINAC Energy"),
    LINACOutput: new TagDescriptor<"IS", number[]>(
        new Tag(0x0014, 0x5004), "IS", "LINAC Output"),
    ActiveAperture: new TagDescriptor<"US", number[]>(
        new Tag(0x0014, 0x5100), "US", "Active Aperture"),
    TotalAperture: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x5101), "DS", "Total Aperture"),
    ApertureElevation: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x5102), "DS", "Aperture Elevation"),
    MainLobeAngle: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x5103), "DS", "Main Lobe Angle"),
    MainRoofAngle: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x5104), "DS", "Main Roof Angle"),
    ConnectorType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0014, 0x5105), "CS", "Connector Type"),
    WedgeModelNumber: new TagDescriptor<"SH", string[]>(
        new Tag(0x0014, 0x5106), "SH", "Wedge Model Number"),
    WedgeAngleFloat: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x5107), "DS", "Wedge Angle Float"),
    WedgeRoofAngle: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x5108), "DS", "Wedge Roof Angle"),
    WedgeElement1Position: new TagDescriptor<"CS", string[]>(
        new Tag(0x0014, 0x5109), "CS", "Wedge Element 1 Position"),
    WedgeMaterialVelocity: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x510A), "DS", "Wedge Material Velocity"),
    WedgeMaterial: new TagDescriptor<"SH", string[]>(
        new Tag(0x0014, 0x510B), "SH", "Wedge Material"),
    WedgeOffsetZ: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x510C), "DS", "Wedge Offset Z"),
    WedgeOriginOffsetX: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x510D), "DS", "Wedge Origin Offset X"),
    WedgeTimeDelay: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x510E), "DS", "Wedge Time Delay"),
    WedgeName: new TagDescriptor<"SH", string[]>(
        new Tag(0x0014, 0x510F), "SH", "Wedge Name"),
    WedgeManufacturerName: new TagDescriptor<"SH", string[]>(
        new Tag(0x0014, 0x5110), "SH", "Wedge Manufacturer Name"),
    WedgeDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0014, 0x5111), "LO", "Wedge Description"),
    NominalBeamAngle: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x5112), "DS", "Nominal Beam Angle"),
    WedgeOffsetX: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x5113), "DS", "Wedge Offset X"),
    WedgeOffsetY: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x5114), "DS", "Wedge Offset Y"),
    WedgeTotalLength: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x5115), "DS", "Wedge Total Length"),
    WedgeInContactLength: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x5116), "DS", "Wedge In Contact Length"),
    WedgeFrontGap: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x5117), "DS", "Wedge Front Gap"),
    WedgeTotalHeight: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x5118), "DS", "Wedge Total Height"),
    WedgeFrontHeight: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x5119), "DS", "Wedge Front Height"),
    WedgeRearHeight: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x511A), "DS", "Wedge Rear Height"),
    WedgeTotalWidth: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x511B), "DS", "Wedge Total Width"),
    WedgeInContactWidth: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x511C), "DS", "Wedge In Contact Width"),
    WedgeChamferHeight: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x511D), "DS", "Wedge Chamfer Height"),
    WedgeCurve: new TagDescriptor<"CS", string[]>(
        new Tag(0x0014, 0x511E), "CS", "Wedge Curve"),
    RadiusAlongWedge: new TagDescriptor<"DS", number[]>(
        new Tag(0x0014, 0x511F), "DS", "Radius Along the Wedge"),

    // Group 0x0018

    ContrastBolusAgent: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x0010), "LO", "Contrast/Bolus Agent"),
    ContrastBolusAgentSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x0012), "SQ", "Contrast/Bolus Agent Sequence"),
    ContrastBolusT1Relaxivity: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x0013), "FL", "Contrast/Bolus T1 Relaxivity"),
    ContrastBolusAdministrationRouteSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x0014), "SQ", "Contrast/Bolus Administration Route Sequence"),
    BodyPartExamined: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x0015), "CS", "Body Part Examined"),
    ScanningSequence: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x0020), "CS", "Scanning Sequence"),
    SequenceVariant: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x0021), "CS", "Sequence Variant"),
    ScanOptions: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x0022), "CS", "Scan Options"),
    MRAcquisitionType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x0023), "CS", "MR Acquisition Type"),
    SequenceName: new TagDescriptor<"SH", string[]>(
        new Tag(0x0018, 0x0024), "SH", "Sequence Name"),
    AngioFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x0025), "CS", "Angio Flag"),
    InterventionDrugInformationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x0026), "SQ", "Intervention Drug Information Sequence"),
    InterventionDrugStopTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x0018, 0x0027), "TM", "Intervention Drug Stop Time"),
    InterventionDrugDose: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x0028), "DS", "Intervention Drug Dose"),
    InterventionDrugCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x0029), "SQ", "Intervention Drug Code Sequence"),
    AdditionalDrugSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x002A), "SQ", "Additional Drug Sequence"),
    Radionuclide: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x0030), "LO", "Radionuclide"),
    Radiopharmaceutical: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x0031), "LO", "Radiopharmaceutical"),
    EnergyWindowCenterline: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x0032), "DS", "Energy Window Centerline"),
    EnergyWindowTotalWidth: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x0033), "DS", "Energy Window Total Width"),
    InterventionDrugName: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x0034), "LO", "Intervention Drug Name"),
    InterventionDrugStartTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x0018, 0x0035), "TM", "Intervention Drug Start Time"),
    InterventionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x0036), "SQ", "Intervention Sequence"),
    TherapyType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x0037), "CS", "Therapy Type"),
    InterventionStatus: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x0038), "CS", "Intervention Status"),
    TherapyDescription: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x0039), "CS", "Therapy Description"),
    InterventionDescription: new TagDescriptor<"ST", string>(
        new Tag(0x0018, 0x003A), "ST", "Intervention Description"),
    CineRate: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x0040), "IS", "Cine Rate"),
    InitialCineRunState: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x0042), "CS", "Initial Cine Run State"),
    SliceThickness: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x0050), "DS", "Slice Thickness"),
    KVP: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x0060), "DS", "KVP"),
    CountsAccumulated: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x0070), "IS", "Counts Accumulated"),
    AcquisitionTerminationCondition: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x0071), "CS", "Acquisition Termination Condition"),
    EffectiveDuration: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x0072), "DS", "Effective Duration"),
    AcquisitionStartCondition: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x0073), "CS", "Acquisition Start Condition"),
    AcquisitionStartConditionData: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x0074), "IS", "Acquisition Start Condition Data"),
    AcquisitionTerminationConditionData: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x0075), "IS", "Acquisition Termination Condition Data"),
    RepetitionTime: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x0080), "DS", "Repetition Time"),
    EchoTime: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x0081), "DS", "Echo Time"),
    InversionTime: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x0082), "DS", "Inversion Time"),
    NumberOfAverages: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x0083), "DS", "Number of Averages"),
    ImagingFrequency: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x0084), "DS", "Imaging Frequency"),
    ImagedNucleus: new TagDescriptor<"SH", string[]>(
        new Tag(0x0018, 0x0085), "SH", "Imaged Nucleus"),
    EchoNumbers: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x0086), "IS", "Echo Number(s)"),
    MagneticFieldStrength: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x0087), "DS", "Magnetic Field Strength"),
    SpacingBetweenSlices: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x0088), "DS", "Spacing Between Slices"),
    NumberOfPhaseEncodingSteps: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x0089), "IS", "Number of Phase Encoding Steps"),
    DataCollectionDiameter: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x0090), "DS", "Data Collection Diameter"),
    EchoTrainLength: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x0091), "IS", "Echo Train Length"),
    PercentSampling: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x0093), "DS", "Percent Sampling"),
    PercentPhaseFieldOfView: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x0094), "DS", "Percent Phase Field of View"),
    PixelBandwidth: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x0095), "DS", "Pixel Bandwidth"),
    DeviceSerialNumber: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x1000), "LO", "Device Serial Number"),
    DeviceUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0018, 0x1002), "UI", "Device UID"),
    DeviceID: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x1003), "LO", "Device ID"),
    PlateID: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x1004), "LO", "Plate ID"),
    GeneratorID: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x1005), "LO", "Generator ID"),
    GridID: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x1006), "LO", "Grid ID"),
    CassetteID: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x1007), "LO", "Cassette ID"),
    GantryID: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x1008), "LO", "Gantry ID"),
    UniqueDeviceIdentifier: new TagDescriptor<"UT", string>(
        new Tag(0x0018, 0x1009), "UT", "Unique Device Identifier"),
    UDISequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x100A), "SQ", "UDI Sequence"),
    SecondaryCaptureDeviceID: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x1010), "LO", "Secondary Capture Device ID"),
    HardcopyCreationDeviceID: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x1011), "LO", "Hardcopy Creation Device ID"),
    DateOfSecondaryCapture: new TagDescriptor<"DA", string[]>(
        new Tag(0x0018, 0x1012), "DA", "Date of Secondary Capture"),
    TimeOfSecondaryCapture: new TagDescriptor<"TM", string[]>(
        new Tag(0x0018, 0x1014), "TM", "Time of Secondary Capture"),
    SecondaryCaptureDeviceManufacturer: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x1016), "LO", "Secondary Capture Device Manufacturer"),
    HardcopyDeviceManufacturer: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x1017), "LO", "Hardcopy Device Manufacturer"),
    SecondaryCaptureDeviceManufacturerModelName: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x1018), "LO", "Secondary Capture Device Manufacturer's Model Name"),
    SecondaryCaptureDeviceSoftwareVersions: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x1019), "LO", "Secondary Capture Device Software Versions"),
    HardcopyDeviceSoftwareVersion: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x101A), "LO", "Hardcopy Device Software Version"),
    HardcopyDeviceManufacturerModelName: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x101B), "LO", "Hardcopy Device Manufacturer's Model Name"),
    SoftwareVersions: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x1020), "LO", "Software Version(s)"),
    VideoImageFormatAcquired: new TagDescriptor<"SH", string[]>(
        new Tag(0x0018, 0x1022), "SH", "Video Image Format Acquired"),
    DigitalImageFormatAcquired: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x1023), "LO", "Digital Image Format Acquired"),
    ProtocolName: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x1030), "LO", "Protocol Name"),
    ContrastBolusRoute: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x1040), "LO", "Contrast/Bolus Route"),
    ContrastBolusVolume: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1041), "DS", "Contrast/Bolus Volume"),
    ContrastBolusStartTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x0018, 0x1042), "TM", "Contrast/Bolus Start Time"),
    ContrastBolusStopTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x0018, 0x1043), "TM", "Contrast/Bolus Stop Time"),
    ContrastBolusTotalDose: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1044), "DS", "Contrast/Bolus Total Dose"),
    SyringeCounts: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x1045), "IS", "Syringe Counts"),
    ContrastFlowRate: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1046), "DS", "Contrast Flow Rate"),
    ContrastFlowDuration: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1047), "DS", "Contrast Flow Duration"),
    ContrastBolusIngredient: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x1048), "CS", "Contrast/Bolus Ingredient"),
    ContrastBolusIngredientConcentration: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1049), "DS", "Contrast/Bolus Ingredient Concentration"),
    SpatialResolution: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1050), "DS", "Spatial Resolution"),
    TriggerTime: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1060), "DS", "Trigger Time"),
    TriggerSourceOrType: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x1061), "LO", "Trigger Source or Type"),
    NominalInterval: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x1062), "IS", "Nominal Interval"),
    FrameTime: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1063), "DS", "Frame Time"),
    CardiacFramingType: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x1064), "LO", "Cardiac Framing Type"),
    FrameTimeVector: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1065), "DS", "Frame Time Vector"),
    FrameDelay: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1066), "DS", "Frame Delay"),
    ImageTriggerDelay: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1067), "DS", "Image Trigger Delay"),
    MultiplexGroupTimeOffset: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1068), "DS", "Multiplex Group Time Offset"),
    TriggerTimeOffset: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1069), "DS", "Trigger Time Offset"),
    SynchronizationTrigger: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x106A), "CS", "Synchronization Trigger"),
    SynchronizationChannel: new TagDescriptor<"US", number[]>(
        new Tag(0x0018, 0x106C), "US", "Synchronization Channel"),
    TriggerSamplePosition: new TagDescriptor<"UL", number[]>(
        new Tag(0x0018, 0x106E), "UL", "Trigger Sample Position"),
    RadiopharmaceuticalRoute: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x1070), "LO", "Radiopharmaceutical Route"),
    RadiopharmaceuticalVolume: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1071), "DS", "Radiopharmaceutical Volume"),
    RadiopharmaceuticalStartTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x0018, 0x1072), "TM", "Radiopharmaceutical Start Time"),
    RadiopharmaceuticalStopTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x0018, 0x1073), "TM", "Radiopharmaceutical Stop Time"),
    RadionuclideTotalDose: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1074), "DS", "Radionuclide Total Dose"),
    RadionuclideHalfLife: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1075), "DS", "Radionuclide Half Life"),
    RadionuclidePositronFraction: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1076), "DS", "Radionuclide Positron Fraction"),
    RadiopharmaceuticalSpecificActivity: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1077), "DS", "Radiopharmaceutical Specific Activity"),
    RadiopharmaceuticalStartDateTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x0018, 0x1078), "DT", "Radiopharmaceutical Start DateTime"),
    RadiopharmaceuticalStopDateTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x0018, 0x1079), "DT", "Radiopharmaceutical Stop DateTime"),
    BeatRejectionFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x1080), "CS", "Beat Rejection Flag"),
    LowRRValue: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x1081), "IS", "Low R-R Value"),
    HighRRValue: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x1082), "IS", "High R-R Value"),
    IntervalsAcquired: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x1083), "IS", "Intervals Acquired"),
    IntervalsRejected: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x1084), "IS", "Intervals Rejected"),
    PVCRejection: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x1085), "LO", "PVC Rejection"),
    SkipBeats: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x1086), "IS", "Skip Beats"),
    HeartRate: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x1088), "IS", "Heart Rate"),
    CardiacNumberOfImages: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x1090), "IS", "Cardiac Number of Images"),
    TriggerWindow: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x1094), "IS", "Trigger Window"),
    ReconstructionDiameter: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1100), "DS", "Reconstruction Diameter"),
    DistanceSourceToDetector: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1110), "DS", "Distance Source to Detector"),
    DistanceSourceToPatient: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1111), "DS", "Distance Source to Patient"),
    EstimatedRadiographicMagnificationFactor: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1114), "DS", "Estimated Radiographic Magnification Factor"),
    GantryDetectorTilt: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1120), "DS", "Gantry/Detector Tilt"),
    GantryDetectorSlew: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1121), "DS", "Gantry/Detector Slew"),
    TableHeight: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1130), "DS", "Table Height"),
    TableTraverse: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1131), "DS", "Table Traverse"),
    TableMotion: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x1134), "CS", "Table Motion"),
    TableVerticalIncrement: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1135), "DS", "Table Vertical Increment"),
    TableLateralIncrement: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1136), "DS", "Table Lateral Increment"),
    TableLongitudinalIncrement: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1137), "DS", "Table Longitudinal Increment"),
    TableAngle: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1138), "DS", "Table Angle"),
    TableType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x113A), "CS", "Table Type"),
    RotationDirection: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x1140), "CS", "Rotation Direction"),
    AngularPosition: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1141), "DS", "Angular Position"),
    RadialPosition: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1142), "DS", "Radial Position"),
    ScanArc: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1143), "DS", "Scan Arc"),
    AngularStep: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1144), "DS", "Angular Step"),
    CenterOfRotationOffset: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1145), "DS", "Center of Rotation Offset"),
    RotationOffset: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1146), "DS", "Rotation Offset"),
    FieldOfViewShape: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x1147), "CS", "Field of View Shape"),
    FieldOfViewDimensions: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x1149), "IS", "Field of View Dimension(s)"),
    ExposureTime: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x1150), "IS", "Exposure Time"),
    XRayTubeCurrent: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x1151), "IS", "X-Ray Tube Current"),
    Exposure: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x1152), "IS", "Exposure"),
    ExposureInuAs: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x1153), "IS", "Exposure in ВµAs"),
    AveragePulseWidth: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1154), "DS", "Average Pulse Width"),
    RadiationSetting: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x1155), "CS", "Radiation Setting"),
    RectificationType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x1156), "CS", "Rectification Type"),
    RadiationMode: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x115A), "CS", "Radiation Mode"),
    ImageAndFluoroscopyAreaDoseProduct: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x115E), "DS", "Image and Fluoroscopy Area Dose Product"),
    FilterType: new TagDescriptor<"SH", string[]>(
        new Tag(0x0018, 0x1160), "SH", "Filter Type"),
    TypeOfFilters: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x1161), "LO", "Type of Filters"),
    IntensifierSize: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1162), "DS", "Intensifier Size"),
    ImagerPixelSpacing: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1164), "DS", "Imager Pixel Spacing"),
    Grid: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x1166), "CS", "Grid"),
    GeneratorPower: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x1170), "IS", "Generator Power"),
    CollimatorGridName: new TagDescriptor<"SH", string[]>(
        new Tag(0x0018, 0x1180), "SH", "Collimator/grid Name"),
    CollimatorType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x1181), "CS", "Collimator Type"),
    FocalDistance: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x1182), "IS", "Focal Distance"),
    XFocusCenter: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1183), "DS", "X Focus Center"),
    YFocusCenter: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1184), "DS", "Y Focus Center"),
    FocalSpots: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1190), "DS", "Focal Spot(s)"),
    AnodeTargetMaterial: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x1191), "CS", "Anode Target Material"),
    BodyPartThickness: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x11A0), "DS", "Body Part Thickness"),
    CompressionForce: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x11A2), "DS", "Compression Force"),
    CompressionPressure: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x11A3), "DS", "Compression Pressure"),
    PaddleDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x11A4), "LO", "Paddle Description"),
    CompressionContactArea: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x11A5), "DS", "Compression Contact Area"),
    DateOfLastCalibration: new TagDescriptor<"DA", string[]>(
        new Tag(0x0018, 0x1200), "DA", "Date of Last Calibration"),
    TimeOfLastCalibration: new TagDescriptor<"TM", string[]>(
        new Tag(0x0018, 0x1201), "TM", "Time of Last Calibration"),
    DateTimeOfLastCalibration: new TagDescriptor<"DT", string[]>(
        new Tag(0x0018, 0x1202), "DT", "DateTime of Last Calibration"),
    ConvolutionKernel: new TagDescriptor<"SH", string[]>(
        new Tag(0x0018, 0x1210), "SH", "Convolution Kernel"),
    UpperLowerPixelValues: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x1240), "IS", "Upper/Lower Pixel Values"),
    ActualFrameDuration: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x1242), "IS", "Actual Frame Duration"),
    CountRate: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x1243), "IS", "Count Rate"),
    PreferredPlaybackSequencing: new TagDescriptor<"US", number[]>(
        new Tag(0x0018, 0x1244), "US", "Preferred Playback Sequencing"),
    ReceiveCoilName: new TagDescriptor<"SH", string[]>(
        new Tag(0x0018, 0x1250), "SH", "Receive Coil Name"),
    TransmitCoilName: new TagDescriptor<"SH", string[]>(
        new Tag(0x0018, 0x1251), "SH", "Transmit Coil Name"),
    PlateType: new TagDescriptor<"SH", string[]>(
        new Tag(0x0018, 0x1260), "SH", "Plate Type"),
    PhosphorType: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x1261), "LO", "Phosphor Type"),
    WaterEquivalentDiameter: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x1271), "FD", "Water Equivalent Diameter"),
    WaterEquivalentDiameterCalculationMethodCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x1272), "SQ", "Water Equivalent Diameter Calculation Method Code Sequence"),
    ScanVelocity: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1300), "DS", "Scan Velocity"),
    WholeBodyTechnique: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x1301), "CS", "Whole Body Technique"),
    ScanLength: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x1302), "IS", "Scan Length"),
    AcquisitionMatrix: new TagDescriptor<"US", number[]>(
        new Tag(0x0018, 0x1310), "US", "Acquisition Matrix"),
    InPlanePhaseEncodingDirection: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x1312), "CS", "In-plane Phase Encoding Direction"),
    FlipAngle: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1314), "DS", "Flip Angle"),
    VariableFlipAngleFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x1315), "CS", "Variable Flip Angle Flag"),
    SAR: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1316), "DS", "SAR"),
    dBdt: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1318), "DS", "dB/dt"),
    B1rms: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x1320), "FL", "B1rms"),
    AcquisitionDeviceProcessingDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x1400), "LO", "Acquisition Device Processing Description"),
    AcquisitionDeviceProcessingCode: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x1401), "LO", "Acquisition Device Processing Code"),
    CassetteOrientation: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x1402), "CS", "Cassette Orientation"),
    CassetteSize: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x1403), "CS", "Cassette Size"),
    ExposuresOnPlate: new TagDescriptor<"US", number[]>(
        new Tag(0x0018, 0x1404), "US", "Exposures on Plate"),
    RelativeXRayExposure: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x1405), "IS", "Relative X-Ray Exposure"),
    ExposureIndex: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1411), "DS", "Exposure Index"),
    TargetExposureIndex: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1412), "DS", "Target Exposure Index"),
    DeviationIndex: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1413), "DS", "Deviation Index"),
    ColumnAngulation: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1450), "DS", "Column Angulation"),
    TomoLayerHeight: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1460), "DS", "Tomo Layer Height"),
    TomoAngle: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1470), "DS", "Tomo Angle"),
    TomoTime: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1480), "DS", "Tomo Time"),
    TomoType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x1490), "CS", "Tomo Type"),
    TomoClass: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x1491), "CS", "Tomo Class"),
    NumberOfTomosynthesisSourceImages: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x1495), "IS", "Number of Tomosynthesis Source Images"),
    PositionerMotion: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x1500), "CS", "Positioner Motion"),
    PositionerType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x1508), "CS", "Positioner Type"),
    PositionerPrimaryAngle: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1510), "DS", "Positioner Primary Angle"),
    PositionerSecondaryAngle: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1511), "DS", "Positioner Secondary Angle"),
    PositionerPrimaryAngleIncrement: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1520), "DS", "Positioner Primary Angle Increment"),
    PositionerSecondaryAngleIncrement: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1521), "DS", "Positioner Secondary Angle Increment"),
    DetectorPrimaryAngle: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1530), "DS", "Detector Primary Angle"),
    DetectorSecondaryAngle: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x1531), "DS", "Detector Secondary Angle"),
    ShutterShape: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x1600), "CS", "Shutter Shape"),
    ShutterLeftVerticalEdge: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x1602), "IS", "Shutter Left Vertical Edge"),
    ShutterRightVerticalEdge: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x1604), "IS", "Shutter Right Vertical Edge"),
    ShutterUpperHorizontalEdge: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x1606), "IS", "Shutter Upper Horizontal Edge"),
    ShutterLowerHorizontalEdge: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x1608), "IS", "Shutter Lower Horizontal Edge"),
    CenterOfCircularShutter: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x1610), "IS", "Center of Circular Shutter"),
    RadiusOfCircularShutter: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x1612), "IS", "Radius of Circular Shutter"),
    VerticesOfThePolygonalShutter: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x1620), "IS", "Vertices of the Polygonal Shutter"),
    ShutterPresentationValue: new TagDescriptor<"US", number[]>(
        new Tag(0x0018, 0x1622), "US", "Shutter Presentation Value"),
    ShutterOverlayGroup: new TagDescriptor<"US", number[]>(
        new Tag(0x0018, 0x1623), "US", "Shutter Overlay Group"),
    ShutterPresentationColorCIELabValue: new TagDescriptor<"US", number[]>(
        new Tag(0x0018, 0x1624), "US", "Shutter Presentation Color CIELab Value"),
    CollimatorShape: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x1700), "CS", "Collimator Shape"),
    CollimatorLeftVerticalEdge: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x1702), "IS", "Collimator Left Vertical Edge"),
    CollimatorRightVerticalEdge: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x1704), "IS", "Collimator Right Vertical Edge"),
    CollimatorUpperHorizontalEdge: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x1706), "IS", "Collimator Upper Horizontal Edge"),
    CollimatorLowerHorizontalEdge: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x1708), "IS", "Collimator Lower Horizontal Edge"),
    CenterOfCircularCollimator: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x1710), "IS", "Center of Circular Collimator"),
    RadiusOfCircularCollimator: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x1712), "IS", "Radius of Circular Collimator"),
    VerticesOfThePolygonalCollimator: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x1720), "IS", "Vertices of the Polygonal Collimator"),
    AcquisitionTimeSynchronized: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x1800), "CS", "Acquisition Time Synchronized"),
    TimeSource: new TagDescriptor<"SH", string[]>(
        new Tag(0x0018, 0x1801), "SH", "Time Source"),
    TimeDistributionProtocol: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x1802), "CS", "Time Distribution Protocol"),
    NTPSourceAddress: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x1803), "LO", "NTP Source Address"),
    PageNumberVector: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x2001), "IS", "Page Number Vector"),
    FrameLabelVector: new TagDescriptor<"SH", string[]>(
        new Tag(0x0018, 0x2002), "SH", "Frame Label Vector"),
    FramePrimaryAngleVector: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x2003), "DS", "Frame Primary Angle Vector"),
    FrameSecondaryAngleVector: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x2004), "DS", "Frame Secondary Angle Vector"),
    SliceLocationVector: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x2005), "DS", "Slice Location Vector"),
    DisplayWindowLabelVector: new TagDescriptor<"SH", string[]>(
        new Tag(0x0018, 0x2006), "SH", "Display Window Label Vector"),
    NominalScannedPixelSpacing: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x2010), "DS", "Nominal Scanned Pixel Spacing"),
    DigitizingDeviceTransportDirection: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x2020), "CS", "Digitizing Device Transport Direction"),
    RotationOfScannedFilm: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x2030), "DS", "Rotation of Scanned Film"),
    BiopsyTargetSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x2041), "SQ", "Biopsy Target Sequence"),
    TargetUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0018, 0x2042), "UI", "Target UID"),
    LocalizingCursorPosition: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x2043), "FL", "Localizing Cursor Position"),
    CalculatedTargetPosition: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x2044), "FL", "Calculated Target Position"),
    TargetLabel: new TagDescriptor<"SH", string[]>(
        new Tag(0x0018, 0x2045), "SH", "Target Label"),
    DisplayedZValue: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x2046), "FL", "Displayed Z Value"),
    IVUSAcquisition: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x3100), "CS", "IVUS Acquisition"),
    IVUSPullbackRate: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x3101), "DS", "IVUS Pullback Rate"),
    IVUSGatedRate: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x3102), "DS", "IVUS Gated Rate"),
    IVUSPullbackStartFrameNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x3103), "IS", "IVUS Pullback Start Frame Number"),
    IVUSPullbackStopFrameNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x3104), "IS", "IVUS Pullback Stop Frame Number"),
    LesionNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x3105), "IS", "Lesion Number"),
    AcquisitionComments: new TagDescriptor<"LT", string>(
        new Tag(0x0018, 0x4000), "LT", "Acquisition Comments"),
    OutputPower: new TagDescriptor<"SH", string[]>(
        new Tag(0x0018, 0x5000), "SH", "Output Power"),
    TransducerData: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x5010), "LO", "Transducer Data"),
    FocusDepth: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x5012), "DS", "Focus Depth"),
    ProcessingFunction: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x5020), "LO", "Processing Function"),
    PostprocessingFunction: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x5021), "LO", "Postprocessing Function"),
    MechanicalIndex: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x5022), "DS", "Mechanical Index"),
    BoneThermalIndex: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x5024), "DS", "Bone Thermal Index"),
    CranialThermalIndex: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x5026), "DS", "Cranial Thermal Index"),
    SoftTissueThermalIndex: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x5027), "DS", "Soft Tissue Thermal Index"),
    SoftTissueFocusThermalIndex: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x5028), "DS", "Soft Tissue-focus Thermal Index"),
    SoftTissueSurfaceThermalIndex: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x5029), "DS", "Soft Tissue-surface Thermal Index"),
    DynamicRange: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x5030), "DS", "Dynamic Range"),
    TotalGain: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x5040), "DS", "Total Gain"),
    DepthOfScanField: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x5050), "IS", "Depth of Scan Field"),
    PatientPosition: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x5100), "CS", "Patient Position"),
    ViewPosition: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x5101), "CS", "View Position"),
    ProjectionEponymousNameCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x5104), "SQ", "Projection Eponymous Name Code Sequence"),
    ImageTransformationMatrix: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x5210), "DS", "Image Transformation Matrix"),
    ImageTranslationVector: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x5212), "DS", "Image Translation Vector"),
    Sensitivity: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x6000), "DS", "Sensitivity"),
    SequenceOfUltrasoundRegions: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x6011), "SQ", "Sequence of Ultrasound Regions"),
    RegionSpatialFormat: new TagDescriptor<"US", number[]>(
        new Tag(0x0018, 0x6012), "US", "Region Spatial Format"),
    RegionDataType: new TagDescriptor<"US", number[]>(
        new Tag(0x0018, 0x6014), "US", "Region Data Type"),
    RegionFlags: new TagDescriptor<"UL", number[]>(
        new Tag(0x0018, 0x6016), "UL", "Region Flags"),
    RegionLocationMinX0: new TagDescriptor<"UL", number[]>(
        new Tag(0x0018, 0x6018), "UL", "Region Location Min X0"),
    RegionLocationMinY0: new TagDescriptor<"UL", number[]>(
        new Tag(0x0018, 0x601A), "UL", "Region Location Min Y0"),
    RegionLocationMaxX1: new TagDescriptor<"UL", number[]>(
        new Tag(0x0018, 0x601C), "UL", "Region Location Max X1"),
    RegionLocationMaxY1: new TagDescriptor<"UL", number[]>(
        new Tag(0x0018, 0x601E), "UL", "Region Location Max Y1"),
    ReferencePixelX0: new TagDescriptor<"SL", number[]>(
        new Tag(0x0018, 0x6020), "SL", "Reference Pixel X0"),
    ReferencePixelY0: new TagDescriptor<"SL", number[]>(
        new Tag(0x0018, 0x6022), "SL", "Reference Pixel Y0"),
    PhysicalUnitsXDirection: new TagDescriptor<"US", number[]>(
        new Tag(0x0018, 0x6024), "US", "Physical Units X Direction"),
    PhysicalUnitsYDirection: new TagDescriptor<"US", number[]>(
        new Tag(0x0018, 0x6026), "US", "Physical Units Y Direction"),
    ReferencePixelPhysicalValueX: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x6028), "FD", "Reference Pixel Physical Value X"),
    ReferencePixelPhysicalValueY: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x602A), "FD", "Reference Pixel Physical Value Y"),
    PhysicalDeltaX: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x602C), "FD", "Physical Delta X"),
    PhysicalDeltaY: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x602E), "FD", "Physical Delta Y"),
    TransducerFrequency: new TagDescriptor<"UL", number[]>(
        new Tag(0x0018, 0x6030), "UL", "Transducer Frequency"),
    TransducerType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x6031), "CS", "Transducer Type"),
    PulseRepetitionFrequency: new TagDescriptor<"UL", number[]>(
        new Tag(0x0018, 0x6032), "UL", "Pulse Repetition Frequency"),
    DopplerCorrectionAngle: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x6034), "FD", "Doppler Correction Angle"),
    SteeringAngle: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x6036), "FD", "Steering Angle"),
    DopplerSampleVolumeXPositionRetired: new TagDescriptor<"UL", number[]>(
        new Tag(0x0018, 0x6038), "UL", "Doppler Sample Volume X Position (Retired)"),
    DopplerSampleVolumeXPosition: new TagDescriptor<"SL", number[]>(
        new Tag(0x0018, 0x6039), "SL", "Doppler Sample Volume X Position"),
    DopplerSampleVolumeYPositionRetired: new TagDescriptor<"UL", number[]>(
        new Tag(0x0018, 0x603A), "UL", "Doppler Sample Volume Y Position (Retired)"),
    DopplerSampleVolumeYPosition: new TagDescriptor<"SL", number[]>(
        new Tag(0x0018, 0x603B), "SL", "Doppler Sample Volume Y Position"),
    TMLinePositionX0Retired: new TagDescriptor<"UL", number[]>(
        new Tag(0x0018, 0x603C), "UL", "TM-Line Position X0 (Retired)"),
    TMLinePositionX0: new TagDescriptor<"SL", number[]>(
        new Tag(0x0018, 0x603D), "SL", "TM-Line Position X0"),
    TMLinePositionY0Retired: new TagDescriptor<"UL", number[]>(
        new Tag(0x0018, 0x603E), "UL", "TM-Line Position Y0 (Retired)"),
    TMLinePositionY0: new TagDescriptor<"SL", number[]>(
        new Tag(0x0018, 0x603F), "SL", "TM-Line Position Y0"),
    TMLinePositionX1Retired: new TagDescriptor<"UL", number[]>(
        new Tag(0x0018, 0x6040), "UL", "TM-Line Position X1 (Retired)"),
    TMLinePositionX1: new TagDescriptor<"SL", number[]>(
        new Tag(0x0018, 0x6041), "SL", "TM-Line Position X1"),
    TMLinePositionY1Retired: new TagDescriptor<"UL", number[]>(
        new Tag(0x0018, 0x6042), "UL", "TM-Line Position Y1 (Retired)"),
    TMLinePositionY1: new TagDescriptor<"SL", number[]>(
        new Tag(0x0018, 0x6043), "SL", "TM-Line Position Y1"),
    PixelComponentOrganization: new TagDescriptor<"US", number[]>(
        new Tag(0x0018, 0x6044), "US", "Pixel Component Organization"),
    PixelComponentMask: new TagDescriptor<"UL", number[]>(
        new Tag(0x0018, 0x6046), "UL", "Pixel Component Mask"),
    PixelComponentRangeStart: new TagDescriptor<"UL", number[]>(
        new Tag(0x0018, 0x6048), "UL", "Pixel Component Range Start"),
    PixelComponentRangeStop: new TagDescriptor<"UL", number[]>(
        new Tag(0x0018, 0x604A), "UL", "Pixel Component Range Stop"),
    PixelComponentPhysicalUnits: new TagDescriptor<"US", number[]>(
        new Tag(0x0018, 0x604C), "US", "Pixel Component Physical Units"),
    PixelComponentDataType: new TagDescriptor<"US", number[]>(
        new Tag(0x0018, 0x604E), "US", "Pixel Component Data Type"),
    NumberOfTableBreakPoints: new TagDescriptor<"UL", number[]>(
        new Tag(0x0018, 0x6050), "UL", "Number of Table Break Points"),
    TableOfXBreakPoints: new TagDescriptor<"UL", number[]>(
        new Tag(0x0018, 0x6052), "UL", "Table of X Break Points"),
    TableOfYBreakPoints: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x6054), "FD", "Table of Y Break Points"),
    NumberOfTableEntries: new TagDescriptor<"UL", number[]>(
        new Tag(0x0018, 0x6056), "UL", "Number of Table Entries"),
    TableOfPixelValues: new TagDescriptor<"UL", number[]>(
        new Tag(0x0018, 0x6058), "UL", "Table of Pixel Values"),
    TableOfParameterValues: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x605A), "FL", "Table of Parameter Values"),
    RWaveTimeVector: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x6060), "FL", "R Wave Time Vector"),
    DetectorConditionsNominalFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x7000), "CS", "Detector Conditions Nominal Flag"),
    DetectorTemperature: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x7001), "DS", "Detector Temperature"),
    DetectorType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x7004), "CS", "Detector Type"),
    DetectorConfiguration: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x7005), "CS", "Detector Configuration"),
    DetectorDescription: new TagDescriptor<"LT", string>(
        new Tag(0x0018, 0x7006), "LT", "Detector Description"),
    DetectorMode: new TagDescriptor<"LT", string>(
        new Tag(0x0018, 0x7008), "LT", "Detector Mode"),
    DetectorID: new TagDescriptor<"SH", string[]>(
        new Tag(0x0018, 0x700A), "SH", "Detector ID"),
    DateOfLastDetectorCalibration: new TagDescriptor<"DA", string[]>(
        new Tag(0x0018, 0x700C), "DA", "Date of Last Detector Calibration"),
    TimeOfLastDetectorCalibration: new TagDescriptor<"TM", string[]>(
        new Tag(0x0018, 0x700E), "TM", "Time of Last Detector Calibration"),
    ExposuresOnDetectorSinceLastCalibration: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x7010), "IS", "Exposures on Detector Since Last Calibration"),
    ExposuresOnDetectorSinceManufactured: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x7011), "IS", "Exposures on Detector Since Manufactured"),
    DetectorTimeSinceLastExposure: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x7012), "DS", "Detector Time Since Last Exposure"),
    DetectorActiveTime: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x7014), "DS", "Detector Active Time"),
    DetectorActivationOffsetFromExposure: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x7016), "DS", "Detector Activation Offset From Exposure"),
    DetectorBinning: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x701A), "DS", "Detector Binning"),
    DetectorElementPhysicalSize: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x7020), "DS", "Detector Element Physical Size"),
    DetectorElementSpacing: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x7022), "DS", "Detector Element Spacing"),
    DetectorActiveShape: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x7024), "CS", "Detector Active Shape"),
    DetectorActiveDimensions: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x7026), "DS", "Detector Active Dimension(s)"),
    DetectorActiveOrigin: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x7028), "DS", "Detector Active Origin"),
    DetectorManufacturerName: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x702A), "LO", "Detector Manufacturer Name"),
    DetectorManufacturerModelName: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x702B), "LO", "Detector Manufacturer's Model Name"),
    FieldOfViewOrigin: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x7030), "DS", "Field of View Origin"),
    FieldOfViewRotation: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x7032), "DS", "Field of View Rotation"),
    FieldOfViewHorizontalFlip: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x7034), "CS", "Field of View Horizontal Flip"),
    PixelDataAreaOriginRelativeToFOV: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x7036), "FL", "Pixel Data Area Origin Relative To FOV"),
    PixelDataAreaRotationAngleRelativeToFOV: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x7038), "FL", "Pixel Data Area Rotation Angle Relative To FOV"),
    GridAbsorbingMaterial: new TagDescriptor<"LT", string>(
        new Tag(0x0018, 0x7040), "LT", "Grid Absorbing Material"),
    GridSpacingMaterial: new TagDescriptor<"LT", string>(
        new Tag(0x0018, 0x7041), "LT", "Grid Spacing Material"),
    GridThickness: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x7042), "DS", "Grid Thickness"),
    GridPitch: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x7044), "DS", "Grid Pitch"),
    GridAspectRatio: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x7046), "IS", "Grid Aspect Ratio"),
    GridPeriod: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x7048), "DS", "Grid Period"),
    GridFocalDistance: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x704C), "DS", "Grid Focal Distance"),
    FilterMaterial: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x7050), "CS", "Filter Material"),
    FilterThicknessMinimum: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x7052), "DS", "Filter Thickness Minimum"),
    FilterThicknessMaximum: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x7054), "DS", "Filter Thickness Maximum"),
    FilterBeamPathLengthMinimum: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x7056), "FL", "Filter Beam Path Length Minimum"),
    FilterBeamPathLengthMaximum: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x7058), "FL", "Filter Beam Path Length Maximum"),
    ExposureControlMode: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x7060), "CS", "Exposure Control Mode"),
    ExposureControlModeDescription: new TagDescriptor<"LT", string>(
        new Tag(0x0018, 0x7062), "LT", "Exposure Control Mode Description"),
    ExposureStatus: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x7064), "CS", "Exposure Status"),
    PhototimerSetting: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x7065), "DS", "Phototimer Setting"),
    ExposureTimeInuS: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x8150), "DS", "Exposure Time in ВµS"),
    XRayTubeCurrentInuA: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x8151), "DS", "X-Ray Tube Current in ВµA"),
    ContentQualification: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9004), "CS", "Content Qualification"),
    PulseSequenceName: new TagDescriptor<"SH", string[]>(
        new Tag(0x0018, 0x9005), "SH", "Pulse Sequence Name"),
    MRImagingModifierSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9006), "SQ", "MR Imaging Modifier Sequence"),
    EchoPulseSequence: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9008), "CS", "Echo Pulse Sequence"),
    InversionRecovery: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9009), "CS", "Inversion Recovery"),
    FlowCompensation: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9010), "CS", "Flow Compensation"),
    MultipleSpinEcho: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9011), "CS", "Multiple Spin Echo"),
    MultiPlanarExcitation: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9012), "CS", "Multi-planar Excitation"),
    PhaseContrast: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9014), "CS", "Phase Contrast"),
    TimeOfFlightContrast: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9015), "CS", "Time of Flight Contrast"),
    Spoiling: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9016), "CS", "Spoiling"),
    SteadyStatePulseSequence: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9017), "CS", "Steady State Pulse Sequence"),
    EchoPlanarPulseSequence: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9018), "CS", "Echo Planar Pulse Sequence"),
    TagAngleFirstAxis: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9019), "FD", "Tag Angle First Axis"),
    MagnetizationTransfer: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9020), "CS", "Magnetization Transfer"),
    T2Preparation: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9021), "CS", "T2 Preparation"),
    BloodSignalNulling: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9022), "CS", "Blood Signal Nulling"),
    SaturationRecovery: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9024), "CS", "Saturation Recovery"),
    SpectrallySelectedSuppression: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9025), "CS", "Spectrally Selected Suppression"),
    SpectrallySelectedExcitation: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9026), "CS", "Spectrally Selected Excitation"),
    SpatialPresaturation: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9027), "CS", "Spatial Pre-saturation"),
    Tagging: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9028), "CS", "Tagging"),
    OversamplingPhase: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9029), "CS", "Oversampling Phase"),
    TagSpacingFirstDimension: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9030), "FD", "Tag Spacing First Dimension"),
    GeometryOfKSpaceTraversal: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9032), "CS", "Geometry of k-Space Traversal"),
    SegmentedKSpaceTraversal: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9033), "CS", "Segmented k-Space Traversal"),
    RectilinearPhaseEncodeReordering: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9034), "CS", "Rectilinear Phase Encode Reordering"),
    TagThickness: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9035), "FD", "Tag Thickness"),
    PartialFourierDirection: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9036), "CS", "Partial Fourier Direction"),
    CardiacSynchronizationTechnique: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9037), "CS", "Cardiac Synchronization Technique"),
    ReceiveCoilManufacturerName: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x9041), "LO", "Receive Coil Manufacturer Name"),
    MRReceiveCoilSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9042), "SQ", "MR Receive Coil Sequence"),
    ReceiveCoilType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9043), "CS", "Receive Coil Type"),
    QuadratureReceiveCoil: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9044), "CS", "Quadrature Receive Coil"),
    MultiCoilDefinitionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9045), "SQ", "Multi-Coil Definition Sequence"),
    MultiCoilConfiguration: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x9046), "LO", "Multi-Coil Configuration"),
    MultiCoilElementName: new TagDescriptor<"SH", string[]>(
        new Tag(0x0018, 0x9047), "SH", "Multi-Coil Element Name"),
    MultiCoilElementUsed: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9048), "CS", "Multi-Coil Element Used"),
    MRTransmitCoilSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9049), "SQ", "MR Transmit Coil Sequence"),
    TransmitCoilManufacturerName: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x9050), "LO", "Transmit Coil Manufacturer Name"),
    TransmitCoilType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9051), "CS", "Transmit Coil Type"),
    SpectralWidth: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9052), "FD", "Spectral Width"),
    ChemicalShiftReference: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9053), "FD", "Chemical Shift Reference"),
    VolumeLocalizationTechnique: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9054), "CS", "Volume Localization Technique"),
    MRAcquisitionFrequencyEncodingSteps: new TagDescriptor<"US", number[]>(
        new Tag(0x0018, 0x9058), "US", "MR Acquisition Frequency Encoding Steps"),
    Decoupling: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9059), "CS", "De-coupling"),
    DecoupledNucleus: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9060), "CS", "De-coupled Nucleus"),
    DecouplingFrequency: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9061), "FD", "De-coupling Frequency"),
    DecouplingMethod: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9062), "CS", "De-coupling Method"),
    DecouplingChemicalShiftReference: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9063), "FD", "De-coupling Chemical Shift Reference"),
    KSpaceFiltering: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9064), "CS", "k-space Filtering"),
    TimeDomainFiltering: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9065), "CS", "Time Domain Filtering"),
    NumberOfZeroFills: new TagDescriptor<"US", number[]>(
        new Tag(0x0018, 0x9066), "US", "Number of Zero Fills"),
    BaselineCorrection: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9067), "CS", "Baseline Correction"),
    ParallelReductionFactorInPlane: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9069), "FD", "Parallel Reduction Factor In-plane"),
    CardiacRRIntervalSpecified: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9070), "FD", "Cardiac R-R Interval Specified"),
    AcquisitionDuration: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9073), "FD", "Acquisition Duration"),
    FrameAcquisitionDateTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x0018, 0x9074), "DT", "Frame Acquisition DateTime"),
    DiffusionDirectionality: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9075), "CS", "Diffusion Directionality"),
    DiffusionGradientDirectionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9076), "SQ", "Diffusion Gradient Direction Sequence"),
    ParallelAcquisition: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9077), "CS", "Parallel Acquisition"),
    ParallelAcquisitionTechnique: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9078), "CS", "Parallel Acquisition Technique"),
    InversionTimes: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9079), "FD", "Inversion Times"),
    MetaboliteMapDescription: new TagDescriptor<"ST", string>(
        new Tag(0x0018, 0x9080), "ST", "Metabolite Map Description"),
    PartialFourier: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9081), "CS", "Partial Fourier"),
    EffectiveEchoTime: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9082), "FD", "Effective Echo Time"),
    MetaboliteMapCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9083), "SQ", "Metabolite Map Code Sequence"),
    ChemicalShiftSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9084), "SQ", "Chemical Shift Sequence"),
    CardiacSignalSource: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9085), "CS", "Cardiac Signal Source"),
    DiffusionBValue: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9087), "FD", "Diffusion b-value"),
    DiffusionGradientOrientation: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9089), "FD", "Diffusion Gradient Orientation"),
    VelocityEncodingDirection: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9090), "FD", "Velocity Encoding Direction"),
    VelocityEncodingMinimumValue: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9091), "FD", "Velocity Encoding Minimum Value"),
    VelocityEncodingAcquisitionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9092), "SQ", "Velocity Encoding Acquisition Sequence"),
    NumberOfKSpaceTrajectories: new TagDescriptor<"US", number[]>(
        new Tag(0x0018, 0x9093), "US", "Number of k-Space Trajectories"),
    CoverageOfKSpace: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9094), "CS", "Coverage of k-Space"),
    SpectroscopyAcquisitionPhaseRows: new TagDescriptor<"UL", number[]>(
        new Tag(0x0018, 0x9095), "UL", "Spectroscopy Acquisition Phase Rows"),
    ParallelReductionFactorInPlaneRetired: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9096), "FD", "Parallel Reduction Factor In-plane (Retired)"),
    TransmitterFrequency: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9098), "FD", "Transmitter Frequency"),
    ResonantNucleus: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9100), "CS", "Resonant Nucleus"),
    FrequencyCorrection: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9101), "CS", "Frequency Correction"),
    MRSpectroscopyFOVGeometrySequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9103), "SQ", "MR Spectroscopy FOV/Geometry Sequence"),
    SlabThickness: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9104), "FD", "Slab Thickness"),
    SlabOrientation: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9105), "FD", "Slab Orientation"),
    MidSlabPosition: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9106), "FD", "Mid Slab Position"),
    MRSpatialSaturationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9107), "SQ", "MR Spatial Saturation Sequence"),
    MRTimingAndRelatedParametersSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9112), "SQ", "MR Timing and Related Parameters Sequence"),
    MREchoSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9114), "SQ", "MR Echo Sequence"),
    MRModifierSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9115), "SQ", "MR Modifier Sequence"),
    MRDiffusionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9117), "SQ", "MR Diffusion Sequence"),
    CardiacSynchronizationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9118), "SQ", "Cardiac Synchronization Sequence"),
    MRAveragesSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9119), "SQ", "MR Averages Sequence"),
    MRFOVGeometrySequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9125), "SQ", "MR FOV/Geometry Sequence"),
    VolumeLocalizationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9126), "SQ", "Volume Localization Sequence"),
    SpectroscopyAcquisitionDataColumns: new TagDescriptor<"UL", number[]>(
        new Tag(0x0018, 0x9127), "UL", "Spectroscopy Acquisition Data Columns"),
    DiffusionAnisotropyType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9147), "CS", "Diffusion Anisotropy Type"),
    FrameReferenceDateTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x0018, 0x9151), "DT", "Frame Reference DateTime"),
    MRMetaboliteMapSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9152), "SQ", "MR Metabolite Map Sequence"),
    ParallelReductionFactorOutOfPlane: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9155), "FD", "Parallel Reduction Factor out-of-plane"),
    SpectroscopyAcquisitionOutOfPlanePhaseSteps: new TagDescriptor<"UL", number[]>(
        new Tag(0x0018, 0x9159), "UL", "Spectroscopy Acquisition Out-of-plane Phase Steps"),
    BulkMotionStatus: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9166), "CS", "Bulk Motion Status"),
    ParallelReductionFactorSecondInPlane: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9168), "FD", "Parallel Reduction Factor Second In-plane"),
    CardiacBeatRejectionTechnique: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9169), "CS", "Cardiac Beat Rejection Technique"),
    RespiratoryMotionCompensationTechnique: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9170), "CS", "Respiratory Motion Compensation Technique"),
    RespiratorySignalSource: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9171), "CS", "Respiratory Signal Source"),
    BulkMotionCompensationTechnique: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9172), "CS", "Bulk Motion Compensation Technique"),
    BulkMotionSignalSource: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9173), "CS", "Bulk Motion Signal Source"),
    ApplicableSafetyStandardAgency: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9174), "CS", "Applicable Safety Standard Agency"),
    ApplicableSafetyStandardDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x9175), "LO", "Applicable Safety Standard Description"),
    OperatingModeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9176), "SQ", "Operating Mode Sequence"),
    OperatingModeType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9177), "CS", "Operating Mode Type"),
    OperatingMode: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9178), "CS", "Operating Mode"),
    SpecificAbsorptionRateDefinition: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9179), "CS", "Specific Absorption Rate Definition"),
    GradientOutputType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9180), "CS", "Gradient Output Type"),
    SpecificAbsorptionRateValue: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9181), "FD", "Specific Absorption Rate Value"),
    GradientOutput: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9182), "FD", "Gradient Output"),
    FlowCompensationDirection: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9183), "CS", "Flow Compensation Direction"),
    TaggingDelay: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9184), "FD", "Tagging Delay"),
    RespiratoryMotionCompensationTechniqueDescription: new TagDescriptor<"ST", string>(
        new Tag(0x0018, 0x9185), "ST", "Respiratory Motion Compensation Technique Description"),
    RespiratorySignalSourceID: new TagDescriptor<"SH", string[]>(
        new Tag(0x0018, 0x9186), "SH", "Respiratory Signal Source ID"),
    ChemicalShiftMinimumIntegrationLimitInHz: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9195), "FD", "Chemical Shift Minimum Integration Limit in Hz"),
    ChemicalShiftMaximumIntegrationLimitInHz: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9196), "FD", "Chemical Shift Maximum Integration Limit in Hz"),
    MRVelocityEncodingSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9197), "SQ", "MR Velocity Encoding Sequence"),
    FirstOrderPhaseCorrection: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9198), "CS", "First Order Phase Correction"),
    WaterReferencedPhaseCorrection: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9199), "CS", "Water Referenced Phase Correction"),
    MRSpectroscopyAcquisitionType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9200), "CS", "MR Spectroscopy Acquisition Type"),
    RespiratoryCyclePosition: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9214), "CS", "Respiratory Cycle Position"),
    VelocityEncodingMaximumValue: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9217), "FD", "Velocity Encoding Maximum Value"),
    TagSpacingSecondDimension: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9218), "FD", "Tag Spacing Second Dimension"),
    TagAngleSecondAxis: new TagDescriptor<"SS", number[]>(
        new Tag(0x0018, 0x9219), "SS", "Tag Angle Second Axis"),
    FrameAcquisitionDuration: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9220), "FD", "Frame Acquisition Duration"),
    MRImageFrameTypeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9226), "SQ", "MR Image Frame Type Sequence"),
    MRSpectroscopyFrameTypeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9227), "SQ", "MR Spectroscopy Frame Type Sequence"),
    MRAcquisitionPhaseEncodingStepsInPlane: new TagDescriptor<"US", number[]>(
        new Tag(0x0018, 0x9231), "US", "MR Acquisition Phase Encoding Steps in-plane"),
    MRAcquisitionPhaseEncodingStepsOutOfPlane: new TagDescriptor<"US", number[]>(
        new Tag(0x0018, 0x9232), "US", "MR Acquisition Phase Encoding Steps out-of-plane"),
    SpectroscopyAcquisitionPhaseColumns: new TagDescriptor<"UL", number[]>(
        new Tag(0x0018, 0x9234), "UL", "Spectroscopy Acquisition Phase Columns"),
    CardiacCyclePosition: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9236), "CS", "Cardiac Cycle Position"),
    SpecificAbsorptionRateSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9239), "SQ", "Specific Absorption Rate Sequence"),
    RFEchoTrainLength: new TagDescriptor<"US", number[]>(
        new Tag(0x0018, 0x9240), "US", "RF Echo Train Length"),
    GradientEchoTrainLength: new TagDescriptor<"US", number[]>(
        new Tag(0x0018, 0x9241), "US", "Gradient Echo Train Length"),
    ArterialSpinLabelingContrast: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9250), "CS", "Arterial Spin Labeling Contrast"),
    MRArterialSpinLabelingSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9251), "SQ", "MR Arterial Spin Labeling Sequence"),
    ASLTechniqueDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x9252), "LO", "ASL Technique Description"),
    ASLSlabNumber: new TagDescriptor<"US", number[]>(
        new Tag(0x0018, 0x9253), "US", "ASL Slab Number"),
    ASLSlabThickness: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9254), "FD", "ASL Slab Thickness"),
    ASLSlabOrientation: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9255), "FD", "ASL Slab Orientation"),
    ASLMidSlabPosition: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9256), "FD", "ASL Mid Slab Position"),
    ASLContext: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9257), "CS", "ASL Context"),
    ASLPulseTrainDuration: new TagDescriptor<"UL", number[]>(
        new Tag(0x0018, 0x9258), "UL", "ASL Pulse Train Duration"),
    ASLCrusherFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9259), "CS", "ASL Crusher Flag"),
    ASLCrusherFlowLimit: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x925A), "FD", "ASL Crusher Flow Limit"),
    ASLCrusherDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x925B), "LO", "ASL Crusher Description"),
    ASLBolusCutoffFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x925C), "CS", "ASL Bolus Cut-off Flag"),
    ASLBolusCutoffTimingSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x925D), "SQ", "ASL Bolus Cut-off Timing Sequence"),
    ASLBolusCutoffTechnique: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x925E), "LO", "ASL Bolus Cut-off Technique"),
    ASLBolusCutoffDelayTime: new TagDescriptor<"UL", number[]>(
        new Tag(0x0018, 0x925F), "UL", "ASL Bolus Cut-off Delay Time"),
    ASLSlabSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9260), "SQ", "ASL Slab Sequence"),
    ChemicalShiftMinimumIntegrationLimitInppm: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9295), "FD", "Chemical Shift Minimum Integration Limit in ppm"),
    ChemicalShiftMaximumIntegrationLimitInppm: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9296), "FD", "Chemical Shift Maximum Integration Limit in ppm"),
    WaterReferenceAcquisition: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9297), "CS", "Water Reference Acquisition"),
    EchoPeakPosition: new TagDescriptor<"IS", number[]>(
        new Tag(0x0018, 0x9298), "IS", "Echo Peak Position"),
    CTAcquisitionTypeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9301), "SQ", "CT Acquisition Type Sequence"),
    AcquisitionType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9302), "CS", "Acquisition Type"),
    TubeAngle: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9303), "FD", "Tube Angle"),
    CTAcquisitionDetailsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9304), "SQ", "CT Acquisition Details Sequence"),
    RevolutionTime: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9305), "FD", "Revolution Time"),
    SingleCollimationWidth: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9306), "FD", "Single Collimation Width"),
    TotalCollimationWidth: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9307), "FD", "Total Collimation Width"),
    CTTableDynamicsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9308), "SQ", "CT Table Dynamics Sequence"),
    TableSpeed: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9309), "FD", "Table Speed"),
    TableFeedPerRotation: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9310), "FD", "Table Feed per Rotation"),
    SpiralPitchFactor: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9311), "FD", "Spiral Pitch Factor"),
    CTGeometrySequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9312), "SQ", "CT Geometry Sequence"),
    DataCollectionCenterPatient: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9313), "FD", "Data Collection Center (Patient)"),
    CTReconstructionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9314), "SQ", "CT Reconstruction Sequence"),
    ReconstructionAlgorithm: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9315), "CS", "Reconstruction Algorithm"),
    ConvolutionKernelGroup: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9316), "CS", "Convolution Kernel Group"),
    ReconstructionFieldOfView: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9317), "FD", "Reconstruction Field of View"),
    ReconstructionTargetCenterPatient: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9318), "FD", "Reconstruction Target Center (Patient)"),
    ReconstructionAngle: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9319), "FD", "Reconstruction Angle"),
    ImageFilter: new TagDescriptor<"SH", string[]>(
        new Tag(0x0018, 0x9320), "SH", "Image Filter"),
    CTExposureSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9321), "SQ", "CT Exposure Sequence"),
    ReconstructionPixelSpacing: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9322), "FD", "Reconstruction Pixel Spacing"),
    ExposureModulationType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9323), "CS", "Exposure Modulation Type"),
    EstimatedDoseSaving: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9324), "FD", "Estimated Dose Saving"),
    CTXRayDetailsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9325), "SQ", "CT X-Ray Details Sequence"),
    CTPositionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9326), "SQ", "CT Position Sequence"),
    TablePosition: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9327), "FD", "Table Position"),
    ExposureTimeInms: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9328), "FD", "Exposure Time in ms"),
    CTImageFrameTypeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9329), "SQ", "CT Image Frame Type Sequence"),
    XRayTubeCurrentInmA: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9330), "FD", "X-Ray Tube Current in mA"),
    ExposureInmAs: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9332), "FD", "Exposure in mAs"),
    ConstantVolumeFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9333), "CS", "Constant Volume Flag"),
    FluoroscopyFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9334), "CS", "Fluoroscopy Flag"),
    DistanceSourceToDataCollectionCenter: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9335), "FD", "Distance Source to Data Collection Center"),
    ContrastBolusAgentNumber: new TagDescriptor<"US", number[]>(
        new Tag(0x0018, 0x9337), "US", "Contrast/Bolus Agent Number"),
    ContrastBolusIngredientCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9338), "SQ", "Contrast/Bolus Ingredient Code Sequence"),
    ContrastAdministrationProfileSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9340), "SQ", "Contrast Administration Profile Sequence"),
    ContrastBolusUsageSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9341), "SQ", "Contrast/Bolus Usage Sequence"),
    ContrastBolusAgentAdministered: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9342), "CS", "Contrast/Bolus Agent Administered"),
    ContrastBolusAgentDetected: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9343), "CS", "Contrast/Bolus Agent Detected"),
    ContrastBolusAgentPhase: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9344), "CS", "Contrast/Bolus Agent Phase"),
    CTDIvol: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9345), "FD", "CTDIvol"),
    CTDIPhantomTypeCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9346), "SQ", "CTDI Phantom Type Code Sequence"),
    CalciumScoringMassFactorPatient: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x9351), "FL", "Calcium Scoring Mass Factor Patient"),
    CalciumScoringMassFactorDevice: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x9352), "FL", "Calcium Scoring Mass Factor Device"),
    EnergyWeightingFactor: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x9353), "FL", "Energy Weighting Factor"),
    CTAdditionalXRaySourceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9360), "SQ", "CT Additional X-Ray Source Sequence"),
    ProjectionPixelCalibrationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9401), "SQ", "Projection Pixel Calibration Sequence"),
    DistanceSourceToIsocenter: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x9402), "FL", "Distance Source to Isocenter"),
    DistanceObjectToTableTop: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x9403), "FL", "Distance Object to Table Top"),
    ObjectPixelSpacingInCenterOfBeam: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x9404), "FL", "Object Pixel Spacing in Center of Beam"),
    PositionerPositionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9405), "SQ", "Positioner Position Sequence"),
    TablePositionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9406), "SQ", "Table Position Sequence"),
    CollimatorShapeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9407), "SQ", "Collimator Shape Sequence"),
    PlanesInAcquisition: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9410), "CS", "Planes in Acquisition"),
    XAXRFFrameCharacteristicsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9412), "SQ", "XA/XRF Frame Characteristics Sequence"),
    FrameAcquisitionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9417), "SQ", "Frame Acquisition Sequence"),
    XRayReceptorType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9420), "CS", "X-Ray Receptor Type"),
    AcquisitionProtocolName: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x9423), "LO", "Acquisition Protocol Name"),
    AcquisitionProtocolDescription: new TagDescriptor<"LT", string>(
        new Tag(0x0018, 0x9424), "LT", "Acquisition Protocol Description"),
    ContrastBolusIngredientOpaque: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9425), "CS", "Contrast/Bolus Ingredient Opaque"),
    DistanceReceptorPlaneToDetectorHousing: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x9426), "FL", "Distance Receptor Plane to Detector Housing"),
    IntensifierActiveShape: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9427), "CS", "Intensifier Active Shape"),
    IntensifierActiveDimensions: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x9428), "FL", "Intensifier Active Dimension(s)"),
    PhysicalDetectorSize: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x9429), "FL", "Physical Detector Size"),
    PositionOfIsocenterProjection: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x9430), "FL", "Position of Isocenter Projection"),
    FieldOfViewSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9432), "SQ", "Field of View Sequence"),
    FieldOfViewDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x9433), "LO", "Field of View Description"),
    ExposureControlSensingRegionsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9434), "SQ", "Exposure Control Sensing Regions Sequence"),
    ExposureControlSensingRegionShape: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9435), "CS", "Exposure Control Sensing Region Shape"),
    ExposureControlSensingRegionLeftVerticalEdge: new TagDescriptor<"SS", number[]>(
        new Tag(0x0018, 0x9436), "SS", "Exposure Control Sensing Region Left Vertical Edge"),
    ExposureControlSensingRegionRightVerticalEdge: new TagDescriptor<"SS", number[]>(
        new Tag(0x0018, 0x9437), "SS", "Exposure Control Sensing Region Right Vertical Edge"),
    ExposureControlSensingRegionUpperHorizontalEdge: new TagDescriptor<"SS", number[]>(
        new Tag(0x0018, 0x9438), "SS", "Exposure Control Sensing Region Upper Horizontal Edge"),
    ExposureControlSensingRegionLowerHorizontalEdge: new TagDescriptor<"SS", number[]>(
        new Tag(0x0018, 0x9439), "SS", "Exposure Control Sensing Region Lower Horizontal Edge"),
    CenterOfCircularExposureControlSensingRegion: new TagDescriptor<"SS", number[]>(
        new Tag(0x0018, 0x9440), "SS", "Center of Circular Exposure Control Sensing Region"),
    RadiusOfCircularExposureControlSensingRegion: new TagDescriptor<"US", number[]>(
        new Tag(0x0018, 0x9441), "US", "Radius of Circular Exposure Control Sensing Region"),
    VerticesOfThePolygonalExposureControlSensingRegion: new TagDescriptor<"SS", number[]>(
        new Tag(0x0018, 0x9442), "SS", "Vertices of the Polygonal Exposure Control Sensing Region"),
    ColumnAngulationPatient: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x9447), "FL", "Column Angulation (Patient)"),
    BeamAngle: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x9449), "FL", "Beam Angle"),
    FrameDetectorParametersSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9451), "SQ", "Frame Detector Parameters Sequence"),
    CalculatedAnatomyThickness: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x9452), "FL", "Calculated Anatomy Thickness"),
    CalibrationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9455), "SQ", "Calibration Sequence"),
    ObjectThicknessSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9456), "SQ", "Object Thickness Sequence"),
    PlaneIdentification: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9457), "CS", "Plane Identification"),
    FieldOfViewDimensionsInFloat: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x9461), "FL", "Field of View Dimension(s) in Float"),
    IsocenterReferenceSystemSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9462), "SQ", "Isocenter Reference System Sequence"),
    PositionerIsocenterPrimaryAngle: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x9463), "FL", "Positioner Isocenter Primary Angle"),
    PositionerIsocenterSecondaryAngle: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x9464), "FL", "Positioner Isocenter Secondary Angle"),
    PositionerIsocenterDetectorRotationAngle: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x9465), "FL", "Positioner Isocenter Detector Rotation Angle"),
    TableXPositionToIsocenter: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x9466), "FL", "Table X Position to Isocenter"),
    TableYPositionToIsocenter: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x9467), "FL", "Table Y Position to Isocenter"),
    TableZPositionToIsocenter: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x9468), "FL", "Table Z Position to Isocenter"),
    TableHorizontalRotationAngle: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x9469), "FL", "Table Horizontal Rotation Angle"),
    TableHeadTiltAngle: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x9470), "FL", "Table Head Tilt Angle"),
    TableCradleTiltAngle: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x9471), "FL", "Table Cradle Tilt Angle"),
    FrameDisplayShutterSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9472), "SQ", "Frame Display Shutter Sequence"),
    AcquiredImageAreaDoseProduct: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x9473), "FL", "Acquired Image Area Dose Product"),
    CArmPositionerTabletopRelationship: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9474), "CS", "C-arm Positioner Tabletop Relationship"),
    XRayGeometrySequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9476), "SQ", "X-Ray Geometry Sequence"),
    IrradiationEventIdentificationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9477), "SQ", "Irradiation Event Identification Sequence"),
    XRay3DFrameTypeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9504), "SQ", "X-Ray 3D Frame Type Sequence"),
    ContributingSourcesSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9506), "SQ", "Contributing Sources Sequence"),
    XRay3DAcquisitionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9507), "SQ", "X-Ray 3D Acquisition Sequence"),
    PrimaryPositionerScanArc: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x9508), "FL", "Primary Positioner Scan Arc"),
    SecondaryPositionerScanArc: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x9509), "FL", "Secondary Positioner Scan Arc"),
    PrimaryPositionerScanStartAngle: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x9510), "FL", "Primary Positioner Scan Start Angle"),
    SecondaryPositionerScanStartAngle: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x9511), "FL", "Secondary Positioner Scan Start Angle"),
    PrimaryPositionerIncrement: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x9514), "FL", "Primary Positioner Increment"),
    SecondaryPositionerIncrement: new TagDescriptor<"FL", number[]>(
        new Tag(0x0018, 0x9515), "FL", "Secondary Positioner Increment"),
    StartAcquisitionDateTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x0018, 0x9516), "DT", "Start Acquisition DateTime"),
    EndAcquisitionDateTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x0018, 0x9517), "DT", "End Acquisition DateTime"),
    PrimaryPositionerIncrementSign: new TagDescriptor<"SS", number[]>(
        new Tag(0x0018, 0x9518), "SS", "Primary Positioner Increment Sign"),
    SecondaryPositionerIncrementSign: new TagDescriptor<"SS", number[]>(
        new Tag(0x0018, 0x9519), "SS", "Secondary Positioner Increment Sign"),
    ApplicationName: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x9524), "LO", "Application Name"),
    ApplicationVersion: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x9525), "LO", "Application Version"),
    ApplicationManufacturer: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x9526), "LO", "Application Manufacturer"),
    AlgorithmType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9527), "CS", "Algorithm Type"),
    AlgorithmDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x9528), "LO", "Algorithm Description"),
    XRay3DReconstructionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9530), "SQ", "X-Ray 3D Reconstruction Sequence"),
    ReconstructionDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x9531), "LO", "Reconstruction Description"),
    PerProjectionAcquisitionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9538), "SQ", "Per Projection Acquisition Sequence"),
    DetectorPositionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9541), "SQ", "Detector Position Sequence"),
    XRayAcquisitionDoseSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9542), "SQ", "X-Ray Acquisition Dose Sequence"),
    XRaySourceIsocenterPrimaryAngle: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9543), "FD", "X-Ray Source Isocenter Primary Angle"),
    XRaySourceIsocenterSecondaryAngle: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9544), "FD", "X-Ray Source Isocenter Secondary Angle"),
    BreastSupportIsocenterPrimaryAngle: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9545), "FD", "Breast Support Isocenter Primary Angle"),
    BreastSupportIsocenterSecondaryAngle: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9546), "FD", "Breast Support Isocenter Secondary Angle"),
    BreastSupportXPositionToIsocenter: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9547), "FD", "Breast Support X Position to Isocenter"),
    BreastSupportYPositionToIsocenter: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9548), "FD", "Breast Support Y Position to Isocenter"),
    BreastSupportZPositionToIsocenter: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9549), "FD", "Breast Support Z Position to Isocenter"),
    DetectorIsocenterPrimaryAngle: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9550), "FD", "Detector Isocenter Primary Angle"),
    DetectorIsocenterSecondaryAngle: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9551), "FD", "Detector Isocenter Secondary Angle"),
    DetectorXPositionToIsocenter: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9552), "FD", "Detector X Position to Isocenter"),
    DetectorYPositionToIsocenter: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9553), "FD", "Detector Y Position to Isocenter"),
    DetectorZPositionToIsocenter: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9554), "FD", "Detector Z Position to Isocenter"),
    XRayGridSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9555), "SQ", "X-Ray Grid Sequence"),
    XRayFilterSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9556), "SQ", "X-Ray Filter Sequence"),
    DetectorActiveAreaTLHCPosition: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9557), "FD", "Detector Active Area TLHC Position"),
    DetectorActiveAreaOrientation: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9558), "FD", "Detector Active Area Orientation"),
    PositionerPrimaryAngleDirection: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9559), "CS", "Positioner Primary Angle Direction"),
    DiffusionBMatrixSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9601), "SQ", "Diffusion b-matrix Sequence"),
    DiffusionBValueXX: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9602), "FD", "Diffusion b-value XX"),
    DiffusionBValueXY: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9603), "FD", "Diffusion b-value XY"),
    DiffusionBValueXZ: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9604), "FD", "Diffusion b-value XZ"),
    DiffusionBValueYY: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9605), "FD", "Diffusion b-value YY"),
    DiffusionBValueYZ: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9606), "FD", "Diffusion b-value YZ"),
    DiffusionBValueZZ: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9607), "FD", "Diffusion b-value ZZ"),
    FunctionalMRSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9621), "SQ", "Functional MR Sequence"),
    FunctionalSettlingPhaseFramesPresent: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9622), "CS", "Functional Settling Phase Frames Present"),
    FunctionalSyncPulse: new TagDescriptor<"DT", string[]>(
        new Tag(0x0018, 0x9623), "DT", "Functional Sync Pulse"),
    SettlingPhaseFrame: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9624), "CS", "Settling Phase Frame"),
    DecayCorrectionDateTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x0018, 0x9701), "DT", "Decay Correction DateTime"),
    StartDensityThreshold: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9715), "FD", "Start Density Threshold"),
    StartRelativeDensityDifferenceThreshold: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9716), "FD", "Start Relative Density Difference Threshold"),
    StartCardiacTriggerCountThreshold: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9717), "FD", "Start Cardiac Trigger Count Threshold"),
    StartRespiratoryTriggerCountThreshold: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9718), "FD", "Start Respiratory Trigger Count Threshold"),
    TerminationCountsThreshold: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9719), "FD", "Termination Counts Threshold"),
    TerminationDensityThreshold: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9720), "FD", "Termination Density Threshold"),
    TerminationRelativeDensityThreshold: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9721), "FD", "Termination Relative Density Threshold"),
    TerminationTimeThreshold: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9722), "FD", "Termination Time Threshold"),
    TerminationCardiacTriggerCountThreshold: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9723), "FD", "Termination Cardiac Trigger Count Threshold"),
    TerminationRespiratoryTriggerCountThreshold: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9724), "FD", "Termination Respiratory Trigger Count Threshold"),
    DetectorGeometry: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9725), "CS", "Detector Geometry"),
    TransverseDetectorSeparation: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9726), "FD", "Transverse Detector Separation"),
    AxialDetectorDimension: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9727), "FD", "Axial Detector Dimension"),
    RadiopharmaceuticalAgentNumber: new TagDescriptor<"US", number[]>(
        new Tag(0x0018, 0x9729), "US", "Radiopharmaceutical Agent Number"),
    PETFrameAcquisitionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9732), "SQ", "PET Frame Acquisition Sequence"),
    PETDetectorMotionDetailsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9733), "SQ", "PET Detector Motion Details Sequence"),
    PETTableDynamicsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9734), "SQ", "PET Table Dynamics Sequence"),
    PETPositionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9735), "SQ", "PET Position Sequence"),
    PETFrameCorrectionFactorsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9736), "SQ", "PET Frame Correction Factors Sequence"),
    RadiopharmaceuticalUsageSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9737), "SQ", "Radiopharmaceutical Usage Sequence"),
    AttenuationCorrectionSource: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9738), "CS", "Attenuation Correction Source"),
    NumberOfIterations: new TagDescriptor<"US", number[]>(
        new Tag(0x0018, 0x9739), "US", "Number of Iterations"),
    NumberOfSubsets: new TagDescriptor<"US", number[]>(
        new Tag(0x0018, 0x9740), "US", "Number of Subsets"),
    PETReconstructionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9749), "SQ", "PET Reconstruction Sequence"),
    PETFrameTypeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9751), "SQ", "PET Frame Type Sequence"),
    TimeOfFlightInformationUsed: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9755), "CS", "Time of Flight Information Used"),
    ReconstructionType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9756), "CS", "Reconstruction Type"),
    DecayCorrected: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9758), "CS", "Decay Corrected"),
    AttenuationCorrected: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9759), "CS", "Attenuation Corrected"),
    ScatterCorrected: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9760), "CS", "Scatter Corrected"),
    DeadTimeCorrected: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9761), "CS", "Dead Time Corrected"),
    GantryMotionCorrected: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9762), "CS", "Gantry Motion Corrected"),
    PatientMotionCorrected: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9763), "CS", "Patient Motion Corrected"),
    CountLossNormalizationCorrected: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9764), "CS", "Count Loss Normalization Corrected"),
    RandomsCorrected: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9765), "CS", "Randoms Corrected"),
    NonUniformRadialSamplingCorrected: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9766), "CS", "Non-uniform Radial Sampling Corrected"),
    SensitivityCalibrated: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9767), "CS", "Sensitivity Calibrated"),
    DetectorNormalizationCorrection: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9768), "CS", "Detector Normalization Correction"),
    IterativeReconstructionMethod: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9769), "CS", "Iterative Reconstruction Method"),
    AttenuationCorrectionTemporalRelationship: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9770), "CS", "Attenuation Correction Temporal Relationship"),
    PatientPhysiologicalStateSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9771), "SQ", "Patient Physiological State Sequence"),
    PatientPhysiologicalStateCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9772), "SQ", "Patient Physiological State Code Sequence"),
    DepthsOfFocus: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9801), "FD", "Depth(s) of Focus"),
    ExcludedIntervalsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9803), "SQ", "Excluded Intervals Sequence"),
    ExclusionStartDateTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x0018, 0x9804), "DT", "Exclusion Start DateTime"),
    ExclusionDuration: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9805), "FD", "Exclusion Duration"),
    USImageDescriptionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9806), "SQ", "US Image Description Sequence"),
    ImageDataTypeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9807), "SQ", "Image Data Type Sequence"),
    DataType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9808), "CS", "Data Type"),
    TransducerScanPatternCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9809), "SQ", "Transducer Scan Pattern Code Sequence"),
    AliasedDataType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x980B), "CS", "Aliased Data Type"),
    PositionMeasuringDeviceUsed: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x980C), "CS", "Position Measuring Device Used"),
    TransducerGeometryCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x980D), "SQ", "Transducer Geometry Code Sequence"),
    TransducerBeamSteeringCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x980E), "SQ", "Transducer Beam Steering Code Sequence"),
    TransducerApplicationCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x980F), "SQ", "Transducer Application Code Sequence"),
    ReferenceLocationLabel: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x9900), "LO", "Reference Location Label"),
    ReferenceLocationDescription: new TagDescriptor<"UT", string>(
        new Tag(0x0018, 0x9901), "UT", "Reference Location Description"),
    ReferenceBasisCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9902), "SQ", "Reference Basis Code Sequence"),
    ReferenceGeometryCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9903), "SQ", "Reference Geometry Code Sequence"),
    OffsetDistance: new TagDescriptor<"DS", number[]>(
        new Tag(0x0018, 0x9904), "DS", "Offset Distance"),
    OffsetDirection: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9905), "CS", "Offset Direction"),
    PotentialScheduledProtocolCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9906), "SQ", "Potential Scheduled Protocol Code Sequence"),
    PotentialRequestedProcedureCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9907), "SQ", "Potential Requested Procedure Code Sequence"),
    PotentialReasonsForProcedure: new TagDescriptor<"UC", string[]>(
        new Tag(0x0018, 0x9908), "UC", "Potential Reasons for Procedure"),
    PotentialReasonsForProcedureCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9909), "SQ", "Potential Reasons for Procedure Code Sequence"),
    PotentialDiagnosticTasks: new TagDescriptor<"UC", string[]>(
        new Tag(0x0018, 0x990A), "UC", "Potential Diagnostic Tasks"),
    ContraindicationsCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x990B), "SQ", "Contraindications Code Sequence"),
    ReferencedDefinedProtocolSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x990C), "SQ", "Referenced Defined Protocol Sequence"),
    ReferencedPerformedProtocolSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x990D), "SQ", "Referenced Performed Protocol Sequence"),
    PredecessorProtocolSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x990E), "SQ", "Predecessor Protocol Sequence"),
    ProtocolPlanningInformation: new TagDescriptor<"UT", string>(
        new Tag(0x0018, 0x990F), "UT", "Protocol Planning Information"),
    ProtocolDesignRationale: new TagDescriptor<"UT", string>(
        new Tag(0x0018, 0x9910), "UT", "Protocol Design Rationale"),
    PatientSpecificationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9911), "SQ", "Patient Specification Sequence"),
    ModelSpecificationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9912), "SQ", "Model Specification Sequence"),
    ParametersSpecificationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9913), "SQ", "Parameters Specification Sequence"),
    InstructionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9914), "SQ", "Instruction Sequence"),
    InstructionIndex: new TagDescriptor<"US", number[]>(
        new Tag(0x0018, 0x9915), "US", "Instruction Index"),
    InstructionText: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x9916), "LO", "Instruction Text"),
    InstructionDescription: new TagDescriptor<"UT", string>(
        new Tag(0x0018, 0x9917), "UT", "Instruction Description"),
    InstructionPerformedFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9918), "CS", "Instruction Performed Flag"),
    InstructionPerformedDateTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x0018, 0x9919), "DT", "Instruction Performed DateTime"),
    InstructionPerformanceComment: new TagDescriptor<"UT", string>(
        new Tag(0x0018, 0x991A), "UT", "Instruction Performance Comment"),
    PatientPositioningInstructionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x991B), "SQ", "Patient Positioning Instruction Sequence"),
    PositioningMethodCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x991C), "SQ", "Positioning Method Code Sequence"),
    PositioningLandmarkSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x991D), "SQ", "Positioning Landmark Sequence"),
    TargetFrameOfReferenceUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0018, 0x991E), "UI", "Target Frame of Reference UID"),
    AcquisitionProtocolElementSpecificationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x991F), "SQ", "Acquisition Protocol Element Specification Sequence"),
    AcquisitionProtocolElementSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9920), "SQ", "Acquisition Protocol Element Sequence"),
    ProtocolElementNumber: new TagDescriptor<"US", number[]>(
        new Tag(0x0018, 0x9921), "US", "Protocol Element Number"),
    ProtocolElementName: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x9922), "LO", "Protocol Element Name"),
    ProtocolElementCharacteristicsSummary: new TagDescriptor<"UT", string>(
        new Tag(0x0018, 0x9923), "UT", "Protocol Element Characteristics Summary"),
    ProtocolElementPurpose: new TagDescriptor<"UT", string>(
        new Tag(0x0018, 0x9924), "UT", "Protocol Element Purpose"),
    AcquisitionMotion: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9930), "CS", "Acquisition Motion"),
    AcquisitionStartLocationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9931), "SQ", "Acquisition Start Location Sequence"),
    AcquisitionEndLocationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9932), "SQ", "Acquisition End Location Sequence"),
    ReconstructionProtocolElementSpecificationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9933), "SQ", "Reconstruction Protocol Element Specification Sequence"),
    ReconstructionProtocolElementSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9934), "SQ", "Reconstruction Protocol Element Sequence"),
    StorageProtocolElementSpecificationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9935), "SQ", "Storage Protocol Element Specification Sequence"),
    StorageProtocolElementSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x9936), "SQ", "Storage Protocol Element Sequence"),
    RequestedSeriesDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0018, 0x9937), "LO", "Requested Series Description"),
    SourceAcquisitionProtocolElementNumber: new TagDescriptor<"US", number[]>(
        new Tag(0x0018, 0x9938), "US", "Source Acquisition Protocol Element Number"),
    SourceAcquisitionBeamNumber: new TagDescriptor<"US", number[]>(
        new Tag(0x0018, 0x9939), "US", "Source Acquisition Beam Number"),
    SourceReconstructionProtocolElementNumber: new TagDescriptor<"US", number[]>(
        new Tag(0x0018, 0x993A), "US", "Source Reconstruction Protocol Element Number"),
    ReconstructionStartLocationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x993B), "SQ", "Reconstruction Start Location Sequence"),
    ReconstructionEndLocationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x993C), "SQ", "Reconstruction End Location Sequence"),
    ReconstructionAlgorithmSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x993D), "SQ", "Reconstruction Algorithm Sequence"),
    ReconstructionTargetCenterLocationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0x993E), "SQ", "Reconstruction Target Center Location Sequence"),
    ImageFilterDescription: new TagDescriptor<"UT", string>(
        new Tag(0x0018, 0x9941), "UT", "Image Filter Description"),
    CTDIvolNotificationTrigger: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9942), "FD", "CTDIvol Notification Trigger"),
    DLPNotificationTrigger: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9943), "FD", "DLP Notification Trigger"),
    AutoKVPSelectionType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9944), "CS", "Auto KVP Selection Type"),
    AutoKVPUpperBound: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9945), "FD", "Auto KVP Upper Bound"),
    AutoKVPLowerBound: new TagDescriptor<"FD", number[]>(
        new Tag(0x0018, 0x9946), "FD", "Auto KVP Lower Bound"),
    ProtocolDefinedPatientPosition: new TagDescriptor<"CS", string[]>(
        new Tag(0x0018, 0x9947), "CS", "Protocol Defined Patient Position"),
    ContributingEquipmentSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0018, 0xA001), "SQ", "Contributing Equipment Sequence"),
    ContributionDateTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x0018, 0xA002), "DT", "Contribution DateTime"),
    ContributionDescription: new TagDescriptor<"ST", string>(
        new Tag(0x0018, 0xA003), "ST", "Contribution Description"),

    // Group 0x0020

    StudyInstanceUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0020, 0x000D), "UI", "Study Instance UID"),
    SeriesInstanceUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0020, 0x000E), "UI", "Series Instance UID"),
    StudyID: new TagDescriptor<"SH", string[]>(
        new Tag(0x0020, 0x0010), "SH", "Study ID"),
    SeriesNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x0020, 0x0011), "IS", "Series Number"),
    AcquisitionNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x0020, 0x0012), "IS", "Acquisition Number"),
    InstanceNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x0020, 0x0013), "IS", "Instance Number"),
    IsotopeNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x0020, 0x0014), "IS", "Isotope Number"),
    PhaseNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x0020, 0x0015), "IS", "Phase Number"),
    IntervalNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x0020, 0x0016), "IS", "Interval Number"),
    TimeSlotNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x0020, 0x0017), "IS", "Time Slot Number"),
    AngleNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x0020, 0x0018), "IS", "Angle Number"),
    ItemNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x0020, 0x0019), "IS", "Item Number"),
    PatientOrientation: new TagDescriptor<"CS", string[]>(
        new Tag(0x0020, 0x0020), "CS", "Patient Orientation"),
    OverlayNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x0020, 0x0022), "IS", "Overlay Number"),
    CurveNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x0020, 0x0024), "IS", "Curve Number"),
    LUTNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x0020, 0x0026), "IS", "LUT Number"),
    ImagePosition: new TagDescriptor<"DS", number[]>(
        new Tag(0x0020, 0x0030), "DS", "Image Position"),
    ImagePositionPatient: new TagDescriptor<"DS", number[]>(
        new Tag(0x0020, 0x0032), "DS", "Image Position (Patient)"),
    ImageOrientation: new TagDescriptor<"DS", number[]>(
        new Tag(0x0020, 0x0035), "DS", "Image Orientation"),
    ImageOrientationPatient: new TagDescriptor<"DS", number[]>(
        new Tag(0x0020, 0x0037), "DS", "Image Orientation (Patient)"),
    Location: new TagDescriptor<"DS", number[]>(
        new Tag(0x0020, 0x0050), "DS", "Location"),
    FrameOfReferenceUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0020, 0x0052), "UI", "Frame of Reference UID"),
    Laterality: new TagDescriptor<"CS", string[]>(
        new Tag(0x0020, 0x0060), "CS", "Laterality"),
    ImageLaterality: new TagDescriptor<"CS", string[]>(
        new Tag(0x0020, 0x0062), "CS", "Image Laterality"),
    ImageGeometryType: new TagDescriptor<"LO", string[]>(
        new Tag(0x0020, 0x0070), "LO", "Image Geometry Type"),
    MaskingImage: new TagDescriptor<"CS", string[]>(
        new Tag(0x0020, 0x0080), "CS", "Masking Image"),
    ReportNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x0020, 0x00AA), "IS", "Report Number"),
    TemporalPositionIdentifier: new TagDescriptor<"IS", number[]>(
        new Tag(0x0020, 0x0100), "IS", "Temporal Position Identifier"),
    NumberOfTemporalPositions: new TagDescriptor<"IS", number[]>(
        new Tag(0x0020, 0x0105), "IS", "Number of Temporal Positions"),
    TemporalResolution: new TagDescriptor<"DS", number[]>(
        new Tag(0x0020, 0x0110), "DS", "Temporal Resolution"),
    SynchronizationFrameOfReferenceUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0020, 0x0200), "UI", "Synchronization Frame of Reference UID"),
    SOPInstanceUIDOfConcatenationSource: new TagDescriptor<"UI", string[]>(
        new Tag(0x0020, 0x0242), "UI", "SOP Instance UID of Concatenation Source"),
    SeriesInStudy: new TagDescriptor<"IS", number[]>(
        new Tag(0x0020, 0x1000), "IS", "Series in Study"),
    AcquisitionsInSeries: new TagDescriptor<"IS", number[]>(
        new Tag(0x0020, 0x1001), "IS", "Acquisitions in Series"),
    ImagesInAcquisition: new TagDescriptor<"IS", number[]>(
        new Tag(0x0020, 0x1002), "IS", "Images in Acquisition"),
    ImagesInSeries: new TagDescriptor<"IS", number[]>(
        new Tag(0x0020, 0x1003), "IS", "Images in Series"),
    AcquisitionsInStudy: new TagDescriptor<"IS", number[]>(
        new Tag(0x0020, 0x1004), "IS", "Acquisitions in Study"),
    ImagesInStudy: new TagDescriptor<"IS", number[]>(
        new Tag(0x0020, 0x1005), "IS", "Images in Study"),
    Reference: new TagDescriptor<"LO", string[]>(
        new Tag(0x0020, 0x1020), "LO", "Reference"),
    TargetPositionReferenceIndicator: new TagDescriptor<"LO", string[]>(
        new Tag(0x0020, 0x103F), "LO", "Target Position Reference Indicator"),
    PositionReferenceIndicator: new TagDescriptor<"LO", string[]>(
        new Tag(0x0020, 0x1040), "LO", "Position Reference Indicator"),
    SliceLocation: new TagDescriptor<"DS", number[]>(
        new Tag(0x0020, 0x1041), "DS", "Slice Location"),
    OtherStudyNumbers: new TagDescriptor<"IS", number[]>(
        new Tag(0x0020, 0x1070), "IS", "Other Study Numbers"),
    NumberOfPatientRelatedStudies: new TagDescriptor<"IS", number[]>(
        new Tag(0x0020, 0x1200), "IS", "Number of Patient Related Studies"),
    NumberOfPatientRelatedSeries: new TagDescriptor<"IS", number[]>(
        new Tag(0x0020, 0x1202), "IS", "Number of Patient Related Series"),
    NumberOfPatientRelatedInstances: new TagDescriptor<"IS", number[]>(
        new Tag(0x0020, 0x1204), "IS", "Number of Patient Related Instances"),
    NumberOfStudyRelatedSeries: new TagDescriptor<"IS", number[]>(
        new Tag(0x0020, 0x1206), "IS", "Number of Study Related Series"),
    NumberOfStudyRelatedInstances: new TagDescriptor<"IS", number[]>(
        new Tag(0x0020, 0x1208), "IS", "Number of Study Related Instances"),
    NumberOfSeriesRelatedInstances: new TagDescriptor<"IS", number[]>(
        new Tag(0x0020, 0x1209), "IS", "Number of Series Related Instances"),
    ModifyingDeviceID: new TagDescriptor<"CS", string[]>(
        new Tag(0x0020, 0x3401), "CS", "Modifying Device ID"),
    ModifiedImageID: new TagDescriptor<"CS", string[]>(
        new Tag(0x0020, 0x3402), "CS", "Modified Image ID"),
    ModifiedImageDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x0020, 0x3403), "DA", "Modified Image Date"),
    ModifyingDeviceManufacturer: new TagDescriptor<"LO", string[]>(
        new Tag(0x0020, 0x3404), "LO", "Modifying Device Manufacturer"),
    ModifiedImageTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x0020, 0x3405), "TM", "Modified Image Time"),
    ModifiedImageDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0020, 0x3406), "LO", "Modified Image Description"),
    ImageComments: new TagDescriptor<"LT", string>(
        new Tag(0x0020, 0x4000), "LT", "Image Comments"),
    OriginalImageIdentification: new TagDescriptor<"AT", TagInterface[]>(
        new Tag(0x0020, 0x5000), "AT", "Original Image Identification"),
    OriginalImageIdentificationNomenclature: new TagDescriptor<"LO", string[]>(
        new Tag(0x0020, 0x5002), "LO", "Original Image Identification Nomenclature"),
    StackID: new TagDescriptor<"SH", string[]>(
        new Tag(0x0020, 0x9056), "SH", "Stack ID"),
    InStackPositionNumber: new TagDescriptor<"UL", number[]>(
        new Tag(0x0020, 0x9057), "UL", "In-Stack Position Number"),
    FrameAnatomySequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0020, 0x9071), "SQ", "Frame Anatomy Sequence"),
    FrameLaterality: new TagDescriptor<"CS", string[]>(
        new Tag(0x0020, 0x9072), "CS", "Frame Laterality"),
    FrameContentSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0020, 0x9111), "SQ", "Frame Content Sequence"),
    PlanePositionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0020, 0x9113), "SQ", "Plane Position Sequence"),
    PlaneOrientationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0020, 0x9116), "SQ", "Plane Orientation Sequence"),
    TemporalPositionIndex: new TagDescriptor<"UL", number[]>(
        new Tag(0x0020, 0x9128), "UL", "Temporal Position Index"),
    NominalCardiacTriggerDelayTime: new TagDescriptor<"FD", number[]>(
        new Tag(0x0020, 0x9153), "FD", "Nominal Cardiac Trigger Delay Time"),
    NominalCardiacTriggerTimePriorToRPeak: new TagDescriptor<"FL", number[]>(
        new Tag(0x0020, 0x9154), "FL", "Nominal Cardiac Trigger Time Prior To R-Peak"),
    ActualCardiacTriggerTimePriorToRPeak: new TagDescriptor<"FL", number[]>(
        new Tag(0x0020, 0x9155), "FL", "Actual Cardiac Trigger Time Prior To R-Peak"),
    FrameAcquisitionNumber: new TagDescriptor<"US", number[]>(
        new Tag(0x0020, 0x9156), "US", "Frame Acquisition Number"),
    DimensionIndexValues: new TagDescriptor<"UL", number[]>(
        new Tag(0x0020, 0x9157), "UL", "Dimension Index Values"),
    FrameComments: new TagDescriptor<"LT", string>(
        new Tag(0x0020, 0x9158), "LT", "Frame Comments"),
    ConcatenationUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0020, 0x9161), "UI", "Concatenation UID"),
    InConcatenationNumber: new TagDescriptor<"US", number[]>(
        new Tag(0x0020, 0x9162), "US", "In-concatenation Number"),
    InConcatenationTotalNumber: new TagDescriptor<"US", number[]>(
        new Tag(0x0020, 0x9163), "US", "In-concatenation Total Number"),
    DimensionOrganizationUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0020, 0x9164), "UI", "Dimension Organization UID"),
    DimensionIndexPointer: new TagDescriptor<"AT", TagInterface[]>(
        new Tag(0x0020, 0x9165), "AT", "Dimension Index Pointer"),
    FunctionalGroupPointer: new TagDescriptor<"AT", TagInterface[]>(
        new Tag(0x0020, 0x9167), "AT", "Functional Group Pointer"),
    UnassignedSharedConvertedAttributesSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0020, 0x9170), "SQ", "Unassigned Shared Converted Attributes Sequence"),
    UnassignedPerFrameConvertedAttributesSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0020, 0x9171), "SQ", "Unassigned Per-Frame Converted Attributes Sequence"),
    ConversionSourceAttributesSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0020, 0x9172), "SQ", "Conversion Source Attributes Sequence"),
    DimensionIndexPrivateCreator: new TagDescriptor<"LO", string[]>(
        new Tag(0x0020, 0x9213), "LO", "Dimension Index Private Creator"),
    DimensionOrganizationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0020, 0x9221), "SQ", "Dimension Organization Sequence"),
    DimensionIndexSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0020, 0x9222), "SQ", "Dimension Index Sequence"),
    ConcatenationFrameOffsetNumber: new TagDescriptor<"UL", number[]>(
        new Tag(0x0020, 0x9228), "UL", "Concatenation Frame Offset Number"),
    FunctionalGroupPrivateCreator: new TagDescriptor<"LO", string[]>(
        new Tag(0x0020, 0x9238), "LO", "Functional Group Private Creator"),
    NominalPercentageOfCardiacPhase: new TagDescriptor<"FL", number[]>(
        new Tag(0x0020, 0x9241), "FL", "Nominal Percentage of Cardiac Phase"),
    NominalPercentageOfRespiratoryPhase: new TagDescriptor<"FL", number[]>(
        new Tag(0x0020, 0x9245), "FL", "Nominal Percentage of Respiratory Phase"),
    StartingRespiratoryAmplitude: new TagDescriptor<"FL", number[]>(
        new Tag(0x0020, 0x9246), "FL", "Starting Respiratory Amplitude"),
    StartingRespiratoryPhase: new TagDescriptor<"CS", string[]>(
        new Tag(0x0020, 0x9247), "CS", "Starting Respiratory Phase"),
    EndingRespiratoryAmplitude: new TagDescriptor<"FL", number[]>(
        new Tag(0x0020, 0x9248), "FL", "Ending Respiratory Amplitude"),
    EndingRespiratoryPhase: new TagDescriptor<"CS", string[]>(
        new Tag(0x0020, 0x9249), "CS", "Ending Respiratory Phase"),
    RespiratoryTriggerType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0020, 0x9250), "CS", "Respiratory Trigger Type"),
    RRIntervalTimeNominal: new TagDescriptor<"FD", number[]>(
        new Tag(0x0020, 0x9251), "FD", "R-R Interval Time Nominal"),
    ActualCardiacTriggerDelayTime: new TagDescriptor<"FD", number[]>(
        new Tag(0x0020, 0x9252), "FD", "Actual Cardiac Trigger Delay Time"),
    RespiratorySynchronizationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0020, 0x9253), "SQ", "Respiratory Synchronization Sequence"),
    RespiratoryIntervalTime: new TagDescriptor<"FD", number[]>(
        new Tag(0x0020, 0x9254), "FD", "Respiratory Interval Time"),
    NominalRespiratoryTriggerDelayTime: new TagDescriptor<"FD", number[]>(
        new Tag(0x0020, 0x9255), "FD", "Nominal Respiratory Trigger Delay Time"),
    RespiratoryTriggerDelayThreshold: new TagDescriptor<"FD", number[]>(
        new Tag(0x0020, 0x9256), "FD", "Respiratory Trigger Delay Threshold"),
    ActualRespiratoryTriggerDelayTime: new TagDescriptor<"FD", number[]>(
        new Tag(0x0020, 0x9257), "FD", "Actual Respiratory Trigger Delay Time"),
    ImagePositionVolume: new TagDescriptor<"FD", number[]>(
        new Tag(0x0020, 0x9301), "FD", "Image Position (Volume)"),
    ImageOrientationVolume: new TagDescriptor<"FD", number[]>(
        new Tag(0x0020, 0x9302), "FD", "Image Orientation (Volume)"),
    UltrasoundAcquisitionGeometry: new TagDescriptor<"CS", string[]>(
        new Tag(0x0020, 0x9307), "CS", "Ultrasound Acquisition Geometry"),
    ApexPosition: new TagDescriptor<"FD", number[]>(
        new Tag(0x0020, 0x9308), "FD", "Apex Position"),
    VolumeToTransducerMappingMatrix: new TagDescriptor<"FD", number[]>(
        new Tag(0x0020, 0x9309), "FD", "Volume to Transducer Mapping Matrix"),
    VolumeToTableMappingMatrix: new TagDescriptor<"FD", number[]>(
        new Tag(0x0020, 0x930A), "FD", "Volume to Table Mapping Matrix"),
    VolumeToTransducerRelationship: new TagDescriptor<"CS", string[]>(
        new Tag(0x0020, 0x930B), "CS", "Volume to Transducer Relationship"),
    PatientFrameOfReferenceSource: new TagDescriptor<"CS", string[]>(
        new Tag(0x0020, 0x930C), "CS", "Patient Frame of Reference Source"),
    TemporalPositionTimeOffset: new TagDescriptor<"FD", number[]>(
        new Tag(0x0020, 0x930D), "FD", "Temporal Position Time Offset"),
    PlanePositionVolumeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0020, 0x930E), "SQ", "Plane Position (Volume) Sequence"),
    PlaneOrientationVolumeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0020, 0x930F), "SQ", "Plane Orientation (Volume) Sequence"),
    TemporalPositionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0020, 0x9310), "SQ", "Temporal Position Sequence"),
    DimensionOrganizationType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0020, 0x9311), "CS", "Dimension Organization Type"),
    VolumeFrameOfReferenceUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0020, 0x9312), "UI", "Volume Frame of Reference UID"),
    TableFrameOfReferenceUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0020, 0x9313), "UI", "Table Frame of Reference UID"),
    DimensionDescriptionLabel: new TagDescriptor<"LO", string[]>(
        new Tag(0x0020, 0x9421), "LO", "Dimension Description Label"),
    PatientOrientationInFrameSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0020, 0x9450), "SQ", "Patient Orientation in Frame Sequence"),
    FrameLabel: new TagDescriptor<"LO", string[]>(
        new Tag(0x0020, 0x9453), "LO", "Frame Label"),
    AcquisitionIndex: new TagDescriptor<"US", number[]>(
        new Tag(0x0020, 0x9518), "US", "Acquisition Index"),
    ContributingSOPInstancesReferenceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0020, 0x9529), "SQ", "Contributing SOP Instances Reference Sequence"),
    ReconstructionIndex: new TagDescriptor<"US", number[]>(
        new Tag(0x0020, 0x9536), "US", "Reconstruction Index"),

    // Group 0x0022

    LightPathFilterPassThroughWavelength: new TagDescriptor<"US", number[]>(
        new Tag(0x0022, 0x0001), "US", "Light Path Filter Pass-Through Wavelength"),
    LightPathFilterPassBand: new TagDescriptor<"US", number[]>(
        new Tag(0x0022, 0x0002), "US", "Light Path Filter Pass Band"),
    ImagePathFilterPassThroughWavelength: new TagDescriptor<"US", number[]>(
        new Tag(0x0022, 0x0003), "US", "Image Path Filter Pass-Through Wavelength"),
    ImagePathFilterPassBand: new TagDescriptor<"US", number[]>(
        new Tag(0x0022, 0x0004), "US", "Image Path Filter Pass Band"),
    PatientEyeMovementCommanded: new TagDescriptor<"CS", string[]>(
        new Tag(0x0022, 0x0005), "CS", "Patient Eye Movement Commanded"),
    PatientEyeMovementCommandCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x0006), "SQ", "Patient Eye Movement Command Code Sequence"),
    SphericalLensPower: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x0007), "FL", "Spherical Lens Power"),
    CylinderLensPower: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x0008), "FL", "Cylinder Lens Power"),
    CylinderAxis: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x0009), "FL", "Cylinder Axis"),
    EmmetropicMagnification: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x000A), "FL", "Emmetropic Magnification"),
    IntraOcularPressure: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x000B), "FL", "Intra Ocular Pressure"),
    HorizontalFieldOfView: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x000C), "FL", "Horizontal Field of View"),
    PupilDilated: new TagDescriptor<"CS", string[]>(
        new Tag(0x0022, 0x000D), "CS", "Pupil Dilated"),
    DegreeOfDilation: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x000E), "FL", "Degree of Dilation"),
    StereoBaselineAngle: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x0010), "FL", "Stereo Baseline Angle"),
    StereoBaselineDisplacement: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x0011), "FL", "Stereo Baseline Displacement"),
    StereoHorizontalPixelOffset: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x0012), "FL", "Stereo Horizontal Pixel Offset"),
    StereoVerticalPixelOffset: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x0013), "FL", "Stereo Vertical Pixel Offset"),
    StereoRotation: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x0014), "FL", "Stereo Rotation"),
    AcquisitionDeviceTypeCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x0015), "SQ", "Acquisition Device Type Code Sequence"),
    IlluminationTypeCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x0016), "SQ", "Illumination Type Code Sequence"),
    LightPathFilterTypeStackCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x0017), "SQ", "Light Path Filter Type Stack Code Sequence"),
    ImagePathFilterTypeStackCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x0018), "SQ", "Image Path Filter Type Stack Code Sequence"),
    LensesCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x0019), "SQ", "Lenses Code Sequence"),
    ChannelDescriptionCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x001A), "SQ", "Channel Description Code Sequence"),
    RefractiveStateSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x001B), "SQ", "Refractive State Sequence"),
    MydriaticAgentCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x001C), "SQ", "Mydriatic Agent Code Sequence"),
    RelativeImagePositionCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x001D), "SQ", "Relative Image Position Code Sequence"),
    CameraAngleOfView: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x001E), "FL", "Camera Angle of View"),
    StereoPairsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x0020), "SQ", "Stereo Pairs Sequence"),
    LeftImageSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x0021), "SQ", "Left Image Sequence"),
    RightImageSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x0022), "SQ", "Right Image Sequence"),
    StereoPairsPresent: new TagDescriptor<"CS", string[]>(
        new Tag(0x0022, 0x0028), "CS", "Stereo Pairs Present"),
    AxialLengthOfTheEye: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x0030), "FL", "Axial Length of the Eye"),
    OphthalmicFrameLocationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x0031), "SQ", "Ophthalmic Frame Location Sequence"),
    ReferenceCoordinates: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x0032), "FL", "Reference Coordinates"),
    DepthSpatialResolution: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x0035), "FL", "Depth Spatial Resolution"),
    MaximumDepthDistortion: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x0036), "FL", "Maximum Depth Distortion"),
    AlongScanSpatialResolution: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x0037), "FL", "Along-scan Spatial Resolution"),
    MaximumAlongScanDistortion: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x0038), "FL", "Maximum Along-scan Distortion"),
    OphthalmicImageOrientation: new TagDescriptor<"CS", string[]>(
        new Tag(0x0022, 0x0039), "CS", "Ophthalmic Image Orientation"),
    DepthOfTransverseImage: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x0041), "FL", "Depth of Transverse Image"),
    MydriaticAgentConcentrationUnitsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x0042), "SQ", "Mydriatic Agent Concentration Units Sequence"),
    AcrossScanSpatialResolution: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x0048), "FL", "Across-scan Spatial Resolution"),
    MaximumAcrossScanDistortion: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x0049), "FL", "Maximum Across-scan Distortion"),
    MydriaticAgentConcentration: new TagDescriptor<"DS", number[]>(
        new Tag(0x0022, 0x004E), "DS", "Mydriatic Agent Concentration"),
    IlluminationWaveLength: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x0055), "FL", "Illumination Wave Length"),
    IlluminationPower: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x0056), "FL", "Illumination Power"),
    IlluminationBandwidth: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x0057), "FL", "Illumination Bandwidth"),
    MydriaticAgentSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x0058), "SQ", "Mydriatic Agent Sequence"),
    OphthalmicAxialMeasurementsRightEyeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1007), "SQ", "Ophthalmic Axial Measurements Right Eye Sequence"),
    OphthalmicAxialMeasurementsLeftEyeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1008), "SQ", "Ophthalmic Axial Measurements Left Eye Sequence"),
    OphthalmicAxialMeasurementsDeviceType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0022, 0x1009), "CS", "Ophthalmic Axial Measurements Device Type"),
    OphthalmicAxialLengthMeasurementsType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0022, 0x1010), "CS", "Ophthalmic Axial Length Measurements Type"),
    OphthalmicAxialLengthSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1012), "SQ", "Ophthalmic Axial Length Sequence"),
    OphthalmicAxialLength: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x1019), "FL", "Ophthalmic Axial Length"),
    LensStatusCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1024), "SQ", "Lens Status Code Sequence"),
    VitreousStatusCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1025), "SQ", "Vitreous Status Code Sequence"),
    IOLFormulaCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1028), "SQ", "IOL Formula Code Sequence"),
    IOLFormulaDetail: new TagDescriptor<"LO", string[]>(
        new Tag(0x0022, 0x1029), "LO", "IOL Formula Detail"),
    KeratometerIndex: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x1033), "FL", "Keratometer Index"),
    SourceOfOphthalmicAxialLengthCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1035), "SQ", "Source of Ophthalmic Axial Length Code Sequence"),
    TargetRefraction: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x1037), "FL", "Target Refraction"),
    RefractiveProcedureOccurred: new TagDescriptor<"CS", string[]>(
        new Tag(0x0022, 0x1039), "CS", "Refractive Procedure Occurred"),
    RefractiveSurgeryTypeCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1040), "SQ", "Refractive Surgery Type Code Sequence"),
    OphthalmicUltrasoundMethodCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1044), "SQ", "Ophthalmic Ultrasound Method Code Sequence"),
    OphthalmicAxialLengthMeasurementsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1050), "SQ", "Ophthalmic Axial Length Measurements Sequence"),
    IOLPower: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x1053), "FL", "IOL Power"),
    PredictedRefractiveError: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x1054), "FL", "Predicted Refractive Error"),
    OphthalmicAxialLengthVelocity: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x1059), "FL", "Ophthalmic Axial Length Velocity"),
    LensStatusDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0022, 0x1065), "LO", "Lens Status Description"),
    VitreousStatusDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0022, 0x1066), "LO", "Vitreous Status Description"),
    IOLPowerSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1090), "SQ", "IOL Power Sequence"),
    LensConstantSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1092), "SQ", "Lens Constant Sequence"),
    IOLManufacturer: new TagDescriptor<"LO", string[]>(
        new Tag(0x0022, 0x1093), "LO", "IOL Manufacturer"),
    LensConstantDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0022, 0x1094), "LO", "Lens Constant Description"),
    ImplantName: new TagDescriptor<"LO", string[]>(
        new Tag(0x0022, 0x1095), "LO", "Implant Name"),
    KeratometryMeasurementTypeCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1096), "SQ", "Keratometry Measurement Type Code Sequence"),
    ImplantPartNumber: new TagDescriptor<"LO", string[]>(
        new Tag(0x0022, 0x1097), "LO", "Implant Part Number"),
    ReferencedOphthalmicAxialMeasurementsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1100), "SQ", "Referenced Ophthalmic Axial Measurements Sequence"),
    OphthalmicAxialLengthMeasurementsSegmentNameCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1101), "SQ", "Ophthalmic Axial Length Measurements Segment Name Code Sequence"),
    RefractiveErrorBeforeRefractiveSurgeryCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1103), "SQ", "Refractive Error Before Refractive Surgery Code Sequence"),
    IOLPowerForExactEmmetropia: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x1121), "FL", "IOL Power For Exact Emmetropia"),
    IOLPowerForExactTargetRefraction: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x1122), "FL", "IOL Power For Exact Target Refraction"),
    AnteriorChamberDepthDefinitionCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1125), "SQ", "Anterior Chamber Depth Definition Code Sequence"),
    LensThicknessSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1127), "SQ", "Lens Thickness Sequence"),
    AnteriorChamberDepthSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1128), "SQ", "Anterior Chamber Depth Sequence"),
    LensThickness: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x1130), "FL", "Lens Thickness"),
    AnteriorChamberDepth: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x1131), "FL", "Anterior Chamber Depth"),
    SourceOfLensThicknessDataCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1132), "SQ", "Source of Lens Thickness Data Code Sequence"),
    SourceOfAnteriorChamberDepthDataCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1133), "SQ", "Source of Anterior Chamber Depth Data Code Sequence"),
    SourceOfRefractiveMeasurementsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1134), "SQ", "Source of Refractive Measurements Sequence"),
    SourceOfRefractiveMeasurementsCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1135), "SQ", "Source of Refractive Measurements Code Sequence"),
    OphthalmicAxialLengthMeasurementModified: new TagDescriptor<"CS", string[]>(
        new Tag(0x0022, 0x1140), "CS", "Ophthalmic Axial Length Measurement Modified"),
    OphthalmicAxialLengthDataSourceCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1150), "SQ", "Ophthalmic Axial Length Data Source Code Sequence"),
    OphthalmicAxialLengthAcquisitionMethodCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1153), "SQ", "Ophthalmic Axial Length Acquisition Method Code Sequence"),
    SignalToNoiseRatio: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x1155), "FL", "Signal to Noise Ratio"),
    OphthalmicAxialLengthDataSourceDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0022, 0x1159), "LO", "Ophthalmic Axial Length Data Source Description"),
    OphthalmicAxialLengthMeasurementsTotalLengthSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1210), "SQ", "Ophthalmic Axial Length Measurements Total Length Sequence"),
    OphthalmicAxialLengthMeasurementsSegmentalLengthSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1211), "SQ", "Ophthalmic Axial Length Measurements Segmental Length Sequence"),
    OphthalmicAxialLengthMeasurementsLengthSummationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1212), "SQ", "Ophthalmic Axial Length Measurements Length Summation Sequence"),
    UltrasoundOphthalmicAxialLengthMeasurementsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1220), "SQ", "Ultrasound Ophthalmic Axial Length Measurements Sequence"),
    OpticalOphthalmicAxialLengthMeasurementsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1225), "SQ", "Optical Ophthalmic Axial Length Measurements Sequence"),
    UltrasoundSelectedOphthalmicAxialLengthSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1230), "SQ", "Ultrasound Selected Ophthalmic Axial Length Sequence"),
    OphthalmicAxialLengthSelectionMethodCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1250), "SQ", "Ophthalmic Axial Length Selection Method Code Sequence"),
    OpticalSelectedOphthalmicAxialLengthSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1255), "SQ", "Optical Selected Ophthalmic Axial Length Sequence"),
    SelectedSegmentalOphthalmicAxialLengthSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1257), "SQ", "Selected Segmental Ophthalmic Axial Length Sequence"),
    SelectedTotalOphthalmicAxialLengthSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1260), "SQ", "Selected Total Ophthalmic Axial Length Sequence"),
    OphthalmicAxialLengthQualityMetricSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1262), "SQ", "Ophthalmic Axial Length Quality Metric Sequence"),
    OphthalmicAxialLengthQualityMetricTypeCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1265), "SQ", "Ophthalmic Axial Length Quality Metric Type Code Sequence"),
    OphthalmicAxialLengthQualityMetricTypeDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0022, 0x1273), "LO", "Ophthalmic Axial Length Quality Metric Type Description"),
    IntraocularLensCalculationsRightEyeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1300), "SQ", "Intraocular Lens Calculations Right Eye Sequence"),
    IntraocularLensCalculationsLeftEyeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1310), "SQ", "Intraocular Lens Calculations Left Eye Sequence"),
    ReferencedOphthalmicAxialLengthMeasurementQCImageSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1330), "SQ", "Referenced Ophthalmic Axial Length Measurement QC Image Sequence"),
    OphthalmicMappingDeviceType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0022, 0x1415), "CS", "Ophthalmic Mapping Device Type"),
    AcquisitionMethodCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1420), "SQ", "Acquisition Method Code Sequence"),
    AcquisitionMethodAlgorithmSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1423), "SQ", "Acquisition Method Algorithm Sequence"),
    OphthalmicThicknessMapTypeCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1436), "SQ", "Ophthalmic Thickness Map Type Code Sequence"),
    OphthalmicThicknessMappingNormalsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1443), "SQ", "Ophthalmic Thickness Mapping Normals Sequence"),
    RetinalThicknessDefinitionCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1445), "SQ", "Retinal Thickness Definition Code Sequence"),
    PixelValueMappingToCodedConceptSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1450), "SQ", "Pixel Value Mapping to Coded Concept Sequence"),
    PixelValueMappingExplanation: new TagDescriptor<"LO", string[]>(
        new Tag(0x0022, 0x1454), "LO", "Pixel Value Mapping Explanation"),
    OphthalmicThicknessMapQualityThresholdSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1458), "SQ", "Ophthalmic Thickness Map Quality Threshold Sequence"),
    OphthalmicThicknessMapThresholdQualityRating: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x1460), "FL", "Ophthalmic Thickness Map Threshold Quality Rating"),
    AnatomicStructureReferencePoint: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x1463), "FL", "Anatomic Structure Reference Point"),
    RegistrationToLocalizerSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1465), "SQ", "Registration to Localizer Sequence"),
    RegisteredLocalizerUnits: new TagDescriptor<"CS", string[]>(
        new Tag(0x0022, 0x1466), "CS", "Registered Localizer Units"),
    RegisteredLocalizerTopLeftHandCorner: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x1467), "FL", "Registered Localizer Top Left Hand Corner"),
    RegisteredLocalizerBottomRightHandCorner: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x1468), "FL", "Registered Localizer Bottom Right Hand Corner"),
    OphthalmicThicknessMapQualityRatingSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1470), "SQ", "Ophthalmic Thickness Map Quality Rating Sequence"),
    RelevantOPTAttributesSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1472), "SQ", "Relevant OPT Attributes Sequence"),
    TransformationMethodCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1512), "SQ", "Transformation Method Code Sequence"),
    TransformationAlgorithmSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1513), "SQ", "Transformation Algorithm Sequence"),
    OphthalmicAxialLengthMethod: new TagDescriptor<"CS", string[]>(
        new Tag(0x0022, 0x1515), "CS", "Ophthalmic Axial Length Method"),
    OphthalmicFOV: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x1517), "FL", "Ophthalmic FOV"),
    TwoDimensionalToThreeDimensionalMapSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1518), "SQ", "Two Dimensional to Three Dimensional Map Sequence"),
    WideFieldOphthalmicPhotographyQualityRatingSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1525), "SQ", "Wide Field Ophthalmic Photography Quality Rating Sequence"),
    WideFieldOphthalmicPhotographyQualityThresholdSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1526), "SQ", "Wide Field Ophthalmic Photography Quality Threshold Sequence"),
    WideFieldOphthalmicPhotographyThresholdQualityRating: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x1527), "FL", "Wide Field Ophthalmic Photography Threshold Quality Rating"),
    XCoordinatesCenterPixelViewAngle: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x1528), "FL", "X Coordinates Center Pixel View Angle"),
    YCoordinatesCenterPixelViewAngle: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x1529), "FL", "Y Coordinates Center Pixel View Angle"),
    NumberOfMapPoints: new TagDescriptor<"UL", number[]>(
        new Tag(0x0022, 0x1530), "UL", "Number of Map Points"),
    TwoDimensionalToThreeDimensionalMapData: new TagDescriptor<"OF", Float32Array | LazyValue<Float32Array>>(
        new Tag(0x0022, 0x1531), "OF", "Two Dimensional to Three Dimensional Map Data"),
    DerivationAlgorithmSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1612), "SQ", "Derivation Algorithm Sequence"),
    OphthalmicImageTypeCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1615), "SQ", "Ophthalmic Image Type Code Sequence"),
    OphthalmicImageTypeDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0022, 0x1616), "LO", "Ophthalmic Image Type Description"),
    ScanPatternTypeCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1618), "SQ", "Scan Pattern Type Code Sequence"),
    ReferencedSurfaceMeshIdentificationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1620), "SQ", "Referenced Surface Mesh Identification Sequence"),
    OphthalmicVolumetricPropertiesFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0022, 0x1622), "CS", "Ophthalmic Volumetric Properties Flag"),
    OphthalmicAnatomicReferencePointXCoordinate: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x1624), "FL", "Ophthalmic Anatomic Reference Point X-Coordinate"),
    OphthalmicAnatomicReferencePointYCoordinate: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x1626), "FL", "Ophthalmic Anatomic Reference Point Y-Coordinate"),
    OphthalmicEnFaceImageQualityRatingSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1628), "SQ", "Ophthalmic En Face Image Quality Rating Sequence"),
    QualityThreshold: new TagDescriptor<"DS", number[]>(
        new Tag(0x0022, 0x1630), "DS", "Quality Threshold"),
    OCTBscanAnalysisAcquisitionParametersSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0022, 0x1640), "SQ", "OCT B-scan Analysis Acquisition Parameters Sequence"),
    NumberofBscansPerFrame: new TagDescriptor<"UL", number[]>(
        new Tag(0x0022, 0x1642), "UL", "Number of B-scans Per Frame"),
    BscanSlabThickness: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x1643), "FL", "B-scan Slab Thickness"),
    DistanceBetweenBscanSlabs: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x1644), "FL", "Distance Between B-scan Slabs"),
    BscanCycleTime: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x1645), "FL", "B-scan Cycle Time"),
    BscanCycleTimeVector: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x1646), "FL", "B-scan Cycle Time Vector"),
    AscanRate: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x1649), "FL", "A-scan Rate"),
    BscanRate: new TagDescriptor<"FL", number[]>(
        new Tag(0x0022, 0x1650), "FL", "B-scan Rate"),
    SurfaceMeshZPixelOffset: new TagDescriptor<"UL", number[]>(
        new Tag(0x0022, 0x1658), "UL", "Surface Mesh Z-Pixel Offset"),

    // Group 0x0024

    VisualFieldHorizontalExtent: new TagDescriptor<"FL", number[]>(
        new Tag(0x0024, 0x0010), "FL", "Visual Field Horizontal Extent"),
    VisualFieldVerticalExtent: new TagDescriptor<"FL", number[]>(
        new Tag(0x0024, 0x0011), "FL", "Visual Field Vertical Extent"),
    VisualFieldShape: new TagDescriptor<"CS", string[]>(
        new Tag(0x0024, 0x0012), "CS", "Visual Field Shape"),
    ScreeningTestModeCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0024, 0x0016), "SQ", "Screening Test Mode Code Sequence"),
    MaximumStimulusLuminance: new TagDescriptor<"FL", number[]>(
        new Tag(0x0024, 0x0018), "FL", "Maximum Stimulus Luminance"),
    BackgroundLuminance: new TagDescriptor<"FL", number[]>(
        new Tag(0x0024, 0x0020), "FL", "Background Luminance"),
    StimulusColorCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0024, 0x0021), "SQ", "Stimulus Color Code Sequence"),
    BackgroundIlluminationColorCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0024, 0x0024), "SQ", "Background Illumination Color Code Sequence"),
    StimulusArea: new TagDescriptor<"FL", number[]>(
        new Tag(0x0024, 0x0025), "FL", "Stimulus Area"),
    StimulusPresentationTime: new TagDescriptor<"FL", number[]>(
        new Tag(0x0024, 0x0028), "FL", "Stimulus Presentation Time"),
    FixationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0024, 0x0032), "SQ", "Fixation Sequence"),
    FixationMonitoringCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0024, 0x0033), "SQ", "Fixation Monitoring Code Sequence"),
    VisualFieldCatchTrialSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0024, 0x0034), "SQ", "Visual Field Catch Trial Sequence"),
    FixationCheckedQuantity: new TagDescriptor<"US", number[]>(
        new Tag(0x0024, 0x0035), "US", "Fixation Checked Quantity"),
    PatientNotProperlyFixatedQuantity: new TagDescriptor<"US", number[]>(
        new Tag(0x0024, 0x0036), "US", "Patient Not Properly Fixated Quantity"),
    PresentedVisualStimuliDataFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0024, 0x0037), "CS", "Presented Visual Stimuli Data Flag"),
    NumberOfVisualStimuli: new TagDescriptor<"US", number[]>(
        new Tag(0x0024, 0x0038), "US", "Number of Visual Stimuli"),
    ExcessiveFixationLossesDataFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0024, 0x0039), "CS", "Excessive Fixation Losses Data Flag"),
    ExcessiveFixationLosses: new TagDescriptor<"CS", string[]>(
        new Tag(0x0024, 0x0040), "CS", "Excessive Fixation Losses"),
    StimuliRetestingQuantity: new TagDescriptor<"US", number[]>(
        new Tag(0x0024, 0x0042), "US", "Stimuli Retesting Quantity"),
    CommentsOnPatientPerformanceOfVisualField: new TagDescriptor<"LT", string>(
        new Tag(0x0024, 0x0044), "LT", "Comments on Patient's Performance of Visual Field"),
    FalseNegativesEstimateFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0024, 0x0045), "CS", "False Negatives Estimate Flag"),
    FalseNegativesEstimate: new TagDescriptor<"FL", number[]>(
        new Tag(0x0024, 0x0046), "FL", "False Negatives Estimate"),
    NegativeCatchTrialsQuantity: new TagDescriptor<"US", number[]>(
        new Tag(0x0024, 0x0048), "US", "Negative Catch Trials Quantity"),
    FalseNegativesQuantity: new TagDescriptor<"US", number[]>(
        new Tag(0x0024, 0x0050), "US", "False Negatives Quantity"),
    ExcessiveFalseNegativesDataFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0024, 0x0051), "CS", "Excessive False Negatives Data Flag"),
    ExcessiveFalseNegatives: new TagDescriptor<"CS", string[]>(
        new Tag(0x0024, 0x0052), "CS", "Excessive False Negatives"),
    FalsePositivesEstimateFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0024, 0x0053), "CS", "False Positives Estimate Flag"),
    FalsePositivesEstimate: new TagDescriptor<"FL", number[]>(
        new Tag(0x0024, 0x0054), "FL", "False Positives Estimate"),
    CatchTrialsDataFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0024, 0x0055), "CS", "Catch Trials Data Flag"),
    PositiveCatchTrialsQuantity: new TagDescriptor<"US", number[]>(
        new Tag(0x0024, 0x0056), "US", "Positive Catch Trials Quantity"),
    TestPointNormalsDataFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0024, 0x0057), "CS", "Test Point Normals Data Flag"),
    TestPointNormalsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0024, 0x0058), "SQ", "Test Point Normals Sequence"),
    GlobalDeviationProbabilityNormalsFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0024, 0x0059), "CS", "Global Deviation Probability Normals Flag"),
    FalsePositivesQuantity: new TagDescriptor<"US", number[]>(
        new Tag(0x0024, 0x0060), "US", "False Positives Quantity"),
    ExcessiveFalsePositivesDataFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0024, 0x0061), "CS", "Excessive False Positives Data Flag"),
    ExcessiveFalsePositives: new TagDescriptor<"CS", string[]>(
        new Tag(0x0024, 0x0062), "CS", "Excessive False Positives"),
    VisualFieldTestNormalsFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0024, 0x0063), "CS", "Visual Field Test Normals Flag"),
    ResultsNormalsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0024, 0x0064), "SQ", "Results Normals Sequence"),
    AgeCorrectedSensitivityDeviationAlgorithmSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0024, 0x0065), "SQ", "Age Corrected Sensitivity Deviation Algorithm Sequence"),
    GlobalDeviationFromNormal: new TagDescriptor<"FL", number[]>(
        new Tag(0x0024, 0x0066), "FL", "Global Deviation From Normal"),
    GeneralizedDefectSensitivityDeviationAlgorithmSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0024, 0x0067), "SQ", "Generalized Defect Sensitivity Deviation Algorithm Sequence"),
    LocalizedDeviationFromNormal: new TagDescriptor<"FL", number[]>(
        new Tag(0x0024, 0x0068), "FL", "Localized Deviation From Normal"),
    PatientReliabilityIndicator: new TagDescriptor<"LO", string[]>(
        new Tag(0x0024, 0x0069), "LO", "Patient Reliability Indicator"),
    VisualFieldMeanSensitivity: new TagDescriptor<"FL", number[]>(
        new Tag(0x0024, 0x0070), "FL", "Visual Field Mean Sensitivity"),
    GlobalDeviationProbability: new TagDescriptor<"FL", number[]>(
        new Tag(0x0024, 0x0071), "FL", "Global Deviation Probability"),
    LocalDeviationProbabilityNormalsFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0024, 0x0072), "CS", "Local Deviation Probability Normals Flag"),
    LocalizedDeviationProbability: new TagDescriptor<"FL", number[]>(
        new Tag(0x0024, 0x0073), "FL", "Localized Deviation Probability"),
    ShortTermFluctuationCalculated: new TagDescriptor<"CS", string[]>(
        new Tag(0x0024, 0x0074), "CS", "Short Term Fluctuation Calculated"),
    ShortTermFluctuation: new TagDescriptor<"FL", number[]>(
        new Tag(0x0024, 0x0075), "FL", "Short Term Fluctuation"),
    ShortTermFluctuationProbabilityCalculated: new TagDescriptor<"CS", string[]>(
        new Tag(0x0024, 0x0076), "CS", "Short Term Fluctuation Probability Calculated"),
    ShortTermFluctuationProbability: new TagDescriptor<"FL", number[]>(
        new Tag(0x0024, 0x0077), "FL", "Short Term Fluctuation Probability"),
    CorrectedLocalizedDeviationFromNormalCalculated: new TagDescriptor<"CS", string[]>(
        new Tag(0x0024, 0x0078), "CS", "Corrected Localized Deviation From Normal Calculated"),
    CorrectedLocalizedDeviationFromNormal: new TagDescriptor<"FL", number[]>(
        new Tag(0x0024, 0x0079), "FL", "Corrected Localized Deviation From Normal"),
    CorrectedLocalizedDeviationFromNormalProbabilityCalculated: new TagDescriptor<"CS", string[]>(
        new Tag(0x0024, 0x0080), "CS", "Corrected Localized Deviation From Normal Probability Calculated"),
    CorrectedLocalizedDeviationFromNormalProbability: new TagDescriptor<"FL", number[]>(
        new Tag(0x0024, 0x0081), "FL", "Corrected Localized Deviation From Normal Probability"),
    GlobalDeviationProbabilitySequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0024, 0x0083), "SQ", "Global Deviation Probability Sequence"),
    LocalizedDeviationProbabilitySequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0024, 0x0085), "SQ", "Localized Deviation Probability Sequence"),
    FovealSensitivityMeasured: new TagDescriptor<"CS", string[]>(
        new Tag(0x0024, 0x0086), "CS", "Foveal Sensitivity Measured"),
    FovealSensitivity: new TagDescriptor<"FL", number[]>(
        new Tag(0x0024, 0x0087), "FL", "Foveal Sensitivity"),
    VisualFieldTestDuration: new TagDescriptor<"FL", number[]>(
        new Tag(0x0024, 0x0088), "FL", "Visual Field Test Duration"),
    VisualFieldTestPointSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0024, 0x0089), "SQ", "Visual Field Test Point Sequence"),
    VisualFieldTestPointXCoordinate: new TagDescriptor<"FL", number[]>(
        new Tag(0x0024, 0x0090), "FL", "Visual Field Test Point X-Coordinate"),
    VisualFieldTestPointYCoordinate: new TagDescriptor<"FL", number[]>(
        new Tag(0x0024, 0x0091), "FL", "Visual Field Test Point Y-Coordinate"),
    AgeCorrectedSensitivityDeviationValue: new TagDescriptor<"FL", number[]>(
        new Tag(0x0024, 0x0092), "FL", "Age Corrected Sensitivity Deviation Value"),
    StimulusResults: new TagDescriptor<"CS", string[]>(
        new Tag(0x0024, 0x0093), "CS", "Stimulus Results"),
    SensitivityValue: new TagDescriptor<"FL", number[]>(
        new Tag(0x0024, 0x0094), "FL", "Sensitivity Value"),
    RetestStimulusSeen: new TagDescriptor<"CS", string[]>(
        new Tag(0x0024, 0x0095), "CS", "Retest Stimulus Seen"),
    RetestSensitivityValue: new TagDescriptor<"FL", number[]>(
        new Tag(0x0024, 0x0096), "FL", "Retest Sensitivity Value"),
    VisualFieldTestPointNormalsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0024, 0x0097), "SQ", "Visual Field Test Point Normals Sequence"),
    QuantifiedDefect: new TagDescriptor<"FL", number[]>(
        new Tag(0x0024, 0x0098), "FL", "Quantified Defect"),
    AgeCorrectedSensitivityDeviationProbabilityValue: new TagDescriptor<"FL", number[]>(
        new Tag(0x0024, 0x0100), "FL", "Age Corrected Sensitivity Deviation Probability Value"),
    GeneralizedDefectCorrectedSensitivityDeviationFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0024, 0x0102), "CS", "Generalized Defect Corrected Sensitivity Deviation Flag"),
    GeneralizedDefectCorrectedSensitivityDeviationValue: new TagDescriptor<"FL", number[]>(
        new Tag(0x0024, 0x0103), "FL", "Generalized Defect Corrected Sensitivity Deviation Value"),
    GeneralizedDefectCorrectedSensitivityDeviationProbabilityValue: new TagDescriptor<"FL", number[]>(
        new Tag(0x0024, 0x0104), "FL", "Generalized Defect Corrected Sensitivity Deviation Probability Value"),
    MinimumSensitivityValue: new TagDescriptor<"FL", number[]>(
        new Tag(0x0024, 0x0105), "FL", "Minimum Sensitivity Value"),
    BlindSpotLocalized: new TagDescriptor<"CS", string[]>(
        new Tag(0x0024, 0x0106), "CS", "Blind Spot Localized"),
    BlindSpotXCoordinate: new TagDescriptor<"FL", number[]>(
        new Tag(0x0024, 0x0107), "FL", "Blind Spot X-Coordinate"),
    BlindSpotYCoordinate: new TagDescriptor<"FL", number[]>(
        new Tag(0x0024, 0x0108), "FL", "Blind Spot Y-Coordinate"),
    VisualAcuityMeasurementSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0024, 0x0110), "SQ", "Visual Acuity Measurement Sequence"),
    RefractiveParametersUsedOnPatientSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0024, 0x0112), "SQ", "Refractive Parameters Used on Patient Sequence"),
    MeasurementLaterality: new TagDescriptor<"CS", string[]>(
        new Tag(0x0024, 0x0113), "CS", "Measurement Laterality"),
    OphthalmicPatientClinicalInformationLeftEyeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0024, 0x0114), "SQ", "Ophthalmic Patient Clinical Information Left Eye Sequence"),
    OphthalmicPatientClinicalInformationRightEyeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0024, 0x0115), "SQ", "Ophthalmic Patient Clinical Information Right Eye Sequence"),
    FovealPointNormativeDataFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0024, 0x0117), "CS", "Foveal Point Normative Data Flag"),
    FovealPointProbabilityValue: new TagDescriptor<"FL", number[]>(
        new Tag(0x0024, 0x0118), "FL", "Foveal Point Probability Value"),
    ScreeningBaselineMeasured: new TagDescriptor<"CS", string[]>(
        new Tag(0x0024, 0x0120), "CS", "Screening Baseline Measured"),
    ScreeningBaselineMeasuredSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0024, 0x0122), "SQ", "Screening Baseline Measured Sequence"),
    ScreeningBaselineType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0024, 0x0124), "CS", "Screening Baseline Type"),
    ScreeningBaselineValue: new TagDescriptor<"FL", number[]>(
        new Tag(0x0024, 0x0126), "FL", "Screening Baseline Value"),
    AlgorithmSource: new TagDescriptor<"LO", string[]>(
        new Tag(0x0024, 0x0202), "LO", "Algorithm Source"),
    DataSetName: new TagDescriptor<"LO", string[]>(
        new Tag(0x0024, 0x0306), "LO", "Data Set Name"),
    DataSetVersion: new TagDescriptor<"LO", string[]>(
        new Tag(0x0024, 0x0307), "LO", "Data Set Version"),
    DataSetSource: new TagDescriptor<"LO", string[]>(
        new Tag(0x0024, 0x0308), "LO", "Data Set Source"),
    DataSetDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0024, 0x0309), "LO", "Data Set Description"),
    VisualFieldTestReliabilityGlobalIndexSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0024, 0x0317), "SQ", "Visual Field Test Reliability Global Index Sequence"),
    VisualFieldGlobalResultsIndexSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0024, 0x0320), "SQ", "Visual Field Global Results Index Sequence"),
    DataObservationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0024, 0x0325), "SQ", "Data Observation Sequence"),
    IndexNormalsFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0024, 0x0338), "CS", "Index Normals Flag"),
    IndexProbability: new TagDescriptor<"FL", number[]>(
        new Tag(0x0024, 0x0341), "FL", "Index Probability"),
    IndexProbabilitySequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0024, 0x0344), "SQ", "Index Probability Sequence"),

    // Group 0x0028

    SamplesPerPixel: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x0002), "US", "Samples per Pixel"),
    SamplesPerPixelUsed: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x0003), "US", "Samples per Pixel Used"),
    PhotometricInterpretation: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x0004), "CS", "Photometric Interpretation"),
    ImageDimensions: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x0005), "US", "Image Dimensions"),
    PlanarConfiguration: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x0006), "US", "Planar Configuration"),
    NumberOfFrames: new TagDescriptor<"IS", number[]>(
        new Tag(0x0028, 0x0008), "IS", "Number of Frames"),
    FrameIncrementPointer: new TagDescriptor<"AT", TagInterface[]>(
        new Tag(0x0028, 0x0009), "AT", "Frame Increment Pointer"),
    FrameDimensionPointer: new TagDescriptor<"AT", TagInterface[]>(
        new Tag(0x0028, 0x000A), "AT", "Frame Dimension Pointer"),
    Rows: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x0010), "US", "Rows"),
    Columns: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x0011), "US", "Columns"),
    Planes: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x0012), "US", "Planes"),
    UltrasoundColorDataPresent: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x0014), "US", "Ultrasound Color Data Present"),
    PixelSpacing: new TagDescriptor<"DS", number[]>(
        new Tag(0x0028, 0x0030), "DS", "Pixel Spacing"),
    ZoomFactor: new TagDescriptor<"DS", number[]>(
        new Tag(0x0028, 0x0031), "DS", "Zoom Factor"),
    ZoomCenter: new TagDescriptor<"DS", number[]>(
        new Tag(0x0028, 0x0032), "DS", "Zoom Center"),
    PixelAspectRatio: new TagDescriptor<"IS", number[]>(
        new Tag(0x0028, 0x0034), "IS", "Pixel Aspect Ratio"),
    ImageFormat: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x0040), "CS", "Image Format"),
    ManipulatedImage: new TagDescriptor<"LO", string[]>(
        new Tag(0x0028, 0x0050), "LO", "Manipulated Image"),
    CorrectedImage: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x0051), "CS", "Corrected Image"),
    CompressionRecognitionCode: new TagDescriptor<"LO", string[]>(
        new Tag(0x0028, 0x005F), "LO", "Compression Recognition Code"),
    CompressionCode: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x0060), "CS", "Compression Code"),
    CompressionOriginator: new TagDescriptor<"SH", string[]>(
        new Tag(0x0028, 0x0061), "SH", "Compression Originator"),
    CompressionLabel: new TagDescriptor<"LO", string[]>(
        new Tag(0x0028, 0x0062), "LO", "Compression Label"),
    CompressionDescription: new TagDescriptor<"SH", string[]>(
        new Tag(0x0028, 0x0063), "SH", "Compression Description"),
    CompressionSequence: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x0065), "CS", "Compression Sequence"),
    CompressionStepPointers: new TagDescriptor<"AT", TagInterface[]>(
        new Tag(0x0028, 0x0066), "AT", "Compression Step Pointers"),
    RepeatInterval: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x0068), "US", "Repeat Interval"),
    BitsGrouped: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x0069), "US", "Bits Grouped"),
    PerimeterTable: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x0070), "US", "Perimeter Table"),
    PredictorRows: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x0080), "US", "Predictor Rows"),
    PredictorColumns: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x0081), "US", "Predictor Columns"),
    PredictorConstants: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x0082), "US", "Predictor Constants"),
    BlockedPixels: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x0090), "CS", "Blocked Pixels"),
    BlockRows: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x0091), "US", "Block Rows"),
    BlockColumns: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x0092), "US", "Block Columns"),
    RowOverlap: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x0093), "US", "Row Overlap"),
    ColumnOverlap: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x0094), "US", "Column Overlap"),
    BitsAllocated: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x0100), "US", "Bits Allocated"),
    BitsStored: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x0101), "US", "Bits Stored"),
    HighBit: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x0102), "US", "High Bit"),
    PixelRepresentation: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x0103), "US", "Pixel Representation"),
    FloatPixelPaddingValue: new TagDescriptor<"FL", number[]>(
        new Tag(0x0028, 0x0122), "FL", "Float Pixel Padding Value"),
    DoubleFloatPixelPaddingValue: new TagDescriptor<"FD", number[]>(
        new Tag(0x0028, 0x0123), "FD", "Double Float Pixel Padding Value"),
    FloatPixelPaddingRangeLimit: new TagDescriptor<"FL", number[]>(
        new Tag(0x0028, 0x0124), "FL", "Float Pixel Padding Range Limit"),
    DoubleFloatPixelPaddingRangeLimit: new TagDescriptor<"FD", number[]>(
        new Tag(0x0028, 0x0125), "FD", "Double Float Pixel Padding Range Limit"),
    ImageLocation: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x0200), "US", "Image Location"),
    QualityControlImage: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x0300), "CS", "Quality Control Image"),
    BurnedInAnnotation: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x0301), "CS", "Burned In Annotation"),
    RecognizableVisualFeatures: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x0302), "CS", "Recognizable Visual Features"),
    LongitudinalTemporalInformationModified: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x0303), "CS", "Longitudinal Temporal Information Modified"),
    ReferencedColorPaletteInstanceUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0028, 0x0304), "UI", "Referenced Color Palette Instance UID"),
    TransformLabel: new TagDescriptor<"LO", string[]>(
        new Tag(0x0028, 0x0400), "LO", "Transform Label"),
    TransformVersionNumber: new TagDescriptor<"LO", string[]>(
        new Tag(0x0028, 0x0401), "LO", "Transform Version Number"),
    NumberOfTransformSteps: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x0402), "US", "Number of Transform Steps"),
    SequenceOfCompressedData: new TagDescriptor<"LO", string[]>(
        new Tag(0x0028, 0x0403), "LO", "Sequence of Compressed Data"),
    DetailsOfCoefficients: new TagDescriptor<"AT", TagInterface[]>(
        new Tag(0x0028, 0x0404), "AT", "Details of Coefficients"),
    DCTLabel: new TagDescriptor<"LO", string[]>(
        new Tag(0x0028, 0x0700), "LO", "DCT Label"),
    DataBlockDescription: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x0701), "CS", "Data Block Description"),
    DataBlock: new TagDescriptor<"AT", TagInterface[]>(
        new Tag(0x0028, 0x0702), "AT", "Data Block"),
    NormalizationFactorFormat: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x0710), "US", "Normalization Factor Format"),
    ZonalMapNumberFormat: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x0720), "US", "Zonal Map Number Format"),
    ZonalMapLocation: new TagDescriptor<"AT", TagInterface[]>(
        new Tag(0x0028, 0x0721), "AT", "Zonal Map Location"),
    ZonalMapFormat: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x0722), "US", "Zonal Map Format"),
    AdaptiveMapFormat: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x0730), "US", "Adaptive Map Format"),
    CodeNumberFormat: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x0740), "US", "Code Number Format"),
    PixelSpacingCalibrationType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x0A02), "CS", "Pixel Spacing Calibration Type"),
    PixelSpacingCalibrationDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0028, 0x0A04), "LO", "Pixel Spacing Calibration Description"),
    PixelIntensityRelationship: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x1040), "CS", "Pixel Intensity Relationship"),
    PixelIntensityRelationshipSign: new TagDescriptor<"SS", number[]>(
        new Tag(0x0028, 0x1041), "SS", "Pixel Intensity Relationship Sign"),
    WindowCenter: new TagDescriptor<"DS", number[]>(
        new Tag(0x0028, 0x1050), "DS", "Window Center"),
    WindowWidth: new TagDescriptor<"DS", number[]>(
        new Tag(0x0028, 0x1051), "DS", "Window Width"),
    RescaleIntercept: new TagDescriptor<"DS", number[]>(
        new Tag(0x0028, 0x1052), "DS", "Rescale Intercept"),
    RescaleSlope: new TagDescriptor<"DS", number[]>(
        new Tag(0x0028, 0x1053), "DS", "Rescale Slope"),
    RescaleType: new TagDescriptor<"LO", string[]>(
        new Tag(0x0028, 0x1054), "LO", "Rescale Type"),
    WindowCenterWidthExplanation: new TagDescriptor<"LO", string[]>(
        new Tag(0x0028, 0x1055), "LO", "Window Center &amp; Width Explanation"),
    VOILUTFunction: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x1056), "CS", "VOI LUT Function"),
    GrayScale: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x1080), "CS", "Gray Scale"),
    RecommendedViewingMode: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x1090), "CS", "Recommended Viewing Mode"),
    AlphaPaletteColorLookupTableDescriptor: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x1104), "US", "Alpha Palette Color Lookup Table Descriptor"),
    PaletteColorLookupTableUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0028, 0x1199), "UI", "Palette Color Lookup Table UID"),
    RedPaletteColorLookupTableData: new TagDescriptor<"OW", Uint16Array | LazyValue<Uint16Array>>(
        new Tag(0x0028, 0x1201), "OW", "Red Palette Color Lookup Table Data"),
    GreenPaletteColorLookupTableData: new TagDescriptor<"OW", Uint16Array | LazyValue<Uint16Array>>(
        new Tag(0x0028, 0x1202), "OW", "Green Palette Color Lookup Table Data"),
    BluePaletteColorLookupTableData: new TagDescriptor<"OW", Uint16Array | LazyValue<Uint16Array>>(
        new Tag(0x0028, 0x1203), "OW", "Blue Palette Color Lookup Table Data"),
    AlphaPaletteColorLookupTableData: new TagDescriptor<"OW", Uint16Array | LazyValue<Uint16Array>>(
        new Tag(0x0028, 0x1204), "OW", "Alpha Palette Color Lookup Table Data"),
    LargeRedPaletteColorLookupTableData: new TagDescriptor<"OW", Uint16Array | LazyValue<Uint16Array>>(
        new Tag(0x0028, 0x1211), "OW", "Large Red Palette Color Lookup Table Data"),
    LargeGreenPaletteColorLookupTableData: new TagDescriptor<"OW", Uint16Array | LazyValue<Uint16Array>>(
        new Tag(0x0028, 0x1212), "OW", "Large Green Palette Color Lookup Table Data"),
    LargeBluePaletteColorLookupTableData: new TagDescriptor<"OW", Uint16Array | LazyValue<Uint16Array>>(
        new Tag(0x0028, 0x1213), "OW", "Large Blue Palette Color Lookup Table Data"),
    LargePaletteColorLookupTableUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0028, 0x1214), "UI", "Large Palette Color Lookup Table UID"),
    SegmentedRedPaletteColorLookupTableData: new TagDescriptor<"OW", Uint16Array | LazyValue<Uint16Array>>(
        new Tag(0x0028, 0x1221), "OW", "Segmented Red Palette Color Lookup Table Data"),
    SegmentedGreenPaletteColorLookupTableData: new TagDescriptor<"OW", Uint16Array | LazyValue<Uint16Array>>(
        new Tag(0x0028, 0x1222), "OW", "Segmented Green Palette Color Lookup Table Data"),
    SegmentedBluePaletteColorLookupTableData: new TagDescriptor<"OW", Uint16Array | LazyValue<Uint16Array>>(
        new Tag(0x0028, 0x1223), "OW", "Segmented Blue Palette Color Lookup Table Data"),
    SegmentedAlphaPaletteColorLookupTableData: new TagDescriptor<"OW", Uint16Array | LazyValue<Uint16Array>>(
        new Tag(0x0028, 0x1224), "OW", "Segmented Alpha Palette Color Lookup Table Data"),
    StoredValueColorRangeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0028, 0x1230), "SQ", "Stored Value Color Range Sequence"),
    MinimumStoredValueMapped: new TagDescriptor<"FD", number[]>(
        new Tag(0x0028, 0x1231), "FD", "Minimum Stored Value Mapped"),
    MaximumStoredValueMapped: new TagDescriptor<"FD", number[]>(
        new Tag(0x0028, 0x1232), "FD", "Maximum Stored Value Mapped"),
    BreastImplantPresent: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x1300), "CS", "Breast Implant Present"),
    PartialView: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x1350), "CS", "Partial View"),
    PartialViewDescription: new TagDescriptor<"ST", string>(
        new Tag(0x0028, 0x1351), "ST", "Partial View Description"),
    PartialViewCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0028, 0x1352), "SQ", "Partial View Code Sequence"),
    SpatialLocationsPreserved: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x135A), "CS", "Spatial Locations Preserved"),
    DataFrameAssignmentSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0028, 0x1401), "SQ", "Data Frame Assignment Sequence"),
    DataPathAssignment: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x1402), "CS", "Data Path Assignment"),
    BitsMappedToColorLookupTable: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x1403), "US", "Bits Mapped to Color Lookup Table"),
    BlendingLUT1Sequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0028, 0x1404), "SQ", "Blending LUT 1 Sequence"),
    BlendingLUT1TransferFunction: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x1405), "CS", "Blending LUT 1 Transfer Function"),
    BlendingWeightConstant: new TagDescriptor<"FD", number[]>(
        new Tag(0x0028, 0x1406), "FD", "Blending Weight Constant"),
    BlendingLookupTableDescriptor: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x1407), "US", "Blending Lookup Table Descriptor"),
    BlendingLookupTableData: new TagDescriptor<"OW", Uint16Array | LazyValue<Uint16Array>>(
        new Tag(0x0028, 0x1408), "OW", "Blending Lookup Table Data"),
    EnhancedPaletteColorLookupTableSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0028, 0x140B), "SQ", "Enhanced Palette Color Lookup Table Sequence"),
    BlendingLUT2Sequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0028, 0x140C), "SQ", "Blending LUT 2 Sequence"),
    BlendingLUT2TransferFunction: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x140D), "CS", "Blending LUT 2 Transfer Function"),
    DataPathID: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x140E), "CS", "Data Path ID"),
    RGBLUTTransferFunction: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x140F), "CS", "RGB LUT Transfer Function"),
    AlphaLUTTransferFunction: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x1410), "CS", "Alpha LUT Transfer Function"),
    ICCProfile: new TagDescriptor<"OB", Uint8Array | LazyValue<Uint8Array>>(
        new Tag(0x0028, 0x2000), "OB", "ICC Profile"),
    ColorSpace: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x2002), "CS", "Color Space"),
    LossyImageCompression: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x2110), "CS", "Lossy Image Compression"),
    LossyImageCompressionRatio: new TagDescriptor<"DS", number[]>(
        new Tag(0x0028, 0x2112), "DS", "Lossy Image Compression Ratio"),
    LossyImageCompressionMethod: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x2114), "CS", "Lossy Image Compression Method"),
    ModalityLUTSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0028, 0x3000), "SQ", "Modality LUT Sequence"),
    LUTExplanation: new TagDescriptor<"LO", string[]>(
        new Tag(0x0028, 0x3003), "LO", "LUT Explanation"),
    ModalityLUTType: new TagDescriptor<"LO", string[]>(
        new Tag(0x0028, 0x3004), "LO", "Modality LUT Type"),
    VOILUTSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0028, 0x3010), "SQ", "VOI LUT Sequence"),
    SoftcopyVOILUTSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0028, 0x3110), "SQ", "Softcopy VOI LUT Sequence"),
    ImagePresentationComments: new TagDescriptor<"LT", string>(
        new Tag(0x0028, 0x4000), "LT", "Image Presentation Comments"),
    BiPlaneAcquisitionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0028, 0x5000), "SQ", "Bi-Plane Acquisition Sequence"),
    RepresentativeFrameNumber: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x6010), "US", "Representative Frame Number"),
    FrameNumbersOfInterest: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x6020), "US", "Frame Numbers of Interest (FOI)"),
    FrameOfInterestDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0028, 0x6022), "LO", "Frame of Interest Description"),
    FrameOfInterestType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x6023), "CS", "Frame of Interest Type"),
    MaskPointers: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x6030), "US", "Mask Pointer(s)"),
    RWavePointer: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x6040), "US", "R Wave Pointer"),
    MaskSubtractionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0028, 0x6100), "SQ", "Mask Subtraction Sequence"),
    MaskOperation: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x6101), "CS", "Mask Operation"),
    ApplicableFrameRange: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x6102), "US", "Applicable Frame Range"),
    MaskFrameNumbers: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x6110), "US", "Mask Frame Numbers"),
    ContrastFrameAveraging: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x6112), "US", "Contrast Frame Averaging"),
    MaskSubPixelShift: new TagDescriptor<"FL", number[]>(
        new Tag(0x0028, 0x6114), "FL", "Mask Sub-pixel Shift"),
    TIDOffset: new TagDescriptor<"SS", number[]>(
        new Tag(0x0028, 0x6120), "SS", "TID Offset"),
    MaskOperationExplanation: new TagDescriptor<"ST", string>(
        new Tag(0x0028, 0x6190), "ST", "Mask Operation Explanation"),
    EquipmentAdministratorSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0028, 0x7000), "SQ", "Equipment Administrator Sequence"),
    NumberOfDisplaySubsystems: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x7001), "US", "Number of Display Subsystems"),
    CurrentConfigurationID: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x7002), "US", "Current Configuration ID"),
    DisplaySubsystemID: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x7003), "US", "Display Subsystem ID"),
    DisplaySubsystemName: new TagDescriptor<"SH", string[]>(
        new Tag(0x0028, 0x7004), "SH", "Display Subsystem Name"),
    DisplaySubsystemDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0028, 0x7005), "LO", "Display Subsystem Description"),
    SystemStatus: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x7006), "CS", "System Status"),
    SystemStatusComment: new TagDescriptor<"LO", string[]>(
        new Tag(0x0028, 0x7007), "LO", "System Status Comment"),
    TargetLuminanceCharacteristicsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0028, 0x7008), "SQ", "Target Luminance Characteristics Sequence"),
    LuminanceCharacteristicsID: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x7009), "US", "Luminance Characteristics ID"),
    DisplaySubsystemConfigurationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0028, 0x700A), "SQ", "Display Subsystem Configuration Sequence"),
    ConfigurationID: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x700B), "US", "Configuration ID"),
    ConfigurationName: new TagDescriptor<"SH", string[]>(
        new Tag(0x0028, 0x700C), "SH", "Configuration Name"),
    ConfigurationDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0028, 0x700D), "LO", "Configuration Description"),
    ReferencedTargetLuminanceCharacteristicsID: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x700E), "US", "Referenced Target Luminance Characteristics ID"),
    QAResultsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0028, 0x700F), "SQ", "QA Results Sequence"),
    DisplaySubsystemQAResultsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0028, 0x7010), "SQ", "Display Subsystem QA Results Sequence"),
    ConfigurationQAResultsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0028, 0x7011), "SQ", "Configuration QA Results Sequence"),
    MeasurementEquipmentSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0028, 0x7012), "SQ", "Measurement Equipment Sequence"),
    MeasurementFunctions: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x7013), "CS", "Measurement Functions"),
    MeasurementEquipmentType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x7014), "CS", "Measurement Equipment Type"),
    VisualEvaluationResultSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0028, 0x7015), "SQ", "Visual Evaluation Result Sequence"),
    DisplayCalibrationResultSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0028, 0x7016), "SQ", "Display Calibration Result Sequence"),
    DDLValue: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x7017), "US", "DDL Value"),
    CIExyWhitePoint: new TagDescriptor<"FL", number[]>(
        new Tag(0x0028, 0x7018), "FL", "CIExy White Point"),
    DisplayFunctionType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x7019), "CS", "Display Function Type"),
    GammaValue: new TagDescriptor<"FL", number[]>(
        new Tag(0x0028, 0x701A), "FL", "Gamma Value"),
    NumberOfLuminancePoints: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x701B), "US", "Number of Luminance Points"),
    LuminanceResponseSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0028, 0x701C), "SQ", "Luminance Response Sequence"),
    TargetMinimumLuminance: new TagDescriptor<"FL", number[]>(
        new Tag(0x0028, 0x701D), "FL", "Target Minimum Luminance"),
    TargetMaximumLuminance: new TagDescriptor<"FL", number[]>(
        new Tag(0x0028, 0x701E), "FL", "Target Maximum Luminance"),
    LuminanceValue: new TagDescriptor<"FL", number[]>(
        new Tag(0x0028, 0x701F), "FL", "Luminance Value"),
    LuminanceResponseDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0028, 0x7020), "LO", "Luminance Response Description"),
    WhitePointFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x7021), "CS", "White Point Flag"),
    DisplayDeviceTypeCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0028, 0x7022), "SQ", "Display Device Type Code Sequence"),
    DisplaySubsystemSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0028, 0x7023), "SQ", "Display Subsystem Sequence"),
    LuminanceResultSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0028, 0x7024), "SQ", "Luminance Result Sequence"),
    AmbientLightValueSource: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x7025), "CS", "Ambient Light Value Source"),
    MeasuredCharacteristics: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x7026), "CS", "Measured Characteristics"),
    LuminanceUniformityResultSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0028, 0x7027), "SQ", "Luminance Uniformity Result Sequence"),
    VisualEvaluationTestSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0028, 0x7028), "SQ", "Visual Evaluation Test Sequence"),
    TestResult: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x7029), "CS", "Test Result"),
    TestResultComment: new TagDescriptor<"LO", string[]>(
        new Tag(0x0028, 0x702A), "LO", "Test Result Comment"),
    TestImageValidation: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x702B), "CS", "Test Image Validation"),
    TestPatternCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0028, 0x702C), "SQ", "Test Pattern Code Sequence"),
    MeasurementPatternCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0028, 0x702D), "SQ", "Measurement Pattern Code Sequence"),
    VisualEvaluationMethodCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0028, 0x702E), "SQ", "Visual Evaluation Method Code Sequence"),
    PixelDataProviderURL: new TagDescriptor<"UR", string>(
        new Tag(0x0028, 0x7FE0), "UR", "Pixel Data Provider URL"),
    DataPointRows: new TagDescriptor<"UL", number[]>(
        new Tag(0x0028, 0x9001), "UL", "Data Point Rows"),
    DataPointColumns: new TagDescriptor<"UL", number[]>(
        new Tag(0x0028, 0x9002), "UL", "Data Point Columns"),
    SignalDomainColumns: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x9003), "CS", "Signal Domain Columns"),
    LargestMonochromePixelValue: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x9099), "US", "Largest Monochrome Pixel Value"),
    DataRepresentation: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x9108), "CS", "Data Representation"),
    PixelMeasuresSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0028, 0x9110), "SQ", "Pixel Measures Sequence"),
    FrameVOILUTSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0028, 0x9132), "SQ", "Frame VOI LUT Sequence"),
    PixelValueTransformationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0028, 0x9145), "SQ", "Pixel Value Transformation Sequence"),
    SignalDomainRows: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x9235), "CS", "Signal Domain Rows"),
    DisplayFilterPercentage: new TagDescriptor<"FL", number[]>(
        new Tag(0x0028, 0x9411), "FL", "Display Filter Percentage"),
    FramePixelShiftSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0028, 0x9415), "SQ", "Frame Pixel Shift Sequence"),
    SubtractionItemID: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x9416), "US", "Subtraction Item ID"),
    PixelIntensityRelationshipLUTSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0028, 0x9422), "SQ", "Pixel Intensity Relationship LUT Sequence"),
    FramePixelDataPropertiesSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0028, 0x9443), "SQ", "Frame Pixel Data Properties Sequence"),
    GeometricalProperties: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x9444), "CS", "Geometrical Properties"),
    GeometricMaximumDistortion: new TagDescriptor<"FL", number[]>(
        new Tag(0x0028, 0x9445), "FL", "Geometric Maximum Distortion"),
    ImageProcessingApplied: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x9446), "CS", "Image Processing Applied"),
    MaskSelectionMode: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x9454), "CS", "Mask Selection Mode"),
    LUTFunction: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x9474), "CS", "LUT Function"),
    MaskVisibilityPercentage: new TagDescriptor<"FL", number[]>(
        new Tag(0x0028, 0x9478), "FL", "Mask Visibility Percentage"),
    PixelShiftSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0028, 0x9501), "SQ", "Pixel Shift Sequence"),
    RegionPixelShiftSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0028, 0x9502), "SQ", "Region Pixel Shift Sequence"),
    VerticesOfTheRegion: new TagDescriptor<"SS", number[]>(
        new Tag(0x0028, 0x9503), "SS", "Vertices of the Region"),
    MultiFramePresentationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0028, 0x9505), "SQ", "Multi-frame Presentation Sequence"),
    PixelShiftFrameRange: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x9506), "US", "Pixel Shift Frame Range"),
    LUTFrameRange: new TagDescriptor<"US", number[]>(
        new Tag(0x0028, 0x9507), "US", "LUT Frame Range"),
    ImageToEquipmentMappingMatrix: new TagDescriptor<"DS", number[]>(
        new Tag(0x0028, 0x9520), "DS", "Image to Equipment Mapping Matrix"),
    EquipmentCoordinateSystemIdentification: new TagDescriptor<"CS", string[]>(
        new Tag(0x0028, 0x9537), "CS", "Equipment Coordinate System Identification"),

    // Group 0x0032

    StudyStatusID: new TagDescriptor<"CS", string[]>(
        new Tag(0x0032, 0x000A), "CS", "Study Status ID"),
    StudyPriorityID: new TagDescriptor<"CS", string[]>(
        new Tag(0x0032, 0x000C), "CS", "Study Priority ID"),
    StudyIDIssuer: new TagDescriptor<"LO", string[]>(
        new Tag(0x0032, 0x0012), "LO", "Study ID Issuer"),
    StudyVerifiedDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x0032, 0x0032), "DA", "Study Verified Date"),
    StudyVerifiedTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x0032, 0x0033), "TM", "Study Verified Time"),
    StudyReadDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x0032, 0x0034), "DA", "Study Read Date"),
    StudyReadTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x0032, 0x0035), "TM", "Study Read Time"),
    ScheduledStudyStartDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x0032, 0x1000), "DA", "Scheduled Study Start Date"),
    ScheduledStudyStartTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x0032, 0x1001), "TM", "Scheduled Study Start Time"),
    ScheduledStudyStopDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x0032, 0x1010), "DA", "Scheduled Study Stop Date"),
    ScheduledStudyStopTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x0032, 0x1011), "TM", "Scheduled Study Stop Time"),
    ScheduledStudyLocation: new TagDescriptor<"LO", string[]>(
        new Tag(0x0032, 0x1020), "LO", "Scheduled Study Location"),
    ScheduledStudyLocationAETitle: new TagDescriptor<"AE", string[]>(
        new Tag(0x0032, 0x1021), "AE", "Scheduled Study Location AE Title"),
    ReasonForStudy: new TagDescriptor<"LO", string[]>(
        new Tag(0x0032, 0x1030), "LO", "Reason for Study"),
    RequestingPhysicianIdentificationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0032, 0x1031), "SQ", "Requesting Physician Identification Sequence"),
    RequestingPhysician: new TagDescriptor<"PN", string[]>(
        new Tag(0x0032, 0x1032), "PN", "Requesting Physician"),
    RequestingService: new TagDescriptor<"LO", string[]>(
        new Tag(0x0032, 0x1033), "LO", "Requesting Service"),
    RequestingServiceCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0032, 0x1034), "SQ", "Requesting Service Code Sequence"),
    StudyArrivalDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x0032, 0x1040), "DA", "Study Arrival Date"),
    StudyArrivalTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x0032, 0x1041), "TM", "Study Arrival Time"),
    StudyCompletionDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x0032, 0x1050), "DA", "Study Completion Date"),
    StudyCompletionTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x0032, 0x1051), "TM", "Study Completion Time"),
    StudyComponentStatusID: new TagDescriptor<"CS", string[]>(
        new Tag(0x0032, 0x1055), "CS", "Study Component Status ID"),
    RequestedProcedureDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0032, 0x1060), "LO", "Requested Procedure Description"),
    RequestedProcedureCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0032, 0x1064), "SQ", "Requested Procedure Code Sequence"),
    RequestedContrastAgent: new TagDescriptor<"LO", string[]>(
        new Tag(0x0032, 0x1070), "LO", "Requested Contrast Agent"),
    StudyComments: new TagDescriptor<"LT", string>(
        new Tag(0x0032, 0x4000), "LT", "Study Comments"),

    // Group 0x0038

    ReferencedPatientAliasSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0038, 0x0004), "SQ", "Referenced Patient Alias Sequence"),
    VisitStatusID: new TagDescriptor<"CS", string[]>(
        new Tag(0x0038, 0x0008), "CS", "Visit Status ID"),
    AdmissionID: new TagDescriptor<"LO", string[]>(
        new Tag(0x0038, 0x0010), "LO", "Admission ID"),
    IssuerOfAdmissionID: new TagDescriptor<"LO", string[]>(
        new Tag(0x0038, 0x0011), "LO", "Issuer of Admission ID"),
    IssuerOfAdmissionIDSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0038, 0x0014), "SQ", "Issuer of Admission ID Sequence"),
    RouteOfAdmissions: new TagDescriptor<"LO", string[]>(
        new Tag(0x0038, 0x0016), "LO", "Route of Admissions"),
    ScheduledAdmissionDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x0038, 0x001A), "DA", "Scheduled Admission Date"),
    ScheduledAdmissionTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x0038, 0x001B), "TM", "Scheduled Admission Time"),
    ScheduledDischargeDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x0038, 0x001C), "DA", "Scheduled Discharge Date"),
    ScheduledDischargeTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x0038, 0x001D), "TM", "Scheduled Discharge Time"),
    ScheduledPatientInstitutionResidence: new TagDescriptor<"LO", string[]>(
        new Tag(0x0038, 0x001E), "LO", "Scheduled Patient Institution Residence"),
    AdmittingDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x0038, 0x0020), "DA", "Admitting Date"),
    AdmittingTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x0038, 0x0021), "TM", "Admitting Time"),
    DischargeDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x0038, 0x0030), "DA", "Discharge Date"),
    DischargeTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x0038, 0x0032), "TM", "Discharge Time"),
    DischargeDiagnosisDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0038, 0x0040), "LO", "Discharge Diagnosis Description"),
    DischargeDiagnosisCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0038, 0x0044), "SQ", "Discharge Diagnosis Code Sequence"),
    SpecialNeeds: new TagDescriptor<"LO", string[]>(
        new Tag(0x0038, 0x0050), "LO", "Special Needs"),
    ServiceEpisodeID: new TagDescriptor<"LO", string[]>(
        new Tag(0x0038, 0x0060), "LO", "Service Episode ID"),
    IssuerOfServiceEpisodeID: new TagDescriptor<"LO", string[]>(
        new Tag(0x0038, 0x0061), "LO", "Issuer of Service Episode ID"),
    ServiceEpisodeDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0038, 0x0062), "LO", "Service Episode Description"),
    IssuerOfServiceEpisodeIDSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0038, 0x0064), "SQ", "Issuer of Service Episode ID Sequence"),
    PertinentDocumentsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0038, 0x0100), "SQ", "Pertinent Documents Sequence"),
    PertinentResourcesSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0038, 0x0101), "SQ", "Pertinent Resources Sequence"),
    ResourceDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0038, 0x0102), "LO", "Resource Description"),
    CurrentPatientLocation: new TagDescriptor<"LO", string[]>(
        new Tag(0x0038, 0x0300), "LO", "Current Patient Location"),
    PatientInstitutionResidence: new TagDescriptor<"LO", string[]>(
        new Tag(0x0038, 0x0400), "LO", "Patient's Institution Residence"),
    PatientState: new TagDescriptor<"LO", string[]>(
        new Tag(0x0038, 0x0500), "LO", "Patient State"),
    PatientClinicalTrialParticipationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0038, 0x0502), "SQ", "Patient Clinical Trial Participation Sequence"),
    VisitComments: new TagDescriptor<"LT", string>(
        new Tag(0x0038, 0x4000), "LT", "Visit Comments"),

    // Group 0x003A

    WaveformOriginality: new TagDescriptor<"CS", string[]>(
        new Tag(0x003A, 0x0004), "CS", "Waveform Originality"),
    NumberOfWaveformChannels: new TagDescriptor<"US", number[]>(
        new Tag(0x003A, 0x0005), "US", "Number of Waveform Channels"),
    NumberOfWaveformSamples: new TagDescriptor<"UL", number[]>(
        new Tag(0x003A, 0x0010), "UL", "Number of Waveform Samples"),
    SamplingFrequency: new TagDescriptor<"DS", number[]>(
        new Tag(0x003A, 0x001A), "DS", "Sampling Frequency"),
    MultiplexGroupLabel: new TagDescriptor<"SH", string[]>(
        new Tag(0x003A, 0x0020), "SH", "Multiplex Group Label"),
    ChannelDefinitionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x003A, 0x0200), "SQ", "Channel Definition Sequence"),
    WaveformChannelNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x003A, 0x0202), "IS", "Waveform Channel Number"),
    ChannelLabel: new TagDescriptor<"SH", string[]>(
        new Tag(0x003A, 0x0203), "SH", "Channel Label"),
    ChannelStatus: new TagDescriptor<"CS", string[]>(
        new Tag(0x003A, 0x0205), "CS", "Channel Status"),
    ChannelSourceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x003A, 0x0208), "SQ", "Channel Source Sequence"),
    ChannelSourceModifiersSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x003A, 0x0209), "SQ", "Channel Source Modifiers Sequence"),
    SourceWaveformSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x003A, 0x020A), "SQ", "Source Waveform Sequence"),
    ChannelDerivationDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x003A, 0x020C), "LO", "Channel Derivation Description"),
    ChannelSensitivity: new TagDescriptor<"DS", number[]>(
        new Tag(0x003A, 0x0210), "DS", "Channel Sensitivity"),
    ChannelSensitivityUnitsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x003A, 0x0211), "SQ", "Channel Sensitivity Units Sequence"),
    ChannelSensitivityCorrectionFactor: new TagDescriptor<"DS", number[]>(
        new Tag(0x003A, 0x0212), "DS", "Channel Sensitivity Correction Factor"),
    ChannelBaseline: new TagDescriptor<"DS", number[]>(
        new Tag(0x003A, 0x0213), "DS", "Channel Baseline"),
    ChannelTimeSkew: new TagDescriptor<"DS", number[]>(
        new Tag(0x003A, 0x0214), "DS", "Channel Time Skew"),
    ChannelSampleSkew: new TagDescriptor<"DS", number[]>(
        new Tag(0x003A, 0x0215), "DS", "Channel Sample Skew"),
    ChannelOffset: new TagDescriptor<"DS", number[]>(
        new Tag(0x003A, 0x0218), "DS", "Channel Offset"),
    WaveformBitsStored: new TagDescriptor<"US", number[]>(
        new Tag(0x003A, 0x021A), "US", "Waveform Bits Stored"),
    FilterLowFrequency: new TagDescriptor<"DS", number[]>(
        new Tag(0x003A, 0x0220), "DS", "Filter Low Frequency"),
    FilterHighFrequency: new TagDescriptor<"DS", number[]>(
        new Tag(0x003A, 0x0221), "DS", "Filter High Frequency"),
    NotchFilterFrequency: new TagDescriptor<"DS", number[]>(
        new Tag(0x003A, 0x0222), "DS", "Notch Filter Frequency"),
    NotchFilterBandwidth: new TagDescriptor<"DS", number[]>(
        new Tag(0x003A, 0x0223), "DS", "Notch Filter Bandwidth"),
    WaveformDataDisplayScale: new TagDescriptor<"FL", number[]>(
        new Tag(0x003A, 0x0230), "FL", "Waveform Data Display Scale"),
    WaveformDisplayBackgroundCIELabValue: new TagDescriptor<"US", number[]>(
        new Tag(0x003A, 0x0231), "US", "Waveform Display Background CIELab Value"),
    WaveformPresentationGroupSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x003A, 0x0240), "SQ", "Waveform Presentation Group Sequence"),
    PresentationGroupNumber: new TagDescriptor<"US", number[]>(
        new Tag(0x003A, 0x0241), "US", "Presentation Group Number"),
    ChannelDisplaySequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x003A, 0x0242), "SQ", "Channel Display Sequence"),
    ChannelRecommendedDisplayCIELabValue: new TagDescriptor<"US", number[]>(
        new Tag(0x003A, 0x0244), "US", "Channel Recommended Display CIELab Value"),
    ChannelPosition: new TagDescriptor<"FL", number[]>(
        new Tag(0x003A, 0x0245), "FL", "Channel Position"),
    DisplayShadingFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x003A, 0x0246), "CS", "Display Shading Flag"),
    FractionalChannelDisplayScale: new TagDescriptor<"FL", number[]>(
        new Tag(0x003A, 0x0247), "FL", "Fractional Channel Display Scale"),
    AbsoluteChannelDisplayScale: new TagDescriptor<"FL", number[]>(
        new Tag(0x003A, 0x0248), "FL", "Absolute Channel Display Scale"),
    MultiplexedAudioChannelsDescriptionCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x003A, 0x0300), "SQ", "Multiplexed Audio Channels Description Code Sequence"),
    ChannelIdentificationCode: new TagDescriptor<"IS", number[]>(
        new Tag(0x003A, 0x0301), "IS", "Channel Identification Code"),
    ChannelMode: new TagDescriptor<"CS", string[]>(
        new Tag(0x003A, 0x0302), "CS", "Channel Mode"),

    // Group 0x0040

    ScheduledStationAETitle: new TagDescriptor<"AE", string[]>(
        new Tag(0x0040, 0x0001), "AE", "Scheduled Station AE Title"),
    ScheduledProcedureStepStartDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x0040, 0x0002), "DA", "Scheduled Procedure Step Start Date"),
    ScheduledProcedureStepStartTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x0040, 0x0003), "TM", "Scheduled Procedure Step Start Time"),
    ScheduledProcedureStepEndDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x0040, 0x0004), "DA", "Scheduled Procedure Step End Date"),
    ScheduledProcedureStepEndTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x0040, 0x0005), "TM", "Scheduled Procedure Step End Time"),
    ScheduledPerformingPhysicianName: new TagDescriptor<"PN", string[]>(
        new Tag(0x0040, 0x0006), "PN", "Scheduled Performing Physician's Name"),
    ScheduledProcedureStepDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0040, 0x0007), "LO", "Scheduled Procedure Step Description"),
    ScheduledProtocolCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x0008), "SQ", "Scheduled Protocol Code Sequence"),
    ScheduledProcedureStepID: new TagDescriptor<"SH", string[]>(
        new Tag(0x0040, 0x0009), "SH", "Scheduled Procedure Step ID"),
    StageCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x000A), "SQ", "Stage Code Sequence"),
    ScheduledPerformingPhysicianIdentificationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x000B), "SQ", "Scheduled Performing Physician Identification Sequence"),
    ScheduledStationName: new TagDescriptor<"SH", string[]>(
        new Tag(0x0040, 0x0010), "SH", "Scheduled Station Name"),
    ScheduledProcedureStepLocation: new TagDescriptor<"SH", string[]>(
        new Tag(0x0040, 0x0011), "SH", "Scheduled Procedure Step Location"),
    PreMedication: new TagDescriptor<"LO", string[]>(
        new Tag(0x0040, 0x0012), "LO", "Pre-Medication"),
    ScheduledProcedureStepStatus: new TagDescriptor<"CS", string[]>(
        new Tag(0x0040, 0x0020), "CS", "Scheduled Procedure Step Status"),
    OrderPlacerIdentifierSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x0026), "SQ", "Order Placer Identifier Sequence"),
    OrderFillerIdentifierSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x0027), "SQ", "Order Filler Identifier Sequence"),
    LocalNamespaceEntityID: new TagDescriptor<"UT", string>(
        new Tag(0x0040, 0x0031), "UT", "Local Namespace Entity ID"),
    UniversalEntityID: new TagDescriptor<"UT", string>(
        new Tag(0x0040, 0x0032), "UT", "Universal Entity ID"),
    UniversalEntityIDType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0040, 0x0033), "CS", "Universal Entity ID Type"),
    IdentifierTypeCode: new TagDescriptor<"CS", string[]>(
        new Tag(0x0040, 0x0035), "CS", "Identifier Type Code"),
    AssigningFacilitySequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x0036), "SQ", "Assigning Facility Sequence"),
    AssigningJurisdictionCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x0039), "SQ", "Assigning Jurisdiction Code Sequence"),
    AssigningAgencyOrDepartmentCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x003A), "SQ", "Assigning Agency or Department Code Sequence"),
    ScheduledProcedureStepSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x0100), "SQ", "Scheduled Procedure Step Sequence"),
    ReferencedNonImageCompositeSOPInstanceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x0220), "SQ", "Referenced Non-Image Composite SOP Instance Sequence"),
    PerformedStationAETitle: new TagDescriptor<"AE", string[]>(
        new Tag(0x0040, 0x0241), "AE", "Performed Station AE Title"),
    PerformedStationName: new TagDescriptor<"SH", string[]>(
        new Tag(0x0040, 0x0242), "SH", "Performed Station Name"),
    PerformedLocation: new TagDescriptor<"SH", string[]>(
        new Tag(0x0040, 0x0243), "SH", "Performed Location"),
    PerformedProcedureStepStartDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x0040, 0x0244), "DA", "Performed Procedure Step Start Date"),
    PerformedProcedureStepStartTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x0040, 0x0245), "TM", "Performed Procedure Step Start Time"),
    PerformedProcedureStepEndDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x0040, 0x0250), "DA", "Performed Procedure Step End Date"),
    PerformedProcedureStepEndTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x0040, 0x0251), "TM", "Performed Procedure Step End Time"),
    PerformedProcedureStepStatus: new TagDescriptor<"CS", string[]>(
        new Tag(0x0040, 0x0252), "CS", "Performed Procedure Step Status"),
    PerformedProcedureStepID: new TagDescriptor<"SH", string[]>(
        new Tag(0x0040, 0x0253), "SH", "Performed Procedure Step ID"),
    PerformedProcedureStepDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0040, 0x0254), "LO", "Performed Procedure Step Description"),
    PerformedProcedureTypeDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0040, 0x0255), "LO", "Performed Procedure Type Description"),
    PerformedProtocolCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x0260), "SQ", "Performed Protocol Code Sequence"),
    PerformedProtocolType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0040, 0x0261), "CS", "Performed Protocol Type"),
    ScheduledStepAttributesSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x0270), "SQ", "Scheduled Step Attributes Sequence"),
    RequestAttributesSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x0275), "SQ", "Request Attributes Sequence"),
    CommentsOnThePerformedProcedureStep: new TagDescriptor<"ST", string>(
        new Tag(0x0040, 0x0280), "ST", "Comments on the Performed Procedure Step"),
    PerformedProcedureStepDiscontinuationReasonCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x0281), "SQ", "Performed Procedure Step Discontinuation Reason Code Sequence"),
    QuantitySequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x0293), "SQ", "Quantity Sequence"),
    Quantity: new TagDescriptor<"DS", number[]>(
        new Tag(0x0040, 0x0294), "DS", "Quantity"),
    MeasuringUnitsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x0295), "SQ", "Measuring Units Sequence"),
    BillingItemSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x0296), "SQ", "Billing Item Sequence"),
    TotalTimeOfFluoroscopy: new TagDescriptor<"US", number[]>(
        new Tag(0x0040, 0x0300), "US", "Total Time of Fluoroscopy"),
    TotalNumberOfExposures: new TagDescriptor<"US", number[]>(
        new Tag(0x0040, 0x0301), "US", "Total Number of Exposures"),
    EntranceDose: new TagDescriptor<"US", number[]>(
        new Tag(0x0040, 0x0302), "US", "Entrance Dose"),
    ExposedArea: new TagDescriptor<"US", number[]>(
        new Tag(0x0040, 0x0303), "US", "Exposed Area"),
    DistanceSourceToEntrance: new TagDescriptor<"DS", number[]>(
        new Tag(0x0040, 0x0306), "DS", "Distance Source to Entrance"),
    DistanceSourceToSupport: new TagDescriptor<"DS", number[]>(
        new Tag(0x0040, 0x0307), "DS", "Distance Source to Support"),
    ExposureDoseSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x030E), "SQ", "Exposure Dose Sequence"),
    CommentsOnRadiationDose: new TagDescriptor<"ST", string>(
        new Tag(0x0040, 0x0310), "ST", "Comments on Radiation Dose"),
    XRayOutput: new TagDescriptor<"DS", number[]>(
        new Tag(0x0040, 0x0312), "DS", "X-Ray Output"),
    HalfValueLayer: new TagDescriptor<"DS", number[]>(
        new Tag(0x0040, 0x0314), "DS", "Half Value Layer"),
    OrganDose: new TagDescriptor<"DS", number[]>(
        new Tag(0x0040, 0x0316), "DS", "Organ Dose"),
    OrganExposed: new TagDescriptor<"CS", string[]>(
        new Tag(0x0040, 0x0318), "CS", "Organ Exposed"),
    BillingProcedureStepSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x0320), "SQ", "Billing Procedure Step Sequence"),
    FilmConsumptionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x0321), "SQ", "Film Consumption Sequence"),
    BillingSuppliesAndDevicesSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x0324), "SQ", "Billing Supplies and Devices Sequence"),
    ReferencedProcedureStepSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x0330), "SQ", "Referenced Procedure Step Sequence"),
    PerformedSeriesSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x0340), "SQ", "Performed Series Sequence"),
    CommentsOnTheScheduledProcedureStep: new TagDescriptor<"LT", string>(
        new Tag(0x0040, 0x0400), "LT", "Comments on the Scheduled Procedure Step"),
    ProtocolContextSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x0440), "SQ", "Protocol Context Sequence"),
    ContentItemModifierSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x0441), "SQ", "Content Item Modifier Sequence"),
    ScheduledSpecimenSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x0500), "SQ", "Scheduled Specimen Sequence"),
    SpecimenAccessionNumber: new TagDescriptor<"LO", string[]>(
        new Tag(0x0040, 0x050A), "LO", "Specimen Accession Number"),
    ContainerIdentifier: new TagDescriptor<"LO", string[]>(
        new Tag(0x0040, 0x0512), "LO", "Container Identifier"),
    IssuerOfTheContainerIdentifierSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x0513), "SQ", "Issuer of the Container Identifier Sequence"),
    AlternateContainerIdentifierSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x0515), "SQ", "Alternate Container Identifier Sequence"),
    ContainerTypeCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x0518), "SQ", "Container Type Code Sequence"),
    ContainerDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0040, 0x051A), "LO", "Container Description"),
    ContainerComponentSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x0520), "SQ", "Container Component Sequence"),
    SpecimenSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x0550), "SQ", "Specimen Sequence"),
    SpecimenIdentifier: new TagDescriptor<"LO", string[]>(
        new Tag(0x0040, 0x0551), "LO", "Specimen Identifier"),
    SpecimenDescriptionSequenceTrial: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x0552), "SQ", "Specimen Description Sequence (Trial)"),
    SpecimenDescriptionTrial: new TagDescriptor<"ST", string>(
        new Tag(0x0040, 0x0553), "ST", "Specimen Description (Trial)"),
    SpecimenUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0040, 0x0554), "UI", "Specimen UID"),
    AcquisitionContextSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x0555), "SQ", "Acquisition Context Sequence"),
    AcquisitionContextDescription: new TagDescriptor<"ST", string>(
        new Tag(0x0040, 0x0556), "ST", "Acquisition Context Description"),
    SpecimenTypeCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x059A), "SQ", "Specimen Type Code Sequence"),
    SpecimenDescriptionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x0560), "SQ", "Specimen Description Sequence"),
    IssuerOfTheSpecimenIdentifierSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x0562), "SQ", "Issuer of the Specimen Identifier Sequence"),
    SpecimenShortDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0040, 0x0600), "LO", "Specimen Short Description"),
    SpecimenDetailedDescription: new TagDescriptor<"UT", string>(
        new Tag(0x0040, 0x0602), "UT", "Specimen Detailed Description"),
    SpecimenPreparationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x0610), "SQ", "Specimen Preparation Sequence"),
    SpecimenPreparationStepContentItemSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x0612), "SQ", "Specimen Preparation Step Content Item Sequence"),
    SpecimenLocalizationContentItemSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x0620), "SQ", "Specimen Localization Content Item Sequence"),
    SlideIdentifier: new TagDescriptor<"LO", string[]>(
        new Tag(0x0040, 0x06FA), "LO", "Slide Identifier"),
    WholeSlideMicroscopyImageFrameTypeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x0710), "SQ", "Whole Slide Microscopy Image Frame Type Sequence"),
    ImageCenterPointCoordinatesSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x071A), "SQ", "Image Center Point Coordinates Sequence"),
    XOffsetInSlideCoordinateSystem: new TagDescriptor<"DS", number[]>(
        new Tag(0x0040, 0x072A), "DS", "X Offset in Slide Coordinate System"),
    YOffsetInSlideCoordinateSystem: new TagDescriptor<"DS", number[]>(
        new Tag(0x0040, 0x073A), "DS", "Y Offset in Slide Coordinate System"),
    ZOffsetInSlideCoordinateSystem: new TagDescriptor<"DS", number[]>(
        new Tag(0x0040, 0x074A), "DS", "Z Offset in Slide Coordinate System"),
    PixelSpacingSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x08D8), "SQ", "Pixel Spacing Sequence"),
    CoordinateSystemAxisCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x08DA), "SQ", "Coordinate System Axis Code Sequence"),
    MeasurementUnitsCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x08EA), "SQ", "Measurement Units Code Sequence"),
    VitalStainCodeSequenceTrial: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x09F8), "SQ", "Vital Stain Code Sequence (Trial)"),
    RequestedProcedureID: new TagDescriptor<"SH", string[]>(
        new Tag(0x0040, 0x1001), "SH", "Requested Procedure ID"),
    ReasonForTheRequestedProcedure: new TagDescriptor<"LO", string[]>(
        new Tag(0x0040, 0x1002), "LO", "Reason for the Requested Procedure"),
    RequestedProcedurePriority: new TagDescriptor<"SH", string[]>(
        new Tag(0x0040, 0x1003), "SH", "Requested Procedure Priority"),
    PatientTransportArrangements: new TagDescriptor<"LO", string[]>(
        new Tag(0x0040, 0x1004), "LO", "Patient Transport Arrangements"),
    RequestedProcedureLocation: new TagDescriptor<"LO", string[]>(
        new Tag(0x0040, 0x1005), "LO", "Requested Procedure Location"),
    PlacerOrderNumberProcedure: new TagDescriptor<"SH", string[]>(
        new Tag(0x0040, 0x1006), "SH", "Placer Order Number / Procedure"),
    FillerOrderNumberProcedure: new TagDescriptor<"SH", string[]>(
        new Tag(0x0040, 0x1007), "SH", "Filler Order Number / Procedure"),
    ConfidentialityCode: new TagDescriptor<"LO", string[]>(
        new Tag(0x0040, 0x1008), "LO", "Confidentiality Code"),
    ReportingPriority: new TagDescriptor<"SH", string[]>(
        new Tag(0x0040, 0x1009), "SH", "Reporting Priority"),
    ReasonForRequestedProcedureCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x100A), "SQ", "Reason for Requested Procedure Code Sequence"),
    NamesOfIntendedRecipientsOfResults: new TagDescriptor<"PN", string[]>(
        new Tag(0x0040, 0x1010), "PN", "Names of Intended Recipients of Results"),
    IntendedRecipientsOfResultsIdentificationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x1011), "SQ", "Intended Recipients of Results Identification Sequence"),
    ReasonForPerformedProcedureCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x1012), "SQ", "Reason For Performed Procedure Code Sequence"),
    RequestedProcedureDescriptionTrial: new TagDescriptor<"LO", string[]>(
        new Tag(0x0040, 0x1060), "LO", "Requested Procedure Description (Trial)"),
    PersonIdentificationCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x1101), "SQ", "Person Identification Code Sequence"),
    PersonAddress: new TagDescriptor<"ST", string>(
        new Tag(0x0040, 0x1102), "ST", "Person's Address"),
    PersonTelephoneNumbers: new TagDescriptor<"LO", string[]>(
        new Tag(0x0040, 0x1103), "LO", "Person's Telephone Numbers"),
    PersonTelecomInformation: new TagDescriptor<"LT", string>(
        new Tag(0x0040, 0x1104), "LT", "Person's Telecom Information"),
    RequestedProcedureComments: new TagDescriptor<"LT", string>(
        new Tag(0x0040, 0x1400), "LT", "Requested Procedure Comments"),
    ReasonForTheImagingServiceRequest: new TagDescriptor<"LO", string[]>(
        new Tag(0x0040, 0x2001), "LO", "Reason for the Imaging Service Request"),
    IssueDateOfImagingServiceRequest: new TagDescriptor<"DA", string[]>(
        new Tag(0x0040, 0x2004), "DA", "Issue Date of Imaging Service Request"),
    IssueTimeOfImagingServiceRequest: new TagDescriptor<"TM", string[]>(
        new Tag(0x0040, 0x2005), "TM", "Issue Time of Imaging Service Request"),
    PlacerOrderNumberImagingServiceRequestRetired: new TagDescriptor<"SH", string[]>(
        new Tag(0x0040, 0x2006), "SH", "Placer Order Number / Imaging Service Request (Retired)"),
    FillerOrderNumberImagingServiceRequestRetired: new TagDescriptor<"SH", string[]>(
        new Tag(0x0040, 0x2007), "SH", "Filler Order Number / Imaging Service Request (Retired)"),
    OrderEnteredBy: new TagDescriptor<"PN", string[]>(
        new Tag(0x0040, 0x2008), "PN", "Order Entered By"),
    OrderEntererLocation: new TagDescriptor<"SH", string[]>(
        new Tag(0x0040, 0x2009), "SH", "Order Enterer's Location"),
    OrderCallbackPhoneNumber: new TagDescriptor<"SH", string[]>(
        new Tag(0x0040, 0x2010), "SH", "Order Callback Phone Number"),
    OrderCallbackTelecomInformation: new TagDescriptor<"LT", string>(
        new Tag(0x0040, 0x2011), "LT", "Order Callback Telecom Information"),
    PlacerOrderNumberImagingServiceRequest: new TagDescriptor<"LO", string[]>(
        new Tag(0x0040, 0x2016), "LO", "Placer Order Number / Imaging Service Request"),
    FillerOrderNumberImagingServiceRequest: new TagDescriptor<"LO", string[]>(
        new Tag(0x0040, 0x2017), "LO", "Filler Order Number / Imaging Service Request"),
    ImagingServiceRequestComments: new TagDescriptor<"LT", string>(
        new Tag(0x0040, 0x2400), "LT", "Imaging Service Request Comments"),
    ConfidentialityConstraintOnPatientDataDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0040, 0x3001), "LO", "Confidentiality Constraint on Patient Data Description"),
    GeneralPurposeScheduledProcedureStepStatus: new TagDescriptor<"CS", string[]>(
        new Tag(0x0040, 0x4001), "CS", "General Purpose Scheduled Procedure Step Status"),
    GeneralPurposePerformedProcedureStepStatus: new TagDescriptor<"CS", string[]>(
        new Tag(0x0040, 0x4002), "CS", "General Purpose Performed Procedure Step Status"),
    GeneralPurposeScheduledProcedureStepPriority: new TagDescriptor<"CS", string[]>(
        new Tag(0x0040, 0x4003), "CS", "General Purpose Scheduled Procedure Step Priority"),
    ScheduledProcessingApplicationsCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x4004), "SQ", "Scheduled Processing Applications Code Sequence"),
    ScheduledProcedureStepStartDateTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x0040, 0x4005), "DT", "Scheduled Procedure Step Start DateTime"),
    MultipleCopiesFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0040, 0x4006), "CS", "Multiple Copies Flag"),
    PerformedProcessingApplicationsCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x4007), "SQ", "Performed Processing Applications Code Sequence"),
    ScheduledProcedureStepExpirationDateTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x0040, 0x4008), "DT", "Scheduled Procedure Step Expiration DateTime"),
    HumanPerformerCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x4009), "SQ", "Human Performer Code Sequence"),
    ScheduledProcedureStepModificationDateTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x0040, 0x4010), "DT", "Scheduled Procedure Step Modification DateTime"),
    ExpectedCompletionDateTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x0040, 0x4011), "DT", "Expected Completion DateTime"),
    ResultingGeneralPurposePerformedProcedureStepsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x4015), "SQ", "Resulting General Purpose Performed Procedure Steps Sequence"),
    ReferencedGeneralPurposeScheduledProcedureStepSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x4016), "SQ", "Referenced General Purpose Scheduled Procedure Step Sequence"),
    ScheduledWorkitemCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x4018), "SQ", "Scheduled Workitem Code Sequence"),
    PerformedWorkitemCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x4019), "SQ", "Performed Workitem Code Sequence"),
    InputAvailabilityFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0040, 0x4020), "CS", "Input Availability Flag"),
    InputInformationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x4021), "SQ", "Input Information Sequence"),
    RelevantInformationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x4022), "SQ", "Relevant Information Sequence"),
    ReferencedGeneralPurposeScheduledProcedureStepTransactionUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0040, 0x4023), "UI", "Referenced General Purpose Scheduled Procedure Step Transaction UID"),
    ScheduledStationNameCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x4025), "SQ", "Scheduled Station Name Code Sequence"),
    ScheduledStationClassCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x4026), "SQ", "Scheduled Station Class Code Sequence"),
    ScheduledStationGeographicLocationCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x4027), "SQ", "Scheduled Station Geographic Location Code Sequence"),
    PerformedStationNameCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x4028), "SQ", "Performed Station Name Code Sequence"),
    PerformedStationClassCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x4029), "SQ", "Performed Station Class Code Sequence"),
    PerformedStationGeographicLocationCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x4030), "SQ", "Performed Station Geographic Location Code Sequence"),
    RequestedSubsequentWorkitemCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x4031), "SQ", "Requested Subsequent Workitem Code Sequence"),
    NonDICOMOutputCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x4032), "SQ", "Non-DICOM Output Code Sequence"),
    OutputInformationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x4033), "SQ", "Output Information Sequence"),
    ScheduledHumanPerformersSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x4034), "SQ", "Scheduled Human Performers Sequence"),
    ActualHumanPerformersSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x4035), "SQ", "Actual Human Performers Sequence"),
    HumanPerformerOrganization: new TagDescriptor<"LO", string[]>(
        new Tag(0x0040, 0x4036), "LO", "Human Performer's Organization"),
    HumanPerformerName: new TagDescriptor<"PN", string[]>(
        new Tag(0x0040, 0x4037), "PN", "Human Performer's Name"),
    RawDataHandling: new TagDescriptor<"CS", string[]>(
        new Tag(0x0040, 0x4040), "CS", "Raw Data Handling"),
    InputReadinessState: new TagDescriptor<"CS", string[]>(
        new Tag(0x0040, 0x4041), "CS", "Input Readiness State"),
    PerformedProcedureStepStartDateTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x0040, 0x4050), "DT", "Performed Procedure Step Start DateTime"),
    PerformedProcedureStepEndDateTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x0040, 0x4051), "DT", "Performed Procedure Step End DateTime"),
    ProcedureStepCancellationDateTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x0040, 0x4052), "DT", "Procedure Step Cancellation DateTime"),
    OutputDestinationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x4070), "SQ", "Output Destination Sequence"),
    DICOMStorageSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x4071), "SQ", "DICOM Storage Sequence"),
    STOWRSStorageSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x4072), "SQ", "STOW-RS Storage Sequence"),
    StorageURL: new TagDescriptor<"UR", string>(
        new Tag(0x0040, 0x4073), "UR", "Storage URL"),
    XDSStorageSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x4074), "SQ", "XDS Storage Sequence"),
    EntranceDoseInmGy: new TagDescriptor<"DS", number[]>(
        new Tag(0x0040, 0x8302), "DS", "Entrance Dose in mGy"),
    EntranceDoseDerivation: new TagDescriptor<"CS", string[]>(
        new Tag(0x0040, 0x8303), "CS", "Entrance Dose Derivation"),
    ParametricMapFrameTypeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x9092), "SQ", "Parametric Map Frame Type Sequence"),
    ReferencedImageRealWorldValueMappingSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x9094), "SQ", "Referenced Image Real World Value Mapping Sequence"),
    RealWorldValueMappingSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x9096), "SQ", "Real World Value Mapping Sequence"),
    PixelValueMappingCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x9098), "SQ", "Pixel Value Mapping Code Sequence"),
    LUTLabel: new TagDescriptor<"SH", string[]>(
        new Tag(0x0040, 0x9210), "SH", "LUT Label"),
    RealWorldValueLUTData: new TagDescriptor<"FD", number[]>(
        new Tag(0x0040, 0x9212), "FD", "Real World Value LUT Data"),
    DoubleFloatRealWorldValueLastValueMapped: new TagDescriptor<"FD", number[]>(
        new Tag(0x0040, 0x9213), "FD", "Double Float Real World Value Last Value Mapped"),
    DoubleFloatRealWorldValueFirstValueMapped: new TagDescriptor<"FD", number[]>(
        new Tag(0x0040, 0x9214), "FD", "Double Float Real World Value First Value Mapped"),
    QuantityDefinitionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0x9220), "SQ", "Quantity Definition Sequence"),
    RealWorldValueIntercept: new TagDescriptor<"FD", number[]>(
        new Tag(0x0040, 0x9224), "FD", "Real World Value Intercept"),
    RealWorldValueSlope: new TagDescriptor<"FD", number[]>(
        new Tag(0x0040, 0x9225), "FD", "Real World Value Slope"),
    FindingsFlagTrial: new TagDescriptor<"CS", string[]>(
        new Tag(0x0040, 0xA007), "CS", "Findings Flag (Trial)"),
    RelationshipType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0040, 0xA010), "CS", "Relationship Type"),
    FindingsSequenceTrial: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xA020), "SQ", "Findings Sequence (Trial)"),
    FindingsGroupUIDTrial: new TagDescriptor<"UI", string[]>(
        new Tag(0x0040, 0xA021), "UI", "Findings Group UID (Trial)"),
    ReferencedFindingsGroupUIDTrial: new TagDescriptor<"UI", string[]>(
        new Tag(0x0040, 0xA022), "UI", "Referenced Findings Group UID (Trial)"),
    FindingsGroupRecordingDateTrial: new TagDescriptor<"DA", string[]>(
        new Tag(0x0040, 0xA023), "DA", "Findings Group Recording Date (Trial)"),
    FindingsGroupRecordingTimeTrial: new TagDescriptor<"TM", string[]>(
        new Tag(0x0040, 0xA024), "TM", "Findings Group Recording Time (Trial)"),
    FindingsSourceCategoryCodeSequenceTrial: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xA026), "SQ", "Findings Source Category Code Sequence (Trial)"),
    VerifyingOrganization: new TagDescriptor<"LO", string[]>(
        new Tag(0x0040, 0xA027), "LO", "Verifying Organization"),
    DocumentingOrganizationIdentifierCodeSequenceTrial: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xA028), "SQ", "Documenting Organization Identifier Code Sequence (Trial)"),
    VerificationDateTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x0040, 0xA030), "DT", "Verification DateTime"),
    ObservationDateTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x0040, 0xA032), "DT", "Observation DateTime"),
    ValueType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0040, 0xA040), "CS", "Value Type"),
    ConceptNameCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xA043), "SQ", "Concept Name Code Sequence"),
    MeasurementPrecisionDescriptionTrial: new TagDescriptor<"LO", string[]>(
        new Tag(0x0040, 0xA047), "LO", "Measurement Precision Description (Trial)"),
    ContinuityOfContent: new TagDescriptor<"CS", string[]>(
        new Tag(0x0040, 0xA050), "CS", "Continuity Of Content"),
    UrgencyOrPriorityAlertsTrial: new TagDescriptor<"CS", string[]>(
        new Tag(0x0040, 0xA057), "CS", "Urgency or Priority Alerts (Trial)"),
    SequencingIndicatorTrial: new TagDescriptor<"LO", string[]>(
        new Tag(0x0040, 0xA060), "LO", "Sequencing Indicator (Trial)"),
    DocumentIdentifierCodeSequenceTrial: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xA066), "SQ", "Document Identifier Code Sequence (Trial)"),
    DocumentAuthorTrial: new TagDescriptor<"PN", string[]>(
        new Tag(0x0040, 0xA067), "PN", "Document Author (Trial)"),
    DocumentAuthorIdentifierCodeSequenceTrial: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xA068), "SQ", "Document Author Identifier Code Sequence (Trial)"),
    IdentifierCodeSequenceTrial: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xA070), "SQ", "Identifier Code Sequence (Trial)"),
    VerifyingObserverSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xA073), "SQ", "Verifying Observer Sequence"),
    ObjectBinaryIdentifierTrial: new TagDescriptor<"OB", Uint8Array | LazyValue<Uint8Array>>(
        new Tag(0x0040, 0xA074), "OB", "Object Binary Identifier (Trial)"),
    VerifyingObserverName: new TagDescriptor<"PN", string[]>(
        new Tag(0x0040, 0xA075), "PN", "Verifying Observer Name"),
    DocumentingObserverIdentifierCodeSequenceTrial: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xA076), "SQ", "Documenting Observer Identifier Code Sequence (Trial)"),
    AuthorObserverSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xA078), "SQ", "Author Observer Sequence"),
    ParticipantSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xA07A), "SQ", "Participant Sequence"),
    CustodialOrganizationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xA07C), "SQ", "Custodial Organization Sequence"),
    ParticipationType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0040, 0xA080), "CS", "Participation Type"),
    ParticipationDateTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x0040, 0xA082), "DT", "Participation DateTime"),
    ObserverType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0040, 0xA084), "CS", "Observer Type"),
    ProcedureIdentifierCodeSequenceTrial: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xA085), "SQ", "Procedure Identifier Code Sequence (Trial)"),
    VerifyingObserverIdentificationCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xA088), "SQ", "Verifying Observer Identification Code Sequence"),
    ObjectDirectoryBinaryIdentifierTrial: new TagDescriptor<"OB", Uint8Array | LazyValue<Uint8Array>>(
        new Tag(0x0040, 0xA089), "OB", "Object Directory Binary Identifier (Trial)"),
    EquivalentCDADocumentSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xA090), "SQ", "Equivalent CDA Document Sequence"),
    ReferencedWaveformChannels: new TagDescriptor<"US", number[]>(
        new Tag(0x0040, 0xA0B0), "US", "Referenced Waveform Channels"),
    DateOfDocumentOrVerbalTransactionTrial: new TagDescriptor<"DA", string[]>(
        new Tag(0x0040, 0xA110), "DA", "Date of Document or Verbal Transaction (Trial)"),
    TimeOfDocumentCreationOrVerbalTransactionTrial: new TagDescriptor<"TM", string[]>(
        new Tag(0x0040, 0xA112), "TM", "Time of Document Creation or Verbal Transaction (Trial)"),
    DateTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x0040, 0xA120), "DT", "DateTime"),
    Date: new TagDescriptor<"DA", string[]>(
        new Tag(0x0040, 0xA121), "DA", "Date"),
    Time: new TagDescriptor<"TM", string[]>(
        new Tag(0x0040, 0xA122), "TM", "Time"),
    PersonName: new TagDescriptor<"PN", string[]>(
        new Tag(0x0040, 0xA123), "PN", "Person Name"),
    UID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0040, 0xA124), "UI", "UID"),
    ReportStatusIDTrial: new TagDescriptor<"CS", string[]>(
        new Tag(0x0040, 0xA125), "CS", "Report Status ID (Trial)"),
    TemporalRangeType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0040, 0xA130), "CS", "Temporal Range Type"),
    ReferencedSamplePositions: new TagDescriptor<"UL", number[]>(
        new Tag(0x0040, 0xA132), "UL", "Referenced Sample Positions"),
    ReferencedFrameNumbers: new TagDescriptor<"US", number[]>(
        new Tag(0x0040, 0xA136), "US", "Referenced Frame Numbers"),
    ReferencedTimeOffsets: new TagDescriptor<"DS", number[]>(
        new Tag(0x0040, 0xA138), "DS", "Referenced Time Offsets"),
    ReferencedDateTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x0040, 0xA13A), "DT", "Referenced DateTime"),
    TextValue: new TagDescriptor<"UT", string>(
        new Tag(0x0040, 0xA160), "UT", "Text Value"),
    FloatingPointValue: new TagDescriptor<"FD", number[]>(
        new Tag(0x0040, 0xA161), "FD", "Floating Point Value"),
    RationalNumeratorValue: new TagDescriptor<"SL", number[]>(
        new Tag(0x0040, 0xA162), "SL", "Rational Numerator Value"),
    RationalDenominatorValue: new TagDescriptor<"UL", number[]>(
        new Tag(0x0040, 0xA163), "UL", "Rational Denominator Value"),
    ObservationCategoryCodeSequenceTrial: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xA167), "SQ", "Observation Category Code Sequence (Trial)"),
    ConceptCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xA168), "SQ", "Concept Code Sequence"),
    BibliographicCitationTrial: new TagDescriptor<"ST", string>(
        new Tag(0x0040, 0xA16A), "ST", "Bibliographic Citation (Trial)"),
    PurposeOfReferenceCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xA170), "SQ", "Purpose of Reference Code Sequence"),
    ObservationUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0040, 0xA171), "UI", "Observation UID"),
    ReferencedObservationUIDTrial: new TagDescriptor<"UI", string[]>(
        new Tag(0x0040, 0xA172), "UI", "Referenced Observation UID (Trial)"),
    ReferencedObservationClassTrial: new TagDescriptor<"CS", string[]>(
        new Tag(0x0040, 0xA173), "CS", "Referenced Observation Class (Trial)"),
    ReferencedObjectObservationClassTrial: new TagDescriptor<"CS", string[]>(
        new Tag(0x0040, 0xA174), "CS", "Referenced Object Observation Class (Trial)"),
    AnnotationGroupNumber: new TagDescriptor<"US", number[]>(
        new Tag(0x0040, 0xA180), "US", "Annotation Group Number"),
    ObservationDateTrial: new TagDescriptor<"DA", string[]>(
        new Tag(0x0040, 0xA192), "DA", "Observation Date (Trial)"),
    ObservationTimeTrial: new TagDescriptor<"TM", string[]>(
        new Tag(0x0040, 0xA193), "TM", "Observation Time (Trial)"),
    MeasurementAutomationTrial: new TagDescriptor<"CS", string[]>(
        new Tag(0x0040, 0xA194), "CS", "Measurement Automation (Trial)"),
    ModifierCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xA195), "SQ", "Modifier Code Sequence"),
    IdentificationDescriptionTrial: new TagDescriptor<"ST", string>(
        new Tag(0x0040, 0xA224), "ST", "Identification Description (Trial)"),
    CoordinatesSetGeometricTypeTrial: new TagDescriptor<"CS", string[]>(
        new Tag(0x0040, 0xA290), "CS", "Coordinates Set Geometric Type (Trial)"),
    AlgorithmCodeSequenceTrial: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xA296), "SQ", "Algorithm Code Sequence (Trial)"),
    AlgorithmDescriptionTrial: new TagDescriptor<"ST", string>(
        new Tag(0x0040, 0xA297), "ST", "Algorithm Description (Trial)"),
    PixelCoordinatesSetTrial: new TagDescriptor<"SL", number[]>(
        new Tag(0x0040, 0xA29A), "SL", "Pixel Coordinates Set (Trial)"),
    MeasuredValueSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xA300), "SQ", "Measured Value Sequence"),
    NumericValueQualifierCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xA301), "SQ", "Numeric Value Qualifier Code Sequence"),
    CurrentObserverTrial: new TagDescriptor<"PN", string[]>(
        new Tag(0x0040, 0xA307), "PN", "Current Observer (Trial)"),
    NumericValue: new TagDescriptor<"DS", number[]>(
        new Tag(0x0040, 0xA30A), "DS", "Numeric Value"),
    ReferencedAccessionSequenceTrial: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xA313), "SQ", "Referenced Accession Sequence (Trial)"),
    ReportStatusCommentTrial: new TagDescriptor<"ST", string>(
        new Tag(0x0040, 0xA33A), "ST", "Report Status Comment (Trial)"),
    ProcedureContextSequenceTrial: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xA340), "SQ", "Procedure Context Sequence (Trial)"),
    VerbalSourceTrial: new TagDescriptor<"PN", string[]>(
        new Tag(0x0040, 0xA352), "PN", "Verbal Source (Trial)"),
    AddressTrial: new TagDescriptor<"ST", string>(
        new Tag(0x0040, 0xA353), "ST", "Address (Trial)"),
    TelephoneNumberTrial: new TagDescriptor<"LO", string[]>(
        new Tag(0x0040, 0xA354), "LO", "Telephone Number (Trial)"),
    VerbalSourceIdentifierCodeSequenceTrial: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xA358), "SQ", "Verbal Source Identifier Code Sequence (Trial)"),
    PredecessorDocumentsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xA360), "SQ", "Predecessor Documents Sequence"),
    ReferencedRequestSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xA370), "SQ", "Referenced Request Sequence"),
    PerformedProcedureCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xA372), "SQ", "Performed Procedure Code Sequence"),
    CurrentRequestedProcedureEvidenceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xA375), "SQ", "Current Requested Procedure Evidence Sequence"),
    ReportDetailSequenceTrial: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xA380), "SQ", "Report Detail Sequence (Trial)"),
    PertinentOtherEvidenceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xA385), "SQ", "Pertinent Other Evidence Sequence"),
    HL7StructuredDocumentReferenceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xA390), "SQ", "HL7 Structured Document Reference Sequence"),
    ObservationSubjectUIDTrial: new TagDescriptor<"UI", string[]>(
        new Tag(0x0040, 0xA402), "UI", "Observation Subject UID (Trial)"),
    ObservationSubjectClassTrial: new TagDescriptor<"CS", string[]>(
        new Tag(0x0040, 0xA403), "CS", "Observation Subject Class (Trial)"),
    ObservationSubjectTypeCodeSequenceTrial: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xA404), "SQ", "Observation Subject Type Code Sequence (Trial)"),
    CompletionFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0040, 0xA491), "CS", "Completion Flag"),
    CompletionFlagDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0040, 0xA492), "LO", "Completion Flag Description"),
    VerificationFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0040, 0xA493), "CS", "Verification Flag"),
    ArchiveRequested: new TagDescriptor<"CS", string[]>(
        new Tag(0x0040, 0xA494), "CS", "Archive Requested"),
    PreliminaryFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0040, 0xA496), "CS", "Preliminary Flag"),
    ContentTemplateSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xA504), "SQ", "Content Template Sequence"),
    IdenticalDocumentsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xA525), "SQ", "Identical Documents Sequence"),
    ObservationSubjectContextFlagTrial: new TagDescriptor<"CS", string[]>(
        new Tag(0x0040, 0xA600), "CS", "Observation Subject Context Flag (Trial)"),
    ObserverContextFlagTrial: new TagDescriptor<"CS", string[]>(
        new Tag(0x0040, 0xA601), "CS", "Observer Context Flag (Trial)"),
    ProcedureContextFlagTrial: new TagDescriptor<"CS", string[]>(
        new Tag(0x0040, 0xA603), "CS", "Procedure Context Flag (Trial)"),
    ContentSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xA730), "SQ", "Content Sequence"),
    RelationshipSequenceTrial: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xA731), "SQ", "Relationship Sequence (Trial)"),
    RelationshipTypeCodeSequenceTrial: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xA732), "SQ", "Relationship Type Code Sequence (Trial)"),
    LanguageCodeSequenceTrial: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xA744), "SQ", "Language Code Sequence (Trial)"),
    UniformResourceLocatorTrial: new TagDescriptor<"ST", string>(
        new Tag(0x0040, 0xA992), "ST", "Uniform Resource Locator (Trial)"),
    WaveformAnnotationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xB020), "SQ", "Waveform Annotation Sequence"),
    TemplateIdentifier: new TagDescriptor<"CS", string[]>(
        new Tag(0x0040, 0xDB00), "CS", "Template Identifier"),
    TemplateVersion: new TagDescriptor<"DT", string[]>(
        new Tag(0x0040, 0xDB06), "DT", "Template Version"),
    TemplateLocalVersion: new TagDescriptor<"DT", string[]>(
        new Tag(0x0040, 0xDB07), "DT", "Template Local Version"),
    TemplateExtensionFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0040, 0xDB0B), "CS", "Template Extension Flag"),
    TemplateExtensionOrganizationUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0040, 0xDB0C), "UI", "Template Extension Organization UID"),
    TemplateExtensionCreatorUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0040, 0xDB0D), "UI", "Template Extension Creator UID"),
    ReferencedContentItemIdentifier: new TagDescriptor<"UL", number[]>(
        new Tag(0x0040, 0xDB73), "UL", "Referenced Content Item Identifier"),
    HL7InstanceIdentifier: new TagDescriptor<"ST", string>(
        new Tag(0x0040, 0xE001), "ST", "HL7 Instance Identifier"),
    HL7DocumentEffectiveTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x0040, 0xE004), "DT", "HL7 Document Effective Time"),
    HL7DocumentTypeCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xE006), "SQ", "HL7 Document Type Code Sequence"),
    DocumentClassCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xE008), "SQ", "Document Class Code Sequence"),
    RetrieveURI: new TagDescriptor<"UR", string>(
        new Tag(0x0040, 0xE010), "UR", "Retrieve URI"),
    RetrieveLocationUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0040, 0xE011), "UI", "Retrieve Location UID"),
    TypeOfInstances: new TagDescriptor<"CS", string[]>(
        new Tag(0x0040, 0xE020), "CS", "Type of Instances"),
    DICOMRetrievalSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xE021), "SQ", "DICOM Retrieval Sequence"),
    DICOMMediaRetrievalSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xE022), "SQ", "DICOM Media Retrieval Sequence"),
    WADORetrievalSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xE023), "SQ", "WADO Retrieval Sequence"),
    XDSRetrievalSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xE024), "SQ", "XDS Retrieval Sequence"),
    WADORSRetrievalSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0040, 0xE025), "SQ", "WADO-RS Retrieval Sequence"),
    RepositoryUniqueID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0040, 0xE030), "UI", "Repository Unique ID"),
    HomeCommunityID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0040, 0xE031), "UI", "Home Community ID"),

    // Group 0x0042

    DocumentTitle: new TagDescriptor<"ST", string>(
        new Tag(0x0042, 0x0010), "ST", "Document Title"),
    EncapsulatedDocument: new TagDescriptor<"OB", Uint8Array | LazyValue<Uint8Array>>(
        new Tag(0x0042, 0x0011), "OB", "Encapsulated Document"),
    MIMETypeOfEncapsulatedDocument: new TagDescriptor<"LO", string[]>(
        new Tag(0x0042, 0x0012), "LO", "MIME Type of Encapsulated Document"),
    SourceInstanceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0042, 0x0013), "SQ", "Source Instance Sequence"),
    ListOfMIMETypes: new TagDescriptor<"LO", string[]>(
        new Tag(0x0042, 0x0014), "LO", "List of MIME Types"),

    // Group 0x0044

    ProductPackageIdentifier: new TagDescriptor<"ST", string>(
        new Tag(0x0044, 0x0001), "ST", "Product Package Identifier"),
    SubstanceAdministrationApproval: new TagDescriptor<"CS", string[]>(
        new Tag(0x0044, 0x0002), "CS", "Substance Administration Approval"),
    ApprovalStatusFurtherDescription: new TagDescriptor<"LT", string>(
        new Tag(0x0044, 0x0003), "LT", "Approval Status Further Description"),
    ApprovalStatusDateTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x0044, 0x0004), "DT", "Approval Status DateTime"),
    ProductTypeCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0044, 0x0007), "SQ", "Product Type Code Sequence"),
    ProductName: new TagDescriptor<"LO", string[]>(
        new Tag(0x0044, 0x0008), "LO", "Product Name"),
    ProductDescription: new TagDescriptor<"LT", string>(
        new Tag(0x0044, 0x0009), "LT", "Product Description"),
    ProductLotIdentifier: new TagDescriptor<"LO", string[]>(
        new Tag(0x0044, 0x000A), "LO", "Product Lot Identifier"),
    ProductExpirationDateTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x0044, 0x000B), "DT", "Product Expiration DateTime"),
    SubstanceAdministrationDateTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x0044, 0x0010), "DT", "Substance Administration DateTime"),
    SubstanceAdministrationNotes: new TagDescriptor<"LO", string[]>(
        new Tag(0x0044, 0x0011), "LO", "Substance Administration Notes"),
    SubstanceAdministrationDeviceID: new TagDescriptor<"LO", string[]>(
        new Tag(0x0044, 0x0012), "LO", "Substance Administration Device ID"),
    ProductParameterSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0044, 0x0013), "SQ", "Product Parameter Sequence"),
    SubstanceAdministrationParameterSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0044, 0x0019), "SQ", "Substance Administration Parameter Sequence"),
    ApprovalSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0044, 0x0100), "SQ", "Approval Sequence"),
    AssertionCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0044, 0x0101), "SQ", "Assertion Code Sequence"),
    AssertionUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0044, 0x0102), "UI", "Assertion UID"),
    AsserterIdentificationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0044, 0x0103), "SQ", "Asserter Identification Sequence"),
    AssertionDateTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x0044, 0x0104), "DT", "Assertion DateTime"),
    AssertionExpirationDateTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x0044, 0x0105), "DT", "Assertion Expiration DateTime"),
    AssertionComments: new TagDescriptor<"UT", string>(
        new Tag(0x0044, 0x0106), "UT", "Assertion Comments"),
    RelatedAssertionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0044, 0x0107), "SQ", "Related Assertion Sequence"),
    ReferencedAssertionUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0044, 0x0108), "UI", "Referenced Assertion UID"),
    ApprovalSubjectSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0044, 0x0109), "SQ", "Approval Subject Sequence"),
    OrganizationalRoleCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0044, 0x010A), "SQ", "Organizational Role Code Sequence"),

    // Group 0x0046

    LensDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0046, 0x0012), "LO", "Lens Description"),
    RightLensSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0046, 0x0014), "SQ", "Right Lens Sequence"),
    LeftLensSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0046, 0x0015), "SQ", "Left Lens Sequence"),
    UnspecifiedLateralityLensSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0046, 0x0016), "SQ", "Unspecified Laterality Lens Sequence"),
    CylinderSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0046, 0x0018), "SQ", "Cylinder Sequence"),
    PrismSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0046, 0x0028), "SQ", "Prism Sequence"),
    HorizontalPrismPower: new TagDescriptor<"FD", number[]>(
        new Tag(0x0046, 0x0030), "FD", "Horizontal Prism Power"),
    HorizontalPrismBase: new TagDescriptor<"CS", string[]>(
        new Tag(0x0046, 0x0032), "CS", "Horizontal Prism Base"),
    VerticalPrismPower: new TagDescriptor<"FD", number[]>(
        new Tag(0x0046, 0x0034), "FD", "Vertical Prism Power"),
    VerticalPrismBase: new TagDescriptor<"CS", string[]>(
        new Tag(0x0046, 0x0036), "CS", "Vertical Prism Base"),
    LensSegmentType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0046, 0x0038), "CS", "Lens Segment Type"),
    OpticalTransmittance: new TagDescriptor<"FD", number[]>(
        new Tag(0x0046, 0x0040), "FD", "Optical Transmittance"),
    ChannelWidth: new TagDescriptor<"FD", number[]>(
        new Tag(0x0046, 0x0042), "FD", "Channel Width"),
    PupilSize: new TagDescriptor<"FD", number[]>(
        new Tag(0x0046, 0x0044), "FD", "Pupil Size"),
    CornealSize: new TagDescriptor<"FD", number[]>(
        new Tag(0x0046, 0x0046), "FD", "Corneal Size"),
    AutorefractionRightEyeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0046, 0x0050), "SQ", "Autorefraction Right Eye Sequence"),
    AutorefractionLeftEyeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0046, 0x0052), "SQ", "Autorefraction Left Eye Sequence"),
    DistancePupillaryDistance: new TagDescriptor<"FD", number[]>(
        new Tag(0x0046, 0x0060), "FD", "Distance Pupillary Distance"),
    NearPupillaryDistance: new TagDescriptor<"FD", number[]>(
        new Tag(0x0046, 0x0062), "FD", "Near Pupillary Distance"),
    IntermediatePupillaryDistance: new TagDescriptor<"FD", number[]>(
        new Tag(0x0046, 0x0063), "FD", "Intermediate Pupillary Distance"),
    OtherPupillaryDistance: new TagDescriptor<"FD", number[]>(
        new Tag(0x0046, 0x0064), "FD", "Other Pupillary Distance"),
    KeratometryRightEyeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0046, 0x0070), "SQ", "Keratometry Right Eye Sequence"),
    KeratometryLeftEyeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0046, 0x0071), "SQ", "Keratometry Left Eye Sequence"),
    SteepKeratometricAxisSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0046, 0x0074), "SQ", "Steep Keratometric Axis Sequence"),
    RadiusOfCurvature: new TagDescriptor<"FD", number[]>(
        new Tag(0x0046, 0x0075), "FD", "Radius of Curvature"),
    KeratometricPower: new TagDescriptor<"FD", number[]>(
        new Tag(0x0046, 0x0076), "FD", "Keratometric Power"),
    KeratometricAxis: new TagDescriptor<"FD", number[]>(
        new Tag(0x0046, 0x0077), "FD", "Keratometric Axis"),
    FlatKeratometricAxisSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0046, 0x0080), "SQ", "Flat Keratometric Axis Sequence"),
    BackgroundColor: new TagDescriptor<"CS", string[]>(
        new Tag(0x0046, 0x0092), "CS", "Background Color"),
    Optotype: new TagDescriptor<"CS", string[]>(
        new Tag(0x0046, 0x0094), "CS", "Optotype"),
    OptotypePresentation: new TagDescriptor<"CS", string[]>(
        new Tag(0x0046, 0x0095), "CS", "Optotype Presentation"),
    SubjectiveRefractionRightEyeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0046, 0x0097), "SQ", "Subjective Refraction Right Eye Sequence"),
    SubjectiveRefractionLeftEyeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0046, 0x0098), "SQ", "Subjective Refraction Left Eye Sequence"),
    AddNearSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0046, 0x0100), "SQ", "Add Near Sequence"),
    AddIntermediateSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0046, 0x0101), "SQ", "Add Intermediate Sequence"),
    AddOtherSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0046, 0x0102), "SQ", "Add Other Sequence"),
    AddPower: new TagDescriptor<"FD", number[]>(
        new Tag(0x0046, 0x0104), "FD", "Add Power"),
    ViewingDistance: new TagDescriptor<"FD", number[]>(
        new Tag(0x0046, 0x0106), "FD", "Viewing Distance"),
    VisualAcuityTypeCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0046, 0x0121), "SQ", "Visual Acuity Type Code Sequence"),
    VisualAcuityRightEyeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0046, 0x0122), "SQ", "Visual Acuity Right Eye Sequence"),
    VisualAcuityLeftEyeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0046, 0x0123), "SQ", "Visual Acuity Left Eye Sequence"),
    VisualAcuityBothEyesOpenSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0046, 0x0124), "SQ", "Visual Acuity Both Eyes Open Sequence"),
    ViewingDistanceType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0046, 0x0125), "CS", "Viewing Distance Type"),
    VisualAcuityModifiers: new TagDescriptor<"SS", number[]>(
        new Tag(0x0046, 0x0135), "SS", "Visual Acuity Modifiers"),
    DecimalVisualAcuity: new TagDescriptor<"FD", number[]>(
        new Tag(0x0046, 0x0137), "FD", "Decimal Visual Acuity"),
    OptotypeDetailedDefinition: new TagDescriptor<"LO", string[]>(
        new Tag(0x0046, 0x0139), "LO", "Optotype Detailed Definition"),
    ReferencedRefractiveMeasurementsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0046, 0x0145), "SQ", "Referenced Refractive Measurements Sequence"),
    SpherePower: new TagDescriptor<"FD", number[]>(
        new Tag(0x0046, 0x0146), "FD", "Sphere Power"),
    CylinderPower: new TagDescriptor<"FD", number[]>(
        new Tag(0x0046, 0x0147), "FD", "Cylinder Power"),
    CornealTopographySurface: new TagDescriptor<"CS", string[]>(
        new Tag(0x0046, 0x0201), "CS", "Corneal Topography Surface"),
    CornealVertexLocation: new TagDescriptor<"FL", number[]>(
        new Tag(0x0046, 0x0202), "FL", "Corneal Vertex Location"),
    PupilCentroidXCoordinate: new TagDescriptor<"FL", number[]>(
        new Tag(0x0046, 0x0203), "FL", "Pupil Centroid X-Coordinate"),
    PupilCentroidYCoordinate: new TagDescriptor<"FL", number[]>(
        new Tag(0x0046, 0x0204), "FL", "Pupil Centroid Y-Coordinate"),
    EquivalentPupilRadius: new TagDescriptor<"FL", number[]>(
        new Tag(0x0046, 0x0205), "FL", "Equivalent Pupil Radius"),
    CornealTopographyMapTypeCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0046, 0x0207), "SQ", "Corneal Topography Map Type Code Sequence"),
    VerticesOfTheOutlineOfPupil: new TagDescriptor<"IS", number[]>(
        new Tag(0x0046, 0x0208), "IS", "Vertices of the Outline of Pupil"),
    CornealTopographyMappingNormalsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0046, 0x0210), "SQ", "Corneal Topography Mapping Normals Sequence"),
    MaximumCornealCurvatureSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0046, 0x0211), "SQ", "Maximum Corneal Curvature Sequence"),
    MaximumCornealCurvature: new TagDescriptor<"FL", number[]>(
        new Tag(0x0046, 0x0212), "FL", "Maximum Corneal Curvature"),
    MaximumCornealCurvatureLocation: new TagDescriptor<"FL", number[]>(
        new Tag(0x0046, 0x0213), "FL", "Maximum Corneal Curvature Location"),
    MinimumKeratometricSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0046, 0x0215), "SQ", "Minimum Keratometric Sequence"),
    SimulatedKeratometricCylinderSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0046, 0x0218), "SQ", "Simulated Keratometric Cylinder Sequence"),
    AverageCornealPower: new TagDescriptor<"FL", number[]>(
        new Tag(0x0046, 0x0220), "FL", "Average Corneal Power"),
    CornealISValue: new TagDescriptor<"FL", number[]>(
        new Tag(0x0046, 0x0224), "FL", "Corneal I-S Value"),
    AnalyzedArea: new TagDescriptor<"FL", number[]>(
        new Tag(0x0046, 0x0227), "FL", "Analyzed Area"),
    SurfaceRegularityIndex: new TagDescriptor<"FL", number[]>(
        new Tag(0x0046, 0x0230), "FL", "Surface Regularity Index"),
    SurfaceAsymmetryIndex: new TagDescriptor<"FL", number[]>(
        new Tag(0x0046, 0x0232), "FL", "Surface Asymmetry Index"),
    CornealEccentricityIndex: new TagDescriptor<"FL", number[]>(
        new Tag(0x0046, 0x0234), "FL", "Corneal Eccentricity Index"),
    KeratoconusPredictionIndex: new TagDescriptor<"FL", number[]>(
        new Tag(0x0046, 0x0236), "FL", "Keratoconus Prediction Index"),
    DecimalPotentialVisualAcuity: new TagDescriptor<"FL", number[]>(
        new Tag(0x0046, 0x0238), "FL", "Decimal Potential Visual Acuity"),
    CornealTopographyMapQualityEvaluation: new TagDescriptor<"CS", string[]>(
        new Tag(0x0046, 0x0242), "CS", "Corneal Topography Map Quality Evaluation"),
    SourceImageCornealProcessedDataSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0046, 0x0244), "SQ", "Source Image Corneal Processed Data Sequence"),
    CornealPointLocation: new TagDescriptor<"FL", number[]>(
        new Tag(0x0046, 0x0247), "FL", "Corneal Point Location"),
    CornealPointEstimated: new TagDescriptor<"CS", string[]>(
        new Tag(0x0046, 0x0248), "CS", "Corneal Point Estimated"),
    AxialPower: new TagDescriptor<"FL", number[]>(
        new Tag(0x0046, 0x0249), "FL", "Axial Power"),
    TangentialPower: new TagDescriptor<"FL", number[]>(
        new Tag(0x0046, 0x0250), "FL", "Tangential Power"),
    RefractivePower: new TagDescriptor<"FL", number[]>(
        new Tag(0x0046, 0x0251), "FL", "Refractive Power"),
    RelativeElevation: new TagDescriptor<"FL", number[]>(
        new Tag(0x0046, 0x0252), "FL", "Relative Elevation"),
    CornealWavefront: new TagDescriptor<"FL", number[]>(
        new Tag(0x0046, 0x0253), "FL", "Corneal Wavefront"),

    // Group 0x0048

    ImagedVolumeWidth: new TagDescriptor<"FL", number[]>(
        new Tag(0x0048, 0x0001), "FL", "Imaged Volume Width"),
    ImagedVolumeHeight: new TagDescriptor<"FL", number[]>(
        new Tag(0x0048, 0x0002), "FL", "Imaged Volume Height"),
    ImagedVolumeDepth: new TagDescriptor<"FL", number[]>(
        new Tag(0x0048, 0x0003), "FL", "Imaged Volume Depth"),
    TotalPixelMatrixColumns: new TagDescriptor<"UL", number[]>(
        new Tag(0x0048, 0x0006), "UL", "Total Pixel Matrix Columns"),
    TotalPixelMatrixRows: new TagDescriptor<"UL", number[]>(
        new Tag(0x0048, 0x0007), "UL", "Total Pixel Matrix Rows"),
    TotalPixelMatrixOriginSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0048, 0x0008), "SQ", "Total Pixel Matrix Origin Sequence"),
    SpecimenLabelInImage: new TagDescriptor<"CS", string[]>(
        new Tag(0x0048, 0x0010), "CS", "Specimen Label in Image"),
    FocusMethod: new TagDescriptor<"CS", string[]>(
        new Tag(0x0048, 0x0011), "CS", "Focus Method"),
    ExtendedDepthOfField: new TagDescriptor<"CS", string[]>(
        new Tag(0x0048, 0x0012), "CS", "Extended Depth of Field"),
    NumberOfFocalPlanes: new TagDescriptor<"US", number[]>(
        new Tag(0x0048, 0x0013), "US", "Number of Focal Planes"),
    DistanceBetweenFocalPlanes: new TagDescriptor<"FL", number[]>(
        new Tag(0x0048, 0x0014), "FL", "Distance Between Focal Planes"),
    RecommendedAbsentPixelCIELabValue: new TagDescriptor<"US", number[]>(
        new Tag(0x0048, 0x0015), "US", "Recommended Absent Pixel CIELab Value"),
    IlluminatorTypeCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0048, 0x0100), "SQ", "Illuminator Type Code Sequence"),
    ImageOrientationSlide: new TagDescriptor<"DS", number[]>(
        new Tag(0x0048, 0x0102), "DS", "Image Orientation (Slide)"),
    OpticalPathSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0048, 0x0105), "SQ", "Optical Path Sequence"),
    OpticalPathIdentifier: new TagDescriptor<"SH", string[]>(
        new Tag(0x0048, 0x0106), "SH", "Optical Path Identifier"),
    OpticalPathDescription: new TagDescriptor<"ST", string>(
        new Tag(0x0048, 0x0107), "ST", "Optical Path Description"),
    IlluminationColorCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0048, 0x0108), "SQ", "Illumination Color Code Sequence"),
    SpecimenReferenceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0048, 0x0110), "SQ", "Specimen Reference Sequence"),
    CondenserLensPower: new TagDescriptor<"DS", number[]>(
        new Tag(0x0048, 0x0111), "DS", "Condenser Lens Power"),
    ObjectiveLensPower: new TagDescriptor<"DS", number[]>(
        new Tag(0x0048, 0x0112), "DS", "Objective Lens Power"),
    ObjectiveLensNumericalAperture: new TagDescriptor<"DS", number[]>(
        new Tag(0x0048, 0x0113), "DS", "Objective Lens Numerical Aperture"),
    PaletteColorLookupTableSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0048, 0x0120), "SQ", "Palette Color Lookup Table Sequence"),
    ReferencedImageNavigationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0048, 0x0200), "SQ", "Referenced Image Navigation Sequence"),
    TopLeftHandCornerOfLocalizerArea: new TagDescriptor<"US", number[]>(
        new Tag(0x0048, 0x0201), "US", "Top Left Hand Corner of Localizer Area"),
    BottomRightHandCornerOfLocalizerArea: new TagDescriptor<"US", number[]>(
        new Tag(0x0048, 0x0202), "US", "Bottom Right Hand Corner of Localizer Area"),
    OpticalPathIdentificationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0048, 0x0207), "SQ", "Optical Path Identification Sequence"),
    PlanePositionSlideSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0048, 0x021A), "SQ", "Plane Position (Slide) Sequence"),
    ColumnPositionInTotalImagePixelMatrix: new TagDescriptor<"SL", number[]>(
        new Tag(0x0048, 0x021E), "SL", "Column Position In Total Image Pixel Matrix"),
    RowPositionInTotalImagePixelMatrix: new TagDescriptor<"SL", number[]>(
        new Tag(0x0048, 0x021F), "SL", "Row Position In Total Image Pixel Matrix"),
    PixelOriginInterpretation: new TagDescriptor<"CS", string[]>(
        new Tag(0x0048, 0x0301), "CS", "Pixel Origin Interpretation"),
    NumberOfOpticalPaths: new TagDescriptor<"UL", number[]>(
        new Tag(0x0048, 0x0302), "UL", "Number of Optical Paths"),
    TotalPixelMatrixFocalPlanes: new TagDescriptor<"UL", number[]>(
        new Tag(0x0048, 0x0303), "UL", "Total Pixel Matrix Focal Planes"),

    // Group 0x0050

    CalibrationImage: new TagDescriptor<"CS", string[]>(
        new Tag(0x0050, 0x0004), "CS", "Calibration Image"),
    DeviceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0050, 0x0010), "SQ", "Device Sequence"),
    ContainerComponentTypeCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0050, 0x0012), "SQ", "Container Component Type Code Sequence"),
    ContainerComponentThickness: new TagDescriptor<"FD", number[]>(
        new Tag(0x0050, 0x0013), "FD", "Container Component Thickness"),
    DeviceLength: new TagDescriptor<"DS", number[]>(
        new Tag(0x0050, 0x0014), "DS", "Device Length"),
    ContainerComponentWidth: new TagDescriptor<"FD", number[]>(
        new Tag(0x0050, 0x0015), "FD", "Container Component Width"),
    DeviceDiameter: new TagDescriptor<"DS", number[]>(
        new Tag(0x0050, 0x0016), "DS", "Device Diameter"),
    DeviceDiameterUnits: new TagDescriptor<"CS", string[]>(
        new Tag(0x0050, 0x0017), "CS", "Device Diameter Units"),
    DeviceVolume: new TagDescriptor<"DS", number[]>(
        new Tag(0x0050, 0x0018), "DS", "Device Volume"),
    InterMarkerDistance: new TagDescriptor<"DS", number[]>(
        new Tag(0x0050, 0x0019), "DS", "Inter-Marker Distance"),
    ContainerComponentMaterial: new TagDescriptor<"CS", string[]>(
        new Tag(0x0050, 0x001A), "CS", "Container Component Material"),
    ContainerComponentID: new TagDescriptor<"LO", string[]>(
        new Tag(0x0050, 0x001B), "LO", "Container Component ID"),
    ContainerComponentLength: new TagDescriptor<"FD", number[]>(
        new Tag(0x0050, 0x001C), "FD", "Container Component Length"),
    ContainerComponentDiameter: new TagDescriptor<"FD", number[]>(
        new Tag(0x0050, 0x001D), "FD", "Container Component Diameter"),
    ContainerComponentDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0050, 0x001E), "LO", "Container Component Description"),
    DeviceDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0050, 0x0020), "LO", "Device Description"),

    // Group 0x0052

    ContrastBolusIngredientPercentByVolume: new TagDescriptor<"FL", number[]>(
        new Tag(0x0052, 0x0001), "FL", "Contrast/Bolus Ingredient Percent by Volume"),
    OCTFocalDistance: new TagDescriptor<"FD", number[]>(
        new Tag(0x0052, 0x0002), "FD", "OCT Focal Distance"),
    BeamSpotSize: new TagDescriptor<"FD", number[]>(
        new Tag(0x0052, 0x0003), "FD", "Beam Spot Size"),
    EffectiveRefractiveIndex: new TagDescriptor<"FD", number[]>(
        new Tag(0x0052, 0x0004), "FD", "Effective Refractive Index"),
    OCTAcquisitionDomain: new TagDescriptor<"CS", string[]>(
        new Tag(0x0052, 0x0006), "CS", "OCT Acquisition Domain"),
    OCTOpticalCenterWavelength: new TagDescriptor<"FD", number[]>(
        new Tag(0x0052, 0x0007), "FD", "OCT Optical Center Wavelength"),
    AxialResolution: new TagDescriptor<"FD", number[]>(
        new Tag(0x0052, 0x0008), "FD", "Axial Resolution"),
    RangingDepth: new TagDescriptor<"FD", number[]>(
        new Tag(0x0052, 0x0009), "FD", "Ranging Depth"),
    ALineRate: new TagDescriptor<"FD", number[]>(
        new Tag(0x0052, 0x0011), "FD", "A-line Rate"),
    ALinesPerFrame: new TagDescriptor<"US", number[]>(
        new Tag(0x0052, 0x0012), "US", "A-lines Per Frame"),
    CatheterRotationalRate: new TagDescriptor<"FD", number[]>(
        new Tag(0x0052, 0x0013), "FD", "Catheter Rotational Rate"),
    ALinePixelSpacing: new TagDescriptor<"FD", number[]>(
        new Tag(0x0052, 0x0014), "FD", "A-line Pixel Spacing"),
    ModeOfPercutaneousAccessSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0052, 0x0016), "SQ", "Mode of Percutaneous Access Sequence"),
    IntravascularOCTFrameTypeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0052, 0x0025), "SQ", "Intravascular OCT Frame Type Sequence"),
    OCTZOffsetApplied: new TagDescriptor<"CS", string[]>(
        new Tag(0x0052, 0x0026), "CS", "OCT Z Offset Applied"),
    IntravascularFrameContentSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0052, 0x0027), "SQ", "Intravascular Frame Content Sequence"),
    IntravascularLongitudinalDistance: new TagDescriptor<"FD", number[]>(
        new Tag(0x0052, 0x0028), "FD", "Intravascular Longitudinal Distance"),
    IntravascularOCTFrameContentSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0052, 0x0029), "SQ", "Intravascular OCT Frame Content Sequence"),
    OCTZOffsetCorrection: new TagDescriptor<"SS", number[]>(
        new Tag(0x0052, 0x0030), "SS", "OCT Z Offset Correction"),
    CatheterDirectionOfRotation: new TagDescriptor<"CS", string[]>(
        new Tag(0x0052, 0x0031), "CS", "Catheter Direction of Rotation"),
    SeamLineLocation: new TagDescriptor<"FD", number[]>(
        new Tag(0x0052, 0x0033), "FD", "Seam Line Location"),
    FirstALineLocation: new TagDescriptor<"FD", number[]>(
        new Tag(0x0052, 0x0034), "FD", "First A-line Location"),
    SeamLineIndex: new TagDescriptor<"US", number[]>(
        new Tag(0x0052, 0x0036), "US", "Seam Line Index"),
    NumberOfPaddedALines: new TagDescriptor<"US", number[]>(
        new Tag(0x0052, 0x0038), "US", "Number of Padded A-lines"),
    InterpolationType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0052, 0x0039), "CS", "Interpolation Type"),
    RefractiveIndexApplied: new TagDescriptor<"CS", string[]>(
        new Tag(0x0052, 0x003A), "CS", "Refractive Index Applied"),

    // Group 0x0054

    EnergyWindowVector: new TagDescriptor<"US", number[]>(
        new Tag(0x0054, 0x0010), "US", "Energy Window Vector"),
    NumberOfEnergyWindows: new TagDescriptor<"US", number[]>(
        new Tag(0x0054, 0x0011), "US", "Number of Energy Windows"),
    EnergyWindowInformationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0054, 0x0012), "SQ", "Energy Window Information Sequence"),
    EnergyWindowRangeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0054, 0x0013), "SQ", "Energy Window Range Sequence"),
    EnergyWindowLowerLimit: new TagDescriptor<"DS", number[]>(
        new Tag(0x0054, 0x0014), "DS", "Energy Window Lower Limit"),
    EnergyWindowUpperLimit: new TagDescriptor<"DS", number[]>(
        new Tag(0x0054, 0x0015), "DS", "Energy Window Upper Limit"),
    RadiopharmaceuticalInformationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0054, 0x0016), "SQ", "Radiopharmaceutical Information Sequence"),
    ResidualSyringeCounts: new TagDescriptor<"IS", number[]>(
        new Tag(0x0054, 0x0017), "IS", "Residual Syringe Counts"),
    EnergyWindowName: new TagDescriptor<"SH", string[]>(
        new Tag(0x0054, 0x0018), "SH", "Energy Window Name"),
    DetectorVector: new TagDescriptor<"US", number[]>(
        new Tag(0x0054, 0x0020), "US", "Detector Vector"),
    NumberOfDetectors: new TagDescriptor<"US", number[]>(
        new Tag(0x0054, 0x0021), "US", "Number of Detectors"),
    DetectorInformationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0054, 0x0022), "SQ", "Detector Information Sequence"),
    PhaseVector: new TagDescriptor<"US", number[]>(
        new Tag(0x0054, 0x0030), "US", "Phase Vector"),
    NumberOfPhases: new TagDescriptor<"US", number[]>(
        new Tag(0x0054, 0x0031), "US", "Number of Phases"),
    PhaseInformationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0054, 0x0032), "SQ", "Phase Information Sequence"),
    NumberOfFramesInPhase: new TagDescriptor<"US", number[]>(
        new Tag(0x0054, 0x0033), "US", "Number of Frames in Phase"),
    PhaseDelay: new TagDescriptor<"IS", number[]>(
        new Tag(0x0054, 0x0036), "IS", "Phase Delay"),
    PauseBetweenFrames: new TagDescriptor<"IS", number[]>(
        new Tag(0x0054, 0x0038), "IS", "Pause Between Frames"),
    PhaseDescription: new TagDescriptor<"CS", string[]>(
        new Tag(0x0054, 0x0039), "CS", "Phase Description"),
    RotationVector: new TagDescriptor<"US", number[]>(
        new Tag(0x0054, 0x0050), "US", "Rotation Vector"),
    NumberOfRotations: new TagDescriptor<"US", number[]>(
        new Tag(0x0054, 0x0051), "US", "Number of Rotations"),
    RotationInformationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0054, 0x0052), "SQ", "Rotation Information Sequence"),
    NumberOfFramesInRotation: new TagDescriptor<"US", number[]>(
        new Tag(0x0054, 0x0053), "US", "Number of Frames in Rotation"),
    RRIntervalVector: new TagDescriptor<"US", number[]>(
        new Tag(0x0054, 0x0060), "US", "R-R Interval Vector"),
    NumberOfRRIntervals: new TagDescriptor<"US", number[]>(
        new Tag(0x0054, 0x0061), "US", "Number of R-R Intervals"),
    GatedInformationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0054, 0x0062), "SQ", "Gated Information Sequence"),
    DataInformationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0054, 0x0063), "SQ", "Data Information Sequence"),
    TimeSlotVector: new TagDescriptor<"US", number[]>(
        new Tag(0x0054, 0x0070), "US", "Time Slot Vector"),
    NumberOfTimeSlots: new TagDescriptor<"US", number[]>(
        new Tag(0x0054, 0x0071), "US", "Number of Time Slots"),
    TimeSlotInformationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0054, 0x0072), "SQ", "Time Slot Information Sequence"),
    TimeSlotTime: new TagDescriptor<"DS", number[]>(
        new Tag(0x0054, 0x0073), "DS", "Time Slot Time"),
    SliceVector: new TagDescriptor<"US", number[]>(
        new Tag(0x0054, 0x0080), "US", "Slice Vector"),
    NumberOfSlices: new TagDescriptor<"US", number[]>(
        new Tag(0x0054, 0x0081), "US", "Number of Slices"),
    AngularViewVector: new TagDescriptor<"US", number[]>(
        new Tag(0x0054, 0x0090), "US", "Angular View Vector"),
    TimeSliceVector: new TagDescriptor<"US", number[]>(
        new Tag(0x0054, 0x0100), "US", "Time Slice Vector"),
    NumberOfTimeSlices: new TagDescriptor<"US", number[]>(
        new Tag(0x0054, 0x0101), "US", "Number of Time Slices"),
    StartAngle: new TagDescriptor<"DS", number[]>(
        new Tag(0x0054, 0x0200), "DS", "Start Angle"),
    TypeOfDetectorMotion: new TagDescriptor<"CS", string[]>(
        new Tag(0x0054, 0x0202), "CS", "Type of Detector Motion"),
    TriggerVector: new TagDescriptor<"IS", number[]>(
        new Tag(0x0054, 0x0210), "IS", "Trigger Vector"),
    NumberOfTriggersInPhase: new TagDescriptor<"US", number[]>(
        new Tag(0x0054, 0x0211), "US", "Number of Triggers in Phase"),
    ViewCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0054, 0x0220), "SQ", "View Code Sequence"),
    ViewModifierCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0054, 0x0222), "SQ", "View Modifier Code Sequence"),
    RadionuclideCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0054, 0x0300), "SQ", "Radionuclide Code Sequence"),
    AdministrationRouteCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0054, 0x0302), "SQ", "Administration Route Code Sequence"),
    RadiopharmaceuticalCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0054, 0x0304), "SQ", "Radiopharmaceutical Code Sequence"),
    CalibrationDataSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0054, 0x0306), "SQ", "Calibration Data Sequence"),
    EnergyWindowNumber: new TagDescriptor<"US", number[]>(
        new Tag(0x0054, 0x0308), "US", "Energy Window Number"),
    ImageID: new TagDescriptor<"SH", string[]>(
        new Tag(0x0054, 0x0400), "SH", "Image ID"),
    PatientOrientationCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0054, 0x0410), "SQ", "Patient Orientation Code Sequence"),
    PatientOrientationModifierCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0054, 0x0412), "SQ", "Patient Orientation Modifier Code Sequence"),
    PatientGantryRelationshipCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0054, 0x0414), "SQ", "Patient Gantry Relationship Code Sequence"),
    SliceProgressionDirection: new TagDescriptor<"CS", string[]>(
        new Tag(0x0054, 0x0500), "CS", "Slice Progression Direction"),
    ScanProgressionDirection: new TagDescriptor<"CS", string[]>(
        new Tag(0x0054, 0x0501), "CS", "Scan Progression Direction"),
    SeriesType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0054, 0x1000), "CS", "Series Type"),
    Units: new TagDescriptor<"CS", string[]>(
        new Tag(0x0054, 0x1001), "CS", "Units"),
    CountsSource: new TagDescriptor<"CS", string[]>(
        new Tag(0x0054, 0x1002), "CS", "Counts Source"),
    ReprojectionMethod: new TagDescriptor<"CS", string[]>(
        new Tag(0x0054, 0x1004), "CS", "Reprojection Method"),
    SUVType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0054, 0x1006), "CS", "SUV Type"),
    RandomsCorrectionMethod: new TagDescriptor<"CS", string[]>(
        new Tag(0x0054, 0x1100), "CS", "Randoms Correction Method"),
    AttenuationCorrectionMethod: new TagDescriptor<"LO", string[]>(
        new Tag(0x0054, 0x1101), "LO", "Attenuation Correction Method"),
    DecayCorrection: new TagDescriptor<"CS", string[]>(
        new Tag(0x0054, 0x1102), "CS", "Decay Correction"),
    ReconstructionMethod: new TagDescriptor<"LO", string[]>(
        new Tag(0x0054, 0x1103), "LO", "Reconstruction Method"),
    DetectorLinesOfResponseUsed: new TagDescriptor<"LO", string[]>(
        new Tag(0x0054, 0x1104), "LO", "Detector Lines of Response Used"),
    ScatterCorrectionMethod: new TagDescriptor<"LO", string[]>(
        new Tag(0x0054, 0x1105), "LO", "Scatter Correction Method"),
    AxialAcceptance: new TagDescriptor<"DS", number[]>(
        new Tag(0x0054, 0x1200), "DS", "Axial Acceptance"),
    AxialMash: new TagDescriptor<"IS", number[]>(
        new Tag(0x0054, 0x1201), "IS", "Axial Mash"),
    TransverseMash: new TagDescriptor<"IS", number[]>(
        new Tag(0x0054, 0x1202), "IS", "Transverse Mash"),
    DetectorElementSize: new TagDescriptor<"DS", number[]>(
        new Tag(0x0054, 0x1203), "DS", "Detector Element Size"),
    CoincidenceWindowWidth: new TagDescriptor<"DS", number[]>(
        new Tag(0x0054, 0x1210), "DS", "Coincidence Window Width"),
    SecondaryCountsType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0054, 0x1220), "CS", "Secondary Counts Type"),
    FrameReferenceTime: new TagDescriptor<"DS", number[]>(
        new Tag(0x0054, 0x1300), "DS", "Frame Reference Time"),
    PrimaryPromptsCountsAccumulated: new TagDescriptor<"IS", number[]>(
        new Tag(0x0054, 0x1310), "IS", "Primary (Prompts) Counts Accumulated"),
    SecondaryCountsAccumulated: new TagDescriptor<"IS", number[]>(
        new Tag(0x0054, 0x1311), "IS", "Secondary Counts Accumulated"),
    SliceSensitivityFactor: new TagDescriptor<"DS", number[]>(
        new Tag(0x0054, 0x1320), "DS", "Slice Sensitivity Factor"),
    DecayFactor: new TagDescriptor<"DS", number[]>(
        new Tag(0x0054, 0x1321), "DS", "Decay Factor"),
    DoseCalibrationFactor: new TagDescriptor<"DS", number[]>(
        new Tag(0x0054, 0x1322), "DS", "Dose Calibration Factor"),
    ScatterFractionFactor: new TagDescriptor<"DS", number[]>(
        new Tag(0x0054, 0x1323), "DS", "Scatter Fraction Factor"),
    DeadTimeFactor: new TagDescriptor<"DS", number[]>(
        new Tag(0x0054, 0x1324), "DS", "Dead Time Factor"),
    ImageIndex: new TagDescriptor<"US", number[]>(
        new Tag(0x0054, 0x1330), "US", "Image Index"),
    CountsIncluded: new TagDescriptor<"CS", string[]>(
        new Tag(0x0054, 0x1400), "CS", "Counts Included"),
    DeadTimeCorrectionFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0054, 0x1401), "CS", "Dead Time Correction Flag"),

    // Group 0x0060

    HistogramSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0060, 0x3000), "SQ", "Histogram Sequence"),
    HistogramNumberOfBins: new TagDescriptor<"US", number[]>(
        new Tag(0x0060, 0x3002), "US", "Histogram Number of Bins"),
    HistogramBinWidth: new TagDescriptor<"US", number[]>(
        new Tag(0x0060, 0x3008), "US", "Histogram Bin Width"),
    HistogramExplanation: new TagDescriptor<"LO", string[]>(
        new Tag(0x0060, 0x3010), "LO", "Histogram Explanation"),
    HistogramData: new TagDescriptor<"UL", number[]>(
        new Tag(0x0060, 0x3020), "UL", "Histogram Data"),

    // Group 0x0062

    SegmentationType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0062, 0x0001), "CS", "Segmentation Type"),
    SegmentSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0062, 0x0002), "SQ", "Segment Sequence"),
    SegmentedPropertyCategoryCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0062, 0x0003), "SQ", "Segmented Property Category Code Sequence"),
    SegmentNumber: new TagDescriptor<"US", number[]>(
        new Tag(0x0062, 0x0004), "US", "Segment Number"),
    SegmentLabel: new TagDescriptor<"LO", string[]>(
        new Tag(0x0062, 0x0005), "LO", "Segment Label"),
    SegmentDescription: new TagDescriptor<"ST", string>(
        new Tag(0x0062, 0x0006), "ST", "Segment Description"),
    SegmentationAlgorithmIdentificationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0062, 0x0007), "SQ", "Segmentation Algorithm Identification Sequence"),
    SegmentAlgorithmType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0062, 0x0008), "CS", "Segment Algorithm Type"),
    SegmentAlgorithmName: new TagDescriptor<"LO", string[]>(
        new Tag(0x0062, 0x0009), "LO", "Segment Algorithm Name"),
    SegmentIdentificationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0062, 0x000A), "SQ", "Segment Identification Sequence"),
    ReferencedSegmentNumber: new TagDescriptor<"US", number[]>(
        new Tag(0x0062, 0x000B), "US", "Referenced Segment Number"),
    RecommendedDisplayGrayscaleValue: new TagDescriptor<"US", number[]>(
        new Tag(0x0062, 0x000C), "US", "Recommended Display Grayscale Value"),
    RecommendedDisplayCIELabValue: new TagDescriptor<"US", number[]>(
        new Tag(0x0062, 0x000D), "US", "Recommended Display CIELab Value"),
    MaximumFractionalValue: new TagDescriptor<"US", number[]>(
        new Tag(0x0062, 0x000E), "US", "Maximum Fractional Value"),
    SegmentedPropertyTypeCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0062, 0x000F), "SQ", "Segmented Property Type Code Sequence"),
    SegmentationFractionalType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0062, 0x0010), "CS", "Segmentation Fractional Type"),
    SegmentedPropertyTypeModifierCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0062, 0x0011), "SQ", "Segmented Property Type Modifier Code Sequence"),
    UsedSegmentsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0062, 0x0012), "SQ", "Used Segments Sequence"),
    TrackingID: new TagDescriptor<"UT", string>(
        new Tag(0x0062, 0x0020), "UT", "Tracking ID"),
    TrackingUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0062, 0x0021), "UI", "Tracking UID"),

    // Group 0x0064

    DeformableRegistrationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0064, 0x0002), "SQ", "Deformable Registration Sequence"),
    SourceFrameOfReferenceUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0064, 0x0003), "UI", "Source Frame of Reference UID"),
    DeformableRegistrationGridSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0064, 0x0005), "SQ", "Deformable Registration Grid Sequence"),
    GridDimensions: new TagDescriptor<"UL", number[]>(
        new Tag(0x0064, 0x0007), "UL", "Grid Dimensions"),
    GridResolution: new TagDescriptor<"FD", number[]>(
        new Tag(0x0064, 0x0008), "FD", "Grid Resolution"),
    VectorGridData: new TagDescriptor<"OF", Float32Array | LazyValue<Float32Array>>(
        new Tag(0x0064, 0x0009), "OF", "Vector Grid Data"),
    PreDeformationMatrixRegistrationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0064, 0x000F), "SQ", "Pre Deformation Matrix Registration Sequence"),
    PostDeformationMatrixRegistrationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0064, 0x0010), "SQ", "Post Deformation Matrix Registration Sequence"),

    // Group 0x0066

    NumberOfSurfaces: new TagDescriptor<"UL", number[]>(
        new Tag(0x0066, 0x0001), "UL", "Number of Surfaces"),
    SurfaceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0066, 0x0002), "SQ", "Surface Sequence"),
    SurfaceNumber: new TagDescriptor<"UL", number[]>(
        new Tag(0x0066, 0x0003), "UL", "Surface Number"),
    SurfaceComments: new TagDescriptor<"LT", string>(
        new Tag(0x0066, 0x0004), "LT", "Surface Comments"),
    SurfaceProcessing: new TagDescriptor<"CS", string[]>(
        new Tag(0x0066, 0x0009), "CS", "Surface Processing"),
    SurfaceProcessingRatio: new TagDescriptor<"FL", number[]>(
        new Tag(0x0066, 0x000A), "FL", "Surface Processing Ratio"),
    SurfaceProcessingDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0066, 0x000B), "LO", "Surface Processing Description"),
    RecommendedPresentationOpacity: new TagDescriptor<"FL", number[]>(
        new Tag(0x0066, 0x000C), "FL", "Recommended Presentation Opacity"),
    RecommendedPresentationType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0066, 0x000D), "CS", "Recommended Presentation Type"),
    FiniteVolume: new TagDescriptor<"CS", string[]>(
        new Tag(0x0066, 0x000E), "CS", "Finite Volume"),
    Manifold: new TagDescriptor<"CS", string[]>(
        new Tag(0x0066, 0x0010), "CS", "Manifold"),
    SurfacePointsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0066, 0x0011), "SQ", "Surface Points Sequence"),
    SurfacePointsNormalsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0066, 0x0012), "SQ", "Surface Points Normals Sequence"),
    SurfaceMeshPrimitivesSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0066, 0x0013), "SQ", "Surface Mesh Primitives Sequence"),
    NumberOfSurfacePoints: new TagDescriptor<"UL", number[]>(
        new Tag(0x0066, 0x0015), "UL", "Number of Surface Points"),
    PointCoordinatesData: new TagDescriptor<"OF", Float32Array | LazyValue<Float32Array>>(
        new Tag(0x0066, 0x0016), "OF", "Point Coordinates Data"),
    PointPositionAccuracy: new TagDescriptor<"FL", number[]>(
        new Tag(0x0066, 0x0017), "FL", "Point Position Accuracy"),
    MeanPointDistance: new TagDescriptor<"FL", number[]>(
        new Tag(0x0066, 0x0018), "FL", "Mean Point Distance"),
    MaximumPointDistance: new TagDescriptor<"FL", number[]>(
        new Tag(0x0066, 0x0019), "FL", "Maximum Point Distance"),
    PointsBoundingBoxCoordinates: new TagDescriptor<"FL", number[]>(
        new Tag(0x0066, 0x001A), "FL", "Points Bounding Box Coordinates"),
    AxisOfRotation: new TagDescriptor<"FL", number[]>(
        new Tag(0x0066, 0x001B), "FL", "Axis of Rotation"),
    CenterOfRotation: new TagDescriptor<"FL", number[]>(
        new Tag(0x0066, 0x001C), "FL", "Center of Rotation"),
    NumberOfVectors: new TagDescriptor<"UL", number[]>(
        new Tag(0x0066, 0x001E), "UL", "Number of Vectors"),
    VectorDimensionality: new TagDescriptor<"US", number[]>(
        new Tag(0x0066, 0x001F), "US", "Vector Dimensionality"),
    VectorAccuracy: new TagDescriptor<"FL", number[]>(
        new Tag(0x0066, 0x0020), "FL", "Vector Accuracy"),
    VectorCoordinateData: new TagDescriptor<"OF", Float32Array | LazyValue<Float32Array>>(
        new Tag(0x0066, 0x0021), "OF", "Vector Coordinate Data"),
    TrianglePointIndexList: new TagDescriptor<"OW", Uint16Array | LazyValue<Uint16Array>>(
        new Tag(0x0066, 0x0023), "OW", "Triangle Point Index List"),
    EdgePointIndexList: new TagDescriptor<"OW", Uint16Array | LazyValue<Uint16Array>>(
        new Tag(0x0066, 0x0024), "OW", "Edge Point Index List"),
    VertexPointIndexList: new TagDescriptor<"OW", Uint16Array | LazyValue<Uint16Array>>(
        new Tag(0x0066, 0x0025), "OW", "Vertex Point Index List"),
    TriangleStripSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0066, 0x0026), "SQ", "Triangle Strip Sequence"),
    TriangleFanSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0066, 0x0027), "SQ", "Triangle Fan Sequence"),
    LineSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0066, 0x0028), "SQ", "Line Sequence"),
    PrimitivePointIndexList: new TagDescriptor<"OW", Uint16Array | LazyValue<Uint16Array>>(
        new Tag(0x0066, 0x0029), "OW", "Primitive Point Index List"),
    SurfaceCount: new TagDescriptor<"UL", number[]>(
        new Tag(0x0066, 0x002A), "UL", "Surface Count"),
    ReferencedSurfaceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0066, 0x002B), "SQ", "Referenced Surface Sequence"),
    ReferencedSurfaceNumber: new TagDescriptor<"UL", number[]>(
        new Tag(0x0066, 0x002C), "UL", "Referenced Surface Number"),
    SegmentSurfaceGenerationAlgorithmIdentificationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0066, 0x002D), "SQ", "Segment Surface Generation Algorithm Identification Sequence"),
    SegmentSurfaceSourceInstanceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0066, 0x002E), "SQ", "Segment Surface Source Instance Sequence"),
    AlgorithmFamilyCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0066, 0x002F), "SQ", "Algorithm Family Code Sequence"),
    AlgorithmNameCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0066, 0x0030), "SQ", "Algorithm Name Code Sequence"),
    AlgorithmVersion: new TagDescriptor<"LO", string[]>(
        new Tag(0x0066, 0x0031), "LO", "Algorithm Version"),
    AlgorithmParameters: new TagDescriptor<"LT", string>(
        new Tag(0x0066, 0x0032), "LT", "Algorithm Parameters"),
    FacetSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0066, 0x0034), "SQ", "Facet Sequence"),
    SurfaceProcessingAlgorithmIdentificationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0066, 0x0035), "SQ", "Surface Processing Algorithm Identification Sequence"),
    AlgorithmName: new TagDescriptor<"LO", string[]>(
        new Tag(0x0066, 0x0036), "LO", "Algorithm Name"),
    RecommendedPointRadius: new TagDescriptor<"FL", number[]>(
        new Tag(0x0066, 0x0037), "FL", "Recommended Point Radius"),
    RecommendedLineThickness: new TagDescriptor<"FL", number[]>(
        new Tag(0x0066, 0x0038), "FL", "Recommended Line Thickness"),
    LongPrimitivePointIndexList: new TagDescriptor<"OL", undefined>(
        new Tag(0x0066, 0x0040), "OL", "Long Primitive Point Index List"),
    LongTrianglePointIndexList: new TagDescriptor<"OL", undefined>(
        new Tag(0x0066, 0x0041), "OL", "Long Triangle Point Index List"),
    LongEdgePointIndexList: new TagDescriptor<"OL", undefined>(
        new Tag(0x0066, 0x0042), "OL", "Long Edge Point Index List"),
    LongVertexPointIndexList: new TagDescriptor<"OL", undefined>(
        new Tag(0x0066, 0x0043), "OL", "Long Vertex Point Index List"),
    TrackSetSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0066, 0x0101), "SQ", "Track Set Sequence"),
    TrackSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0066, 0x0102), "SQ", "Track Sequence"),
    RecommendedDisplayCIELabValueList: new TagDescriptor<"OW", Uint16Array | LazyValue<Uint16Array>>(
        new Tag(0x0066, 0x0103), "OW", "Recommended Display CIELab Value List"),
    TrackingAlgorithmIdentificationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0066, 0x0104), "SQ", "Tracking Algorithm Identification Sequence"),
    TrackSetNumber: new TagDescriptor<"UL", number[]>(
        new Tag(0x0066, 0x0105), "UL", "Track Set Number"),
    TrackSetLabel: new TagDescriptor<"LO", string[]>(
        new Tag(0x0066, 0x0106), "LO", "Track Set Label"),
    TrackSetDescription: new TagDescriptor<"UT", string>(
        new Tag(0x0066, 0x0107), "UT", "Track Set Description"),
    TrackSetAnatomicalTypeCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0066, 0x0108), "SQ", "Track Set Anatomical Type Code Sequence"),
    MeasurementsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0066, 0x0121), "SQ", "Measurements Sequence"),
    TrackSetStatisticsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0066, 0x0124), "SQ", "Track Set Statistics Sequence"),
    FloatingPointValues: new TagDescriptor<"OF", Float32Array | LazyValue<Float32Array>>(
        new Tag(0x0066, 0x0125), "OF", "Floating Point Values"),
    TrackPointIndexList: new TagDescriptor<"OL", undefined>(
        new Tag(0x0066, 0x0129), "OL", "Track Point Index List"),
    TrackStatisticsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0066, 0x0130), "SQ", "Track Statistics Sequence"),
    MeasurementValuesSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0066, 0x0132), "SQ", "Measurement Values Sequence"),
    DiffusionAcquisitionCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0066, 0x0133), "SQ", "Diffusion Acquisition Code Sequence"),
    DiffusionModelCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0066, 0x0134), "SQ", "Diffusion Model Code Sequence"),

    // Group 0x0068

    ImplantSize: new TagDescriptor<"LO", string[]>(
        new Tag(0x0068, 0x6210), "LO", "Implant Size"),
    ImplantTemplateVersion: new TagDescriptor<"LO", string[]>(
        new Tag(0x0068, 0x6221), "LO", "Implant Template Version"),
    ReplacedImplantTemplateSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0068, 0x6222), "SQ", "Replaced Implant Template Sequence"),
    ImplantType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0068, 0x6223), "CS", "Implant Type"),
    DerivationImplantTemplateSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0068, 0x6224), "SQ", "Derivation Implant Template Sequence"),
    OriginalImplantTemplateSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0068, 0x6225), "SQ", "Original Implant Template Sequence"),
    EffectiveDateTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x0068, 0x6226), "DT", "Effective DateTime"),
    ImplantTargetAnatomySequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0068, 0x6230), "SQ", "Implant Target Anatomy Sequence"),
    InformationFromManufacturerSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0068, 0x6260), "SQ", "Information From Manufacturer Sequence"),
    NotificationFromManufacturerSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0068, 0x6265), "SQ", "Notification From Manufacturer Sequence"),
    InformationIssueDateTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x0068, 0x6270), "DT", "Information Issue DateTime"),
    InformationSummary: new TagDescriptor<"ST", string>(
        new Tag(0x0068, 0x6280), "ST", "Information Summary"),
    ImplantRegulatoryDisapprovalCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0068, 0x62A0), "SQ", "Implant Regulatory Disapproval Code Sequence"),
    OverallTemplateSpatialTolerance: new TagDescriptor<"FD", number[]>(
        new Tag(0x0068, 0x62A5), "FD", "Overall Template Spatial Tolerance"),
    HPGLDocumentSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0068, 0x62C0), "SQ", "HPGL Document Sequence"),
    HPGLDocumentID: new TagDescriptor<"US", number[]>(
        new Tag(0x0068, 0x62D0), "US", "HPGL Document ID"),
    HPGLDocumentLabel: new TagDescriptor<"LO", string[]>(
        new Tag(0x0068, 0x62D5), "LO", "HPGL Document Label"),
    ViewOrientationCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0068, 0x62E0), "SQ", "View Orientation Code Sequence"),
    ViewOrientationModifierCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0068, 0x62F0), "SQ", "View Orientation Modifier Code Sequence"),
    HPGLDocumentScaling: new TagDescriptor<"FD", number[]>(
        new Tag(0x0068, 0x62F2), "FD", "HPGL Document Scaling"),
    HPGLDocument: new TagDescriptor<"OB", Uint8Array | LazyValue<Uint8Array>>(
        new Tag(0x0068, 0x6300), "OB", "HPGL Document"),
    HPGLContourPenNumber: new TagDescriptor<"US", number[]>(
        new Tag(0x0068, 0x6310), "US", "HPGL Contour Pen Number"),
    HPGLPenSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0068, 0x6320), "SQ", "HPGL Pen Sequence"),
    HPGLPenNumber: new TagDescriptor<"US", number[]>(
        new Tag(0x0068, 0x6330), "US", "HPGL Pen Number"),
    HPGLPenLabel: new TagDescriptor<"LO", string[]>(
        new Tag(0x0068, 0x6340), "LO", "HPGL Pen Label"),
    HPGLPenDescription: new TagDescriptor<"ST", string>(
        new Tag(0x0068, 0x6345), "ST", "HPGL Pen Description"),
    RecommendedRotationPoint: new TagDescriptor<"FD", number[]>(
        new Tag(0x0068, 0x6346), "FD", "Recommended Rotation Point"),
    BoundingRectangle: new TagDescriptor<"FD", number[]>(
        new Tag(0x0068, 0x6347), "FD", "Bounding Rectangle"),
    ImplantTemplate3DModelSurfaceNumber: new TagDescriptor<"US", number[]>(
        new Tag(0x0068, 0x6350), "US", "Implant Template 3D Model Surface Number"),
    SurfaceModelDescriptionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0068, 0x6360), "SQ", "Surface Model Description Sequence"),
    SurfaceModelLabel: new TagDescriptor<"LO", string[]>(
        new Tag(0x0068, 0x6380), "LO", "Surface Model Label"),
    SurfaceModelScalingFactor: new TagDescriptor<"FD", number[]>(
        new Tag(0x0068, 0x6390), "FD", "Surface Model Scaling Factor"),
    MaterialsCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0068, 0x63A0), "SQ", "Materials Code Sequence"),
    CoatingMaterialsCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0068, 0x63A4), "SQ", "Coating Materials Code Sequence"),
    ImplantTypeCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0068, 0x63A8), "SQ", "Implant Type Code Sequence"),
    FixationMethodCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0068, 0x63AC), "SQ", "Fixation Method Code Sequence"),
    MatingFeatureSetsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0068, 0x63B0), "SQ", "Mating Feature Sets Sequence"),
    MatingFeatureSetID: new TagDescriptor<"US", number[]>(
        new Tag(0x0068, 0x63C0), "US", "Mating Feature Set ID"),
    MatingFeatureSetLabel: new TagDescriptor<"LO", string[]>(
        new Tag(0x0068, 0x63D0), "LO", "Mating Feature Set Label"),
    MatingFeatureSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0068, 0x63E0), "SQ", "Mating Feature Sequence"),
    MatingFeatureID: new TagDescriptor<"US", number[]>(
        new Tag(0x0068, 0x63F0), "US", "Mating Feature ID"),
    MatingFeatureDegreeOfFreedomSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0068, 0x6400), "SQ", "Mating Feature Degree of Freedom Sequence"),
    DegreeOfFreedomID: new TagDescriptor<"US", number[]>(
        new Tag(0x0068, 0x6410), "US", "Degree of Freedom ID"),
    DegreeOfFreedomType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0068, 0x6420), "CS", "Degree of Freedom Type"),
    TwoDMatingFeatureCoordinatesSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0068, 0x6430), "SQ", "2D Mating Feature Coordinates Sequence"),
    ReferencedHPGLDocumentID: new TagDescriptor<"US", number[]>(
        new Tag(0x0068, 0x6440), "US", "Referenced HPGL Document ID"),
    TwoDMatingPoint: new TagDescriptor<"FD", number[]>(
        new Tag(0x0068, 0x6450), "FD", "2D Mating Point"),
    TwoDMatingAxes: new TagDescriptor<"FD", number[]>(
        new Tag(0x0068, 0x6460), "FD", "2D Mating Axes"),
    TwoDDegreeOfFreedomSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0068, 0x6470), "SQ", "2D Degree of Freedom Sequence"),
    ThreeDDegreeOfFreedomAxis: new TagDescriptor<"FD", number[]>(
        new Tag(0x0068, 0x6490), "FD", "3D Degree of Freedom Axis"),
    RangeOfFreedom: new TagDescriptor<"FD", number[]>(
        new Tag(0x0068, 0x64A0), "FD", "Range of Freedom"),
    ThreeDMatingPoint: new TagDescriptor<"FD", number[]>(
        new Tag(0x0068, 0x64C0), "FD", "3D Mating Point"),
    ThreeDMatingAxes: new TagDescriptor<"FD", number[]>(
        new Tag(0x0068, 0x64D0), "FD", "3D Mating Axes"),
    TwoDDegreeOfFreedomAxis: new TagDescriptor<"FD", number[]>(
        new Tag(0x0068, 0x64F0), "FD", "2D Degree of Freedom Axis"),
    PlanningLandmarkPointSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0068, 0x6500), "SQ", "Planning Landmark Point Sequence"),
    PlanningLandmarkLineSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0068, 0x6510), "SQ", "Planning Landmark Line Sequence"),
    PlanningLandmarkPlaneSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0068, 0x6520), "SQ", "Planning Landmark Plane Sequence"),
    PlanningLandmarkID: new TagDescriptor<"US", number[]>(
        new Tag(0x0068, 0x6530), "US", "Planning Landmark ID"),
    PlanningLandmarkDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0068, 0x6540), "LO", "Planning Landmark Description"),
    PlanningLandmarkIdentificationCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0068, 0x6545), "SQ", "Planning Landmark Identification Code Sequence"),
    TwoDPointCoordinatesSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0068, 0x6550), "SQ", "2D Point Coordinates Sequence"),
    TwoDPointCoordinates: new TagDescriptor<"FD", number[]>(
        new Tag(0x0068, 0x6560), "FD", "2D Point Coordinates"),
    ThreeDPointCoordinates: new TagDescriptor<"FD", number[]>(
        new Tag(0x0068, 0x6590), "FD", "3D Point Coordinates"),
    TwoDLineCoordinatesSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0068, 0x65A0), "SQ", "2D Line Coordinates Sequence"),
    TwoDLineCoordinates: new TagDescriptor<"FD", number[]>(
        new Tag(0x0068, 0x65B0), "FD", "2D Line Coordinates"),
    ThreeDLineCoordinates: new TagDescriptor<"FD", number[]>(
        new Tag(0x0068, 0x65D0), "FD", "3D Line Coordinates"),
    TwoDPlaneCoordinatesSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0068, 0x65E0), "SQ", "2D Plane Coordinates Sequence"),
    TwoDPlaneIntersection: new TagDescriptor<"FD", number[]>(
        new Tag(0x0068, 0x65F0), "FD", "2D Plane Intersection"),
    ThreeDPlaneOrigin: new TagDescriptor<"FD", number[]>(
        new Tag(0x0068, 0x6610), "FD", "3D Plane Origin"),
    ThreeDPlaneNormal: new TagDescriptor<"FD", number[]>(
        new Tag(0x0068, 0x6620), "FD", "3D Plane Normal"),
    ModelModification: new TagDescriptor<"CS", string[]>(
        new Tag(0x0068, 0x7001), "CS", "Model Modification"),
    ModelMirroring: new TagDescriptor<"CS", string[]>(
        new Tag(0x0068, 0x7002), "CS", "Model Mirroring"),
    ModelUsageCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0068, 0x7003), "SQ", "Model Usage Code Sequence"),

    // Group 0x0070

    GraphicAnnotationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x0001), "SQ", "Graphic Annotation Sequence"),
    GraphicLayer: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x0002), "CS", "Graphic Layer"),
    BoundingBoxAnnotationUnits: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x0003), "CS", "Bounding Box Annotation Units"),
    AnchorPointAnnotationUnits: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x0004), "CS", "Anchor Point Annotation Units"),
    GraphicAnnotationUnits: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x0005), "CS", "Graphic Annotation Units"),
    UnformattedTextValue: new TagDescriptor<"ST", string>(
        new Tag(0x0070, 0x0006), "ST", "Unformatted Text Value"),
    TextObjectSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x0008), "SQ", "Text Object Sequence"),
    GraphicObjectSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x0009), "SQ", "Graphic Object Sequence"),
    BoundingBoxTopLeftHandCorner: new TagDescriptor<"FL", number[]>(
        new Tag(0x0070, 0x0010), "FL", "Bounding Box Top Left Hand Corner"),
    BoundingBoxBottomRightHandCorner: new TagDescriptor<"FL", number[]>(
        new Tag(0x0070, 0x0011), "FL", "Bounding Box Bottom Right Hand Corner"),
    BoundingBoxTextHorizontalJustification: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x0012), "CS", "Bounding Box Text Horizontal Justification"),
    AnchorPoint: new TagDescriptor<"FL", number[]>(
        new Tag(0x0070, 0x0014), "FL", "Anchor Point"),
    AnchorPointVisibility: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x0015), "CS", "Anchor Point Visibility"),
    GraphicDimensions: new TagDescriptor<"US", number[]>(
        new Tag(0x0070, 0x0020), "US", "Graphic Dimensions"),
    NumberOfGraphicPoints: new TagDescriptor<"US", number[]>(
        new Tag(0x0070, 0x0021), "US", "Number of Graphic Points"),
    GraphicData: new TagDescriptor<"FL", number[]>(
        new Tag(0x0070, 0x0022), "FL", "Graphic Data"),
    GraphicType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x0023), "CS", "Graphic Type"),
    GraphicFilled: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x0024), "CS", "Graphic Filled"),
    ImageRotationRetired: new TagDescriptor<"IS", number[]>(
        new Tag(0x0070, 0x0040), "IS", "Image Rotation (Retired)"),
    ImageHorizontalFlip: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x0041), "CS", "Image Horizontal Flip"),
    ImageRotation: new TagDescriptor<"US", number[]>(
        new Tag(0x0070, 0x0042), "US", "Image Rotation"),
    DisplayedAreaTopLeftHandCornerTrial: new TagDescriptor<"US", number[]>(
        new Tag(0x0070, 0x0050), "US", "Displayed Area Top Left Hand Corner (Trial)"),
    DisplayedAreaBottomRightHandCornerTrial: new TagDescriptor<"US", number[]>(
        new Tag(0x0070, 0x0051), "US", "Displayed Area Bottom Right Hand Corner (Trial)"),
    DisplayedAreaTopLeftHandCorner: new TagDescriptor<"SL", number[]>(
        new Tag(0x0070, 0x0052), "SL", "Displayed Area Top Left Hand Corner"),
    DisplayedAreaBottomRightHandCorner: new TagDescriptor<"SL", number[]>(
        new Tag(0x0070, 0x0053), "SL", "Displayed Area Bottom Right Hand Corner"),
    DisplayedAreaSelectionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x005A), "SQ", "Displayed Area Selection Sequence"),
    GraphicLayerSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x0060), "SQ", "Graphic Layer Sequence"),
    GraphicLayerOrder: new TagDescriptor<"IS", number[]>(
        new Tag(0x0070, 0x0062), "IS", "Graphic Layer Order"),
    GraphicLayerRecommendedDisplayGrayscaleValue: new TagDescriptor<"US", number[]>(
        new Tag(0x0070, 0x0066), "US", "Graphic Layer Recommended Display Grayscale Value"),
    GraphicLayerRecommendedDisplayRGBValue: new TagDescriptor<"US", number[]>(
        new Tag(0x0070, 0x0067), "US", "Graphic Layer Recommended Display RGB Value"),
    GraphicLayerDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0070, 0x0068), "LO", "Graphic Layer Description"),
    ContentLabel: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x0080), "CS", "Content Label"),
    ContentDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0070, 0x0081), "LO", "Content Description"),
    PresentationCreationDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x0070, 0x0082), "DA", "Presentation Creation Date"),
    PresentationCreationTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x0070, 0x0083), "TM", "Presentation Creation Time"),
    ContentCreatorName: new TagDescriptor<"PN", string[]>(
        new Tag(0x0070, 0x0084), "PN", "Content Creator's Name"),
    ContentCreatorIdentificationCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x0086), "SQ", "Content Creator's Identification Code Sequence"),
    AlternateContentDescriptionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x0087), "SQ", "Alternate Content Description Sequence"),
    PresentationSizeMode: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x0100), "CS", "Presentation Size Mode"),
    PresentationPixelSpacing: new TagDescriptor<"DS", number[]>(
        new Tag(0x0070, 0x0101), "DS", "Presentation Pixel Spacing"),
    PresentationPixelAspectRatio: new TagDescriptor<"IS", number[]>(
        new Tag(0x0070, 0x0102), "IS", "Presentation Pixel Aspect Ratio"),
    PresentationPixelMagnificationRatio: new TagDescriptor<"FL", number[]>(
        new Tag(0x0070, 0x0103), "FL", "Presentation Pixel Magnification Ratio"),
    GraphicGroupLabel: new TagDescriptor<"LO", string[]>(
        new Tag(0x0070, 0x0207), "LO", "Graphic Group Label"),
    GraphicGroupDescription: new TagDescriptor<"ST", string>(
        new Tag(0x0070, 0x0208), "ST", "Graphic Group Description"),
    CompoundGraphicSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x0209), "SQ", "Compound Graphic Sequence"),
    CompoundGraphicInstanceID: new TagDescriptor<"UL", number[]>(
        new Tag(0x0070, 0x0226), "UL", "Compound Graphic Instance ID"),
    FontName: new TagDescriptor<"LO", string[]>(
        new Tag(0x0070, 0x0227), "LO", "Font Name"),
    FontNameType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x0228), "CS", "Font Name Type"),
    CSSFontName: new TagDescriptor<"LO", string[]>(
        new Tag(0x0070, 0x0229), "LO", "CSS Font Name"),
    RotationAngle: new TagDescriptor<"FD", number[]>(
        new Tag(0x0070, 0x0230), "FD", "Rotation Angle"),
    TextStyleSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x0231), "SQ", "Text Style Sequence"),
    LineStyleSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x0232), "SQ", "Line Style Sequence"),
    FillStyleSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x0233), "SQ", "Fill Style Sequence"),
    GraphicGroupSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x0234), "SQ", "Graphic Group Sequence"),
    TextColorCIELabValue: new TagDescriptor<"US", number[]>(
        new Tag(0x0070, 0x0241), "US", "Text Color CIELab Value"),
    HorizontalAlignment: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x0242), "CS", "Horizontal Alignment"),
    VerticalAlignment: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x0243), "CS", "Vertical Alignment"),
    ShadowStyle: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x0244), "CS", "Shadow Style"),
    ShadowOffsetX: new TagDescriptor<"FL", number[]>(
        new Tag(0x0070, 0x0245), "FL", "Shadow Offset X"),
    ShadowOffsetY: new TagDescriptor<"FL", number[]>(
        new Tag(0x0070, 0x0246), "FL", "Shadow Offset Y"),
    ShadowColorCIELabValue: new TagDescriptor<"US", number[]>(
        new Tag(0x0070, 0x0247), "US", "Shadow Color CIELab Value"),
    Underlined: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x0248), "CS", "Underlined"),
    Bold: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x0249), "CS", "Bold"),
    Italic: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x0250), "CS", "Italic"),
    PatternOnColorCIELabValue: new TagDescriptor<"US", number[]>(
        new Tag(0x0070, 0x0251), "US", "Pattern On Color CIELab Value"),
    PatternOffColorCIELabValue: new TagDescriptor<"US", number[]>(
        new Tag(0x0070, 0x0252), "US", "Pattern Off Color CIELab Value"),
    LineThickness: new TagDescriptor<"FL", number[]>(
        new Tag(0x0070, 0x0253), "FL", "Line Thickness"),
    LineDashingStyle: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x0254), "CS", "Line Dashing Style"),
    LinePattern: new TagDescriptor<"UL", number[]>(
        new Tag(0x0070, 0x0255), "UL", "Line Pattern"),
    FillPattern: new TagDescriptor<"OB", Uint8Array | LazyValue<Uint8Array>>(
        new Tag(0x0070, 0x0256), "OB", "Fill Pattern"),
    FillMode: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x0257), "CS", "Fill Mode"),
    ShadowOpacity: new TagDescriptor<"FL", number[]>(
        new Tag(0x0070, 0x0258), "FL", "Shadow Opacity"),
    GapLength: new TagDescriptor<"FL", number[]>(
        new Tag(0x0070, 0x0261), "FL", "Gap Length"),
    DiameterOfVisibility: new TagDescriptor<"FL", number[]>(
        new Tag(0x0070, 0x0262), "FL", "Diameter of Visibility"),
    RotationPoint: new TagDescriptor<"FL", number[]>(
        new Tag(0x0070, 0x0273), "FL", "Rotation Point"),
    TickAlignment: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x0274), "CS", "Tick Alignment"),
    ShowTickLabel: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x0278), "CS", "Show Tick Label"),
    TickLabelAlignment: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x0279), "CS", "Tick Label Alignment"),
    CompoundGraphicUnits: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x0282), "CS", "Compound Graphic Units"),
    PatternOnOpacity: new TagDescriptor<"FL", number[]>(
        new Tag(0x0070, 0x0284), "FL", "Pattern On Opacity"),
    PatternOffOpacity: new TagDescriptor<"FL", number[]>(
        new Tag(0x0070, 0x0285), "FL", "Pattern Off Opacity"),
    MajorTicksSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x0287), "SQ", "Major Ticks Sequence"),
    TickPosition: new TagDescriptor<"FL", number[]>(
        new Tag(0x0070, 0x0288), "FL", "Tick Position"),
    TickLabel: new TagDescriptor<"SH", string[]>(
        new Tag(0x0070, 0x0289), "SH", "Tick Label"),
    CompoundGraphicType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x0294), "CS", "Compound Graphic Type"),
    GraphicGroupID: new TagDescriptor<"UL", number[]>(
        new Tag(0x0070, 0x0295), "UL", "Graphic Group ID"),
    ShapeType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x0306), "CS", "Shape Type"),
    RegistrationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x0308), "SQ", "Registration Sequence"),
    MatrixRegistrationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x0309), "SQ", "Matrix Registration Sequence"),
    MatrixSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x030A), "SQ", "Matrix Sequence"),
    FrameOfReferenceToDisplayedCoordinateSystemTransformationMatrix: new TagDescriptor<"FD", number[]>(
        new Tag(0x0070, 0x030B), "FD", "Frame of Reference to Displayed Coordinate System Transformation Matrix"),
    FrameOfReferenceTransformationMatrixType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x030C), "CS", "Frame of Reference Transformation Matrix Type"),
    RegistrationTypeCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x030D), "SQ", "Registration Type Code Sequence"),
    FiducialDescription: new TagDescriptor<"ST", string>(
        new Tag(0x0070, 0x030F), "ST", "Fiducial Description"),
    FiducialIdentifier: new TagDescriptor<"SH", string[]>(
        new Tag(0x0070, 0x0310), "SH", "Fiducial Identifier"),
    FiducialIdentifierCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x0311), "SQ", "Fiducial Identifier Code Sequence"),
    ContourUncertaintyRadius: new TagDescriptor<"FD", number[]>(
        new Tag(0x0070, 0x0312), "FD", "Contour Uncertainty Radius"),
    UsedFiducialsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x0314), "SQ", "Used Fiducials Sequence"),
    GraphicCoordinatesDataSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x0318), "SQ", "Graphic Coordinates Data Sequence"),
    FiducialUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0070, 0x031A), "UI", "Fiducial UID"),
    ReferencedFiducialUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0070, 0x031B), "UI", "Referenced Fiducial UID"),
    FiducialSetSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x031C), "SQ", "Fiducial Set Sequence"),
    FiducialSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x031E), "SQ", "Fiducial Sequence"),
    FiducialsPropertyCategoryCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x031F), "SQ", "Fiducials Property Category Code Sequence"),
    GraphicLayerRecommendedDisplayCIELabValue: new TagDescriptor<"US", number[]>(
        new Tag(0x0070, 0x0401), "US", "Graphic Layer Recommended Display CIELab Value"),
    BlendingSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x0402), "SQ", "Blending Sequence"),
    RelativeOpacity: new TagDescriptor<"FL", number[]>(
        new Tag(0x0070, 0x0403), "FL", "Relative Opacity"),
    ReferencedSpatialRegistrationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x0404), "SQ", "Referenced Spatial Registration Sequence"),
    BlendingPosition: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x0405), "CS", "Blending Position"),
    PresentationDisplayCollectionUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0070, 0x1101), "UI", "Presentation Display Collection UID"),
    PresentationSequenceCollectionUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0070, 0x1102), "UI", "Presentation Sequence Collection UID"),
    PresentationSequencePositionIndex: new TagDescriptor<"US", number[]>(
        new Tag(0x0070, 0x1103), "US", "Presentation Sequence Position Index"),
    RenderedImageReferenceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x1104), "SQ", "Rendered Image Reference Sequence"),
    VolumetricPresentationStateInputSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x1201), "SQ", "Volumetric Presentation State Input Sequence"),
    PresentationInputType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x1202), "CS", "Presentation Input Type"),
    InputSequencePositionIndex: new TagDescriptor<"US", number[]>(
        new Tag(0x0070, 0x1203), "US", "Input Sequence Position Index"),
    Crop: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x1204), "CS", "Crop"),
    CroppingSpecificationIndex: new TagDescriptor<"US", number[]>(
        new Tag(0x0070, 0x1205), "US", "Cropping Specification Index"),
    CompositingMethod: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x1206), "CS", "Compositing Method"),
    VolumetricPresentationInputNumber: new TagDescriptor<"US", number[]>(
        new Tag(0x0070, 0x1207), "US", "Volumetric Presentation Input Number"),
    ImageVolumeGeometry: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x1208), "CS", "Image Volume Geometry"),
    VolumetricPresentationInputSetUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0070, 0x1209), "UI", "Volumetric Presentation Input Set UID"),
    VolumetricPresentationInputSetSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x120A), "SQ", "Volumetric Presentation Input Set Sequence"),
    GlobalCrop: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x120B), "CS", "Global Crop"),
    GlobalCroppingSpecificationIndex: new TagDescriptor<"US", number[]>(
        new Tag(0x0070, 0x120C), "US", "Global Cropping Specification Index"),
    RenderingMethod: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x120D), "CS", "Rendering Method"),
    VolumeCroppingSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x1301), "SQ", "Volume Cropping Sequence"),
    VolumeCroppingMethod: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x1302), "CS", "Volume Cropping Method"),
    BoundingBoxCrop: new TagDescriptor<"FD", number[]>(
        new Tag(0x0070, 0x1303), "FD", "Bounding Box Crop"),
    ObliqueCroppingPlaneSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x1304), "SQ", "Oblique Cropping Plane Sequence"),
    Plane: new TagDescriptor<"FD", number[]>(
        new Tag(0x0070, 0x1305), "FD", "Plane"),
    PlaneNormal: new TagDescriptor<"FD", number[]>(
        new Tag(0x0070, 0x1306), "FD", "Plane Normal"),
    CroppingSpecificationNumber: new TagDescriptor<"US", number[]>(
        new Tag(0x0070, 0x1309), "US", "Cropping Specification Number"),
    MultiPlanarReconstructionStyle: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x1501), "CS", "Multi-Planar Reconstruction Style"),
    MPRThicknessType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x1502), "CS", "MPR Thickness Type"),
    MPRSlabThickness: new TagDescriptor<"FD", number[]>(
        new Tag(0x0070, 0x1503), "FD", "MPR Slab Thickness"),
    MPRTopLeftHandCorner: new TagDescriptor<"FD", number[]>(
        new Tag(0x0070, 0x1505), "FD", "MPR Top Left Hand Corner"),
    MPRViewWidthDirection: new TagDescriptor<"FD", number[]>(
        new Tag(0x0070, 0x1507), "FD", "MPR View Width Direction"),
    MPRViewWidth: new TagDescriptor<"FD", number[]>(
        new Tag(0x0070, 0x1508), "FD", "MPR View Width"),
    NumberOfVolumetricCurvePoints: new TagDescriptor<"UL", number[]>(
        new Tag(0x0070, 0x150C), "UL", "Number of Volumetric Curve Points"),
    VolumetricCurvePoints: new TagDescriptor<"OD", Float64Array | LazyValue<Float64Array>>(
        new Tag(0x0070, 0x150D), "OD", "Volumetric Curve Points"),
    MPRViewHeightDirection: new TagDescriptor<"FD", number[]>(
        new Tag(0x0070, 0x1511), "FD", "MPR View Height Direction"),
    MPRViewHeight: new TagDescriptor<"FD", number[]>(
        new Tag(0x0070, 0x1512), "FD", "MPR View Height"),
    RenderProjection: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x1602), "CS", "Render Projection"),
    ViewpointPosition: new TagDescriptor<"FD", number[]>(
        new Tag(0x0070, 0x1603), "FD", "Viewpoint Position"),
    ViewpointLookAtPoint: new TagDescriptor<"FD", number[]>(
        new Tag(0x0070, 0x1604), "FD", "Viewpoint LookAt Point"),
    ViewpointUpDirection: new TagDescriptor<"FD", number[]>(
        new Tag(0x0070, 0x1605), "FD", "Viewpoint Up Direction"),
    RenderFieldOfView: new TagDescriptor<"FD", number[]>(
        new Tag(0x0070, 0x1606), "FD", "Render Field of View"),
    SamplingStepSize: new TagDescriptor<"FD", number[]>(
        new Tag(0x0070, 0x1607), "FD", "Sampling Step Size"),
    ShadingStyle: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x1701), "CS", "Shading Style"),
    AmbientReflectionIntensity: new TagDescriptor<"FD", number[]>(
        new Tag(0x0070, 0x1702), "FD", "Ambient Reflection Intensity"),
    LightDirection: new TagDescriptor<"FD", number[]>(
        new Tag(0x0070, 0x1703), "FD", "Light Direction"),
    DiffuseReflectionIntensity: new TagDescriptor<"FD", number[]>(
        new Tag(0x0070, 0x1704), "FD", "Diffuse Reflection Intensity"),
    SpecularReflectionIntensity: new TagDescriptor<"FD", number[]>(
        new Tag(0x0070, 0x1705), "FD", "Specular Reflection Intensity"),
    Shininess: new TagDescriptor<"FD", number[]>(
        new Tag(0x0070, 0x1706), "FD", "Shininess"),
    PresentationStateClassificationComponentSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x1801), "SQ", "Presentation State Classification Component Sequence"),
    ComponentType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x1802), "CS", "Component Type"),
    ComponentInputSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x1803), "SQ", "Component Input Sequence"),
    VolumetricPresentationInputIndex: new TagDescriptor<"US", number[]>(
        new Tag(0x0070, 0x1804), "US", "Volumetric Presentation Input Index"),
    PresentationStateCompositorComponentSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x1805), "SQ", "Presentation State Compositor Component Sequence"),
    WeightingTransferFunctionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x1806), "SQ", "Weighting Transfer Function Sequence"),
    WeightingLookupTableDescriptor: new TagDescriptor<"US", number[]>(
        new Tag(0x0070, 0x1807), "US", "Weighting Lookup Table Descriptor"),
    WeightingLookupTableData: new TagDescriptor<"OB", Uint8Array | LazyValue<Uint8Array>>(
        new Tag(0x0070, 0x1808), "OB", "Weighting Lookup Table Data"),
    VolumetricAnnotationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x1901), "SQ", "Volumetric Annotation Sequence"),
    ReferencedStructuredContextSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x1903), "SQ", "Referenced Structured Context Sequence"),
    ReferencedContentItem: new TagDescriptor<"UI", string[]>(
        new Tag(0x0070, 0x1904), "UI", "Referenced Content Item"),
    VolumetricPresentationInputAnnotationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x1905), "SQ", "Volumetric Presentation Input Annotation Sequence"),
    AnnotationClipping: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x1907), "CS", "Annotation Clipping"),
    PresentationAnimationStyle: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x1A01), "CS", "Presentation Animation Style"),
    RecommendedAnimationRate: new TagDescriptor<"FD", number[]>(
        new Tag(0x0070, 0x1A03), "FD", "Recommended Animation Rate"),
    AnimationCurveSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x1A04), "SQ", "Animation Curve Sequence"),
    AnimationStepSize: new TagDescriptor<"FD", number[]>(
        new Tag(0x0070, 0x1A05), "FD", "Animation Step Size"),
    SwivelRange: new TagDescriptor<"FD", number[]>(
        new Tag(0x0070, 0x1A06), "FD", "Swivel Range"),
    VolumetricCurveUpDirections: new TagDescriptor<"OD", Float64Array | LazyValue<Float64Array>>(
        new Tag(0x0070, 0x1A07), "OD", "Volumetric Curve Up Directions"),
    VolumeStreamSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x1A08), "SQ", "Volume Stream Sequence"),
    RGBATransferFunctionDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0070, 0x1A09), "LO", "RGBA Transfer Function Description"),
    AdvancedBlendingSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x1B01), "SQ", "Advanced Blending Sequence"),
    BlendingInputNumber: new TagDescriptor<"US", number[]>(
        new Tag(0x0070, 0x1B02), "US", "Blending Input Number"),
    BlendingDisplayInputSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x1B03), "SQ", "Blending Display Input Sequence"),
    BlendingDisplaySequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x1B04), "SQ", "Blending Display Sequence"),
    BlendingMode: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x1B06), "CS", "Blending Mode"),
    TimeSeriesBlending: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x1B07), "CS", "Time Series Blending"),
    GeometryForDisplay: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x1B08), "CS", "Geometry for Display"),
    ThresholdSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x1B11), "SQ", "Threshold Sequence"),
    ThresholdValueSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0070, 0x1B12), "SQ", "Threshold Value Sequence"),
    ThresholdType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0070, 0x1B13), "CS", "Threshold Type"),
    ThresholdValue: new TagDescriptor<"FD", number[]>(
        new Tag(0x0070, 0x1B14), "FD", "Threshold Value"),

    // Group 0x0072

    HangingProtocolName: new TagDescriptor<"SH", string[]>(
        new Tag(0x0072, 0x0002), "SH", "Hanging Protocol Name"),
    HangingProtocolDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0072, 0x0004), "LO", "Hanging Protocol Description"),
    HangingProtocolLevel: new TagDescriptor<"CS", string[]>(
        new Tag(0x0072, 0x0006), "CS", "Hanging Protocol Level"),
    HangingProtocolCreator: new TagDescriptor<"LO", string[]>(
        new Tag(0x0072, 0x0008), "LO", "Hanging Protocol Creator"),
    HangingProtocolCreationDateTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x0072, 0x000A), "DT", "Hanging Protocol Creation DateвЂ‹Time"),
    HangingProtocolDefinitionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0072, 0x000C), "SQ", "Hanging Protocol Definition Sequence"),
    HangingProtocolUserIdentificationCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0072, 0x000E), "SQ", "Hanging Protocol User Identification Code Sequence"),
    HangingProtocolUserGroupName: new TagDescriptor<"LO", string[]>(
        new Tag(0x0072, 0x0010), "LO", "Hanging Protocol User Group Name"),
    SourceHangingProtocolSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0072, 0x0012), "SQ", "Source Hanging Protocol Sequence"),
    NumberOfPriorsReferenced: new TagDescriptor<"US", number[]>(
        new Tag(0x0072, 0x0014), "US", "Number of Priors Referenced"),
    ImageSetsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0072, 0x0020), "SQ", "Image Sets Sequence"),
    ImageSetSelectorSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0072, 0x0022), "SQ", "Image Set Selector Sequence"),
    ImageSetSelectorUsageFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0072, 0x0024), "CS", "Image Set Selector Usage Flag"),
    SelectorAttribute: new TagDescriptor<"AT", TagInterface[]>(
        new Tag(0x0072, 0x0026), "AT", "Selector Attribute"),
    SelectorValueNumber: new TagDescriptor<"US", number[]>(
        new Tag(0x0072, 0x0028), "US", "Selector Value Number"),
    TimeBasedImageSetsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0072, 0x0030), "SQ", "Time Based Image Sets Sequence"),
    ImageSetNumber: new TagDescriptor<"US", number[]>(
        new Tag(0x0072, 0x0032), "US", "Image Set Number"),
    ImageSetSelectorCategory: new TagDescriptor<"CS", string[]>(
        new Tag(0x0072, 0x0034), "CS", "Image Set Selector Category"),
    RelativeTime: new TagDescriptor<"US", number[]>(
        new Tag(0x0072, 0x0038), "US", "Relative Time"),
    RelativeTimeUnits: new TagDescriptor<"CS", string[]>(
        new Tag(0x0072, 0x003A), "CS", "Relative Time Units"),
    AbstractPriorValue: new TagDescriptor<"SS", number[]>(
        new Tag(0x0072, 0x003C), "SS", "Abstract Prior Value"),
    AbstractPriorCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0072, 0x003E), "SQ", "Abstract Prior Code Sequence"),
    ImageSetLabel: new TagDescriptor<"LO", string[]>(
        new Tag(0x0072, 0x0040), "LO", "Image Set Label"),
    SelectorAttributeVR: new TagDescriptor<"CS", string[]>(
        new Tag(0x0072, 0x0050), "CS", "Selector Attribute VR"),
    SelectorSequencePointer: new TagDescriptor<"AT", TagInterface[]>(
        new Tag(0x0072, 0x0052), "AT", "Selector Sequence Pointer"),
    SelectorSequencePointerPrivateCreator: new TagDescriptor<"LO", string[]>(
        new Tag(0x0072, 0x0054), "LO", "Selector Sequence Pointer Private Creator"),
    SelectorAttributePrivateCreator: new TagDescriptor<"LO", string[]>(
        new Tag(0x0072, 0x0056), "LO", "Selector Attribute Private Creator"),
    SelectorAEValue: new TagDescriptor<"AE", string[]>(
        new Tag(0x0072, 0x005E), "AE", "Selector AE Value"),
    SelectorASValue: new TagDescriptor<"AS", string[]>(
        new Tag(0x0072, 0x005F), "AS", "Selector AS Value"),
    SelectorATValue: new TagDescriptor<"AT", TagInterface[]>(
        new Tag(0x0072, 0x0060), "AT", "Selector AT Value"),
    SelectorDAValue: new TagDescriptor<"DA", string[]>(
        new Tag(0x0072, 0x0061), "DA", "Selector DA Value"),
    SelectorCSValue: new TagDescriptor<"CS", string[]>(
        new Tag(0x0072, 0x0062), "CS", "Selector CS Value"),
    SelectorDTValue: new TagDescriptor<"DT", string[]>(
        new Tag(0x0072, 0x0063), "DT", "Selector DT Value"),
    SelectorISValue: new TagDescriptor<"IS", number[]>(
        new Tag(0x0072, 0x0064), "IS", "Selector IS Value"),
    SelectorOBValue: new TagDescriptor<"OB", Uint8Array | LazyValue<Uint8Array>>(
        new Tag(0x0072, 0x0065), "OB", "Selector OB Value"),
    SelectorLOValue: new TagDescriptor<"LO", string[]>(
        new Tag(0x0072, 0x0066), "LO", "Selector LO Value"),
    SelectorOFValue: new TagDescriptor<"OF", Float32Array | LazyValue<Float32Array>>(
        new Tag(0x0072, 0x0067), "OF", "Selector OF Value"),
    SelectorLTValue: new TagDescriptor<"LT", string>(
        new Tag(0x0072, 0x0068), "LT", "Selector LT Value"),
    SelectorOWValue: new TagDescriptor<"OW", Uint16Array | LazyValue<Uint16Array>>(
        new Tag(0x0072, 0x0069), "OW", "Selector OW Value"),
    SelectorPNValue: new TagDescriptor<"PN", string[]>(
        new Tag(0x0072, 0x006A), "PN", "Selector PN Value"),
    SelectorTMValue: new TagDescriptor<"TM", string[]>(
        new Tag(0x0072, 0x006B), "TM", "Selector TM Value"),
    SelectorSHValue: new TagDescriptor<"SH", string[]>(
        new Tag(0x0072, 0x006C), "SH", "Selector SH Value"),
    SelectorUNValue: new TagDescriptor<"UN", undefined>(
        new Tag(0x0072, 0x006D), "UN", "Selector UN Value"),
    SelectorSTValue: new TagDescriptor<"ST", string>(
        new Tag(0x0072, 0x006E), "ST", "Selector ST Value"),
    SelectorUCValue: new TagDescriptor<"UC", string[]>(
        new Tag(0x0072, 0x006F), "UC", "Selector UC Value"),
    SelectorUTValue: new TagDescriptor<"UT", string>(
        new Tag(0x0072, 0x0070), "UT", "Selector UT Value"),
    SelectorURValue: new TagDescriptor<"UR", string>(
        new Tag(0x0072, 0x0071), "UR", "Selector UR Value"),
    SelectorDSValue: new TagDescriptor<"DS", number[]>(
        new Tag(0x0072, 0x0072), "DS", "Selector DS Value"),
    SelectorODValue: new TagDescriptor<"OD", Float64Array | LazyValue<Float64Array>>(
        new Tag(0x0072, 0x0073), "OD", "Selector OD Value"),
    SelectorFDValue: new TagDescriptor<"FD", number[]>(
        new Tag(0x0072, 0x0074), "FD", "Selector FD Value"),
    SelectorOLValue: new TagDescriptor<"OL", undefined>(
        new Tag(0x0072, 0x0075), "OL", "Selector OL Value"),
    SelectorFLValue: new TagDescriptor<"FL", number[]>(
        new Tag(0x0072, 0x0076), "FL", "Selector FL Value"),
    SelectorULValue: new TagDescriptor<"UL", number[]>(
        new Tag(0x0072, 0x0078), "UL", "Selector UL Value"),
    SelectorUSValue: new TagDescriptor<"US", number[]>(
        new Tag(0x0072, 0x007A), "US", "Selector US Value"),
    SelectorSLValue: new TagDescriptor<"SL", number[]>(
        new Tag(0x0072, 0x007C), "SL", "Selector SL Value"),
    SelectorSSValue: new TagDescriptor<"SS", number[]>(
        new Tag(0x0072, 0x007E), "SS", "Selector SS Value"),
    SelectorUIValue: new TagDescriptor<"UI", string[]>(
        new Tag(0x0072, 0x007F), "UI", "Selector UI Value"),
    SelectorCodeSequenceValue: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0072, 0x0080), "SQ", "Selector Code Sequence Value"),
    NumberOfScreens: new TagDescriptor<"US", number[]>(
        new Tag(0x0072, 0x0100), "US", "Number of Screens"),
    NominalScreenDefinitionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0072, 0x0102), "SQ", "Nominal Screen Definition Sequence"),
    NumberOfVerticalPixels: new TagDescriptor<"US", number[]>(
        new Tag(0x0072, 0x0104), "US", "Number of Vertical Pixels"),
    NumberOfHorizontalPixels: new TagDescriptor<"US", number[]>(
        new Tag(0x0072, 0x0106), "US", "Number of Horizontal Pixels"),
    DisplayEnvironmentSpatialPosition: new TagDescriptor<"FD", number[]>(
        new Tag(0x0072, 0x0108), "FD", "Display Environment Spatial Position"),
    ScreenMinimumGrayscaleBitDepth: new TagDescriptor<"US", number[]>(
        new Tag(0x0072, 0x010A), "US", "Screen Minimum Grayscale Bit Depth"),
    ScreenMinimumColorBitDepth: new TagDescriptor<"US", number[]>(
        new Tag(0x0072, 0x010C), "US", "Screen Minimum Color Bit Depth"),
    ApplicationMaximumRepaintTime: new TagDescriptor<"US", number[]>(
        new Tag(0x0072, 0x010E), "US", "Application Maximum Repaint Time"),
    DisplaySetsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0072, 0x0200), "SQ", "Display Sets Sequence"),
    DisplaySetNumber: new TagDescriptor<"US", number[]>(
        new Tag(0x0072, 0x0202), "US", "Display Set Number"),
    DisplaySetLabel: new TagDescriptor<"LO", string[]>(
        new Tag(0x0072, 0x0203), "LO", "Display Set Label"),
    DisplaySetPresentationGroup: new TagDescriptor<"US", number[]>(
        new Tag(0x0072, 0x0204), "US", "Display Set Presentation Group"),
    DisplaySetPresentationGroupDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0072, 0x0206), "LO", "Display Set Presentation Group Description"),
    PartialDataDisplayHandling: new TagDescriptor<"CS", string[]>(
        new Tag(0x0072, 0x0208), "CS", "Partial Data Display Handling"),
    SynchronizedScrollingSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0072, 0x0210), "SQ", "Synchronized Scrolling Sequence"),
    DisplaySetScrollingGroup: new TagDescriptor<"US", number[]>(
        new Tag(0x0072, 0x0212), "US", "Display Set Scrolling Group"),
    NavigationIndicatorSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0072, 0x0214), "SQ", "Navigation Indicator Sequence"),
    NavigationDisplaySet: new TagDescriptor<"US", number[]>(
        new Tag(0x0072, 0x0216), "US", "Navigation Display Set"),
    ReferenceDisplaySets: new TagDescriptor<"US", number[]>(
        new Tag(0x0072, 0x0218), "US", "Reference Display Sets"),
    ImageBoxesSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0072, 0x0300), "SQ", "Image Boxes Sequence"),
    ImageBoxNumber: new TagDescriptor<"US", number[]>(
        new Tag(0x0072, 0x0302), "US", "Image Box Number"),
    ImageBoxLayoutType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0072, 0x0304), "CS", "Image Box Layout Type"),
    ImageBoxTileHorizontalDimension: new TagDescriptor<"US", number[]>(
        new Tag(0x0072, 0x0306), "US", "Image Box Tile Horizontal Dimension"),
    ImageBoxTileVerticalDimension: new TagDescriptor<"US", number[]>(
        new Tag(0x0072, 0x0308), "US", "Image Box Tile Vertical Dimension"),
    ImageBoxScrollDirection: new TagDescriptor<"CS", string[]>(
        new Tag(0x0072, 0x0310), "CS", "Image Box Scroll Direction"),
    ImageBoxSmallScrollType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0072, 0x0312), "CS", "Image Box Small Scroll Type"),
    ImageBoxSmallScrollAmount: new TagDescriptor<"US", number[]>(
        new Tag(0x0072, 0x0314), "US", "Image Box Small Scroll Amount"),
    ImageBoxLargeScrollType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0072, 0x0316), "CS", "Image Box Large Scroll Type"),
    ImageBoxLargeScrollAmount: new TagDescriptor<"US", number[]>(
        new Tag(0x0072, 0x0318), "US", "Image Box Large Scroll Amount"),
    ImageBoxOverlapPriority: new TagDescriptor<"US", number[]>(
        new Tag(0x0072, 0x0320), "US", "Image Box Overlap Priority"),
    CineRelativeToRealTime: new TagDescriptor<"FD", number[]>(
        new Tag(0x0072, 0x0330), "FD", "Cine Relative to Real-Time"),
    FilterOperationsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0072, 0x0400), "SQ", "Filter Operations Sequence"),
    FilterByCategory: new TagDescriptor<"CS", string[]>(
        new Tag(0x0072, 0x0402), "CS", "Filter-by Category"),
    FilterByAttributePresence: new TagDescriptor<"CS", string[]>(
        new Tag(0x0072, 0x0404), "CS", "Filter-by Attribute Presence"),
    FilterByOperator: new TagDescriptor<"CS", string[]>(
        new Tag(0x0072, 0x0406), "CS", "Filter-by Operator"),
    StructuredDisplayBackgroundCIELabValue: new TagDescriptor<"US", number[]>(
        new Tag(0x0072, 0x0420), "US", "Structured Display Background CIELab Value"),
    EmptyImageBoxCIELabValue: new TagDescriptor<"US", number[]>(
        new Tag(0x0072, 0x0421), "US", "Empty Image Box CIELab Value"),
    StructuredDisplayImageBoxSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0072, 0x0422), "SQ", "Structured Display Image Box Sequence"),
    StructuredDisplayTextBoxSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0072, 0x0424), "SQ", "Structured Display Text Box Sequence"),
    ReferencedFirstFrameSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0072, 0x0427), "SQ", "Referenced First Frame Sequence"),
    ImageBoxSynchronizationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0072, 0x0430), "SQ", "Image Box Synchronization Sequence"),
    SynchronizedImageBoxList: new TagDescriptor<"US", number[]>(
        new Tag(0x0072, 0x0432), "US", "Synchronized Image Box List"),
    TypeOfSynchronization: new TagDescriptor<"CS", string[]>(
        new Tag(0x0072, 0x0434), "CS", "Type of Synchronization"),
    BlendingOperationType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0072, 0x0500), "CS", "Blending Operation Type"),
    ReformattingOperationType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0072, 0x0510), "CS", "Reformatting Operation Type"),
    ReformattingThickness: new TagDescriptor<"FD", number[]>(
        new Tag(0x0072, 0x0512), "FD", "Reformatting Thickness"),
    ReformattingInterval: new TagDescriptor<"FD", number[]>(
        new Tag(0x0072, 0x0514), "FD", "Reformatting Interval"),
    ReformattingOperationInitialViewDirection: new TagDescriptor<"CS", string[]>(
        new Tag(0x0072, 0x0516), "CS", "Reformatting Operation Initial View Direction"),
    ThreeDRenderingType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0072, 0x0520), "CS", "3D Rendering Type"),
    SortingOperationsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0072, 0x0600), "SQ", "Sorting Operations Sequence"),
    SortByCategory: new TagDescriptor<"CS", string[]>(
        new Tag(0x0072, 0x0602), "CS", "Sort-by Category"),
    SortingDirection: new TagDescriptor<"CS", string[]>(
        new Tag(0x0072, 0x0604), "CS", "Sorting Direction"),
    DisplaySetPatientOrientation: new TagDescriptor<"CS", string[]>(
        new Tag(0x0072, 0x0700), "CS", "Display Set Patient Orientation"),
    VOIType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0072, 0x0702), "CS", "VOI Type"),
    PseudoColorType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0072, 0x0704), "CS", "Pseudo-Color Type"),
    PseudoColorPaletteInstanceReferenceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0072, 0x0705), "SQ", "Pseudo-Color Palette Instance Reference Sequence"),
    ShowGrayscaleInverted: new TagDescriptor<"CS", string[]>(
        new Tag(0x0072, 0x0706), "CS", "Show Grayscale Inverted"),
    ShowImageTrueSizeFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0072, 0x0710), "CS", "Show Image True Size Flag"),
    ShowGraphicAnnotationFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0072, 0x0712), "CS", "Show Graphic Annotation Flag"),
    ShowPatientDemographicsFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0072, 0x0714), "CS", "Show Patient Demographics Flag"),
    ShowAcquisitionTechniquesFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0072, 0x0716), "CS", "Show Acquisition Techniques Flag"),
    DisplaySetHorizontalJustification: new TagDescriptor<"CS", string[]>(
        new Tag(0x0072, 0x0717), "CS", "Display Set Horizontal Justification"),
    DisplaySetVerticalJustification: new TagDescriptor<"CS", string[]>(
        new Tag(0x0072, 0x0718), "CS", "Display Set Vertical Justification"),

    // Group 0x0074

    ContinuationStartMeterset: new TagDescriptor<"FD", number[]>(
        new Tag(0x0074, 0x0120), "FD", "Continuation Start Meterset"),
    ContinuationEndMeterset: new TagDescriptor<"FD", number[]>(
        new Tag(0x0074, 0x0121), "FD", "Continuation End Meterset"),
    ProcedureStepState: new TagDescriptor<"CS", string[]>(
        new Tag(0x0074, 0x1000), "CS", "Procedure Step State"),
    ProcedureStepProgressInformationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0074, 0x1002), "SQ", "Procedure Step Progress Information Sequence"),
    ProcedureStepProgress: new TagDescriptor<"DS", number[]>(
        new Tag(0x0074, 0x1004), "DS", "Procedure Step Progress"),
    ProcedureStepProgressDescription: new TagDescriptor<"ST", string>(
        new Tag(0x0074, 0x1006), "ST", "Procedure Step Progress Description"),
    ProcedureStepProgressParametersSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0074, 0x1007), "SQ", "Procedure Step Progress Parameters Sequence"),
    ProcedureStepCommunicationsURISequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0074, 0x1008), "SQ", "Procedure Step Communications URI Sequence"),
    ContactURI: new TagDescriptor<"UR", string>(
        new Tag(0x0074, 0x100A), "UR", "Contact URI"),
    ContactDisplayName: new TagDescriptor<"LO", string[]>(
        new Tag(0x0074, 0x100C), "LO", "Contact Display Name"),
    ProcedureStepDiscontinuationReasonCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0074, 0x100E), "SQ", "Procedure Step Discontinuation Reason Code Sequence"),
    BeamTaskSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0074, 0x1020), "SQ", "Beam Task Sequence"),
    BeamTaskType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0074, 0x1022), "CS", "Beam Task Type"),
    BeamOrderIndexTrial: new TagDescriptor<"IS", number[]>(
        new Tag(0x0074, 0x1024), "IS", "Beam Order Index (Trial)"),
    AutosequenceFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0074, 0x1025), "CS", "Autosequence Flag"),
    TableTopVerticalAdjustedPosition: new TagDescriptor<"FD", number[]>(
        new Tag(0x0074, 0x1026), "FD", "Table Top Vertical Adjusted Position"),
    TableTopLongitudinalAdjustedPosition: new TagDescriptor<"FD", number[]>(
        new Tag(0x0074, 0x1027), "FD", "Table Top Longitudinal Adjusted Position"),
    TableTopLateralAdjustedPosition: new TagDescriptor<"FD", number[]>(
        new Tag(0x0074, 0x1028), "FD", "Table Top Lateral Adjusted Position"),
    PatientSupportAdjustedAngle: new TagDescriptor<"FD", number[]>(
        new Tag(0x0074, 0x102A), "FD", "Patient Support Adjusted Angle"),
    TableTopEccentricAdjustedAngle: new TagDescriptor<"FD", number[]>(
        new Tag(0x0074, 0x102B), "FD", "Table Top Eccentric Adjusted Angle"),
    TableTopPitchAdjustedAngle: new TagDescriptor<"FD", number[]>(
        new Tag(0x0074, 0x102C), "FD", "Table Top Pitch Adjusted Angle"),
    TableTopRollAdjustedAngle: new TagDescriptor<"FD", number[]>(
        new Tag(0x0074, 0x102D), "FD", "Table Top Roll Adjusted Angle"),
    DeliveryVerificationImageSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0074, 0x1030), "SQ", "Delivery Verification Image Sequence"),
    VerificationImageTiming: new TagDescriptor<"CS", string[]>(
        new Tag(0x0074, 0x1032), "CS", "Verification Image Timing"),
    DoubleExposureFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0074, 0x1034), "CS", "Double Exposure Flag"),
    DoubleExposureOrdering: new TagDescriptor<"CS", string[]>(
        new Tag(0x0074, 0x1036), "CS", "Double Exposure Ordering"),
    DoubleExposureMetersetTrial: new TagDescriptor<"DS", number[]>(
        new Tag(0x0074, 0x1038), "DS", "Double Exposure Meterset (Trial)"),
    DoubleExposureFieldDeltaTrial: new TagDescriptor<"DS", number[]>(
        new Tag(0x0074, 0x103A), "DS", "Double Exposure Field Delta (Trial)"),
    RelatedReferenceRTImageSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0074, 0x1040), "SQ", "Related Reference RT Image Sequence"),
    GeneralMachineVerificationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0074, 0x1042), "SQ", "General Machine Verification Sequence"),
    ConventionalMachineVerificationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0074, 0x1044), "SQ", "Conventional Machine Verification Sequence"),
    IonMachineVerificationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0074, 0x1046), "SQ", "Ion Machine Verification Sequence"),
    FailedAttributesSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0074, 0x1048), "SQ", "Failed Attributes Sequence"),
    OverriddenAttributesSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0074, 0x104A), "SQ", "Overridden Attributes Sequence"),
    ConventionalControlPointVerificationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0074, 0x104C), "SQ", "Conventional Control Point Verification Sequence"),
    IonControlPointVerificationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0074, 0x104E), "SQ", "Ion Control Point Verification Sequence"),
    AttributeOccurrenceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0074, 0x1050), "SQ", "Attribute Occurrence Sequence"),
    AttributeOccurrencePointer: new TagDescriptor<"AT", TagInterface[]>(
        new Tag(0x0074, 0x1052), "AT", "Attribute Occurrence Pointer"),
    AttributeItemSelector: new TagDescriptor<"UL", number[]>(
        new Tag(0x0074, 0x1054), "UL", "Attribute Item Selector"),
    AttributeOccurrencePrivateCreator: new TagDescriptor<"LO", string[]>(
        new Tag(0x0074, 0x1056), "LO", "Attribute Occurrence Private Creator"),
    SelectorSequencePointerItems: new TagDescriptor<"IS", number[]>(
        new Tag(0x0074, 0x1057), "IS", "Selector Sequence Pointer Items"),
    ScheduledProcedureStepPriority: new TagDescriptor<"CS", string[]>(
        new Tag(0x0074, 0x1200), "CS", "Scheduled Procedure Step Priority"),
    WorklistLabel: new TagDescriptor<"LO", string[]>(
        new Tag(0x0074, 0x1202), "LO", "Worklist Label"),
    ProcedureStepLabel: new TagDescriptor<"LO", string[]>(
        new Tag(0x0074, 0x1204), "LO", "Procedure Step Label"),
    ScheduledProcessingParametersSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0074, 0x1210), "SQ", "Scheduled Processing Parameters Sequence"),
    PerformedProcessingParametersSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0074, 0x1212), "SQ", "Performed Processing Parameters Sequence"),
    UnifiedProcedureStepPerformedProcedureSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0074, 0x1216), "SQ", "Unified Procedure Step Performed Procedure Sequence"),
    RelatedProcedureStepSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0074, 0x1220), "SQ", "Related Procedure Step Sequence"),
    ProcedureStepRelationshipType: new TagDescriptor<"LO", string[]>(
        new Tag(0x0074, 0x1222), "LO", "Procedure Step Relationship Type"),
    ReplacedProcedureStepSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0074, 0x1224), "SQ", "Replaced Procedure Step Sequence"),
    DeletionLock: new TagDescriptor<"LO", string[]>(
        new Tag(0x0074, 0x1230), "LO", "Deletion Lock"),
    ReceivingAE: new TagDescriptor<"AE", string[]>(
        new Tag(0x0074, 0x1234), "AE", "Receiving AE"),
    RequestingAE: new TagDescriptor<"AE", string[]>(
        new Tag(0x0074, 0x1236), "AE", "Requesting AE"),
    ReasonForCancellation: new TagDescriptor<"LT", string>(
        new Tag(0x0074, 0x1238), "LT", "Reason for Cancellation"),
    SCPStatus: new TagDescriptor<"CS", string[]>(
        new Tag(0x0074, 0x1242), "CS", "SCP Status"),
    SubscriptionListStatus: new TagDescriptor<"CS", string[]>(
        new Tag(0x0074, 0x1244), "CS", "Subscription List Status"),
    UnifiedProcedureStepListStatus: new TagDescriptor<"CS", string[]>(
        new Tag(0x0074, 0x1246), "CS", "Unified Procedure Step List Status"),
    BeamOrderIndex: new TagDescriptor<"UL", number[]>(
        new Tag(0x0074, 0x1324), "UL", "Beam Order Index"),
    DoubleExposureMeterset: new TagDescriptor<"FD", number[]>(
        new Tag(0x0074, 0x1338), "FD", "Double Exposure Meterset"),
    DoubleExposureFieldDelta: new TagDescriptor<"FD", number[]>(
        new Tag(0x0074, 0x133A), "FD", "Double Exposure Field Delta"),
    BrachyTaskSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0074, 0x1401), "SQ", "Brachy Task Sequence"),
    ContinuationStartTotalReferenceAirKerma: new TagDescriptor<"DS", number[]>(
        new Tag(0x0074, 0x1402), "DS", "Continuation Start Total Reference Air Kerma"),
    ContinuationEndTotalReferenceAirKerma: new TagDescriptor<"DS", number[]>(
        new Tag(0x0074, 0x1403), "DS", "Continuation End Total Reference Air Kerma"),
    ContinuationPulseNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x0074, 0x1404), "IS", "Continuation Pulse Number"),
    ChannelDeliveryOrderSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0074, 0x1405), "SQ", "Channel Delivery Order Sequence"),
    ReferencedChannelNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x0074, 0x1406), "IS", "Referenced Channel Number"),
    StartCumulativeTimeWeight: new TagDescriptor<"DS", number[]>(
        new Tag(0x0074, 0x1407), "DS", "Start Cumulative Time Weight"),
    EndCumulativeTimeWeight: new TagDescriptor<"DS", number[]>(
        new Tag(0x0074, 0x1408), "DS", "End Cumulative Time Weight"),
    OmittedChannelSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0074, 0x1409), "SQ", "Omitted Channel Sequence"),
    ReasonForChannelOmission: new TagDescriptor<"CS", string[]>(
        new Tag(0x0074, 0x140A), "CS", "Reason for Channel Omission"),
    ReasonForChannelOmissionDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x0074, 0x140B), "LO", "Reason for Channel Omission Description"),
    ChannelDeliveryOrderIndex: new TagDescriptor<"IS", number[]>(
        new Tag(0x0074, 0x140C), "IS", "Channel Delivery Order Index"),
    ChannelDeliveryContinuationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0074, 0x140D), "SQ", "Channel Delivery Continuation Sequence"),
    OmittedApplicationSetupSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0074, 0x140E), "SQ", "Omitted Application Setup Sequence"),

    // Group 0x0076

    ImplantAssemblyTemplateName: new TagDescriptor<"LO", string[]>(
        new Tag(0x0076, 0x0001), "LO", "Implant Assembly Template Name"),
    ImplantAssemblyTemplateIssuer: new TagDescriptor<"LO", string[]>(
        new Tag(0x0076, 0x0003), "LO", "Implant Assembly Template Issuer"),
    ImplantAssemblyTemplateVersion: new TagDescriptor<"LO", string[]>(
        new Tag(0x0076, 0x0006), "LO", "Implant Assembly Template Version"),
    ReplacedImplantAssemblyTemplateSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0076, 0x0008), "SQ", "Replaced Implant Assembly Template Sequence"),
    ImplantAssemblyTemplateType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0076, 0x000A), "CS", "Implant Assembly Template Type"),
    OriginalImplantAssemblyTemplateSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0076, 0x000C), "SQ", "Original Implant Assembly Template Sequence"),
    DerivationImplantAssemblyTemplateSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0076, 0x000E), "SQ", "Derivation Implant Assembly Template Sequence"),
    ImplantAssemblyTemplateTargetAnatomySequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0076, 0x0010), "SQ", "Implant Assembly Template Target Anatomy Sequence"),
    ProcedureTypeCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0076, 0x0020), "SQ", "Procedure Type Code Sequence"),
    SurgicalTechnique: new TagDescriptor<"LO", string[]>(
        new Tag(0x0076, 0x0030), "LO", "Surgical Technique"),
    ComponentTypesSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0076, 0x0032), "SQ", "Component Types Sequence"),
    ComponentTypeCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0076, 0x0034), "SQ", "Component Type Code Sequence"),
    ExclusiveComponentType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0076, 0x0036), "CS", "Exclusive Component Type"),
    MandatoryComponentType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0076, 0x0038), "CS", "Mandatory Component Type"),
    ComponentSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0076, 0x0040), "SQ", "Component Sequence"),
    ComponentID: new TagDescriptor<"US", number[]>(
        new Tag(0x0076, 0x0055), "US", "Component ID"),
    ComponentAssemblySequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0076, 0x0060), "SQ", "Component Assembly Sequence"),
    Component1ReferencedID: new TagDescriptor<"US", number[]>(
        new Tag(0x0076, 0x0070), "US", "Component 1 Referenced ID"),
    Component1ReferencedMatingFeatureSetID: new TagDescriptor<"US", number[]>(
        new Tag(0x0076, 0x0080), "US", "Component 1 Referenced Mating Feature Set ID"),
    Component1ReferencedMatingFeatureID: new TagDescriptor<"US", number[]>(
        new Tag(0x0076, 0x0090), "US", "Component 1 Referenced Mating Feature ID"),
    Component2ReferencedID: new TagDescriptor<"US", number[]>(
        new Tag(0x0076, 0x00A0), "US", "Component 2 Referenced ID"),
    Component2ReferencedMatingFeatureSetID: new TagDescriptor<"US", number[]>(
        new Tag(0x0076, 0x00B0), "US", "Component 2 Referenced Mating Feature Set ID"),
    Component2ReferencedMatingFeatureID: new TagDescriptor<"US", number[]>(
        new Tag(0x0076, 0x00C0), "US", "Component 2 Referenced Mating Feature ID"),

    // Group 0x0078

    ImplantTemplateGroupName: new TagDescriptor<"LO", string[]>(
        new Tag(0x0078, 0x0001), "LO", "Implant Template Group Name"),
    ImplantTemplateGroupDescription: new TagDescriptor<"ST", string>(
        new Tag(0x0078, 0x0010), "ST", "Implant Template Group Description"),
    ImplantTemplateGroupIssuer: new TagDescriptor<"LO", string[]>(
        new Tag(0x0078, 0x0020), "LO", "Implant Template Group Issuer"),
    ImplantTemplateGroupVersion: new TagDescriptor<"LO", string[]>(
        new Tag(0x0078, 0x0024), "LO", "Implant Template Group Version"),
    ReplacedImplantTemplateGroupSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0078, 0x0026), "SQ", "Replaced Implant Template Group Sequence"),
    ImplantTemplateGroupTargetAnatomySequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0078, 0x0028), "SQ", "Implant Template Group Target Anatomy Sequence"),
    ImplantTemplateGroupMembersSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0078, 0x002A), "SQ", "Implant Template Group Members Sequence"),
    ImplantTemplateGroupMemberID: new TagDescriptor<"US", number[]>(
        new Tag(0x0078, 0x002E), "US", "Implant Template Group Member ID"),
    ThreeDImplantTemplateGroupMemberMatchingPoint: new TagDescriptor<"FD", number[]>(
        new Tag(0x0078, 0x0050), "FD", "3D Implant Template Group Member Matching Point"),
    ThreeDImplantTemplateGroupMemberMatchingAxes: new TagDescriptor<"FD", number[]>(
        new Tag(0x0078, 0x0060), "FD", "3D Implant Template Group Member Matching Axes"),
    ImplantTemplateGroupMemberMatching2DCoordinatesSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0078, 0x0070), "SQ", "Implant Template Group Member Matching 2D Coordinates Sequence"),
    TwoDImplantTemplateGroupMemberMatchingPoint: new TagDescriptor<"FD", number[]>(
        new Tag(0x0078, 0x0090), "FD", "2D Implant Template Group Member Matching Point"),
    TwoDImplantTemplateGroupMemberMatchingAxes: new TagDescriptor<"FD", number[]>(
        new Tag(0x0078, 0x00A0), "FD", "2D Implant Template Group Member Matching Axes"),
    ImplantTemplateGroupVariationDimensionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0078, 0x00B0), "SQ", "Implant Template Group Variation Dimension Sequence"),
    ImplantTemplateGroupVariationDimensionName: new TagDescriptor<"LO", string[]>(
        new Tag(0x0078, 0x00B2), "LO", "Implant Template Group Variation Dimension Name"),
    ImplantTemplateGroupVariationDimensionRankSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0078, 0x00B4), "SQ", "Implant Template Group Variation Dimension Rank Sequence"),
    ReferencedImplantTemplateGroupMemberID: new TagDescriptor<"US", number[]>(
        new Tag(0x0078, 0x00B6), "US", "Referenced Implant Template Group Member ID"),
    ImplantTemplateGroupVariationDimensionRank: new TagDescriptor<"US", number[]>(
        new Tag(0x0078, 0x00B8), "US", "Implant Template Group Variation Dimension Rank"),

    // Group 0x0080

    SurfaceScanAcquisitionTypeCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0080, 0x0001), "SQ", "Surface Scan Acquisition Type Code Sequence"),
    SurfaceScanModeCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0080, 0x0002), "SQ", "Surface Scan Mode Code Sequence"),
    RegistrationMethodCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0080, 0x0003), "SQ", "Registration Method Code Sequence"),
    ShotDurationTime: new TagDescriptor<"FD", number[]>(
        new Tag(0x0080, 0x0004), "FD", "Shot Duration Time"),
    ShotOffsetTime: new TagDescriptor<"FD", number[]>(
        new Tag(0x0080, 0x0005), "FD", "Shot Offset Time"),
    SurfacePointPresentationValueData: new TagDescriptor<"US", number[]>(
        new Tag(0x0080, 0x0006), "US", "Surface Point Presentation Value Data"),
    SurfacePointColorCIELabValueData: new TagDescriptor<"US", number[]>(
        new Tag(0x0080, 0x0007), "US", "Surface Point Color CIELab Value Data"),
    UVMappingSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0080, 0x0008), "SQ", "UV Mapping Sequence"),
    TextureLabel: new TagDescriptor<"SH", string[]>(
        new Tag(0x0080, 0x0009), "SH", "Texture Label"),
    UValueData: new TagDescriptor<"OF", Float32Array | LazyValue<Float32Array>>(
        new Tag(0x0080, 0x0010), "OF", "U Value Data"),
    VValueData: new TagDescriptor<"OF", Float32Array | LazyValue<Float32Array>>(
        new Tag(0x0080, 0x0011), "OF", "V Value Data"),
    ReferencedTextureSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0080, 0x0012), "SQ", "Referenced Texture Sequence"),
    ReferencedSurfaceDataSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0080, 0x0013), "SQ", "Referenced Surface Data Sequence"),

    // Group 0x0082

    AssessmentSummary: new TagDescriptor<"CS", string[]>(
        new Tag(0x0082, 0x0001), "CS", "Assessment Summary"),
    AssessmentSummaryDescription: new TagDescriptor<"UT", string>(
        new Tag(0x0082, 0x0003), "UT", "Assessment Summary Description"),
    AssessedSOPInstanceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0082, 0x0004), "SQ", "Assessed SOP Instance Sequence"),
    ReferencedComparisonSOPInstanceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0082, 0x0005), "SQ", "Referenced Comparison SOP Instance Sequence"),
    NumberOfAssessmentObservations: new TagDescriptor<"UL", number[]>(
        new Tag(0x0082, 0x0006), "UL", "Number of Assessment Observations"),
    AssessmentObservationsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0082, 0x0007), "SQ", "Assessment Observations Sequence"),
    ObservationSignificance: new TagDescriptor<"CS", string[]>(
        new Tag(0x0082, 0x0008), "CS", "Observation Significance"),
    ObservationDescription: new TagDescriptor<"UT", string>(
        new Tag(0x0082, 0x000A), "UT", "Observation Description"),
    StructuredConstraintObservationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0082, 0x000C), "SQ", "Structured Constraint Observation Sequence"),
    AssessedAttributeValueSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0082, 0x0010), "SQ", "Assessed Attribute Value Sequence"),
    AssessmentSetID: new TagDescriptor<"LO", string[]>(
        new Tag(0x0082, 0x0016), "LO", "Assessment Set ID"),
    AssessmentRequesterSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0082, 0x0017), "SQ", "Assessment Requester Sequence"),
    SelectorAttributeName: new TagDescriptor<"LO", string[]>(
        new Tag(0x0082, 0x0018), "LO", "Selector Attribute Name"),
    SelectorAttributeKeyword: new TagDescriptor<"LO", string[]>(
        new Tag(0x0082, 0x0019), "LO", "Selector Attribute Keyword"),
    AssessmentTypeCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0082, 0x0021), "SQ", "Assessment Type Code Sequence"),
    ObservationBasisCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0082, 0x0022), "SQ", "Observation Basis Code Sequence"),
    AssessmentLabel: new TagDescriptor<"LO", string[]>(
        new Tag(0x0082, 0x0023), "LO", "Assessment Label"),
    ConstraintType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0082, 0x0032), "CS", "Constraint Type"),
    SpecificationSelectionGuidance: new TagDescriptor<"UT", string>(
        new Tag(0x0082, 0x0033), "UT", "Specification Selection Guidance"),
    ConstraintValueSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0082, 0x0034), "SQ", "Constraint Value Sequence"),
    RecommendedDefaultValueSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0082, 0x0035), "SQ", "Recommended Default Value Sequence"),
    ConstraintViolationSignificance: new TagDescriptor<"CS", string[]>(
        new Tag(0x0082, 0x0036), "CS", "Constraint Violation Significance"),
    ConstraintViolationCondition: new TagDescriptor<"UT", string>(
        new Tag(0x0082, 0x0037), "UT", "Constraint Violation Condition"),
    ModifiableConstraintFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x0082, 0x0038), "CS", "Modifiable Constraint Flag"),

    // Group 0x0088

    StorageMediaFileSetID: new TagDescriptor<"SH", string[]>(
        new Tag(0x0088, 0x0130), "SH", "Storage Media File-set ID"),
    StorageMediaFileSetUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0088, 0x0140), "UI", "Storage Media File-set UID"),
    IconImageSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0088, 0x0200), "SQ", "Icon Image Sequence"),
    TopicTitle: new TagDescriptor<"LO", string[]>(
        new Tag(0x0088, 0x0904), "LO", "Topic Title"),
    TopicSubject: new TagDescriptor<"ST", string>(
        new Tag(0x0088, 0x0906), "ST", "Topic Subject"),
    TopicAuthor: new TagDescriptor<"LO", string[]>(
        new Tag(0x0088, 0x0910), "LO", "Topic Author"),
    TopicKeywords: new TagDescriptor<"LO", string[]>(
        new Tag(0x0088, 0x0912), "LO", "Topic Keywords"),

    // Group 0x0100

    SOPInstanceStatus: new TagDescriptor<"CS", string[]>(
        new Tag(0x0100, 0x0410), "CS", "SOP Instance Status"),
    SOPAuthorizationDateTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x0100, 0x0420), "DT", "SOP Authorization DateTime"),
    SOPAuthorizationComment: new TagDescriptor<"LT", string>(
        new Tag(0x0100, 0x0424), "LT", "SOP Authorization Comment"),
    AuthorizationEquipmentCertificationNumber: new TagDescriptor<"LO", string[]>(
        new Tag(0x0100, 0x0426), "LO", "Authorization Equipment Certification Number"),

    // Group 0x0400

    MACIDNumber: new TagDescriptor<"US", number[]>(
        new Tag(0x0400, 0x0005), "US", "MAC ID Number"),
    MACCalculationTransferSyntaxUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0400, 0x0010), "UI", "MAC Calculation Transfer Syntax UID"),
    MACAlgorithm: new TagDescriptor<"CS", string[]>(
        new Tag(0x0400, 0x0015), "CS", "MAC Algorithm"),
    DataElementsSigned: new TagDescriptor<"AT", TagInterface[]>(
        new Tag(0x0400, 0x0020), "AT", "Data Elements Signed"),
    DigitalSignatureUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0400, 0x0100), "UI", "Digital Signature UID"),
    DigitalSignatureDateTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x0400, 0x0105), "DT", "Digital Signature DateTime"),
    CertificateType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0400, 0x0110), "CS", "Certificate Type"),
    CertificateOfSigner: new TagDescriptor<"OB", Uint8Array | LazyValue<Uint8Array>>(
        new Tag(0x0400, 0x0115), "OB", "Certificate of Signer"),
    Signature: new TagDescriptor<"OB", Uint8Array | LazyValue<Uint8Array>>(
        new Tag(0x0400, 0x0120), "OB", "Signature"),
    CertifiedTimestampType: new TagDescriptor<"CS", string[]>(
        new Tag(0x0400, 0x0305), "CS", "Certified Timestamp Type"),
    CertifiedTimestamp: new TagDescriptor<"OB", Uint8Array | LazyValue<Uint8Array>>(
        new Tag(0x0400, 0x0310), "OB", "Certified Timestamp"),
    DigitalSignaturePurposeCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0400, 0x0401), "SQ", "Digital Signature Purpose Code Sequence"),
    ReferencedDigitalSignatureSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0400, 0x0402), "SQ", "Referenced Digital Signature Sequence"),
    ReferencedSOPInstanceMACSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0400, 0x0403), "SQ", "Referenced SOP Instance MAC Sequence"),
    MAC: new TagDescriptor<"OB", Uint8Array | LazyValue<Uint8Array>>(
        new Tag(0x0400, 0x0404), "OB", "MAC"),
    EncryptedAttributesSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0400, 0x0500), "SQ", "Encrypted Attributes Sequence"),
    EncryptedContentTransferSyntaxUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x0400, 0x0510), "UI", "Encrypted Content Transfer Syntax UID"),
    EncryptedContent: new TagDescriptor<"OB", Uint8Array | LazyValue<Uint8Array>>(
        new Tag(0x0400, 0x0520), "OB", "Encrypted Content"),
    ModifiedAttributesSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0400, 0x0550), "SQ", "Modified Attributes Sequence"),
    OriginalAttributesSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x0400, 0x0561), "SQ", "Original Attributes Sequence"),
    AttributeModificationDateTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x0400, 0x0562), "DT", "Attribute Modification DateTime"),
    ModifyingSystem: new TagDescriptor<"LO", string[]>(
        new Tag(0x0400, 0x0563), "LO", "Modifying System"),
    SourceOfPreviousValues: new TagDescriptor<"LO", string[]>(
        new Tag(0x0400, 0x0564), "LO", "Source of Previous Values"),
    ReasonForTheAttributeModification: new TagDescriptor<"CS", string[]>(
        new Tag(0x0400, 0x0565), "CS", "Reason for the Attribute Modification"),
    InstanceOriginStatus: new TagDescriptor<"CS", string[]>(
        new Tag(0x0400, 0x0600), "CS", "Instance Origin Status"),

    // Group 0x2000

    NumberOfCopies: new TagDescriptor<"IS", number[]>(
        new Tag(0x2000, 0x0010), "IS", "Number of Copies"),
    PrinterConfigurationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x2000, 0x001E), "SQ", "Printer Configuration Sequence"),
    PrintPriority: new TagDescriptor<"CS", string[]>(
        new Tag(0x2000, 0x0020), "CS", "Print Priority"),
    MediumType: new TagDescriptor<"CS", string[]>(
        new Tag(0x2000, 0x0030), "CS", "Medium Type"),
    FilmDestination: new TagDescriptor<"CS", string[]>(
        new Tag(0x2000, 0x0040), "CS", "Film Destination"),
    FilmSessionLabel: new TagDescriptor<"LO", string[]>(
        new Tag(0x2000, 0x0050), "LO", "Film Session Label"),
    MemoryAllocation: new TagDescriptor<"IS", number[]>(
        new Tag(0x2000, 0x0060), "IS", "Memory Allocation"),
    MaximumMemoryAllocation: new TagDescriptor<"IS", number[]>(
        new Tag(0x2000, 0x0061), "IS", "Maximum Memory Allocation"),
    ColorImagePrintingFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x2000, 0x0062), "CS", "Color Image Printing Flag"),
    CollationFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x2000, 0x0063), "CS", "Collation Flag"),
    AnnotationFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x2000, 0x0065), "CS", "Annotation Flag"),
    ImageOverlayFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x2000, 0x0067), "CS", "Image Overlay Flag"),
    PresentationLUTFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x2000, 0x0069), "CS", "Presentation LUT Flag"),
    ImageBoxPresentationLUTFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x2000, 0x006A), "CS", "Image Box Presentation LUT Flag"),
    MemoryBitDepth: new TagDescriptor<"US", number[]>(
        new Tag(0x2000, 0x00A0), "US", "Memory Bit Depth"),
    PrintingBitDepth: new TagDescriptor<"US", number[]>(
        new Tag(0x2000, 0x00A1), "US", "Printing Bit Depth"),
    MediaInstalledSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x2000, 0x00A2), "SQ", "Media Installed Sequence"),
    OtherMediaAvailableSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x2000, 0x00A4), "SQ", "Other Media Available Sequence"),
    SupportedImageDisplayFormatsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x2000, 0x00A8), "SQ", "Supported Image Display Formats Sequence"),
    ReferencedFilmBoxSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x2000, 0x0500), "SQ", "Referenced Film Box Sequence"),
    ReferencedStoredPrintSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x2000, 0x0510), "SQ", "Referenced Stored Print Sequence"),

    // Group 0x2010

    ImageDisplayFormat: new TagDescriptor<"ST", string>(
        new Tag(0x2010, 0x0010), "ST", "Image Display Format"),
    AnnotationDisplayFormatID: new TagDescriptor<"CS", string[]>(
        new Tag(0x2010, 0x0030), "CS", "Annotation Display Format ID"),
    FilmOrientation: new TagDescriptor<"CS", string[]>(
        new Tag(0x2010, 0x0040), "CS", "Film Orientation"),
    FilmSizeID: new TagDescriptor<"CS", string[]>(
        new Tag(0x2010, 0x0050), "CS", "Film Size ID"),
    PrinterResolutionID: new TagDescriptor<"CS", string[]>(
        new Tag(0x2010, 0x0052), "CS", "Printer Resolution ID"),
    DefaultPrinterResolutionID: new TagDescriptor<"CS", string[]>(
        new Tag(0x2010, 0x0054), "CS", "Default Printer Resolution ID"),
    MagnificationType: new TagDescriptor<"CS", string[]>(
        new Tag(0x2010, 0x0060), "CS", "Magnification Type"),
    SmoothingType: new TagDescriptor<"CS", string[]>(
        new Tag(0x2010, 0x0080), "CS", "Smoothing Type"),
    DefaultMagnificationType: new TagDescriptor<"CS", string[]>(
        new Tag(0x2010, 0x00A6), "CS", "Default Magnification Type"),
    OtherMagnificationTypesAvailable: new TagDescriptor<"CS", string[]>(
        new Tag(0x2010, 0x00A7), "CS", "Other Magnification Types Available"),
    DefaultSmoothingType: new TagDescriptor<"CS", string[]>(
        new Tag(0x2010, 0x00A8), "CS", "Default Smoothing Type"),
    OtherSmoothingTypesAvailable: new TagDescriptor<"CS", string[]>(
        new Tag(0x2010, 0x00A9), "CS", "Other Smoothing Types Available"),
    BorderDensity: new TagDescriptor<"CS", string[]>(
        new Tag(0x2010, 0x0100), "CS", "Border Density"),
    EmptyImageDensity: new TagDescriptor<"CS", string[]>(
        new Tag(0x2010, 0x0110), "CS", "Empty Image Density"),
    MinDensity: new TagDescriptor<"US", number[]>(
        new Tag(0x2010, 0x0120), "US", "Min Density"),
    MaxDensity: new TagDescriptor<"US", number[]>(
        new Tag(0x2010, 0x0130), "US", "Max Density"),
    Trim: new TagDescriptor<"CS", string[]>(
        new Tag(0x2010, 0x0140), "CS", "Trim"),
    ConfigurationInformation: new TagDescriptor<"ST", string>(
        new Tag(0x2010, 0x0150), "ST", "Configuration Information"),
    ConfigurationInformationDescription: new TagDescriptor<"LT", string>(
        new Tag(0x2010, 0x0152), "LT", "Configuration Information Description"),
    MaximumCollatedFilms: new TagDescriptor<"IS", number[]>(
        new Tag(0x2010, 0x0154), "IS", "Maximum Collated Films"),
    Illumination: new TagDescriptor<"US", number[]>(
        new Tag(0x2010, 0x015E), "US", "Illumination"),
    ReflectedAmbientLight: new TagDescriptor<"US", number[]>(
        new Tag(0x2010, 0x0160), "US", "Reflected Ambient Light"),
    PrinterPixelSpacing: new TagDescriptor<"DS", number[]>(
        new Tag(0x2010, 0x0376), "DS", "Printer Pixel Spacing"),
    ReferencedFilmSessionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x2010, 0x0500), "SQ", "Referenced Film Session Sequence"),
    ReferencedImageBoxSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x2010, 0x0510), "SQ", "Referenced Image Box Sequence"),
    ReferencedBasicAnnotationBoxSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x2010, 0x0520), "SQ", "Referenced Basic Annotation Box Sequence"),

    // Group 0x2020

    ImageBoxPosition: new TagDescriptor<"US", number[]>(
        new Tag(0x2020, 0x0010), "US", "Image Box Position"),
    Polarity: new TagDescriptor<"CS", string[]>(
        new Tag(0x2020, 0x0020), "CS", "Polarity"),
    RequestedImageSize: new TagDescriptor<"DS", number[]>(
        new Tag(0x2020, 0x0030), "DS", "Requested Image Size"),
    RequestedDecimateCropBehavior: new TagDescriptor<"CS", string[]>(
        new Tag(0x2020, 0x0040), "CS", "Requested Decimate/Crop Behavior"),
    RequestedResolutionID: new TagDescriptor<"CS", string[]>(
        new Tag(0x2020, 0x0050), "CS", "Requested Resolution ID"),
    RequestedImageSizeFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x2020, 0x00A0), "CS", "Requested Image Size Flag"),
    DecimateCropResult: new TagDescriptor<"CS", string[]>(
        new Tag(0x2020, 0x00A2), "CS", "Decimate/Crop Result"),
    BasicGrayscaleImageSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x2020, 0x0110), "SQ", "Basic Grayscale Image Sequence"),
    BasicColorImageSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x2020, 0x0111), "SQ", "Basic Color Image Sequence"),
    ReferencedImageOverlayBoxSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x2020, 0x0130), "SQ", "Referenced Image Overlay Box Sequence"),
    ReferencedVOILUTBoxSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x2020, 0x0140), "SQ", "Referenced VOI LUT Box Sequence"),

    // Group 0x2030

    AnnotationPosition: new TagDescriptor<"US", number[]>(
        new Tag(0x2030, 0x0010), "US", "Annotation Position"),
    TextString: new TagDescriptor<"LO", string[]>(
        new Tag(0x2030, 0x0020), "LO", "Text String"),

    // Group 0x2040

    ReferencedOverlayPlaneSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x2040, 0x0010), "SQ", "Referenced Overlay Plane Sequence"),
    ReferencedOverlayPlaneGroups: new TagDescriptor<"US", number[]>(
        new Tag(0x2040, 0x0011), "US", "Referenced Overlay Plane Groups"),
    OverlayPixelDataSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x2040, 0x0020), "SQ", "Overlay Pixel Data Sequence"),
    OverlayMagnificationType: new TagDescriptor<"CS", string[]>(
        new Tag(0x2040, 0x0060), "CS", "Overlay Magnification Type"),
    OverlaySmoothingType: new TagDescriptor<"CS", string[]>(
        new Tag(0x2040, 0x0070), "CS", "Overlay Smoothing Type"),
    OverlayOrImageMagnification: new TagDescriptor<"CS", string[]>(
        new Tag(0x2040, 0x0072), "CS", "Overlay or Image Magnification"),
    MagnifyToNumberOfColumns: new TagDescriptor<"US", number[]>(
        new Tag(0x2040, 0x0074), "US", "Magnify to Number of Columns"),
    OverlayForegroundDensity: new TagDescriptor<"CS", string[]>(
        new Tag(0x2040, 0x0080), "CS", "Overlay Foreground Density"),
    OverlayBackgroundDensity: new TagDescriptor<"CS", string[]>(
        new Tag(0x2040, 0x0082), "CS", "Overlay Background Density"),
    OverlayMode: new TagDescriptor<"CS", string[]>(
        new Tag(0x2040, 0x0090), "CS", "Overlay Mode"),
    ThresholdDensity: new TagDescriptor<"CS", string[]>(
        new Tag(0x2040, 0x0100), "CS", "Threshold Density"),
    ReferencedImageBoxSequenceRetired: new TagDescriptor<"SQ", undefined>(
        new Tag(0x2040, 0x0500), "SQ", "Referenced Image Box Sequence (Retired)"),

    // Group 0x2050

    PresentationLUTSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x2050, 0x0010), "SQ", "Presentation LUT Sequence"),
    PresentationLUTShape: new TagDescriptor<"CS", string[]>(
        new Tag(0x2050, 0x0020), "CS", "Presentation LUT Shape"),
    ReferencedPresentationLUTSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x2050, 0x0500), "SQ", "Referenced Presentation LUT Sequence"),

    // Group 0x2100

    PrintJobID: new TagDescriptor<"SH", string[]>(
        new Tag(0x2100, 0x0010), "SH", "Print Job ID"),
    ExecutionStatus: new TagDescriptor<"CS", string[]>(
        new Tag(0x2100, 0x0020), "CS", "Execution Status"),
    ExecutionStatusInfo: new TagDescriptor<"CS", string[]>(
        new Tag(0x2100, 0x0030), "CS", "Execution Status Info"),
    CreationDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x2100, 0x0040), "DA", "Creation Date"),
    CreationTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x2100, 0x0050), "TM", "Creation Time"),
    Originator: new TagDescriptor<"AE", string[]>(
        new Tag(0x2100, 0x0070), "AE", "Originator"),
    DestinationAE: new TagDescriptor<"AE", string[]>(
        new Tag(0x2100, 0x0140), "AE", "Destination AE"),
    OwnerID: new TagDescriptor<"SH", string[]>(
        new Tag(0x2100, 0x0160), "SH", "Owner ID"),
    NumberOfFilms: new TagDescriptor<"IS", number[]>(
        new Tag(0x2100, 0x0170), "IS", "Number of Films"),
    ReferencedPrintJobSequencePullStoredPrint: new TagDescriptor<"SQ", undefined>(
        new Tag(0x2100, 0x0500), "SQ", "Referenced Print Job Sequence (Pull Stored Print)"),

    // Group 0x2110

    PrinterStatus: new TagDescriptor<"CS", string[]>(
        new Tag(0x2110, 0x0010), "CS", "Printer Status"),
    PrinterStatusInfo: new TagDescriptor<"CS", string[]>(
        new Tag(0x2110, 0x0020), "CS", "Printer Status Info"),
    PrinterName: new TagDescriptor<"LO", string[]>(
        new Tag(0x2110, 0x0030), "LO", "Printer Name"),
    PrintQueueID: new TagDescriptor<"SH", string[]>(
        new Tag(0x2110, 0x0099), "SH", "Print Queue ID"),

    // Group 0x2120

    QueueStatus: new TagDescriptor<"CS", string[]>(
        new Tag(0x2120, 0x0010), "CS", "Queue Status"),
    PrintJobDescriptionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x2120, 0x0050), "SQ", "Print Job Description Sequence"),
    ReferencedPrintJobSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x2120, 0x0070), "SQ", "Referenced Print Job Sequence"),

    // Group 0x2130

    PrintManagementCapabilitiesSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x2130, 0x0010), "SQ", "Print Management Capabilities Sequence"),
    PrinterCharacteristicsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x2130, 0x0015), "SQ", "Printer Characteristics Sequence"),
    FilmBoxContentSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x2130, 0x0030), "SQ", "Film Box Content Sequence"),
    ImageBoxContentSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x2130, 0x0040), "SQ", "Image Box Content Sequence"),
    AnnotationContentSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x2130, 0x0050), "SQ", "Annotation Content Sequence"),
    ImageOverlayBoxContentSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x2130, 0x0060), "SQ", "Image Overlay Box Content Sequence"),
    PresentationLUTContentSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x2130, 0x0080), "SQ", "Presentation LUT Content Sequence"),
    ProposedStudySequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x2130, 0x00A0), "SQ", "Proposed Study Sequence"),
    OriginalImageSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x2130, 0x00C0), "SQ", "Original Image Sequence"),

    // Group 0x2200

    LabelUsingInformationExtractedFromInstances: new TagDescriptor<"CS", string[]>(
        new Tag(0x2200, 0x0001), "CS", "Label Using Information Extracted From Instances"),
    LabelText: new TagDescriptor<"UT", string>(
        new Tag(0x2200, 0x0002), "UT", "Label Text"),
    LabelStyleSelection: new TagDescriptor<"CS", string[]>(
        new Tag(0x2200, 0x0003), "CS", "Label Style Selection"),
    MediaDisposition: new TagDescriptor<"LT", string>(
        new Tag(0x2200, 0x0004), "LT", "Media Disposition"),
    BarcodeValue: new TagDescriptor<"LT", string>(
        new Tag(0x2200, 0x0005), "LT", "Barcode Value"),
    BarcodeSymbology: new TagDescriptor<"CS", string[]>(
        new Tag(0x2200, 0x0006), "CS", "Barcode Symbology"),
    AllowMediaSplitting: new TagDescriptor<"CS", string[]>(
        new Tag(0x2200, 0x0007), "CS", "Allow Media Splitting"),
    IncludeNonDICOMObjects: new TagDescriptor<"CS", string[]>(
        new Tag(0x2200, 0x0008), "CS", "Include Non-DICOM Objects"),
    IncludeDisplayApplication: new TagDescriptor<"CS", string[]>(
        new Tag(0x2200, 0x0009), "CS", "Include Display Application"),
    PreserveCompositeInstancesAfterMediaCreation: new TagDescriptor<"CS", string[]>(
        new Tag(0x2200, 0x000A), "CS", "Preserve Composite Instances After Media Creation"),
    TotalNumberOfPiecesOfMediaCreated: new TagDescriptor<"US", number[]>(
        new Tag(0x2200, 0x000B), "US", "Total Number of Pieces of Media Created"),
    RequestedMediaApplicationProfile: new TagDescriptor<"LO", string[]>(
        new Tag(0x2200, 0x000C), "LO", "Requested Media Application Profile"),
    ReferencedStorageMediaSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x2200, 0x000D), "SQ", "Referenced Storage Media Sequence"),
    FailureAttributes: new TagDescriptor<"AT", TagInterface[]>(
        new Tag(0x2200, 0x000E), "AT", "Failure Attributes"),
    AllowLossyCompression: new TagDescriptor<"CS", string[]>(
        new Tag(0x2200, 0x000F), "CS", "Allow Lossy Compression"),
    RequestPriority: new TagDescriptor<"CS", string[]>(
        new Tag(0x2200, 0x0020), "CS", "Request Priority"),

    // Group 0x3002

    RTImageLabel: new TagDescriptor<"SH", string[]>(
        new Tag(0x3002, 0x0002), "SH", "RT Image Label"),
    RTImageName: new TagDescriptor<"LO", string[]>(
        new Tag(0x3002, 0x0003), "LO", "RT Image Name"),
    RTImageDescription: new TagDescriptor<"ST", string>(
        new Tag(0x3002, 0x0004), "ST", "RT Image Description"),
    ReportedValuesOrigin: new TagDescriptor<"CS", string[]>(
        new Tag(0x3002, 0x000A), "CS", "Reported Values Origin"),
    RTImagePlane: new TagDescriptor<"CS", string[]>(
        new Tag(0x3002, 0x000C), "CS", "RT Image Plane"),
    XRayImageReceptorTranslation: new TagDescriptor<"DS", number[]>(
        new Tag(0x3002, 0x000D), "DS", "X-Ray Image Receptor Translation"),
    XRayImageReceptorAngle: new TagDescriptor<"DS", number[]>(
        new Tag(0x3002, 0x000E), "DS", "X-Ray Image Receptor Angle"),
    RTImageOrientation: new TagDescriptor<"DS", number[]>(
        new Tag(0x3002, 0x0010), "DS", "RT Image Orientation"),
    ImagePlanePixelSpacing: new TagDescriptor<"DS", number[]>(
        new Tag(0x3002, 0x0011), "DS", "Image Plane Pixel Spacing"),
    RTImagePosition: new TagDescriptor<"DS", number[]>(
        new Tag(0x3002, 0x0012), "DS", "RT Image Position"),
    RadiationMachineName: new TagDescriptor<"SH", string[]>(
        new Tag(0x3002, 0x0020), "SH", "Radiation Machine Name"),
    RadiationMachineSAD: new TagDescriptor<"DS", number[]>(
        new Tag(0x3002, 0x0022), "DS", "Radiation Machine SAD"),
    RadiationMachineSSD: new TagDescriptor<"DS", number[]>(
        new Tag(0x3002, 0x0024), "DS", "Radiation Machine SSD"),
    RTImageSID: new TagDescriptor<"DS", number[]>(
        new Tag(0x3002, 0x0026), "DS", "RT Image SID"),
    SourceToReferenceObjectDistance: new TagDescriptor<"DS", number[]>(
        new Tag(0x3002, 0x0028), "DS", "Source to Reference Object Distance"),
    FractionNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x3002, 0x0029), "IS", "Fraction Number"),
    ExposureSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3002, 0x0030), "SQ", "Exposure Sequence"),
    MetersetExposure: new TagDescriptor<"DS", number[]>(
        new Tag(0x3002, 0x0032), "DS", "Meterset Exposure"),
    DiaphragmPosition: new TagDescriptor<"DS", number[]>(
        new Tag(0x3002, 0x0034), "DS", "Diaphragm Position"),
    FluenceMapSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3002, 0x0040), "SQ", "Fluence Map Sequence"),
    FluenceDataSource: new TagDescriptor<"CS", string[]>(
        new Tag(0x3002, 0x0041), "CS", "Fluence Data Source"),
    FluenceDataScale: new TagDescriptor<"DS", number[]>(
        new Tag(0x3002, 0x0042), "DS", "Fluence Data Scale"),
    PrimaryFluenceModeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3002, 0x0050), "SQ", "Primary Fluence Mode Sequence"),
    FluenceMode: new TagDescriptor<"CS", string[]>(
        new Tag(0x3002, 0x0051), "CS", "Fluence Mode"),
    FluenceModeID: new TagDescriptor<"SH", string[]>(
        new Tag(0x3002, 0x0052), "SH", "Fluence Mode ID"),

    // Group 0x3004

    DVHType: new TagDescriptor<"CS", string[]>(
        new Tag(0x3004, 0x0001), "CS", "DVH Type"),
    DoseUnits: new TagDescriptor<"CS", string[]>(
        new Tag(0x3004, 0x0002), "CS", "Dose Units"),
    DoseType: new TagDescriptor<"CS", string[]>(
        new Tag(0x3004, 0x0004), "CS", "Dose Type"),
    SpatialTransformOfDose: new TagDescriptor<"CS", string[]>(
        new Tag(0x3004, 0x0005), "CS", "Spatial Transform of Dose"),
    DoseComment: new TagDescriptor<"LO", string[]>(
        new Tag(0x3004, 0x0006), "LO", "Dose Comment"),
    NormalizationPoint: new TagDescriptor<"DS", number[]>(
        new Tag(0x3004, 0x0008), "DS", "Normalization Point"),
    DoseSummationType: new TagDescriptor<"CS", string[]>(
        new Tag(0x3004, 0x000A), "CS", "Dose Summation Type"),
    GridFrameOffsetVector: new TagDescriptor<"DS", number[]>(
        new Tag(0x3004, 0x000C), "DS", "Grid Frame Offset Vector"),
    DoseGridScaling: new TagDescriptor<"DS", number[]>(
        new Tag(0x3004, 0x000E), "DS", "Dose Grid Scaling"),
    RTDoseROISequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3004, 0x0010), "SQ", "RT Dose ROI Sequence"),
    DoseValue: new TagDescriptor<"DS", number[]>(
        new Tag(0x3004, 0x0012), "DS", "Dose Value"),
    TissueHeterogeneityCorrection: new TagDescriptor<"CS", string[]>(
        new Tag(0x3004, 0x0014), "CS", "Tissue Heterogeneity Correction"),
    DVHNormalizationPoint: new TagDescriptor<"DS", number[]>(
        new Tag(0x3004, 0x0040), "DS", "DVH Normalization Point"),
    DVHNormalizationDoseValue: new TagDescriptor<"DS", number[]>(
        new Tag(0x3004, 0x0042), "DS", "DVH Normalization Dose Value"),
    DVHSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3004, 0x0050), "SQ", "DVH Sequence"),
    DVHDoseScaling: new TagDescriptor<"DS", number[]>(
        new Tag(0x3004, 0x0052), "DS", "DVH Dose Scaling"),
    DVHVolumeUnits: new TagDescriptor<"CS", string[]>(
        new Tag(0x3004, 0x0054), "CS", "DVH Volume Units"),
    DVHNumberOfBins: new TagDescriptor<"IS", number[]>(
        new Tag(0x3004, 0x0056), "IS", "DVH Number of Bins"),
    DVHData: new TagDescriptor<"DS", number[]>(
        new Tag(0x3004, 0x0058), "DS", "DVH Data"),
    DVHReferencedROISequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3004, 0x0060), "SQ", "DVH Referenced ROI Sequence"),
    DVHROIContributionType: new TagDescriptor<"CS", string[]>(
        new Tag(0x3004, 0x0062), "CS", "DVH ROI Contribution Type"),
    DVHMinimumDose: new TagDescriptor<"DS", number[]>(
        new Tag(0x3004, 0x0070), "DS", "DVH Minimum Dose"),
    DVHMaximumDose: new TagDescriptor<"DS", number[]>(
        new Tag(0x3004, 0x0072), "DS", "DVH Maximum Dose"),
    DVHMeanDose: new TagDescriptor<"DS", number[]>(
        new Tag(0x3004, 0x0074), "DS", "DVH Mean Dose"),

    // Group 0x3006

    StructureSetLabel: new TagDescriptor<"SH", string[]>(
        new Tag(0x3006, 0x0002), "SH", "Structure Set Label"),
    StructureSetName: new TagDescriptor<"LO", string[]>(
        new Tag(0x3006, 0x0004), "LO", "Structure Set Name"),
    StructureSetDescription: new TagDescriptor<"ST", string>(
        new Tag(0x3006, 0x0006), "ST", "Structure Set Description"),
    StructureSetDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x3006, 0x0008), "DA", "Structure Set Date"),
    StructureSetTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x3006, 0x0009), "TM", "Structure Set Time"),
    ReferencedFrameOfReferenceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3006, 0x0010), "SQ", "Referenced Frame of Reference Sequence"),
    RTReferencedStudySequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3006, 0x0012), "SQ", "RT Referenced Study Sequence"),
    RTReferencedSeriesSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3006, 0x0014), "SQ", "RT Referenced Series Sequence"),
    ContourImageSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3006, 0x0016), "SQ", "Contour Image Sequence"),
    PredecessorStructureSetSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3006, 0x0018), "SQ", "Predecessor Structure Set Sequence"),
    StructureSetROISequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3006, 0x0020), "SQ", "Structure Set ROI Sequence"),
    ROINumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x3006, 0x0022), "IS", "ROI Number"),
    ReferencedFrameOfReferenceUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x3006, 0x0024), "UI", "Referenced Frame of Reference UID"),
    ROIName: new TagDescriptor<"LO", string[]>(
        new Tag(0x3006, 0x0026), "LO", "ROI Name"),
    ROIDescription: new TagDescriptor<"ST", string>(
        new Tag(0x3006, 0x0028), "ST", "ROI Description"),
    ROIDisplayColor: new TagDescriptor<"IS", number[]>(
        new Tag(0x3006, 0x002A), "IS", "ROI Display Color"),
    ROIVolume: new TagDescriptor<"DS", number[]>(
        new Tag(0x3006, 0x002C), "DS", "ROI Volume"),
    RTRelatedROISequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3006, 0x0030), "SQ", "RT Related ROI Sequence"),
    RTROIRelationship: new TagDescriptor<"CS", string[]>(
        new Tag(0x3006, 0x0033), "CS", "RT ROI Relationship"),
    ROIGenerationAlgorithm: new TagDescriptor<"CS", string[]>(
        new Tag(0x3006, 0x0036), "CS", "ROI Generation Algorithm"),
    ROIGenerationDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x3006, 0x0038), "LO", "ROI Generation Description"),
    ROIContourSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3006, 0x0039), "SQ", "ROI Contour Sequence"),
    ContourSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3006, 0x0040), "SQ", "Contour Sequence"),
    ContourGeometricType: new TagDescriptor<"CS", string[]>(
        new Tag(0x3006, 0x0042), "CS", "Contour Geometric Type"),
    ContourSlabThickness: new TagDescriptor<"DS", number[]>(
        new Tag(0x3006, 0x0044), "DS", "Contour Slab Thickness"),
    ContourOffsetVector: new TagDescriptor<"DS", number[]>(
        new Tag(0x3006, 0x0045), "DS", "Contour Offset Vector"),
    NumberOfContourPoints: new TagDescriptor<"IS", number[]>(
        new Tag(0x3006, 0x0046), "IS", "Number of Contour Points"),
    ContourNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x3006, 0x0048), "IS", "Contour Number"),
    AttachedContours: new TagDescriptor<"IS", number[]>(
        new Tag(0x3006, 0x0049), "IS", "Attached Contours"),
    ContourData: new TagDescriptor<"DS", number[]>(
        new Tag(0x3006, 0x0050), "DS", "Contour Data"),
    RTROIObservationsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3006, 0x0080), "SQ", "RT ROI Observations Sequence"),
    ObservationNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x3006, 0x0082), "IS", "Observation Number"),
    ReferencedROINumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x3006, 0x0084), "IS", "Referenced ROI Number"),
    ROIObservationLabel: new TagDescriptor<"SH", string[]>(
        new Tag(0x3006, 0x0085), "SH", "ROI Observation Label"),
    RTROIIdentificationCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3006, 0x0086), "SQ", "RT ROI Identification Code Sequence"),
    ROIObservationDescription: new TagDescriptor<"ST", string>(
        new Tag(0x3006, 0x0088), "ST", "ROI Observation Description"),
    RelatedRTROIObservationsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3006, 0x00A0), "SQ", "Related RT ROI Observations Sequence"),
    RTROIInterpretedType: new TagDescriptor<"CS", string[]>(
        new Tag(0x3006, 0x00A4), "CS", "RT ROI Interpreted Type"),
    ROIInterpreter: new TagDescriptor<"PN", string[]>(
        new Tag(0x3006, 0x00A6), "PN", "ROI Interpreter"),
    ROIPhysicalPropertiesSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3006, 0x00B0), "SQ", "ROI Physical Properties Sequence"),
    ROIPhysicalProperty: new TagDescriptor<"CS", string[]>(
        new Tag(0x3006, 0x00B2), "CS", "ROI Physical Property"),
    ROIPhysicalPropertyValue: new TagDescriptor<"DS", number[]>(
        new Tag(0x3006, 0x00B4), "DS", "ROI Physical Property Value"),
    ROIElementalCompositionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3006, 0x00B6), "SQ", "ROI Elemental Composition Sequence"),
    ROIElementalCompositionAtomicNumber: new TagDescriptor<"US", number[]>(
        new Tag(0x3006, 0x00B7), "US", "ROI Elemental Composition Atomic Number"),
    ROIElementalCompositionAtomicMassFraction: new TagDescriptor<"FL", number[]>(
        new Tag(0x3006, 0x00B8), "FL", "ROI Elemental Composition Atomic Mass Fraction"),
    AdditionalRTROIIdentificationCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3006, 0x00B9), "SQ", "Additional RT ROI Identification Code Sequence"),
    FrameOfReferenceRelationshipSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3006, 0x00C0), "SQ", "Frame of Reference Relationship Sequence"),
    RelatedFrameOfReferenceUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x3006, 0x00C2), "UI", "Related Frame of Reference UID"),
    FrameOfReferenceTransformationType: new TagDescriptor<"CS", string[]>(
        new Tag(0x3006, 0x00C4), "CS", "Frame of Reference Transformation Type"),
    FrameOfReferenceTransformationMatrix: new TagDescriptor<"DS", number[]>(
        new Tag(0x3006, 0x00C6), "DS", "Frame of Reference Transformation Matrix"),
    FrameOfReferenceTransformationComment: new TagDescriptor<"LO", string[]>(
        new Tag(0x3006, 0x00C8), "LO", "Frame of Reference Transformation Comment"),

    // Group 0x3008

    MeasuredDoseReferenceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3008, 0x0010), "SQ", "Measured Dose Reference Sequence"),
    MeasuredDoseDescription: new TagDescriptor<"ST", string>(
        new Tag(0x3008, 0x0012), "ST", "Measured Dose Description"),
    MeasuredDoseType: new TagDescriptor<"CS", string[]>(
        new Tag(0x3008, 0x0014), "CS", "Measured Dose Type"),
    MeasuredDoseValue: new TagDescriptor<"DS", number[]>(
        new Tag(0x3008, 0x0016), "DS", "Measured Dose Value"),
    TreatmentSessionBeamSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3008, 0x0020), "SQ", "Treatment Session Beam Sequence"),
    TreatmentSessionIonBeamSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3008, 0x0021), "SQ", "Treatment Session Ion Beam Sequence"),
    CurrentFractionNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x3008, 0x0022), "IS", "Current Fraction Number"),
    TreatmentControlPointDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x3008, 0x0024), "DA", "Treatment Control Point Date"),
    TreatmentControlPointTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x3008, 0x0025), "TM", "Treatment Control Point Time"),
    TreatmentTerminationStatus: new TagDescriptor<"CS", string[]>(
        new Tag(0x3008, 0x002A), "CS", "Treatment Termination Status"),
    TreatmentTerminationCode: new TagDescriptor<"SH", string[]>(
        new Tag(0x3008, 0x002B), "SH", "Treatment Termination Code"),
    TreatmentVerificationStatus: new TagDescriptor<"CS", string[]>(
        new Tag(0x3008, 0x002C), "CS", "Treatment Verification Status"),
    ReferencedTreatmentRecordSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3008, 0x0030), "SQ", "Referenced Treatment Record Sequence"),
    SpecifiedPrimaryMeterset: new TagDescriptor<"DS", number[]>(
        new Tag(0x3008, 0x0032), "DS", "Specified Primary Meterset"),
    SpecifiedSecondaryMeterset: new TagDescriptor<"DS", number[]>(
        new Tag(0x3008, 0x0033), "DS", "Specified Secondary Meterset"),
    DeliveredPrimaryMeterset: new TagDescriptor<"DS", number[]>(
        new Tag(0x3008, 0x0036), "DS", "Delivered Primary Meterset"),
    DeliveredSecondaryMeterset: new TagDescriptor<"DS", number[]>(
        new Tag(0x3008, 0x0037), "DS", "Delivered Secondary Meterset"),
    SpecifiedTreatmentTime: new TagDescriptor<"DS", number[]>(
        new Tag(0x3008, 0x003A), "DS", "Specified Treatment Time"),
    DeliveredTreatmentTime: new TagDescriptor<"DS", number[]>(
        new Tag(0x3008, 0x003B), "DS", "Delivered Treatment Time"),
    ControlPointDeliverySequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3008, 0x0040), "SQ", "Control Point Delivery Sequence"),
    IonControlPointDeliverySequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3008, 0x0041), "SQ", "Ion Control Point Delivery Sequence"),
    SpecifiedMeterset: new TagDescriptor<"DS", number[]>(
        new Tag(0x3008, 0x0042), "DS", "Specified Meterset"),
    DeliveredMeterset: new TagDescriptor<"DS", number[]>(
        new Tag(0x3008, 0x0044), "DS", "Delivered Meterset"),
    MetersetRateSet: new TagDescriptor<"FL", number[]>(
        new Tag(0x3008, 0x0045), "FL", "Meterset Rate Set"),
    MetersetRateDelivered: new TagDescriptor<"FL", number[]>(
        new Tag(0x3008, 0x0046), "FL", "Meterset Rate Delivered"),
    ScanSpotMetersetsDelivered: new TagDescriptor<"FL", number[]>(
        new Tag(0x3008, 0x0047), "FL", "Scan Spot Metersets Delivered"),
    DoseRateDelivered: new TagDescriptor<"DS", number[]>(
        new Tag(0x3008, 0x0048), "DS", "Dose Rate Delivered"),
    TreatmentSummaryCalculatedDoseReferenceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3008, 0x0050), "SQ", "Treatment Summary Calculated Dose Reference Sequence"),
    CumulativeDoseToDoseReference: new TagDescriptor<"DS", number[]>(
        new Tag(0x3008, 0x0052), "DS", "Cumulative Dose to Dose Reference"),
    FirstTreatmentDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x3008, 0x0054), "DA", "First Treatment Date"),
    MostRecentTreatmentDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x3008, 0x0056), "DA", "Most Recent Treatment Date"),
    NumberOfFractionsDelivered: new TagDescriptor<"IS", number[]>(
        new Tag(0x3008, 0x005A), "IS", "Number of Fractions Delivered"),
    OverrideSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3008, 0x0060), "SQ", "Override Sequence"),
    ParameterSequencePointer: new TagDescriptor<"AT", TagInterface[]>(
        new Tag(0x3008, 0x0061), "AT", "Parameter Sequence Pointer"),
    OverrideParameterPointer: new TagDescriptor<"AT", TagInterface[]>(
        new Tag(0x3008, 0x0062), "AT", "Override Parameter Pointer"),
    ParameterItemIndex: new TagDescriptor<"IS", number[]>(
        new Tag(0x3008, 0x0063), "IS", "Parameter Item Index"),
    MeasuredDoseReferenceNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x3008, 0x0064), "IS", "Measured Dose Reference Number"),
    ParameterPointer: new TagDescriptor<"AT", TagInterface[]>(
        new Tag(0x3008, 0x0065), "AT", "Parameter Pointer"),
    OverrideReason: new TagDescriptor<"ST", string>(
        new Tag(0x3008, 0x0066), "ST", "Override Reason"),
    ParameterValueNumber: new TagDescriptor<"US", number[]>(
        new Tag(0x3008, 0x0067), "US", "Parameter Value Number"),
    CorrectedParameterSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3008, 0x0068), "SQ", "Corrected Parameter Sequence"),
    CorrectionValue: new TagDescriptor<"FL", number[]>(
        new Tag(0x3008, 0x006A), "FL", "Correction Value"),
    CalculatedDoseReferenceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3008, 0x0070), "SQ", "Calculated Dose Reference Sequence"),
    CalculatedDoseReferenceNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x3008, 0x0072), "IS", "Calculated Dose Reference Number"),
    CalculatedDoseReferenceDescription: new TagDescriptor<"ST", string>(
        new Tag(0x3008, 0x0074), "ST", "Calculated Dose Reference Description"),
    CalculatedDoseReferenceDoseValue: new TagDescriptor<"DS", number[]>(
        new Tag(0x3008, 0x0076), "DS", "Calculated Dose Reference Dose Value"),
    StartMeterset: new TagDescriptor<"DS", number[]>(
        new Tag(0x3008, 0x0078), "DS", "Start Meterset"),
    EndMeterset: new TagDescriptor<"DS", number[]>(
        new Tag(0x3008, 0x007A), "DS", "End Meterset"),
    ReferencedMeasuredDoseReferenceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3008, 0x0080), "SQ", "Referenced Measured Dose Reference Sequence"),
    ReferencedMeasuredDoseReferenceNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x3008, 0x0082), "IS", "Referenced Measured Dose Reference Number"),
    ReferencedCalculatedDoseReferenceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3008, 0x0090), "SQ", "Referenced Calculated Dose Reference Sequence"),
    ReferencedCalculatedDoseReferenceNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x3008, 0x0092), "IS", "Referenced Calculated Dose Reference Number"),
    BeamLimitingDeviceLeafPairsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3008, 0x00A0), "SQ", "Beam Limiting Device Leaf Pairs Sequence"),
    RecordedWedgeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3008, 0x00B0), "SQ", "Recorded Wedge Sequence"),
    RecordedCompensatorSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3008, 0x00C0), "SQ", "Recorded Compensator Sequence"),
    RecordedBlockSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3008, 0x00D0), "SQ", "Recorded Block Sequence"),
    TreatmentSummaryMeasuredDoseReferenceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3008, 0x00E0), "SQ", "Treatment Summary Measured Dose Reference Sequence"),
    RecordedSnoutSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3008, 0x00F0), "SQ", "Recorded Snout Sequence"),
    RecordedRangeShifterSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3008, 0x00F2), "SQ", "Recorded Range Shifter Sequence"),
    RecordedLateralSpreadingDeviceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3008, 0x00F4), "SQ", "Recorded Lateral Spreading Device Sequence"),
    RecordedRangeModulatorSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3008, 0x00F6), "SQ", "Recorded Range Modulator Sequence"),
    RecordedSourceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3008, 0x0100), "SQ", "Recorded Source Sequence"),
    SourceSerialNumber: new TagDescriptor<"LO", string[]>(
        new Tag(0x3008, 0x0105), "LO", "Source Serial Number"),
    TreatmentSessionApplicationSetupSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3008, 0x0110), "SQ", "Treatment Session Application Setup Sequence"),
    ApplicationSetupCheck: new TagDescriptor<"CS", string[]>(
        new Tag(0x3008, 0x0116), "CS", "Application Setup Check"),
    RecordedBrachyAccessoryDeviceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3008, 0x0120), "SQ", "Recorded Brachy Accessory Device Sequence"),
    ReferencedBrachyAccessoryDeviceNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x3008, 0x0122), "IS", "Referenced Brachy Accessory Device Number"),
    RecordedChannelSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3008, 0x0130), "SQ", "Recorded Channel Sequence"),
    SpecifiedChannelTotalTime: new TagDescriptor<"DS", number[]>(
        new Tag(0x3008, 0x0132), "DS", "Specified Channel Total Time"),
    DeliveredChannelTotalTime: new TagDescriptor<"DS", number[]>(
        new Tag(0x3008, 0x0134), "DS", "Delivered Channel Total Time"),
    SpecifiedNumberOfPulses: new TagDescriptor<"IS", number[]>(
        new Tag(0x3008, 0x0136), "IS", "Specified Number of Pulses"),
    DeliveredNumberOfPulses: new TagDescriptor<"IS", number[]>(
        new Tag(0x3008, 0x0138), "IS", "Delivered Number of Pulses"),
    SpecifiedPulseRepetitionInterval: new TagDescriptor<"DS", number[]>(
        new Tag(0x3008, 0x013A), "DS", "Specified Pulse Repetition Interval"),
    DeliveredPulseRepetitionInterval: new TagDescriptor<"DS", number[]>(
        new Tag(0x3008, 0x013C), "DS", "Delivered Pulse Repetition Interval"),
    RecordedSourceApplicatorSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3008, 0x0140), "SQ", "Recorded Source Applicator Sequence"),
    ReferencedSourceApplicatorNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x3008, 0x0142), "IS", "Referenced Source Applicator Number"),
    RecordedChannelShieldSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3008, 0x0150), "SQ", "Recorded Channel Shield Sequence"),
    ReferencedChannelShieldNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x3008, 0x0152), "IS", "Referenced Channel Shield Number"),
    BrachyControlPointDeliveredSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3008, 0x0160), "SQ", "Brachy Control Point Delivered Sequence"),
    SafePositionExitDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x3008, 0x0162), "DA", "Safe Position Exit Date"),
    SafePositionExitTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x3008, 0x0164), "TM", "Safe Position Exit Time"),
    SafePositionReturnDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x3008, 0x0166), "DA", "Safe Position Return Date"),
    SafePositionReturnTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x3008, 0x0168), "TM", "Safe Position Return Time"),
    PulseSpecificBrachyControlPointDeliveredSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3008, 0x0171), "SQ", "Pulse Specific Brachy Control Point Delivered Sequence"),
    PulseNumber: new TagDescriptor<"US", number[]>(
        new Tag(0x3008, 0x0172), "US", "Pulse Number"),
    BrachyPulseControlPointDeliveredSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3008, 0x0173), "SQ", "Brachy Pulse Control Point Delivered Sequence"),
    CurrentTreatmentStatus: new TagDescriptor<"CS", string[]>(
        new Tag(0x3008, 0x0200), "CS", "Current Treatment Status"),
    TreatmentStatusComment: new TagDescriptor<"ST", string>(
        new Tag(0x3008, 0x0202), "ST", "Treatment Status Comment"),
    FractionGroupSummarySequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3008, 0x0220), "SQ", "Fraction Group Summary Sequence"),
    ReferencedFractionNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x3008, 0x0223), "IS", "Referenced Fraction Number"),
    FractionGroupType: new TagDescriptor<"CS", string[]>(
        new Tag(0x3008, 0x0224), "CS", "Fraction Group Type"),
    BeamStopperPosition: new TagDescriptor<"CS", string[]>(
        new Tag(0x3008, 0x0230), "CS", "Beam Stopper Position"),
    FractionStatusSummarySequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x3008, 0x0240), "SQ", "Fraction Status Summary Sequence"),
    TreatmentDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x3008, 0x0250), "DA", "Treatment Date"),
    TreatmentTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x3008, 0x0251), "TM", "Treatment Time"),

    // Group 0x300A

    RTPlanLabel: new TagDescriptor<"SH", string[]>(
        new Tag(0x300A, 0x0002), "SH", "RT Plan Label"),
    RTPlanName: new TagDescriptor<"LO", string[]>(
        new Tag(0x300A, 0x0003), "LO", "RT Plan Name"),
    RTPlanDescription: new TagDescriptor<"ST", string>(
        new Tag(0x300A, 0x0004), "ST", "RT Plan Description"),
    RTPlanDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x300A, 0x0006), "DA", "RT Plan Date"),
    RTPlanTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x300A, 0x0007), "TM", "RT Plan Time"),
    TreatmentProtocols: new TagDescriptor<"LO", string[]>(
        new Tag(0x300A, 0x0009), "LO", "Treatment Protocols"),
    PlanIntent: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x000A), "CS", "Plan Intent"),
    TreatmentSites: new TagDescriptor<"LO", string[]>(
        new Tag(0x300A, 0x000B), "LO", "Treatment Sites"),
    RTPlanGeometry: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x000C), "CS", "RT Plan Geometry"),
    PrescriptionDescription: new TagDescriptor<"ST", string>(
        new Tag(0x300A, 0x000E), "ST", "Prescription Description"),
    DoseReferenceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x0010), "SQ", "Dose Reference Sequence"),
    DoseReferenceNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x0012), "IS", "Dose Reference Number"),
    DoseReferenceUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x300A, 0x0013), "UI", "Dose Reference UID"),
    DoseReferenceStructureType: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x0014), "CS", "Dose Reference Structure Type"),
    NominalBeamEnergyUnit: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x0015), "CS", "Nominal Beam Energy Unit"),
    DoseReferenceDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x300A, 0x0016), "LO", "Dose Reference Description"),
    DoseReferencePointCoordinates: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0018), "DS", "Dose Reference Point Coordinates"),
    NominalPriorDose: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x001A), "DS", "Nominal Prior Dose"),
    DoseReferenceType: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x0020), "CS", "Dose Reference Type"),
    ConstraintWeight: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0021), "DS", "Constraint Weight"),
    DeliveryWarningDose: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0022), "DS", "Delivery Warning Dose"),
    DeliveryMaximumDose: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0023), "DS", "Delivery Maximum Dose"),
    TargetMinimumDose: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0025), "DS", "Target Minimum Dose"),
    TargetPrescriptionDose: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0026), "DS", "Target Prescription Dose"),
    TargetMaximumDose: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0027), "DS", "Target Maximum Dose"),
    TargetUnderdoseVolumeFraction: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0028), "DS", "Target Underdose Volume Fraction"),
    OrganAtRiskFullVolumeDose: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x002A), "DS", "Organ at Risk Full-volume Dose"),
    OrganAtRiskLimitDose: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x002B), "DS", "Organ at Risk Limit Dose"),
    OrganAtRiskMaximumDose: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x002C), "DS", "Organ at Risk Maximum Dose"),
    OrganAtRiskOverdoseVolumeFraction: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x002D), "DS", "Organ at Risk Overdose Volume Fraction"),
    ToleranceTableSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x0040), "SQ", "Tolerance Table Sequence"),
    ToleranceTableNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x0042), "IS", "Tolerance Table Number"),
    ToleranceTableLabel: new TagDescriptor<"SH", string[]>(
        new Tag(0x300A, 0x0043), "SH", "Tolerance Table Label"),
    GantryAngleTolerance: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0044), "DS", "Gantry Angle Tolerance"),
    BeamLimitingDeviceAngleTolerance: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0046), "DS", "Beam Limiting Device Angle Tolerance"),
    BeamLimitingDeviceToleranceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x0048), "SQ", "Beam Limiting Device Tolerance Sequence"),
    BeamLimitingDevicePositionTolerance: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x004A), "DS", "Beam Limiting Device Position Tolerance"),
    SnoutPositionTolerance: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x004B), "FL", "Snout Position Tolerance"),
    PatientSupportAngleTolerance: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x004C), "DS", "Patient Support Angle Tolerance"),
    TableTopEccentricAngleTolerance: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x004E), "DS", "Table Top Eccentric Angle Tolerance"),
    TableTopPitchAngleTolerance: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x004F), "FL", "Table Top Pitch Angle Tolerance"),
    TableTopRollAngleTolerance: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x0050), "FL", "Table Top Roll Angle Tolerance"),
    TableTopVerticalPositionTolerance: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0051), "DS", "Table Top Vertical Position Tolerance"),
    TableTopLongitudinalPositionTolerance: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0052), "DS", "Table Top Longitudinal Position Tolerance"),
    TableTopLateralPositionTolerance: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0053), "DS", "Table Top Lateral Position Tolerance"),
    RTPlanRelationship: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x0055), "CS", "RT Plan Relationship"),
    FractionGroupSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x0070), "SQ", "Fraction Group Sequence"),
    FractionGroupNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x0071), "IS", "Fraction Group Number"),
    FractionGroupDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x300A, 0x0072), "LO", "Fraction Group Description"),
    NumberOfFractionsPlanned: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x0078), "IS", "Number of Fractions Planned"),
    NumberOfFractionPatternDigitsPerDay: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x0079), "IS", "Number of Fraction Pattern Digits Per Day"),
    RepeatFractionCycleLength: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x007A), "IS", "Repeat Fraction Cycle Length"),
    FractionPattern: new TagDescriptor<"LT", string>(
        new Tag(0x300A, 0x007B), "LT", "Fraction Pattern"),
    NumberOfBeams: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x0080), "IS", "Number of Beams"),
    BeamDoseSpecificationPoint: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0082), "DS", "Beam Dose Specification Point"),
    ReferencedDoseReferenceUID: new TagDescriptor<"UI", string[]>(
        new Tag(0x300A, 0x0083), "UI", "Referenced Dose Reference UID"),
    BeamDose: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0084), "DS", "Beam Dose"),
    BeamMeterset: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0086), "DS", "Beam Meterset"),
    BeamDosePointDepth: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x0088), "FL", "Beam Dose Point Depth"),
    BeamDosePointEquivalentDepth: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x0089), "FL", "Beam Dose Point Equivalent Depth"),
    BeamDosePointSSD: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x008A), "FL", "Beam Dose Point SSD"),
    BeamDoseMeaning: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x008B), "CS", "Beam Dose Meaning"),
    BeamDoseVerificationControlPointSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x008C), "SQ", "Beam Dose Verification Control Point Sequence"),
    AverageBeamDosePointDepth: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x008D), "FL", "Average Beam Dose Point Depth"),
    AverageBeamDosePointEquivalentDepth: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x008E), "FL", "Average Beam Dose Point Equivalent Depth"),
    AverageBeamDosePointSSD: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x008F), "FL", "Average Beam Dose Point SSD"),
    BeamDoseType: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x0090), "CS", "Beam Dose Type"),
    AlternateBeamDose: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0091), "DS", "Alternate Beam Dose"),
    AlternateBeamDoseType: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x0092), "CS", "Alternate Beam Dose Type"),
    DepthValueAveragingFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x0093), "CS", "Depth Value Averaging Flag"),
    BeamDosePointSourceToExternalContourDistance: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0094), "DS", "Beam Dose Point Source to External Contour Distance"),
    NumberOfBrachyApplicationSetups: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x00A0), "IS", "Number of Brachy Application Setups"),
    BrachyApplicationSetupDoseSpecificationPoint: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x00A2), "DS", "Brachy Application Setup Dose Specification Point"),
    BrachyApplicationSetupDose: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x00A4), "DS", "Brachy Application Setup Dose"),
    BeamSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x00B0), "SQ", "Beam Sequence"),
    TreatmentMachineName: new TagDescriptor<"SH", string[]>(
        new Tag(0x300A, 0x00B2), "SH", "Treatment Machine Name"),
    PrimaryDosimeterUnit: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x00B3), "CS", "Primary Dosimeter Unit"),
    SourceAxisDistance: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x00B4), "DS", "Source-Axis Distance"),
    BeamLimitingDeviceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x00B6), "SQ", "Beam Limiting Device Sequence"),
    RTBeamLimitingDeviceType: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x00B8), "CS", "RT Beam Limiting Device Type"),
    SourceToBeamLimitingDeviceDistance: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x00BA), "DS", "Source to Beam Limiting Device Distance"),
    IsocenterToBeamLimitingDeviceDistance: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x00BB), "FL", "Isocenter to Beam Limiting Device Distance"),
    NumberOfLeafJawPairs: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x00BC), "IS", "Number of Leaf/Jaw Pairs"),
    LeafPositionBoundaries: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x00BE), "DS", "Leaf Position Boundaries"),
    BeamNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x00C0), "IS", "Beam Number"),
    BeamName: new TagDescriptor<"LO", string[]>(
        new Tag(0x300A, 0x00C2), "LO", "Beam Name"),
    BeamDescription: new TagDescriptor<"ST", string>(
        new Tag(0x300A, 0x00C3), "ST", "Beam Description"),
    BeamType: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x00C4), "CS", "Beam Type"),
    BeamDeliveryDurationLimit: new TagDescriptor<"FD", number[]>(
        new Tag(0x300A, 0x00C5), "FD", "Beam Delivery Duration Limit"),
    RadiationType: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x00C6), "CS", "Radiation Type"),
    HighDoseTechniqueType: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x00C7), "CS", "High-Dose Technique Type"),
    ReferenceImageNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x00C8), "IS", "Reference Image Number"),
    PlannedVerificationImageSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x00CA), "SQ", "Planned Verification Image Sequence"),
    ImagingDeviceSpecificAcquisitionParameters: new TagDescriptor<"LO", string[]>(
        new Tag(0x300A, 0x00CC), "LO", "Imaging Device-Specific Acquisition Parameters"),
    TreatmentDeliveryType: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x00CE), "CS", "Treatment Delivery Type"),
    NumberOfWedges: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x00D0), "IS", "Number of Wedges"),
    WedgeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x00D1), "SQ", "Wedge Sequence"),
    WedgeNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x00D2), "IS", "Wedge Number"),
    WedgeType: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x00D3), "CS", "Wedge Type"),
    WedgeID: new TagDescriptor<"SH", string[]>(
        new Tag(0x300A, 0x00D4), "SH", "Wedge ID"),
    WedgeAngle: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x00D5), "IS", "Wedge Angle"),
    WedgeFactor: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x00D6), "DS", "Wedge Factor"),
    TotalWedgeTrayWaterEquivalentThickness: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x00D7), "FL", "Total Wedge Tray Water-Equivalent Thickness"),
    WedgeOrientation: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x00D8), "DS", "Wedge Orientation"),
    IsocenterToWedgeTrayDistance: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x00D9), "FL", "Isocenter to Wedge Tray Distance"),
    SourceToWedgeTrayDistance: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x00DA), "DS", "Source to Wedge Tray Distance"),
    WedgeThinEdgePosition: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x00DB), "FL", "Wedge Thin Edge Position"),
    BolusID: new TagDescriptor<"SH", string[]>(
        new Tag(0x300A, 0x00DC), "SH", "Bolus ID"),
    BolusDescription: new TagDescriptor<"ST", string>(
        new Tag(0x300A, 0x00DD), "ST", "Bolus Description"),
    EffectiveWedgeAngle: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x00DE), "DS", "Effective Wedge Angle"),
    NumberOfCompensators: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x00E0), "IS", "Number of Compensators"),
    MaterialID: new TagDescriptor<"SH", string[]>(
        new Tag(0x300A, 0x00E1), "SH", "Material ID"),
    TotalCompensatorTrayFactor: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x00E2), "DS", "Total Compensator Tray Factor"),
    CompensatorSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x00E3), "SQ", "Compensator Sequence"),
    CompensatorNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x00E4), "IS", "Compensator Number"),
    CompensatorID: new TagDescriptor<"SH", string[]>(
        new Tag(0x300A, 0x00E5), "SH", "Compensator ID"),
    SourceToCompensatorTrayDistance: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x00E6), "DS", "Source to Compensator Tray Distance"),
    CompensatorRows: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x00E7), "IS", "Compensator Rows"),
    CompensatorColumns: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x00E8), "IS", "Compensator Columns"),
    CompensatorPixelSpacing: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x00E9), "DS", "Compensator Pixel Spacing"),
    CompensatorPosition: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x00EA), "DS", "Compensator Position"),
    CompensatorTransmissionData: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x00EB), "DS", "Compensator Transmission Data"),
    CompensatorThicknessData: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x00EC), "DS", "Compensator Thickness Data"),
    NumberOfBoli: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x00ED), "IS", "Number of Boli"),
    CompensatorType: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x00EE), "CS", "Compensator Type"),
    CompensatorTrayID: new TagDescriptor<"SH", string[]>(
        new Tag(0x300A, 0x00EF), "SH", "Compensator Tray ID"),
    NumberOfBlocks: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x00F0), "IS", "Number of Blocks"),
    TotalBlockTrayFactor: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x00F2), "DS", "Total Block Tray Factor"),
    TotalBlockTrayWaterEquivalentThickness: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x00F3), "FL", "Total Block Tray Water-Equivalent Thickness"),
    BlockSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x00F4), "SQ", "Block Sequence"),
    BlockTrayID: new TagDescriptor<"SH", string[]>(
        new Tag(0x300A, 0x00F5), "SH", "Block Tray ID"),
    SourceToBlockTrayDistance: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x00F6), "DS", "Source to Block Tray Distance"),
    IsocenterToBlockTrayDistance: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x00F7), "FL", "Isocenter to Block Tray Distance"),
    BlockType: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x00F8), "CS", "Block Type"),
    AccessoryCode: new TagDescriptor<"LO", string[]>(
        new Tag(0x300A, 0x00F9), "LO", "Accessory Code"),
    BlockDivergence: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x00FA), "CS", "Block Divergence"),
    BlockMountingPosition: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x00FB), "CS", "Block Mounting Position"),
    BlockNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x00FC), "IS", "Block Number"),
    BlockName: new TagDescriptor<"LO", string[]>(
        new Tag(0x300A, 0x00FE), "LO", "Block Name"),
    BlockThickness: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0100), "DS", "Block Thickness"),
    BlockTransmission: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0102), "DS", "Block Transmission"),
    BlockNumberOfPoints: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x0104), "IS", "Block Number of Points"),
    BlockData: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0106), "DS", "Block Data"),
    ApplicatorSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x0107), "SQ", "Applicator Sequence"),
    ApplicatorID: new TagDescriptor<"SH", string[]>(
        new Tag(0x300A, 0x0108), "SH", "Applicator ID"),
    ApplicatorType: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x0109), "CS", "Applicator Type"),
    ApplicatorDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x300A, 0x010A), "LO", "Applicator Description"),
    CumulativeDoseReferenceCoefficient: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x010C), "DS", "Cumulative Dose Reference Coefficient"),
    FinalCumulativeMetersetWeight: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x010E), "DS", "Final Cumulative Meterset Weight"),
    NumberOfControlPoints: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x0110), "IS", "Number of Control Points"),
    ControlPointSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x0111), "SQ", "Control Point Sequence"),
    ControlPointIndex: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x0112), "IS", "Control Point Index"),
    NominalBeamEnergy: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0114), "DS", "Nominal Beam Energy"),
    DoseRateSet: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0115), "DS", "Dose Rate Set"),
    WedgePositionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x0116), "SQ", "Wedge Position Sequence"),
    WedgePosition: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x0118), "CS", "Wedge Position"),
    BeamLimitingDevicePositionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x011A), "SQ", "Beam Limiting Device Position Sequence"),
    LeafJawPositions: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x011C), "DS", "Leaf/Jaw Positions"),
    GantryAngle: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x011E), "DS", "Gantry Angle"),
    GantryRotationDirection: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x011F), "CS", "Gantry Rotation Direction"),
    BeamLimitingDeviceAngle: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0120), "DS", "Beam Limiting Device Angle"),
    BeamLimitingDeviceRotationDirection: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x0121), "CS", "Beam Limiting Device Rotation Direction"),
    PatientSupportAngle: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0122), "DS", "Patient Support Angle"),
    PatientSupportRotationDirection: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x0123), "CS", "Patient Support Rotation Direction"),
    TableTopEccentricAxisDistance: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0124), "DS", "Table Top Eccentric Axis Distance"),
    TableTopEccentricAngle: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0125), "DS", "Table Top Eccentric Angle"),
    TableTopEccentricRotationDirection: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x0126), "CS", "Table Top Eccentric Rotation Direction"),
    TableTopVerticalPosition: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0128), "DS", "Table Top Vertical Position"),
    TableTopLongitudinalPosition: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0129), "DS", "Table Top Longitudinal Position"),
    TableTopLateralPosition: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x012A), "DS", "Table Top Lateral Position"),
    IsocenterPosition: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x012C), "DS", "Isocenter Position"),
    SurfaceEntryPoint: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x012E), "DS", "Surface Entry Point"),
    SourceToSurfaceDistance: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0130), "DS", "Source to Surface Distance"),
    AverageBeamDosePointSourceToExternalContourDistance: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x0131), "FL", "Average Beam Dose Point Source to External Contour Distance"),
    SourceToExternalContourDistance: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x0132), "FL", "Source to External Contour Distance"),
    ExternalContourEntryPoint: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x0133), "FL", "External Contour Entry Point"),
    CumulativeMetersetWeight: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0134), "DS", "Cumulative Meterset Weight"),
    TableTopPitchAngle: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x0140), "FL", "Table Top Pitch Angle"),
    TableTopPitchRotationDirection: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x0142), "CS", "Table Top Pitch Rotation Direction"),
    TableTopRollAngle: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x0144), "FL", "Table Top Roll Angle"),
    TableTopRollRotationDirection: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x0146), "CS", "Table Top Roll Rotation Direction"),
    HeadFixationAngle: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x0148), "FL", "Head Fixation Angle"),
    GantryPitchAngle: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x014A), "FL", "Gantry Pitch Angle"),
    GantryPitchRotationDirection: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x014C), "CS", "Gantry Pitch Rotation Direction"),
    GantryPitchAngleTolerance: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x014E), "FL", "Gantry Pitch Angle Tolerance"),
    FixationEye: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x0150), "CS", "Fixation Eye"),
    ChairHeadFramePosition: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0151), "DS", "Chair Head Frame Position"),
    HeadFixationAngleTolerance: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0152), "DS", "Head Fixation Angle Tolerance"),
    ChairHeadFramePositionTolerance: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0153), "DS", "Chair Head Frame Position Tolerance"),
    FixationLightAzimuthalAngleTolerance: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0154), "DS", "Fixation Light Azimuthal Angle Tolerance"),
    FixationLightPolarAngleTolerance: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0155), "DS", "Fixation Light Polar Angle Tolerance"),
    PatientSetupSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x0180), "SQ", "Patient Setup Sequence"),
    PatientSetupNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x0182), "IS", "Patient Setup Number"),
    PatientSetupLabel: new TagDescriptor<"LO", string[]>(
        new Tag(0x300A, 0x0183), "LO", "Patient Setup Label"),
    PatientAdditionalPosition: new TagDescriptor<"LO", string[]>(
        new Tag(0x300A, 0x0184), "LO", "Patient Additional Position"),
    FixationDeviceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x0190), "SQ", "Fixation Device Sequence"),
    FixationDeviceType: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x0192), "CS", "Fixation Device Type"),
    FixationDeviceLabel: new TagDescriptor<"SH", string[]>(
        new Tag(0x300A, 0x0194), "SH", "Fixation Device Label"),
    FixationDeviceDescription: new TagDescriptor<"ST", string>(
        new Tag(0x300A, 0x0196), "ST", "Fixation Device Description"),
    FixationDevicePosition: new TagDescriptor<"SH", string[]>(
        new Tag(0x300A, 0x0198), "SH", "Fixation Device Position"),
    FixationDevicePitchAngle: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x0199), "FL", "Fixation Device Pitch Angle"),
    FixationDeviceRollAngle: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x019A), "FL", "Fixation Device Roll Angle"),
    ShieldingDeviceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x01A0), "SQ", "Shielding Device Sequence"),
    ShieldingDeviceType: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x01A2), "CS", "Shielding Device Type"),
    ShieldingDeviceLabel: new TagDescriptor<"SH", string[]>(
        new Tag(0x300A, 0x01A4), "SH", "Shielding Device Label"),
    ShieldingDeviceDescription: new TagDescriptor<"ST", string>(
        new Tag(0x300A, 0x01A6), "ST", "Shielding Device Description"),
    ShieldingDevicePosition: new TagDescriptor<"SH", string[]>(
        new Tag(0x300A, 0x01A8), "SH", "Shielding Device Position"),
    SetupTechnique: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x01B0), "CS", "Setup Technique"),
    SetupTechniqueDescription: new TagDescriptor<"ST", string>(
        new Tag(0x300A, 0x01B2), "ST", "Setup Technique Description"),
    SetupDeviceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x01B4), "SQ", "Setup Device Sequence"),
    SetupDeviceType: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x01B6), "CS", "Setup Device Type"),
    SetupDeviceLabel: new TagDescriptor<"SH", string[]>(
        new Tag(0x300A, 0x01B8), "SH", "Setup Device Label"),
    SetupDeviceDescription: new TagDescriptor<"ST", string>(
        new Tag(0x300A, 0x01BA), "ST", "Setup Device Description"),
    SetupDeviceParameter: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x01BC), "DS", "Setup Device Parameter"),
    SetupReferenceDescription: new TagDescriptor<"ST", string>(
        new Tag(0x300A, 0x01D0), "ST", "Setup Reference Description"),
    TableTopVerticalSetupDisplacement: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x01D2), "DS", "Table Top Vertical Setup Displacement"),
    TableTopLongitudinalSetupDisplacement: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x01D4), "DS", "Table Top Longitudinal Setup Displacement"),
    TableTopLateralSetupDisplacement: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x01D6), "DS", "Table Top Lateral Setup Displacement"),
    BrachyTreatmentTechnique: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x0200), "CS", "Brachy Treatment Technique"),
    BrachyTreatmentType: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x0202), "CS", "Brachy Treatment Type"),
    TreatmentMachineSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x0206), "SQ", "Treatment Machine Sequence"),
    SourceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x0210), "SQ", "Source Sequence"),
    SourceNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x0212), "IS", "Source Number"),
    SourceType: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x0214), "CS", "Source Type"),
    SourceManufacturer: new TagDescriptor<"LO", string[]>(
        new Tag(0x300A, 0x0216), "LO", "Source Manufacturer"),
    ActiveSourceDiameter: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0218), "DS", "Active Source Diameter"),
    ActiveSourceLength: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x021A), "DS", "Active Source Length"),
    SourceModelID: new TagDescriptor<"SH", string[]>(
        new Tag(0x300A, 0x021B), "SH", "Source Model ID"),
    SourceDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x300A, 0x021C), "LO", "Source Description"),
    SourceEncapsulationNominalThickness: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0222), "DS", "Source Encapsulation Nominal Thickness"),
    SourceEncapsulationNominalTransmission: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0224), "DS", "Source Encapsulation Nominal Transmission"),
    SourceIsotopeName: new TagDescriptor<"LO", string[]>(
        new Tag(0x300A, 0x0226), "LO", "Source Isotope Name"),
    SourceIsotopeHalfLife: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0228), "DS", "Source Isotope Half Life"),
    SourceStrengthUnits: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x0229), "CS", "Source Strength Units"),
    ReferenceAirKermaRate: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x022A), "DS", "Reference Air Kerma Rate"),
    SourceStrength: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x022B), "DS", "Source Strength"),
    SourceStrengthReferenceDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x300A, 0x022C), "DA", "Source Strength Reference Date"),
    SourceStrengthReferenceTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x300A, 0x022E), "TM", "Source Strength Reference Time"),
    ApplicationSetupSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x0230), "SQ", "Application Setup Sequence"),
    ApplicationSetupType: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x0232), "CS", "Application Setup Type"),
    ApplicationSetupNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x0234), "IS", "Application Setup Number"),
    ApplicationSetupName: new TagDescriptor<"LO", string[]>(
        new Tag(0x300A, 0x0236), "LO", "Application Setup Name"),
    ApplicationSetupManufacturer: new TagDescriptor<"LO", string[]>(
        new Tag(0x300A, 0x0238), "LO", "Application Setup Manufacturer"),
    TemplateNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x0240), "IS", "Template Number"),
    TemplateType: new TagDescriptor<"SH", string[]>(
        new Tag(0x300A, 0x0242), "SH", "Template Type"),
    TemplateName: new TagDescriptor<"LO", string[]>(
        new Tag(0x300A, 0x0244), "LO", "Template Name"),
    TotalReferenceAirKerma: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0250), "DS", "Total Reference Air Kerma"),
    BrachyAccessoryDeviceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x0260), "SQ", "Brachy Accessory Device Sequence"),
    BrachyAccessoryDeviceNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x0262), "IS", "Brachy Accessory Device Number"),
    BrachyAccessoryDeviceID: new TagDescriptor<"SH", string[]>(
        new Tag(0x300A, 0x0263), "SH", "Brachy Accessory Device ID"),
    BrachyAccessoryDeviceType: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x0264), "CS", "Brachy Accessory Device Type"),
    BrachyAccessoryDeviceName: new TagDescriptor<"LO", string[]>(
        new Tag(0x300A, 0x0266), "LO", "Brachy Accessory Device Name"),
    BrachyAccessoryDeviceNominalThickness: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x026A), "DS", "Brachy Accessory Device Nominal Thickness"),
    BrachyAccessoryDeviceNominalTransmission: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x026C), "DS", "Brachy Accessory Device Nominal Transmission"),
    ChannelEffectiveLength: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0271), "DS", "Channel Effective Length"),
    ChannelInnerLength: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0272), "DS", "Channel Inner Length"),
    AfterloaderChannelID: new TagDescriptor<"SH", string[]>(
        new Tag(0x300A, 0x0273), "SH", "Afterloader Channel ID"),
    SourceApplicatorTipLength: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0274), "DS", "Source Applicator Tip Length"),
    ChannelSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x0280), "SQ", "Channel Sequence"),
    ChannelNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x0282), "IS", "Channel Number"),
    ChannelLength: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0284), "DS", "Channel Length"),
    ChannelTotalTime: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0286), "DS", "Channel Total Time"),
    SourceMovementType: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x0288), "CS", "Source Movement Type"),
    NumberOfPulses: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x028A), "IS", "Number of Pulses"),
    PulseRepetitionInterval: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x028C), "DS", "Pulse Repetition Interval"),
    SourceApplicatorNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x0290), "IS", "Source Applicator Number"),
    SourceApplicatorID: new TagDescriptor<"SH", string[]>(
        new Tag(0x300A, 0x0291), "SH", "Source Applicator ID"),
    SourceApplicatorType: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x0292), "CS", "Source Applicator Type"),
    SourceApplicatorName: new TagDescriptor<"LO", string[]>(
        new Tag(0x300A, 0x0294), "LO", "Source Applicator Name"),
    SourceApplicatorLength: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0296), "DS", "Source Applicator Length"),
    SourceApplicatorManufacturer: new TagDescriptor<"LO", string[]>(
        new Tag(0x300A, 0x0298), "LO", "Source Applicator Manufacturer"),
    SourceApplicatorWallNominalThickness: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x029C), "DS", "Source Applicator Wall Nominal Thickness"),
    SourceApplicatorWallNominalTransmission: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x029E), "DS", "Source Applicator Wall Nominal Transmission"),
    SourceApplicatorStepSize: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x02A0), "DS", "Source Applicator Step Size"),
    TransferTubeNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x02A2), "IS", "Transfer Tube Number"),
    TransferTubeLength: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x02A4), "DS", "Transfer Tube Length"),
    ChannelShieldSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x02B0), "SQ", "Channel Shield Sequence"),
    ChannelShieldNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x02B2), "IS", "Channel Shield Number"),
    ChannelShieldID: new TagDescriptor<"SH", string[]>(
        new Tag(0x300A, 0x02B3), "SH", "Channel Shield ID"),
    ChannelShieldName: new TagDescriptor<"LO", string[]>(
        new Tag(0x300A, 0x02B4), "LO", "Channel Shield Name"),
    ChannelShieldNominalThickness: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x02B8), "DS", "Channel Shield Nominal Thickness"),
    ChannelShieldNominalTransmission: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x02BA), "DS", "Channel Shield Nominal Transmission"),
    FinalCumulativeTimeWeight: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x02C8), "DS", "Final Cumulative Time Weight"),
    BrachyControlPointSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x02D0), "SQ", "Brachy Control Point Sequence"),
    ControlPointRelativePosition: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x02D2), "DS", "Control Point Relative Position"),
    ControlPoint3DPosition: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x02D4), "DS", "Control Point 3D Position"),
    CumulativeTimeWeight: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x02D6), "DS", "Cumulative Time Weight"),
    CompensatorDivergence: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x02E0), "CS", "Compensator Divergence"),
    CompensatorMountingPosition: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x02E1), "CS", "Compensator Mounting Position"),
    SourceToCompensatorDistance: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x02E2), "DS", "Source to Compensator Distance"),
    TotalCompensatorTrayWaterEquivalentThickness: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x02E3), "FL", "Total Compensator Tray Water-Equivalent Thickness"),
    IsocenterToCompensatorTrayDistance: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x02E4), "FL", "Isocenter to Compensator Tray Distance"),
    CompensatorColumnOffset: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x02E5), "FL", "Compensator Column Offset"),
    IsocenterToCompensatorDistances: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x02E6), "FL", "Isocenter to Compensator Distances"),
    CompensatorRelativeStoppingPowerRatio: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x02E7), "FL", "Compensator Relative Stopping Power Ratio"),
    CompensatorMillingToolDiameter: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x02E8), "FL", "Compensator Milling Tool Diameter"),
    IonRangeCompensatorSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x02EA), "SQ", "Ion Range Compensator Sequence"),
    CompensatorDescription: new TagDescriptor<"LT", string>(
        new Tag(0x300A, 0x02EB), "LT", "Compensator Description"),
    RadiationMassNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x0302), "IS", "Radiation Mass Number"),
    RadiationAtomicNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x0304), "IS", "Radiation Atomic Number"),
    RadiationChargeState: new TagDescriptor<"SS", number[]>(
        new Tag(0x300A, 0x0306), "SS", "Radiation Charge State"),
    ScanMode: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x0308), "CS", "Scan Mode"),
    ModulatedScanModeType: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x0309), "CS", "Modulated Scan Mode Type"),
    VirtualSourceAxisDistances: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x030A), "FL", "Virtual Source-Axis Distances"),
    SnoutSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x030C), "SQ", "Snout Sequence"),
    SnoutPosition: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x030D), "FL", "Snout Position"),
    SnoutID: new TagDescriptor<"SH", string[]>(
        new Tag(0x300A, 0x030F), "SH", "Snout ID"),
    NumberOfRangeShifters: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x0312), "IS", "Number of Range Shifters"),
    RangeShifterSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x0314), "SQ", "Range Shifter Sequence"),
    RangeShifterNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x0316), "IS", "Range Shifter Number"),
    RangeShifterID: new TagDescriptor<"SH", string[]>(
        new Tag(0x300A, 0x0318), "SH", "Range Shifter ID"),
    RangeShifterType: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x0320), "CS", "Range Shifter Type"),
    RangeShifterDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x300A, 0x0322), "LO", "Range Shifter Description"),
    NumberOfLateralSpreadingDevices: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x0330), "IS", "Number of Lateral Spreading Devices"),
    LateralSpreadingDeviceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x0332), "SQ", "Lateral Spreading Device Sequence"),
    LateralSpreadingDeviceNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x0334), "IS", "Lateral Spreading Device Number"),
    LateralSpreadingDeviceID: new TagDescriptor<"SH", string[]>(
        new Tag(0x300A, 0x0336), "SH", "Lateral Spreading Device ID"),
    LateralSpreadingDeviceType: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x0338), "CS", "Lateral Spreading Device Type"),
    LateralSpreadingDeviceDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x300A, 0x033A), "LO", "Lateral Spreading Device Description"),
    LateralSpreadingDeviceWaterEquivalentThickness: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x033C), "FL", "Lateral Spreading Device Water Equivalent Thickness"),
    NumberOfRangeModulators: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x0340), "IS", "Number of Range Modulators"),
    RangeModulatorSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x0342), "SQ", "Range Modulator Sequence"),
    RangeModulatorNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x0344), "IS", "Range Modulator Number"),
    RangeModulatorID: new TagDescriptor<"SH", string[]>(
        new Tag(0x300A, 0x0346), "SH", "Range Modulator ID"),
    RangeModulatorType: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x0348), "CS", "Range Modulator Type"),
    RangeModulatorDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x300A, 0x034A), "LO", "Range Modulator Description"),
    BeamCurrentModulationID: new TagDescriptor<"SH", string[]>(
        new Tag(0x300A, 0x034C), "SH", "Beam Current Modulation ID"),
    PatientSupportType: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x0350), "CS", "Patient Support Type"),
    PatientSupportID: new TagDescriptor<"SH", string[]>(
        new Tag(0x300A, 0x0352), "SH", "Patient Support ID"),
    PatientSupportAccessoryCode: new TagDescriptor<"LO", string[]>(
        new Tag(0x300A, 0x0354), "LO", "Patient Support Accessory Code"),
    TrayAccessoryCode: new TagDescriptor<"LO", string[]>(
        new Tag(0x300A, 0x0355), "LO", "Tray Accessory Code"),
    FixationLightAzimuthalAngle: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x0356), "FL", "Fixation Light Azimuthal Angle"),
    FixationLightPolarAngle: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x0358), "FL", "Fixation Light Polar Angle"),
    MetersetRate: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x035A), "FL", "Meterset Rate"),
    RangeShifterSettingsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x0360), "SQ", "Range Shifter Settings Sequence"),
    RangeShifterSetting: new TagDescriptor<"LO", string[]>(
        new Tag(0x300A, 0x0362), "LO", "Range Shifter Setting"),
    IsocenterToRangeShifterDistance: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x0364), "FL", "Isocenter to Range Shifter Distance"),
    RangeShifterWaterEquivalentThickness: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x0366), "FL", "Range Shifter Water Equivalent Thickness"),
    LateralSpreadingDeviceSettingsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x0370), "SQ", "Lateral Spreading Device Settings Sequence"),
    LateralSpreadingDeviceSetting: new TagDescriptor<"LO", string[]>(
        new Tag(0x300A, 0x0372), "LO", "Lateral Spreading Device Setting"),
    IsocenterToLateralSpreadingDeviceDistance: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x0374), "FL", "Isocenter to Lateral Spreading Device Distance"),
    RangeModulatorSettingsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x0380), "SQ", "Range Modulator Settings Sequence"),
    RangeModulatorGatingStartValue: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x0382), "FL", "Range Modulator Gating Start Value"),
    RangeModulatorGatingStopValue: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x0384), "FL", "Range Modulator Gating Stop Value"),
    RangeModulatorGatingStartWaterEquivalentThickness: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x0386), "FL", "Range Modulator Gating Start Water Equivalent Thickness"),
    RangeModulatorGatingStopWaterEquivalentThickness: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x0388), "FL", "Range Modulator Gating Stop Water Equivalent Thickness"),
    IsocenterToRangeModulatorDistance: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x038A), "FL", "Isocenter to Range Modulator Distance"),
    ScanSpotTimeOffset: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x038F), "FL", "Scan Spot Time Offset"),
    ScanSpotTuneID: new TagDescriptor<"SH", string[]>(
        new Tag(0x300A, 0x0390), "SH", "Scan Spot Tune ID"),
    ScanSpotPrescribedIndices: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x0391), "IS", "Scan Spot Prescribed Indices"),
    NumberOfScanSpotPositions: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x0392), "IS", "Number of Scan Spot Positions"),
    ScanSpotReordered: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x0393), "CS", "Scan Spot Reordered"),
    ScanSpotPositionMap: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x0394), "FL", "Scan Spot Position Map"),
    ScanSpotReorderingAllowed: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x0395), "CS", "Scan Spot Reordering Allowed"),
    ScanSpotMetersetWeights: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x0396), "FL", "Scan Spot Meterset Weights"),
    ScanningSpotSize: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x0398), "FL", "Scanning Spot Size"),
    NumberOfPaintings: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x039A), "IS", "Number of Paintings"),
    IonToleranceTableSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x03A0), "SQ", "Ion Tolerance Table Sequence"),
    IonBeamSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x03A2), "SQ", "Ion Beam Sequence"),
    IonBeamLimitingDeviceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x03A4), "SQ", "Ion Beam Limiting Device Sequence"),
    IonBlockSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x03A6), "SQ", "Ion Block Sequence"),
    IonControlPointSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x03A8), "SQ", "Ion Control Point Sequence"),
    IonWedgeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x03AA), "SQ", "Ion Wedge Sequence"),
    IonWedgePositionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x03AC), "SQ", "Ion Wedge Position Sequence"),
    ReferencedSetupImageSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x0401), "SQ", "Referenced Setup Image Sequence"),
    SetupImageComment: new TagDescriptor<"ST", string>(
        new Tag(0x300A, 0x0402), "ST", "Setup Image Comment"),
    MotionSynchronizationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x0410), "SQ", "Motion Synchronization Sequence"),
    ControlPointOrientation: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x0412), "FL", "Control Point Orientation"),
    GeneralAccessorySequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x0420), "SQ", "General Accessory Sequence"),
    GeneralAccessoryID: new TagDescriptor<"SH", string[]>(
        new Tag(0x300A, 0x0421), "SH", "General Accessory ID"),
    GeneralAccessoryDescription: new TagDescriptor<"ST", string>(
        new Tag(0x300A, 0x0422), "ST", "General Accessory Description"),
    GeneralAccessoryType: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x0423), "CS", "General Accessory Type"),
    GeneralAccessoryNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x0424), "IS", "General Accessory Number"),
    SourceToGeneralAccessoryDistance: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x0425), "FL", "Source to General Accessory Distance"),
    ApplicatorGeometrySequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x0431), "SQ", "Applicator Geometry Sequence"),
    ApplicatorApertureShape: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x0432), "CS", "Applicator Aperture Shape"),
    ApplicatorOpening: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x0433), "FL", "Applicator Opening"),
    ApplicatorOpeningX: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x0434), "FL", "Applicator Opening X"),
    ApplicatorOpeningY: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x0435), "FL", "Applicator Opening Y"),
    SourceToApplicatorMountingPositionDistance: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x0436), "FL", "Source to Applicator Mounting Position Distance"),
    NumberOfBlockSlabItems: new TagDescriptor<"IS", number[]>(
        new Tag(0x300A, 0x0440), "IS", "Number of Block Slab Items"),
    BlockSlabSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x0441), "SQ", "Block Slab Sequence"),
    BlockSlabThickness: new TagDescriptor<"DS", number[]>(
        new Tag(0x300A, 0x0442), "DS", "Block Slab Thickness"),
    BlockSlabNumber: new TagDescriptor<"US", number[]>(
        new Tag(0x300A, 0x0443), "US", "Block Slab Number"),
    DeviceMotionControlSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x0450), "SQ", "Device Motion Control Sequence"),
    DeviceMotionExecutionMode: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x0451), "CS", "Device Motion Execution Mode"),
    DeviceMotionObservationMode: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x0452), "CS", "Device Motion Observation Mode"),
    DeviceMotionParameterCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x0453), "SQ", "Device Motion Parameter Code Sequence"),
    DistalDepthFraction: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x0501), "FL", "Distal Depth Fraction"),
    DistalDepth: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x0502), "FL", "Distal Depth"),
    NominalRangeModulationFractions: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x0503), "FL", "Nominal Range Modulation Fractions"),
    NominalRangeModulatedRegionDepths: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x0504), "FL", "Nominal Range Modulated Region Depths"),
    DepthDoseParametersSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x0505), "SQ", "Depth Dose Parameters Sequence"),
    DeliveredDepthDoseParametersSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300A, 0x0506), "SQ", "Delivered Depth Dose Parameters Sequence"),
    DeliveredDistalDepthFraction: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x0507), "FL", "Delivered Distal Depth Fraction"),
    DeliveredDistalDepth: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x0508), "FL", "Delivered Distal Depth"),
    DeliveredNominalRangeModulationFractions: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x0509), "FL", "Delivered Nominal Range Modulation Fractions"),
    DeliveredNominalRangeModulatedRegionDepths: new TagDescriptor<"FL", number[]>(
        new Tag(0x300A, 0x0510), "FL", "Delivered Nominal Range Modulated Region Depths"),
    DeliveredReferenceDoseDefinition: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x0511), "CS", "Delivered Reference Dose Definition"),
    ReferenceDoseDefinition: new TagDescriptor<"CS", string[]>(
        new Tag(0x300A, 0x0512), "CS", "Reference Dose Definition"),

    // Group 0x300C

    ReferencedRTPlanSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300C, 0x0002), "SQ", "Referenced RT Plan Sequence"),
    ReferencedBeamSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300C, 0x0004), "SQ", "Referenced Beam Sequence"),
    ReferencedBeamNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x300C, 0x0006), "IS", "Referenced Beam Number"),
    ReferencedReferenceImageNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x300C, 0x0007), "IS", "Referenced Reference Image Number"),
    StartCumulativeMetersetWeight: new TagDescriptor<"DS", number[]>(
        new Tag(0x300C, 0x0008), "DS", "Start Cumulative Meterset Weight"),
    EndCumulativeMetersetWeight: new TagDescriptor<"DS", number[]>(
        new Tag(0x300C, 0x0009), "DS", "End Cumulative Meterset Weight"),
    ReferencedBrachyApplicationSetupSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300C, 0x000A), "SQ", "Referenced Brachy Application Setup Sequence"),
    ReferencedBrachyApplicationSetupNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x300C, 0x000C), "IS", "Referenced Brachy Application Setup Number"),
    ReferencedSourceNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x300C, 0x000E), "IS", "Referenced Source Number"),
    ReferencedFractionGroupSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300C, 0x0020), "SQ", "Referenced Fraction Group Sequence"),
    ReferencedFractionGroupNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x300C, 0x0022), "IS", "Referenced Fraction Group Number"),
    ReferencedVerificationImageSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300C, 0x0040), "SQ", "Referenced Verification Image Sequence"),
    ReferencedReferenceImageSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300C, 0x0042), "SQ", "Referenced Reference Image Sequence"),
    ReferencedDoseReferenceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300C, 0x0050), "SQ", "Referenced Dose Reference Sequence"),
    ReferencedDoseReferenceNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x300C, 0x0051), "IS", "Referenced Dose Reference Number"),
    BrachyReferencedDoseReferenceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300C, 0x0055), "SQ", "Brachy Referenced Dose Reference Sequence"),
    ReferencedStructureSetSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300C, 0x0060), "SQ", "Referenced Structure Set Sequence"),
    ReferencedPatientSetupNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x300C, 0x006A), "IS", "Referenced Patient Setup Number"),
    ReferencedDoseSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300C, 0x0080), "SQ", "Referenced Dose Sequence"),
    ReferencedToleranceTableNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x300C, 0x00A0), "IS", "Referenced Tolerance Table Number"),
    ReferencedBolusSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300C, 0x00B0), "SQ", "Referenced Bolus Sequence"),
    ReferencedWedgeNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x300C, 0x00C0), "IS", "Referenced Wedge Number"),
    ReferencedCompensatorNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x300C, 0x00D0), "IS", "Referenced Compensator Number"),
    ReferencedBlockNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x300C, 0x00E0), "IS", "Referenced Block Number"),
    ReferencedControlPointIndex: new TagDescriptor<"IS", number[]>(
        new Tag(0x300C, 0x00F0), "IS", "Referenced Control Point Index"),
    ReferencedControlPointSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300C, 0x00F2), "SQ", "Referenced Control Point Sequence"),
    ReferencedStartControlPointIndex: new TagDescriptor<"IS", number[]>(
        new Tag(0x300C, 0x00F4), "IS", "Referenced Start Control Point Index"),
    ReferencedStopControlPointIndex: new TagDescriptor<"IS", number[]>(
        new Tag(0x300C, 0x00F6), "IS", "Referenced Stop Control Point Index"),
    ReferencedRangeShifterNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x300C, 0x0100), "IS", "Referenced Range Shifter Number"),
    ReferencedLateralSpreadingDeviceNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x300C, 0x0102), "IS", "Referenced Lateral Spreading Device Number"),
    ReferencedRangeModulatorNumber: new TagDescriptor<"IS", number[]>(
        new Tag(0x300C, 0x0104), "IS", "Referenced Range Modulator Number"),
    OmittedBeamTaskSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x300C, 0x0111), "SQ", "Omitted Beam Task Sequence"),
    ReasonForOmission: new TagDescriptor<"CS", string[]>(
        new Tag(0x300C, 0x0112), "CS", "Reason for Omission"),
    ReasonForOmissionDescription: new TagDescriptor<"LO", string[]>(
        new Tag(0x300C, 0x0113), "LO", "Reason for Omission Description"),

    // Group 0x300E

    ApprovalStatus: new TagDescriptor<"CS", string[]>(
        new Tag(0x300E, 0x0002), "CS", "Approval Status"),
    ReviewDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x300E, 0x0004), "DA", "Review Date"),
    ReviewTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x300E, 0x0005), "TM", "Review Time"),
    ReviewerName: new TagDescriptor<"PN", string[]>(
        new Tag(0x300E, 0x0008), "PN", "Reviewer Name"),

    // Group 0x4000

    Arbitrary: new TagDescriptor<"LT", string>(
        new Tag(0x4000, 0x0010), "LT", "Arbitrary"),
    TextComments: new TagDescriptor<"LT", string>(
        new Tag(0x4000, 0x4000), "LT", "Text Comments"),

    // Group 0x4008

    ResultsID: new TagDescriptor<"SH", string[]>(
        new Tag(0x4008, 0x0040), "SH", "Results ID"),
    ResultsIDIssuer: new TagDescriptor<"LO", string[]>(
        new Tag(0x4008, 0x0042), "LO", "Results ID Issuer"),
    ReferencedInterpretationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x4008, 0x0050), "SQ", "Referenced Interpretation Sequence"),
    ReportProductionStatusTrial: new TagDescriptor<"CS", string[]>(
        new Tag(0x4008, 0x00FF), "CS", "Report Production Status (Trial)"),
    InterpretationRecordedDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x4008, 0x0100), "DA", "Interpretation Recorded Date"),
    InterpretationRecordedTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x4008, 0x0101), "TM", "Interpretation Recorded Time"),
    InterpretationRecorder: new TagDescriptor<"PN", string[]>(
        new Tag(0x4008, 0x0102), "PN", "Interpretation Recorder"),
    ReferenceToRecordedSound: new TagDescriptor<"LO", string[]>(
        new Tag(0x4008, 0x0103), "LO", "Reference to Recorded Sound"),
    InterpretationTranscriptionDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x4008, 0x0108), "DA", "Interpretation Transcription Date"),
    InterpretationTranscriptionTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x4008, 0x0109), "TM", "Interpretation Transcription Time"),
    InterpretationTranscriber: new TagDescriptor<"PN", string[]>(
        new Tag(0x4008, 0x010A), "PN", "Interpretation Transcriber"),
    InterpretationText: new TagDescriptor<"ST", string>(
        new Tag(0x4008, 0x010B), "ST", "Interpretation Text"),
    InterpretationAuthor: new TagDescriptor<"PN", string[]>(
        new Tag(0x4008, 0x010C), "PN", "Interpretation Author"),
    InterpretationApproverSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x4008, 0x0111), "SQ", "Interpretation Approver Sequence"),
    InterpretationApprovalDate: new TagDescriptor<"DA", string[]>(
        new Tag(0x4008, 0x0112), "DA", "Interpretation Approval Date"),
    InterpretationApprovalTime: new TagDescriptor<"TM", string[]>(
        new Tag(0x4008, 0x0113), "TM", "Interpretation Approval Time"),
    PhysicianApprovingInterpretation: new TagDescriptor<"PN", string[]>(
        new Tag(0x4008, 0x0114), "PN", "Physician Approving Interpretation"),
    InterpretationDiagnosisDescription: new TagDescriptor<"LT", string>(
        new Tag(0x4008, 0x0115), "LT", "Interpretation Diagnosis Description"),
    InterpretationDiagnosisCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x4008, 0x0117), "SQ", "Interpretation Diagnosis Code Sequence"),
    ResultsDistributionListSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x4008, 0x0118), "SQ", "Results Distribution List Sequence"),
    DistributionName: new TagDescriptor<"PN", string[]>(
        new Tag(0x4008, 0x0119), "PN", "Distribution Name"),
    DistributionAddress: new TagDescriptor<"LO", string[]>(
        new Tag(0x4008, 0x011A), "LO", "Distribution Address"),
    InterpretationID: new TagDescriptor<"SH", string[]>(
        new Tag(0x4008, 0x0200), "SH", "Interpretation ID"),
    InterpretationIDIssuer: new TagDescriptor<"LO", string[]>(
        new Tag(0x4008, 0x0202), "LO", "Interpretation ID Issuer"),
    InterpretationTypeID: new TagDescriptor<"CS", string[]>(
        new Tag(0x4008, 0x0210), "CS", "Interpretation Type ID"),
    InterpretationStatusID: new TagDescriptor<"CS", string[]>(
        new Tag(0x4008, 0x0212), "CS", "Interpretation Status ID"),
    Impressions: new TagDescriptor<"ST", string>(
        new Tag(0x4008, 0x0300), "ST", "Impressions"),
    ResultsComments: new TagDescriptor<"ST", string>(
        new Tag(0x4008, 0x4000), "ST", "Results Comments"),

    // Group 0x4010

    LowEnergyDetectors: new TagDescriptor<"CS", string[]>(
        new Tag(0x4010, 0x0001), "CS", "Low Energy Detectors"),
    HighEnergyDetectors: new TagDescriptor<"CS", string[]>(
        new Tag(0x4010, 0x0002), "CS", "High Energy Detectors"),
    DetectorGeometrySequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x4010, 0x0004), "SQ", "Detector Geometry Sequence"),
    ThreatROIVoxelSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x4010, 0x1001), "SQ", "Threat ROI Voxel Sequence"),
    ThreatROIBase: new TagDescriptor<"FL", number[]>(
        new Tag(0x4010, 0x1004), "FL", "Threat ROI Base"),
    ThreatROIExtents: new TagDescriptor<"FL", number[]>(
        new Tag(0x4010, 0x1005), "FL", "Threat ROI Extents"),
    ThreatROIBitmap: new TagDescriptor<"OB", Uint8Array | LazyValue<Uint8Array>>(
        new Tag(0x4010, 0x1006), "OB", "Threat ROI Bitmap"),
    RouteSegmentID: new TagDescriptor<"SH", string[]>(
        new Tag(0x4010, 0x1007), "SH", "Route Segment ID"),
    GantryType: new TagDescriptor<"CS", string[]>(
        new Tag(0x4010, 0x1008), "CS", "Gantry Type"),
    OOIOwnerType: new TagDescriptor<"CS", string[]>(
        new Tag(0x4010, 0x1009), "CS", "OOI Owner Type"),
    RouteSegmentSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x4010, 0x100A), "SQ", "Route Segment Sequence"),
    PotentialThreatObjectID: new TagDescriptor<"US", number[]>(
        new Tag(0x4010, 0x1010), "US", "Potential Threat Object ID"),
    ThreatSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x4010, 0x1011), "SQ", "Threat Sequence"),
    ThreatCategory: new TagDescriptor<"CS", string[]>(
        new Tag(0x4010, 0x1012), "CS", "Threat Category"),
    ThreatCategoryDescription: new TagDescriptor<"LT", string>(
        new Tag(0x4010, 0x1013), "LT", "Threat Category Description"),
    ATDAbilityAssessment: new TagDescriptor<"CS", string[]>(
        new Tag(0x4010, 0x1014), "CS", "ATD Ability Assessment"),
    ATDAssessmentFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x4010, 0x1015), "CS", "ATD Assessment Flag"),
    ATDAssessmentProbability: new TagDescriptor<"FL", number[]>(
        new Tag(0x4010, 0x1016), "FL", "ATD Assessment Probability"),
    Mass: new TagDescriptor<"FL", number[]>(
        new Tag(0x4010, 0x1017), "FL", "Mass"),
    Density: new TagDescriptor<"FL", number[]>(
        new Tag(0x4010, 0x1018), "FL", "Density"),
    ZEffective: new TagDescriptor<"FL", number[]>(
        new Tag(0x4010, 0x1019), "FL", "Z Effective"),
    BoardingPassID: new TagDescriptor<"SH", string[]>(
        new Tag(0x4010, 0x101A), "SH", "Boarding Pass ID"),
    CenterOfMass: new TagDescriptor<"FL", number[]>(
        new Tag(0x4010, 0x101B), "FL", "Center of Mass"),
    CenterOfPTO: new TagDescriptor<"FL", number[]>(
        new Tag(0x4010, 0x101C), "FL", "Center of PTO"),
    BoundingPolygon: new TagDescriptor<"FL", number[]>(
        new Tag(0x4010, 0x101D), "FL", "Bounding Polygon"),
    RouteSegmentStartLocationID: new TagDescriptor<"SH", string[]>(
        new Tag(0x4010, 0x101E), "SH", "Route Segment Start Location ID"),
    RouteSegmentEndLocationID: new TagDescriptor<"SH", string[]>(
        new Tag(0x4010, 0x101F), "SH", "Route Segment End Location ID"),
    RouteSegmentLocationIDType: new TagDescriptor<"CS", string[]>(
        new Tag(0x4010, 0x1020), "CS", "Route Segment Location ID Type"),
    AbortReason: new TagDescriptor<"CS", string[]>(
        new Tag(0x4010, 0x1021), "CS", "Abort Reason"),
    VolumeOfPTO: new TagDescriptor<"FL", number[]>(
        new Tag(0x4010, 0x1023), "FL", "Volume of PTO"),
    AbortFlag: new TagDescriptor<"CS", string[]>(
        new Tag(0x4010, 0x1024), "CS", "Abort Flag"),
    RouteSegmentStartTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x4010, 0x1025), "DT", "Route Segment Start Time"),
    RouteSegmentEndTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x4010, 0x1026), "DT", "Route Segment End Time"),
    TDRType: new TagDescriptor<"CS", string[]>(
        new Tag(0x4010, 0x1027), "CS", "TDR Type"),
    InternationalRouteSegment: new TagDescriptor<"CS", string[]>(
        new Tag(0x4010, 0x1028), "CS", "International Route Segment"),
    ThreatDetectionAlgorithmandVersion: new TagDescriptor<"LO", string[]>(
        new Tag(0x4010, 0x1029), "LO", "Threat Detection Algorithm and Version"),
    AssignedLocation: new TagDescriptor<"SH", string[]>(
        new Tag(0x4010, 0x102A), "SH", "Assigned Location"),
    AlarmDecisionTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x4010, 0x102B), "DT", "Alarm Decision Time"),
    AlarmDecision: new TagDescriptor<"CS", string[]>(
        new Tag(0x4010, 0x1031), "CS", "Alarm Decision"),
    NumberOfTotalObjects: new TagDescriptor<"US", number[]>(
        new Tag(0x4010, 0x1033), "US", "Number of Total Objects"),
    NumberOfAlarmObjects: new TagDescriptor<"US", number[]>(
        new Tag(0x4010, 0x1034), "US", "Number of Alarm Objects"),
    PTORepresentationSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x4010, 0x1037), "SQ", "PTO Representation Sequence"),
    ATDAssessmentSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x4010, 0x1038), "SQ", "ATD Assessment Sequence"),
    TIPType: new TagDescriptor<"CS", string[]>(
        new Tag(0x4010, 0x1039), "CS", "TIP Type"),
    DICOSVersion: new TagDescriptor<"CS", string[]>(
        new Tag(0x4010, 0x103A), "CS", "DICOS Version"),
    OOIOwnerCreationTime: new TagDescriptor<"DT", string[]>(
        new Tag(0x4010, 0x1041), "DT", "OOI Owner Creation Time"),
    OOIType: new TagDescriptor<"CS", string[]>(
        new Tag(0x4010, 0x1042), "CS", "OOI Type"),
    OOISize: new TagDescriptor<"FL", number[]>(
        new Tag(0x4010, 0x1043), "FL", "OOI Size"),
    AcquisitionStatus: new TagDescriptor<"CS", string[]>(
        new Tag(0x4010, 0x1044), "CS", "Acquisition Status"),
    BasisMaterialsCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x4010, 0x1045), "SQ", "Basis Materials Code Sequence"),
    PhantomType: new TagDescriptor<"CS", string[]>(
        new Tag(0x4010, 0x1046), "CS", "Phantom Type"),
    OOIOwnerSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x4010, 0x1047), "SQ", "OOI Owner Sequence"),
    ScanType: new TagDescriptor<"CS", string[]>(
        new Tag(0x4010, 0x1048), "CS", "Scan Type"),
    ItineraryID: new TagDescriptor<"LO", string[]>(
        new Tag(0x4010, 0x1051), "LO", "Itinerary ID"),
    ItineraryIDType: new TagDescriptor<"SH", string[]>(
        new Tag(0x4010, 0x1052), "SH", "Itinerary ID Type"),
    ItineraryIDAssigningAuthority: new TagDescriptor<"LO", string[]>(
        new Tag(0x4010, 0x1053), "LO", "Itinerary ID Assigning Authority"),
    RouteID: new TagDescriptor<"SH", string[]>(
        new Tag(0x4010, 0x1054), "SH", "Route ID"),
    RouteIDAssigningAuthority: new TagDescriptor<"SH", string[]>(
        new Tag(0x4010, 0x1055), "SH", "Route ID Assigning Authority"),
    InboundArrivalType: new TagDescriptor<"CS", string[]>(
        new Tag(0x4010, 0x1056), "CS", "Inbound Arrival Type"),
    CarrierID: new TagDescriptor<"SH", string[]>(
        new Tag(0x4010, 0x1058), "SH", "Carrier ID"),
    CarrierIDAssigningAuthority: new TagDescriptor<"CS", string[]>(
        new Tag(0x4010, 0x1059), "CS", "Carrier ID Assigning Authority"),
    SourceOrientation: new TagDescriptor<"FL", number[]>(
        new Tag(0x4010, 0x1060), "FL", "Source Orientation"),
    SourcePosition: new TagDescriptor<"FL", number[]>(
        new Tag(0x4010, 0x1061), "FL", "Source Position"),
    BeltHeight: new TagDescriptor<"FL", number[]>(
        new Tag(0x4010, 0x1062), "FL", "Belt Height"),
    AlgorithmRoutingCodeSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x4010, 0x1064), "SQ", "Algorithm Routing Code Sequence"),
    TransportClassification: new TagDescriptor<"CS", string[]>(
        new Tag(0x4010, 0x1067), "CS", "Transport Classification"),
    OOITypeDescriptor: new TagDescriptor<"LT", string>(
        new Tag(0x4010, 0x1068), "LT", "OOI Type Descriptor"),
    TotalProcessingTime: new TagDescriptor<"FL", number[]>(
        new Tag(0x4010, 0x1069), "FL", "Total Processing Time"),
    DetectorCalibrationData: new TagDescriptor<"OB", Uint8Array | LazyValue<Uint8Array>>(
        new Tag(0x4010, 0x106C), "OB", "Detector Calibration Data"),
    AdditionalScreeningPerformed: new TagDescriptor<"CS", string[]>(
        new Tag(0x4010, 0x106D), "CS", "Additional Screening Performed"),
    AdditionalInspectionSelectionCriteria: new TagDescriptor<"CS", string[]>(
        new Tag(0x4010, 0x106E), "CS", "Additional Inspection Selection Criteria"),
    AdditionalInspectionMethodSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x4010, 0x106F), "SQ", "Additional Inspection Method Sequence"),
    AITDeviceType: new TagDescriptor<"CS", string[]>(
        new Tag(0x4010, 0x1070), "CS", "AIT Device Type"),
    QRMeasurementsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x4010, 0x1071), "SQ", "QR Measurements Sequence"),
    TargetMaterialSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x4010, 0x1072), "SQ", "Target Material Sequence"),
    SNRThreshold: new TagDescriptor<"FD", number[]>(
        new Tag(0x4010, 0x1073), "FD", "SNR Threshold"),
    ImageScaleRepresentation: new TagDescriptor<"DS", number[]>(
        new Tag(0x4010, 0x1075), "DS", "Image Scale Representation"),
    ReferencedPTOSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x4010, 0x1076), "SQ", "Referenced PTO Sequence"),
    ReferencedTDRInstanceSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x4010, 0x1077), "SQ", "Referenced TDR Instance Sequence"),
    PTOLocationDescription: new TagDescriptor<"ST", string>(
        new Tag(0x4010, 0x1078), "ST", "PTO Location Description"),
    AnomalyLocatorIndicatorSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x4010, 0x1079), "SQ", "Anomaly Locator Indicator Sequence"),
    AnomalyLocatorIndicator: new TagDescriptor<"FL", number[]>(
        new Tag(0x4010, 0x107A), "FL", "Anomaly Locator Indicator"),
    PTORegionSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x4010, 0x107B), "SQ", "PTO Region Sequence"),
    InspectionSelectionCriteria: new TagDescriptor<"CS", string[]>(
        new Tag(0x4010, 0x107C), "CS", "Inspection Selection Criteria"),
    SecondaryInspectionMethodSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x4010, 0x107D), "SQ", "Secondary Inspection Method Sequence"),
    PRCSToRCSOrientation: new TagDescriptor<"DS", number[]>(
        new Tag(0x4010, 0x107E), "DS", "PRCS to RCS Orientation"),

    // Group 0x4FFE

    MACParametersSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x4FFE, 0x0001), "SQ", "MAC Parameters Sequence"),

    // Group 0x5200

    SharedFunctionalGroupsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x5200, 0x9229), "SQ", "Shared Functional Groups Sequence"),
    PerFrameFunctionalGroupsSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x5200, 0x9230), "SQ", "Per-frame Functional Groups Sequence"),

    // Group 0x5400

    WaveformSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0x5400, 0x0100), "SQ", "Waveform Sequence"),
    WaveformBitsAllocated: new TagDescriptor<"US", number[]>(
        new Tag(0x5400, 0x1004), "US", "Waveform Bits Allocated"),
    WaveformSampleInterpretation: new TagDescriptor<"CS", string[]>(
        new Tag(0x5400, 0x1006), "CS", "Waveform Sample Interpretation"),

    // Group 0x5600

    FirstOrderPhaseCorrectionAngle: new TagDescriptor<"OF", Float32Array | LazyValue<Float32Array>>(
        new Tag(0x5600, 0x0010), "OF", "First Order Phase Correction Angle"),
    SpectroscopyData: new TagDescriptor<"OF", Float32Array | LazyValue<Float32Array>>(
        new Tag(0x5600, 0x0020), "OF", "Spectroscopy Data"),

    // Group 0x7FE0

    FloatPixelData: new TagDescriptor<"OF", Float32Array | LazyValue<Float32Array>>(
        new Tag(0x7FE0, 0x0008), "OF", "Float Pixel Data"),
    DoubleFloatPixelData: new TagDescriptor<"OD", Float64Array | LazyValue<Float64Array>>(
        new Tag(0x7FE0, 0x0009), "OD", "Double Float Pixel Data"),
    CoefficientsSDVN: new TagDescriptor<"OW", Uint16Array | LazyValue<Uint16Array>>(
        new Tag(0x7FE0, 0x0020), "OW", "Coefficients SDVN"),
    CoefficientsSDHN: new TagDescriptor<"OW", Uint16Array | LazyValue<Uint16Array>>(
        new Tag(0x7FE0, 0x0030), "OW", "Coefficients SDHN"),
    CoefficientsSDDN: new TagDescriptor<"OW", Uint16Array | LazyValue<Uint16Array>>(
        new Tag(0x7FE0, 0x0040), "OW", "Coefficients SDDN"),

    // Group 0xFFFA

    DigitalSignaturesSequence: new TagDescriptor<"SQ", undefined>(
        new Tag(0xFFFA, 0xFFFA), "SQ", "Digital Signatures Sequence"),

    // Group 0xFFFC

    DataSetTrailingPadding: new TagDescriptor<"OB", Uint8Array | LazyValue<Uint8Array>>(
        new Tag(0xFFFC, 0xFFFC), "OB", "Data Set Trailing Padding"),

    // Group 0xFFFE

    Item: new TagDescriptor<undefined, undefined>(
        new Tag(0xFFFE, 0xE000), undefined, "Item"),
    ItemDelimitationItem: new TagDescriptor<undefined, undefined>(
        new Tag(0xFFFE, 0xE00D), undefined, "Item Delimitation Item"),
    SequenceDelimitationItem: new TagDescriptor<undefined, undefined>(
        new Tag(0xFFFE, 0xE0DD), undefined, "Sequence Delimitation Item"),
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

function buildTagKeyword(tagName: string): string {
    return tagName.replace(" ", "");
}
