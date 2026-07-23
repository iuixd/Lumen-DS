import type { Meta, StoryObj } from "@storybook/react";
import { ShadcnAvatar, ShadcnAvatarFallback, ShadcnAvatarImage } from "./ShadcnAvatar";

const meta = {
  title: "Primitives/ShadcnAvatar",
  component: ShadcnAvatar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "shadcn/ui's own Avatar (Radix Avatar), sourced and adapted to Lumen's token system — see docs/shadcn-integration.md. `Shadcn`-prefixed because Lumen's own `Avatar` already fills this role; prefer `Avatar` for direct product use. Dark mode follows the global `data-theme` toolbar toggle, not a separate story."
      }
    }
  }
} satisfies Meta<typeof ShadcnAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  render: () => (
    <ShadcnAvatar>
      <ShadcnAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <ShadcnAvatarFallback>SC</ShadcnAvatarFallback>
    </ShadcnAvatar>
  )
};

export const FallbackOnly: Story = {
  render: () => (
    <ShadcnAvatar>
      <ShadcnAvatarImage src="https://broken-image-url.invalid/none.png" alt="" />
      <ShadcnAvatarFallback>LU</ShadcnAvatarFallback>
    </ShadcnAvatar>
  )
};
