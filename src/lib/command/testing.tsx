import { ApplicationCommand } from "@/def";
import { Messages, clipboard, toasts } from "../metro/common";

export default [ 
    {
        name: 'testing',
        description: 'this makes the balls ball',
        execute(_, ctx) {
            Messages.sendBotMessage(ctx.channel.id, "hi world!");
        },
    },
] as ApplicationCommand[]


