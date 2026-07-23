import type { ComponentProps } from "react";

import { Slider as InternalSlider } from "../internal/slider";

/**
 * Slider, sourced from shadcn/ui (Radix Slider) and adapted to Lumen's
 * token system — see packages/ui/src/components/internal/slider.tsx for
 * the adaptation notes. This public module is the only supported import
 * path; the internal implementation may change without notice.
 */
export type SliderProps = ComponentProps<typeof InternalSlider>;
export function Slider(props: SliderProps) {
  return <InternalSlider {...props} />;
}
