import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  ClipboardList,
  Utensils,
  BarChart2,
  Gift,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Estado que controla se o usuário forçou o colapso/abertura manualmente
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const menuItems = [
    { name: "Início", icon: <Home size={20} />, path: "/home" },
    { name: "Missões", icon: <ClipboardList size={20} />, path: "/missoes" },
    { name: "Receitas", icon: <Utensils size={20} />, path: "/receitas" },
    { name: "Relatórios", icon: <BarChart2 size={20} />, path: "/relatorios" },
    { name: "Recompensas", icon: <Gift size={20} />, path: "/recompensas" },
    { name: "Perfil", icon: <User size={20} />, path: "/perfil" },
  ];

  // Detecta rota atual e ajusta comportamento automático:
  // - em /home: expandido por padrão e fixo (abaixo do header)
  // - em outras rotas: recolhido automaticamente e não fixo (flui com a página)
  useEffect(() => {
    if (location.pathname === "/home") {
      setIsCollapsed(false);
    } else {
      setIsCollapsed(true);
    }
    // não adicionamos setIsCollapsed à deps para evitar loops
    // queremos apenas reagir à rota mudada
  }, [location.pathname]);

  const isHome = location.pathname === "/home";

  // motion variants para largura (animação suave)
  const variants = {
    expanded: { width: 256 }, // w-64 = 16 * 16 = 256px
    collapsed: { width: 80 }, // w-20 = 5 * 16 = 80px
  };

  return (
    <motion.aside
      // anima largura quando isCollapsed muda
      animate={isCollapsed ? "collapsed" : "expanded"}
      variants={variants}
      initial={false}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      // classes base
      className={`
        bg-gray-900/70 border-r border-yellow-400/10 backdrop-blur-md
        min-h-screen p-4 flex flex-col justify-between
        shadow-lg shadow-black/30 transition-all duration-300
        ${isHome ? "fixed" : "relative"}
        ${isHome ? "top-16 left-0" : "mt-4"} 
        ${isHome ? "z-40" : "z-10"}
      `}
      // acessibilidade
      aria-label="Barra lateral principal"
    >
      {/* Top: botão de recolher/expandir (sempre visível no topo do sidebar)
          Colocado fora do bloco principal para garantir que fique no topo quando recolhido */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          {/* Logo / título quando expandido */}
          {!isCollapsed ? (
            <div
              className="flex items-center gap-3 cursor-default select-none"
              aria-hidden
            >
            <div className="w-2 h-8 bg-yellow-400 rounded-full" />
<span className="text-yellow-400 font-semibold text-lg">
  SlimFit Pro
</span>



            </div>
          ) : (
            <div className="w-full flex items-center justify-start">
              {/* quando recolhido, mantemos um pequeno "marcador" visual */}
              <div className="w-1.5 h-6 bg-yellow-400 rounded-full ml-1" />
            </div>
          )}

          {/* Botão de abrir/fechar: sempre visível para o usuário */}
          <button
            onClick={() => setIsCollapsed((s) => !s)}
            aria-label={isCollapsed ? "Abrir menu" : "Fechar menu"}
            title={isCollapsed ? "Abrir" : "Fechar"}
            className="p-1 rounded-md text-gray-300 hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Menu principal */}
        <nav aria-label="Navegação principal" className="mt-2">
          <ul className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <button
                    title={item.name}
                    onClick={() => navigate(item.path)}
                    className={`
                      w-full flex items-center gap-3 py-3 px-3 rounded-xl
                      transition-all duration-150
                      ${active ? "bg-yellow-400/10 text-yellow-400" : "text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/6"}
                      focus:outline-none focus:ring-2 focus:ring-yellow-400/40
                    `}
                    aria-current={active ? "page" : undefined}
                  >
                    <span className="flex-none text-yellow-400">{item.icon}</span>
                    {/* quando expandido, mostramos o nome */}
                    {!isCollapsed && (
                      <span className="font-medium text-sm tracking-wide text-left">
                        {item.name}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Footer: desliza para esconder quando recolhido */}
      <div className="mt-4">
        {!isCollapsed ? (
          <div className="text-center text-xs text-gray-400 select-none">
            SlimFitPro © 2025
          </div>
        ) : (
          // quando recolhido, deixamos apenas um espaçamento discreto (ou poderia ficar vazio)
          <div className="h-6" aria-hidden />
        )}
      </div>
    </motion.aside>
  );
};

export default Sidebar;
