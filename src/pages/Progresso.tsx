import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";

export default function Progresso() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar title="Seu Progresso" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="p-6 space-y-6"
        >
          {/* Estatísticas Semanais */}
          <div className="bg-gray-900/60 p-6 rounded-2xl shadow-xl border border-gray-800">
            <h2 className="text-2xl font-bold mb-4">Estatísticas Semanais</h2>
            <p className="text-gray-400">
              🔥 Calorias queimadas: <span className="text-orange-400 font-semibold">3.250 kcal</span>
            </p>
            <p className="text-gray-400">
              💧 Água consumida: <span className="text-blue-400 font-semibold">15L</span>
            </p>
            <p className="text-gray-400">
              🏋️‍♀️ Treinos: <span className="text-green-400 font-semibold">5 concluídos</span>
            </p>
          </div>

          {/* Níveis */}
          <div className="bg-gray-900/60 p-6 rounded-2xl shadow-xl border border-gray-800">
            <h2 className="text-2xl font-bold mb-4">Nível Atual</h2>
            <p className="text-gray-400">
              🧠 Experiência acumulada: <span className="text-yellow-400 font-semibold">2.340 XP</span>
            </p>
            <p className="text-gray-400">
              🎯 Próximo nível: <span className="text-green-400 font-semibold">Avançado</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
