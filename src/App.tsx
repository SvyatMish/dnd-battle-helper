import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { AppContext, type AppContextType } from "./context.ts";

import { BattlePage } from "./pages/battle-page.tsx";
import { BestiaryPage } from "./pages/bestiary-page.tsx";

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    background: {
      default: "#dbd6d5",
    },
    text: {
      primary: "#3b3534",
    },
  },
});

function App() {
  const [context, setContext] = useState<Omit<AppContextType, "setShowHidden">>(
    { showHidden: false },
  );
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.search) {
      const searchParams = new URLSearchParams(location.search);
      const redirectUrl = searchParams.get("redirectUrl");
      if (redirectUrl) {
        navigate(redirectUrl, { replace: true });
      }
    }
  }, []);

  const setShowHidden = useCallback((v: boolean) => {
    setContext((current) => {
      return {
        ...current,
        showHidden: v,
      };
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContext.Provider value={{ ...context, setShowHidden }}>
          <div className="p-5">
            <nav className="flex justify-end">
              <div className="grid grid-cols-3 max-w-fit gap-4 justify-items-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      id="show-n-checkbox"
                      checked={context.showHidden}
                      onChange={(e) => {
                        setShowHidden(e.target.checked);
                      }}
                    />
                  }
                  label="Секретные монстры"
                />
                <Link to="/">
                  <Typography variant="h5">Бой</Typography>
                </Link>
                <Link to="/bestiary">
                  <Typography variant="h5">Бестриарий</Typography>
                </Link>
              </div>
            </nav>
          </div>
          <Routes>
            <Route path="/" element={<BattlePage />} />
            <Route path="/bestiary" element={<BestiaryPage />} />
          </Routes>
        </AppContext.Provider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
