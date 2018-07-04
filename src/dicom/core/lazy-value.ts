
// tslint:disable-next-line:no-implicit-dependencies
import { LazyValue as LazyValueInterface } from "WebDicom";

import {InputStream} from "../../blobs/streams";
import {assertNotNull, assertType} from "../../helpers/assertions";

export class LazyValue<T> implements LazyValueInterface<T> {
    public constructor(
            private readonly stream: InputStream,
            private readonly littleEndian: boolean) {
        assertNotNull(this.stream, "stream");
        assertNotNull(this.littleEndian, "littleEndian");
        assertType(this.littleEndian, "boolean", "littleEndian");
    }
}
