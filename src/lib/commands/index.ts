import { registerCommand } from "../commands";
import debug from "./debug";
import pluginslist from "./pluginslist";

export function initCustomCommands(): void {
    const customCommands = [
        ...debug,
        ...pluginslist
    ];
   //  registerCommand(customCommands);
}

export default { initCustomCommands };