import { clipboard } from "@metro/common";
import { getAssetIDByName } from "@ui/assets";
import { showToast } from "@ui/toasts";
import { Forms } from "@ui/components";
import { semanticColors } from "@/ui/color";

interface VersionProps {
    label: string;
    version: string;
    leading?: JSX.Element;
    icon: string;
}

const { FormRow, FormText } = Forms;

export default function Version({ label, version, icon }: VersionProps) {
    return ( 
        <FormRow
            label={label}
            leading={<FormRow></FormRow>}
            trailing={<FormText style={{fontSize: 13}}>{version}</FormText>}
            onPress={() => {
                clipboard.setString(`${label} - ${version}`);
                showToast("Copied version to clipboard.", getAssetIDByName("toast_copy_link"));
            }}
        />
    )
}