import { ReactNative as RN, constants, stylesheet } from "@metro/common";
import { findByProps } from "@metro/filters";
import { getAssetIDByName } from "@ui/assets";
import { semanticColors } from "@ui/color";
import { Forms } from "@ui/components";
import PluginCard from "./PluginCard";

const { FormRow, FormSwitch, FormRadio, FormDivider } = Forms;
const { hideActionSheet } = findByProps("openLazy", "hideActionSheet");
const { showSimpleActionSheet } = findByProps("showSimpleActionSheet");

// TODO: These styles work weirdly. iOS has cramped text, Android with low DPI probably does too. Fix?
const styles = stylesheet.createThemedStyleSheet({
    card: {
        backgroundColor: semanticColors.BACKGROUND_SECONDARY,
        borderRadius: 7,
        borderColor: semanticColors.BACKGROUND_TERTIARY,
        borderWidth: 1,
    },
    header: {
        padding: 0,
        backgroundColor: semanticColors.PRIMARY_DARK,
        color: semanticColors.HEADER_PRIMARY,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    headertitle: {
        fontFamily: constants.Fonts.PRIMARY_BOLD,
        fontSize: 17,
        color: semanticColors.HEADER_PRIMARY,
    },
    description: {
        color: semanticColors.TEXT_MUTED,
        fontSize: 13,
    },
    authors: {
        color: semanticColors.HEADER_SECONDARY,
        fontSize: 14,
    },
    actions: {
        flexDirection: "row-reverse",
        alignItems: "center",
    },
    icon: {
        width: 22,
        height: 22,
        marginLeft: 5,
        tintColor: semanticColors?.INTERACTIVE_NORMAL,
    },
})

interface Action {
    icon: string;
    onPress: () => void;
}

interface OverflowAction extends Action {
    label: string;
    isDestructive?: boolean;
}

export interface CardWrapper<T> {
    item: T;
    index: number;
}

interface CardProps {
    index?: number;
    headerLabel: string | React.ComponentType | (string | JSX.Element)[];
    headerIcon?: string;
    toggleType?: "switch" | "radio";
    toggleValue?: boolean;
    onToggleChange?: (v: boolean) => void;
    descriptionLabel?: string | React.ComponentType;
    actions?: Action[];
    overflowTitle?: string;
    overflowActions?: OverflowAction[];
    color?: string;
    optiLogo?: string;

}

export default function Card(props: CardProps) {
    let pressableState = props.toggleValue ?? false;

    return (
        <RN.View style={[styles.card, { marginTop: props.index !== 0 ? 10 : 0 }]}>
            <FormRow
                style={styles.header}
                label={() =>
                    <RN.View>
                        <RN.Text
                            style={styles.headertitle}>
                            {props.headerLabel}
                        </RN.Text>
                    </RN.View>}
                leading={props.headerIcon && <FormRow.Icon source={getAssetIDByName(props.headerIcon)} />}
                trailing={props.toggleType && (props.toggleType === "switch" ?
                    (<FormSwitch
                        style={RN.Platform.OS === "android" && { marginVertical: -15 }}
                        value={props.toggleValue}
                        onValueChange={props.onToggleChange}
                    />)
                    :
                    (<RN.Pressable onPress={() => {
                        pressableState = !pressableState;
                        props.onToggleChange?.(pressableState)
                    }}>
                        <FormRadio
                            selected={props.toggleValue}
                        />
                    </RN.Pressable>)
                )}
            />
            <FormDivider />
            <FormRow
                label={() => <RN.View>
                    <RN.Text
                        style={styles.description}>
                        {props.descriptionLabel}
                    </RN.Text>
                </RN.View>}
                trailing={
                    <RN.View style={styles.actions}>
                        {props.overflowActions && <RN.TouchableOpacity
                            onPress={() => showSimpleActionSheet({
                                key: "CardOverflow",
                                header: {
                                    title: props.overflowTitle,
                                    icon: props.headerIcon && <FormRow.Icon style={{ marginRight: 8 }} source={getAssetIDByName(props.headerIcon)} />,
                                    onClose: () => hideActionSheet(),
                                },
                                options: props.overflowActions?.map(i => ({ ...i, icon: getAssetIDByName(i.icon) })),
                            })}
                        >
                            <RN.Image style={styles.icon} source={getAssetIDByName("ic_more_24px")} />
                        </RN.TouchableOpacity>}
                        {props.actions?.map(({ icon, onPress }) => (
                            <RN.TouchableOpacity
                                onPress={onPress}
                            >
                                <RN.Image style={styles.icon} source={getAssetIDByName(icon)} />
                            </RN.TouchableOpacity>
                        ))}
                    </RN.View>
                }
                optiLogo={
                    <RN.View>
                        <FormRow.Icon source={{ uri: 'https://raw.githubusercontent.com/Opti-mod/assets/main/LogoOpti.png' }} />
                    </RN.View>
                }
            />
        </RN.View>
    )
}
