import React from "react";
import { Award } from "lucide-react";

type Props = { unlocked: string[] };

const BadgeList: React.FC<Props> = ({ unlocked }) => {
  if (!unlocked || unlocked.length === 0) {
    return <div className="text-sm text-gray-400">Nenhuma recompensa ainda — comece completando missões!</div>;
  }

  return (
    <div className="flex gap-3 flex-wrap">
      {unlocked.map((u, idx) => (
        <div key={idx} className="flex items-center gap-2 bg-[#131320] border border-gray-700 rounded-xl px-3 py-2">
          <div className="p-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
            <Award size={18} />
          </div>
          <div>
            <div className="text-sm font-medium">{u}</div>
            <div className="text-xs text-gray-500">Conquistado</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BadgeList;
