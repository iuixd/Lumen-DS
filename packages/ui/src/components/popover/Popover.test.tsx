import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import * as PublicExports from "../../index";

beforeEach(() => {
  Element.prototype.hasPointerCapture = vi.fn();
  Element.prototype.scrollIntoView = vi.fn();
});

describe("Popover", () => {
  it("is exported from @lumen/ui's public entry point", () => {
    expect(PublicExports.Popover).toBe(Popover);
    expect(PublicExports.PopoverTrigger).toBeDefined();
    expect(PublicExports.PopoverContent).toBeDefined();
    expect(PublicExports.PopoverAnchor).toBeDefined();
  });

  it("is closed by default and opens on trigger click", async () => {
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Popover body</PopoverContent>
      </Popover>
    );
    expect(screen.queryByText("Popover body")).not.toBeInTheDocument();

    await userEvent.click(screen.getByText("Open"));
    expect(screen.getByText("Popover body")).toBeInTheDocument();
  });

  it("closes on Escape", async () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Popover body</PopoverContent>
      </Popover>
    );
    expect(screen.getByText("Popover body")).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByText("Popover body")).not.toBeInTheDocument();
  });
});
