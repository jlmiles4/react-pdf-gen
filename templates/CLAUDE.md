# templates/ — shipped product, NOT live config

These files are the **starter kit shipped to customers**, not configuration for this repo's build. They intentionally describe a simpler, older react-pdf architecture than the live `src/`. Do not "reconcile" them with the root CLAUDE.md.

## Gotchas
- **`CLAUDE.md.template` is a deliverable, not this repo's CLAUDE.md.** The customer renames it to `CLAUDE.md` in *their own* project. Never rename/move it here, and never sync it to the root `CLAUDE.md`. Claude Code does not auto-load `.template` files, so it is inert in this repo by design.
- **The template architecture is deliberately simpler than live `src/`** — flat `src/pages/Page##-Name.tsx` with manual registration in `Document.tsx`, and explicit `fontWeight` literals (400/500/600/700). Live `src/` uses directory-based pages + `src/manifest.ts` + auto-generated `src/registry.ts` + `fontWeight` tokens. Do **not** rewrite the templates to match `src/`; the divergence is intentional (it's the simple starter variant — the book's Architecture chapter teaches the folder-per-chapter + manifest layout as the upgrade).
- **Do not design-token-lint these `.md` files.** Hardcoded hex/font/weight values in the prompts are illustrative starter content for the reader, not violations of root Rule 4.
- **This `CLAUDE.md` itself is maintainer guidance.** It is tracked in the repo but must be excluded from the customer starter kit when packaging `templates/` — the customer deliverable is `CLAUDE.md.template` only.

## Conventions
- **This folder's `README.md` carries marketing counts** ("71-page PDF", "18 reusable components", "71 page files in 15 folders", "30 styles"). These drift whenever pages or components change — re-measure against the repo (`pdfinfo output/react-pdf-ai-builders-guide.pdf`, `ls src/components`, `find src/pages -name '*.tsx'`) before quoting or editing them.
