import { ErrorBoundaryProps } from "@types";
import { React, ReactNative as RN, stylesheet, clipboard } from "@metro/common";
import { Forms, Button, Codeblock } from "@ui/components";

interface ErrorBoundaryState {
    hasErr: boolean;
    errText?: string;
    errName?: string;
    errCause?: string;
    errStack?: string;
}

const styles = stylesheet.createThemedStyleSheet({
    view: {
        flex: 1,
        flexDirection: "column",
        margin: 10,
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: 5,
    },
    br: {
        fontSize: 0,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20
      },
});

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasErr: false };
    }

    static getDerivedStateFromError = (error: Error) => ({ hasErr: true, errText: error.message, errName: error.name, errCause: error.cause, errStack: error.stack });

    render() {
        if (!this.state.hasErr) return this.props.children;

        return (
            <RN.ScrollView style={styles.view}>
                <Forms.FormText style={styles.title}>Opti has encountered an error.</Forms.FormText>
                <Forms.FormText style={styles.br}> </Forms.FormText>
                <Codeblock selectable style={{ marginBottom: 5 }}>{this.state.errName}</Codeblock>
                <Codeblock selectable style={{ marginBottom: 5 }}>{this.state.errText}</Codeblock>
                <Codeblock selectable style={{ marginBottom: 5 }}>{this.state.errStack}</Codeblock>
                <Forms.FormText style={styles.br}> </Forms.FormText>
                <Forms.FormText style={styles.title}>What caused this error: </Forms.FormText>
                <Codeblock selectable style={{ marginBottom: 5 }}>{this.state.errCause}</Codeblock>
                <Forms.FormText style={styles.br}> </Forms.FormText>
                <Forms.FormText style={styles.br}> </Forms.FormText>

                <Button
                    color={Button.Colors.RED}
                    size={Button.Sizes.MEDIUM}
                    look={Button.Looks.FILLED}
                    onPress={() => this.setState({ hasErr: false, errText: undefined })}
                    text="Retry"
                />
                <Forms.FormText style={styles.br}> </Forms.FormText>
                 <Button
                    color={Button.Colors.BRAND}
                    size={Button.Sizes.MEDIUM}
                    look={Button.Looks.FILLED}
                    onPress={() => clipboard.setString("" + this.state.errText)}
                    text="Copy Error to Clipboard"
                />
            </RN.ScrollView>
        )
    }
}