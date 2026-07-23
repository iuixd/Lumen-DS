import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Textarea } from "./Textarea";
import * as PublicExports from "../../index";

describe("Textarea", () => {
  it("is exported from @lumen/ui's public entry point", () => {
    expect(PublicExports.Textarea).toBe(Textarea);
  });

  it("renders a textarea and accepts typed input", async () => {
    render(<Textarea placeholder="Type here" />);
    const textarea = screen.getByPlaceholderText("Type here");
    await userEvent.type(textarea, "Hello");
    expect(textarea).toHaveValue("Hello");
  });

  it("can be disabled", () => {
    render(<Textarea disabled placeholder="Type here" />);
    expect(screen.getByPlaceholderText("Type here")).toBeDisabled();
  });

  it("forwards onChange", async () => {
    const onChange = vi.fn();
    render(<Textarea placeholder="Type here" onChange={onChange} />);
    await userEvent.type(screen.getByPlaceholderText("Type here"), "a");
    expect(onChange).toHaveBeenCalled();
  });
});
