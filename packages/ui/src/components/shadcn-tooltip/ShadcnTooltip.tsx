import type { ComponentProps } from "react";

import {
  Tooltip as InternalTooltip,
  TooltipContent as InternalTooltipContent,
  TooltipProvider as InternalTooltipProvider,
  TooltipTrigger as InternalTooltipTrigger
} from "../internal/tooltip";

/**
 * ShadcnTooltip, sourced from shadcn/ui (Radix Tooltip) and adapted to
 * Lumen's token system — see packages/ui/src/components/internal/tooltip.tsx
 * for the adaptation notes. Exported under a `Shadcn`-prefixed name
 * because Lumen's own `Tooltip` already fills this role (see
 * docs/shadcn-integration.md §7.1). This public module is the only
 * supported import path; the internal implementation may change without
 * notice.
 */
export type ShadcnTooltipProps = ComponentProps<typeof InternalTooltip>;
export function ShadcnTooltip(props: ShadcnTooltipProps) {
  return <InternalTooltip {...props} />;
}

export const ShadcnTooltipTrigger = InternalTooltipTrigger;
export const ShadcnTooltipContent = InternalTooltipContent;
export const ShadcnTooltipProvider = InternalTooltipProvider;
