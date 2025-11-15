// src/pages/Dashboard.tsx
import { Outlet, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Rocket, Dumbbell, Trophy, ChefHat, Star, User } from "lucide-react";
import "../styles/global.css";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#05060A] via-[#0a0d1c] to-[#040507] text-white flex flex-col">
      <motion.nav
        className="flex justify-around py-4 bg-[#0e1122]/70 backdrop-blur-lg shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Link to="/dashboard/missions" className="hover:text-green-400 transition">
          <Rocket /> Missões
        </Link>
        <Link to="/dashboard/recipes" className="hover:text-green-400 transition">
          <ChefHat /> Receitas
        </Link>
        <Link to="/dashboard/workouts" className="hover:text-green-400 transition">
          <Dumbbell /> Treinos
        </Link>
        <Link to="/dashboard/rewards" className="hover:text-green-400 transition">
          <Trophy /> Recompensas
        </Link>
        <Link to="/dashboard/profile" className="hover:text-green-400 transition">
          <User /> Perfil
        </Link>
      </motion.nav>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="py-2 text-center text-xs text-gray-500 border-t border-gray-800">
        SlimFitPro © 2025 — Todos os direitos reservados
      </footer>
    </div>
  );
};

export default Dashboard;
