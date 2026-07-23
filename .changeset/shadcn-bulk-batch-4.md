---
"@lumen/ui": minor
---

Add shadcn-sourced `Collapsible`, `Label`, `ToggleGroup`, `NavigationMenu`, and `ShadcnForm` (a `Shadcn`-prefixed family: `ShadcnForm`/`ShadcnFormField`/`ShadcnFormItem`/`ShadcnFormLabel`/`ShadcnFormControl`/`ShadcnFormDescription`/`ShadcnFormMessage`/`useShadcnFormField`) — batch 4 of the bulk shadcn adoption effort, covering components that overlap with existing Lumen components (see `docs/shadcn-integration.md` §7). Adds `@radix-ui/react-collapsible`, `@radix-ui/react-toggle-group`, `@radix-ui/react-navigation-menu`, `@radix-ui/react-label`, `react-hook-form`, `@hookform/resolvers`, and `zod` as new runtime dependencies — the latter three are this repo's first form-state-management dependencies. `ShadcnForm`'s entire public family is `Shadcn`-prefixed (not just the one symbol that collides with Lumen's existing `FormField`) to keep the two systems visually distinct; field visuals still come from Lumen's own `Input`/`Button`.
