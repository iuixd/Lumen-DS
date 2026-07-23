---
"@lumen/ui": minor
---

Add a shadcn-sourced `Accordion` component (`Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`), following the same shadcn-as-source-generator integration layer `Command` established. Adds `@radix-ui/react-accordion` as a new runtime dependency. Colors, radius, and typography resolve through the existing `shadcn-lumen-bridge.css` token bridge; the trigger's chevron uses Lumen's own icon set instead of `lucide-react`. Expand/collapse is instant for now — Lumen has no motion/duration tokens yet to back shadcn's default keyframe animation.
