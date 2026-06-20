import { type ChangeEvent } from "react";
import { useDebounceFn } from "@reactuses/core";
// import { useSearchBestiary } from "../queries/use-search-bestiary.ts";
import { fetchMonsters } from "../queries/use-search-bestiary.ts";

export const BestiarySearch: React.FC = () => {
  // const searchQuery = useSearchBestiary();
  const { run } = useDebounceFn(
    async (v: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
      // const value = v.target.value || "";
      console.log(v.target.value);
      const result = await fetchMonsters();
      console.log(result);
    },
    500,
  );

  return <input onChange={run} placeholder="Имя" type="text" />;
};
