# Reference

Lookup material for the build commands, the component library, and the design tokens. Read these when you need a specific value or signature, not a narrative — the [architecture](../architecture/overview.md) and [build](../build/pipeline.md) pages explain how the pieces fit together.

- [Commands](commands.md) — every `pnpm` script (`build`, `sync`, `export`, `pipeline`, `dev`, `typecheck`) and exactly what each does, including exit conditions and required tools.
- [Components](components.md) — props, defaults, and `wrap` behavior for every component in `src/components/`, straight from the TypeScript interfaces.
- [Theme tokens](theme-tokens.md) — concrete values for every token in `src/styles/theme.ts`: colors, typography, spacing, page geometry, borders, icon sizes, accent bars, syntax colors.
- [Syntax highlighting](syntax-highlighting.md) — how `<CodeBlock>` colors code: the single language-agnostic tokenizer, its token types, and the keyword set.
