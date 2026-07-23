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
11. **The Storybook `title` category is `Primitives` or `Composite` per `docs/component-architecture.md` §2.2/§2.3's own explicit example lists — never defaulted to whatever the previous component used, and never inferred without checking both lists in full.** §2.2 names `Divider` (Separator), `Spinner`, `Progress`, and `Skeleton` as primitives. §2.3 names `Menu`, `Dropdown`, `Accordion`, `Toast`, `Alert`, `Card`, `Dialog`, `Drawer`, `Popover`, and `Table` as composite — **`Alert` is composite, not primitive**, despite reading as a simple one-off component; don't assume a component belongs in Primitives just because it looks atomic without checking whether §2.3 already names it. For anything not explicitly named in either list (e.g. `AspectRatio`, `Kbd`, `HoverCard`, `ScrollArea`, `Slider`), fall back to the general definition: atomic/single-concept with no sub-composition (Primitives) vs. combines primitives into one interaction unit, especially anything with its own floating/positioned panel (Composite). Batch 1 initially filed all six of its components under `Composite/X` by copying `Command`'s title, then over-corrected by moving `Alert` to `Primitives/X` too without checking §2.3's own list — both mistakes caught and corrected the same day (see `docs/changelog.md`). This does not move the component's file location: `packages/ui/src/components/{internal,<name>}` stays the provenance/governance structure regardless of which Storybook category it's filed under.

---

# 5. Known gaps and judgment calls

