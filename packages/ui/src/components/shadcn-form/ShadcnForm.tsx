import {
  Form as InternalForm,
  FormControl as InternalFormControl,
  FormDescription as InternalFormDescription,
  FormField as InternalFormField,
  FormItem as InternalFormItem,
  FormLabel as InternalFormLabel,
  FormMessage as InternalFormMessage,
  useFormField as useInternalFormField
} from "../internal/form";

/**
 * ShadcnForm, sourced from shadcn/ui's `react-hook-form` integration and
 * adapted to Lumen's token system — see packages/ui/src/components/internal/form.tsx
 * for the adaptation notes. Exported under a `Shadcn`-prefixed name
 * because it directly overlaps in purpose (and, for `FormField`, in name)
 * with Lumen's existing hand-built `FormField` composite — this is a
 * distinct, react-hook-form-based system, not a replacement for it.
 *
 * Kept as a plain re-export (not wrapped in a non-generic function
 * component, unlike every other component in this integration): `Form` is
 * `react-hook-form`'s own generic `FormProvider`, and wrapping it in a
 * fixed-signature function erases that generic, breaking type inference
 * for any caller passing a concretely-typed `useForm<TSchema>()` result.
 *
 * This public module is the only supported import path; the internal
 * implementation may change without notice.
 */
export const ShadcnForm = InternalForm;
export const ShadcnFormField = InternalFormField;
export const ShadcnFormItem = InternalFormItem;
export const ShadcnFormLabel = InternalFormLabel;
export const ShadcnFormControl = InternalFormControl;
export const ShadcnFormDescription = InternalFormDescription;
export const ShadcnFormMessage = InternalFormMessage;
export const useShadcnFormField = useInternalFormField;
