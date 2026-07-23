import type { ComponentProps } from "react";

import {
  DropdownMenu as InternalDropdownMenu,
  DropdownMenuCheckboxItem as InternalDropdownMenuCheckboxItem,
  DropdownMenuContent as InternalDropdownMenuContent,
  DropdownMenuGroup as InternalDropdownMenuGroup,
  DropdownMenuItem as InternalDropdownMenuItem,
  DropdownMenuLabel as InternalDropdownMenuLabel,
  DropdownMenuPortal as InternalDropdownMenuPortal,
  DropdownMenuRadioGroup as InternalDropdownMenuRadioGroup,
  DropdownMenuRadioItem as InternalDropdownMenuRadioItem,
  DropdownMenuSeparator as InternalDropdownMenuSeparator,
  DropdownMenuShortcut as InternalDropdownMenuShortcut,
  DropdownMenuSub as InternalDropdownMenuSub,
  DropdownMenuSubContent as InternalDropdownMenuSubContent,
  DropdownMenuSubTrigger as InternalDropdownMenuSubTrigger,
  DropdownMenuTrigger as InternalDropdownMenuTrigger
} from "../internal/dropdown-menu";

/**
 * DropdownMenu, sourced from shadcn/ui (Radix DropdownMenu) and adapted to
 * Lumen's token system — see packages/ui/src/components/internal/dropdown-menu.tsx
 * for the adaptation notes. This public module is the only supported
 * import path; the internal implementation may change without notice.
 */
export type DropdownMenuProps = ComponentProps<typeof InternalDropdownMenu>;
export function DropdownMenu(props: DropdownMenuProps) {
  return <InternalDropdownMenu {...props} />;
}

export const DropdownMenuTrigger = InternalDropdownMenuTrigger;
export const DropdownMenuContent = InternalDropdownMenuContent;
export const DropdownMenuItem = InternalDropdownMenuItem;
export const DropdownMenuCheckboxItem = InternalDropdownMenuCheckboxItem;
export const DropdownMenuRadioItem = InternalDropdownMenuRadioItem;
export const DropdownMenuLabel = InternalDropdownMenuLabel;
export const DropdownMenuSeparator = InternalDropdownMenuSeparator;
export const DropdownMenuShortcut = InternalDropdownMenuShortcut;
export const DropdownMenuGroup = InternalDropdownMenuGroup;
export const DropdownMenuPortal = InternalDropdownMenuPortal;
export const DropdownMenuSub = InternalDropdownMenuSub;
export const DropdownMenuSubContent = InternalDropdownMenuSubContent;
export const DropdownMenuSubTrigger = InternalDropdownMenuSubTrigger;
export const DropdownMenuRadioGroup = InternalDropdownMenuRadioGroup;
