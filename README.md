# Discord Chat Gen

Generate discord chat for videos!

## How to use?

1. Install all dependencies (including dev)

```bash
pnpm install
```

2. Create `inputs/script.txt`

```text
Character:
I am saying something

Character2:
OMG
```

> Remember to put a empty line after a section.

3. Create `pfps/paths.json`

Write something like

```json
{
    "Character": "./character.png",
    "Character2": "./character2.png"
}
```

4. And put the profile picture according to paths

5. Run!

```bash
pnpm run start
```

6. See the results in `outputs/`
