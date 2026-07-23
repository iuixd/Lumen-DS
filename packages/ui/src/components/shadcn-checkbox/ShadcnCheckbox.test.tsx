import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ShadcnCheckbox } from "./ShadcnCheckbox";
import * as PublicExports from "../../index";

describe("ShadcnCheckbox", () => {
  it("is exported from @lumen/ui's public entry point", () => {
    expect(PublicExports.ShadcnCheckbox).toBe(ShadcnCheckbox);
  });

  it("is unchecked by default and toggles on click", async () => {
    render(<ShadcnCheckbox aria-label="Accept terms" />);
    const checkbox = screen.getByRole("checkbox", { name: "Accept terms" });
    expect(checkbox).toHaveAttribute("aria-checked", "false");

    await userEvent.click(checkbox);
    expect(checkbox).toHaveAttribute("aria-checked", "true");
  });

  it("respects defaultChecked", () => {
    render(<ShadcnCheckbox aria-label="Accept terms" defaultChecked />);
    expect(screen.getByRole("checkbox", { name: "Accept terms" })).toHaveAttribute("aria-checked", "true");
  });

  it("does not toggle when disabled", async () => {
    render(<ShadcnCheckbox aria-label="Accept terms" disabled />);
    const checkbox = screen.getByRole("checkbox", { name: "Accept terms" });
    await userEvent.click(checkbox);
    expect(checkbox).toHaveAttribute("aria-checked", "false");
  });
});
