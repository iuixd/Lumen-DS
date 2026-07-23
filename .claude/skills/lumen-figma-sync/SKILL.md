---
name: lumen-figma-sync
description: Use when the user asks to sync, synchronize, or propagate the Lumen Design System from Figma into code across React, Web Components, Angular, and Storybook, then commit and push. Triggers on phrases like "sync figma", "sync the design system", "figma to code", "pull the latest from figma", "update storybook from figma", "propagate this figma change to all frameworks", or a figma.com/design/GJBYRm6ySR7XIECFcHMgy2 URL. Runs the full read-audit-report-confirm-implement-validate-commit-push sequence in strict framework order (React, then Web Components, then Angular, then Storybook), gated by two explicit user confirmations.
---

# Lumen Figma-to-Code Synchronization

This skill runs a full cross-framework Figma sync for the Lumen AI Design
System. It is an orchestration wrapper around protocols that already live in
`docs/` — it does not replace them. Read the underlying docs in full before
acting; this file only sequences them and pins the two confirmation gates.

## Authoritative source for this run

- Figma file: `Lumen-AI-Design-System`, file key `GJBYRm6ySR7XIECFcHMgy2`.
- Default Dev Mode URL for this workflow (override if the user gives a
  different node in their request):
  `https://www.figma.com/design/GJBYRm6ySR7XIECFcHMgy2/Lumen-AI-Design-System?node-id=466-4365&m=dev`

**Before doing anything else, verify that node ID is still live.** `466:4365`
is the old Button node ID — `docs/changelog.md` (search `466:4365`) records
that it was renumbered to `475:7210` during the Button spec correction. Call
`mcp__claude_ai_Figma__get_metadata` (or `get_design_context`) on `466:4365`
first:
- If it resolves to a real, current node, proceed with it.
- If it 404s, has been renumbered, or is a stale/detached duplicate, resolve
  the current node yourself (check `docs/figma-sync.md` §18's source
  manifest and `docs/changelog.md` for the renumbering) and tell the user
  which node you're actually using instead, before doing any further work.

Never treat `@lumen/ui` (React) as the canonical design source. Figma
Variables, approved/published Figma components, the written component
specifications, and accessibility requirements outrank any existing code —
per `docs/figma-sync.md` §2's authority order.

## Required reading before any audit or edit

Read, in this order, before forming any recommendation:
1. `CLAUDE.md` and `AGENTS.md`
2. `docs/project-governance.md` (esp. §4, §5, §14, §17)
3. `docs/figma-source.md` and `docs/figma-sync.md` (esp. §2, §7-11, §23-25)
4. `docs/design-tokens.md`, `docs/component-architecture.md` (esp. §0 on
   React not being canonical), `docs/component-specifications.md`
5. `docs/accessibility.md`
6. `docs/storybook-guidelines.md`, `docs/development-guidelines.md`
7. `docs/quality-checklist.md` (esp. §22), `docs/github-workflow.md` (esp.
   §29)
8. `docs/changelog.md` `[Unreleased]` — this is the scope gate; do not
   implement anything not listed there without asking first

## Workflow (run in this exact order)

### Phase A — Audit (no edits)

1. Confirm the Figma node per "Authoritative source" above.
2. Inspect the Figma nodes with the Figma MCP tools: `get_metadata`,
   `get_design_context`, `get_variable_defs`, `get_screenshot` as needed.
   Follow `docs/project-governance.md` §17's connector guidance — query
   section/component-level nodes, not a bare canvas root, or `get_variable_defs`
   will return nothing.
3. Compare the Figma delta against the current repository: token source
   (`packages/tokens/src/*.json`), `@lumen/ui` component source, then
   `@lumen/web-components` and `@lumen/angular` (both currently Button-only
   proofs of concept — see their package READMEs), then Storybook stories.
