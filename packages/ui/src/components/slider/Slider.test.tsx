import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Slider } from "./Slider";
import * as PublicExports from "../../index";

beforeEach(() => {
  Element.prototype.hasPointerCapture = vi.fn();
  Element.prototype.setPointerCapture = vi.fn();
  Element.prototype.releasePointerCapture = vi.fn();
});

describe("Slider", () => {
  it("is exported from @lumen/ui's public entry point", () => {
    expect(PublicExports.Slider).toBe(Slider);
  });

  it("exposes slider semantics with the current value", () => {
    render(<Slider defaultValue={[40]} max={100} />);
    const thumb = screen.getByRole("slider");
    expect(thumb).toHaveAttribute("aria-valuenow", "40");
    expect(thumb).toHaveAttribute("aria-valuemax", "100");
  });

  it("renders one thumb per value for a range slider", () => {
    render(<Slider defaultValue={[25, 75]} max={100} />);
    expect(screen.getAllByRole("slider")).toHaveLength(2);
  });

  it("marks its thumb disabled when disabled", () => {
    render(<Slider defaultValue={[50]} disabled />);
    expect(screen.getByRole("slider")).toHaveAttribute("data-disabled");
  });
});
