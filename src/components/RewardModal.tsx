import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";

// ✅ SOM — substitua pelo seu real depois
const achievementSound = new Audio(
  "data:audio/mp3;base64,//uQZAAAAAAAAAAAAAAAAAAAAA..."
);

type RewardModalProps = {
  reward: {
    id: number;
    title: string;
    description: string;
    requiredDays: number;
    unlockedAt?: string | null;
  } | null;
  onClose: () => void;
  onClaim: (id: number) => void;
};

// ✅ Glow por tipo de placa
const glowColors: Record<string, string> = {
  bronze: "0 0 40px rgba(198,122,74,0.9)",
  prata: "0 0 40px rgba(220,220,220,0.9)",
  ouro: "0 0 60px rgba(255,215,0,1)",
};

// ✅ Placa real pelo ID correto do banco de dados
const getPlateImage = (id: number) => {
  switch (id) {
    case 6:
      return "/imagens/bronze.jpg"; // Medalha de Consistência
    case 7:
      return "/imagens/silver.jpg"; // Desafio da Transformação
    case 8:
      return "/imagens/gold.jpg"; // Conquistadora
    default:
      return "/imagens/bronze.jpg";
  }
};

// ✅ Tipo da placa baseado no ID real
const getPlateType = (id: number) => {
  if (id === 6) return "Bronze";
  if (id === 7) return "Prata";
  if (id === 8) return "Ouro";
  return "Bronze";
};


// ✅ Notificação estilo Xbox
const XboxNotification: React.FC<{ rewardName: string }> = ({ rewardName }) => (
  <motion.div
    initial={{ x: -150, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: -150, opacity: 0 }}
    transition={{ type: "spring", stiffness: 90 }}
    className="fixed top-6 left-6 z-[999999] bg-[#1e1e1e]/90 backdrop-blur-md 
               text-white px-6 py-4 rounded-xl flex items-center gap-3 shadow-2xl"
  >
    <CheckCircle2 size={28} className="text-green-400" />
    <div>
      <p className="text-sm font-bold">Achievement Unlocked</p>
      <p className="text-xs text-gray-300">{rewardName}</p>
    </div>
  </motion.div>
);

const RewardModal: React.FC<RewardModalProps> = ({ reward, onClose, onClaim }) => {
  if (!reward) return null;

  const plateType = getPlateType(reward.id);
  const plateImage = getPlateImage(reward.id);

  // ✅ toca som ao abrir
  useEffect(() => {
    achievementSound.volume = 0.9;
    achievementSound.play().catch(() => {});
  }, []);

  return (
    <AnimatePresence>
      <XboxNotification rewardName={reward.title} />

      <motion.div
        className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black pointer-events-none"></div>

        <motion.div
          initial={{ scale: 0.6, opacity: 0, rotateX: -40 }}
          animate={{ scale: 1, opacity: 1, rotateX: 0 }}
          exit={{ scale: 0.6, opacity: 0, rotateX: 20 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
          className="relative w-[90%] max-w-[420px] p-8 rounded-3xl bg-[#0f0f0f]/60 
                     border border-white/10 shadow-2xl backdrop-blur-xl text-center"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 transition"
          >
            <X size={22} className="text-white" />
          </button>

          {/* ✅ PLACA REAL — rotação 3D */}
          <motion.div
            className="relative mx-auto"
            style={{ filter: `drop-shadow(${glowColors[plateType]})` }}
            animate={{ rotateY: 360 }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "linear",
            }}
          >
            <img
              src={plateImage}
              alt="Placa SlimFit"
              className="w-[210px] h-[210px] object-contain mx-auto select-none"
              draggable={false}
            />

            <div
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: glowColors[plateType],
                animation: "pulseGlow 2.5s ease-in-out infinite",
              }}
            />
          </motion.div>

          <h2 className="mt-6 text-3xl font-extrabold text-white tracking-wide">
            Recompensa Desbloqueada!
          </h2>

          <p className="text-white/90 text-lg mt-2 capitalize">
            Placa {plateType}
          </p>

          <p className="text-white/70 text-sm mt-4">{reward.description}</p>

          <p className="mt-3 text-xs text-white/40">
            Após {reward.requiredDays} dias concluídos
          </p>

          <motion.button
            onClick={() => onClaim(reward.id)}
            whileTap={{ scale: 0.92 }}
            className="mt-7 w-full py-3 rounded-full bg-[#ffffff1a] border border-white/20 
                       text-white font-semibold hover:bg-[#ffffff22] transition shadow-lg"
          >
            Confirmar Reivindicação
          </motion.button>
        </motion.div>
      </motion.div>

      <style>
        {`
        @keyframes pulseGlow {
          0%   { opacity: 0.5; transform: scale(0.95); }
          50%  { opacity: 1;   transform: scale(1.05); }
          100% { opacity: 0.5; transform: scale(0.95); }
        }
        `}
      </style>
    </AnimatePresence>
  );
};

export default RewardModal;
