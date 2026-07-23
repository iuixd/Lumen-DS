import type { Meta, StoryObj } from "@storybook/react";
import { ShadcnCheckbox } from "./ShadcnCheckbox";

const meta = {
  title: "Primitives/ShadcnCheckbox",
  component: ShadcnCheckbox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "shadcn/ui's own Checkbox (Radix Checkbox), sourced and adapted to Lumen's token system — see docs/shadcn-integration.md. `Shadcn`-prefixed because Lumen's own `Checkbox` already fills this role; prefer `Checkbox` for direct product use. Dark mode follows the global `data-theme` toolbar toggle, not a separate story."
      }
    }
  }
} satisfies Meta<typeof ShadcnCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ShadcnCheckbox aria-label="Accept terms" />
};

export const CheckedByDefault: Story = {
  render: () => <ShadcnCheckbox aria-label="Accept terms" defaultChecked />
};

export const Disabled: Story = {
  render: () => <ShadcnCheckbox aria-label="Accept terms" disabled />
};
