import React, { useState, Suspense } from "react";
import SimpleLoader from "./Loader";
import { ArrowRightFromLine, Heart } from "lucide-react";

const questions = [
  "What is your best food?",
  "What is your dream vacation?",
  "What do you love the most about life?",
  "What song makes you happy?",
];

export default function LoveInWords() {
  const [step, setStep] = useState(0);
  const [number, setNumber] = useState("");
  const [answer, setAnswer] = useState("");
  const [player, setPlayer] = useState(1);
  const [answers, setAnswers] = useState({ p1: "", p2: "" });

  const leftPlayer = {
    name: "You",
    avatar: "/assets/you.jpg",
  };

  const rightPlayer = {
    name: "Wisdom",
    avatar: "/assets/wisdom.jpg",
  };

  const nextStep = () => setStep((prev) => prev + 1);

  const handleAnswer = () => {
    if (player === 1) {
      setAnswers((prev) => ({ ...prev, p1: answer }));
      setPlayer(2);
      setAnswer("");
      setStep(5); // Player 1 submitted → show answer
    } else {
      setAnswers((prev) => ({ ...prev, p2: answer }));
      setAnswer("");
      setPlayer(1); 
      setStep(3); // Player 2 submitted → back to picking number
    }
  };

  /** 🔹 Unified Player Header */
  const PlayerHeader = ({ status }) => (
    <div className="px-4 pt-4 pb-6 w-full flex flex-col">
      {/* Leave button row */}
      <div className="flex items-center justify-end mb-4">
        <button
          onClick={() => {
            setStep(0);
            setPlayer(1);
            setAnswers({ p1: "", p2: "" });
          }}
          className="flex items-center gap-1 text-sm text-rose-400 hover:text-rose-300 transition-colors"
        >
          <span>Leave</span>
          <ArrowRightFromLine size={16} />
        </button>
      </div>

      {/* Status text */}
      <div className="text-center text-pink-400 font-semibold mb-3 text-[15px]">
        {status}
      </div>

      {/* Players Row */}
      <div className="grid grid-cols-3 items-center gap-0">
        {/* Left Player */}
        <div className="w-full text-left">
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-white/10 shadow-md bg-gradient-to-r from-indigo-700 to-purple-700 min-w-0">
            <span className="text-[13px] font-semibold max-w-full flex-1">
              {leftPlayer.name}
            </span>
            <img
              src={leftPlayer.avatar}
              alt={leftPlayer.name}
              className="h-6 w-6 rounded-full object-cover ring-2 ring-white/30"
            />
          </div>
        </div>

        {/* Heart in middle */}
        <div className="flex justify-center">
          <Heart className="text-pink-400 animate-pulse" size={28} />
        </div>

        {/* Right Player */}
        <div className="w-full text-right">
          <div className="ml-auto flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-white/10 shadow-md bg-gradient-to-r from-indigo-700 to-purple-700 min-w-0">
            <img
              src={rightPlayer.avatar}
              alt={rightPlayer.name}
              className="h-6 w-6 rounded-full object-cover ring-2 ring-white/30"
            />
            <span className="text-[13px] font-semibold max-w-full flex-1">
              {status === "Waiting for Partner..." ? "Waiting..." : rightPlayer.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  /** 🔹 Game Card Wrapper */
  const GameCard = ({ children }) => (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <div className="bg-[#111827]/80 border border-white/10 shadow-md w-80 aspect-square flex items-center justify-center text-center p-6">
        {children}
      </div>
    </div>
  );

  return (
    <Suspense fallback={<SimpleLoader />}>
      <div className="fixed inset-0 z-[999] flex flex-col text-slate-200 bg-gradient-to-br from-[#0b0b1a] via-[#121226] to-[#0d1424] overflow-hidden">
        {/* Step 0 → Start */}
        {step === 0 && (
          <div className="flex flex-col items-center justify-center min-h-screen text-white">
            <h1 className="text-5xl font-extrabold text-pink-500 drop-shadow-lg">
              Love In Words
            </h1>
            <button
              onClick={nextStep}
              className="mt-8 bg-pink-600 px-8 py-3 rounded-full hover:bg-pink-700 transition"
            >
              Start
            </button>
          </div>
        )}

        {/* Step 1 → Connecting */}
        {step === 1 && (
          <div className="flex flex-col items-center min-h-screen">
            <PlayerHeader status="Waiting for Partner..." />
            <GameCard>
              <p className="text-blue-400 text-lg">Connecting...</p>
            </GameCard>
            <div className="flex justify-center mt-6">
              <button
                onClick={nextStep}
                className="bg-green-600 px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
              >
                Connect
              </button>
            </div>
          </div>
        )}

        {/* Step 2 → Partner picks number */}
        {step === 2 && (
          <>
            <PlayerHeader status="Connected" />
            <GameCard>
              <p className="text-blue-400 text-lg">
                Your partner is picking a number...
              </p>
            </GameCard>
            <div className="flex justify-center mt-4">
              <button
                onClick={nextStep}
                className="bg-purple-600 px-6 py-2 rounded hover:bg-purple-700"
              >
                Pick Number
              </button>
            </div>
          </>
        )}

        {/* Step 3 → Pick number */}
        {step === 3 && (
          <>
            <PlayerHeader status="Connected" />
            <GameCard>
              <div className="flex flex-col items-center w-full">
                <h2 className="mb-6 text-md text-blue-400 font-semibold">
                  Pick A Number From 1 - 400
                </h2>
                <div className="relative w-56">
                  <input
                    type="tel"
                    maxLength={3}
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="1 - 400"
                    className="w-full px-4 py-2 pr-10 text-sm text-white placeholder-white bg-transparent border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      if (parseInt(number) >= 1 && parseInt(number) <= 400) {
                        nextStep();
                      }
                    }}
                    disabled={!number}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-400 disabled:text-gray-600"
                  >
                    ➤
                  </button>
                </div>
                {number && (parseInt(number) < 1 || parseInt(number) > 400) && (
                  <p className="mt-3 text-red-400 text-sm font-medium">
                    Please enter a valid number between 1 and 400.
                  </p>
                )}
              </div>
            </GameCard>
          </>
        )}

        {/* Step 4 → Answer input */}
        {step === 4 && (
          <div className="flex flex-col min-h-screen">
            <PlayerHeader status="Connected" />
            <div className="flex flex-col items-center justify-center flex-1 px-4">
              {/* Main Game Content */}
              <div className="bg-[#191129] border border-white/10 shadow-lg w-80 min-h-80 flex flex-col p-6 rounded-3xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  <span className="text-sm font-medium text-blue-400">
                    {questions[(number - 1) % questions.length]}
                  </span>
                </div>
                <div className="bg-[#11111f] rounded-lg p-4 h-36 border border-gray-700/50">
                  {/* Empty box for partner's answer */}
                </div>
              </div>
            </div>
            {/* Bottom input bar */}
            <div className="px-4 pb-4 mt-auto">
              <div className="w-full bg-[#1b1b2f] rounded-full pl-6 pr-2 py-2 flex items-center border border-white/10 shadow-md">
                <input
                  type="text"
                  placeholder="Type your answer..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-sm"
                />
                <button
                  onClick={handleAnswer}
                  disabled={!answer.trim()}
                  className="w-10 h-10 flex items-center justify-center bg-purple-600 rounded-full hover:bg-purple-700 transition disabled:bg-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-white -rotate-45"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 5 → Answer Submitted */}
        {step === 5 && (
          <div className="flex flex-col min-h-screen">
            <PlayerHeader status="Connected" />
            <div className="flex flex-col items-center justify-center flex-1 px-4">
              {/* Main Game Content */}
              <div className="bg-[#191129] border border-white/10 shadow-lg w-80 min-h-80 flex flex-col items-center justify-center p-6 rounded-3xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  <span className="text-sm font-medium text-blue-400">
                    {questions[(number - 1) % questions.length]}
                  </span>
                </div>
                <div className="bg-[#11111f] rounded-lg p-4 h-36 flex items-center justify-center w-full">
                  <p className="text-white text-lg font-semibold">
                    {answers.p1}
                  </p>
                </div>
                <button
                  onClick={() => setStep(4)} // Switch to Player 2 answering
                  className="mt-6 w-full p-3 rounded-xl text-white font-semibold shadow-lg bg-gradient-to-r from-cyan-500 to-purple-500"
                >
                  Okay 👍
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Suspense>
  );
}
