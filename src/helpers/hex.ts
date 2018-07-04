
export function toHexWord(value: number): string {
    return ("0000" + value.toString(16)).substr(-4, 4);
}
