import React from "react";
import { motion } from "framer-motion";

type Props = {
  title: string;
  value: number | string;
  hint?: string;
  accent?: "violet" | "teal" | "amber";
};

const colors: Record<string, string> = {
  violet: "from-indigo-500 to-violet-600",
  teal: "from-emerald-400 to-teal-400",
  amber: "from-yellow-400 to-amber-400",
};

const StatCard: React.FC<Props> = ({ title, value, hint, accent = "violet" }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-lg p-4 bg-[#1E1E2E] border border-gray-700 flex items-center gap-4"
    >
      <div
        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colors[accent]} flex items-center justify-center text-white shadow`}
      >
        {/* CORRIGIDO: antes tinha slice(0,3) que cortava o número */}
        <span className="font-bold text-lg">{value}</span>
      </div>

      <div>
        <div className="text-sm text-gray-300">{title}</div>
        {hint && <div className="text-xs text-gray-500">{hint}</div>}
      </div>
    </motion.div>
  );
};

export default StatCard;
