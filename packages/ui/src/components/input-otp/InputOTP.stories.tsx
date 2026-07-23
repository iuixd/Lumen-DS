import type { Meta, StoryObj } from "@storybook/react";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "./InputOTP";

// InputOTP's underlying type (from the `input-otp` library) is a
// discriminated union between a "render-prop" mode and a "children" mode —
// Storybook's `args`-spreading pattern doesn't play well with that, so
// every story below hardcodes its props directly instead of going through
// `meta.args`/`render(args)`.
const meta = {
  title: "Primitives/InputOTP",
  component: InputOTP,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "One-time-password / verification-code input, sourced from shadcn/ui (the `input-otp` library) and adapted to Lumen's token system — see docs/shadcn-integration.md. Dark mode follows the global `data-theme` toolbar toggle, not a separate story."
      }
    },
    controls: { disable: true }
  },
  // InputOTP's props are a discriminated union (render-prop mode vs.
  // children mode) — every story below drives its own props via `render`,
  // so this is only a placeholder to satisfy the required-args type (same
  // pattern as Accordion.stories.tsx).
  args: { maxLength: 4, render: () => null }
} satisfies Meta<typeof InputOTP>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
};

export const Disabled: Story = {
  render: () => (
    <InputOTP maxLength={4} disabled>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
  )
};

export const WithValue: Story = {
  render: () => (
    <InputOTP maxLength={4} defaultValue="123">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
  )
};
