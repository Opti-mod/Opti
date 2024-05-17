import { findByName } from "@metro/filters";
import { after } from "@lib/patcher";
import { ReactNative as RN, React } from "@metro/common";


// import * as storage from "@lib/storage";

import { BadgeProps, CustomBadges, BadgeCache } from "./types";
import { BadgeComponent } from "./badgeComponent";


const { View } = RN;

const cache = new Map<string, BadgeCache>();
const REFRESH_INTERVAL = 1000 * 60 * 30;

let unpatch: () => boolean;
let unpatch2: () => boolean;
let cachUser;
export function patchBadges()  {
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
      const { replugged } = cachUser?.badges;
      const colors = `#${replugged?.custom?.color || '7289da'}`

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

      //  const pushOrUnpush = storage.left;
      //  if (mem?.props?.badges) pushOrUnpush ? mem.props.badges = [<RenderableBadge />, ...mem.props.badges] : mem.props.badges = [...mem.props.badges, <RenderableBadge />];
      //  else pushOrUnpush ? mem.props.children = [<RenderableBadge />, ...mem.props.children] : mem.props.children = [...mem.props.children, <RenderableBadge />];
      };

      Object.entries(cachUser?.badges).forEach(([key, value]): any => {
        switch (key) {
          case "customBadgesArray":
            if (value) {
              value.badges.map((badge: CustomBadges) => {
                pushBadge({
                  name: badge.name,
                  image: badge.badge,
                });
              });
            }
            break;
          case "aliu":
            if (value?.dev) {
              pushBadge({
                name: "Aliucord Dev",
                image: "https://cdn.discordapp.com/emojis/860165259117199401.webp",
              });
            }
            if (value?.donor) {
              pushBadge({
                name: "Aliucord Donor",
                image: "https://cdn.discordapp.com/emojis/859801776232202280.webp",
              });
            }
            if (value?.contributor) {
              pushBadge({
                name: "Aliucord Contributor",
                image: "https://cdn.discordapp.com/emojis/886587553187246120.webp",
              });
            }
            break;
          case "bd":
            if (value?.dev) {
              pushBadge({
                name: "MemoryLeak Dev",
                image: "",
                custom: <Badges.bdDevs />
              });
            }
            break;
          case "enmity":
            if (value?.supporter?.data) {
              pushBadge({
                name: "Enmity Supporter",
                image: value?.supporter?.data.url.dark,

              });
            }
            if (value?.staff?.data) {
              pushBadge({
                name: "Enmity Staff",
                image: value?.staff?.data.url.dark,
              });
            }
            if (value?.dev?.data) {
              pushBadge({
                name: "Enmity Dev",
                image: value?.dev?.data.url.dark,
              });
            }
            if (value?.contributor?.data) {
              pushBadge({
                name: "Enmity Contributor",
                image: value?.contributor?.data.url.dark,
              });
            }
            if (value[user.id]?.data) {
              pushBadge({
                name: "Enmity User",
                image: value[user.id]?.data.url.dark,
              });
            }
            break;
          case "replugged":
            if (value?.developer) {
              pushBadge({
                name: "Replugged Developer",
                image: "",
                custom: <Badges.Developer color={colors} />
              });
            }
            if (value?.staff) {
              pushBadge({
                name: "Replugged Staff",
                image: "",
                custom: <Badges.Staff color={colors} />
              });
            }
            if (value?.support) {
              pushBadge({
                name: "Replugged Support",
                image: "",
                custom: <Badges.Support color={colors} />
              });
            }
            if (value?.contributor) {
              pushBadge({
                name: "Replugged Contributor",
                image: "",
                custom: <Badges.Contributor color={colors} />
              });
            }
            if (value?.translator) {
              pushBadge({
                name: "Replugged Translator",
                image: "",
                custom: <Badges.Translator color={colors} />
              });
            }
            if (value?.hunter) {
              pushBadge({
                name: "Replugged Hunter",
                image: "",
                custom: <Badges.BugHunter color={colors} />
              });
            }
            if (value?.early) {
              pushBadge({
                name: "Replugged Early Access",
                image: "",
                custom: <Badges.EarlyUser color={colors} />
              });
            }
            if (value?.booster) {
              pushBadge({
                name: "Replugged Booster",
                image: "",
                custom: <Badges.Booster color={colors} />
              });
            }
            if (value?.custom?.name) {
              pushBadge({
                name: value.custom.name,
                image: value.custom.icon,
              });
            }
            break;
          case "vencord":
            if (value?.contributor) {
              pushBadge({
                name: "Vencord Contributor",
                image: "https://vencord.dev/assets/favicon.png",
              });
            }
            if (Boolean(value?.cutie)) {
              value.cutie.map((cutie : any) => {
                pushBadge({
                  name: cutie.tooltip,
                  image: cutie.badge,
                });
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
      `https://api.obamabot.me/v2/text/badges?user=${userId}`
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