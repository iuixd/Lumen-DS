---
"@lumen/ui": minor
---

Add shadcn-sourced `ShadcnButton`, `ShadcnCard`, `ShadcnTabs`, `ShadcnTooltip`, `ShadcnSelect`, `ShadcnAvatar`, `ShadcnInput`, `ShadcnSwitch`, `ShadcnCheckbox`, `ShadcnPagination`, `ShadcnButtonGroup`, `Dialog`, `RadioGroup`, and `Table` — batch 5 of the bulk shadcn adoption effort, covering every name-colliding duplicate (see `docs/shadcn-integration.md` §7). Adds `@radix-ui/react-tabs`, `@radix-ui/react-tooltip`, `@radix-ui/react-select`, `@radix-ui/react-avatar`, `@radix-ui/react-switch`, `@radix-ui/react-checkbox`, and `@radix-ui/react-radio-group` as new runtime dependencies. All follow the established internal/public split and resolve through the existing token bridge; the 11 `Shadcn`-prefixed components exist alongside their same-named Lumen equivalents without replacing them, while `Dialog`/`RadioGroup`/`Table` keep their own plain names since Lumen's equivalents (`Modal`/`Radio`/`DataTable`) are named differently.
