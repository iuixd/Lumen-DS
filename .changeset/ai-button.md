---
"@lumen/ui": minor
---

Add `AIButton`, a new primitive implementing the Figma "AI Communication Component Library" (Lumen-DS-2027, node 760:1965): `primary | secondary | tertiary | outline` variants, `xs | sm | md | lg` sizes, a mandatory leading icon (defaults to a sparkle glyph, overridable), `iconOnly`, `isLoading`, and a behavior-only `destructive` flag. Reconciles `docs/component-specifications.md` §30's pre-Figma AI Action Button spec against the real shipped component (§46). Split Button AI and the `status` tint are not yet implemented — see `docs/changelog.md`.
