import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import BottomBar from "../components/BottomBar";
import ProfileCard from "../components/ProfileCard";
import StatCard from "../components/StatCard";
import BadgeList from "../components/BadgeList";
import ProgressBar from "../components/ProgressBar";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

type User = {
  id: number;
  name: string;
  email: string;
  level: number;
  xp: number;
  unlocked?: string[] | null;
};

const base = axios.create({
  baseURL: "https://slimfitpro-backend.onrender.com",
  timeout: 8000,
});

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Você precisa estar logado.");
        setLoading(false);
        return;
      }
      const res = await base.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err: any) {
      console.error("fetchProfile error:", err);
      setError("Erro ao carregar perfil");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#1E1E2E] to-[#151523]">
        <div className="text-center text-gray-300">
          <Loader2 className="animate-spin mx-auto mb-4" size={36} />
          Carregando perfil...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#1E1E2E] to-[#151523]">
        <div className="text-red-400">{error}</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1E1E2E] to-[#151523] text-white pb-20">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto p-6 lg:p-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="col-span-1">
            <ProfileCard user={user!} onUpdated={fetchProfile} />
          </div>

          {/* Stats + progress */}
          <div className="col-span-1 lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-b from-[#2A2A3C] to-[#222233] rounded-2xl p-6 shadow-xl border border-[#3A3A4C]">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Progresso</h2>
                <div className="text-sm text-gray-400">Nível {user?.level}</div>
              </div>

              <div className="mt-4">
                <ProgressBar level={user!.level} xp={user!.xp} />
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard
                  title="Missões concluídas"
                  value={0} // mantém sua lógica original
                  hint="Total concluídas"
                  accent="violet"
                />
                <StatCard
                  title="Recompensas"
                  value={(user!.unlocked && user!.unlocked.length) || 0}
                  hint="Desbloqueadas"
                  accent="teal"
                />
                <StatCard
                  title="XP"
                  value={user!.xp}
                  hint="XP atual"
                  accent="amber"
                />
              </div>
            </div>

            {/* Badges */}
            <div className="bg-gradient-to-b from-[#2A2A3C] to-[#222233] rounded-2xl p-6 shadow-xl border border-[#3A3A4C]">
              <h3 className="text-lg font-semibold mb-4">Emblemas & Recompensas</h3>
              <BadgeList unlocked={user!.unlocked || []} />
            </div>

            {/* Quick actions */}
            <div className="bg-gradient-to-b from-[#2A2A3C] to-[#222233] rounded-2xl p-6 shadow-xl border border-[#3A3A4C]">
              <h3 className="text-lg font-semibold mb-4">Ações rápidas</h3>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => window.location.assign("/missoes")}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 shadow hover:scale-[1.01] transition"
                >
                  Ver Missões
                </button>
                <button
                  onClick={() => window.location.assign("/recompensas")}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-400 shadow hover:scale-[1.01] transition"
                >
                  Ver Recompensas
                </button>
                <button
                  onClick={() => alert("Exportando dados...")}
                  className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700"
                >
                  Exportar dados
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-right text-sm text-gray-500">
          Última sincronização: agora
        </div>
      </motion.div>

      <BottomBar />
    </div>
  );
};

export default ProfilePage;
