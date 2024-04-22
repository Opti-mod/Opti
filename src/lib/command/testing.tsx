import { ApplicationCommand } from "@/def";
import { Messages, clipboard, toasts } from "../metro/common";

export default [ 
    {
        name: 'testing',
        description: 'this makes my balls ball',
        execute(_, ctx) {
            Messages.sendBotMessage(ctx.channel.id, "hello world!");
        },
    },
] as ApplicationCommand[]


