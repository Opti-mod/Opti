import { ApplicationCommand, ApplicationCommandInputType, ApplicationCommandType } from "@types";
import { commands as commandsModule } from "@metro/common";
import { after } from "@lib/patcher";
import testing from "./command/testing";

let commands: ApplicationCommand[] = [];

export function patchCommands() {
    const unpatch = after("getBuiltInCommands", commandsModule, ([type], res: ApplicationCommand[]) => {
        if (type === ApplicationCommandType.CHAT) return res.concat(commands);
    });
    
    return () => {
        commands = [];
        unpatch();
    };
}

export function registerCommand(command: ApplicationCommand): () => void {
        const builtInCommands = commandsModule.getBuiltInCommands(ApplicationCommandType.CHAT, true, false);
        builtInCommands.sort((a: ApplicationCommand, b: ApplicationCommand) => parseInt(b.id!) - parseInt(a.id!));
        const lastCommand = builtInCommands[builtInCommands.length - 1];

        command.id = (parseInt(lastCommand.id, 10) - 1).toString();
        command.displayName ??= command.name;
        command.displayDescription ??= command.description;
        command.inputType = ApplicationCommandInputType.BUILT_IN;


    
    commands.push(command);
    commands.push(...testing);

    return () => (commands = commands.filter(({ id }) => id !== command.id));
}

