import { registerFont } from "canvas";
import { mkdirSync, readFileSync, rmSync } from "node:fs";
import { resolve } from "node:path";
import { ImageGenerator } from "./ImageGenerator";
import { ScriptParser } from "./ScriptParser";

let script = readFileSync("./inputs/script.txt").toString();

let parsed = new ScriptParser(script).parse();

registerFont(resolve(__dirname, "./NotoSansTC-Regular.otf"), { family: "Noto Sans TC" });

rmSync(resolve(__dirname, "../outputs"), { recursive: true });
mkdirSync(resolve(__dirname, "../outputs"));

parsed.forEach((v) => {
    new ImageGenerator(v).generate();
});
