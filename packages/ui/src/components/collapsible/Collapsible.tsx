import type { ComponentProps } from "react";

import {
  Collapsible as InternalCollapsible,
  CollapsibleContent as InternalCollapsibleContent,
  CollapsibleTrigger as InternalCollapsibleTrigger
} from "../internal/collapsible";

/**
 * Collapsible, sourced from shadcn/ui (Radix Collapsible) — see
 * packages/ui/src/components/internal/collapsible.tsx for the distinction
 * from `Accordion`. This public module is the only supported import path;
 * the internal implementation may change without notice.
 */
export type CollapsibleProps = ComponentProps<typeof InternalCollapsible>;
export function Collapsible(props: CollapsibleProps) {
  return <InternalCollapsible {...props} />;
}

export const CollapsibleTrigger = InternalCollapsibleTrigger;
export const CollapsibleContent = InternalCollapsibleContent;
