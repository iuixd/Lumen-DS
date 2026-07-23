import type { Meta, StoryObj } from "@storybook/react";
import { Kbd, KbdGroup } from "./Kbd";

const meta = {
  title: "Primitives/Kbd",
  component: Kbd,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Keyboard-key visual, sourced from shadcn/ui and adapted to Lumen's token system — see docs/shadcn-integration.md. Dark mode follows the global `data-theme` toolbar toggle, not a separate story."
      }
    }
  }
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Kbd>Esc</Kbd>
};

export const Group: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>Ctrl</Kbd>
      <span className="text-body-sm">+</span>
      <Kbd>K</Kbd>
    </KbdGroup>
  )
};

export const InSentence: Story = {
  render: () => (
    <p className="text-body-sm">
      Press <Kbd>⌘</Kbd>
      <Kbd>K</Kbd> to open the command palette.
    </p>
  )
};
