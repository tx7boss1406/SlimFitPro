// ✅ RELATORIOS.TSX REFEITO COM DESIGN PREMIUM + SIDEBAR + NAVBAR
// ✅ MANTIVE TODA SUA LÓGICA — SOMENTE MELHOREI O DESIGN COMPLETO
// ✅ DEIXEI NO MESMO PADRÃO DO HOME.TSX COM Sidebar + Navbar + Layout Luxuoso

import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";
import {
  Award,
  Activity,
  BarChart as BarIcon,
  Clock,
  UserCheck,
} from "lucide-react";

import { getOverview, getMissionReport, getConsistency } from "../services/reports";

// TYPES --------------------------------------------------------------------------------------------------
type Overview = {
  xp: number;
  level: number;
  missionsCompleted: number;
  daysActive: number;
};

type MissionItem = {
  id: number;
  title: string;
  dayNumber: number;
  xp: number;
  completed: boolean;
  completedAt: string | null;
};

type Consistency = {
  totalDays: number;
  days: string[];
};

// HELPERS ------------------------------------------------------------------------------------------------
function formatDateShort(iso?: string | null) {
  if (!iso) return "-";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString();
  } catch (e) {
    return iso;
  }
}

function buildDailyXP(missions: MissionItem[], consistency: Consistency, daysBack = 14) {
  const result: { date: string; xp: number; completed: number }[] = [];
  const today = new Date();

  for (let i = daysBack - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const iso = d.toISOString().split("T")[0];
    result.push({ date: iso, xp: 0, completed: 0 });
  }

  missions.forEach((m) => {
    if (m.completed && m.completedAt) {
      const iso = new Date(m.completedAt).toISOString().split("T")[0];
      const row = result.find((r) => r.date === iso);
      if (row) {
        row.xp += m.xp || 0;
        row.completed += 1;
      }
    }
  });

  return result.map((r) => ({ ...r, date: new Date(r.date).toLocaleDateString() }));
}

