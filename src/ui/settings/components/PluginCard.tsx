import { ButtonColors, Plugin } from "@types";
import { findByProps, find } from "@metro/filters";
import { NavigationNative, clipboard, Profiles } from "@metro/common";
import { removePlugin, startPlugin, stopPlugin, getSettings, fetchPlugin, plugins } from "@lib/plugins";
import { MMKVManager } from "@lib/native";
import { after, instead } from "@lib/patcher";
import { getAssetIDByName } from "@ui/assets";
import { showToast } from "@ui/toasts";
import { showConfirmationAlert } from "@ui/alerts";
import Card, { CardWrapper } from "@ui/settings/components/Card";
const { showSimpleActionSheet } = findByProps("showSimpleActionSheet");
const { hideActionSheet } = findByProps("openLazy", "hideActionSheet");

const { TextStyleSheet } = findByProps("TextStyleSheet");

async function stopThenStart(plugin: Plugin, callback: Function) {
    if (plugin.enabled) stopPlugin(plugin.id, false);
    callback();
    if (plugin.enabled) await startPlugin(plugin.id);
}

export default function PluginCard({ item: plugin, index }: CardWrapper<Plugin>) {
    const settings = getSettings(plugin.id);
    const navigation = NavigationNative.useNavigation();
    const authors = plugin.manifest.authors;
    const [removed, setRemoved] = React.useState(false);

    // This is needed because of React™
    if (removed) return null;

    return (
        <Card
            index={index}
            headerLabel={`${plugin.manifest.name}\n by ${authors.map(i => i.name).join(", ")}`}
            headerIcon={plugin.manifest.vendetta?.icon || "ic_application_command_24px"}
            toggleType="switch"
            toggleValue={plugin.enabled}
            onToggleChange={(v: boolean) => {
                try {
                    if (v) startPlugin(plugin.id); else stopPlugin(plugin.id);
                } catch (e) {
                    showToast((e as Error).message);
                }
            }}
            descriptionLabel={`${plugin.manifest.description}`}
            overflowTitle={plugin.manifest.name}
            overflowActions={[
                {
                    icon: "ic_sync_24px",
                    label: "Refetch",
                    onPress: async () => {
                        stopThenStart(plugin, () => {
                            fetchPlugin(plugin.id).then(async () => {
                                showToast("Successfully refetched plugin.", getAssetIDByName("toast_image_saved"));
                            }).catch(() => {
                                showToast("Failed to refetch plugin!", getAssetIDByName("Small"));
                            })
                        });
                    },
                },
                {
                    icon: "copy",
                    label: "Copy URL",
                    onPress: () => {
                        clipboard.setString(plugin.id);
                        showToast("Copied plugin URL to clipboard.", getAssetIDByName("toast_copy_link"));
                    }
                },
                {
                    icon: "ic_person",
                    label: "View Authors",
                    onPress: () => {
                        showSimpleActionSheet({
                            key: "PluginAuthors",
                            header: {
                                title: "Author's Profiles",
                                onClose: () => hideActionSheet(),
                            },
                            options: [
                                // TODO: add logic
                                { label: plugin.manifest.authors[0].name, onPress: () =>   Profiles.showUserProfile({ userId: plugin.manifest.authors[0]?.id }) },
                                { label: plugin.manifest.authors[1]?.name,onPress: () => showToast("Working on being able to async load other profiles.") },
                            ],
                    })
                }
                },
                {   
                    icon: "ic_download_24px",
                    label: plugin.update ? "Disable updates" : "Enable updates",
                    onPress: () => {
                        plugin.update = !plugin.update;
                        showToast(`${plugin.update ? "Enabled" : "Disabled"} updates for ${plugin.manifest.name}.`, getAssetIDByName("toast_image_saved"));
                    }
                },
                {
                    icon: "ic_duplicate",
                    label: "Clear data",
                    isDestructive: true,
                    onPress: () => showConfirmationAlert({
                        title: "Wait!",
                        content: `Are you sure you wish to clear the data of ${plugin.manifest.name}?`,
                        confirmText: "Clear",
                        cancelText: "Cancel",
                        confirmColor: ButtonColors.RED,
                        onConfirm: () => {
                            stopThenStart(plugin, () => {
                                try {
                                    MMKVManager.removeItem(plugin.id);
                                    showToast(`Cleared data for ${plugin.manifest.name}.`, getAssetIDByName("trash"));
                                } catch {
                                    showToast(`Failed to clear data for ${plugin.manifest.name}!`, getAssetIDByName("Small"));
                                }
                            });
                        }
                    }),
                },
                {
                    icon: "ic_message_delete",
                    label: "Delete",
                    isDestructive: true,
                    onPress: () => showConfirmationAlert({
                        title: "Wait!",
                        content: `Are you sure you wish to delete ${plugin.manifest.name}? This will clear all of the plugin's data.`,
                        confirmText: "Delete",
                        cancelText: "Cancel",
                        confirmColor: ButtonColors.RED,
                        onConfirm: () => {
                            try {
                                removePlugin(plugin.id);
                                setRemoved(true);
                            } catch (e) {
                                showToast((e as Error).message, getAssetIDByName("Small"));
                            }
                        }
                    }),
                },
            ]}
            actions={[
                ...(settings ? [{
                    icon: "settings",
                    onPress: () => navigation.push("VendettaCustomPage", {
                        title: plugin.manifest.name,
                        render: settings,
                    })
                }] : []),
            ]}
        />
    )
}
