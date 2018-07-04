
// tslint:disable-next-line:no-implicit-dependencies
import {Tag as TagInterface} from "WebDicom";
import {toHexWord} from "../../helpers/hex";
import {assertNotNull, assertRange, assertType} from "../../helpers/assertions";

const MAX_UINT16 = 65535;

export class Tag implements TagInterface {
    public constructor(public readonly group: number, public readonly element: number) {
        assertNotNull(group, "group");
        assertType(group, "number", "group");
        assertRange(group, 0, MAX_UINT16, "group");
        assertNotNull(element, "element");
        assertType(element, "number", "element");
        assertRange(element, 0, MAX_UINT16, "element");
    }

    public toNumber(): number {
        // tslint:disable-next-line:no-bitwise
        return (this.group << 16) | this.element;
    }

    public sameAs(other?: TagInterface | number | null): boolean {
        if (other == null) {
            return false;
        }
        if (typeof other === "number") {
            return this.toNumber() === other;
        }
        return this.group === other.group
            && this.element === other.element;
    }

    public toString(): string {
        return `(${toHexWord(this.group)},${toHexWord(this.element)})`;
    }

    public toValue(): number {
        return this.toNumber();
    }
}
