import { createCanvas } from "canvas";
import { UserMessage } from "./types";
import { createWriteStream } from "fs";

let users: Record<string, number> = {};

export class ImageGenerator {
    private messages: UserMessage;

    public constructor(messages: UserMessage) {
        this.messages = messages;
    }

    public generate() {
        users[this.messages.username] ??= 0;

        let messages: string[] = [];
        console.log(this.messages.messages);
        this.messages.messages.forEach((v) => {
            messages.push(v);
            this.generateImage(messages);
        });

        users[this.messages.username] += 1;
    }

    private generateImage(messages: string[]) {
        let width = 1000;
        let height = (24 + 10) * messages.length;

        let canvas = createCanvas(width, height);
        let ctx = canvas.getContext("2d");
        ctx.font = "24px 'Noto Sans TC'";
        ctx.fillStyle = "#313338";
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = "#ffffff";
        ctx.fillText(messages.join("\n"), 24, 24);
        let a =
            ctx.measureText(messages[messages.length - 1]).actualBoundingBoxAscent -
            ctx.measureText(messages[messages.length - 1]).actualBoundingBoxDescent;
        console.log(a);

        canvas
            .createPNGStream()
            .pipe(
                createWriteStream(
                    `./outputs/${this.messages.username}-${users[this.messages.username]}-${
                        messages.length
                    }.png`,
                    { encoding: "binary" }
                )
            );
    }
}
