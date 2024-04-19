import { ApplicationCommand, ApplicationCommandOptionType } from "@/def";
import { Messages, clipboard, toasts } from "../metro/common";
import { getAssetIDByName } from "@/ui/assets";

export default [ 
    {
        name: 'balls',
        description: 'this makes the balls ball'
    }
] as ApplicationCommand[]

execute: {
    const msg = [];
    msg.push("This is a test command");
    Messages.sendBotMessage("hi world!");
}