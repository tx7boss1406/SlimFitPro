import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Info } from "lucide-react";

type Mission = {
  id: number;
  titulo: string;
  descricao: string;
  progresso: number;
  status: "Disponível" | "Bloqueada" | "Concluída";
  unlockedAt?: string | null;
};

type MissionCardProps = {
  mission: Mission;
  onOpenModal: () => void;
};

const MissionCard: React.FC<MissionCardProps> = ({ mission, onOpenModal }) => {
  const isCompleted = mission.status === "Concluída";
  const isLocked = mission.status === "Bloqueada";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={!isLocked ? { scale: 1.02, boxShadow: "0 0 25px rgba(255, 215, 0, 0.25)" } : {}}
      className={`relative p-5 rounded-2xl border backdrop-blur-md cursor-pointer transition-all duration-300 
        ${
          isCompleted
            ? "bg-gradient-to-br from-emerald-700/30 via-emerald-800/10 to-emerald-900/10 border-emerald-400/40 shadow-emerald-400/20"
            : "bg-gradient-to-br from-yellow-900/30 via-gray-900/40 to-gray-950/60 border-yellow-400/20"
        }
        ${isLocked ? "opacity-60 cursor-not-allowed" : "hover:border-yellow-400/50"}`}
    >
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-3">
        <h4
          className={`text-lg font-semibold tracking-wide ${
            isCompleted
              ? "text-emerald-400 drop-shadow-[0_0_6px_rgba(16,185,129,0.4)]"
              : "text-yellow-300 drop-shadow-[0_0_6px_rgba(250,204,21,0.4)]"
          }`}
        >
          {mission.titulo}
        </h4>
        <button
          onClick={onOpenModal}
          className={`p-1.5 rounded-full bg-gray-800/40 hover:bg-gray-700/50 transition ${
            isLocked ? "pointer-events-none opacity-50" : ""
          }`}
        >
          <Info size={18} className="text-yellow-300" />
        </button>
      </div>

      {/* Descrição */}
      <p className="text-sm text-gray-300 mb-4 leading-relaxed">{mission.descricao}</p>

      {/* Barra de progresso */}
      <div className="w-full h-2.5 bg-gray-800/60 rounded-full overflow-hidden mb-4 shadow-inner">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-200"
          initial={{ width: 0 }}
          animate={{ width: `${mission.progresso}%` }}
          transition={{ duration: 0.8 }}
        />
      </div>

      {/* Rodapé */}
      <div className="flex justify-between items-center text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <Clock size={14} />{" "}
          {mission.unlockedAt
            ? new Date(mission.unlockedAt).toLocaleDateString()
            : "—"}
        </span>

        <motion.div
          whileHover={!isLocked ? { scale: 1.05 } : {}}
          whileTap={!isLocked ? { scale: 0.95 } : {}}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all
            border ${
              isCompleted
                ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300"
                : "bg-yellow-500/15 border-yellow-400/30 text-yellow-300"
            }
            ${isLocked ? "opacity-50 pointer-events-none" : "hover:shadow-yellow-400/20 cursor-pointer"}`}
        >
          <CheckCircle2 size={14} />
          {isCompleted ? "Concluída" : "Concluir"}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MissionCard;
