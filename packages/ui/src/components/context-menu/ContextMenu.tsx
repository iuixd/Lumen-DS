import type { ComponentProps } from "react";

import {
  ContextMenu as InternalContextMenu,
  ContextMenuCheckboxItem as InternalContextMenuCheckboxItem,
  ContextMenuContent as InternalContextMenuContent,
  ContextMenuGroup as InternalContextMenuGroup,
  ContextMenuItem as InternalContextMenuItem,
  ContextMenuLabel as InternalContextMenuLabel,
  ContextMenuPortal as InternalContextMenuPortal,
  ContextMenuRadioGroup as InternalContextMenuRadioGroup,
  ContextMenuRadioItem as InternalContextMenuRadioItem,
  ContextMenuSeparator as InternalContextMenuSeparator,
  ContextMenuShortcut as InternalContextMenuShortcut,
  ContextMenuSub as InternalContextMenuSub,
  ContextMenuSubContent as InternalContextMenuSubContent,
  ContextMenuSubTrigger as InternalContextMenuSubTrigger,
  ContextMenuTrigger as InternalContextMenuTrigger
} from "../internal/context-menu";

/**
 * ContextMenu, sourced from shadcn/ui (Radix ContextMenu) and adapted to
 * Lumen's token system — see packages/ui/src/components/internal/context-menu.tsx
 * for the adaptation notes. This public module is the only supported
 * import path; the internal implementation may change without notice.
 */
export type ContextMenuProps = ComponentProps<typeof InternalContextMenu>;
export function ContextMenu(props: ContextMenuProps) {
  return <InternalContextMenu {...props} />;
}

export const ContextMenuTrigger = InternalContextMenuTrigger;
export const ContextMenuContent = InternalContextMenuContent;
export const ContextMenuItem = InternalContextMenuItem;
export const ContextMenuCheckboxItem = InternalContextMenuCheckboxItem;
export const ContextMenuRadioItem = InternalContextMenuRadioItem;
export const ContextMenuLabel = InternalContextMenuLabel;
export const ContextMenuSeparator = InternalContextMenuSeparator;
export const ContextMenuShortcut = InternalContextMenuShortcut;
export const ContextMenuGroup = InternalContextMenuGroup;
export const ContextMenuPortal = InternalContextMenuPortal;
export const ContextMenuSub = InternalContextMenuSub;
export const ContextMenuSubContent = InternalContextMenuSubContent;
export const ContextMenuSubTrigger = InternalContextMenuSubTrigger;
export const ContextMenuRadioGroup = InternalContextMenuRadioGroup;
