import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Separator } from "./Separator";
import * as PublicExports from "../../index";

describe("Separator", () => {
  it("is exported from @lumen/ui's public entry point", () => {
    expect(PublicExports.Separator).toBe(Separator);
  });

  it("is decorative (no separator role) by default, matching Radix's default", () => {
    render(<Separator data-testid="sep" />);
    const sep = screen.getByTestId("sep");
    expect(sep).toHaveAttribute("data-orientation", "horizontal");
    expect(sep).not.toHaveAttribute("role", "separator");
  });

  it("exposes role=separator when decorative=false", () => {
    render(<Separator decorative={false} data-testid="sep" />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("supports vertical orientation", () => {
    render(<Separator orientation="vertical" data-testid="sep" />);
    expect(screen.getByTestId("sep")).toHaveAttribute("data-orientation", "vertical");
  });
});
