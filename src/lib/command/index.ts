import { registerCommand } from "../commands";
import debug from "./debug";
import reload from "./reload";

export function initCustomCommands(): void {
    const customCommands = [
        ...debug,
        ...reload,
    ];

    registerCommand(customCommands);
}

export default { initCustomCommands };