import { ReactNative as RN } from "@metro/common";
import { useProxy } from "@lib/storage";
import { HelpMessage, ErrorBoundary, Search } from "@ui/components";
import { CardWrapper } from "@ui/settings/components/Card";
import settings from "@lib/settings";

interface AddonPageProps<T> {
    items: Record<string, T & { id: string }>;
    card: React.ComponentType<CardWrapper<T>>;
}

export default function AddonPage<T>({ items, card: CardComponent }: AddonPageProps<T>) {
    //@ts-ignore
    useProxy(settings)
    useProxy(items);
    const [search, setSearch] = React.useState("");

    return (
        <ErrorBoundary>
            <RN.FlatList
                ListHeaderComponent={<>
                    <RN.View style={{ marginBottom: 10 }}>
                    </RN.View>
                    <Search
                        style={{ marginBottom: 10 }}
                        onChangeText={(v: string) => setSearch(v.toLowerCase())}
                        placeholder="Search"
                    />
                </>}
                style={{ paddingHorizontal: 10, paddingTop: 20 }}
                contentContainerStyle={{ paddingBottom: 20 }}
                data={Object.values(items).filter(i => i.id?.toLowerCase().includes(search))}
                renderItem={({ item, index }) => <CardComponent item={item} index={index} />}
            />
        </ErrorBoundary>
    )
}