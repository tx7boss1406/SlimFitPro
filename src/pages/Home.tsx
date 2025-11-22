// src/pages/Home.tsx
import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  CalendarDays,
  Award,
  Flame,
  TrendingUp,
  Star,
  Activity,
  Scale,
  Gift,
  Sparkles,
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

type Metric = {
  id: string;
  title: string;
  value: string;
  icon: React.ReactNode;
  progress?: number;
  hint?: string;
};

type Reward = {
  id: number;
  name: string;
  description?: string;
  requiredDays?: number | null;
  unlocked: boolean;
  unlockedAt?: string | null;
  plateUrl?: string | null;
};

type SummaryResponse = {
  name?: string;
  xp: number;
  level: number;
  completedMissions: number;
  totalMissions: number;
  weeklyXP?: { dia: string; xp: number }[];
  currentWeight?: number | null;
  goalWeight?: number | null;
  imc?: number | null;
  activeMissions?: { id: number; title: string; progress: number }[];
  recentActivities?: { id: number; text: string; meta?: string; date?: string }[];
  goals?: { id: number; title: string; progress: number }[];
  rewardsAvailable?: number;
  macros?: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  } | null;
};

const DEFAULT_WEEKLY = [
  { dia: "Seg", xp: 60 },
  { dia: "Ter", xp: 75 },
  { dia: "Qua", xp: 95 },
  { dia: "Qui", xp: 70 },
  { dia: "Sex", xp: 90 },
  { dia: "Sáb", xp: 40 },
  { dia: "Dom", xp: 50 },
];

