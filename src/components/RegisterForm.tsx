import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ChangeEvent, FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  password: string;
  level: number;
}

function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    level: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      level: name === "level" ? Number(value) : formData.level,
      [name]: name !== "level" ? value : formData[name as keyof FormData],
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});

      const data = await response.json();
      console.log("Resposta do servidor:", data);

      if (response.ok) {
        alert("✅ Conta criada com sucesso!");
        navigate("/");
      } else {
        alert(`❌ Erro: ${data.message || "Não foi possível criar a conta."}`);
      }
    } catch (error) {
      console.error("Erro ao registrar:", error);
      alert(
        "❌ Erro ao conectar ao servidor. Verifique se o backend está rodando."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[380px] bg-black/40 backdrop-blur-md border border-yellow-400/30 rounded-2xl p-10 text-center shadow-lg shadow-yellow-400/20 transition-all duration-300"
    >
      <h1 className="text-3xl font-extrabold text-yellow-400 mb-2">
        SlimFit Pro
      </h1>
      <p className="text-gray-300 mb-8 text-sm">
        Crie sua conta e comece sua jornada
      </p>

      <div className="space-y-6 text-left">
        {/* Campo Nome */}
        <div className="relative">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder=" "
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-yellow-400/40 text-white focus:border-yellow-400 focus:ring-0 peer transition-all duration-200"
          />
          <label
            htmlFor="name"
            className="absolute left-4 top-3 text-yellow-300 text-sm transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-yellow-400/60 peer-focus:top-[-12px] peer-focus:text-xs peer-focus:text-yellow-400 bg-black/60 px-1"
          >
            Nome
          </label>
        </div>

        {/* Campo Email */}
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder=" "
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-yellow-400/40 text-white focus:border-yellow-400 focus:ring-0 peer transition-all duration-200"
          />
          <label
            htmlFor="email"
            className="absolute left-4 top-3 text-yellow-300 text-sm transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-yellow-400/60 peer-focus:top-[-12px] peer-focus:text-xs peer-focus:text-yellow-400 bg-black/60 px-1"
          >
            Email
          </label>
        </div>

        {/* Campo Senha */}
        <div className="relative">
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder=" "
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-yellow-400/40 text-white focus:border-yellow-400 focus:ring-0 peer transition-all duration-200"
          />
          <label
            htmlFor="password"
            className="absolute left-4 top-3 text-yellow-300 text-sm transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-yellow-400/60 peer-focus:top-[-12px] peer-focus:text-xs peer-focus:text-yellow-400 bg-black/60 px-1"
          >
            Senha
          </label>
        </div>

        {/* Select Nível */}
        <div className="relative">
          <select
            id="level"
            name="level"
            value={formData.level}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-black/50 border border-yellow-400/40 text-white focus:border-yellow-400 focus:ring-0 transition-all duration-200"
          >
            <option value={0}>Selecione seu nível</option>
            <option value={1}>Iniciante</option>
            <option value={2}>Intermediário</option>
            <option value={3}>Avançado</option>
          </select>
        </div>
      </div>

      {/* Botão */}
      <button
        type="submit"
        disabled={loading}
        className={`mt-8 w-full bg-yellow-400 text-black font-bold py-3 rounded-lg shadow-md shadow-yellow-400/30 transition-all duration-200 ${
          loading
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-yellow-300 hover:shadow-yellow-300/50"
        }`}
      >
        {loading ? "Registrando..." : "Registrar"}
      </button>
    </form>
  );
}

export default RegisterForm;
