---
"@lumen/ui": minor
---

Add shadcn-sourced `Alert`, `Separator`, `Skeleton`, `Progress`, `AspectRatio`, and `Kbd` components — batch 1 of the bulk shadcn adoption effort (see `docs/shadcn-integration.md` §7). All follow the established internal/public split and resolve through the existing token bridge. Adds `@radix-ui/react-separator`, `@radix-ui/react-progress`, and `@radix-ui/react-aspect-ratio` as new runtime dependencies. Fixes a real upstream accessibility bug in shadcn's `Progress` template where `value` was never forwarded to Radix, so `aria-valuenow` was never set.
