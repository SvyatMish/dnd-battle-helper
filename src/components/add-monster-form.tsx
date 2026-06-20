import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";

import { type Monster } from "../types/bestiary.ts";
import { Input } from "./ui/fields.tsx";

type FormValues = Omit<Monster, "id">;

export const AddMonsterForm: React.FC = () => {
  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      name: "",
      hp: "",
      ac: "",
      initiative: "",
    },
  });

  const onsubmit = useCallback(
    (values: FormValues) => {
      console.log(values);
      reset();
    },
    [reset],
  );
  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <Input name="name" control={control} label="Название" />
      <Button type="submit">Создать</Button>
    </form>
  );
};
