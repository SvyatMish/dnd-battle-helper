import * as React from "react";
import { IconButton, type ButtonProps } from "@mui/material";
import { useForm } from "react-hook-form";
import { useCallback } from "react";

import { Input } from "./ui/fields.tsx";
type FormValues = {
  number: string;
};

export const NumberForm: React.FC<{
  onSubmit(v: number): void;
  icon: React.ReactNode;
  color?: ButtonProps["color"];
  label: string;
}> = ({ color, onSubmit, icon, label }) => {
  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: { number: "" },
  });

  const submitFn = useCallback(
    (v: FormValues) => {
      const value = Number(v.number);
      if (Number.isNaN(value)) {
        onSubmit(0);
      } else {
        onSubmit(value);
      }
      reset();
    },
    [reset],
  );

  return (
    <form
      onSubmit={handleSubmit(submitFn)}
      className="grid grid-cols-[150px_40px] gap-2 items-center"
    >
      <Input
        size="small"
        type="number"
        name="number"
        control={control}
        label={label}
        autoFocus={true}
      />
      <IconButton color={color} size="small" type="submit">
        {icon}
      </IconButton>
    </form>
  );
};
