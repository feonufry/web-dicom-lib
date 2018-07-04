import {assertNotNull, assertRange, assertType} from "../helpers/assertions";
import {WebDicomError} from "../web-dicom-error";
import {InputStream} from "./streams";

export class BlobInputStream implements InputStream {
    private readonly reader: FileReader = new FileReader();
    public position: number = 0;

    public constructor(private readonly blob: Blob) {
        assertNotNull(blob, "blob");
    }

    public eof(): boolean {
        return this.position >= this.blob.size;
    }

    public getPosition(): number {
        return this.position;
    }

    public slice(length: number): InputStream | null {
        assertNotNull(length, "length");
        assertType(length, "number", "length");
        assertRange(length, 1, Number.POSITIVE_INFINITY, "length");

        if (this.position >= this.blob.size) {
            return null;
        }
        const end = Math.min(this.position + length, this.blob.size);
        return new BlobInputStream(this.blob.slice(this.position, end));
    }

    public async readAsync(bytesToRead: number): Promise<ArrayBuffer | null> {
        assertNotNull(bytesToRead, "bytesToRead");
        assertType(bytesToRead, "number", "bytesToRead");
        assertRange(bytesToRead, 1, Number.POSITIVE_INFINITY, "bytesToRead");

        if (this.position >= this.blob.size) {
            return null;
        }

        const block = await readBlockAsync(this.reader, this.blob, this.position, bytesToRead);
        this.position = block != null
            ? this.position + block.byteLength
            : this.blob.size;
        return block;
    }

    public seek(newPosition: number): void {
        assertNotNull(newPosition, "newPosition");
        assertType(newPosition, "number", "newPosition");
        assertRange(newPosition, 0, Number.POSITIVE_INFINITY, "newPosition");

        this.position = newPosition < this.blob.size
            ? newPosition
            : this.blob.size;
    }

    public seekRelative(offset: number): void {
        assertNotNull(offset, "offset");
        assertType(offset, "number", "offset");
        assertRange(offset, -this.position, Number.POSITIVE_INFINITY, "offset");

        this.position += offset;
        if (this.position > this.blob.size) {
            this.position = this.blob.size;
        }
    }
}

// tslint:disable-next-line:promise-function-async
function readBlockAsync(reader: FileReader, blob: Blob, offset: number, size: number): Promise<ArrayBuffer | null> {
    return new Promise<ArrayBuffer | null>((resolve, reject) => {
        if (offset >= blob.size) {
            resolve(null);
            return;
        }

        reader.onerror = evt => reject(convertToWebDicomError(evt, "error"));
        reader.onabort = evt => reject(convertToWebDicomError(evt, "abort"));

        reader.onloadend = evt => {
            if (evt.target == null || evt.target.readyState !== FileReader.DONE) {
                return;
            }
            resolve(evt.target.result as ArrayBuffer);
        };

        const end = Math.min(offset + size, blob.size);
        const chunkBlob = blob.slice(offset, end);
        reader.readAsArrayBuffer(chunkBlob);
    });
}

function convertToWebDicomError(event: FileReaderProgressEvent, reason: "error" | "abort"): WebDicomError {
    return new WebDicomError(
        reason === "error" ? "file_read_failed" : "file_read_aborted",
        event.target != null && event.target.error != null ? event.target.error.code : null,
        reason === "error" ? "Cannot read file chunk." : "File reading was aborted.",
        event.target != null ? event.target.error : null);
}
