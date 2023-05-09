import { createWriteStream, readFileSync } from "node:fs";
import { ScriptParser } from "./ScriptReader";
import { createCanvas } from "canvas";
import { registerFont } from "canvas";
import path from "node:path";
import { ImageGenerator } from "./ImageGenerator";

let script = readFileSync("./test/script.txt").toString();

let parsed = new ScriptParser(script).parse();

registerFont(path.resolve(__dirname, "./NotoSansTC-Regular.otf"), { family: "Noto Sans TC" });

new ImageGenerator(parsed[0]).generate();
// parsed.forEach((v) => {
// });
