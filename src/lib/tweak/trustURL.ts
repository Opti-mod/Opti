import { after } from "../patcher";
import { findByStoreName } from "../metro/filters";

const MaskedLink = findByStoreName("MaskedLinkStore");
let patches: Function[] = [];

export function trustURL() {
        patches.push( 
            after("isTrustedDomain", MaskedLink, ()=>
                { 
                    return true;
                }
            ));
}

export function unloadTrustURL()
{
    for(const unpatch of patches) 
        unpatch();
}