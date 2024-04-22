// please help.
// tbd will probably change badge method and ask in chat bleeeeeeeeeh 

import { after } from "../patcher";
import { ReactNative as RN, React } from "../metro/common";
import { findByName } from "../metro/filters";

const { View } = RN;
let unpatch;

export function initBadges()
{
    const profileBadges = findByName("ProfileBadges", false);
    unpatch = after("default", profileBadges, (args, res) => {
        let badge = res;
        
    })
}


function patchBadges()
{
    //TODO: render badges
}

