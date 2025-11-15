import React from "react";
import { motion } from "framer-motion";

type Props = { level: number; xp: number };

const ProgressBar: React.FC<Props> = ({ level, xp }) => {
  // Example: 100 XP per level (adjust to your logic)
  const percent = Math.min(100, Math.round((xp / 100) * 100));

  return (
    <div>
      <div className="flex items-center justify-between text-sm text-gray-300">
        <div>XP {xp}</div>
        <div>{percent}%</div>
      </div>
      <div className="w-full h-3 bg-gray-700 rounded-full mt-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8 }}
          className="h-full bg-gradient-to-r from-indigo-500 to-violet-600"
        />
      </div>
    </div>
  );
};

export default ProgressBar;
