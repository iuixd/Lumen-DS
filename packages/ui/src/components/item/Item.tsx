import type { ComponentProps } from "react";

import {
  Item as InternalItem,
  ItemActions as InternalItemActions,
  ItemContent as InternalItemContent,
  ItemDescription as InternalItemDescription,
  ItemFooter as InternalItemFooter,
  ItemGroup as InternalItemGroup,
  ItemHeader as InternalItemHeader,
  ItemMedia as InternalItemMedia,
  ItemSeparator as InternalItemSeparator,
  ItemTitle as InternalItemTitle
} from "../internal/item";

/**
 * Item, sourced from shadcn/ui and adapted to Lumen's token system — a
 * generic structured list-row layout (media + title/description + actions).
 * See packages/ui/src/components/internal/item.tsx for the adaptation
 * notes. This public module is the only supported import path; the
 * internal implementation may change without notice.
 */
export type ItemProps = ComponentProps<typeof InternalItem>;
export function Item(props: ItemProps) {
  return <InternalItem {...props} />;
}

export const ItemGroup = InternalItemGroup;
export const ItemSeparator = InternalItemSeparator;
export const ItemMedia = InternalItemMedia;
export const ItemContent = InternalItemContent;
export const ItemTitle = InternalItemTitle;
export const ItemDescription = InternalItemDescription;
export const ItemActions = InternalItemActions;
export const ItemHeader = InternalItemHeader;
export const ItemFooter = InternalItemFooter;
