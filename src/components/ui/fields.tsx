import { TextField, Checkbox, FormControlLabel } from "@mui/material";
import {
  Controller,
  type UseControllerProps,
  type FieldValues,
} from "react-hook-form";

interface GenericTextfieldProps<
  T extends FieldValues,
> extends UseControllerProps<T> {
  label: string;
  disabled?: boolean;
  size?: "small" | "medium";
  type?: "text" | "number";
  autoFocus?: boolean;
}

export function Input<T extends FieldValues>({
  name,
  control,
  label,
  disabled = false,
  size = "medium",
  type,
  autoFocus,
}: GenericTextfieldProps<T>) {
  return (
    <Controller
      render={({ field }) => (
        <TextField
          {...field}
          id={name}
          label={label}
          fullWidth
          disabled={disabled}
          variant="outlined"
          size={size}
          type={type}
          autoFocus={autoFocus}
        />
      )}
      name={name}
      control={control}
    />
  );
}

interface GenericTextareaProps<
  T extends FieldValues,
> extends UseControllerProps<T> {
  label?: string;
  disabled?: boolean;
  size?: "small" | "medium";
  autoFocus?: boolean;
  minRows?: number;
  maxRows?: number;
  placeholder?: string;
}

export function TextareaInput<T extends FieldValues>({
  name,
  control,
  label,
  disabled = false,
  size = "medium",
  autoFocus,
  minRows = 3,
  maxRows,
  placeholder,
}: GenericTextareaProps<T>) {
  return (
    <Controller
      render={({ field }) => (
        <TextField
          {...field}
          id={name}
          label={label}
          placeholder={placeholder}
          fullWidth
          disabled={disabled}
          variant="outlined"
          size={size}
          autoFocus={autoFocus}
          multiline
          minRows={minRows}
          maxRows={maxRows}
        />
      )}
      name={name}
      control={control}
    />
  );
}

interface GenericCheckboxProps<
  T extends FieldValues,
> extends UseControllerProps<T> {
  disabled?: boolean;
  size?: "small" | "medium";
  label: string;
}

export function CheckboxInput<T extends FieldValues>({
  name,
  control,
  disabled = false,
  size = "medium",
  label,
}: GenericCheckboxProps<T>) {
  return (
    <Controller
      render={({ field }) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={field.value}
              {...field}
              id={name}
              disabled={disabled}
              size={size}
            />
          }
          label={label}
        />
      )}
      name={name}
      control={control}
    />
  );
}
