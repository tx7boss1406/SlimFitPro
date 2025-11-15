import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XCircle, Trophy, CheckCircle2, Lock } from "lucide-react";

export interface MissionModalProps {
  isOpen: boolean;
  mission: any;
  onClose: () => void;
  onComplete: () => void;
}

const MissionModal: React.FC<MissionModalProps> = ({
  isOpen,
  mission,
  onClose,
  onComplete,
}) => {
  const [details, setDetails] = useState<any>({});

  useEffect(() => {
    if (mission?.details) {
      try {
        const parsed =
          typeof mission.details === "string"
            ? JSON.parse(mission.details)
            : mission.details;
        setDetails(parsed || {});
      } catch {
        setDetails({});
      }
    }
  }, [mission]);

  if (!mission || !isOpen) return null;

  const isLocked = mission.status === "Bloqueada";
  const isCompleted = mission.status === "Concluída";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] border border-yellow-400/20 rounded-2xl p-8 w-[92%] max-w-2xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão Fechar */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-yellow-400 transition"
            >
              <XCircle size={26} />
            </button>

            {/* Cabeçalho */}
            <div className="flex items-start gap-5 mb-6">
              <div className="w-16 h-16 rounded-xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center">
                {isCompleted ? (
                  <CheckCircle2 size={32} className="text-green-400" />
                ) : isLocked ? (
                  <Lock size={28} className="text-gray-500" />
                ) : (
                  <Trophy size={30} className="text-yellow-400" />
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-yellow-300 mb-1">
                  {mission.title || mission.titulo}
                </h2>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {mission.description || mission.descricao}
                </p>
                <div className="mt-2 text-sm text-gray-400">
                  <span className="font-semibold text-yellow-300">
                    💎 {mission.xpReward || mission.recompensa}
                  </span>{" "}
                  de recompensa
                </div>
              </div>
            </div>

            {/* Detalhes — agora dentro de container rolável */}
            <div className="overflow-y-auto max-h-[60vh] pr-2">
              {details.objetivo && (
                <div className="mb-4">
                  <h3 className="font-semibold text-white text-lg mb-1">
                    🎯 Objetivo
                  </h3>
                  <p className="text-gray-300 text-sm">{details.objetivo}</p>
                </div>
              )}

              {details.dicas && details.dicas.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold text-white text-lg mb-1">
                    💡 Dicas
                  </h3>
                  <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                    {details.dicas.map((d: string, i: number) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              )}

              {details.beneficios && details.beneficios.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold text-white text-lg mb-1">
                    🏆 Benefícios
                  </h3>
                  <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                    {details.beneficios.map((b: string, i: number) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              )}

              {details.miniDesafios && details.miniDesafios.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-white text-lg mb-1">
                    🔥 Mini Desafios
                  </h3>
                  <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                    {details.miniDesafios.map((m: string, i: number) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Botões */}
            <div className="flex justify-end gap-4 mt-8 border-t border-gray-800 pt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-full border border-gray-700 text-gray-300 hover:bg-gray-800 transition"
              >
                Fechar
              </button>

              {isCompleted ? (
                <button
                  disabled
                  className="px-5 py-2 rounded-full bg-green-600 text-white font-semibold cursor-not-allowed"
                >
                  Concluída
                </button>
              ) : isLocked ? (
                <button
                  disabled
                  className="px-5 py-2 rounded-full bg-gray-700/60 text-gray-400 font-semibold cursor-not-allowed"
                >
                  Bloqueada
                </button>
              ) : (
                <button
                  onClick={onComplete}
                  className="px-5 py-2 rounded-full bg-yellow-400 text-black font-semibold hover:brightness-95 transition"
                >
                  Concluir Missão
                </button>
              )}
            </div>

            {/* Efeito de brilho suave */}
            <motion.div
              className="absolute -top-10 -right-10 w-48 h-48 bg-yellow-400/10 blur-3xl rounded-full pointer-events-none"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 6 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MissionModal;
