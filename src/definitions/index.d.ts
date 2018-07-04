
/// <reference path="./core.d.ts" />
/// <reference path="./io.read.d.ts" />
/// <reference path="./dictionary.tags.d.ts" />

declare module "WebDicom" {

    // -----------------------------------------------------------------------------------------------------------------
    // Export
    // -----------------------------------------------------------------------------------------------------------------

    interface Factories {
        readonly InputStream: DicomInputStreamFactory;
    }

    interface Dictionaries {
        readonly Tags: TagsDictionary;
        readonly TransferSyntaxes: TransferSyntaxesDictionary;
    }

    declare var Factory: Factories;
    declare var Dictionary: Dictionaries;
}
