import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "./Command";
import * as PublicExports from "../../index";

beforeEach(() => {
  // cmdk scrolls the highlighted item into view on selection change — jsdom
  // has no layout engine and doesn't implement scrollIntoView.
  Element.prototype.scrollIntoView = vi.fn();
});

function BasicCommand({ onSelect }: { onSelect?: (value: string) => void }) {
  return (
    <Command>
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem onSelect={onSelect}>First item</CommandItem>
          <CommandItem onSelect={onSelect}>Second item</CommandItem>
          <CommandItem disabled onSelect={onSelect}>
            Disabled item
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

describe("Command", () => {
  it("is exported from @lumen/ui's public entry point", () => {
    expect(PublicExports.Command).toBe(Command);
    expect(PublicExports.CommandInput).toBeDefined();
    expect(PublicExports.CommandList).toBeDefined();
    expect(PublicExports.CommandItem).toBeDefined();
    expect(PublicExports.CommandGroup).toBeDefined();
    expect(PublicExports.CommandEmpty).toBeDefined();
    expect(PublicExports.CommandSeparator).toBeDefined();
    expect(PublicExports.CommandShortcut).toBeDefined();
    expect(PublicExports.CommandDialog).toBeDefined();
  });

  it("renders its items and search input", () => {
    render(<BasicCommand />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    expect(screen.getByText("First item")).toBeInTheDocument();
    expect(screen.getByText("Second item")).toBeInTheDocument();
  });

  it("filters items via the search input and shows the empty state when nothing matches", async () => {
    render(<BasicCommand />);
    const input = screen.getByPlaceholderText("Search...");
    await userEvent.type(input, "nonexistent query");
    expect(screen.getByText("No results found.")).toBeInTheDocument();
    expect(screen.queryByText("First item")).not.toBeInTheDocument();
  });

  it("highlights the first selectable item by default, not the disabled one", () => {
    render(<BasicCommand />);
    const first = screen.getByText("First item").closest('[cmdk-item=""]');
    const disabled = screen.getByText("Disabled item").closest('[cmdk-item=""]');
    expect(first).toHaveAttribute("aria-selected", "true");
    expect(disabled).toHaveAttribute("data-disabled", "true");
  });

  it("moves the highlighted item on ArrowDown", async () => {
    render(<BasicCommand />);
    const input = screen.getByPlaceholderText("Search...");
    input.focus();
    await userEvent.keyboard("{ArrowDown}");
    const second = screen.getByText("Second item").closest('[cmdk-item=""]');
    expect(second).toHaveAttribute("aria-selected", "true");
  });

  it("calls onSelect when an item is chosen, and not for a disabled item", async () => {
    const onSelect = vi.fn();
    render(<BasicCommand onSelect={onSelect} />);
    await userEvent.click(screen.getByText("First item"));
    expect(onSelect).toHaveBeenCalledWith("First item");

    onSelect.mockClear();
    await userEvent.click(screen.getByText("Disabled item"));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("renders nothing when CommandDialog is closed, and its content when open", () => {
    const { rerender } = render(
      <CommandDialog open={false} onOpenChange={vi.fn()}>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandItem>Only item</CommandItem>
        </CommandList>
      </CommandDialog>
    );
    expect(screen.queryByText("Only item")).not.toBeInTheDocument();

    rerender(
      <CommandDialog open onOpenChange={vi.fn()}>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandItem>Only item</CommandItem>
        </CommandList>
      </CommandDialog>
    );
    expect(screen.getByText("Only item")).toBeInTheDocument();
  });

  it("closes CommandDialog on Escape", async () => {
    const onOpenChange = vi.fn();
    render(
      <CommandDialog open onOpenChange={onOpenChange}>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandItem>Only item</CommandItem>
        </CommandList>
      </CommandDialog>
    );
    await userEvent.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("groups render their heading text", () => {
    render(<BasicCommand />);
    const group = screen.getByText("First item").closest('[cmdk-group=""]');
    expect(group).not.toBeNull();
    expect(within(group as HTMLElement).getByText("Suggestions")).toBeInTheDocument();
  });
});