- **No general-purpose "secondary/muted/accent" surface tokens exist** outside component-specific groups (Button's own `secondary-bg`, Badge's own tints). The bridge reuses the closest existing named token per role (`--secondary` → Button's secondary tokens, `--accent` → `background.nav-active`, the existing "this row is selected" surface) rather than inventing a new tier. Treat `--accent` in particular as a placeholder pending a purpose-built "selected row" token if design defines one.
- **No Lumen "scrim"/overlay-opacity token exists.** `Command`'s dialog overlay matches `Modal.tsx`'s own existing `bg-black/40` value rather than introducing a second one-off opacity.
- **No Lumen motion/duration tokens exist yet.** shadcn's default open/close animation utilities (`animate-in`, `fade-in-0`, `zoom-in-95`, ...) require the `tailwindcss-animate` plugin and were deliberately **not** added — open/close is instant for now. Add real motion once Lumen defines a duration/easing scale, rather than pulling in an unbacked animation vocabulary.
- **Icons:** `components.json` declares `iconLibrary: "lucide"` because the shadcn CLI requires *some* value, but no `lucide-react` import should ever survive adaptation — Lumen already has a generated icon set (`packages/ui/src/icons/generated`) and every icon a generated component needs so far (`search`, `x`/close, `check`) already exists there.
- **Tailwind opacity modifiers (`bg-primary/20`, `border-destructive/50`, ...) are not reliable against bridged colors.** shadcn's own default theme defines colors as bare HSL channel triples (e.g. `222.2 84% 4.9%`) specifically so `hsl(var(--x) / <alpha-value>)` can apply an opacity modifier. This repo's bridge points shadcn's variables at Lumen tokens that resolve to full hex values instead (see §3.3) — replace every `/NN` opacity modifier on a bridged color with a solid, already-appropriate token instead of assuming it degrades gracefully (`Alert`'s `border-destructive/50`, `Skeleton`/`Progress`'s `bg-primary/20`/`/10` were all fixed this way in batch 1).
- **Don't trust shadcn's generated source to be bug-free.** `Progress`'s adaptation caught a real accessibility bug in the upstream template: it destructures `value` out of props for the indicator's inline-style calculation but never forwards it back to `ProgressPrimitive.Root`, so Radix never received a value and never set `aria-valuenow`. `Slider`'s adaptation (batch 2) caught a second one: the generated source hardcodes a single `<SliderPrimitive.Thumb>`, so a range slider (`value`/`defaultValue` with more than one number) silently only gets one draggable handle even though Radix's own primitive supports one thumb per value — fixed by mapping one `Thumb` per value instead. Rule 4 ("generated source requires review, never blind acceptance") exists for exactly this kind of thing — verify behavior with a real test, not just a visual check. Both bugs were only caught because a test exercised the actual behavior (ARIA attributes, thumb count), not just a rendered-without-crashing smoke check — write tests that assert on real behavior for every new component, not just presence.

---

# 6. Adopted components

| Component | Status | Internal source | Public export |
|---|---|---|---|
| `Command` | Adopted 2026-07-23 | `packages/ui/src/components/internal/{command,dialog}.tsx` | `packages/ui/src/components/command/Command.tsx` |
| `Accordion` | Adopted 2026-07-23 | `packages/ui/src/components/internal/accordion.tsx` | `packages/ui/src/components/accordion/Accordion.tsx` |
| `Alert` | Adopted 2026-07-23 (batch 1) | `packages/ui/src/components/internal/alert.tsx` | `packages/ui/src/components/alert/Alert.tsx` |
| `Separator` | Adopted 2026-07-23 (batch 1) | `packages/ui/src/components/internal/separator.tsx` | `packages/ui/src/components/separator/Separator.tsx` |
| `Skeleton` | Adopted 2026-07-23 (batch 1) | `packages/ui/src/components/internal/skeleton.tsx` | `packages/ui/src/components/skeleton/Skeleton.tsx` |
| `Progress` | Adopted 2026-07-23 (batch 1) | `packages/ui/src/components/internal/progress.tsx` | `packages/ui/src/components/progress/Progress.tsx` |
| `AspectRatio` | Adopted 2026-07-23 (batch 1) | `packages/ui/src/components/internal/aspect-ratio.tsx` | `packages/ui/src/components/aspect-ratio/AspectRatio.tsx` |
| `Kbd` | Adopted 2026-07-23 (batch 1) | `packages/ui/src/components/internal/kbd.tsx` | `packages/ui/src/components/kbd/Kbd.tsx` |
| `Popover` | Adopted 2026-07-23 (batch 2) | `packages/ui/src/components/internal/popover.tsx` | `packages/ui/src/components/popover/Popover.tsx` |
| `DropdownMenu` | Adopted 2026-07-23 (batch 2) | `packages/ui/src/components/internal/dropdown-menu.tsx` | `packages/ui/src/components/dropdown-menu/DropdownMenu.tsx` |
| `Sheet` | Adopted 2026-07-23 (batch 2) | `packages/ui/src/components/internal/sheet.tsx` | `packages/ui/src/components/sheet/Sheet.tsx` |
| `ScrollArea` | Adopted 2026-07-23 (batch 2) | `packages/ui/src/components/internal/scroll-area.tsx` | `packages/ui/src/components/scroll-area/ScrollArea.tsx` |
| `HoverCard` | Adopted 2026-07-23 (batch 2) | `packages/ui/src/components/internal/hover-card.tsx` | `packages/ui/src/components/hover-card/HoverCard.tsx` |
| `Slider` | Adopted 2026-07-23 (batch 2) | `packages/ui/src/components/internal/slider.tsx` | `packages/ui/src/components/slider/Slider.tsx` |
| `Textarea` | Adopted 2026-07-23 (batch 3) | `packages/ui/src/components/internal/textarea.tsx` | `packages/ui/src/components/textarea/Textarea.tsx` |
| `Toggle` | Adopted 2026-07-23 (batch 3) | `packages/ui/src/components/internal/toggle.tsx` | `packages/ui/src/components/toggle/Toggle.tsx` |
| `InputOTP` | Adopted 2026-07-23 (batch 3) | `packages/ui/src/components/internal/input-otp.tsx` | `packages/ui/src/components/input-otp/InputOTP.tsx` |
| `ContextMenu` | Adopted 2026-07-23 (batch 3) | `packages/ui/src/components/internal/context-menu.tsx` | `packages/ui/src/components/context-menu/ContextMenu.tsx` |
| `Breadcrumb` | Adopted 2026-07-23 (batch 3) | `packages/ui/src/components/internal/breadcrumb.tsx` | `packages/ui/src/components/breadcrumb/Breadcrumb.tsx` |
| `Drawer` | Adopted 2026-07-23 (batch 3) | `packages/ui/src/components/internal/drawer.tsx` | `packages/ui/src/components/drawer/Drawer.tsx` |
| `Carousel` | Adopted 2026-07-23 (batch 3) | `packages/ui/src/components/internal/carousel.tsx` | `packages/ui/src/components/carousel/Carousel.tsx` |
| `Item` | Adopted 2026-07-23 (batch 3) | `packages/ui/src/components/internal/item.tsx` | `packages/ui/src/components/item/Item.tsx` |
| `Collapsible` | Adopted 2026-07-23 (batch 4) | `packages/ui/src/components/internal/collapsible.tsx` | `packages/ui/src/components/collapsible/Collapsible.tsx` |
| `Label` | Adopted 2026-07-23 (batch 4) | `packages/ui/src/components/internal/label.tsx` | `packages/ui/src/components/label/Label.tsx` |
| `ToggleGroup` | Adopted 2026-07-23 (batch 4) | `packages/ui/src/components/internal/toggle-group.tsx` | `packages/ui/src/components/toggle-group/ToggleGroup.tsx` |
| `NavigationMenu` | Adopted 2026-07-23 (batch 4) | `packages/ui/src/components/internal/navigation-menu.tsx` | `packages/ui/src/components/navigation-menu/NavigationMenu.tsx` |
| `ShadcnForm` (public `Shadcn`-prefixed family) | Adopted 2026-07-23 (batch 4) | `packages/ui/src/components/internal/form.tsx` | `packages/ui/src/components/shadcn-form/ShadcnForm.tsx` |
| `ShadcnButton` | Adopted 2026-07-23 (batch 5) | `packages/ui/src/components/internal/button.tsx` | `packages/ui/src/components/shadcn-button/ShadcnButton.tsx` |
| `ShadcnCard` | Adopted 2026-07-23 (batch 5) | `packages/ui/src/components/internal/card.tsx` | `packages/ui/src/components/shadcn-card/ShadcnCard.tsx` |
| `ShadcnTabs` | Adopted 2026-07-23 (batch 5) | `packages/ui/src/components/internal/tabs.tsx` | `packages/ui/src/components/shadcn-tabs/ShadcnTabs.tsx` |
| `ShadcnTooltip` | Adopted 2026-07-23 (batch 5) | `packages/ui/src/components/internal/tooltip.tsx` | `packages/ui/src/components/shadcn-tooltip/ShadcnTooltip.tsx` |
| `ShadcnSelect` | Adopted 2026-07-23 (batch 5) | `packages/ui/src/components/internal/select.tsx` | `packages/ui/src/components/shadcn-select/ShadcnSelect.tsx` |
| `ShadcnAvatar` | Adopted 2026-07-23 (batch 5) | `packages/ui/src/components/internal/avatar.tsx` | `packages/ui/src/components/shadcn-avatar/ShadcnAvatar.tsx` |
| `ShadcnInput` | Adopted 2026-07-23 (batch 5) | `packages/ui/src/components/internal/input.tsx` | `packages/ui/src/components/shadcn-input/ShadcnInput.tsx` |
| `ShadcnSwitch` | Adopted 2026-07-23 (batch 5) | `packages/ui/src/components/internal/switch.tsx` | `packages/ui/src/components/shadcn-switch/ShadcnSwitch.tsx` |
| `ShadcnCheckbox` | Adopted 2026-07-23 (batch 5) | `packages/ui/src/components/internal/checkbox.tsx` | `packages/ui/src/components/shadcn-checkbox/ShadcnCheckbox.tsx` |
| `ShadcnPagination` | Adopted 2026-07-23 (batch 5) | `packages/ui/src/components/internal/pagination.tsx` | `packages/ui/src/components/shadcn-pagination/ShadcnPagination.tsx` |
| `ShadcnButtonGroup` | Adopted 2026-07-23 (batch 5) | `packages/ui/src/components/internal/button-group.tsx` | `packages/ui/src/components/shadcn-button-group/ShadcnButtonGroup.tsx` |
| `Dialog` | Adopted 2026-07-23 (batch 5) | `packages/ui/src/components/internal/dialog.tsx` | `packages/ui/src/components/dialog/Dialog.tsx` |
| `RadioGroup` | Adopted 2026-07-23 (batch 5) | `packages/ui/src/components/internal/radio-group.tsx` | `packages/ui/src/components/radio-group/RadioGroup.tsx` |
| `Table` | Adopted 2026-07-23 (batch 5) | `packages/ui/src/components/internal/table.tsx` | `packages/ui/src/components/table/Table.tsx` |

`Accordion`'s adoption also surfaced that the shadcn CLI itself edits `tailwind.config.cjs` on generation — for this component it added `darkMode: ["class"]` and hardcoded `accordion-down`/`accordion-up` keyframes at a fixed `0.2s` duration. Both were reverted as part of adaptation: this repo has no Tailwind `dark:` usage anywhere (rule 7), and the hardcoded duration has no Lumen motion token backing it (see "Known gaps" above) — expand/collapse is instant, the same deferred-motion decision already made for Command's dialog. Check `tailwind.config.cjs` after every future `shadcn add` invocation for the same kind of unreviewed edit.

## 7.4 Batch 3 notes

- **`Marker`, `Direction`, and `Attachment` were requested but dropped from batch 3**: none of the three resolve at `https://ui.shadcn.com/r/styles/new-york/<name>.json` — the registry's top-level index lists them, but they aren't actually published for the `new-york` style this repo's `components.json` uses. Not a judgment call, a hard CLI failure (`The item ... was not found`). Re-check availability before a future attempt.
- **Drawer's real dependency turned out to be `vaul`, not `@base-ui/react`.** The registry's static metadata (fetched via `r/index.json`) listed `@base-ui/react` for both `drawer` and `direction`, which is what motivated the earlier "adopt both, add Base UI" decision — but actually running the CLI for `new-york`-style `drawer` revealed it depends on `vaul` instead (the classic shadcn drawer library, unrelated to Base UI). `@base-ui/react` was installed and remains in `package.json` but **nothing in this repo actually imports it** — it was added in anticipation of `direction`, which then turned out to be unavailable for this style (see above). Don't trust registry metadata over what the CLI actually generates; re-verify before removing or relying on either dependency in a future batch.
- **Carousel (`embla-carousel-react`) needed three jsdom environment stubs** neither this repo nor any prior batch required: `window.matchMedia` (also needed by `vaul`/Drawer), `document.elementFromPoint` (needed by `input-otp`/InputOTP), and `IntersectionObserver`. All three were added to `packages/ui/vitest.setup.ts` as no-op stubs, same pattern as the existing `ResizeObserver` stub. Expect any future component built on a real layout/gesture library (not just Radix) to need similar stubs — check the test failure's stack trace for which jsdom-missing API it needs before assuming the component itself is broken.
- **A genuine, unanticipated naming collision**: `PageHeader.tsx` already exported an interface named `Breadcrumb` (a `{label, href}` shape for its own `breadcrumbs` prop), colliding with the new `Breadcrumb` *component*. Unlike the Button/Card/Tabs-style collisions §7.1 anticipated (a full public component duplicating another full public component), this was a small internal data-shape type colliding by accident. Resolved by renaming the type to `PageHeaderBreadcrumb` (updating its one real consumer, `packages/patterns/src/DashboardPage.tsx`) rather than prefixing the new component — keeps the more valuable, more-used name (`Breadcrumb`) on the actual component. §7.1's `Shadcn`-prefix convention is specifically for same-purpose public-component collisions; a small internal type is a rename candidate instead. Check for this kind of accidental collision (not just the ten components named in §7.1) on every future batch.
- **Carousel's Previous/Next controls use shadcn's own internal `Button`** (`packages/ui/src/components/internal/button.tsx`, generated as Carousel's dependency), not Lumen's public `Button` — Lumen's `Button` has no icon-only circular variant suited to this exact pattern, matching rule 3's existing precedent (`Command` uses its own internal `Dialog` rather than Lumen's `Modal`). This internal `Button` is not exported publicly; the `Shadcn`-prefixed public naming decision from §7.1 for Button/Card/Tabs/etc. is still deferred to its own batch.

## 7.5 Batch 4 notes

- **`Combobox` and `NativeSelect` were requested but dropped**: same failure mode as `Marker`/`Direction`/`Attachment` in batch 3 — neither resolves at `https://ui.shadcn.com/r/styles/new-york/<name>.json` for this repo's `new-york` style. Not a judgment call; re-check availability before a future attempt.
- **`Sidebar` and `Message`/`MessageScroller`/`Bubble` were requested but skipped by direct user decision**, not adopted even in `Shadcn`-prefixed form. `Sidebar` is shadcn's heaviest component — its own provider, mobile-sheet variant, keyboard shortcuts, and persisted collapse state — functionally a complete competing app-shell/navigation system, not an overlapping primitive; `AppShell` already fills that role for this design system, Figma-sourced and actively maintained. `Message`/`MessageScroller`/`Bubble` are shadcn's AI-chat components, direct conceptual competitors to `AIPanel` (also Figma-sourced). Unlike every other overlap in this bulk effort, these were judged *not* worth adopting even as a separate, clearly-labeled alternative — revisit only if a real gap in `AppShell` or `AIPanel` surfaces that they'd genuinely fill.
- **`Form` is the first component in this effort adopted specifically *because* of its overlap** (with Lumen's own `FormField`), by direct user decision, rather than despite it. Brings in `react-hook-form`, `@hookform/resolvers`, and `zod` — the first form-state-management library in `@lumen/ui` (distinct in kind from every other dependency added so far, all either Radix primitives or single-purpose behavioral libraries like `vaul`/`embla-carousel-react`). Exported as `ShadcnForm`/`ShadcnFormField`/`ShadcnFormItem`/`ShadcnFormLabel`/`ShadcnFormControl`/`ShadcnFormDescription`/`ShadcnFormMessage`/`useShadcnFormField` — the *entire family* prefixed, not just the one symbol (`FormField`) that collides by name, so the two systems read as clearly distinct rather than colliding piecemeal. Field visuals still come from Lumen's own `Input`/`Button` inside the `ShadcnFormControl` slot — `react-hook-form` only supplies state/validation, never a competing visual layer.
- **`toggle.tsx` and `button.tsx` were silently reverted by the CLI a second time** (batch 3 already hit this once) — this time as registryDependencies of `toggle-group` and `form` respectively. Confirms this is a standing risk of `--overwrite`, not a one-off: **diff every already-adapted file after any `shadcn add` invocation**, not just the newly-requested ones.
- **Collapsible vs. Accordion, ToggleGroup vs. SegmentedControl, NavigationMenu vs. AppShell's nav**: all three adopted with a documented distinction (see each component's own internal-source header comment) rather than skipped, since the overlap is partial, not a full functional duplicate the way `Sidebar`/`Message` would have been.

## 7.6 Batch 5 notes

- **`ButtonGroup` was missed in the original batch-5 plan's "no collision" list** — it was reported as safe to keep its own plain name, but Lumen already has its own `ButtonGroup` primitive (`packages/ui/src/primitives/ButtonGroup.tsx`). Caught by re-verifying every planned name against the actual current `@lumen/ui` export surface (`grep` for exact `export const/function` matches) before touching anything, rather than trusting the prior batch's summary from memory — the same discipline the batch-3 `Breadcrumb` mistake should have already established. Corrected to `ShadcnButtonGroup`, so the final split is **11 `Shadcn`-prefixed** (`ShadcnButton`, `ShadcnCard`, `ShadcnTabs`, `ShadcnTooltip`, `ShadcnSelect`, `ShadcnAvatar`, `ShadcnInput`, `ShadcnSwitch`, `ShadcnCheckbox`, `ShadcnPagination`, `ShadcnButtonGroup`) and **3 plain-named** (`Dialog`, `RadioGroup`, `Table`).
- **`toggle.tsx`, `button.tsx`, and `separator.tsx` were silently reverted by the CLI yet again** — the third time for `separator.tsx`, fourth for `button.tsx` (this time as registryDependencies of `button-group`/`pagination` and `dialog`/`separator` respectively; `dialog.tsx` itself was skipped as "identical," so it survived untouched). This is now a fully established pattern across every batch since batch 3 — always diff every previously-adapted file after `shadcn add`, never assume only the newly-named components changed.
- **Two new bare-utility patterns established**, extending the existing "opacity modifiers are unreliable" and "menu/popover shadow → `--shadow-menu-default`" rules from earlier batches:
  - Bare `shadow`/`shadow-sm`/`shadow-xs` (no Lumen precedent on the equivalent hand-built component — Button, Switch, Checkbox, RadioGroup, ButtonGroup all ship with no box-shadow) are simply dropped, not replaced with a token.
  - Bare `shadow` specifically on **resting, non-overlay surfaces** (`ShadcnCard`, `ShadcnTabs`'s active-tab state) resolves to the previously-unused `--shadow-elevation-sm` token — a distinct tier from `--shadow-menu-default`, which stays reserved for floating overlays (Popover/Select/Command/menus).
- **`ShadcnTooltip`'s default shadcn styling (`bg-primary`/brand-colored) was replaced with Lumen's own existing dark-neutral-inverse tooltip look** (`--color-background-inverse`/`--color-text-inverse`), matching Lumen's hand-built `Tooltip.tsx` (`bg-neutral-800`/`text-neutral-white`) exactly but sourced through real semantic tokens instead of raw neutral literals — the one component in this batch where shadcn's own default color choice was overridden for cross-system visual consistency, not just token-correctness.
- **`ShadcnForm`'s `Meta` typing precedent (dropping the `component:` binding when a component's prop type can't be faked with placeholder `args`) did not recur here** — every batch-5 component's props were concrete enough for normal `Meta<typeof X>` typing or the same `args: { type: "..." }` placeholder pattern already used for `Accordion`/`InputOTP`/`ToggleGroup`.

This closes the "name-colliding duplicates" phase of the bulk-adoption plan (§7). Remaining: `Calendar`/`Chart` (heaviest dependencies — a date library, Recharts), and the `Combobox`/`NativeSelect`/`Marker`/`Direction`/`Attachment` gaps that were dropped as unavailable for the `new-york` registry style across batches 3–5 (re-check availability before attempting again).

---

# 7. Bulk adoption (2026-07-23 override)

Rule 3 above ("never duplicate an existing Lumen component") was explicitly overridden by direct user instruction on 2026-07-23, scoped to a bulk effort to adopt the entire shadcn `registry:ui` component set (61 components at the time), including ones that duplicate an existing Lumen primitive (e.g. shadcn's own `Button`, `Card`, `Tabs`). This section records that decision so it isn't mistaken for the default policy on a future component.

## 7.1 Naming collisions

Where a shadcn component's name exactly matches an existing Lumen public export (`Button`, `Card`, `Tabs`, `Tooltip`, `Select`, `Avatar`, `Input`, `Switch`, `Checkbox`, `Pagination`, and any other exact-name match discovered during this effort), the shadcn version is exported under a `Shadcn`-prefixed name (`ShadcnButton`, `ShadcnCard`, ...) rather than replacing or renaming the existing Lumen export. This was chosen specifically to be additive and non-breaking: existing Lumen exports and every current consumer of them are untouched. Where shadcn's own name doesn't collide (e.g. `Dialog` vs. Lumen's `Modal`, `RadioGroup` vs. Lumen's `Radio`, `Table` vs. Lumen's `DataTable`), the shadcn component keeps its own shadcn-native name — only genuine identical-name collisions get the prefix.

## 7.2 What this does *not* change

Rules 1, 2, 4–10 in Section 4 still apply in full to every bulk-adopted component: no shadcn default theme values, full design/code/a11y review, Storybook coverage, dark mode via `[data-theme]` only, etc. The override is narrowly scoped to rule 3 (duplication) — it does not relax token discipline, testing requirements, or the internal/public split.

## 7.3 Batch tracking

Given the scope (~59 remaining components after `Command`/`Accordion`), this effort is delivered in small batches, each validated (typecheck/test/lint/Storybook build) and reported before the next batch starts, rather than as one bulk change — consistent with this repo's preference for one fully-integrated component over several partially-adapted ones, just applied per-batch instead of per-component. See `docs/changelog.md`'s `[Unreleased]` section for the batch-by-batch record.
