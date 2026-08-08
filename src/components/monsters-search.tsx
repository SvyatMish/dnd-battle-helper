import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type KeyboardEvent,
} from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  Paper,
  TextField,
} from "@mui/material";
import type { Monster } from "../types/bestiary.ts";

export const MonstersSearch: React.FC<{
  allMonsters: Monster[];
  onPickMonster(v: Monster): void;
}> = ({ allMonsters, onPickMonster }) => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const filteredMonsters = useMemo(() => {
    const trimmedValue = inputValue.trim().toLowerCase();
    if (!trimmedValue) {
      return [];
    }
    return allMonsters.filter((monster) =>
      monster.name.toLowerCase().includes(trimmedValue),
    );
  }, [allMonsters, inputValue]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [inputValue]);

  const handlePick = useCallback(
    (monster: Monster) => {
      onPickMonster(monster);
    },
    [onPickMonster],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen || filteredMonsters.length === 0) return;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((current) => (current + 1) % filteredMonsters.length);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((current) =>
          current <= 0 ? filteredMonsters.length - 1 : current - 1,
        );
      } else if (event.key === "Enter" && activeIndex >= 0) {
        event.preventDefault();
        handlePick(filteredMonsters[activeIndex]);
      } else if (event.key === "Escape") {
        setIsOpen(false);
      }
    },
    [activeIndex, filteredMonsters, handlePick, isOpen],
  );

  const showResults = isOpen && Boolean(inputValue.trim());

  return (
    <div className="relative">
      <TextField
        id="monsters-search"
        label="Поиск"
        fullWidth
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />
      {showResults && (
        <Paper
          elevation={8}
          className="absolute z-20 mt-1 max-h-64 w-full overflow-y-auto"
        >
          {filteredMonsters.length > 0 && (
            <List dense disablePadding>
              {filteredMonsters.map((monster, index) => (
                <ListItemButton
                  key={monster.id}
                  selected={index === activeIndex}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => handlePick(monster)}
                >
                  <ListItemText primary={monster.name} />
                </ListItemButton>
              ))}
            </List>
          )}
        </Paper>
      )}
    </div>
  );
};
