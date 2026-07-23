import type { ComponentProps } from "react";

import {
  Drawer as InternalDrawer,
  DrawerClose as InternalDrawerClose,
  DrawerContent as InternalDrawerContent,
  DrawerDescription as InternalDrawerDescription,
  DrawerFooter as InternalDrawerFooter,
  DrawerHeader as InternalDrawerHeader,
  DrawerOverlay as InternalDrawerOverlay,
  DrawerPortal as InternalDrawerPortal,
  DrawerTitle as InternalDrawerTitle,
  DrawerTrigger as InternalDrawerTrigger
} from "../internal/drawer";

/**
 * Drawer, sourced from shadcn/ui (built on `vaul`) and adapted to Lumen's
 * token system — see packages/ui/src/components/internal/drawer.tsx for
 * the adaptation notes. This public module is the only supported import
 * path; the internal implementation may change without notice.
 */
export type DrawerProps = ComponentProps<typeof InternalDrawer>;
export function Drawer(props: DrawerProps) {
  return <InternalDrawer {...props} />;
}

export const DrawerTrigger = InternalDrawerTrigger;
export const DrawerClose = InternalDrawerClose;
export const DrawerContent = InternalDrawerContent;
export const DrawerHeader = InternalDrawerHeader;
export const DrawerFooter = InternalDrawerFooter;
export const DrawerTitle = InternalDrawerTitle;
export const DrawerDescription = InternalDrawerDescription;
export const DrawerPortal = InternalDrawerPortal;
export const DrawerOverlay = InternalDrawerOverlay;
