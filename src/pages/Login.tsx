import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ParticleBackground from "../components/ParticleBackground";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    cardRef.current.style.transform = `perspective(600px) rotateY(${x / 20}deg) rotateX(${-y / 20}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)";
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("❌ Preencha todos os campos!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        alert("❌ Resposta inesperada do servidor.");
        setLoading(false);
        return;
      }

      if (res.ok) {
        // Salva token e dados do usuário
       localStorage.setItem("token", data.token);
localStorage.setItem("user", JSON.stringify(data.user));
localStorage.setItem("userId", data.user.id);
;

        alert(`✅ Bem-vindo, ${data.user.name}!`);
        navigate("/home");
      } else {
        alert(`❌ Erro: ${data.message || "Não foi possível fazer login."}`);
      }
    } catch (error) {
      console.error("Erro no login:", error);
      alert("❌ Erro ao conectar ao servidor. Verifique se o backend está rodando.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      <ParticleBackground />

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative z-10 bg-black/40 backdrop-blur-md border border-yellow-400/30 rounded-2xl p-10 w-[90%] max-w-md text-center shadow-lg transition-transform duration-300"
        style={{
          boxShadow: "0 0 20px rgba(255, 217, 0, 0.86), 0 10px 30px rgba(255, 215, 0, 0.08)",
        }}
      >
        <h1 className="text-3xl font-bold mb-2 text-yellow-400 drop-shadow-[0_0_12px_rgba(255,215,0,0.45)]">
          SlimFit Pro
        </h1>
        <p className="text-gray-400 mb-8">Entre para começar sua jornada</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-transparent border border-yellow-400 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-transparent border border-yellow-400 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 bg-yellow-400 text-black font-semibold rounded-lg transition-all duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-300"
            }`}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-400">
          Não tem conta?{" "}
          <Link to="/register" className="text-yellow-400 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
