import type { Meta, StoryObj } from "@storybook/react";
import { ShadcnSwitch } from "./ShadcnSwitch";

const meta = {
  title: "Primitives/ShadcnSwitch",
  component: ShadcnSwitch,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "shadcn/ui's own Switch (Radix Switch), sourced and adapted to Lumen's token system — see docs/shadcn-integration.md. `Shadcn`-prefixed because Lumen's own `Switch` already fills this role; prefer `Switch` for direct product use. Dark mode follows the global `data-theme` toolbar toggle, not a separate story."
      }
    }
  }
} satisfies Meta<typeof ShadcnSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ShadcnSwitch aria-label="Toggle setting" />
};

export const CheckedByDefault: Story = {
  render: () => <ShadcnSwitch aria-label="Toggle setting" defaultChecked />
};

export const Disabled: Story = {
  render: () => <ShadcnSwitch aria-label="Toggle setting" disabled />
};
