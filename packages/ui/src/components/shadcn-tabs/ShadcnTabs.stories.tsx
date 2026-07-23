import type { Meta, StoryObj } from "@storybook/react";
import { ShadcnTabs, ShadcnTabsContent, ShadcnTabsList, ShadcnTabsTrigger } from "./ShadcnTabs";

const meta = {
  title: "Composite/ShadcnTabs",
  component: ShadcnTabs,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "shadcn/ui's own Tabs (Radix Tabs), sourced and adapted to Lumen's token system — see docs/shadcn-integration.md. `Shadcn`-prefixed because Lumen's own `Tabs` already fills this role; prefer `Tabs` for direct product use. Dark mode follows the global `data-theme` toolbar toggle, not a separate story."
      }
    }
  },
  args: { defaultValue: "account" }
} satisfies Meta<typeof ShadcnTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <ShadcnTabs {...args} className="w-[360px]">
      <ShadcnTabsList>
        <ShadcnTabsTrigger value="account">Account</ShadcnTabsTrigger>
        <ShadcnTabsTrigger value="password">Password</ShadcnTabsTrigger>
        <ShadcnTabsTrigger value="disabled" disabled>
          Disabled
        </ShadcnTabsTrigger>
      </ShadcnTabsList>
      <ShadcnTabsContent value="account">
        <p className="text-body-sm">Account settings go here.</p>
      </ShadcnTabsContent>
      <ShadcnTabsContent value="password">
        <p className="text-body-sm">Password settings go here.</p>
      </ShadcnTabsContent>
    </ShadcnTabs>
  )
};
