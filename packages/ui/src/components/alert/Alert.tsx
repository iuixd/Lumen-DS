import type { ComponentProps } from "react";

import {
  Alert as InternalAlert,
  AlertDescription as InternalAlertDescription,
  AlertTitle as InternalAlertTitle
} from "../internal/alert";

/**
 * Alert, sourced from shadcn/ui and adapted to Lumen's token system — see
 * packages/ui/src/components/internal/alert.tsx for the adaptation notes.
 * This public module is the only supported import path; the internal
 * implementation may change without notice.
 */
export type AlertProps = ComponentProps<typeof InternalAlert>;
export function Alert(props: AlertProps) {
  return <InternalAlert {...props} />;
}

export const AlertTitle = InternalAlertTitle;
export const AlertDescription = InternalAlertDescription;
