import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";

import { type Monster } from "../types/bestiary.ts";
import { firebaseDb } from "../api/firebase.ts";

export async function fetchMonsters(): Promise<Monster[]> {
  const snapshot = await getDocs(collection(firebaseDb, "monsters"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Monster);
}

export const useGetBestiary = () => {
  return useQuery({
    queryKey: ["monsters"],
    queryFn: async () => {
      return await fetchMonsters();
    },
  });
};

// async function addMonster(monster: { name: string; hp: number; ac: number }) {
//   await addDoc(collection(firebaseDb, "monsters"), monster);
// }
