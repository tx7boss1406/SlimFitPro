import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Missoes from "./pages/Missoes";
import Receitas from "./pages/Receitas";
import Recompensas from "./pages/Recompensas";
// import Dicas from "./pages/Dicas";  // ❌ removido pois não existe
import Relatorios from "./pages/Relatorios";
import Profile from "./pages/Profile";
import BottomBar from "./components/BottomBar";
import { useLocation, Outlet } from "react-router-dom";

const LoggedArea = () => {
  const location = useLocation();
  const hideOn = ["/", "/register"];
  const shouldHide = hideOn.includes(location.pathname);

  return (
    <>
      <Outlet />
      {!shouldHide && <BottomBar />}
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rotas protegidas com BottomBar */}
        <Route element={<LoggedArea />}>
          <Route path="/home" element={<Home />} />
          <Route path="/missoes" element={<Missoes />} />
          <Route path="/receitas" element={<Receitas />} />
          <Route path="/recompensas" element={<Recompensas />} />
          {/* <Route path="/dicas" element={<Dicas />} /> */} {/* ❌ desativado */}
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/perfil" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
