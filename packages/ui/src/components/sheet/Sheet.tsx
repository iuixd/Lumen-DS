import type { ComponentProps } from "react";

import {
  Sheet as InternalSheet,
  SheetClose as InternalSheetClose,
  SheetContent as InternalSheetContent,
  SheetDescription as InternalSheetDescription,
  SheetFooter as InternalSheetFooter,
  SheetHeader as InternalSheetHeader,
  SheetPortal as InternalSheetPortal,
  SheetOverlay as InternalSheetOverlay,
  SheetTitle as InternalSheetTitle,
  SheetTrigger as InternalSheetTrigger
} from "../internal/sheet";

/**
 * Sheet, sourced from shadcn/ui (Radix Dialog, side-anchored) and adapted
 * to Lumen's token system — see packages/ui/src/components/internal/sheet.tsx
 * for the adaptation notes. This public module is the only supported
 * import path; the internal implementation may change without notice.
 */
export type SheetProps = ComponentProps<typeof InternalSheet>;
export function Sheet(props: SheetProps) {
  return <InternalSheet {...props} />;
}

export const SheetTrigger = InternalSheetTrigger;
export const SheetClose = InternalSheetClose;
export const SheetContent = InternalSheetContent;
export const SheetHeader = InternalSheetHeader;
export const SheetFooter = InternalSheetFooter;
export const SheetTitle = InternalSheetTitle;
export const SheetDescription = InternalSheetDescription;
export const SheetPortal = InternalSheetPortal;
export const SheetOverlay = InternalSheetOverlay;
