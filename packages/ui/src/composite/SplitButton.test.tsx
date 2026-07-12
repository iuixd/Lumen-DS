import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SplitButton } from "./SplitButton";

describe("SplitButton", () => {
  it("renders two independently-labeled buttons", () => {
    render(<SplitButton dropdownLabel="More save options">Save changes</SplitButton>);
    expect(screen.getByRole("button", { name: "Save changes" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "More save options" })).toBeInTheDocument();
  });

  it("calls onMainClick only from the main button and onDropdownClick only from the dropdown button", async () => {
    const onMainClick = vi.fn();
    const onDropdownClick = vi.fn();
    render(
      <SplitButton dropdownLabel="More save options" onMainClick={onMainClick} onDropdownClick={onDropdownClick}>
        Save changes
      </SplitButton>
    );
    await userEvent.click(screen.getByRole("button", { name: "Save changes" }));
    expect(onMainClick).toHaveBeenCalledOnce();
    expect(onDropdownClick).not.toHaveBeenCalled();

    await userEvent.click(screen.getByRole("button", { name: "More save options" }));
    expect(onDropdownClick).toHaveBeenCalledOnce();
    expect(onMainClick).toHaveBeenCalledOnce();
  });

  it("disables both buttons when disabled", () => {
    render(<SplitButton dropdownLabel="More save options" disabled>Save changes</SplitButton>);
    expect(screen.getByRole("button", { name: "Save changes" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "More save options" })).toBeDisabled();
  });

  it("while loading, disables only the main button and keeps the dropdown interactive", () => {
    // Figma's Loading state shows the dropdown chevron unchanged — only the
    // main action is busy, so re-triggering the menu should still work.
    render(<SplitButton dropdownLabel="More save options" isLoading>Save changes</SplitButton>);
    const main = screen.getByRole("button", { name: "Save changes" });
    const dropdown = screen.getByRole("button", { name: "More save options" });
    expect(main).toBeDisabled();
    expect(main).toHaveAttribute("aria-busy", "true");
    expect(dropdown).not.toBeDisabled();
  });

  it("hides the main label visually while loading but keeps it in the accessible name", () => {
    render(<SplitButton dropdownLabel="More save options" isLoading>Save changes</SplitButton>);
    const main = screen.getByRole("button", { name: "Save changes" });
    const label = screen.getByText("Save changes");
    expect(main).toContainElement(label);
    expect(label).toHaveClass("sr-only");
  });

  it("warns in dev when dropdownLabel is left at the generic default", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<SplitButton>Save changes</SplitButton>);
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("dropdownLabel"));
    warnSpy.mockRestore();
  });

  it("does not warn when a specific dropdownLabel is provided", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<SplitButton dropdownLabel="More save options">Save changes</SplitButton>);
    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it("gives the raised variant an elevation shadow via the arbitrary-property syntax", () => {
    render(
      <SplitButton variant="raised" dropdownLabel="More save options">
        Save changes
      </SplitButton>
    );
    const container = screen.getByRole("button", { name: "Save changes" }).closest("div");
    expect(container?.className).toMatch(/\[box-shadow:var\(--shadow-button-default\)\]/);
  });

  it("applies rounded-full for the pill modifier", () => {
    render(
      <SplitButton pill dropdownLabel="More save options">
        Save changes
      </SplitButton>
    );
    const container = screen.getByRole("button", { name: "Save changes" }).closest("div");
    expect(container?.className).toMatch(/\brounded-full\b/);
  });
});
