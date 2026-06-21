import { createContext, useContext } from "react";

export type AppContextType = {
  showHidden: boolean;
  setShowHidden: (showHidden: boolean) => void;
};

export const AppContext = createContext<AppContextType>({
  showHidden: false,
  setShowHidden: () => {},
});

export const useAppContext = () => useContext(AppContext);
