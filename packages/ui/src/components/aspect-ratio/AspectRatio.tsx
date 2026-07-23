import type { ComponentProps } from "react";

import { AspectRatio as InternalAspectRatio } from "../internal/aspect-ratio";

/**
 * AspectRatio, sourced from shadcn/ui (Radix AspectRatio) — see
 * packages/ui/src/components/internal/aspect-ratio.tsx. This public module
 * is the only supported import path; the internal implementation may
 * change without notice.
 */
export type AspectRatioProps = ComponentProps<typeof InternalAspectRatio>;
export function AspectRatio(props: AspectRatioProps) {
  return <InternalAspectRatio {...props} />;
}
