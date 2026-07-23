import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, RadioGroupItem } from "./RadioGroup";
import { Label } from "../label/Label";

const meta = {
  title: "Composite/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "shadcn/ui's own RadioGroup (Radix RadioGroup), sourced and adapted to Lumen's token system — see docs/shadcn-integration.md. Keeps its own plain name — no collision with Lumen's own `Radio`. Dark mode follows the global `data-theme` toolbar toggle, not a separate story."
      }
    }
  },
  args: { defaultValue: "comfortable" }
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="compact" id="r3" disabled />
        <Label htmlFor="r3">Compact (disabled)</Label>
      </div>
    </RadioGroup>
  )
};
