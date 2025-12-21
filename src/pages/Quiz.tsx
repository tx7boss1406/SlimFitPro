import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ====== DADOS BASE ====== */
const ages = Array.from({ length: 60 }, (_, i) => i + 14);
const targetWeights = Array.from({ length: 50 }, (_, i) => i + 45);
const months = [1, 2, 3, 4, 6, 9, 12];

export default function Quiz() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
useEffect(() => {
  if (!localStorage.getItem("quiz_completed")) {
    localStorage.removeItem("slimfit_quiz");
  }
}, []);


  const [data, setData] = useState({
    age: 22,
    goal: "",
    difficulty: "",
    time: "",
    experience: "",
    feeling: "",
    focus: "",
    targetWeight: 60,
    timeToGoal: 3,
    commitment: "",
  });
// 🔧 MAPA DE LABEL — COLOQUE AQUI
  const timeLabelMap: Record<string, string> = {
    short: "5–10 min",
    medium: "10–20 min",
    long: "20–30 min",
    xlong: "30+ min",
  };
  useEffect(() => {
  if (step === 3) {
    setData((prev) => ({
      ...prev,
      time: "",
    }));
  }
}, [step]);

  const stepsTotal = 10;
  const progress = ((step + 1) / stepsTotal) * 100;

  function next() {
    setStep((s) => s + 1);
  }

  function finish() {
    localStorage.setItem("slimfit_quiz", JSON.stringify(data));
    localStorage.setItem("quiz_completed", "true");
    navigate("/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-pink-400 to-purple-500 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 text-gray-900">

        {/* PROGRESSO */}
        <div className="w-full h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
          <div
            className="h-2 bg-gradient-to-r from-pink-500 to-purple-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* STEP 0 — IDADE (VISUAL PREMIUM) */}
{step === 0 && (
  <div className="flex flex-col items-center justify-between h-full py-6">

    {/* TÍTULO SIMPLES */}
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900">
       Qual é a sua idade?
      </h2>
      <p className="text-sm text-gray-500 mt-1">
       Isso define o ritmo ideal pra você.
      </p>
    </div>

    {/* WHEEL CENTRAL */}
    <div className="flex-1 flex items-center justify-center w-full">
      <div className="relative w-full max-w-xs">

       {/* DESTAQUE CENTRAL — NÃO BLOQUEIA CLIQUE */}
<div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-16 rounded-2xl bg-gradient-to-r from-pink-500/15 to-purple-500/15 pointer-events-none" />


        <div className="h-56 overflow-y-scroll snap-y snap-mandatory flex flex-col items-center">
          {ages.map((age) => (
            <div
              key={age}
              onClick={() => setData({ ...data, age })}
              className={`snap-center cursor-pointer py-3 transition-all ${
                data.age === age
                  ? "text-4xl font-bold text-pink-600 scale-110"
                  : "text-2xl text-gray-400"
              }`}
            >
              {age}
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* BOTÃO */}
    <div className="w-full">
      <button
        onClick={next}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold text-lg"
      >
        Continuar
      </button>
    </div>
  </div>
)}


      {/* STEP 1 — DEFINIÇÃO DE FOCO (GRID 2x2) */}
{step === 1 && (
  <div className="flex flex-col py-6 animate-fade-in">

    {/* CABEÇALHO */}
    <div className="text-center mb-5">
      <h2 className="text-2xl font-bold text-gray-900">
        Escolha a direção do seu SlimFit
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Isso define como o app vai funcionar pra você
      </p>
    </div>

    {/* GRID 2x2 */}
    <div className="grid grid-cols-2 gap-4">
      {[
        {
          value: "Emagrecer",
          icon: "🔥",
          title: "Emagrecer",
        },
        {
          value: "Equilibrio",
          icon: "⚖️",
          title: "Equilíbrio",
        },
        {
          value: "Rotina",
          icon: "🌱",
          title: "Rotina",
        },
        {
          value: "Autoestima",
          icon: "💖",
          title: "Autoestima",
        },
      ].map((item) => {
        const active = data.goal === item.value;

        return (
          <button
            key={item.value}
            onClick={() =>
              setData((prev) => ({
                ...prev,
                goal: item.value,
              }))
            }
            className={`relative p-4 rounded-2xl border transition-all duration-300 text-center
              ${
                active
                  ? "bg-gradient-to-br from-pink-500 to-purple-500 text-white shadow-lg border-transparent scale-[1.02]"
                  : "bg-white text-gray-800 border-gray-200 hover:border-pink-300"
              }
            `}
          >
            {/* ÍCONE */}
            <div className="text-4xl mb-2">{item.icon}</div>

            {/* TEXTO */}
            <h3 className="font-semibold text-sm">
              {item.title}
            </h3>

            {/* CHECK */}
            {active && (
              <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white text-pink-500 flex items-center justify-center text-xs font-bold shadow">
                ✓
              </div>
            )}
          </button>
        );
      })}
    </div>

    {/* BOTÃO */}
    <div className="mt-6">
      <button
        onClick={next}
        disabled={!data.goal}
        className={`w-full py-4 rounded-2xl text-lg font-semibold transition-all
          ${
            data.goal
              ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg"
              : "bg-gray-200 text-gray-400"
          }
        `}
      >
        Aplicar essa direção
      </button>
    </div>

  </div>
)}

{/* STEP 2 — DESAFIOS (DIAGNÓSTICO EM GRID 2x2) */}
{step === 2 && (
  <div className="flex flex-col py-6 animate-fade-in">

    {/* CABEÇALHO */}
    <div className="text-center mb-5">
      <h2 className="text-2xl font-bold text-gray-900">
        Ajustando à sua realidade 🧩
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        O que mais atrapalha hoje?
      </p>
    </div>

    {/* GRID 2x2 */}
    <div className="grid grid-cols-2 gap-4">
      {[
        {
          value: "Falta de constância",
          icon: "😩",
          title: "Constância",
        },
        {
          value: "Falta de tempo",
          icon: "⏰",
          title: "Pouco tempo",
        },
        {
          value: "Ansiedade / compulsão",
          icon: "🍫",
          title: "Ansiedade",
        },
        {
          value: "Falta de energia",
          icon: "💤",
          title: "Baixa energia",
        },
      ].map((item) => {
        const active = data.difficulty === item.value;

        return (
          <button
            key={item.value}
            onClick={() =>
              setData((prev) => ({
                ...prev,
                difficulty: item.value,
              }))
            }
            className={`relative p-4 rounded-2xl border transition-all duration-300 text-center
              ${
                active
                  ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg border-transparent scale-[1.02]"
                  : "bg-white text-gray-800 border-gray-200 hover:border-purple-300"
              }
            `}
          >
            {/* ÍCONE */}
            <div className="text-4xl mb-2">{item.icon}</div>

            {/* TEXTO */}
            <h3 className="font-semibold text-sm">
              {item.title}
            </h3>

            {/* CHECK */}
            {active && (
              <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white text-purple-500 flex items-center justify-center text-xs font-bold shadow">
                ✓
              </div>
            )}
          </button>
        );
      })}
    </div>

    {/* FEEDBACK CURTO */}
    {data.difficulty && (
      <p className="text-xs text-center text-gray-600 mt-4">
        ✨ Vamos ajustar o app considerando{" "}
        <strong>{data.difficulty.toLowerCase()}</strong>
      </p>
    )}

    {/* BOTÃO */}
    <div className="mt-6">
      <button
        onClick={next}
        disabled={!data.difficulty}
        className={`w-full py-4 rounded-2xl text-lg font-semibold transition-all
          ${
            data.difficulty
              ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg"
              : "bg-gray-200 text-gray-400"
          }
        `}
      >
        Continuar
      </button>
    </div>

  </div>
)}


      {/* STEP 3 — TEMPO DISPONÍVEL */}
{step === 3 && (
  <>
    {/* TÍTULO */}
    <div className="text-center mb-5">
      <h2 className="quiz-title">
        Quanto tempo por dia você consegue dedicar?
      </h2>
      <p className="quiz-subtitle">
        O SlimFit vai se adaptar à sua rotina real
      </p>
    </div>

    {/* SELETOR DE TEMPO */}
    <div className="grid grid-cols-2 gap-4 my-6">
      {[
        { key: "short", label: "5–10 min", icon: "⚡", desc: "Rápido" },
        { key: "medium", label: "10–20 min", icon: "🌱", desc: "Equilibrado" },
        { key: "long", label: "20–30 min", icon: "🔥", desc: "Comprometido" },
        { key: "xlong", label: "30+ min", icon: "🏆", desc: "Alta dedicação" },
      ].map((item) => {
        const active = data.time === item.key;

        return (
          <button
            key={item.key}
            onClick={() =>
              setData((prev) => ({
                ...prev,
                time: item.key,
              }))
            }
            className={`p-4 rounded-2xl border transition-all text-center
              ${
                active
                  ? "bg-gradient-to-br from-pink-500 to-purple-500 text-white shadow-lg scale-[1.03] border-transparent"
                  : "bg-white text-gray-700 border-gray-200 hover:border-pink-300"
              }
            `}
          >
            <div className="text-3xl mb-2">{item.icon}</div>
            <div className="text-sm font-semibold">{item.label}</div>
            <div
              className={`text-xs mt-1 ${
                active ? "text-white/90" : "text-gray-500"
              }`}
            >
              {item.desc}
            </div>
          </button>
        );
      })}
    </div>

    {/* FEEDBACK CURTO — 100% CORRETO */}
    {data.time && (
      <p className="text-xs text-center text-gray-600 mb-4">
        ✨ Treinos ajustados para sessões de{" "}
        <strong>{timeLabelMap[data.time]}</strong>
      </p>
    )}

    <PrimaryButton disabled={!data.time} onClick={next}>
      Continuar
    </PrimaryButton>
  </>
)}


       {/* STEP 4 — EXPERIÊNCIA COM EXERCÍCIOS */}
{step === 4 && (
  <div className="flex flex-col py-6 animate-fade-in">

    {/* CABEÇALHO */}
    <div className="text-center mb-5">
      <h2 className="text-2xl font-bold text-gray-900">
        Seu nível atual 💪
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Isso ajusta intensidade, ritmo e progressão
      </p>
    </div>

    {/* GRID 2x2 */}
    <div className="grid grid-cols-2 gap-4">
      {[
        {
          value: "Iniciante",
          icon: "🌱",
          title: "Iniciante",
          desc: "Começando agora",
        },
        {
          value: "Já tentei antes",
          icon: "🙂",
          title: "Recomeçar",
          desc: "Já tentou antes",
        },
        {
          value: "Intermediária",
          icon: "💪",
          title: "Intermediária",
          desc: "Já tem ritmo",
        },
        {
          value: "Avançada",
          icon: "🏋️",
          title: "Avançada",
          desc: "Treina sempre",
        },
      ].map((item) => {
        const active = data.experience === item.value;

        return (
          <button
            key={item.value}
            onClick={() =>
              setData((prev) => ({
                ...prev,
                experience: item.value,
              }))
            }
            className={`relative p-4 rounded-2xl border transition-all duration-300 text-center
              ${
                active
                  ? "bg-gradient-to-br from-pink-500 to-purple-500 text-white shadow-lg scale-[1.03] border-transparent"
                  : "bg-white text-gray-800 border-gray-200 hover:border-pink-300"
              }
            `}
          >
            {/* ÍCONE */}
            <div className="text-4xl mb-2">{item.icon}</div>

            {/* TEXTO */}
            <h3 className="font-semibold text-sm">
              {item.title}
            </h3>
            <p
              className={`text-xs mt-1 ${
                active ? "text-white/90" : "text-gray-500"
              }`}
            >
              {item.desc}
            </p>

            {/* CHECK */}
            {active && (
              <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white text-pink-500 flex items-center justify-center text-xs font-bold shadow">
                ✓
              </div>
            )}
          </button>
        );
      })}
    </div>

    {/* FEEDBACK CURTO */}
    {data.experience && (
      <p className="text-xs text-center text-gray-600 mt-4">
        ✨ Treinos adaptados para nível{" "}
        <strong>{data.experience.toLowerCase()}</strong>
      </p>
    )}

    {/* BOTÃO */}
    <div className="mt-6">
      <button
        onClick={next}
        disabled={!data.experience}
        className={`w-full py-4 rounded-2xl text-lg font-semibold transition-all
          ${
            data.experience
              ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg"
              : "bg-gray-200 text-gray-400"
          }
        `}
      >
        Continuar
      </button>
    </div>

  </div>
)}


        {/* STEP 5 — SENTIMENTO COM O CORPO */}
{step === 5 && (
  <div className="flex flex-col py-6 animate-fade-in">

    {/* CABEÇALHO */}
    <div className="text-center mb-5">
      <h2 className="text-2xl font-bold text-gray-900">
        Como você se sente hoje? 💭
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Isso ajuda o SlimFit a ajustar a abordagem certa
      </p>
    </div>

    {/* GRID 2x2 */}
    <div className="grid grid-cols-2 gap-4">
      {[
        {
          value: "Insatisfeita",
          icon: "😔",
          title: "Insatisfeita",
          desc: "Não muito bem",
        },
        {
          value: "Neutra",
          icon: "😐",
          title: "Neutra",
          desc: "Nem bem nem mal",
        },
        {
          value: "Bem",
          icon: "🙂",
          title: "Bem",
          desc: "Me sinto ok",
        },
        {
          value: "Confiante",
          icon: "😍",
          title: "Confiante",
          desc: "Me sinto forte",
        },
      ].map((item) => {
        const active = data.feeling === item.value;

        return (
          <button
            key={item.value}
            onClick={() =>
              setData((prev) => ({
                ...prev,
                feeling: item.value,
              }))
            }
            className={`relative p-4 rounded-2xl border transition-all duration-300 text-center
              ${
                active
                  ? "bg-gradient-to-br from-pink-500 to-purple-500 text-white shadow-lg scale-[1.03] border-transparent"
                  : "bg-white text-gray-800 border-gray-200 hover:border-pink-300"
              }
            `}
          >
            {/* ÍCONE */}
            <div className="text-4xl mb-2">{item.icon}</div>

            {/* TEXTO */}
            <h3 className="font-semibold text-sm">
              {item.title}
            </h3>
            <p
              className={`text-xs mt-1 ${
                active ? "text-white/90" : "text-gray-500"
              }`}
            >
              {item.desc}
            </p>

            {/* CHECK */}
            {active && (
              <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white text-pink-500 flex items-center justify-center text-xs font-bold shadow">
                ✓
              </div>
            )}
          </button>
        );
      })}
    </div>

    {/* FEEDBACK CURTO */}
    {data.feeling && (
      <p className="text-xs text-center text-gray-600 mt-4">
        ✨ Vamos adaptar a experiência ao seu momento atual
      </p>
    )}

    {/* BOTÃO */}
    <div className="mt-6">
      <button
        onClick={next}
        disabled={!data.feeling}
        className={`w-full py-4 rounded-2xl text-lg font-semibold transition-all
          ${
            data.feeling
              ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg"
              : "bg-gray-200 text-gray-400"
          }
        `}
      >
        Continuar
      </button>
    </div>

  </div>
)}


       {/* STEP 6 — FOCO PRINCIPAL */}
{step === 6 && (
  <div className="flex flex-col py-6 animate-fade-in">

    {/* CABEÇALHO */}
    <div className="text-center mb-5">
      <h2 className="text-2xl font-bold text-gray-900">
        O que você quer melhorar agora? 🎯
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Vamos priorizar isso no seu plano
      </p>
    </div>

    {/* GRID 2x2 */}
    <div className="grid grid-cols-2 gap-4">
      {[
        {
          value: "Peso",
          icon: "🔥",
          title: "Peso",
          desc: "Reduzir medidas",
        },
        {
          value: "Energia",
          icon: "⚡",
          title: "Energia",
          desc: "Disposição diária",
        },
        {
          value: "Disciplina",
          icon: "🧠",
          title: "Disciplina",
          desc: "Criar constância",
        },
        {
          value: "Autoestima",
          icon: "💖",
          title: "Autoestima",
          desc: "Se sentir melhor",
        },
      ].map((item) => {
        const active = data.focus === item.value;

        return (
          <button
            key={item.value}
            onClick={() =>
              setData((prev) => ({
                ...prev,
                focus: item.value,
              }))
            }
            className={`relative p-4 rounded-2xl border transition-all duration-300 text-center
              ${
                active
                  ? "bg-gradient-to-br from-pink-500 to-purple-500 text-white shadow-lg scale-[1.03] border-transparent"
                  : "bg-white text-gray-800 border-gray-200 hover:border-pink-300"
              }
            `}
          >
            {/* ÍCONE */}
            <div className="text-4xl mb-2">{item.icon}</div>

            {/* TEXTO */}
            <h3 className="font-semibold text-sm">
              {item.title}
            </h3>
            <p
              className={`text-xs mt-1 ${
                active ? "text-white/90" : "text-gray-500"
              }`}
            >
              {item.desc}
            </p>

            {/* CHECK */}
            {active && (
              <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white text-pink-500 flex items-center justify-center text-xs font-bold shadow">
                ✓
              </div>
            )}
          </button>
        );
      })}
    </div>

    {/* FEEDBACK CURTO */}
    {data.focus && (
      <p className="text-xs text-center text-gray-600 mt-4">
        ✨ Vamos priorizar <strong>{data.focus.toLowerCase()}</strong> no seu plano
      </p>
    )}

    {/* BOTÃO */}
    <div className="mt-6">
      <button
        onClick={next}
        disabled={!data.focus}
        className={`w-full py-4 rounded-2xl text-lg font-semibold transition-all
          ${
            data.focus
              ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg"
              : "bg-gray-200 text-gray-400"
          }
        `}
      >
        Continuar
      </button>
    </div>

  </div>
)}

        {/* STEP 7 — META PERSONALIZADA */}
{step === 7 && (
  <div className="flex flex-col py-6 animate-fade-in">

    {/* CABEÇALHO */}
    <div className="text-center mb-5">
      <h2 className="text-2xl font-bold text-gray-900">
        Vamos definir sua meta 🎯
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Um objetivo possível, do seu jeito
      </p>
    </div>

    {/* BLOCO DE DEFINIÇÃO */}
    <div className="grid grid-cols-2 gap-4 my-6">

      {/* PESO */}
      <div className="bg-white rounded-2xl border border-gray-200 py-4 px-2 text-center">
        <p className="text-xs font-medium text-gray-500 mb-2">
          Peso desejado
        </p>

        <Wheel
          small
          values={targetWeights}
          value={data.targetWeight}
          onChange={(v) =>
            setData((prev) => ({
              ...prev,
              targetWeight: v,
            }))
          }
        />

        <p className="text-xs text-gray-400 mt-2">em kg</p>
      </div>

      {/* TEMPO */}
      <div className="bg-white rounded-2xl border border-gray-200 py-4 px-2 text-center">
        <p className="text-xs font-medium text-gray-500 mb-2">
          Pra quando?
        </p>

        <Wheel
          small
          values={months}
          suffix=" meses"
          value={data.timeToGoal}
          onChange={(v) =>
            setData((prev) => ({
              ...prev,
              timeToGoal: v,
            }))
          }
        />

        <p className="text-xs text-gray-400 mt-2">sem pressa</p>
      </div>

    </div>

    {/* FEEDBACK INTELIGENTE */}
    {data.targetWeight && data.timeToGoal && (
      <div className="bg-pink-50 border border-pink-100 rounded-xl px-4 py-3 mb-5 animate-fadeIn">
        <p className="text-xs text-gray-700 text-center leading-relaxed">
          ✨ Objetivo definido: chegar em{" "}
          <strong>{data.targetWeight} kg</strong> em{" "}
          <strong>{data.timeToGoal} meses</strong>, com equilíbrio e constância.
        </p>
      </div>
    )}

    {/* BOTÃO */}
    <button
      onClick={next}
      className="w-full py-4 rounded-2xl text-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg transition-all"
    >
      Continuar
    </button>

  </div>
)}


        {/* STEP 8 — COMPROMISSO */}
        {step === 8 && (
          <>
            <h2 className="quiz-title">
              Você topa começar do seu jeito?
            </h2>

            <Options
              options={["💜 Sim, com leveza", "🌱 Quero tentar"]}
              value={data.commitment}
              onSelect={(v) => setData({ ...data, commitment: v })}
            />

            <PrimaryButton disabled={!data.commitment} onClick={next}>
              Continuar
            </PrimaryButton>
          </>
        )}

        {/* STEP 9 — FINAL */}
        {step === 9 && (
          <>
            <h2 className="quiz-title">Tudo pronto ✨</h2>
            <p className="quiz-subtitle mb-6">
              O SlimFit foi ajustado especialmente pra você.
            </p>

            <PrimaryButton onClick={finish}>
              Entrar no app
            </PrimaryButton>
          </>
        )}
      </div>
    </div>
  );
}

/* ===== COMPONENTES ===== */

function Wheel({
  values,
  value,
  onChange,
  suffix = "",
  small,
}: {
  values: number[];
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
  small?: boolean;
}) {
  return (
    <div
      className={`${
        small ? "h-32" : "h-40"
      } overflow-y-scroll snap-y snap-mandatory flex flex-col items-center`}
    >
      {values.map((v) => (
        <div
          key={v}
          onClick={() => onChange(v)}
          className={`snap-center cursor-pointer py-2 transition ${
            value === v
              ? "text-pink-600 font-bold scale-125"
              : "text-gray-500"
          } ${small ? "text-2xl" : "text-3xl"}`}
        >
          {v}
          {suffix}
        </div>
      ))}
    </div>
  );
}

function Options({
  options,
  value,
  onSelect,
}: {
  options: string[];
  value: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div className="space-y-3 my-6">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          className={`w-full py-3 rounded-xl border transition text-left px-4 ${
            value === opt
              ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white border-transparent"
              : "bg-white text-gray-700"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function PrimaryButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-semibold disabled:opacity-40"
    >
      {children}
    </button>
  );
}
