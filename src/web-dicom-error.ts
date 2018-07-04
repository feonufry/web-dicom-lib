import {assertNotNull} from "./helpers/assertions";

export class WebDicomError extends Error {
    public constructor(
            public readonly errorCode: string,
            public readonly lowLevelCode: number | string | null,
            message: string,
            public readonly innerError: any | null = null) {
        super(message);
        assertNotNull(errorCode, "errorCode");
    }
}
