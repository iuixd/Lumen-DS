import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FilterChip } from "./FilterChip";

describe("FilterChip", () => {
  it("renders its label with a leading plus icon by default", () => {
    render(<FilterChip>Status</FilterChip>);
    const chip = screen.getByRole("button", { name: "Status" });
    expect(chip).toBeInTheDocument();
    expect(chip.querySelector("svg")).toBeInTheDocument();
  });

  it("exposes selection state via aria-pressed", () => {
    render(<FilterChip selected>Status</FilterChip>);
    expect(screen.getByRole("button", { name: "Status" })).toHaveAttribute("aria-pressed", "true");
  });

  it("defaults aria-pressed to false when unselected", () => {
    render(<FilterChip>Status</FilterChip>);
    expect(screen.getByRole("button", { name: "Status" })).toHaveAttribute("aria-pressed", "false");
  });

  it("renders a trailing remove icon only when selected", () => {
    const { rerender } = render(<FilterChip>Status</FilterChip>);
    expect(screen.getByRole("button", { name: "Status" }).querySelectorAll("svg")).toHaveLength(1);
    rerender(<FilterChip selected>Status</FilterChip>);
    expect(screen.getByRole("button", { name: "Status" }).querySelectorAll("svg")).toHaveLength(2);
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<FilterChip onClick={onClick}>Status</FilterChip>);
    await userEvent.click(screen.getByRole("button", { name: "Status" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("marks the chip aria-disabled and does not call onClick when disabled", async () => {
    const onClick = vi.fn();
    render(
      <FilterChip onClick={onClick} disabled>
        Status
      </FilterChip>
    );
    const chip = screen.getByRole("button", { name: "Status" });
    expect(chip).toHaveAttribute("aria-disabled", "true");
    await userEvent.click(chip);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("applies asymmetric padding when unselected and symmetric padding when selected", () => {
    const { rerender } = render(<FilterChip>Status</FilterChip>);
    let className = screen.getByRole("button", { name: "Status" }).className;
    expect(className).toMatch(/\bpl-\[var\(--spacing-12\)\]/);
    expect(className).toMatch(/\bpr-\[var\(--spacing-16\)\]/);

    rerender(<FilterChip selected>Status</FilterChip>);
    className = screen.getByRole("button", { name: "Status" }).className;
    expect(className).toMatch(/\bpx-\[var\(--spacing-12\)\]/);
  });
});
