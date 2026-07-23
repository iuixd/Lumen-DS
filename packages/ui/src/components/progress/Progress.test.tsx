import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Progress } from "./Progress";
import * as PublicExports from "../../index";

describe("Progress", () => {
  it("is exported from @lumen/ui's public entry point", () => {
    expect(PublicExports.Progress).toBe(Progress);
  });

  it("exposes progressbar semantics with the current value", () => {
    render(<Progress value={40} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "40");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
  });

  it("translates its indicator based on value", () => {
    const { container, rerender } = render(<Progress value={25} />);
    const indicator = container.querySelector("[style]") as HTMLElement;
    expect(indicator.style.transform).toBe("translateX(-75%)");

    rerender(<Progress value={100} />);
    const updated = container.querySelector("[style]") as HTMLElement;
    expect(updated.style.transform).toBe("translateX(-0%)");
  });
});
