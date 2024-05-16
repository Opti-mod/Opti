import { ReactNative as RN } from '@metro/common'
import type { ViewStyle } from 'react-native'

interface OverflowItem {
    label: string;
    IconComponent?: React.ComponentType;
    iconSource?: number;
    action: () => any;
}

interface OverflowProps {
    items: OverflowItem[] | Array<OverflowItem[]>,
    title?: string;
    iconSource?: number;
    scale?: number;
    style?: ViewStyle;
}

export default function Overflow({items, title, iconSource, scale = 1, style = {}} : OverflowProps) {
    return 
    // will continue working on it
}