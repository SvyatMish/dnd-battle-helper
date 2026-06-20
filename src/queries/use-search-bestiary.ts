import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";

import { firebaseDb } from "../api/firebase.ts";

export async function fetchMonsters() {
  const snapshot = await getDocs(collection(firebaseDb, "monsters"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export const useSearchBestiary = () => {
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
