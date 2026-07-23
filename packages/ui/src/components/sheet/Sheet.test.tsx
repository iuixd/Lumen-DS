import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./Sheet";
import * as PublicExports from "../../index";

describe("Sheet", () => {
  it("is exported from @lumen/ui's public entry point", () => {
    expect(PublicExports.Sheet).toBe(Sheet);
    expect(PublicExports.SheetTrigger).toBeDefined();
    expect(PublicExports.SheetContent).toBeDefined();
    expect(PublicExports.SheetHeader).toBeDefined();
    expect(PublicExports.SheetFooter).toBeDefined();
    expect(PublicExports.SheetTitle).toBeDefined();
    expect(PublicExports.SheetDescription).toBeDefined();
  });

  it("renders nothing when closed, and its content when open", () => {
    const { rerender } = render(
      <Sheet open={false}>
        <SheetContent>
          <SheetTitle>Edit profile</SheetTitle>
        </SheetContent>
      </Sheet>
    );
    expect(screen.queryByText("Edit profile")).not.toBeInTheDocument();

    rerender(
      <Sheet open>
        <SheetContent>
          <SheetTitle>Edit profile</SheetTitle>
        </SheetContent>
      </Sheet>
    );
    expect(screen.getByText("Edit profile")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("opens on trigger click", async () => {
    render(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>Make changes here.</SheetDescription>
        </SheetContent>
      </Sheet>
    );
    await userEvent.click(screen.getByText("Open"));
    expect(screen.getByText("Edit profile")).toBeInTheDocument();
  });

  it("calls onOpenChange(false) on Escape and on close-button click", async () => {
    const onOpenChange = vi.fn();
    render(
      <Sheet open onOpenChange={onOpenChange}>
        <SheetContent>
          <SheetTitle>Edit profile</SheetTitle>
        </SheetContent>
      </Sheet>
    );
    await userEvent.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false);

    onOpenChange.mockClear();
    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("defaults to the right side", () => {
    render(
      <Sheet open>
        <SheetContent data-testid="sheet-content">
          <SheetTitle>Edit profile</SheetTitle>
        </SheetContent>
      </Sheet>
    );
    expect(screen.getByTestId("sheet-content").className).toContain("right-0");
  });
});
