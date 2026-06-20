import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

import { BattlePage } from "./pages/battle-page.tsx";
import { BestiaryPage } from "./pages/bestiary-page.tsx";

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
      <nav>
        <Link to="/">Бой</Link> | <Link to="/bestiary">Бестриарий</Link>
      </nav>
      <Routes>
        <Route path="/" element={<BattlePage />} />
        <Route path="/bestiary" element={<BestiaryPage />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
