import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./Carousel";
import * as PublicExports from "../../index";

function BasicCarousel() {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem>Slide 1</CarouselItem>
        <CarouselItem>Slide 2</CarouselItem>
        <CarouselItem>Slide 3</CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

describe("Carousel", () => {
  it("is exported from @lumen/ui's public entry point", () => {
    expect(PublicExports.Carousel).toBe(Carousel);
    expect(PublicExports.CarouselContent).toBeDefined();
    expect(PublicExports.CarouselItem).toBeDefined();
    expect(PublicExports.CarouselPrevious).toBeDefined();
    expect(PublicExports.CarouselNext).toBeDefined();
  });

  it("renders as a carousel region with its slides", () => {
    // aria-roledescription changes how the role is announced, not the
    // accessible name — assert on the attribute directly rather than
    // matching a "carousel"-containing name that doesn't exist here.
    render(<BasicCarousel />);
    const region = screen.getByRole("region");
    expect(region).toHaveAttribute("aria-roledescription", "carousel");
    const slides = screen.getAllByRole("group");
    expect(slides).toHaveLength(3);
    slides.forEach((slide) => expect(slide).toHaveAttribute("aria-roledescription", "slide"));
  });

  it("renders accessible Previous/Next controls", () => {
    render(<BasicCarousel />);
    expect(screen.getByRole("button", { name: "Previous slide" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next slide" })).toBeInTheDocument();
  });

  it("throws if a sub-part is rendered outside <Carousel>", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<CarouselItem>Orphan slide</CarouselItem>)).toThrow(
      "useCarousel must be used within a <Carousel />"
    );
    consoleError.mockRestore();
  });
});
