import { ButtonColors, Theme } from "@types";
import { AsyncUsers, Profiles, User, clipboard } from "@metro/common";
import { fetchTheme, removeTheme, selectTheme } from "@lib/themes";
import { useProxy } from "@lib/storage";
import { BundleUpdaterManager } from "@lib/native";
import { getAssetIDByName } from "@ui/assets";
import { showConfirmationAlert } from "@ui/alerts";
import { showToast } from "@ui/toasts";
import settings from "@lib/settings";
import Card, { CardWrapper } from "@ui/settings/components/Card";

async function selectAndReload(value: boolean, id: string) {
    await selectTheme(value ? id : "default");
    BundleUpdaterManager.reload();
}

export default function ThemeCard({ item: theme, index }: CardWrapper<Theme>) {
    //@ts-ignore
    useProxy(settings);
    const [removed, setRemoved] = React.useState(false);
    const authors = theme.data.authors;
    if (removed) return null;

    //  ${authors ? `\nby ${authors.map(i => i.name).join(", ")}` : ""}
    return (
        <Card
            index={index}
            headerLabel={`${theme.data.name}`}
            headerIcon={"ic_theme_24px"}
            descriptionLabel={theme.data.description ?? "No description."}
            toggleType={!settings.safeMode?.enabled ? "switch" : undefined}
            toggleValue={theme.selected}
            onToggleChange={(v: boolean) => {
                selectAndReload(v, theme.id);
            }}
            overflowTitle={theme.data.name}
            overflowActions={[
                {
                    label: "View Creator Profile",
                    icon: "ic_profile_24px",
                    onPress: () => {
                        if (!User.getUser(theme.data.authors[0]?.id)) {
                        AsyncUsers.fetchProfile(theme.data.authors[0]?.id).then(() => {
                            Profiles.showUserProfile({ userId: theme.data.authors[0]?.id });
                        })}
                        else
                        {
                            Profiles.showUserProfile({ userId: theme.data.authors[0]?.id });
                        };
                    }
                },
                {
                    icon: "ic_sync_24px",
                    label: "Refetch",
                    onPress: () => {
                        fetchTheme(theme.id, theme.selected).then(() => {
                            if (theme.selected) {
                                showConfirmationAlert({
                                    title: "Theme refetched",
                                    content: "A reload is required to see the changes. Do you want to reload now?",
                                    confirmText: "Reload",
                                    cancelText: "Cancel",
                                    confirmColor: ButtonColors.RED,
                                    onConfirm: () => BundleUpdaterManager.reload(),
                                })
                            } else {
                                showToast("Successfully refetched theme.", getAssetIDByName("toast_image_saved"));
                            }
                        }).catch(() => {
                            showToast("Failed to refetch theme!", getAssetIDByName("Small"));
                        });
                    },
                },
                {
                    icon: "copy",
                    label: "Copy URL",
                    onPress: () => {
                        clipboard.setString(theme.id);
                        showToast("Copied shader URL to clipboard.", getAssetIDByName("toast_copy_link"));
                    }
                },
                {
                    icon: "ic_message_delete",
                    label: "Delete",
                    isDestructive: true,
                    onPress: () => showConfirmationAlert({
                        title: "Wait!",
                        content: `Are you sure you wish to delete ${theme.data.name}?`,
                        confirmText: "Delete",
                        cancelText: "Cancel",
                        confirmColor: ButtonColors.RED,
                        onConfirm: () => {
                            removeTheme(theme.id).then((wasSelected) => {
                                setRemoved(true);
                                if (wasSelected) selectAndReload(false, theme.id);
                            }).catch((e: Error) => {
                                showToast(e.message, getAssetIDByName("Small"));
                            });
                        }
                    })
                },
            ]}
        />
    )
}
