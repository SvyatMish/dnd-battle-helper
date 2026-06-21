import React, { useCallback } from "react";
import Button from "@mui/material/Button";

import { type Monster } from "../types/bestiary.ts";
import { MonsterPanel } from "./monster-panel.tsx";
import { useDeleteMonster } from "../queries/bestiary.ts";

export const MonsterList: React.FC<{
  monsters: Monster[];
  isLoading: boolean;
}> = ({ monsters, isLoading }) => {
  const deleteMutation = useDeleteMonster();
  const handleDelete = useCallback(async (id: string) => {
    await deleteMutation.mutateAsync(id);
  }, []);
  if (isLoading) {
    return "Loading...";
  }

  return (
    <div className="flex space-y-2 space-x-2 flex-wrap">
      {monsters.map((item) => (
        <MonsterPanel
          key={item.id}
          monster={item}
          actions={
            <>
              <Button
                loading={deleteMutation.isPending}
                onClick={async () => {
                  await handleDelete(item.id);
                }}
                variant="contained"
                size="small"
              >
                Удалить
              </Button>
            </>
          }
        />
      ))}
    </div>
  );
};
