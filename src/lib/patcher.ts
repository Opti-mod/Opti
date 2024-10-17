import * as _spitroast from "spitroast";
import { instead } from "@lib/patcher";

export * from "spitroast";
export default { ..._spitroast };

// Aliucord
export function insteadDoNothing(object: any, name: string) {
    return instead(object, name, () => void 0);
}