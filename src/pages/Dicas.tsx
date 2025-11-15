import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lightbulb, Sparkles, Flame, Star, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const dicasFixas = [
  {
    id: 1,
    titulo: "Comece o dia com movimento",
    texto:
      "Alongue-se ou faça uma caminhada leve logo pela manhã. Isso ativa o metabolismo e melhora o foco mental.",
    icone: <Flame size={22} className="text-yellow-400" />,
  },
  {
    id: 2,
    titulo: "A importância da hidratação",
    texto:
      "Beba água ao longo do dia! A hidratação mantém o desempenho físico e mental no auge.",
    icone: <Heart size={22} className="text-yellow-400" />,
  },
  {
    id: 3,
    titulo: "Sonhe, mas com disciplina",
    texto:
      "Tenha metas realistas e acompanhe seu progresso. Pequenas vitórias diárias constroem grandes resultados!",
    icone: <Star size={22} className="text-yellow-400" />,
  },
  {
    id: 4,
    titulo: "A constância vence o cansaço",
    texto:
      "Mesmo nos dias difíceis, faça algo. Um treino leve é melhor do que nenhum treino.",
    icone: <Sparkles size={22} className="text-yellow-400" />,
  },
  {
    id: 5,
    titulo: "Alimente corpo e mente",
    texto:
      "Escolha alimentos nutritivos e reserve um tempo para o descanso mental. Equilíbrio é força.",
    icone: <Lightbulb size={22} className="text-yellow-400" />,
  },
];

const frasesAleatorias = [
  "Você não precisa ser o melhor, só precisa ser melhor que ontem 💪",
  "Seu corpo alcança o que sua mente acredita ✨",
  "A consistência é o segredo dos campeões 🏆",
  "Cada treino é um passo mais perto do seu objetivo 💛",
  "Transforme esforço em orgulho 🔥",
];

const Dicas: React.FC = () => {
  const [frase, setFrase] = useState(
    frasesAleatorias[Math.floor(Math.random() * frasesAleatorias.length)]
  );
  const navigate = useNavigate();

  const gerarNovaFrase = () => {
    const nova = frasesAleatorias[Math.floor(Math.random() * frasesAleatorias.length)];
    setFrase(nova);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-8">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-yellow-400 mb-2"
          >
            💡 Dicas do Dia
          </motion.h1>
          <p className="text-gray-400 mb-8">
            Inspire-se e mantenha sua jornada saudável e disciplinada!
          </p>

          {/* Frase motivacional aleatória */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="p-6 bg-gray-900/60 border border-yellow-400/10 rounded-2xl shadow-md mb-8"
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="text-yellow-400" size={20} />
              <h2 className="text-lg font-semibold text-white">Mensagem motivacional</h2>
            </div>
            <p className="text-gray-100 text-base">{frase}</p>

            <div className="mt-4 flex gap-3">
              <button
                onClick={gerarNovaFrase}
                className="px-4 py-2 rounded-full bg-gray-800/60 text-sm text-white hover:bg-gray-700/60 transition"
              >
                Gerar outra
              </button>
              <button
                onClick={() => navigate("/home")}
                className="px-4 py-2 rounded-full bg-yellow-400 text-sm text-black font-semibold hover:bg-yellow-300 transition"
              >
                Voltar
              </button>
            </div>
          </motion.div>

          {/* Lista de dicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {dicasFixas.map((dica, index) => (
              <motion.div
                key={dica.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/60 border border-yellow-400/10 shadow-lg hover:shadow-yellow-400/10 transition"
              >
                <div className="flex items-center gap-2 mb-3">
                  {dica.icone}
                  <h3 className="text-lg font-semibold text-white">{dica.titulo}</h3>
                </div>
                <p className="text-sm text-gray-300">{dica.texto}</p>
              </motion.div>
            ))}
          </div>

          <footer className="mt-12 text-center text-sm text-gray-500">
            SlimFit Pro © 2025 — Transforme sua rotina com motivação e equilíbrio ✨
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Dicas;
