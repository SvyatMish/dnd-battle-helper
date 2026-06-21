import type { Monster } from "../types/bestiary.ts";

export const monsterToDtoNoId = (
  monster: Omit<Monster, "id">,
): Required<Omit<Monster, "id">> => {
  return {
    name: monster.name.trim() || "",
    ac: monster.ac || 0,
    hp: monster.hp || 0,
    initiative: monster.initiative || 0,
    isSecret: Boolean(monster.isSecret),
  };
};

export const monsterToDto = (monster: Monster): Required<Monster> => {
  if (!monster.id) {
    throw new Error("Missing Monster ID");
  }
  return {
    ...monsterToDtoNoId(monster),
    id: monster.id,
  };
};
