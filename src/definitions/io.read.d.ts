
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

    interface DicomInputStreamConfig {
        emitItemElements: boolean;
        emitGroupLength: boolean;
        lazyLoadThreshold: number;
    }

    interface DicomInputStream {
        readonly readAsync(config?: Partial<DicomInputStreamConfig>): AsyncIterableIterator<DicomStreamToken>;
    }

    interface DicomInputStreamFactory {
        readonly fromBlob(blob: Blob, config?: Partial<DicomInputStreamConfig>): DicomInputStream;
    }

}
