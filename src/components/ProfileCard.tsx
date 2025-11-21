import React, { useState, useRef } from "react";
import { Camera, Edit3, Save, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

type Props = {
  user: {
    id: number;
    name: string;
    email: string;
    level: number;
    xp: number;
    unlocked?: string[] | null;
    photo?: string | null;

    // CAMPOS QUE FALTAVAM ❗❗❗
    completedMissions?: number;
    totalMissions?: number;
  };
  onUpdated?: () => void;
};

const base = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 8000,
})


const ProfileCard: React.FC<Props> = ({ user, onUpdated }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name || "");
  const [uploadPreview, setUploadPreview] = useState<string | null>(user.photo || null);
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("token");

  const pick = (f?: File) => {
    if (!f) return;
    setFile(f);
    const r = new FileReader();
    r.onload = (e) => setUploadPreview(String(e.target?.result || ""));
    r.readAsDataURL(f);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) pick(f);
  };

  const saveProfile = async () => {
    if (!token) return alert("Você precisa estar logado");
    setSaving(true);
    try {
      // 1) Upload do avatar
      if (file) {
        const fd = new FormData();
        fd.append("avatar", file);
        await base.post("/users/avatar", fd, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });
      }

      // 2) Atualiza nome
      await base.put(
        "/users",
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setEditing(false);
      if (onUpdated) onUpdated();
      alert("Perfil atualizado");
    } catch (err) {
      console.error("saveProfile err:", err);
      alert("Erro ao salvar perfil");
    } finally {
      setSaving(false);
    }
  };

  const avatarSrc = uploadPreview || user.photo || undefined;
  const initials = user.name ? user.name.split(" ").map((s) => s[0]).slice(0, 2).join("") : "U";

  return (
    <motion.div className="bg-gradient-to-b from-[#2A2A3C] to-[#222233] rounded-2xl p-6 shadow-xl border border-[#3A3A4C]">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div
            className="w-28 h-28 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center text-2xl font-bold text-white"
            style={{
              boxShadow: `0 10px 30px rgba(124,58,237,0.25)`,
            }}
          >
            {avatarSrc ? (
              <img src={avatarSrc.startsWith("/") ? avatarSrc : avatarSrc} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <span>{initials}</span>
            )}
          </div>

          <label className="absolute bottom-0 right-0 bg-gray-800 p-2 rounded-full border border-gray-700 cursor-pointer" title="Alterar foto">
            <Camera size={16} />
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </label>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              {editing ? (
                <input value={name} onChange={(e) => setName(e.target.value)} className="bg-transparent border-b border-gray-600 p-1 text-lg font-semibold" />
              ) : (
                <h2 className="text-xl font-semibold">{user.name}</h2>
              )}
              <p className="text-sm text-gray-400">@{user.email.split("@")[0]} • <span className="text-xs text-gray-500">{user.email}</span></p>
            </div>

            <div className="flex items-center gap-2">
              {editing ? (
                <>
                  <button onClick={() => setEditing(false)} className="p-2 rounded-md bg-gray-800">
                    <XCircle size={16} />
                  </button>
                  <button onClick={saveProfile} disabled={saving} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm shadow">
                    <Save size={14} /> {saving ? "Salvando..." : "Salvar"}
                  </button>
                </>
              ) : (
                <button onClick={() => setEditing(true)} className="p-2 rounded-md bg-gray-800 hover:bg-gray-700">
                  <Edit3 size={16} />
                </button>
              )}
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-300">Nível {user.level} — <span className="text-indigo-300">{user.xp} XP</span></p>

            {/* 🔥 Aqui nada muda, mas agora user.completedMissions e totalMissions EXISTEM */}
            <p className="mt-1 text-xs text-gray-400">
              Missões concluídas: <span className="text-indigo-300">{user.completedMissions ?? 0}</span> / {user.totalMissions ?? 0}
            </p>
          </div>

          <div className="mt-4 flex gap-2">
            <button onClick={() => window.location.assign("/missoes")} className="px-3 py-1 rounded-lg bg-gray-800">Ver missões</button>
            <button onClick={() => window.location.assign("/recompensas")} className="px-3 py-1 rounded-lg bg-gray-700">Ver recompensas</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