// COMPONENTE ----------------------------------------------------------------------------------------------
export default function RelatoriosPage(): JSX.Element {
const userId = Number(localStorage.getItem("userId"));
  const [period, setPeriod] = useState<"7d" | "14d" | "30d">("14d");

  const [overview, setOverview] = useState<Overview | null>(null);
  const [missions, setMissions] = useState<MissionItem[]>([]);
  const [consistency, setConsistency] = useState<Consistency | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchAll() {
    try {
      setLoading(true);
      setError(null);
      const [ov, ms, cs]: any = await Promise.all([
        getOverview(userId),
        getMissionReport(userId),
        getConsistency(userId),
      ]);

      setOverview(ov);
      setMissions(ms || []);
      setConsistency(cs);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Erro ao buscar relatórios");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAll();
  }, [period]);

  const dailyData = useMemo(
    () =>
      buildDailyXP(
        missions,
        consistency || { totalDays: 0, days: [] },
        period === "30d" ? 30 : period === "14d" ? 14 : 7
      ),
    [missions, consistency, period]
  );

  const totalMissions = missions.length;
  const completedMissions = missions.filter((m) => m.completed).length;
  const pendingMissions = totalMissions - completedMissions;

  // LAYOUT COMPLETÃO ---------------------------------------------------------------------------------------
  return (
    <div className="flex bg-gradient-to-br from-[#0e0e0e] via-[#1a1a1a] to-black min-h-screen text-white">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="px-6 py-6 max-w-7xl mx-auto w-full">
          {/* TÍTULO */}
          <motion.header
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h1 className="text-4xl font-extrabold text-yellow-300 drop-shadow">
              Relatórios Avançados
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Acompanhe seus resultados com clareza total.
            </p>
          </motion.header>

          {/* PERÍODO */}
          <div className="mb-6 flex justify-end">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as any)}
              className="px-3 py-2 bg-[#1c1c1c] text-white border border-gray-700 rounded-md"
            >
              <option value="7d">Últimos 7 dias</option>
              <option value="14d">Últimos 14 dias</option>
              <option value="30d">Últimos 30 dias</option>
            </select>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="mb-6 p-6 rounded-xl bg-[#1a1a1a] border border-gray-800 animate-pulse">
              <div className="h-4 w-40 bg-gray-700 rounded mb-2"></div>
              <div className="h-3 w-24 bg-gray-700 rounded"></div>
            </div>
          )}

          {/* ERRO */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/40 border border-red-600 text-red-300 rounded">
              {error}
            </div>
          )}

          {/* GRID PRINCIPAL */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* COLUNA ESQUERDA (2/3) */}
            <div className="lg:col-span-2 space-y-6">
              {/* CARDS DE RESUMO */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                {/* XP */}
                <div className="bg-[#1b1b1b] p-4 rounded-xl border border-gray-800 shadow-lg flex items-center gap-4 hover:scale-[1.02] transition">
                  <div className="p-3 bg-indigo-600/20 rounded-full">
                    <Activity className="text-indigo-400" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">XP Atual</div>
                    <div className="text-2xl font-bold text-white">
                      {overview ? overview.xp : "—"}
                    </div>
                    <div className="text-xs text-gray-500">
                      Nível {overview ? overview.level : "—"}
                    </div>
                  </div>
                </div>

                {/* MISSÕES */}
                <div className="bg-[#1b1b1b] p-4 rounded-xl border border-gray-800 shadow-lg flex items-center gap-4 hover:scale-[1.02] transition">
                  <div className="p-3 bg-emerald-600/20 rounded-full">
                    <UserCheck className="text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Missões</div>
                    <div className="text-2xl font-bold text-white">
                      {overview ? overview.missionsCompleted : completedMissions}
                    </div>
                    <div className="text-xs text-gray-500">de {totalMissions}</div>
                  </div>
                </div>

                {/* DIAS ATIVOS */}
                <div className="bg-[#1b1b1b] p-4 rounded-xl border border-gray-800 shadow-lg flex items-center gap-4 hover:scale-[1.02] transition">
                  <div className="p-3 bg-yellow-600/20 rounded-full">
                    <Clock className="text-yellow-400" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Dias Ativos</div>
                    <div className="text-2xl font-bold text-white">
                      {overview ? overview.daysActive : consistency?.totalDays || "—"}
                    </div>
                    <div className="text-xs text-gray-500">Consistência é tudo</div>
                  </div>
                </div>
              </motion.div>

              {/* GRÁFICO XP */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#1b1b1b] p-5 rounded-xl border border-gray-800 shadow-lg"
              >
                <div className="flex justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white">Evolução de XP</h3>
                  <div className="text-sm text-gray-500">Últimos dias</div>
                </div>

                <div style={{ height: 260 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dailyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#ccc" }} />
                      <YAxis tick={{ fill: "#ccc" }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="xp" stroke="#a78bfa" strokeWidth={3} dot={{ r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* GRÁFICO MISSÕES */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#1b1b1b] p-5 rounded-xl border border-gray-800 shadow-lg"
              >
                <div className="flex justify-between mb-3">
                  <h3 className="text-lg font-semibold">Missões Finalizadas</h3>
                  <div className="text-sm text-gray-500">por dia</div>
                </div>

                <div style={{ height: 200 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dailyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#ccc" }} />
                      <YAxis tick={{ fill: "#ccc" }} />
                      <Tooltip />
                      <Bar dataKey="completed" fill="#10b981" barSize={18} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>

            {/* COLUNA DIREITA */}
            <aside className="space-y-6">
              {/* RESUMO */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#1b1b1b] p-5 rounded-xl border border-gray-800 shadow-lg"
              >
                <div className="flex justify-between mb-3">
                  <h3 className="text-md font-semibold text-white">Resumo Rápido</h3>
                  <Award className="text-gray-400" />
                </div>

                <div className="space-y-3 text-gray-300 text-sm">
                  <div className="flex justify-between">
                    <span>Total de missões:</span>
                    <span className="text-white font-medium">{totalMissions}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Concluídas:</span>
                    <span className="text-emerald-400 font-medium">{completedMissions}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Pendentes:</span>
                    <span className="text-yellow-400 font-medium">{pendingMissions}</span>
                  </div>

                  <hr className="border-gray-700 my-2" />

                  <div>
                    <span>Última missão concluída</span>
                    <div className="text-white font-medium mt-1">
                      {formatDateShort(missions.find((m) => m.completed)?.completedAt)}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* LISTA MISSÕES */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#1b1b1b] p-5 rounded-xl border border-gray-800 shadow-lg max-h-64 overflow-auto"
              >
                <h3 className="text-md font-semibold mb-3">Missões Recentes</h3>
                <div className="space-y-2 text-sm">
                  {missions.slice(0, 12).map((m) => (
                    <div
                      key={m.id}
                      className={`p-3 rounded-md flex justify-between items-center ${
                        m.completed ? "bg-emerald-500/20" : "bg-gray-700/20"
                      }`}
                    >
                      <div>
                        <div className="text-white font-medium">{m.title}</div>
                        <div className="text-gray-400 text-xs">
                          Dia {m.dayNumber} • {m.xp} XP
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">
                        {m.completed ? "Concluída" : "Pendente"}
                      </div>
                    </div>
                  ))}

                  {missions.length === 0 && (
                    <div className="text-gray-400">Nenhuma missão encontrada</div>
                  )}
                </div>
              </motion.div>

              {/* CONSISTÊNCIA */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#1b1b1b] p-5 rounded-xl border border-gray-800 shadow-lg"
              >
                <h3 className="text-md font-semibold mb-3">Consistência</h3>
                <p className="text-gray-400 text-sm mb-3">
                                    Dias ativos:{" "}
                  <span className="text-green-400 font-semibold">
                    {consistency?.totalDays ?? overview?.daysActive ?? 0}
                  </span>
                </p>

                {/* Barra de progresso consistência */}
                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full bg-green-500 transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        ((consistency?.totalDays ?? 0) /
                          (consistency?.days?.length || 30)) *
                          100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>

                <p className="text-gray-400 text-sm">
                  Meta:{" "}
                  <span className="text-white font-semibold">
                    {consistency?.days?.length || 30} dias
                  </span>
                </p>
              </motion.div>
            </aside>
          </div>

          {/* BOTÃO VOLTAR AO TOPO */}
          <div className="flex justify-center mt-10">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 transition-all rounded-xl text-white shadow-lg"
            >
              Voltar ao Topo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