const MOTIVATIONS = [
  "Você é mais forte do que imagina 💛",
  "Um passo de cada vez ainda é progresso ✨",
  "Disciplina transforma sonho em realidade 🏆",
  "Pequenas vitórias constroem grandes resultados 💪",
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState<SummaryResponse | null>(null);
  const [weeklyData, setWeeklyData] = useState(DEFAULT_WEEKLY);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [activities, setActivities] = useState<
    { id: number; text: string; meta?: string; date?: string }[]
  >([]);
  const [goals, setGoals] = useState<
    { id: number; title: string; progress: number }[]
  >([]);
  const [macros, setMacros] = useState<{
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  } | null>(null);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [motivation, setMotivation] = useState<string>(MOTIVATIONS[0]);
  const [loading, setLoading] = useState(true);

  // pega user id do localStorage
  const storedUser = localStorage.getItem("user");
  const userId = storedUser ? JSON.parse(storedUser).id : null;

  useEffect(() => {
    setMotivation(MOTIVATIONS[Math.floor(Math.random() * MOTIVATIONS.length)]);
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        // summary
        const sRes = await fetch(
          `https://slimfitpro-backend.onrender.com/users/${userId}/summary`
        );
        if (sRes.ok) {
          const sData: SummaryResponse = await sRes.json();
          setSummary(sData);
          if (sData.weeklyXP && sData.weeklyXP.length > 0)
            setWeeklyData(sData.weeklyXP);
        }

        // rewards
        try {
          const rRes = await fetch(
            `https://slimfitpro-backend.onrender.com/rewards/${userId}`
          );
          if (rRes.ok) {
            const rData: Reward[] = await rRes.json();
            setRewards(
              rData.map((r) => ({
                ...r,
                plateUrl: r.name ? getPlateForReward(r.name) : null,
              }))
            );
          }
        } catch {}

        // activities
        try {
          const aRes = await fetch(
            `https://slimfitpro-backend.onrender.com/users/${userId}/activities?limit=6`
          );
          if (aRes.ok) {
            const aData = await aRes.json();
            if (Array.isArray(aData)) setActivities(aData);
          }
        } catch {}

        // goals
        try {
          const gRes = await fetch(
            `https://slimfitpro-backend.onrender.com/users/${userId}/goals`
          );
          if (gRes.ok) {
            const gData = await gRes.json();
            if (Array.isArray(gData)) setGoals(gData);
          }
        } catch {}

        // macros
        try {
          const nRes = await fetch(
            `https://slimfitpro-backend.onrender.com/users/${userId}/nutrition/today`
          );
          if (nRes.ok) {
            const nData = await nRes.json();
            if (nData) setMacros(nData);
          }
        } catch {}
      } catch {
        console.error("Erro ao carregar dados da Home");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [userId]);
  // monta cards principais
  useEffect(() => {
    if (!summary) {
      setMetrics([
        {
          id: "m1",
          title: "Missões concluídas",
          value: "— / —",
          icon: <CheckCircle size={20} />,
          progress: 0,
          hint: "Progresso semanal",
        },
        {
          id: "m2",
          title: "Dias ativos",
          value: "—",
          icon: <CalendarDays size={20} />,
          progress: 0,
          hint: "Sequência atual",
        },
        {
          id: "m3",
          title: "Total de XP",
          value: "—",
          icon: <Award size={20} />,
          progress: 0,
          hint: "XP acumulado",
        },
        {
          id: "m4",
          title: "Nível atual",
          value: "—",
          icon: <Flame size={20} />,
          progress: 0,
          hint: "Seu nível",
        },
      ]);
      return;
    }

    const missaoProgress =
      summary.totalMissions && summary.totalMissions > 0
        ? Math.round(
            (summary.completedMissions / summary.totalMissions) * 100
          )
        : 0;

    const xpPerLevel = summary.level * 500 || 500;
    const xpProgress = Math.min(
      Math.round((summary.xp / xpPerLevel) * 100),
      100
    );

    setMetrics([
      {
        id: "m1",
        title: "Missões concluídas",
        value: `${summary.completedMissions} / ${summary.totalMissions}`,
        icon: <CheckCircle size={20} />,
        progress: missaoProgress,
        hint: "Progresso semanal",
      },
      {
        id: "m2",
        title: "Dias ativos",
        value: `${summary.completedMissions} dias`,
        icon: <CalendarDays size={20} />,
        progress: Math.min(summary.completedMissions * 10, 100),
        hint: "Sequência atual",
      },
      {
        id: "m3",
        title: "Total de XP",
        value: `${summary.xp} XP`,
        icon: <Award size={20} />,
        progress: xpProgress,
        hint: "XP rumo ao próximo nível",
      },
      {
        id: "m4",
        title: "Nível atual",
        value: `Nível ${summary.level}`,
        icon: <Flame size={20} />,
        progress: 100,
        hint: "Seu nível",
      },
    ]);
  }, [summary]);

  const unlockedRewards = useMemo(
    () => rewards.filter((r) => r.unlocked),
    [rewards]
  );
  const lockedRewards = useMemo(
    () => rewards.filter((r) => !r.unlocked),
    [rewards]
  );

  function getPlateForReward(name: string) {
    const title = name.toLowerCase();
    if (title.includes("bronze") || title.includes("consist"))
      return "/imagens/bronze.jpg";
    if (title.includes("prata") || title.includes("silver"))
      return "/imagens/silver.jpg";
    if (title.includes("ouro") || title.includes("gold"))
      return "/imagens/gold.jpg";
    return "/imagens/bronze.jpg";
  }

  const xpToNext = useMemo(() => {
    if (!summary) return 0;
    const xpPerLevel = summary.level * 500 || 500;
    return Math.max(0, xpPerLevel - summary.xp);
  }, [summary]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-yellow-400">
        Carregando sua Home...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white">
      <Sidebar />

      {/* conteúdo principal */}
      <div className="flex-1 flex flex-col ml-20 md:ml-64">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h2 className="text-3xl font-extrabold text-yellow-400">
                👋 Olá,{" "}
                <span className="text-white">
                  {summary?.name ?? "Atleta"}
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
            {metrics.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="p-6 rounded-2xl bg-gray-900/60 border border-yellow-400/8"
              >
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
                      <linearGradient
                        id="g1"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#facc15"
                          stopOpacity={0.9}
                        />
                        <stop
                          offset="95%"
                          stopColor="#facc15"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <XAxis
                      dataKey="dia"
                      tick={{
                        fill: "#d1d5db",
                        fontSize: 12,
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <YAxis hide />

                    <Tooltip
                      contentStyle={{
                        background: "rgba(17,17,17,0.95)",
                        border:
                          "1px solid rgba(250,204,21,0.12)",
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
                className="p-6 rounded-2xl bg-gray-900/60 
                           border border-yellow-400/8"
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
                  {summary?.activeMissions &&
                  summary.activeMissions.length > 0 ? (
                    summary.activeMissions
                      .slice(0, 4)
                      .map((m) => (
                        <li
                          key={m.id}
                          className="flex items-center justify-between 
                                     bg-gray-800/40 p-3 rounded-lg"
                        >
                          <div>
                            <p className="text-sm font-medium">
                              {m.title}
                            </p>
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
                className="p-6 rounded-2xl bg-gray-900/60 
                           border border-yellow-400/8"
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
                      <span>
                        Meta: {summary.goalWeight} kg
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="mt-4 text-sm text-gray-400">
                    Complete seu perfil corporal para ver o
                    progresso.
                  </div>
                )}
              </motion.div>

              {/* Nutrição */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="p-6 rounded-2xl bg-gray-900/60 
                           border border-yellow-400/8"
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
                      <p className="text-xs text-gray-400">
                        Calorias
                      </p>
                      <p className="font-semibold">
                        {macros.calories} kcal
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        Proteína
                      </p>
                      <p className="font-semibold">
                        {macros.protein} g
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        Carbo
                      </p>
                      <p className="font-semibold">
                        {macros.carbs} g
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        Gordura
                      </p>
                      <p className="font-semibold">
                        {macros.fats} g
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 text-sm text-gray-400">
                    Conecte seu plano de refeições para
                    acompanhar a nutrição.
                  </div>
                )}
              </motion.div>
            </div>
          </section>
          {/* Lower section: Goals, activities, conquistas, dica do dia */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Activities & Goals (big) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 p-6 rounded-2xl bg-gray-900/60 border border-yellow-400/8"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Sparkles size={18} className="text-yellow-400" /> Atividades recentes
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

            {/* Coluna direita — Conquistas + Dica */}
            <div className="space-y-6">
              {/* Conquistas */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl bg-gray-900/60 border border-yellow-400/8"
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
                  {unlockedRewards.length > 0 ? (
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
                  {lockedRewards.length > 0 &&
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
                className="p-6 rounded-2xl bg-gradient-to-br from-yellow-400/6 via-yellow-400/4 to-yellow-400/6 border border-yellow-400/10"
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
    </div>
  );
};

export default Home;
