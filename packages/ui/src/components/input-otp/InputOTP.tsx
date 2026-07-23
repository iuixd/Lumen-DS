import type { ComponentProps } from "react";

import {
  InputOTP as InternalInputOTP,
  InputOTPGroup as InternalInputOTPGroup,
  InputOTPSeparator as InternalInputOTPSeparator,
  InputOTPSlot as InternalInputOTPSlot
} from "../internal/input-otp";

/**
 * InputOTP, sourced from shadcn/ui (the `input-otp` library) and adapted
 * to Lumen's token system — see packages/ui/src/components/internal/input-otp.tsx
 * for the adaptation notes. This public module is the only supported
 * import path; the internal implementation may change without notice.
 */
export type InputOTPProps = ComponentProps<typeof InternalInputOTP>;
export function InputOTP(props: InputOTPProps) {
  return <InternalInputOTP {...props} />;
}

export const InputOTPGroup = InternalInputOTPGroup;
export const InputOTPSlot = InternalInputOTPSlot;
export const InputOTPSeparator = InternalInputOTPSeparator;
