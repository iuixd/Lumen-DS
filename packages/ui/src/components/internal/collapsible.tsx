import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

/**
 * Straight re-export of Radix's Collapsible — shadcn's own generated
 * source has no styling to adapt. Distinct from `Accordion`: Collapsible
 * is a single boolean open/close primitive with no group/single-vs-multiple
 * management, while Accordion coordinates multiple items sharing one open
 * state. Not a duplicate of Accordion — a lower-level primitive it could
 * be built from, kept separate since Accordion already exists and works.
 */
const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
