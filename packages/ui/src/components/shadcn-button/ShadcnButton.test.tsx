import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ShadcnButton } from "./ShadcnButton";
import * as PublicExports from "../../index";

describe("ShadcnButton", () => {
  it("is exported from @lumen/ui's public entry point", () => {
    expect(PublicExports.ShadcnButton).toBe(ShadcnButton);
  });

  it("renders its label and calls onClick", async () => {
    const onClick = vi.fn();
    render(<ShadcnButton onClick={onClick}>Click me</ShadcnButton>);
    await userEvent.click(screen.getByRole("button", { name: "Click me" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("is disabled when disabled", () => {
    render(<ShadcnButton disabled>Click me</ShadcnButton>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeDisabled();
  });
});
