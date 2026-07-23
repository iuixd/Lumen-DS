import type { Meta, StoryObj } from "@storybook/react";
import { ShadcnButton } from "./ShadcnButton";

const meta = {
  title: "Primitives/ShadcnButton",
  component: ShadcnButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "shadcn/ui's own Button, sourced and adapted to Lumen's token system — see docs/shadcn-integration.md. `Shadcn`-prefixed because Lumen's own `Button` already fills this role; prefer `Button` for direct product use. Dark mode follows the global `data-theme` toolbar toggle, not a separate story."
      }
    }
  },
  args: { children: "Button" }
} satisfies Meta<typeof ShadcnButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <ShadcnButton variant="default">Default</ShadcnButton>
      <ShadcnButton variant="secondary">Secondary</ShadcnButton>
      <ShadcnButton variant="outline">Outline</ShadcnButton>
      <ShadcnButton variant="ghost">Ghost</ShadcnButton>
      <ShadcnButton variant="link">Link</ShadcnButton>
      <ShadcnButton variant="destructive">Destructive</ShadcnButton>
    </div>
  )
};

export const Disabled: Story = {
  args: { disabled: true }
};
