import { ReactNative as RN, stylesheet } from "@metro/common";
import { findByProps } from "@metro/filters";
import { getAssetIDByName } from "@ui/assets";
import { semanticColors } from "@ui/color";
import { Forms, Tabs } from "@ui/components";

const { FormRow, FormSwitch, FormRadio } = Forms;
const { Stack, TableRow, TableRowIcon, TableSwitchRow, TableRowGroup }= Tabs;
const { hideActionSheet } = findByProps("openLazy", "hideActionSheet");
const { showSimpleActionSheet } = findByProps("showSimpleActionSheet");

const styles = stylesheet.createThemedStyleSheet({
    card: {
        backgroundColor: semanticColors.BACKGROUND_SECONDARY,
        borderRadius: 12,
        borderColor: semanticColors.BACKGROUND_TERTIARY,
        borderWidth: 2,
    },
    header: {
        padding: 0,
        backgroundColor: semanticColors?.INTERACTIVE_MUTED,
        color: semanticColors?.INTERACTIVE_MUTED,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    description: {
        fontSize: 11,
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
    authors: {
        color: semanticColors.HEADER_SECONDARY,
        fontSize: 14,
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
    headerLabel: string | React.ComponentType;
    headerIcon?: string;
    toggleType?: "switch" | "radio";
    toggleValue?: boolean;
    onToggleChange?: (v: boolean) => void;
    descriptionLabel?: string | React.ComponentType;
    actions?: Action[];
    overflowTitle?: string;
    overflowActions?: OverflowAction[];
}

export default function Card(props: CardProps) {
    let pressableState = props.toggleValue ?? false;

    // TODO: re-position the '...' icon to next to the switch
    return ( 
        <RN.View style={[styles.card, { marginTop: props.index !== 0 ? 8 : 0 }]}>
            <TableRow
                style={styles.header}
                label={props.headerLabel}
                icon={props.headerIcon && <TableRowIcon source={getAssetIDByName(props.headerIcon)} />}
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
                        <FormRadio selected={props.toggleValue} />
                    </RN.Pressable>)
                    )
            }
                
            />
            <TableRow
                style={styles.description}
                label={props.descriptionLabel}
                trailing={
                    <RN.View style={styles.actions}>
                        {props.overflowActions && <RN.TouchableOpacity
                            onPress={() => showSimpleActionSheet({
                                key: "CardOverflow",
                                header: {
                                    title: props.overflowTitle,
                                    icon: props.headerIcon && <TableRowIcon style={{ marginRight: 4 }} source={getAssetIDByName(props.headerIcon)} />,
                                    onClose: () => hideActionSheet(),
                                },
                                // This does not work.
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
            />
        </RN.View>
    )
}
