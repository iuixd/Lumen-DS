# Keeping Figma and Code in Sync

## Source of truth

Figma remains the source of truth for **design intent** (new components,
visual exploration, variant states). This repo is the source of truth for
**what ships** — the moment a token or component is coded and released here,
product code should reference the code, not re-derive values from Figma.

## Where the current tokens came from

As of the most recent token refresh, `packages/tokens/src/*.json` is sourced
from the **`Lumen-DS-2027`** Figma file (fileKey `GJBYRm6ySR7XIECFcHMgy2`,
page "Design Tokens"). This file supersedes the earlier `Lumen-DS` /
"Lumen AI - DS - base" library as the tokens source of truth. It contains
five documentation frames, each pulled in full:

- **`01 Colors`** (node `426:4396`) — Brand Color, Foundation (White/Black),
  and 14 hue ramps (Gray, Primary, Lumen Gray, Red, Green, Blue, Orange,
  Yellow, Purple, Pink, Light Blue, Teal, Sand, Lemon Green), each at
  50/100/200/300/400/**Default**/600/700/800. Primary's Default step
  (`#BE003C`) is the brand color. Note: several "Default" rows in the source
  file have a mislabeled hex caption (a copy/paste artifact) — values here
  were read from the actual swatch fill, not the printed text.
- **`02 Typography`** (node `428:13769`) — font family Inter (UI text) /
  Roboto Mono (code), and the H1–H6 / Body (lg/md/sm/xs) / Label (lg/md/sm) /
  Overline / Caption / Code (md/sm) scale.
- **`04 Spacing`** (node `511:2`) — a flat, literal-pixel 8pt-grid scale
  (0, 2, 4, 6, 8, 10, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96, 128).
  **This is a breaking change from the old index-based scale** — e.g. the
  `Stack`/`Grid` `gap` prop used to take `4` meaning 16px; it now takes `16`
  meaning 16px literally. Check every `gap={N}` call site when upgrading.
- **`05 Radius`** (node `511:78`) — none/xs/sm/md/lg/xl/2xl/3xl/full
  (0–24px, plus a `full` pill value).

**This Figma file defines tokens only — no components.** `get_libraries`
confirms zero component libraries are linked to it. As a result:
- `@lumen/ui` and `@lumen/patterns` were rebuilt generically (same component
  catalog and prop APIs as before, restyled against the new tokens) rather
  than matched against a Figma component spec — there is currently no
  component-bearing Figma file to reconcile against. If/when one becomes
  available, re-run the taxonomy-matching pass described in hard rule #3 of
  `CLAUDE.md`.
- The **shadow/elevation token tier was dropped entirely** (no shadow scale
  in the new file) — `Card`, `Modal`, and `Toast` now rely on borders instead
  of drop shadows for surface separation.
- Icons (`packages/ui/src/icons/`) were **not** touched by this refresh —
  they remain sourced from the old "Lumen AI - DS - base" Iconly library
  (see "Icons" below) since the new file has no icon set of its own.

**Known gaps to close with design before this is fully authoritative:**
- Dark-theme semantic color mappings in `src/semantic/color.json` are a
  manual engineering decision, not sourced from Figma — the file's variable
  collections each have only one mode (no real Light/Dark modes to read).
  Validate the full dark palette with design before shipping a dark mode.
- No shadow/elevation scale exists in the new file at all (previously this
  was an extrapolated scale); if elevation returns to the design system,
  source it fresh rather than reintroducing the old extrapolated values.

## Recommended ongoing workflow

1. Design changes/adds a component or token in Figma.
2. A designer or engineer runs Figma's **Code Connect** (`figma connect
   publish`) to link the Figma component to its `@lumen/ui` implementation,
   OR opens a PR here manually updating `src/*.json` (tokens) or the
   relevant component (structural changes).
3. `pnpm changeset` describes the change; CI publishes a new version.
4. Product repos bump the dependency (see `docs/versioning-and-releases.md`).

## Icons

The Figma library bundles the Iconly set (library: "Lumen AI - DS - base",
file `Lumen AI - DS - base`, frame "Icons"): **3 corner styles (Sharp,
Regular, Curved) × 6 weights (Bold, Light, Outline, Broken, Bulk, Two-tone)
× up to 125 icon names = 1,949 individual components.** Extracting all of
these mechanically (one Figma API call per icon) is impractical — the
supported path is a native Figma batch export by a human.

**What's shipped today:** a curated 22-icon starter set, all from the
`Sharp/Light` family (arrow-left, arrow-right, bookmark, calendar, chat,
close-square, danger-circle, delete, download, edit, filter, heart, hide,
home, info-square, notification, plus, profile, search, setting, show,
tick-square) — enough to cover the nav/table/form actions the existing
`@lumen/ui` components need. Source SVGs live in
`packages/ui/src/icons/svg/`; generated components in
`packages/ui/src/icons/generated/` (do not hand-edit — regenerate instead).

**To extend coverage:**

1. In Figma, select the icons you need under the "Icons" frame in the
   `Lumen AI - DS - base` library file and batch-export as SVG (Export
   panel). Name each file in kebab-case matching the icon (e.g. `Arrow -
   Right` → `arrow-right.svg`) — the import script derives the component
   name and registry key from the filename.
2. Drop the exported files into `packages/ui/src/icons/svg/`.
3. Run `pnpm --filter @lumen/ui icons:import`. This extracts the real
   geometry out of Figma's export (which includes page-background bleed
   from the enclosing frame — the script strips that automatically),
   recolors fixed hex strokes/fills to `currentColor` so icons inherit
   text color, runs SVGO, and regenerates every `{Name}Icon.tsx` component
   plus the `index.ts` barrel and `registry.ts` name lookup.
4. Import the specific `{Name}Icon` component directly in JSX for
   tree-shaking, or use `<Icon name="arrow-right" />` (from
   `packages/ui/src/primitives/Icon.tsx`) when the icon name is
   data-driven and not known until render.

If a future icon export uses a different weight/style than `Sharp/Light`,
confirm with design first (do not silently mix styles within one product
screen — see the design sign-off doc for the open items on this system).
