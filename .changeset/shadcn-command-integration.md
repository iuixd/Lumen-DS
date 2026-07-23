---
"@lumen/ui": minor
---

Add a shadcn-sourced `Command` component (`Command`, `CommandDialog`, `CommandInput`, `CommandList`, `CommandGroup`, `CommandItem`, `CommandEmpty`, `CommandSeparator`, `CommandShortcut`), the first component built through the new shadcn-as-source-generator integration layer documented in `docs/shadcn-integration.md`. Adds `cmdk` and `@radix-ui/react-dialog` as new runtime dependencies. All colors, radius, and elevation resolve through the new `shadcn-lumen-bridge.css` token bridge onto existing Lumen semantic tokens — no shadcn default theme values are included, and dark mode follows Lumen's existing `data-theme` mechanism.
