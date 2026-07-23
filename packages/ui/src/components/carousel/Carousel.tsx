import type { ComponentProps } from "react";

import {
  Carousel as InternalCarousel,
  CarouselContent as InternalCarouselContent,
  CarouselItem as InternalCarouselItem,
  CarouselNext as InternalCarouselNext,
  CarouselPrevious as InternalCarouselPrevious,
  type CarouselApi
} from "../internal/carousel";

/**
 * Carousel, sourced from shadcn/ui (built on `embla-carousel-react`) and
 * adapted to Lumen's token system — see packages/ui/src/components/internal/carousel.tsx
 * for the adaptation notes. This public module is the only supported
 * import path; the internal implementation may change without notice.
 */
export type CarouselProps = ComponentProps<typeof InternalCarousel>;
export function Carousel(props: CarouselProps) {
  return <InternalCarousel {...props} />;
}

export type { CarouselApi };
export const CarouselContent = InternalCarouselContent;
export const CarouselItem = InternalCarouselItem;
export const CarouselPrevious = InternalCarouselPrevious;
export const CarouselNext = InternalCarouselNext;
