/*
 YES I KNOW THIS IS FROM ALIUCORD AND I DO NOT PLAN ON KEEPING IT LIKE THIS
 THIS IS JUST A CONCEPT ON TESTING BADGES

  YES I KNOW THIS IS FROM ALIUCORD AND I DO NOT PLAN ON KEEPING IT LIKE THIS
  THIS IS JUST A CONCEPT ON TESTING BADGES

  YES I KNOW THIS IS FROM ALIUCORD AND I DO NOT PLAN ON KEEPING IT LIKE THIS
 THIS IS JUST A CONCEPT ON TESTING BADGES

  YES I KNOW THIS IS FROM ALIUCORD AND I DO NOT PLAN ON KEEPING IT LIKE THIS
 THIS IS JUST A CONCEPT ON TESTING BADGES
*/

import { after } from "../patcher";
import { ReactNative as RN, React, stylesheet, toasts } from "../metro/common";
import { findByName } from "../metro/filters";

const { View, Image, TouchableOpacity } = RN;

interface BadgeOwner {
    roles: string[];
    custom?: Badge[];
}

interface Badge {
    url: string;
    text: string;
}

const roles = {
    "developer":  {
        "url": "https://raw.githubusercontent.com/Opti-mod/assets/main/opti_cog.PNG",
        "text": "Opti Developer"
    }
};

const url = "https://raw.githubusercontent.com/Opti-mod/badges/main/";

export function patchBadges()
{
    const ProfileBadges = findByName("ProfileBadges", false);

    const styles = stylesheet.createThemedStyleSheet({
        container: {
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "flex-end",
        },
        img: {
            width: 24,
            height: 24,
            resizeMode: "contain",
            marginHorizontal: 4
        }
    });

    const cache: Record<string, Badge[]> = {};

    after(ProfileBadges, "default", (ctx : any) => {
        const [, forceUpdate] = React.useReducer(x => x = !x, false);

        const user = ctx.args[0]?.user;
        if (user === undefined) return;

        const badges = cache[user.id];
        if (badges === undefined) {
            fetch(`${url}/${user.id}.json`)
                .then(r => r.json())
                .then((badges: BadgeOwner) => {
                    cache[user.id] = [...badges.roles.map(it => roles["developer"]), ...(badges.custom ?? [])];
                    cache[user.id].length && forceUpdate();
                });
            return;
        }

        const renderedBadgesView = (
            <View key="opti-badges" style={styles.container}>
                {badges.map(badge => (
                    <TouchableOpacity key={badge.url} onPress={() => {
                        toasts.open({
                            content: badge.text,
                            source: { uri: badge.url }
                        });
                    }}>
                        <Image source={{ uri: badge.url }} style={styles.img} />
                    </TouchableOpacity>
                ))}
            </View>
        );

        if (!ctx.result) return renderedBadgesView;

        ctx.result.props.children.push(renderedBadgesView);
        return;
    });
}