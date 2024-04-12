import { after } from "../patcher";
import { findByStoreName } from "../metro/filters";

const MaskedLink = findByStoreName("MaskedLinkStore");
let patches: Function[] = [];

export function trustURL() {
    console.log("TweakManager has loaded TrustURLs.");
        patches.push( 
            after("isTrustedDomain", MaskedLink, ()=>
                { 
                    return true;
                }
            ));
}

export function unloadTrustURL()
{
    console.log("TweakManager has unloaded TrustURLs.");
    for(const unpatch of patches) 
        unpatch();
}