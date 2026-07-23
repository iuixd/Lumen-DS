import type { ComponentProps } from "react";

import {
  Card as InternalCard,
  CardContent as InternalCardContent,
  CardDescription as InternalCardDescription,
  CardFooter as InternalCardFooter,
  CardHeader as InternalCardHeader,
  CardTitle as InternalCardTitle
} from "../internal/card";

/**
 * ShadcnCard, sourced from shadcn/ui and adapted to Lumen's token
 * system — see packages/ui/src/components/internal/card.tsx for the
 * adaptation notes. Exported under a `Shadcn`-prefixed name because
 * Lumen's own `Card` already fills this role (see
 * docs/shadcn-integration.md §7.1). This public module is the only
 * supported import path; the internal implementation may change without
 * notice.
 */
export type ShadcnCardProps = ComponentProps<typeof InternalCard>;
export function ShadcnCard(props: ShadcnCardProps) {
  return <InternalCard {...props} />;
}

export const ShadcnCardHeader = InternalCardHeader;
export const ShadcnCardTitle = InternalCardTitle;
export const ShadcnCardDescription = InternalCardDescription;
export const ShadcnCardContent = InternalCardContent;
export const ShadcnCardFooter = InternalCardFooter;
