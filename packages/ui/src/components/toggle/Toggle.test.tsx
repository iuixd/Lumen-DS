import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toggle } from "./Toggle";
import * as PublicExports from "../../index";

describe("Toggle", () => {
  it("is exported from @lumen/ui's public entry point", () => {
    expect(PublicExports.Toggle).toBe(Toggle);
  });

  it("is unpressed by default and toggles pressed state on click", async () => {
    render(<Toggle aria-label="Toggle bold">B</Toggle>);
    const toggle = screen.getByRole("button", { name: "Toggle bold" });
    expect(toggle).toHaveAttribute("aria-pressed", "false");

    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "true");

    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "false");
  });

  it("respects defaultPressed", () => {
    render(
      <Toggle aria-label="Toggle bold" defaultPressed>
        B
      </Toggle>
    );
    expect(screen.getByRole("button", { name: "Toggle bold" })).toHaveAttribute("aria-pressed", "true");
  });

  it("does not toggle when disabled", async () => {
    render(
      <Toggle aria-label="Toggle bold" disabled>
        B
      </Toggle>
    );
    const toggle = screen.getByRole("button", { name: "Toggle bold" });
    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "false");
  });
});
