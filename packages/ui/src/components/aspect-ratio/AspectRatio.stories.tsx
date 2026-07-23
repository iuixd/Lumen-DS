import type { Meta, StoryObj } from "@storybook/react";
import { AspectRatio } from "./AspectRatio";

const meta = {
  title: "Primitives/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Constrains content to a fixed width/height ratio, sourced from shadcn/ui (Radix AspectRatio) — see docs/shadcn-integration.md. Purely structural: no colors, radius, or typography of its own to adapt."
      }
    }
  },
  args: { ratio: 16 / 9 }
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Widescreen: Story = {
  render: (args) => (
    <div className="w-[400px]">
      <AspectRatio {...args} className="overflow-hidden rounded-lg bg-muted">
        <div className="flex h-full w-full items-center justify-center text-body-sm text-muted-foreground">
          16:9 content area
        </div>
      </AspectRatio>
    </div>
  )
};

export const Square: Story = {
  args: { ratio: 1 },
  render: (args) => (
    <div className="w-[240px]">
      <AspectRatio {...args} className="overflow-hidden rounded-lg bg-muted">
        <div className="flex h-full w-full items-center justify-center text-body-sm text-muted-foreground">
          1:1 content area
        </div>
      </AspectRatio>
    </div>
  )
};
