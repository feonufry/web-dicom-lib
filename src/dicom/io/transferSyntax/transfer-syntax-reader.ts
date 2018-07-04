
// tslint:disable-next-line:no-implicit-dependencies
import {AnyDicomElement, RootDataSetPath, SequenceItemPath} from "WebDicom";

export interface TransferSyntaxReader {
    readAsync(): AsyncIterableIterator<AnyDicomElement>;
    rebase(path: RootDataSetPath | SequenceItemPath): void;
}
