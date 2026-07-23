import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./Progress";

const meta = {
  title: "Primitives/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Determinate progress bar, sourced from shadcn/ui (Radix Progress) and adapted to Lumen's token system — see docs/shadcn-integration.md. Dark mode follows the global `data-theme` toolbar toggle, not a separate story."
      }
    }
  },
  args: { value: 40 }
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Progress {...args} className="w-[300px]" />
};

export const Empty: Story = {
  args: { value: 0 },
  render: (args) => <Progress {...args} className="w-[300px]" />
};

export const Complete: Story = {
  args: { value: 100 },
  render: (args) => <Progress {...args} className="w-[300px]" />
};

export const SmallViewport: Story = {
  render: (args) => (
    <div style={{ width: 160 }}>
      <Progress {...args} className="w-full" />
    </div>
  )
};
