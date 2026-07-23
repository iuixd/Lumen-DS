---
"@lumen/ui": minor
---

Add shadcn-sourced `Textarea`, `Toggle`, `InputOTP`, `ContextMenu`, `Breadcrumb`, `Drawer`, `Carousel`, and `Item` components — batch 3 of the bulk shadcn adoption effort (see `docs/shadcn-integration.md` §7). All follow the established internal/public split and resolve through the existing token bridge. Adds `@radix-ui/react-toggle`, `@radix-ui/react-context-menu`, `@radix-ui/react-slot`, `input-otp`, `embla-carousel-react`, and `vaul` as new runtime dependencies — the latter two are this repo's first non-Radix behavioral dependencies.

**Breaking (narrow):** the `Breadcrumb` type previously exported from `@lumen/ui` (used only for `PageHeader`'s `breadcrumbs` prop) is renamed to `PageHeaderBreadcrumb`. `Breadcrumb` now refers to the new full component.
