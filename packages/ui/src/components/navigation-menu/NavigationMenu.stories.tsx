import type { Meta, StoryObj } from "@storybook/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "./NavigationMenu";

const meta = {
  title: "Composite/NavigationMenu",
  component: NavigationMenu,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Floating, dropdown-based top-navigation pattern, sourced from shadcn/ui (Radix NavigationMenu) and adapted to Lumen's token system — see docs/shadcn-integration.md. Distinct from AppShell's own fixed sidebar/rail navigation. Dark mode follows the global `data-theme` toolbar toggle, not a separate story."
      }
    }
  }
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-2 p-4">
              <li>
                <NavigationMenuLink className="block rounded-md p-2 text-body-sm hover:bg-accent" href="#">
                  Design tokens
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink className="block rounded-md p-2 text-body-sm hover:bg-accent" href="#">
                  Components
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className="inline-flex h-9 items-center rounded-md px-4 py-2 text-body-sm font-medium hover:bg-accent" href="#">
            Docs
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
};
