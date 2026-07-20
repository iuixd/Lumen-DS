import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const meta = {
  title: "Primitives/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Falls back to initials-on-brand when no image is provided or the image fails to load."
      }
    }
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    tone: { control: "select", options: ["brand", "neutral"] }
  },
  args: { name: "Jane Cooper", size: "md", tone: "brand" }
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithImage: Story = {
  args: { src: "https://i.pravatar.cc/64", name: "Jane Cooper" }
};

export const InitialsFallback: Story = {
  args: { name: "Amara Okafor" }
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar name="Jane Cooper" size="sm" />
      <Avatar name="Jane Cooper" size="md" />
      <Avatar name="Jane Cooper" size="lg" />
    </div>
  )
};

/** `neutral` is sourced from the app-shell Header's account avatar (Lumen-AI-Design-System, node 1197:1652, `AvatarInitials` instance `I1102:6515;1079:1889`) — a solid muted-gray circle, used where the avatar sits on brand-colored or busy chrome rather than a plain surface. */
export const Tones: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar name="Jane Cooper" tone="brand" />
      <Avatar name="Jane Cooper" tone="neutral" />
    </div>
  )
};
