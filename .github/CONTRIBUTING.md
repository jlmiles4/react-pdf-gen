# Contributing

Thanks for helping improve the guide or its source.

## Setup

Use Node 22 or newer, pnpm 10.29.1, and `poppler-utils`. Then install the
locked dependencies:

```bash
pnpm install --frozen-lockfile
```

## Before opening a pull request

1. Keep the change focused and update source content rather than editing the
   generated PDF directly.
2. Run `pnpm test`.
3. Run `pnpm typecheck`.
4. Run `pnpm pipeline`.
5. Inspect the PNGs for every page affected by the change.
6. Include the rebuilt tracked PDF only when its visible content changed.

For vulnerabilities, follow the private process in
[SECURITY.md](SECURITY.md) instead of opening a public issue.
