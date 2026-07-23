import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "./Drawer";
import * as PublicExports from "../../index";

describe("Drawer", () => {
  it("is exported from @lumen/ui's public entry point", () => {
    expect(PublicExports.Drawer).toBe(Drawer);
    expect(PublicExports.DrawerTrigger).toBeDefined();
    expect(PublicExports.DrawerContent).toBeDefined();
    expect(PublicExports.DrawerHeader).toBeDefined();
    expect(PublicExports.DrawerFooter).toBeDefined();
    expect(PublicExports.DrawerTitle).toBeDefined();
    expect(PublicExports.DrawerDescription).toBeDefined();
  });

  it("is closed by default and opens on trigger click", async () => {
    render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Edit profile</DrawerTitle>
        </DrawerContent>
      </Drawer>
    );
    expect(screen.queryByText("Edit profile")).not.toBeInTheDocument();

    await userEvent.click(screen.getByText("Open"));
    expect(screen.getByText("Edit profile")).toBeInTheDocument();
  });
});
