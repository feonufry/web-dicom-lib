// tslint:disable:no-implicit-dependencies
import {
    DicomInputStream as DicomInputStreamInterface,
    DicomInputStreamConfig,
    DicomInputStreamFactory as DicomInputStreamFactoryInterface,
} from "WebDicom";
// tslint:enable:no-implicit-dependencies

import {DicomInputStream} from "./dicom-input-stream";
import {BlobInputStream} from "../../blobs/blob-input-stream";
import {assertNotNull, assertType} from "../../helpers/assertions";

export class DicomInputStreamFactory implements DicomInputStreamFactoryInterface {
    public fromBlob(blob: Blob, config?: DicomInputStreamConfig): DicomInputStreamInterface {
        assertNotNull(blob, "blob");
        assertType(blob, "object", "blob");

        return new DicomInputStream(new BlobInputStream(blob), config);
    }
}
