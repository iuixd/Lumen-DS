import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "./ThemeToggle";

describe("ThemeToggle", () => {
  it("renders as a switch with a default accessible name", () => {
    render(<ThemeToggle name="theme" />);
    expect(screen.getByRole("switch", { name: "Toggle dark theme" })).toBeInTheDocument();
  });

  it("accepts an aria-label override", () => {
    render(<ThemeToggle name="theme" aria-label="Switch to dark mode" />);
    expect(screen.getByRole("switch", { name: "Switch to dark mode" })).toBeInTheDocument();
  });

  it("toggles checked state on click", async () => {
    render(<ThemeToggle name="theme" />);
    const toggle = screen.getByRole("switch");
    expect(toggle).not.toBeChecked();
    await userEvent.click(toggle);
    expect(toggle).toBeChecked();
  });

  it("associates the label with the input via htmlFor/id", () => {
    render(<ThemeToggle name="theme" id="theme-toggle" />);
    expect(screen.getByRole("switch")).toHaveAttribute("id", "theme-toggle");
  });
});
