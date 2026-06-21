import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { type Monster } from "../types/bestiary.ts";
import { firebaseDb } from "../api/firebase.ts";
import { useAppContext } from "../context.ts";

export const MONSTERS_QUERY_KEY = "monsters";
const monstersCollectionPath = "monsters";

export const useGetBestiary = () => {
  const appContext = useAppContext();
  return useQuery({
    queryKey: [MONSTERS_QUERY_KEY, appContext.showHidden],
    queryFn: async () => {
      const snapshot = await getDocs(
        collection(firebaseDb, monstersCollectionPath),
      );
      let monsters = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as Monster,
      );
      if (!appContext.showHidden) {
        monsters = monsters.filter((item) => !item.isSecret);
      }
      return monsters;
    },
  });
};

export const useAddMonster = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (monster: Omit<Monster, "id">) => {
      await addDoc(collection(firebaseDb, monstersCollectionPath), {
        name: monster.name.trim() || "",
        ac: monster.ac || 0,
        hp: monster.hp || 0,
        initiative: monster.initiative || 0,
        isSecret: Boolean(monster.isSecret),
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [MONSTERS_QUERY_KEY] });
    },
  });
};

export const useDeleteMonster = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await deleteDoc(doc(firebaseDb, monstersCollectionPath, id));
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [MONSTERS_QUERY_KEY] });
    },
  });
};
