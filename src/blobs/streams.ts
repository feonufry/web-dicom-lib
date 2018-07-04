
export interface InputStream {
    eof(): boolean;
    getPosition(): number;
    readAsync(bytesToRead: number): Promise<ArrayBuffer | null>;
    slice(length: number): InputStream | null;
    seek(newPosition: number): void;
    seekRelative(offset: number): void;
}
