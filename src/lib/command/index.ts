import { registerCommand } from "../commands";
import testing from "./testing";

export function initCustomCommands(): void {
    const customCommands = [
        ...testing,
    ];

    registerCommand(customCommands);
}

export default { initCustomCommands };