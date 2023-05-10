import { UserMessage } from "./types";

export class ScriptParser {
    private text: string;

    public constructor(text: string) {
        this.text = text;
    }

    public parse(): UserMessage[] {
        let lines = this.text.split(/\r?\n/).map((v) => v.trim());
        let parsed: UserMessage[] = [];
        let current: UserMessage = {} as any;
        for (let line of lines) {
            if (line.endsWith(":")) {
                current = {
                    messages: [],
                    username: line.substring(0, line.length - 1),
                };
                continue;
            }
            if (line === "") {
                parsed.push(current);
                continue;
            }
            current.messages.push(line);
        }
        return parsed;
    }
}
