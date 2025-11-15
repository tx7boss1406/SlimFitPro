import React from "react";
import { Bell, UserCircle2, Search } from "lucide-react";
import { motion } from "framer-motion";

const Navbar: React.FC = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full h-16 bg-gray-900/60 border-b border-yellow-400/10 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50 shadow-lg shadow-black/20"
    >
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <motion.div
          initial={{ rotate: -10, scale: 0.8 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-3 h-10 bg-yellow-400 rounded-full"
        ></motion.div>
        <h1 className="text-xl font-bold text-yellow-400 tracking-wide">
          SlimFit<span className="text-white">Pro</span>
        </h1>
      </div>

      {/* Barra de busca */}
      <div className="hidden sm:flex items-center bg-gray-800/50 border border-yellow-400/10 rounded-full px-4 py-2 w-80">
        <Search size={18} className="text-yellow-400 mr-2" />
        <input
          type="text"
          placeholder="Buscar..."
          className="bg-transparent w-full text-sm text-gray-300 placeholder-gray-500 focus:outline-none"
        />
      </div>

      {/* Ícones lado direito */}
      <div className="flex items-center space-x-6">
        <button className="relative hover:text-yellow-400 transition">
          <Bell size={22} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-yellow-400 rounded-full"></span>
        </button>
        <button className="flex items-center hover:text-yellow-400 transition">
          <UserCircle2 size={26} />
        </button>
      </div>
    </motion.header>
  );
};

export default Navbar;
