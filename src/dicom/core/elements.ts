// tslint:disable-next-line:no-implicit-dependencies
import {Tag, VR} from "WebDicom";

import {assertNotNull} from "../../helpers/assertions";
import {Tags} from "../dictionary/tags";

export function isItemSupport(tag: Tag): boolean {
    assertNotNull(tag, "tag");
    return Tags.Item.tag.sameAs(tag)
        || Tags.ItemDelimitationItem.tag.sameAs(tag)
        || Tags.SequenceDelimitationItem.tag.sameAs(tag);
}

export function isUnlimited(vr: VR): boolean {
    return vr === "OB" || vr === "OD" || vr === "OF" || vr === "OL" || vr === "OW"
        || vr === "UC" || vr === "UT" || vr === "UR" || vr === "SQ" || vr === "UN";
}

export function hasValue(vr: VR): boolean {
    return vr !== "SQ" && vr != null;
}

export function isGroupLength(tag: Tag): boolean {
    assertNotNull(tag, "tag");
    return tag.element === 0;
}

export function isPrivate(tag: Tag): boolean {
    assertNotNull(tag, "tag");
    return tag.group % 2 === 1;
}

export function isPrivateCreator(tag: Tag): boolean {
    assertNotNull(tag, "tag");
    return isPrivate(tag) && tag.element >= 0 && tag.element <= 0xFF;
}
