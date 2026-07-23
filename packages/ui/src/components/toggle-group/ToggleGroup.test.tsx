import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup";
import * as PublicExports from "../../index";

describe("ToggleGroup", () => {
  it("is exported from @lumen/ui's public entry point", () => {
    expect(PublicExports.ToggleGroup).toBe(ToggleGroup);
    expect(PublicExports.ToggleGroupItem).toBeDefined();
  });

  it("allows independent multi-select with type=\"multiple\"", async () => {
    render(
      <ToggleGroup type="multiple">
        <ToggleGroupItem value="bold" aria-label="Bold">
          B
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          I
        </ToggleGroupItem>
      </ToggleGroup>
    );
    const bold = screen.getByRole("button", { name: "Bold" });
    const italic = screen.getByRole("button", { name: "Italic" });

    await userEvent.click(bold);
    await userEvent.click(italic);
    expect(bold).toHaveAttribute("data-state", "on");
    expect(italic).toHaveAttribute("data-state", "on");
  });

  it("allows only one selection at a time with type=\"single\"", async () => {
    render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="left" aria-label="Left">
          Left
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Right">
          Right
        </ToggleGroupItem>
      </ToggleGroup>
    );
    const left = screen.getByRole("radio", { name: "Left" });
    const right = screen.getByRole("radio", { name: "Right" });

    await userEvent.click(left);
    expect(left).toHaveAttribute("data-state", "on");

    await userEvent.click(right);
    expect(right).toHaveAttribute("data-state", "on");
    expect(left).toHaveAttribute("data-state", "off");
  });

  it("does not toggle a disabled item", async () => {
    render(
      <ToggleGroup type="multiple">
        <ToggleGroupItem value="bold" aria-label="Bold" disabled>
          B
        </ToggleGroupItem>
      </ToggleGroup>
    );
    const bold = screen.getByRole("button", { name: "Bold" });
    await userEvent.click(bold);
    expect(bold).toHaveAttribute("data-state", "off");
  });
});
