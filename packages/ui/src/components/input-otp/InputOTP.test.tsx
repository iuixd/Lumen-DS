import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./InputOTP";
import * as PublicExports from "../../index";

// InputOTP's underlying type (from the `input-otp` library) is a
// discriminated union between a "render-prop" mode and a "children" mode,
// which doesn't play well with a generic `Partial<ComponentProps<...>>`
// wrapper prop — take an explicit `disabled` boolean instead.
function BasicOTP({ disabled = false }: { disabled?: boolean } = {}) {
  return (
    <InputOTP maxLength={4} disabled={disabled}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
  );
}

describe("InputOTP", () => {
  it("is exported from @lumen/ui's public entry point", () => {
    expect(PublicExports.InputOTP).toBe(InputOTP);
    expect(PublicExports.InputOTPGroup).toBeDefined();
    expect(PublicExports.InputOTPSlot).toBeDefined();
    expect(PublicExports.InputOTPSeparator).toBeDefined();
  });

  it("renders a hidden text input backing the visual slots", () => {
    render(<BasicOTP />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("reflects typed characters into the slots", async () => {
    render(<BasicOTP />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "12");
    expect(input).toHaveValue("12");
  });

  it("can be disabled", () => {
    render(<BasicOTP disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });
});
