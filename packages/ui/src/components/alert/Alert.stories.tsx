import type { Meta, StoryObj } from "@storybook/react";
import { Alert, AlertDescription, AlertTitle } from "./Alert";

const meta = {
  title: "Composite/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Inline status banner, sourced from shadcn/ui and adapted to Lumen's token system — see docs/shadcn-integration.md. Dark mode follows the global `data-theme` toolbar toggle, not a separate story."
      }
    }
  },
  args: { variant: "default" }
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Alert {...args} className="w-[360px]">
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the CLI.
      </AlertDescription>
    </Alert>
  )
};

export const Destructive: Story = {
  args: { variant: "destructive" },
  render: (args) => (
    <Alert {...args} className="w-[360px]">
      <AlertTitle>Something went wrong</AlertTitle>
      <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
    </Alert>
  )
};

export const TitleOnly: Story = {
  render: (args) => (
    <Alert {...args} className="w-[360px]">
      <AlertTitle>Saved successfully.</AlertTitle>
    </Alert>
  )
};

export const LongContent: Story = {
  render: (args) => (
    <Alert {...args} className="w-[360px]">
      <AlertTitle>Before you continue</AlertTitle>
      <AlertDescription>
        This action affects every workspace member and cannot be undone once confirmed.
        Review the affected records below before proceeding, since restoring a previous
        state requires contacting support.
      </AlertDescription>
    </Alert>
  )
};
