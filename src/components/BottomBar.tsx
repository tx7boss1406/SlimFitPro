// src/components/BottomBar.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  ClipboardList,
  Utensils,
  BarChart2,
  Gift,
  User,
} from "lucide-react";

const menuItems = [
  { name: "Home", icon: Home, path: "/home" },
  { name: "Missões", icon: ClipboardList, path: "/missoes" },
  { name: "Receitas", icon: Utensils, path: "/receitas" },
  { name: "Relatórios", icon: BarChart2, path: "/relatorios" },
  { name: "Recompensas", icon: Gift, path: "/recompensas" },
  { name: "Perfil", icon: User, path: "/perfil" },
];

const BottomBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <footer
      className="fixed bottom-0 left-0 right-0 h-16 bg-gray-900/80 backdrop-blur-md border-t border-yellow-400/10 z-50"
      aria-label="Barra inferior de navegação"
    >
      <nav className="max-w-4xl mx-auto h-full flex items-center justify-between px-4 md:px-6">
        {menuItems.map((item) => {
          const active = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              aria-current={active ? "page" : undefined}
              title={item.name}
              className={`
                group flex flex-col items-center justify-center gap-1 text-xs 
                transition-all duration-150 focus:outline-none 
                ${active ? "text-yellow-400" : "text-gray-300 hover:text-yellow-400"}
              `}
            >
              <Icon
                size={20}
                className={active ? "text-yellow-400" : "text-gray-400 group-hover:text-yellow-400"}
              />

              <span className="hidden sm:block font-medium">
                {item.name}
              </span>
            </button>
          );
        })}
      </nav>
    </footer>
  );
};

export default BottomBar;
