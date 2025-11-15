import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Missoes from "./pages/Missoes";
import Receitas from "./pages/Receitas";
import Recompensas from "./pages/Recompensas"; // ⚡ Novo import adicionado
import Dicas from "./pages/Dicas"; // ⚡ Import da nova página de Dicas
import Relatorios from "./pages/Relatorios"; // ✅ IMPORTADO AGORA
import Profile from "./pages/Profile"; // ⚡ Import da nova seção de perfil

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Página inicial → Login */}
        <Route path="/" element={<Login />} />

        {/* Cadastro */}
        <Route path="/register" element={<Register />} />

        {/* Tela principal do app (após login) */}
        <Route path="/home" element={<Home />} />

        {/* Outras telas */}
        <Route path="/missoes" element={<Missoes />} />
        <Route path="/receitas" element={<Receitas />} />
        <Route path="/recompensas" element={<Recompensas />} /> {/* ⚡ Nova rota */}
        <Route path="/dicas" element={<Dicas />} /> {/* ⚡ Rota adicionada para Dicas */}

        {/* ✅ Rota do Relatórios */}
        <Route path="/relatorios" element={<Relatorios />} />

        {/* ⚡ Nova rota do Perfil */}
       <Route path="/perfil" element={<Profile />} />

      </Routes>
    </Router>
  );
};

export default App;
