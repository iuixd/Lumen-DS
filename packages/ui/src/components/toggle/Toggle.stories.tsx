import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "./Toggle";
import { BoldIcon } from "../../icons/generated/BoldIcon";

const meta = {
  title: "Primitives/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Two-state pressed/unpressed button, sourced from shadcn/ui (Radix Toggle) and adapted to Lumen's token system — see docs/shadcn-integration.md. Dark mode follows the global `data-theme` toolbar toggle, not a separate story."
      }
    }
  }
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Toggle aria-label="Toggle bold">
      <BoldIcon className="h-4 w-4" />
    </Toggle>
  )
};

export const PressedByDefault: Story = {
  render: () => (
    <Toggle aria-label="Toggle bold" defaultPressed>
      <BoldIcon className="h-4 w-4" />
    </Toggle>
  )
};

export const Outline: Story = {
  render: () => (
    <Toggle aria-label="Toggle bold" variant="outline">
      <BoldIcon className="h-4 w-4" />
    </Toggle>
  )
};

export const Disabled: Story = {
  render: () => (
    <Toggle aria-label="Toggle bold" disabled>
      <BoldIcon className="h-4 w-4" />
    </Toggle>
  )
};

export const WithText: Story = {
  render: () => (
    <Toggle aria-label="Toggle bold">
      <BoldIcon className="h-4 w-4" />
      Bold
    </Toggle>
  )
};
