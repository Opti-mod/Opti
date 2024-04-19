import { ApplicationCommand } from "@/def";
import { Messages, clipboard, toasts } from "../metro/common";

export default [ 
    {
        name: 'testing',
        description: 'this makes the balls ball',
        execute: () => {
            Messages.sendBotMessage("hi world!");
        },
    },
] as ApplicationCommand[]


