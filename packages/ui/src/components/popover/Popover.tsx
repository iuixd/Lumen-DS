import type { ComponentProps } from "react";

import {
  Popover as InternalPopover,
  PopoverAnchor as InternalPopoverAnchor,
  PopoverContent as InternalPopoverContent,
  PopoverTrigger as InternalPopoverTrigger
} from "../internal/popover";

/**
 * Popover, sourced from shadcn/ui (Radix Popover) and adapted to Lumen's
 * token system — see packages/ui/src/components/internal/popover.tsx for
 * the adaptation notes. This public module is the only supported import
 * path; the internal implementation may change without notice.
 */
export type PopoverProps = ComponentProps<typeof InternalPopover>;
export function Popover(props: PopoverProps) {
  return <InternalPopover {...props} />;
}

export const PopoverTrigger = InternalPopoverTrigger;
export const PopoverContent = InternalPopoverContent;
export const PopoverAnchor = InternalPopoverAnchor;
