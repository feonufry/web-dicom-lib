
// tslint:disable-next-line:no-implicit-dependencies
import {Dictionaries, Factories} from "WebDicom";

import {DicomInputStreamFactory} from "./dicom/io/dicom-input-stream-factory";
import {Tags} from "./dicom/dictionary/tags";
import {TransferSyntaxes} from "./dicom/dictionary/transfer-syntaxes";

export const Factory: Factories = {
    InputStream: new DicomInputStreamFactory(),
};

export const Dictionary: Dictionaries = {
    Tags,
    TransferSyntaxes,
};
