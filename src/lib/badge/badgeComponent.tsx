const { View, Image, TouchableOpacity } = RN;
export const BadgeComponent = ({ name, image, size, margin, custom }: BadgeComponents) => {

    const styles = stylesheet.createThemedStyleSheet({
        container: {
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "flex-end",
        },
        img: {
            width: size,
            height: size,
            resizeMode: "contain",
            marginHorizontal: margin
        }
    });

    const renderBadge = () => {
        if (custom) {
            return (custom)
        } else {
            return (
                <TouchableOpacity onPress={() => toasts.open({ content: name, source: { uri: image } })}>
                    <Image style={styles.img} source={{ uri: image }} />
                </TouchableOpacity>
            )
        }
    }
    
    return (
        <View style={styles.container}>
            {renderBadge()}
        </View>
    )
}