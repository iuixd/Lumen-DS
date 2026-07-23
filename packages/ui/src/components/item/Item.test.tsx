import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Item, ItemContent, ItemDescription, ItemGroup, ItemSeparator, ItemTitle } from "./Item";
import * as PublicExports from "../../index";

describe("Item", () => {
  it("is exported from @lumen/ui's public entry point", () => {
    expect(PublicExports.Item).toBe(Item);
    expect(PublicExports.ItemGroup).toBeDefined();
    expect(PublicExports.ItemSeparator).toBeDefined();
    expect(PublicExports.ItemMedia).toBeDefined();
    expect(PublicExports.ItemContent).toBeDefined();
    expect(PublicExports.ItemTitle).toBeDefined();
    expect(PublicExports.ItemDescription).toBeDefined();
    expect(PublicExports.ItemActions).toBeDefined();
    expect(PublicExports.ItemHeader).toBeDefined();
    expect(PublicExports.ItemFooter).toBeDefined();
  });

  it("renders its title and description", () => {
    render(
      <Item>
        <ItemContent>
          <ItemTitle>Notification settings</ItemTitle>
          <ItemDescription>Manage how you receive notifications.</ItemDescription>
        </ItemContent>
      </Item>
    );
    expect(screen.getByText("Notification settings")).toBeInTheDocument();
    expect(screen.getByText("Manage how you receive notifications.")).toBeInTheDocument();
  });

  it("reflects variant and size via data attributes", () => {
    render(<Item data-testid="item" variant="outline" size="sm" />);
    const item = screen.getByTestId("item");
    expect(item).toHaveAttribute("data-variant", "outline");
    expect(item).toHaveAttribute("data-size", "sm");
  });

  it("groups items with separators as a list", () => {
    render(
      <ItemGroup>
        <Item>
          <ItemContent>
            <ItemTitle>First</ItemTitle>
          </ItemContent>
        </Item>
        <ItemSeparator />
        <Item>
          <ItemContent>
            <ItemTitle>Second</ItemTitle>
          </ItemContent>
        </Item>
      </ItemGroup>
    );
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
  });
});
