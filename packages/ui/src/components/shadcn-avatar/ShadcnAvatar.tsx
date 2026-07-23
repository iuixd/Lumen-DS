import type { ComponentProps } from "react";

import {
  Avatar as InternalAvatar,
  AvatarFallback as InternalAvatarFallback,
  AvatarImage as InternalAvatarImage
} from "../internal/avatar";

/**
 * ShadcnAvatar, sourced from shadcn/ui (Radix Avatar) and adapted to
 * Lumen's token system — see packages/ui/src/components/internal/avatar.tsx
 * for the adaptation notes. Exported under a `Shadcn`-prefixed name
 * because Lumen's own `Avatar` already fills this role (see
 * docs/shadcn-integration.md §7.1). This public module is the only
 * supported import path; the internal implementation may change without
 * notice.
 */
export type ShadcnAvatarProps = ComponentProps<typeof InternalAvatar>;
export function ShadcnAvatar(props: ShadcnAvatarProps) {
  return <InternalAvatar {...props} />;
}

export const ShadcnAvatarImage = InternalAvatarImage;
export const ShadcnAvatarFallback = InternalAvatarFallback;
