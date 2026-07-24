import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Typography } from "@mui/material";

import { Input } from "./ui/fields.tsx";
import { rollDice } from "../utils/dice.ts";

type FormValues = {
  count: number;
  sides: number;
};

export const DiceRollerForm: React.FC = () => {
  const [result, setResult] = useState<number | null>(null);
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      count: 1,
      sides: 20,
    },
  });

  const onSubmit = useCallback((values: FormValues) => {
    const count = Number(values.count) || 1;
    const sides = Number(values.sides) || 20;
    setResult(rollDice({ count, sides }));
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <Input
          size="small"
          type="number"
          name="count"
          control={control}
          label="Кол-во"
        />
        <Input
          size="small"
          type="number"
          name="sides"
          control={control}
          label="Грани"
        />
      </div>
      <Button fullWidth size="small" variant="outlined" type="submit">
        Бросить
      </Button>
      {result !== null && (
        <Typography variant="body2" align="center">
          Результат: {result}
        </Typography>
      )}
    </form>
  );
};
