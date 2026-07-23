import type { ComponentProps } from "react";

import {
  Command as InternalCommand,
  CommandDialog as InternalCommandDialog,
  CommandEmpty as InternalCommandEmpty,
  CommandGroup as InternalCommandGroup,
  CommandInput as InternalCommandInput,
  CommandItem as InternalCommandItem,
  CommandList as InternalCommandList,
  CommandSeparator as InternalCommandSeparator,
  CommandShortcut as InternalCommandShortcut
} from "../internal/command";

/**
 * Command palette, sourced from shadcn/ui (cmdk + Radix Dialog) and adapted
 * to Lumen's token system — see packages/ui/src/components/internal/command.tsx
 * for the adaptation notes. This public module is the only supported import
 * path; the internal implementation may change without notice.
 */
export type CommandProps = ComponentProps<typeof InternalCommand>;
export function Command(props: CommandProps) {
  return <InternalCommand {...props} />;
}

export type CommandDialogProps = ComponentProps<typeof InternalCommandDialog>;
export function CommandDialog(props: CommandDialogProps) {
  return <InternalCommandDialog {...props} />;
}

export const CommandInput = InternalCommandInput;
export const CommandList = InternalCommandList;
export const CommandEmpty = InternalCommandEmpty;
export const CommandGroup = InternalCommandGroup;
export const CommandItem = InternalCommandItem;
export const CommandSeparator = InternalCommandSeparator;
export const CommandShortcut = InternalCommandShortcut;
