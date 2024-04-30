import { registerCommand } from "../commands";
import debug from "./debug";
import reload from "./reload";
import woah from "./woah";

export function initCustomCommands(): void {
    const customCommands = [
        ...debug,
        ...reload,
        ...woah,
    ];
    registerCommand(customCommands);
}

export default { initCustomCommands };