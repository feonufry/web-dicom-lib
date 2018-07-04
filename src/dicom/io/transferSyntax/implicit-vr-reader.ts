
// tslint:disable-next-line:no-implicit-dependencies
import {AnyDicomElement} from "WebDicom";

import {TransferSyntaxReader} from "./transfer-syntax-reader";
import {InputStream} from "../../../blobs/streams";
import {assertNotNull, assertRange, assertType} from "../../../helpers/assertions";

export class ImplicitVrReader implements TransferSyntaxReader {

    public constructor(private readonly input: InputStream,
                       private readonly lazyLoadThreshold: number) {
        assertNotNull(input, "input");
        assertNotNull(lazyLoadThreshold, "lazyLoadThreshold");
        assertType(lazyLoadThreshold, "number", "lazyLoadThreshold");
        assertRange(lazyLoadThreshold, 1, Number.POSITIVE_INFINITY, "lazyLoadThreshold");
    }

    public rebase(): void {
        throw new Error("Not implemented yet");
    }

    public async * readAsync(): AsyncIterableIterator<AnyDicomElement> {
        console.debug(this.input);
        console.debug(this.lazyLoadThreshold);
        throw new Error("Not implemented yet");
    }
}
