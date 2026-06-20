import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";

import { type Monster } from "../types/bestiary.ts";
import { Input } from "./ui/fields.tsx";
import { useAddMonster } from "../queries/bestiary.ts";

type FormValues = Omit<Monster, "id">;

export const AddMonsterForm: React.FC<{ currentMonsters: Monster[] }> = ({
  currentMonsters,
}) => {
  const addMonsterMutation = useAddMonster();
  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      name: "",
      hp: "",
      ac: "",
      initiative: "",
    },
  });

  const onsubmit = useCallback(
    async (values: FormValues) => {
      const name = values.name?.trim();
      if (!name) {
        alert("Введи имя");
        return;
      }
      if (currentMonsters.some((monster) => monster.name === name)) {
        alert("Такое имя уже есть");
        return;
      }
      await addMonsterMutation.mutateAsync(values);
      reset();
    },
    [reset, currentMonsters],
  );

  return (
    <form
      className="grid grid-cols-2 gap-2 max-w-300 mx-auto"
      onSubmit={handleSubmit(onsubmit)}
    >
      <Input name="name" control={control} label="Название" />
      <Input name="hp" control={control} label="Хп" />
      <Input name="ac" control={control} label="Броня" />
      <Input name="initiative" control={control} label="Инициатива" />
      <Button
        loading={addMonsterMutation.isPending}
        variant="contained"
        type="submit"
      >
        Создать
      </Button>
    </form>
  );
};
