import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./Label";

const meta = {
  title: "Primitives/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Accessible label for a form control, sourced from shadcn/ui (Radix Label) and adapted to Lumen's token system — see docs/shadcn-integration.md. Dark mode follows the global `data-theme` toolbar toggle, not a separate story."
      }
    }
  }
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Label htmlFor="email">Email address</Label>
};

export const WithInput: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="email-2">Email address</Label>
      <input
        id="email-2"
        type="email"
        className="h-9 rounded-md border border-[var(--color-border-input)] bg-transparent px-3 text-input-md"
        placeholder="you@example.com"
      />
    </div>
  )
};

export const DisabledPeer: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <input id="disabled-field" type="checkbox" disabled className="peer" />
      <Label htmlFor="disabled-field">Disabled option</Label>
    </div>
  )
};
