import { Image, createCanvas, loadImage } from "canvas";
import { UserMessage } from "./types";
import { createWriteStream, readFileSync } from "node:fs";
import * as path from "node:path";

let pfppaths: Record<string, string> = JSON.parse(
    readFileSync(path.resolve(__dirname, "../pfps/paths.json")).toString()
);

const MESSAGE_FONT_SIZE = 24;
const PADDING = 15;
const PROFILE_PIC_SIZE = 50;
const USERNAME_FONT_SIZE = 30;
const TIME_FONT_SIZE = 15;

export class ImageGenerator {
    private messages: UserMessage;
    private static index: number = 0;

    public constructor(messages: UserMessage) {
        this.messages = messages;
    }

    public generate() {
        let messages: string[] = [];
        this.messages.messages.forEach((v) => {
            messages.push(v);
            this.generateImage(structuredClone(messages));
        });

        ImageGenerator.index += 1;
    }

    private async generateImage(messages: string[]) {
        let width = 1000;
        let height =
            PADDING +
            USERNAME_FONT_SIZE +
            PADDING +
            (MESSAGE_FONT_SIZE + 10) * messages.length +
            PADDING;

        let writeStream = createWriteStream(
            `./outputs/${ImageGenerator.index}-${messages.length}.png`,
            { encoding: "binary" }
        );
        let canvas = createCanvas(width, height);
        let ctx = canvas.getContext("2d");
        let a = path.resolve(__dirname, "../pfps/", pfppaths[this.messages.username]);
        let pfp = await loadImage(a);

        ctx.textAlign = "left";

        // Background
        ctx.fillStyle = "#313338";
        ctx.fillRect(0, 0, width, height);

        // Profile Pic
        ctx.drawImage(pfp, PADDING, PADDING, PROFILE_PIC_SIZE, PROFILE_PIC_SIZE);

        // Username
        ctx.fillStyle = "#ffffff";
        ctx.font = `${USERNAME_FONT_SIZE}px 'Noto Sans TC'`;
        const USERNAME_WIDTH = ctx.measureText(this.messages.username).width;
        ctx.fillText(
            this.messages.username,
            PADDING * 2 + PROFILE_PIC_SIZE,
            PADDING + USERNAME_FONT_SIZE
        );

        // Time
        ctx.fillStyle = "#aaaaaa";
        ctx.font = `${TIME_FONT_SIZE}px 'Noto Sans TC'`;
        ctx.fillText(
            "Today at 12:00 AM",
            USERNAME_WIDTH + PADDING * 3 + PROFILE_PIC_SIZE,
            PADDING + USERNAME_FONT_SIZE
        );

        // Messages
        ctx.fillStyle = "#ffffff";
        ctx.font = `${MESSAGE_FONT_SIZE}px 'Noto Sans TC'`;
        ctx.fillText(
            messages.join("\n"),
            PADDING * 2 + PROFILE_PIC_SIZE,
            PADDING * 2 + MESSAGE_FONT_SIZE + USERNAME_FONT_SIZE
        );

        canvas.createPNGStream().pipe(writeStream);
    }
}
