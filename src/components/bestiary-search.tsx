import { type ChangeEvent } from "react";
import { useDebounceFn } from "@reactuses/core";
import { useGetBestiary } from "../queries/use-get-bestiary.ts";

export const BestiarySearch: React.FC = () => {
  const searchQuery = useGetBestiary();
  const { run } = useDebounceFn(
    async (v: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
      console.log(v.target.value);
    },
    500,
  );

  return (
    <div>
      <input onChange={run} placeholder="Имя" type="text" />
      {searchQuery.isLoading && "loading..."}
      {searchQuery.data && JSON.stringify(searchQuery.data, null, 2)}
    </div>
  );
};
