import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "./DropdownMenu";
import * as PublicExports from "../../index";

beforeEach(() => {
  Element.prototype.hasPointerCapture = vi.fn();
  Element.prototype.scrollIntoView = vi.fn();
});

describe("DropdownMenu", () => {
  it("is exported from @lumen/ui's public entry point", () => {
    expect(PublicExports.DropdownMenu).toBe(DropdownMenu);
    expect(PublicExports.DropdownMenuTrigger).toBeDefined();
    expect(PublicExports.DropdownMenuContent).toBeDefined();
    expect(PublicExports.DropdownMenuItem).toBeDefined();
    expect(PublicExports.DropdownMenuCheckboxItem).toBeDefined();
    expect(PublicExports.DropdownMenuRadioItem).toBeDefined();
    expect(PublicExports.DropdownMenuLabel).toBeDefined();
    expect(PublicExports.DropdownMenuSeparator).toBeDefined();
    expect(PublicExports.DropdownMenuShortcut).toBeDefined();
  });

  it("is closed by default and opens on trigger click", async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(screen.queryByText("Profile")).not.toBeInTheDocument();

    await userEvent.click(screen.getByText("Open"));
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  it("calls onSelect and closes when a menu item is chosen", async () => {
    const onSelect = vi.fn();
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={onSelect}>Profile</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    await userEvent.click(screen.getByText("Profile"));
    expect(onSelect).toHaveBeenCalled();
  });

  it("does not call onSelect for a disabled item", async () => {
    const onSelect = vi.fn();
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem disabled onSelect={onSelect}>
            Settings
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    await userEvent.click(screen.getByText("Settings"));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("closes on Escape", async () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(screen.getByText("Profile")).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByText("Profile")).not.toBeInTheDocument();
  });
});