4. Produce a synchronization and impact report using the exact template in
   `docs/figma-sync.md` §11 ("## Sync impact"), extended with a
   framework-by-framework breakdown (React / Web Components / Angular /
   Storybook) since this run touches all four.
5. Present the recommendation and trade-offs.
6. **Stop. Wait for the user's explicit confirmation before changing any
   file.** Offer Proceed / Modify / Skip / Cancel per
   `docs/project-governance.md` §5.

### Phase B — Implementation (only after confirmation)

Apply only the approved delta at each stage — no unrelated regeneration
(`docs/figma-sync.md` §5: the synchronization unit is one token/component/
variant, not the whole system).

7. **Update React** (`@lumen/ui`, and `@lumen/patterns` only if the delta
   reaches composed patterns). Preserve public APIs unless a breaking change
   was explicitly approved.
8. **Validate React**: `pnpm --filter @lumen/ui typecheck`,
   `pnpm --filter @lumen/ui test`, `pnpm lint`, `pnpm build`.
9. **Update Web Components** (`@lumen/web-components`, Lit) to the same
   contract — same variant/state/token mapping, not a reinterpretation.
10. **Validate Web Components**: `pnpm --filter @lumen/web-components typecheck`,
    `pnpm --filter @lumen/web-components test`.
11. **Update Angular** (`@lumen/angular`). Respect the package's documented
    Vitest/JIT constraint (classic `@Input()` decorators, not signal
    `input()` — see `packages/angular/README.md`) unless the user has
    approved changing that constraint.
12. **Validate Angular**: `pnpm --filter @lumen/angular typecheck`,
    `pnpm --filter @lumen/angular test`.
13. **Update Storybook**: stories/controls/examples for every affected
    component across all three frameworks, token references, accessibility
    notes, and change history. Do not reset the customized Storybook theme,
    navigation, or Docs layout (`docs/figma-sync.md` §14).
14. **Cross-framework parity review**: confirm React, Web Components, and
    Angular expose equivalent variants/states/tokens for the synced
    component(s), per `docs/figma-sync.md` §13's sync matrix. Record any
    intentional per-framework difference explicitly — don't let it pass
    silently.
15. **Pre-publish quality report**: run the `docs/quality-checklist.md` §22
    Claude Code quality protocol (or as much of it as available tooling
    supports) — lint, typecheck, unit tests, accessibility checks,
    production build (`pnpm build`), Storybook build
    (`pnpm build-storybook`), visual-regression if configured. Report pass/
    fail per area, using `docs/figma-sync.md` §22's sync record template.
16. **Stop. Wait for final confirmation before touching git.** This gate is
    separate from step 6 — passing validation is not itself authorization to
    commit or push.

### Phase C — Release (only after the second confirmation)

17. **Commit** approved changes following `docs/github-workflow.md` §5
    commit conventions (one change, one purpose per §2).
18. **Push** to GitHub. Never force-push. Never push without this explicit
    step having been separately confirmed, even if step 16 was approved.
19. **Report status**: CI checks triggered (`docs/github-workflow.md` §11),
    Storybook deployment status, and update the sync manifest
    (`docs/figma-sync.md` §18) and `docs/changelog.md` with the sync record
    and resulting status (`Synced` / `Partially Synced` / `Blocked`).

## Hard constraints throughout

- Never infer exact values from screenshots, swatch appearance, or layer
  names — `docs/figma-sync.md` §10 "Do not infer."
- Never silently expand scope beyond `docs/changelog.md` `[Unreleased]`;
  report out-of-scope findings instead of fixing them inline.
- Never skip a framework or reorder the sequence (React → Web Components →
  Angular → Storybook → commit → push) even if a later framework looks
  trivial — parity drift between frameworks is the primary failure mode this
  skill exists to prevent.
- Never publish packages, deploy Storybook, or release without a separate,
  explicit instruction beyond the two confirmations above.
- If Figma evidence is incomplete for any framework, leave the existing
  implementation unchanged there and report it as unresolved rather than
  guessing.
