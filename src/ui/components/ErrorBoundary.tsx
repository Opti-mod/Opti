import { ErrorBoundaryProps } from "@types";
import { React, ReactNative as RN, stylesheet } from "@metro/common";
import { Forms, Button, Codeblock } from "@ui/components";

interface ErrorBoundaryState {
    hasErr: boolean;
    errText?: string;
}
const styles = stylesheet.createThemedStyleSheet({
    view: {
        flex: 1,
        flexDirection: "column",
        margin: 10,
        borderRadius: 5,
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: 5,
        borderRadius: 5,
    },
});

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasErr: false };
    }

    static getDerivedStateFromError = (error: Error) => ({ hasErr: true, errText: error.message });

    render() {
        if (!this.state.hasErr) return this.props.children;

        return (
            <RN.ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 24, alignItems: "center" }}>
                <Forms.FormText style={styles.title}>Opti has encountered an error.</Forms.FormText>
                <Codeblock selectable style={{ marginBottom: 8 }}>{this.state.errText}</Codeblock>
                <Button
                    color={Button.Colors.RED}
                    size={Button.Sizes.MEDIUM}
                    look={Button.Looks.FILLED}
                    onPress={() => this.setState({ hasErr: false, errText: undefined })}
                    text="Retry"
                />
                 <Button
                    color={Button.Colors.ORANGE}
                    size={Button.Sizes.MEDIUM}
                    look={Button.Looks.FILLED}
                    onPress={() => 
                        this.setState({ hasErr: false, errText: undefined })
                    }
                    text="Send Crash Report [WIP]"
                />
            </RN.ScrollView>
            
        )
    }
}