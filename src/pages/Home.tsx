import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Scale,
  Activity,
  Sparkles,
  CheckCircle,
  Star,
  Award,
  Lock,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";

const MOTIVATIONS = [
  "Você é mais forte do que pensa.",
  "Pequenos passos constroem grandes vitórias.",
  "O progresso é silencioso, mas poderoso.",
  "Disciplina supera motivação.",
];
const userId = localStorage.getItem("userId");

const Home = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState<any>(null);
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);
  const [unlockedRewards, setUnlockedRewards] = useState<any[]>([]);
  const [lockedRewards, setLockedRewards] = useState<any[]>([]);
  const [motivation, setMotivation] = useState(MOTIVATIONS[0]);
  const [macros, setMacros] = useState<any>(null);


  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

    const res = await axios.get(
  `${import.meta.env.VITE_API_URL}/users/${userId}/summary`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

setSummary(res.data);
      setWeeklyData(res.data.weeklyXp);
      setMetrics(res.data.metrics);
      setActivities(res.data.activities);
      setGoals(res.data.goals);
      setUnlockedRewards(res.data.unlockedRewards);
      setLockedRewards(res.data.lockedRewards);
      setMacros(res.data.macros);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
<div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-gray-950 to-black">
      <Navbar />

      <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-28 space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h2 className="text-3xl font-extrabold text-yellow-400">
              👋 Olá,{" "}
              <span className="text-white">
                {summary?.name}
              </span>
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Aqui está seu resumo do dia — mantenha o foco e conquiste
              suas metas.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => navigate("/relatorios")}
              className="px-4 py-2 bg-gray-800/50 border border-yellow-400/10 rounded-full text-sm 
                           text-gray-200 hover:bg-gray-800 transition"
            >
              Ver relatório completo
            </button>

            <button
              onClick={() => navigate("/missoes")}
              className="px-4 py-2 bg-yellow-400 text-black font-medium rounded-full 
                           text-sm hover:brightness-95 transition"
            >
              Nova missão
            </button>
          </div>
        </div>

        {/* Cards principais */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics?.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
className="p-6 rounded-2xl bg-gray-900/60 border border-yellow-400/10 shadow-[0_0_20px_rgba(250,204,21,0.06)] backdrop-blur-sm"            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-yellow-400/10 text-yellow-300">
                    {m.icon}
                  </div>

                  <div>
                    <p className="text-sm text-yellow-300 font-medium">
                      {m.title}
                    </p>
                    <p className="text-2xl font-bold text-white mt-1">
                      {m.value}
                    </p>
                  </div>
                </div>

                <div className="text-sm text-gray-400 hidden sm:block">
                  {m.hint}
                </div>
              </div>

              {typeof m.progress !== "undefined" && (
                <div className="mt-4">
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-400 to-yellow-300"
                      style={{ width: `${m.progress}%` }}
                    />
                  </div>

                  <div className="flex justify-between mt-2 text-xs text-gray-400">
                    <span>{m.progress}%</span>
                    <span>
                      {m.title.includes("XP")
                        ? `Meta: ${
                            summary?.level
                              ? summary.level * 500
                              : 2000
                          } XP`
                        : ""}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </section>

        {/* Grande área: gráfico + painel lateral */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gráfico semanal */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 p-6 rounded-2xl 
                         bg-gray-900/60 border border-yellow-400/8"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp size={18} className="text-yellow-400" />
                <h3 className="text-lg font-semibold text-white">
                  Evolução Semanal
                </h3>
              </div>

              <div className="text-sm text-gray-400">
                Últimos 7 dias
              </div>
            </div>

            <div className="h-64 bg-gray-950/40 rounded-xl border border-gray-800 p-3">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#facc15" stopOpacity={0.9} />
                      <stop offset="95%" stopColor="#facc15" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <XAxis
                    dataKey="dia"
                    tick={{ fill: "#d1d5db", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis hide />

                  <Tooltip
                    contentStyle={{
                      background: "rgba(17,17,17,0.95)",
                      border: "1px solid rgba(250,204,21,0.12)",
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="xp"
                    stroke="#facc15"
                    strokeWidth={2}
                    fill="url(#g1)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Painel lateral */}
          <div className="space-y-6">
            {/* Missões em andamento */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="p-6 rounded-2xl bg-gray-900/50 border border-yellow-400/10 shadow-[0_0_15px_rgba(250,204,21,0.05)] backdrop-blur-md"

            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-white">
                    Missões em andamento
                  </h4>
                  <p className="text-sm text-gray-400 mt-1">
                    Resumo rápido das missões ativas
                  </p>
                </div>

                <div className="text-sm text-yellow-300 font-semibold">
                  {summary?.completedMissions ?? 0} dias
                </div>
              </div>

              <ul className="mt-4 space-y-3">
                {summary?.activeMissions && summary.activeMissions.length > 0 ? (
                  summary.activeMissions
                    .slice(0, 4)
                    .map((m: { id: number; title: string; progress: number }) => (
                      <li
                        key={m.id}
                        className="flex items-center justify-between 
                                   bg-gray-800/40 p-3 rounded-lg"
                      >
                        <div>
                          <p className="text-sm font-medium">{m.title}</p>
                          <p className="text-xs text-gray-400">
                            Progresso: {m.progress}%
                          </p>
                        </div>

                        <div className="text-sm text-yellow-400 font-semibold">
                          {m.progress}%
                        </div>
                      </li>
                    ))
                ) : (
                  <li className="text-sm text-gray-400">
                    Nenhuma missão ativa no momento.
                  </li>
                )}
              </ul>
            </motion.div>

            {/* Progresso corporal */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}

              className="p-6 rounded-2xl bg-gray-900/50 border border-yellow-400/10 shadow-[0_0_15px_rgba(250,204,21,0.05)] backdrop-blur-md"

            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Scale size={18} className="text-yellow-400" />
                  <h4 className="text-lg font-semibold text-white">
                    Progresso corporal
                  </h4>
                </div>

                <div className="text-sm text-gray-300">
                  {summary?.currentWeight ?? "—"} kg
                </div>
              </div>

              {summary?.currentWeight != null &&
              summary?.goalWeight != null ? (
                <>
                  <div className="mt-4 w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-400 to-yellow-300"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.round(
                            Math.abs(
                              (summary.currentWeight -
                                (summary.goalWeight || 0)) /
                                (summary.goalWeight || 1)
                            ) * 100
                          )
                        )}%`,
                      }}
                    />
                  </div>

                  <div className="flex justify-between mt-2 text-xs text-gray-400">
                    <span>{summary.currentWeight} kg</span>
                    <span>Meta: {summary.goalWeight} kg</span>
                  </div>
                </>
              ) : (
                <div className="mt-4 text-sm text-gray-400">
                  Complete seu perfil corporal para ver o progresso.
                </div>
              )}
            </motion.div>

            {/* Nutrição */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}

              className="p-6 rounded-2xl bg-gray-900/50 border border-yellow-400/10 shadow-[0_0_15px_rgba(250,204,21,0.05)] backdrop-blur-md"

            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity size={18} className="text-yellow-400" />
                  <h4 className="text-lg font-semibold text-white">
                    Nutrição hoje
                  </h4>
                </div>
              </div>

              {macros ? (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-400">Calorias</p>
                    <p className="font-semibold">{macros.calories} kcal</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Proteína</p>
                    <p className="font-semibold">{macros.protein} g</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Carbo</p>
                    <p className="font-semibold">{macros.carbs} g</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Gordura</p>
                    <p className="font-semibold">{macros.fats} g</p>
                  </div>
                </div>
              ) : (
                <div className="mt-4 text-sm text-gray-400">
                  Conecte seu plano de refeições para acompanhar a nutrição.
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Lower section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activities */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}

className="p-6 rounded-2xl bg-gray-900/50 border border-yellow-400/10 shadow-[0_0_15px_rgba(250,204,21,0.05)] backdrop-blur-md"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Sparkles size={18} className="text-yellow-400" /> Atividades
                recentes
              </h3>
              <div className="text-sm text-gray-400">Resumo</div>
            </div>

            <div className="mt-4 space-y-3">
              {activities && activities.length > 0 ? (
                activities.slice(0, 6).map((a) => (
                  <div
                    key={a.id}
                    className="flex items-start gap-3 bg-gray-800/40 p-3 rounded-lg"
                  >
                    <div className="p-2 bg-yellow-400/10 rounded-md text-yellow-300">
                      <CheckCircle size={18} />
                    </div>

                    <div className="flex-1">
                      <p className="text-sm text-white">{a.text}</p>
                      {a.meta && (
                        <p className="text-xs text-gray-400 mt-1">{a.meta}</p>
                      )}
                      {a.date && (
                        <p className="text-xs text-gray-500 mt-1">{a.date}</p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-400">
                  Você ainda não possui atividades recentes.
                </div>
              )}
            </div>

            {/* Goals */}
            <div className="mt-6">
              <h4 className="text-sm text-gray-300 mb-3">Suas metas</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {goals && goals.length > 0 ? (
                  goals.map((g) => (
                    <div key={g.id} className="p-3 bg-gray-800/40 rounded-lg">
                      <p className="text-sm text-white font-medium">{g.title}</p>

                      <div className="w-full h-2 bg-gray-800 rounded-full mt-2">
                        <div
                          className="h-full bg-gradient-to-r from-yellow-400 to-yellow-300"
                          style={{ width: `${g.progress}%` }}
                        />
                      </div>

                      <p className="text-xs text-gray-400 mt-2">
                        {g.progress}% concluído
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-400">
                    Nenhuma meta definida.
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Conquistas */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}

className="p-6 rounded-2xl bg-gray-900/50 border border-yellow-400/10 shadow-[0_0_15px_rgba(250,204,21,0.05)] backdrop-blur-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Star size={18} className="text-yellow-400" /> Conquistas
                  </h4>
                  <p className="text-sm text-gray-400 mt-1">
                    Mostrando conquistas liberadas
                  </p>
                </div>

                <button
                  onClick={() => navigate("/recompensas")}
                  className="text-sm text-yellow-300 underline"
                >
                  Ver todas
                </button>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                 {unlockedRewards?.length > 0 ? (
                  unlockedRewards.slice(0, 4).map((r) => (
                    <div
                      key={r.id}
                      className="p-3 rounded-lg bg-gray-800/40 flex flex-col items-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center mb-2">
                        <Award size={20} className="text-yellow-300" />
                      </div>

                      <p className="text-sm text-white text-center">{r.name}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {r.requiredDays ? `+${r.requiredDays} dias` : "+XP"}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center text-sm text-gray-400">
                    Nenhuma conquista desbloqueada ainda.
                  </div>
                )}

                {/* Bloqueadas */}
                {lockedRewards?.length > 0 &&
                  lockedRewards.slice(0, 2).map((r) => (
                    <div
                      key={`locked-${r.id}`}
                      className="p-3 rounded-lg bg-gray-800/20 opacity-60 flex flex-col items-center justify-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-gray-800/30 flex items-center justify-center mb-2">
                        <Lock size={20} className="text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-400 text-center">
                        {r.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Bloqueada</p>
                    </div>
                  ))}
              </div>
            </motion.div>

            {/* Dica do dia */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}

             className="p-6 rounded-2xl bg-gradient-to-br from-yellow-500/10 via-yellow-400/10 to-yellow-500/10 border border-yellow-300/20 shadow-[0_0_25px_rgba(250,204,21,0.15)]"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Sparkles size={18} className="text-white" /> Dica do dia
                </h4>
                <div className="text-xs text-gray-300">Personalizada</div>
              </div>

              <p className="mt-4 text-sm text-white/90">{motivation}</p>

              <div className="mt-4 flex gap-2 flex-wrap">
                <button
                  onClick={() =>
                    setMotivation(
                      MOTIVATIONS[
                        Math.floor(Math.random() * MOTIVATIONS.length)
                      ]
                    )
                  }
                  className="px-3 py-2 bg-gray-800/60 rounded-full text-sm"
                >
                  Gerar outra
                </button>

                <button
                  onClick={() => navigate("/dicas")}
                  className="px-3 py-2 bg-yellow-400 rounded-full text-sm font-medium text-black"
                >
                  Ver dicas
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-gray-500">
          SlimFit Pro © 2025 — Transforme-se com saúde e confiança ✨
        </footer>
      </main>
    </div>
  );
};

export default Home;
