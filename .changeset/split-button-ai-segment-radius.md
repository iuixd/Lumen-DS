---
"@lumen/ui": patch
---

Fix Split Button segment corner rendering by applying the Figma-confirmed
8px exposed-corner radius directly to the Main and Dropdown interactive
sublayers of `AIButton split`. This affects Primary, Secondary, and Outline
Split Button AI compositions without changing props, tokens, or behavior.
