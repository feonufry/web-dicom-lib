
declare module "WebDicom" {

    interface TransferSyntaxesDictionary {
        readonly ImplicitVRLittleEndian: string;
        readonly ExplicitVRLittleEndian: string;
        readonly DeflatedExplicitVRLittleEndian: string;
        readonly ExplicitVRBigEndian: string;
        readonly JpegBaselineProcess1: string;
        readonly JpegExtendedProcess24: string;
        readonly JpegExtendedProcess35: string;
        readonly JpegSpectralSelectionNonHierarchicalProcess68: string;
        readonly JpegSpectralSelectionNonHierarchicalProcess79: string;
        readonly JpegSpectralSelectionNonHierarchicalProcess1012: string;
        readonly JpegSpectralSelectionNonHierarchicalProcess1113: string;
        readonly JpegLosslessNonHierarchicalProcess14: string;
        readonly JpegLosslessNonHierarchicalProcess15: string;
        readonly JpegExtendedHierarchicalProcess1618: string;
        readonly JpegExtendedHierarchicalProcess1719: string;
        readonly JpegSpectralSelectionHierarchicalProcess2022: string;
        readonly JpegSpectralSelectionHierarchicalProcess2123: string;
        readonly JpegFullProgressionHierarchicalProcess2426: string;
        readonly JpegFullProgressionHierarchicalProcess2527: string;
        readonly JpegLosslessHierarchicalProcess28: string;
        readonly JpegLosslessHierarchicalProcess29: string;
        readonly JpegLosslessNonHierarchicalFirstOrderPrediction: string;
        readonly JpegLSLosslessImageCompression: string;
        readonly JpegLSLossyImageCompression: string;
        readonly Jpeg2000ImageCompressionLosslessOnly: string;
        readonly Jpeg2000ImageCompression: string;
        readonly Jpeg2000Part2MultiComponentImageCompressionLosslessOnly: string;
        readonly Jpeg2000Part2MultiComponentImageCompression: string;
        readonly JpipReferenced: string;
        readonly JpipReferencedDeflate: string;
        readonly Mpeg2MainProfileMainLevel: string;
        readonly Mpeg2MainProfileHighLevel: string;
        readonly Mpeg4AvcH264HighProfileLevel41: string;
        readonly Mpeg4AvcH264BDCompatibleHighProfileLevel41: string;
        readonly Mpeg4AvcH264HighProfileLevel42For2DVideo: string;
        readonly Mpeg4AvcH264HighProfileLevel42For3DVideo: string;
        readonly Mpeg4AvcH264StereoHighProfileLevel42: string;
        readonly HevcH265MainProfileLevel51: string;
        readonly HevcH265Main10ProfileLevel51: string;
        readonly RleLossless: string;
        readonly Rfc2557MimeEncapsulation: string;
        readonly XmlEncoding: string;
    }

}
