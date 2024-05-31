import { registerCommand } from "../commands";
import debug from "./debug";
import pluginslist from "./pluginslist";
import reload from "./reload";

export function initCustomCommands(): void {
    const customCommands = [
        ...debug,
        ...reload,
        ...pluginslist
    ];
    registerCommand(customCommands);
}

export default { initCustomCommands };