import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./Slider";

const meta = {
  title: "Primitives/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Range input control, sourced from shadcn/ui (Radix Slider) and adapted to Lumen's token system — see docs/shadcn-integration.md. Dark mode follows the global `data-theme` toolbar toggle, not a separate story."
      }
    }
  },
  args: { defaultValue: [50], max: 100, step: 1 }
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Slider {...args} className="w-[300px]" />
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => <Slider {...args} className="w-[300px]" />
};

export const Range: Story = {
  args: { defaultValue: [25, 75] },
  render: (args) => <Slider {...args} className="w-[300px]" />
};

export const SmallViewport: Story = {
  render: (args) => (
    <div style={{ width: 160 }}>
      <Slider {...args} className="w-full" />
    </div>
  )
};
