import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta = {
  title: "Primitives/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Multi-line text field, sourced from shadcn/ui and adapted to Lumen's token system — see docs/shadcn-integration.md. Dark mode follows the global `data-theme` toolbar toggle, not a separate story."
      }
    }
  },
  args: { placeholder: "Type your message here." }
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Textarea {...args} className="w-[320px]" />
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => <Textarea {...args} className="w-[320px]" />
};

export const WithValue: Story = {
  args: { defaultValue: "This is some pre-filled content in the textarea." },
  render: (args) => <Textarea {...args} className="w-[320px]" />
};

export const SmallViewport: Story = {
  render: (args) => (
    <div style={{ width: 200 }}>
      <Textarea {...args} className="w-full" />
    </div>
  )
};
