import type { ComponentProps } from "react";

import { Textarea as InternalTextarea } from "../internal/textarea";

/**
 * Textarea, sourced from shadcn/ui and adapted to Lumen's token system —
 * see packages/ui/src/components/internal/textarea.tsx for the adaptation
 * notes. This public module is the only supported import path; the
 * internal implementation may change without notice.
 */
export type TextareaProps = ComponentProps<typeof InternalTextarea>;
export function Textarea(props: TextareaProps) {
  return <InternalTextarea {...props} />;
}
