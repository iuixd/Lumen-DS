---
"@lumen/tokens": minor
"@lumen/ui": minor
---

Add `status` ("success" | "warning" | "error") to `Button`, sourced from the Buttons page's component-set (Lumen-AI-Design-System, node 475:7210), whose State property now includes Success/Error/Warning instances. Adds semantic tokens `status.{success,warning,error}-text`/`-border` (surfaces reuse the existing `-subtle` tokens); dark-mode values follow the same ramp-mirroring rule already used for `status.success`/`-subtle`.
