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

  const nextStep = () => setStep((prev) => prev + 1);

  const handleAnswer = () => {
    if (player === 1) {
      setAnswers((prev) => ({ ...prev, p1: answer }));
      setPlayer(2);
      setAnswer("");
      setStep(4);
    } else {
      setAnswers((prev) => ({ ...prev, p2: answer }));
      setStep(5);
    }
  };

  const PlayerHeader = ({ status }) => (
    <div className="px-0 pt-4 pb-2 w-full">
      <div className="flex flex-col items-center text-center w-full">
        {/* Top status + leave button */}
        <div className="flex items-center justify-between w-full bg-[#111827]/90 border border-white/10 px-4 py-2 shadow-lg mb-3">
          <p className="text-pink-400 font-semibold text-sm">{status}</p>
          <button
            onClick={() => {
              setStep(0);
              setPlayer(1);
              setAnswers({ p1: "", p2: "" });
            }}
            className="flex items-center gap-1 text-sm text-rose-400 hover:text-rose-300 transition-colors"
          >
            Leave <ArrowRightFromLine size={16} />
          </button>
        </div>

        {/* Players + heart */}
        <div className="flex items-center justify-between w-full">
          {/* Left player (You) */}
          <div className="flex items-center justify-center bg-slate-800/80 px-3 py-2 border border-white/10 flex-1">
            <img
              src="/assets/default-profile.jpg"
              alt="you"
              className="h-8 w-8 object-cover"
            />
            <span className="ml-2 text-sm font-medium">You</span>
          </div>

          <Heart className="text-pink-400 mx-3 animate-pulse" size={20} />

          {/* Right player */}
          <div className="flex items-center justify-center bg-slate-800/80 px-3 py-2 border border-white/10 flex-1">
            <span className="text-sm font-medium text-gray-300">
              {status === "Waiting for Partner..." ? "Waiting..." : "Partner"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

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
                Simulate Connected
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

        {/* Step 4 → Answer questions */}
        {step === 4 && (
          <>
            <PlayerHeader status="Connected" />
            <GameCard>
              <div className="flex flex-col items-center">
                <h2 className="mb-4 text-md text-pink-300 text-center">
                  Player {player}, answer this: <br />✨{" "}
                  {questions[(number - 1) % questions.length]} ✨
                </h2>
                <input
                  type="text"
                  placeholder="Type your answer..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="px-4 py-2 text-black rounded-lg border border-gray-400 focus:ring-2 focus:ring-pink-500 w-60"
                />
                <button
                  onClick={handleAnswer}
                  disabled={!answer.trim()}
                  className="mt-3 bg-pink-600 px-6 py-2 rounded hover:bg-pink-700 transition disabled:bg-gray-600"
                >
                  Send
                </button>
              </div>
            </GameCard>
          </>
        )}

        {/* Step 5 → Game Over */}
        {step === 5 && (
          <>
            <PlayerHeader status="Game Over" />
            <GameCard>
              <div className="flex flex-col items-center text-sm w-full px-2">
                <h2 className="mb-3 text-lg text-purple-300">💖 Final Answers</h2>
                <p className="bg-gray-900 px-6 py-3 border border-pink-600 text-pink-200 shadow-lg mb-2 w-full">
                  Player 1: {answers.p1}
                </p>
                <p className="bg-gray-900 px-6 py-3 border border-pink-600 text-pink-200 shadow-lg w-full">
                  Player 2: {answers.p2}
                </p>
                <button
                  onClick={() => {
                    setStep(0);
                    setPlayer(1);
                    setAnswers({ p1: "", p2: "" });
                  }}
                  className="mt-6 bg-blue-600 px-8 py-3 rounded-full hover:bg-blue-700 transition"
                >
                  Play Again
                </button>
              </div>
            </GameCard>
          </>
        )}
      </div>
    </Suspense>
  );
}
