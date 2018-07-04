
type Type = "number" | "string" | "boolean" | "object" | "function";

const DEFAULT_NAME = "Value";

export function assertNotNull(value: any, name?: string): void {
    if (value != null) return;
    throw new TypeError(`${getName(name)} must not be null nor undefined.`);
}

export function assertRange(value: any, min: number, max: number, name?: string): void {
    if (value == null) return;
    if (typeof value !== "number") return;
    if (value >= min && value <= max) return;

    throw new RangeError(`${getName(name)} must be between ${min} and ${max} but it is ${value}.`);
}

export function assertType(value: any, type: Type, name?: string): void {
    if (value == null) return;
    if (typeof value === type) return;

    throw new TypeError(`${getName(name)} must be a ${type} but it is a ${typeof value}.`);
}

function getName(name: string | null | undefined): string {
    return name != null ? name : DEFAULT_NAME;
}
