// src/pages/Missoes.tsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLock, FaCheckCircle, FaBolt, FaClock } from "react-icons/fa";
import Confetti from "react-confetti";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MissionModal from "../components/MissionModal";

interface Missao {
  id: number;
  title: string;
  description: string;
  xpReward: number;
  status: "Disponível" | "Bloqueada" | "Concluída";
  unlockedAt?: string | null;
  unlockAvailableAt?: string | null;
  details?: {
    objetivo: string;
    dicas: string[];
    beneficios: string[];
    miniDesafios: string[];
  };
}

export default function Missoes() {
  const [missoes, setMissoes] = useState<Missao[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMission, setSelectedMission] = useState<Missao | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [tempoRestante, setTempoRestante] = useState<string | null>(null);
  const [nextMissionId, setNextMissionId] = useState<number | null>(null);

  const userData = JSON.parse(localStorage.getItem("user") || "{}");
const userId = userData?.id || 1;


  const fetchMissoes = async () => {
   try {
      const res = await fetch(`https://slimfitpro-backend.onrender.com/missions/user/${userId}`);
      const data = await res.json();

      setMissoes(data);

      // 🔹 Descobre a próxima missão a desbloquear
      const ultimaConcluidaIndex = data.findIndex((m: Missao) => m.status === "Concluída");
      const proxima = data[ultimaConcluidaIndex + 1];
      if (proxima && proxima.unlockAvailableAt) {
        setNextMissionId(proxima.id);
      } else {
        setNextMissionId(null);
      }
    } catch (err) {
      console.error("Erro ao buscar missões:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleConcluir = async (missionId: number) => {
    try {
      await fetch(`https://slimfitpro-backend.onrender.com/missions/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, missionId }),
      });
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      await fetchMissoes();
      setShowModal(false);
    } catch (err) {
      console.error("Erro ao concluir missão:", err);
    }
  };
  // 🔹 Contador regressivo para a próxima missão apenas
  useEffect(() => {
    if (!nextMissionId) {
      setTempoRestante(null);
      return;
    }

    const proxima = missoes.find((m) => m.id === nextMissionId);
    if (!proxima?.unlockAvailableAt) return;

    const interval = setInterval(() => {
      const diff = new Date(proxima.unlockAvailableAt!).getTime() - Date.now();

      if (diff <= 0) {
        // libera missão automaticamente
        setMissoes((prev) =>
          prev.map((m) =>
            m.id === nextMissionId ? { ...m, status: "Disponível" } : m
          )
        );
        setTempoRestante(null);
        clearInterval(interval);
        return;
      }

      const horas = Math.floor(diff / (1000 * 60 * 60));
      const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diff % (1000 * 60)) / 1000);

      setTempoRestante(
        `${String(horas).padStart(2, "0")}:${String(minutos).padStart(
          2,
          "0"
        )}:${String(segundos).padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [nextMissionId, missoes]);

  useEffect(() => {
    fetchMissoes();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-400">
        Carregando missões...
      </div>
    );

  const concluidas = missoes.filter((m) => m.status === "Concluída").length;
  const progressoGeral = (concluidas / missoes.length) * 100;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={400}
          recycle={false}
          gravity={0.3}
        />
      )}
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-8">
          {/* Cabeçalho */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl font-extrabold text-yellow-400 mb-3">
              🎯 Missões Diárias
            </h2>
            <p className="text-gray-400 text-sm">
              Complete missões e desbloqueie recompensas exclusivas!
            </p>
          </motion.div>

          {/* Painel de progresso */}
          <div className="max-w-3xl mx-auto mb-10 p-6 bg-gray-900/70 border border-yellow-400/10 rounded-2xl shadow-sm backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-300">
                Missões concluídas:{" "}
                <span className="text-yellow-400 font-semibold">
                  {concluidas} / {missoes.length}
                </span>
              </p>
            </div>
            <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-200"
                style={{ width: `${progressoGeral}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${progressoGeral}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>

          {/* Lista de missões */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {missoes.map((m, index) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() =>
                  m.status !== "Bloqueada" && (setSelectedMission(m), setShowModal(true))
                }
                className={`relative p-6 rounded-2xl border shadow-md hover:scale-[1.02] cursor-pointer transition-all duration-300 ${
                  m.status === "Concluída"
                    ? "bg-gradient-to-br from-green-500/10 to-green-400/5 border-green-400/40"
                    : m.status === "Disponível"
                    ? "bg-gradient-to-br from-yellow-400/10 to-yellow-400/5 border-yellow-400/20"
                    : "bg-gradient-to-br from-gray-800/70 to-gray-900/80 border-gray-700/40"
                }`}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-white">{m.title}</h3>
                  {m.status === "Concluída" ? (
                    <FaCheckCircle className="text-green-400 text-xl" />
                  ) : m.status === "Disponível" ? (
                    <FaBolt className="text-yellow-400 text-xl animate-pulse" />
                  ) : (
                    <FaLock className="text-gray-600 text-xl" />
                  )}
                </div>

                <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                  {m.description}
                </p>

                <div className="text-xs text-gray-400 flex justify-between items-center">
                  {/* 🔥 contador só aparece na próxima missão */}
                  {m.status === "Bloqueada" && m.id === nextMissionId && tempoRestante && (
                    <span className="text-yellow-400 flex items-center gap-1">
                      <FaClock /> Desbloqueia em {tempoRestante}
                    </span>
                  )}

                  {m.status === "Concluída" && (
                    <span className="text-green-400 font-medium">✅ Concluída</span>
                  )}

                  {m.status === "Disponível" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMission(m);
                        setShowModal(true);
                      }}
                      className="px-4 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded-lg transition"
                    >
                      Ver Missão
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && selectedMission && (
          <MissionModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            mission={selectedMission}
            onComplete={() => handleConcluir(selectedMission.id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
