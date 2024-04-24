import { clipboard } from "@metro/common";
import { getAssetIDByName } from "@ui/assets";
import { showToast } from "@ui/toasts";
import { Forms } from "@ui/components";
import { semanticColors } from "@/ui/color";

interface VersionProps {
    label: string;
    version: string;
    icon: string;
}

const { FormRow, FormText } = Forms;

export default function Version({ label, version, icon }: VersionProps) {
    return ( 
        <FormRow
            label={label}
            leading={<FormRow.Icon source={getAssetIDByName(icon)} />}
            trailing={<FormText style={{color: semanticColors.TEXT_NORMAL, fontSize: 13}}>{version}</FormText>}
            onPress={() => {
                clipboard.setString(`${label} - ${version}`);
                showToast("Copied version to clipboard.", getAssetIDByName("toast_copy_link"));
            }}
        />
    )
}