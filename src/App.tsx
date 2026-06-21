import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Typography } from "@mui/material";

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

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="p-5">
          <nav className="flex justify-end">
            <div className="grid grid-cols-2 max-w-70 gap-4 justify-items-center">
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
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
