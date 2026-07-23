import type { ComponentProps } from "react";

import {
  Accordion as InternalAccordion,
  AccordionContent as InternalAccordionContent,
  AccordionItem as InternalAccordionItem,
  AccordionTrigger as InternalAccordionTrigger
} from "../internal/accordion";

/**
 * Accordion, sourced from shadcn/ui (Radix Accordion) and adapted to
 * Lumen's token system — see packages/ui/src/components/internal/accordion.tsx
 * for the adaptation notes. This public module is the only supported import
 * path; the internal implementation may change without notice.
 */
export type AccordionProps = ComponentProps<typeof InternalAccordion>;
export function Accordion(props: AccordionProps) {
  return <InternalAccordion {...props} />;
}

export const AccordionItem = InternalAccordionItem;
export const AccordionTrigger = InternalAccordionTrigger;
export const AccordionContent = InternalAccordionContent;
