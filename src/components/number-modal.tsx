import * as React from "react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useCallback } from "react";

import { Input } from "./ui/fields.tsx";
type FormValues = {
  number?: number;
};

export const NumberModal: React.FC<{
  buttonText: string;
  onSubmit(v: number): void;
  onClose: () => void;
  isOpen: boolean;
}> = ({ buttonText, onSubmit, onClose, isOpen }) => {
  const { handleSubmit, control, reset } = useForm<FormValues>({});

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, []);

  const submitFn = useCallback((v: FormValues) => {
    onSubmit(v.number || 0);
    handleClose();
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={"mt-2"}>
      <form
        onSubmit={handleSubmit(submitFn)}
        className="grid grid-cols-2 w-full gap-2"
      >
        <Input
          size="small"
          type="number"
          name="number"
          control={control}
          label="Число"
          autoFocus={true}
        />
        <Button size="small" type="submit">
          {buttonText}
        </Button>
      </form>
    </div>
  );
};
