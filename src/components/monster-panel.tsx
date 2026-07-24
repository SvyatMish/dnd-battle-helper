import React, { useCallback } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

import { type Monster } from "../types/bestiary.ts";
import { Input, CheckboxInput, TextareaInput } from "./ui/fields.tsx";
import { useDeleteMonster, useUpdateMonster } from "../queries/bestiary.ts";

type FormValues = Monster;

export const MonsterPanel: React.FC<{
  monster: Monster;
  currentMonsters: Monster[];
}> = ({ monster, currentMonsters }) => {
  const deleteMutation = useDeleteMonster();
  const updateMutation = useUpdateMonster();

  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      ...monster,
    },
  });

  const handleDelete = useCallback(async (id: string) => {
    await deleteMutation.mutateAsync(id);
  }, []);

  const onSubmit = useCallback(
    async (values: FormValues) => {
      const name = values.name?.trim();
      if (!name) {
        alert("Введи имя");
        return;
      }
      if (
        currentMonsters.some(
          (item) => item.name === name && item.id !== monster.id,
        )
      ) {
        alert("Такое имя уже есть");
        return;
      }
      await updateMutation.mutateAsync(values);
    },
    [reset, currentMonsters],
  );

  const onDelete = useCallback(async () => {
    await handleDelete(monster.id);
  }, [handleDelete, monster]);

  const isLoading = deleteMutation.isPending || updateMutation.isPending;
  return (
    <div>
      <Box sx={{ width: 275 }}>
        <Card variant="outlined">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="grid grid-cols-1 gap-4">
              <Input size="small" name="name" control={control} label="Имя" />
              <Input
                size="small"
                type="number"
                name="hp"
                control={control}
                label="Хп"
              />
              <Input
                size="small"
                type="number"
                name="ac"
                control={control}
                label="Броня"
              />
              <Input
                size="small"
                type="number"
                name="initiative"
                control={control}
                label="Бонус инициативы"
              />
              <TextareaInput
                size="small"
                name="actions"
                control={control}
                label="Действия"
              />
              <CheckboxInput
                label="Секретный"
                control={control}
                name="isSecret"
              />
            </CardContent>
            <CardActions className="flex justify-between">
              <Button
                loading={isLoading}
                onClick={onDelete}
                variant="contained"
                size="small"
                type="button"
                color="error"
              >
                Удалить
              </Button>
              <Button
                loading={isLoading}
                variant="contained"
                size="small"
                type="submit"
              >
                Сохранить
              </Button>
            </CardActions>
          </form>
        </Card>
      </Box>
    </div>
  );
};
