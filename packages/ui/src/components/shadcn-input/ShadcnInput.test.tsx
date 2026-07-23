import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ShadcnInput } from "./ShadcnInput";
import * as PublicExports from "../../index";

describe("ShadcnInput", () => {
  it("is exported from @lumen/ui's public entry point", () => {
    expect(PublicExports.ShadcnInput).toBe(ShadcnInput);
  });

  it("accepts typed input", async () => {
    render(<ShadcnInput placeholder="Email" />);
    const input = screen.getByPlaceholderText("Email");
    await userEvent.type(input, "hello@example.com");
    expect(input).toHaveValue("hello@example.com");
  });

  it("can be disabled", () => {
    render(<ShadcnInput placeholder="Email" disabled />);
    expect(screen.getByPlaceholderText("Email")).toBeDisabled();
  });
});
