import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import { type Monster } from "../types/bestiary.ts";
import { firebaseDb } from "../api/firebase.ts";
import { useAppContext } from "../context.ts";
import { monsterToDto, monsterToDtoNoId } from "./mappers.ts";

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
      return monsters.sort((a, b) => a.name.localeCompare(b.name));
    },
  });
};

export const useAddMonster = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (monster: Omit<Monster, "id">) => {
      await addDoc(
        collection(firebaseDb, monstersCollectionPath),
        monsterToDtoNoId(monster),
      );
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

export const useUpdateMonster = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (monster: Monster) => {
      await updateDoc(
        doc(firebaseDb, monstersCollectionPath, monster.id),
        monsterToDto(monster),
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [MONSTERS_QUERY_KEY] });
    },
  });
};
