# Lumen shadcn Integration

> Governance model for adopting shadcn/ui components into `@lumen/ui` as a source and behavioral-implementation layer, without shadcn ever becoming a second, competing visual theme.

## Source

- **Figma file:** Lumen AI Design System (no linked node — this integration model has no Figma source; it governs how *code-only* interaction patterns are adopted when Figma hasn't specified one)
- **Related documents:**
  - `CLAUDE.md`
  - `docs/component-architecture.md`
  - `docs/design-tokens.md`
  - `docs/roadmap.md` Phase 15
  - `docs/changelog.md`
- **Introduced:** 2026-07-23

---

# 1. Purpose

Lumen's own hand-built primitives and composites cover most enterprise-SaaS UI needs, but a few complex interaction patterns — command palettes, sheets, dropdown menus, popovers, resizable panels — are expensive to build correctly (focus management, portal behavior, full keyboard/ARIA compliance) and have no Figma-defined design of their own yet. shadcn/ui is adopted for exactly these cases: as a **source generator and behavioral layer**, not as a design system. Every visual property still resolves to an existing Lumen token.

---

# 2. The non-negotiable rule

```text
Lumen tokens are the only source of truth for:
color · typography · spacing · radius · borders · shadows · motion ·
focus states · status colors · light mode · dark mode · public component APIs

shadcn/Radix may supply:
accessible composition patterns · keyboard interaction · open/closed state
handling · ARIA behavior · component source Lumen can own and modify
```

If a shadcn-generated file's visual output cannot be traced to a real `@lumen/tokens` CSS variable, that file is not done.

---

# 3. Architecture

```text
shadcn component source (CLI-generated, cmdk/Radix behavior)
        ↓
packages/ui/src/components/internal/<name>.tsx   (adapted, Lumen-owned, no default theme)
        ↓
packages/ui/src/components/<name>/<Name>.tsx     (public wrapper — the only supported import)
        ↓
@lumen/ui  (public export)                        import { Command } from "@lumen/ui"
        ↓
shadcn-lumen-bridge.css + shadcn-tailwind-preset.cjs   (Lumen semantic tokens)
```

Applications only ever import from `@lumen/ui`. The `internal/` directory is not published API and may change shape without notice — treat any direct import from `@lumen/ui`'s internal paths in a consuming app as a bug to fix, not a supported pattern.

## 3.1 Workspace configuration

`packages/ui/components.json` configures the shadcn CLI for this repo's actual setup: Tailwind v3 (not v4 — this repo has not adopted v4's CSS-first config), `cssVariables: true`, and aliases that resolve into `packages/ui/src` (`components`, `ui`, `utils`, `lib`, `hooks` all under the `@lumen/ui/...` namespace). The CLI requires those aliases to resolve via `tsconfig.json`'s `paths` at generation time (`packages/ui/tsconfig.json` carries a `"@lumen/ui/*": ["./src/*"]` mapping for this) — generated files are then hand-edited to this repository's existing plain-relative-import convention (`../../lib/cn`, not an aliased import) before being committed, since no other file in `@lumen/ui` uses path aliases and none of this repo's bundlers (Vite/vitest) are configured to resolve them at runtime.

## 3.2 Token bridge

`packages/ui/src/styles/shadcn-lumen-bridge.css` maps shadcn's fixed compatibility-variable vocabulary (`--background`, `--primary`, `--ring`, `--radius`, ...) one-directionally onto real Lumen semantic variables — e.g. `--ring: var(--color-border-focus)`, `--radius: var(--radius-lg)`. It never defines a `[data-theme="dark"]` block of its own: every Lumen variable it points at already swaps value under that attribute (see `packages/tokens/scripts/build.mjs`), so the bridge inherits dark mode for free. Exported from the package as `@lumen/ui/shadcn.css` and imported once, package-wide (currently by Storybook's `tailwind.css`; a consuming product app imports it the same way, alongside `@lumen/tokens/css`).

`packages/ui/src/styles/shadcn-tailwind-preset.cjs` is a small Tailwind preset extending `colors` (background/foreground/card/popover/primary/secondary/muted/accent/destructive/border/input/ring) and `borderRadius` (lg/md/sm, calculated from the single `--radius` variable) so that shadcn-generated utility classes like `bg-popover` or `rounded-lg` resolve through the bridge instead of Tailwind's own built-in defaults. Required by **both** `packages/ui/tailwind.config.cjs` and `packages/storybook/tailwind.config.cjs` (Storybook compiles `@lumen/ui`'s source directly) — kept as one shared file specifically so the two configs cannot drift apart.

