# Formatter and linter

1. Install `biome`

```bash
pnpm add -D -E @biomejs/biome
```

2. Select `WSL` as selected option, at the bottom-left corner of the VSCode editor

3. Install `Biome` extension from VSCode extensions

4. `pnpm exec biome init`

5. Update the `indentStyle` key to be `"space"`

```json
"formatter": {
  "enabled": true,
  "indentStyle": "space"
}
```

6. Add configuration file, located at `.vscode/settings.json`

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "biomejs.biome",
  "editor.codeActionsOnSave": {
    "source.fixAll.biome": "explicit"
  },
  "[javascript]": { "editor.defaultFormatter": "biomejs.biome" },
  "[typescript]": { "editor.defaultFormatter": "biomejs.biome" }
}
```
