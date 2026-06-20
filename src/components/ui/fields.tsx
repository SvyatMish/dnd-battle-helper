import { TextField } from "@mui/material";
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
}

export function Input<T extends FieldValues>({
  name,
  control,
  label,
  disabled = false,
  size = "medium",
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
        />
      )}
      name={name}
      control={control}
    />
  );
}
