import type { ComponentProps } from "react";

import {
  Dialog as InternalDialog,
  DialogClose as InternalDialogClose,
  DialogContent as InternalDialogContent,
  DialogDescription as InternalDialogDescription,
  DialogFooter as InternalDialogFooter,
  DialogHeader as InternalDialogHeader,
  DialogOverlay as InternalDialogOverlay,
  DialogPortal as InternalDialogPortal,
  DialogTitle as InternalDialogTitle,
  DialogTrigger as InternalDialogTrigger
} from "../internal/dialog";

/**
 * Dialog, sourced from shadcn/ui (Radix Dialog) — the same internal
 * source Command's palette already uses (see
 * packages/ui/src/components/internal/dialog.tsx). Exported publicly for
 * the first time in batch 5, under its own plain name: no existing Lumen
 * export is named `Dialog` (Lumen's own equivalent is named `Modal`),
 * so there is no collision to prefix — see docs/shadcn-integration.md
 * §7.1. This public module is the only supported import path; the
 * internal implementation may change without notice.
 */
export type DialogProps = ComponentProps<typeof InternalDialog>;
export function Dialog(props: DialogProps) {
  return <InternalDialog {...props} />;
}

export const DialogTrigger = InternalDialogTrigger;
export const DialogClose = InternalDialogClose;
export const DialogContent = InternalDialogContent;
export const DialogHeader = InternalDialogHeader;
export const DialogFooter = InternalDialogFooter;
export const DialogTitle = InternalDialogTitle;
export const DialogDescription = InternalDialogDescription;
export const DialogPortal = InternalDialogPortal;
export const DialogOverlay = InternalDialogOverlay;
