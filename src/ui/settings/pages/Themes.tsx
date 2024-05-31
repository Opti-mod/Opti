import { Theme, ButtonColors } from "@types";
import { useProxy } from "@lib/storage";
import { themes } from "@lib/themes";
import { Button } from "@ui/components";
import settings from "@lib/settings";
import AddonPage from "@ui/settings/components/AddonPage";
import ThemeCard from "@ui/settings/components/ThemeCard";

export default function Themes() {
    //@ts-ignore
    useProxy(settings);
    return (
        <AddonPage<Theme>
            items={themes}
            card={ThemeCard}
        />
    )
}