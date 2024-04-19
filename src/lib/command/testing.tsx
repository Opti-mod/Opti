import { ApplicationCommand, ApplicationCommandOptionType } from "@/def";
import { Messages, clipboard, toasts } from "../metro/common";
import { getAssetIDByName } from "@/ui/assets";

export default [ 
    {
        name: 'testing',
        description: 'this makes the balls ball',
        execute() {
            Messages.sendBotMessage("hi world!");
        },
        

    },
] as ApplicationCommand[]


