import { ApplicationCommand, ApplicationCommandInputType, ApplicationCommandType } from "@types";
import { commands as commandsModule } from "@metro/common";
import { after } from "@lib/patcher";
import testing from "./command/testing";

let commands: ApplicationCommand[] = [];

export function patchCommands() {
    const unpatch = after("getBuiltInCommands", commandsModule, ([type], res: ApplicationCommand[]) => {
        if (type === ApplicationCommandType.CHAT) return[...res, ...commands];
    });

    return () => {
        commands = [];
        unpatch();
    };
}

export function registerCommand(command: ApplicationCommand[]): void {
    for(const commandE in command) {
        const builtInCommands = commandsModule.getBuiltInCommands(ApplicationCommandType.CHAT, true, false);
        builtInCommands.sort((a: ApplicationCommand, b: ApplicationCommand) => parseInt(b.id!) - parseInt(a.id!));
        const lastCommand = builtInCommands[builtInCommands.length - 1];
        const cmd = command[commandE];

        command[commandE] = {
        id: (parseInt(lastCommand.id, 10) - 1).toString(),
        displayName: cmd.name,
        displayDescription: cmd.description,
        type: ApplicationCommandType.CHAT,
        inputType: ApplicationCommandInputType.BUILT_IN,
        applicationId: "Opti",
        ...cmd,
        };

    }
    commands.push(...command);
}

