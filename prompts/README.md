# Internal authoring prompts (legacy — superseded)

The original project-specific prompts used while first drafting this book. **They describe an older architecture and should not be followed.** Their scaffolding predates this repo's current design: flat `pages/` files with manual registration in `Document.tsx`, and a `build` script without the `pnpm sync` step. The repo is now manifest-driven — `src/manifest.ts` → generated `src/registry.ts` via `pnpm sync`.

Where to look instead:

- **Editing this repo?** Follow `CLAUDE.md` and [`../docs/`](../docs/README.md) (start at `docs/architecture/overview.md`). Those reflect the current manifest/registry architecture.
- **Want the reader-facing starter prompts?** Use [`../templates/`](../templates/) — the generalized, maintained version shipped with the book (`YourFont`, `[YOUR-PROJECT]` placeholders, plus a `CLAUDE.md.template`).

Kept for historical reference only. Not read by the build.
