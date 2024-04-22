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
import { ReactNative as RN, React, stylesheet } from "../metro/common";
import { findByName } from "../metro/filters";

const { View, Image, TouchableOpacity } = RN;

interface Badge {
    url: string;
    text: string;
}

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

const ProfileBadges = findByName("ProfileBadges", false);

export function patchBadges()
{

    after(ProfileBadges, "default", (_, ctx) => {
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