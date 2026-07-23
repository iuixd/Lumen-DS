---
"@lumen/ui": minor
---

Add shadcn-sourced `Popover`, `DropdownMenu`, `Sheet`, `ScrollArea`, `HoverCard`, and `Slider` components — batch 2 of the bulk shadcn adoption effort (see `docs/shadcn-integration.md` §7). All follow the established internal/public split and resolve through the existing token bridge. Adds `@radix-ui/react-popover`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-hover-card`, `@radix-ui/react-scroll-area`, and `@radix-ui/react-slider` as new runtime dependencies. Fixes a real upstream bug in shadcn's `Slider` template where a range slider only rendered a single draggable thumb regardless of how many values it was given.
