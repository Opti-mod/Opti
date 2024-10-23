// Thank you so fucking much 
// https://github.com/WolfPlugs/vendetta-plugins/tree/master/plugins/globalBadges

import { findByName } from "@metro/filters";
import { after } from "@lib/patcher";
import { ReactNative as RN, React } from "@metro/common";

import { BadgeProps, CustomBadges, BadgeCache } from "./types";
import { BadgeComponent } from "./badgeComponent";


const { View } = RN;

const cache = new Map<string, BadgeCache>();
const REFRESH_INTERVAL = 1000 * 60 * 30;

let unpatch: () => boolean;
let unpatch2: () => boolean;
let cachUser;
export function initBadges() {
  const profileBadges = findByName("ProfileBadges", false);
  unpatch = after("default", profileBadges, (args, res) => {
    let mem = res;

    const [, updateForce] = React.useReducer(x => x = !x, false);

    const user = args[0]?.user;
    if (user === undefined) return;

    cachUser = cache.get(user.id);
    if (cachUser === undefined) {
      fetchbadges(user.id, updateForce);
      return;
    }

    const style = mem?.props?.style

    // Credits here to @acquitelol
    // https://github.com/enmity-mod/enmity/blob/8ff15a8fffc5a1ad4d41c5e8f8a02e6876a760ec/src/core/patches/badges.tsx#L81-L95
    if (!mem) {
      mem = <View
        style={[style, {
          flexDirection: "row",
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          paddingVertical: 2
        }]}
        accessibilityRole={"list"}
        accessibilityLabel={"User Badges"}
      />;

      mem.props.children = [];
    }

    const pushBadge = ({ name, image, custom = false }: BadgeProps) => {
      const RenderableBadge = () => <BadgeComponent
        custom={custom}
        name={name}
        image={image}
        size={Array.isArray(style) ? style?.find(r => r.paddingVertical && r.paddingHorizontal) ? 16 : 22 : 16}
        margin={Array.isArray(style) ? 4 : 6}
      />;

      // i really dont know what storage.left is...
      // update: with 2 minutes of using my brain, its if badges show up on the left or not.
      const pushOrUnpush = "PUSH"; // storage.left
      if (mem?.props?.badges) pushOrUnpush ? mem.props.badges = [<RenderableBadge />, ...mem.props.badges] : mem.props.badges = [...mem.props.badges, <RenderableBadge />];
      else pushOrUnpush ? mem.props.children = [<RenderableBadge />, ...mem.props.children] : mem.props.children = [...mem.props.children, <RenderableBadge />];
    };

    Object.entries(cachUser?.badges).forEach(([key, value]): any => {
      switch (key) {
        case "opti":
          if (value?.developer) {
            pushBadge({
              name: "Opti Developer",
              image: "https://raw.githubusercontent.com/Opti-mod/assets/main/BadgeDeveloper.png",
            });
          }
          if (value?.contributor) {
            pushBadge({
              name: "Opti Contributor",
              image: "https://raw.githubusercontent.com/Opti-mod/assets/main/BadgeContributor.png",
            });
          }
          if (value?.supporter) {
            pushBadge({
              name: "Opti Supporter",
              image: "https://raw.githubusercontent.com/Opti-mod/assets/main/BadgeSupporter.PNG",
            });
          }
          break;
        default:
          break;
      }
    })
  });
}
export function unloadBadges() {
  unpatch?.();
  unpatch2?.();
}

async function fetchbadges(userId: string, updateForce: any) {
  if (
    !cache.has(userId) ||
    cache.get(userId)!.lastFetch + REFRESH_INTERVAL < Date.now()
  ) {

    const res = await fetch(
      `https://raw.githubusercontent.com/Opti-mod/badges/main/${userId}.json`
    );
    const body = (await res.json()) as CustomBadges;
    const result: BadgeCache =
      res.status === 200 || res.status === 404
        ? { badges: body || {}, lastFetch: Date.now() }
        : (cache.delete(userId), { badges: body, lastFetch: Date.now() });

    cache.set(userId, result);
    updateForce();
  }

  return cache.get(userId)!.badges;
}