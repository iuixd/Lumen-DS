---
"@lumen/tokens": minor
"@lumen/ui": major
"@lumen/web-components": major
"@lumen/angular": major
---

Replace the legacy standard Button collections with the final Figma collection from node `1027:3733`. React, Web Components, Angular, and Storybook now share seven variants (`primary`, `accent`, `secondary`, `outline`, `ghost`, `link`, and `destructive`), one 34px geometry, and exact light/dark Default, Hover, Focused, and Disabled tokens. Remove the former `raised`/`tertiary` variants and standard Button size, status, pill, icon-only, and loading APIs; migrate `tertiary` usage to `ghost`.
