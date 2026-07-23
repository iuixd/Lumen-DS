import type { ComponentProps } from "react";

import {
  HoverCard as InternalHoverCard,
  HoverCardContent as InternalHoverCardContent,
  HoverCardTrigger as InternalHoverCardTrigger
} from "../internal/hover-card";

/**
 * HoverCard, sourced from shadcn/ui (Radix HoverCard) and adapted to
 * Lumen's token system — see packages/ui/src/components/internal/hover-card.tsx
 * for the adaptation notes. This public module is the only supported
 * import path; the internal implementation may change without notice.
 */
export type HoverCardProps = ComponentProps<typeof InternalHoverCard>;
export function HoverCard(props: HoverCardProps) {
  return <InternalHoverCard {...props} />;
}

export const HoverCardTrigger = InternalHoverCardTrigger;
export const HoverCardContent = InternalHoverCardContent;
