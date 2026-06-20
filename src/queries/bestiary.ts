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

export const MONSTERS_QUERY_KEY = "monsters";
const monstersCollectionPath = "monsters";

export const useGetBestiary = () => {
  return useQuery({
    queryKey: [MONSTERS_QUERY_KEY],
    queryFn: async () => {
      const snapshot = await getDocs(
        collection(firebaseDb, monstersCollectionPath),
      );
      return snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as Monster,
      );
    },
  });
};

export const useAddMonster = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (monster: Omit<Monster, "id">) => {
      await addDoc(collection(firebaseDb, monstersCollectionPath), {
        name: monster.name.trim() || "",
        ac: monster.ac?.trim() || "",
        hp: monster.hp?.trim() || "",
        initiative: monster.initiative?.trim() || "",
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
