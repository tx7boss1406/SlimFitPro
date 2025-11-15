import React, { useRef } from "react";
import ParticleBackground from "../components/ParticleBackground";
import RegisterForm from "../components/RegisterForm";

const Register: React.FC = () => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    cardRef.current.style.transform = `perspective(600px) rotateY(${x / 40}deg) rotateX(${-y / 40}deg) scale(1.01)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform =
      "perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)";
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Fundo animado */}
      <ParticleBackground />

      {/* Bloco principal com efeito 3D suave */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative z-10 transition-transform duration-300 ease-out"
      >
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
