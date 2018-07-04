
declare module "WebDicom" {

    interface FilePreambleToken {
        readonly type: "file_preamble";
        readonly bytes: Uint8Array;
    }

    interface DicomPrefixToken {
        readonly type: "dicom_prefix";
    }

    interface DicomElementToken {
        readonly type: "element";
        readonly element: DicomElement;
    }

    interface SequenceBeginToken {
        readonly type: "sequenceBegin";
        readonly path: DicomElementPath;
    }

    interface ItemBeginToken {
        readonly type: "itemBegin";
        readonly path: SequenceItemPath;
        readonly length: number | null;
    }

    interface ItemEndToken {
        readonly type: "itemEnd";
        readonly path: SequenceItemPath;
    }

    interface SequenceEndToken {
        readonly type: "sequenceEnd";
        readonly path: DicomElementPath;
    }

    type DicomStreamToken = FilePreambleToken
        | DicomPrefixToken
        | DicomElementToken
        | SequenceBeginToken
        | ItemBeginToken
        | ItemEndToken
        | SequenceEndToken;

    interface DicomInputStream {
        readonly readAsync(): AsyncIterableIterator<DicomStreamToken>;
    }

    interface DicomInputStreamFactory {
        readonly fromBlob(blob: Blob): DicomInputStream;
    }

}
