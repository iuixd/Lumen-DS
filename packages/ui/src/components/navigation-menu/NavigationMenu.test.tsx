import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "./NavigationMenu";
import * as PublicExports from "../../index";

beforeEach(() => {
  Element.prototype.hasPointerCapture = vi.fn();
  Element.prototype.scrollIntoView = vi.fn();
});

describe("NavigationMenu", () => {
  it("is exported from @lumen/ui's public entry point", () => {
    expect(PublicExports.NavigationMenu).toBe(NavigationMenu);
    expect(PublicExports.NavigationMenuList).toBeDefined();
    expect(PublicExports.NavigationMenuItem).toBeDefined();
    expect(PublicExports.NavigationMenuTrigger).toBeDefined();
    expect(PublicExports.NavigationMenuContent).toBeDefined();
    expect(PublicExports.NavigationMenuLink).toBeDefined();
  });

  it("renders top-level triggers and links", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="#">Design tokens</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
    expect(screen.getByText("Products")).toBeInTheDocument();
  });

  it("opens its content panel on trigger click", async () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="#">Design tokens</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
    expect(screen.queryByText("Design tokens")).not.toBeInTheDocument();

    await userEvent.click(screen.getByText("Products"));
    expect(await screen.findByText("Design tokens")).toBeInTheDocument();
  });
});
