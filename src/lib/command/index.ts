import { registerCommand } from "../commands";
import debug from "./debug";
import reload from "./reload";
import testing from "./testing";

export function initCustomCommands(): void {
    const customCommands = [
        ...testing,
        ...debug,
        ...reload,
    ];
    registerCommand(customCommands);
}

export default { initCustomCommands };