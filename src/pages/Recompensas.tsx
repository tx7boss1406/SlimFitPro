import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { Award, Lock } from "lucide-react";
import RewardModal from "../components/RewardModal";

type Reward = {
  id: number;
  title: string;
  description: string;
  imageUrl?: string | null;
  requiredDays: number;
  unlocked: boolean;
  unlockedAt?: string | null;
  plateUrl?: string;
};

// 💫 Efeito de confete
const Confetti: React.FC<{ show: boolean }> = ({ show }) => {
  if (!show) return null;
  const pieces = new Array(30).fill(0);
  return (
    <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden">
      {pieces.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 0.6;
        const duration = 1.8 + Math.random() * 1.2;
        const size = 6 + Math.random() * 10;
        const bg = ["#FACC15", "#FFD166", "#FFD700", "#FFF4BF"][Math.floor(Math.random() * 4)];
        return (
          <span
            key={i}
            style={{
              left: `${left}%`,
              width: size,
              height: size * 0.6,
              background: bg,
              top: "-10%",
              transform: `rotate(${Math.random() * 360}deg)`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
            className="absolute rounded-sm animate-confetti"
          />
        );
      })}
      <style>{`
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
        .animate-confetti {
          animation-name: confetti;
          animation-timing-function: linear;
        }
      `}</style>
    </div>
  );
};

const Recompensas: React.FC = () => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [xp, setXp] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selected, setSelected] = useState<Reward | null>(null);

  const storedUser = localStorage.getItem("user");
  const userId = storedUser ? JSON.parse(storedUser).id : null;
  const xpForNext = 2000;
  const xpPercent = Math.min(100, Math.round((xp / xpForNext) * 100));

 // ✅ SELETOR DE PLACAS — baseado no título real do banco
const getPlateForReward = (reward: Reward) => {
  const title = reward.title.toLowerCase();

  if (title.includes("consistência")) return "/imagens/bronze.jpg";
  if (title.includes("transformação")) return "public/imagens/silver.jpg";
  if (title.includes("conquistadora")) return "/imagens/gold.jpg";

  return "/imagens/bronze.jpg"; // fallback se vier algo sem placa
};


  useEffect(() => {
    if (!userId) return;
    const fetchRewards = async () => {
      try {
        const res = await fetch(`http://localhost:5000/rewards/${userId}`);
        const data = await res.json();

        // ✅ aplica a imagem da placa automaticamente
        const enriched = data.map((r: Reward) => ({
          ...r,
          plateUrl: getPlateForReward(r),
        }));

        setRewards(enriched);
      } catch (err) {
        console.error("Erro ao buscar recompensas:", err);
      }
    };
    fetchRewards();
  }, [userId]);

  const claimReward = async (rewardId: number) => {
    if (!userId) return;
    try {
      const res = await fetch("http://localhost:5000/rewards/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, rewardId }),
      });

      if (res.ok) {
        setRewards((prev) =>
          prev.map((r) =>
            r.id === rewardId
              ? {
                  ...r,
                  unlocked: true,
                  unlockedAt: new Date().toISOString(),
                }
              : r
          )
        );
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
      }
    } catch (err) {
      console.error("Erro ao reivindicar recompensa:", err);
    }
    setSelected(null);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-8">
          <Confetti show={showConfetti} />

          {/* Cabeçalho */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h2 className="text-3xl font-extrabold text-yellow-400">Recompensas</h2>
              <p className="text-sm text-gray-400 mt-1">Conquistas e prêmios da sua jornada.</p>
            </div>

            {/* Barra de XP */}
            <div className="w-full max-w-sm">
              <div className="p-4 bg-gray-900/60 border border-yellow-400/8 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">Progresso de XP</p>
                    <h3 className="text-lg font-semibold text-white">Nível 1 — XP {xp}</h3>
                  </div>
                  <div className="text-yellow-400 font-semibold">{xpPercent}%</div>
                </div>
                <div className="mt-3">
                  <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-400 to-yellow-300 transition-all"
                      style={{ width: `${xpPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de Recompensas */}
          <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {rewards.map((r) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                className={`relative p-5 rounded-2xl border shadow-md overflow-hidden ${
                  r.unlocked
                    ? "bg-gray-900/60 border-yellow-400/10"
                    : "bg-gray-900/40 border-gray-800/40 opacity-80"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-16 h-16 rounded-lg flex items-center justify-center ${
                      r.unlocked ? "bg-yellow-400/10" : "bg-gray-800/30"
                    }`}
                  >
                    {r.unlocked ? (
                      <Award size={28} className="text-yellow-300" />
                    ) : (
                      <Lock size={24} className="text-gray-500" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h4 className={`text-lg font-semibold ${r.unlocked ? "text-white" : "text-gray-300"}`}>
                      {r.title}
                    </h4>
                    <p className="text-xs text-gray-400 mt-1">
                      Meta: {r.requiredDays} dias de missão
                    </p>
                    <p className="text-sm text-gray-300 mt-2">{r.description}</p>

                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-xs text-gray-400">
                        {r.unlockedAt
                          ? `Desbloqueada em ${new Date(r.unlockedAt).toLocaleDateString()}`
                          : "Bloqueada"}
                      </span>

                      {r.unlocked ? (
                        <button
                          onClick={() => setSelected(r)}
                          className="px-3 py-1 rounded-full bg-yellow-400 text-black text-sm font-medium hover:brightness-95 transition"
                        >
                          Reivindicar
                        </button>
                      ) : (
                        <button
                          disabled
                          className="px-3 py-1 rounded-full border border-yellow-400/10 text-yellow-300 text-sm opacity-60 cursor-not-allowed"
                        >
                          Aguardando
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </section>

          {/* ✅ Modal de Recompensa */}
          <RewardModal
            reward={selected}
            onClose={() => setSelected(null)}
            onClaim={claimReward}
          />
        </main>
      </div>
    </div>
  );
};

export default Recompensas;
