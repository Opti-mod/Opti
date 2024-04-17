import { ErrorBoundaryProps } from "@types";
import { React, ReactNative as RN, stylesheet, clipboard } from "@metro/common";
import { Forms, Button, Codeblock, } from "@ui/components";
import { sendCrashReport } from "@lib/webhook";

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
                <Forms.FormText style={styles.title}>{this.state.errName}</Forms.FormText>
                <Codeblock selectable style={{ marginBottom: 4 }}>{this.state.errStack}</Codeblock>
           
                <Button
                    color={Button.Colors.RED}
                    size={Button.Sizes.MEDIUM}
                    look={Button.Looks.FILLED}
                    onPress={() => this.setState({ hasErr: false, errText: undefined })}
                    text="Retry"
                />
               
                 <Button
                    color={Button.Colors.BRAND}
                    size={Button.Sizes.MEDIUM}
                    look={Button.Looks.FILLED}
                    onPress={() => clipboard.setString("" + this.state.errStack)}
                    text="Copy Error to Clipboard"
                />
           
                    <Button
                    color={Button.Colors.BRAND}
                    size={Button.Sizes.MEDIUM}
                    look={Button.Looks.FILLED}
                    onPress={() => sendCrashReport(
                        "content: " + this.state.errStack
                    )}
                    text="Send Crash Report"
                />
            </RN.ScrollView>
        )
    }
}