## 3.3 Color format

`@lumen/tokens`' semantic colors resolve to full hex values (e.g. `#695cff`), not bare HSL channel triples. Every bridge mapping and Tailwind color key therefore uses `var(--x)` directly — never shadcn's own default `hsl(var(--x))` wrapping, which would produce invalid CSS like `hsl(#695cff)`.

---

# 4. Rules for every adopted component

1. **Lumen tokens are the visual source of truth.** No adopted component may introduce a color, radius, shadow, spacing, or type-size value that isn't traceable to a `@lumen/tokens` variable via the bridge.
2. **shadcn is source code, not a parallel design system.** Its default theme, its own color palette, and its own spacing/radius scale are never committed — only its composition/behavior code, adapted.
3. **Never duplicate an existing Lumen component.** Check `packages/ui/src/{primitives,composite,layout}` before adopting anything shadcn also ships (e.g. shadcn's own `Dialog` is *used internally* by `Command` here, but Lumen's `Modal` remains the public dialog component for direct product use — they are not redundant public APIs).
4. **Generated source requires design, code, and accessibility review before merge** — the CLI's output is a starting point, never final. Expect to change icons, colors, radii, shadows, and focus-ring classes in every file it produces.
5. **Default shadcn theme values must never be committed.** `packages/ui/src/styles/shadcn-lumen-bridge.test.ts` enforces this by asserting the bridge file never contains shadcn's known default HSL values (e.g. `222.2 84% 4.9%`, `0 0% 100%`).
6. **Public consumers import only through `@lumen/ui`.** `packages/ui/src/index.ts` never re-exports anything from a component's `internal/` path directly — only from its public wrapper module.
7. **Dark mode follows Lumen's existing `[data-theme]` mechanism.** No adopted component may introduce Tailwind `dark:` variant classes or a second theme-switching mechanism — this repo has none today, and every color already resolves correctly per-theme through CSS variables.
8. **Visual utility classes must resolve to Lumen semantic tokens**, either through the bridge (colors, radius) or an explicit arbitrary-value class pointing at a real token (e.g. `shadow-[var(--shadow-menu-default)]` for elevation, since shadcn has no shadow-token bridging convention of its own).
9. **Every adopted component ships Storybook coverage** — at minimum Default, a selected/highlighted state, a disabled state, an empty state, long/overflowing content, and an open-state (dialog/overlay) story where applicable. Dark mode is covered by the existing global theme-toolbar toggle, not a per-component duplicate story.
10. **Updating a component through the shadcn CLI is a source-code migration, not an automatic upgrade.** Re-running `pnpm dlx shadcn@latest add <name> --overwrite` regenerates the *unadapted* file; every adaptation in this document must be re-applied and re-reviewed, exactly like the first adoption.

---

# 5. Known gaps and judgment calls

- **No general-purpose "secondary/muted/accent" surface tokens exist** outside component-specific groups (Button's own `secondary-bg`, Badge's own tints). The bridge reuses the closest existing named token per role (`--secondary` → Button's secondary tokens, `--accent` → `background.nav-active`, the existing "this row is selected" surface) rather than inventing a new tier. Treat `--accent` in particular as a placeholder pending a purpose-built "selected row" token if design defines one.
- **No Lumen "scrim"/overlay-opacity token exists.** `Command`'s dialog overlay matches `Modal.tsx`'s own existing `bg-black/40` value rather than introducing a second one-off opacity.
- **No Lumen motion/duration tokens exist yet.** shadcn's default open/close animation utilities (`animate-in`, `fade-in-0`, `zoom-in-95`, ...) require the `tailwindcss-animate` plugin and were deliberately **not** added — open/close is instant for now. Add real motion once Lumen defines a duration/easing scale, rather than pulling in an unbacked animation vocabulary.
- **Icons:** `components.json` declares `iconLibrary: "lucide"` because the shadcn CLI requires *some* value, but no `lucide-react` import should ever survive adaptation — Lumen already has a generated icon set (`packages/ui/src/icons/generated`) and every icon a generated component needs so far (`search`, `x`/close, `check`) already exists there.

---

# 6. Adopted components

| Component | Status | Internal source | Public export |
|---|---|---|---|
| `Command` | Adopted 2026-07-23 | `packages/ui/src/components/internal/{command,dialog}.tsx` | `packages/ui/src/components/command/Command.tsx` |

Candidates for next adoption (no existing Lumen equivalent as of this writing): `Sheet`, `DropdownMenu`, `Popover`, `ScrollArea`.
