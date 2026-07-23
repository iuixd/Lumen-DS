import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./Dialog";
import * as PublicExports from "../../index";

describe("Dialog", () => {
  it("is exported from @lumen/ui's public entry point", () => {
    expect(PublicExports.Dialog).toBe(Dialog);
    expect(PublicExports.DialogTrigger).toBeDefined();
    expect(PublicExports.DialogContent).toBeDefined();
    expect(PublicExports.DialogHeader).toBeDefined();
    expect(PublicExports.DialogFooter).toBeDefined();
    expect(PublicExports.DialogTitle).toBeDefined();
    expect(PublicExports.DialogDescription).toBeDefined();
  });

  it("renders nothing when closed, and its content when open", () => {
    const { rerender } = render(
      <Dialog open={false}>
        <DialogContent>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogContent>
      </Dialog>
    );
    expect(screen.queryByText("Edit profile")).not.toBeInTheDocument();

    rerender(
      <Dialog open>
        <DialogContent>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogContent>
      </Dialog>
    );
    expect(screen.getByText("Edit profile")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("opens on trigger click", async () => {
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes here.</DialogDescription>
        </DialogContent>
      </Dialog>
    );
    await userEvent.click(screen.getByText("Open"));
    expect(screen.getByText("Edit profile")).toBeInTheDocument();
  });

  it("calls onOpenChange(false) on Escape", async () => {
    const onOpenChange = vi.fn();
    render(
      <Dialog open onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogContent>
      </Dialog>
    );
    await userEvent.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
