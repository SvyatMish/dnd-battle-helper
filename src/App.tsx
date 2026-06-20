import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";

function Home() {
  return <h1>Home12</h1>;
}

function Battle() {
  return <h1>Battle1</h1>;
}

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
    <>
      <nav>
        <Link to="/">Home</Link> | <Link to="/battle">Battle</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/battle" element={<Battle />} />
      </Routes>
    </>
  );
}

export default App;
