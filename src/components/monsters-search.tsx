import React, { useCallback, useMemo } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import type { Monster } from "../types/bestiary.ts";

export const MonstersSearch: React.FC<{
  allMonsters: Monster[];
  onPickMonster(v: Monster): void;
}> = ({ allMonsters, onPickMonster }) => {
  const [value, setValue] = React.useState("");

  const [inputValue, setInputValue] = React.useState("");

  const handleChange = useCallback((_: any, newValue: string) => {
    setInputValue(newValue);
  }, []);

  const monsterNames = useMemo(() => {
    return allMonsters.map((monster: Monster) => monster.name);
  }, [allMonsters]);

  const monsterOptions = useMemo(() => {
    const trimmedValue = inputValue.trim().toLowerCase();
    if (!trimmedValue) {
      return monsterNames;
    }
    return monsterNames.filter((item) =>
      item.toLowerCase().includes(trimmedValue),
    );
  }, [monsterNames, inputValue]);

  const handlePick = useCallback(
    (_: any, newValue: string | null) => {
      const monster = allMonsters.find((item) => item.name === newValue);
      if (monster) {
        onPickMonster(monster);
      }
      setInputValue("");
      setValue("");
    },
    [allMonsters, onPickMonster],
  );

  return (
    <Autocomplete
      value={value}
      onChange={handlePick}
      inputValue={inputValue}
      onInputChange={handleChange}
      id="monsters-search"
      options={monsterOptions}
      renderInput={(params) => <TextField {...params} label="Поиск" />}
    />
  );
};
