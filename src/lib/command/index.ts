import { registerCommand } from "../commands";
import debug from "./debug";
import testing from "./testing";

export function initCustomCommands(): void {
    const customCommands = [
        ...testing,
        ...debug,
    ];

    registerCommand(customCommands);
}

export default { initCustomCommands };