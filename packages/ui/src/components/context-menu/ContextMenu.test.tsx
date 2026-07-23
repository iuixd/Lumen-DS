import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from "./ContextMenu";
import * as PublicExports from "../../index";

beforeEach(() => {
  Element.prototype.hasPointerCapture = vi.fn();
  Element.prototype.scrollIntoView = vi.fn();
});

describe("ContextMenu", () => {
  it("is exported from @lumen/ui's public entry point", () => {
    expect(PublicExports.ContextMenu).toBe(ContextMenu);
    expect(PublicExports.ContextMenuTrigger).toBeDefined();
    expect(PublicExports.ContextMenuContent).toBeDefined();
    expect(PublicExports.ContextMenuItem).toBeDefined();
  });

  it("is closed until the trigger receives a context-menu (right-click) event", async () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right-click area</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Back</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
    expect(screen.queryByText("Back")).not.toBeInTheDocument();

    await userEvent.pointer({
      keys: "[MouseRight]",
      target: screen.getByText("Right-click area")
    });
    expect(screen.getByText("Back")).toBeInTheDocument();
  });

  it("calls onSelect for a chosen item", async () => {
    const onSelect = vi.fn();
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right-click area</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onSelect={onSelect}>Back</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
    await userEvent.pointer({
      keys: "[MouseRight]",
      target: screen.getByText("Right-click area")
    });
    await userEvent.click(screen.getByText("Back"));
    expect(onSelect).toHaveBeenCalled();
  });
});
