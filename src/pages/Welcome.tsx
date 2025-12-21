import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-pink-400 to-purple-500 flex items-center justify-center px-4">
      {/* CARD CENTRAL */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 animate-fadeIn">

        {/* HEADER */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-3 animate-pulse">💜</div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Vamos criar uma experiência feita pra você
          </h1>

          <p className="text-sm text-gray-600">
            Em poucos passos, vamos ajustar o app ao seu ritmo, seus objetivos e
            sua rotina.
          </p>
        </div>

        {/* BLOCO DE BENEFÍCIOS */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-5">
          <p className="text-sm font-semibold text-gray-800 mb-3 text-center">
            O que vamos personalizar 👇
          </p>

          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <span>✔️</span>
              <span>Treinos no seu ritmo</span>
            </li>
            <li className="flex items-center gap-2">
              <span>✔️</span>
              <span>Metas realistas pra sua rotina</span>
            </li>
            <li className="flex items-center gap-2">
              <span>✔️</span>
              <span>Planos que cabem no seu dia</span>
            </li>
            <li className="flex items-center gap-2">
              <span>✔️</span>
              <span>Foco no que mais te incomoda hoje</span>
            </li>
            <li className="flex items-center gap-2">
              <span>✔️</span>
              <span>Sem cobranças irreais</span>
            </li>
          </ul>
        </div>

        {/* BLOCO DE CONFIANÇA */}
        <div className="bg-pink-50 border border-pink-100 rounded-2xl p-4 mb-5">
          <p className="text-xs text-gray-700 text-center">
            💡 <strong>Não é uma prova.</strong>  
            Não existem respostas certas ou erradas.  
            Tudo aqui serve apenas para adaptar o app à sua realidade.
          </p>
        </div>

        {/* INDICADOR DE TEMPO */}
        <div className="flex justify-center mb-6">
          <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
            ⏱️ Leva menos de 2 minutos
          </span>
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate("/quiz")}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:scale-[1.02] active:scale-[0.98] transition"
        >
          Começar minha personalização
        </button>

        {/* MICROCOPY FINAL */}
        <p className="text-[11px] text-gray-500 text-center mt-4">
          ✨ Feito para mulheres reais, com rotinas reais
        </p>
      </div>
    </div>
  );
}
