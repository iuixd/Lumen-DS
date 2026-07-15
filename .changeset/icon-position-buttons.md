---
"@lumen/tokens": minor
"@lumen/ui": patch
---

Add `--spacing-14`/`--spacing-18` tokens, sourced from the Buttons page's new Left/Right icon-position instances (Lumen-AI-Design-System, node 475:7210). These size the icon in `Button`'s existing `iconStart`/`iconEnd` slots — no new `Button` variant was needed, since those props already reproduce the icon-position instances' box model. Storybook gained `WithIcons`/`WithIconsBySize` stories on `Primitives/Button` covering all five variants (Primary, Raised, Secondary, Tertiary, Link).
