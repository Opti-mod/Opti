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

const url = "https://raw.githubusercontent.com/Opti-mod/badges/main";

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

    after(ProfileBadges, "default", (_, ctx) => {
        console.log("ctx thing " + ctx);

        const renderedBadgesView = (
            <View key="opti-badges" style={styles.container}>
                    <TouchableOpacity key={'https://raw.githubusercontent.com/Opti-mod/assets/main/opti_cog.PNG'} onPress={() => {
                    }}>
                        <Image source={{ uri: 'https://raw.githubusercontent.com/Opti-mod/assets/main/opti_cog.PNG' }} style={styles.img} />
                    </TouchableOpacity>
            </View>
        );

        if (!ctx.result) return renderedBadgesView;

        ctx.result.props.children.push(renderedBadgesView);
        return;
    });
}