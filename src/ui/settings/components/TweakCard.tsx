import { ButtonColors, Theme } from "@types";
import { AsyncUsers, Profiles, User, clipboard } from "@metro/common";
import { selectTheme } from "@lib/themes";
import { useProxy } from "@lib/storage";
import { showConfirmationAlert } from "@ui/alerts";
import { showToast } from "@ui/toasts";
import settings from "@lib/settings";
import Card, { CardWrapper } from "@ui/settings/components/Card";

async function selectAndReload(value: boolean, id: string) {
    await selectTheme(value ? id : "default");
}

export default function ThemeCard({ item: theme, index }: CardWrapper<Theme>) {
    //@ts-ignore
    useProxy(settings);
    const [removed, setRemoved] = React.useState(false);
    if (removed) return null;

    //  ${authors ? `\nby ${authors.map(i => i.name).join(", ")}` : ""}
    return (
        <Card
            index={index}
            headerLabel={`${theme.data.name}`}
            headerIcon={"ic_theme_24px"}
            descriptionLabel={theme.data.description ?? "No description."}
            toggleType={"switch"}
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
                }
            ]}
        />
    )
}
