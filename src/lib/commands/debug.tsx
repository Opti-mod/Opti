import { ApplicationCommand, ApplicationCommandOptionType } from "@/def";
import { Messages, clipboard, toasts } from "../metro/common";
import { getAssetIDByName } from "@/ui/assets";

export default [ 
    {
        name: 'debug',
        description: 'info'
    }
] as ApplicationCommand[]

execute: {
    const msg = [];
    msg.push("This is a test command");
    Messages.sendBotMessage("hi world!");
}