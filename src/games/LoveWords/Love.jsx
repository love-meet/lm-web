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
    <div className="px-4 pt-4 pb-2 w-full flex flex-col">
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
    <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
      <div className="bg-[#111827]/80 border border-white/10 shadow-md w-full max-w-md aspect-square flex items-center justify-center text-center p-6">
        {children}
      </div>
    </div>
  );

  return (
    <Suspense fallback={<SimpleLoader />}>
      <div className="h-full flex flex-col text-slate-200 bg-gradient-to-br from-[#0b0b1a] via-[#121226] to-[#0d1424] overflow-hidden">
        {/* Step 0 → Start */}
        {step === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-white p-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-pink-500 drop-shadow-lg text-center">
              Love In Words
            </h1>
            <p className="mt-4 text-gray-300 text-center max-w-md">
              Connect with a partner and share your thoughts in this fun word game!
            </p>
            <button
              onClick={nextStep}
              className="mt-8 bg-pink-600 px-8 py-3 rounded-full hover:bg-pink-700 transition text-lg font-medium"
            >
              Start Game
            </button>
          </div>
        )}

        {/* Step 1 → Connecting */}
        {step === 1 && (
          <div className="flex-1 flex flex-col">
            <PlayerHeader status="Waiting for Partner..." />
            <GameCard>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-blue-400 text-lg font-medium">Looking for a partner...</p>
                <p className="text-gray-400 text-sm mt-2">This may take a moment</p>
              </div>
            </GameCard>
            <div className="flex justify-center p-4">
              <button
                onClick={nextStep}
                className="bg-green-600 px-6 py-2 rounded-lg shadow hover:bg-green-700 transition font-medium"
              >
                Find Partner
              </button>
            </div>
          </div>
        )}

        {/* Step 2 → Partner picks number */}
        {step === 2 && (
          <div className="flex-1 flex flex-col">
            <PlayerHeader status="Connected" />
            <GameCard>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-blue-400 text-lg font-medium text-center">
                  Your partner is picking a number...
                </p>
                <p className="text-gray-400 text-sm mt-2 text-center">
                  Get ready for your turn!
                </p>
              </div>
            </GameCard>
            <div className="flex justify-center p-4">
              <button
                onClick={nextStep}
                className="bg-purple-600 px-6 py-2 rounded-lg hover:bg-purple-700 transition font-medium"
              >
                My Turn
              </button>
            </div>
          </div>
        )}

        {/* Step 3 → Pick number */}
        {step === 3 && (
          <div className="flex-1 flex flex-col">
            <PlayerHeader status="Your Turn" />
            <GameCard>
              <div className="flex flex-col items-center w-full">
                <h2 className="mb-6 text-lg text-blue-400 font-semibold text-center">
                  Pick A Number
                </h2>
                <p className="text-gray-300 text-sm mb-4 text-center">Choose a number between 1 and 400</p>
                <div className="relative w-48">
                  <input
                    type="number"
                    min="1"
                    max="400"
                    value={number}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '' || (parseInt(val) >= 1 && parseInt(val) <= 400)) {
                        setNumber(val);
                      }
                    }}
                    placeholder="1 - 400"
                    className="w-full px-4 py-3 pr-12 text-center text-lg text-white bg-white/5 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      if (number && parseInt(number) >= 1 && parseInt(number) <= 400) {
                        nextStep();
                      }
                    }}
                    disabled={!number}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-400 disabled:text-gray-600 p-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
                {number && (parseInt(number) < 1 || parseInt(number) > 400) && (
                  <p className="mt-3 text-red-400 text-sm font-medium">
                    Please enter a number between 1 and 400
                  </p>
                )}
              </div>
            </GameCard>
          </div>
        )}

        {/* Step 4 → Answer input */}
        {step === 4 && (
          <div className="flex-1 flex flex-col">
            <PlayerHeader status={`Question #${number}`} />
            <GameCard>
              <div className="flex flex-col items-center w-full h-full">
                <div className="bg-white/5 p-6 rounded-xl w-full max-w-md">
                  <h2 className="text-xl font-bold text-pink-400 mb-6 text-center">
                    {questions[number % questions.length]}
                  </h2>
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full h-32 p-3 mb-6 text-white bg-white/10 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                  />
                  <button
                    onClick={handleAnswer}
                    disabled={!answer.trim()}
                    className="w-full bg-pink-600 px-6 py-3 rounded-lg hover:bg-pink-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Answer
                  </button>
                </div>
              </div>
            </GameCard>
          </div>
        )}

        {/* Step 5 → Answer Submitted */}
        {step === 5 && (
          <div className="flex-1 flex flex-col">
            <PlayerHeader status="Answer Submitted" />
            <GameCard>
              <div className="flex flex-col items-center w-full">
                <div className="w-full max-w-md bg-white/5 p-6 rounded-xl">
                  <p className="text-gray-300 mb-2 text-sm font-medium">Question:</p>
                  <p className="text-pink-400 font-medium mb-6">
                    {questions[number % questions.length]}
                  </p>
                  
                  <p className="text-gray-300 mb-2 text-sm font-medium">Your answer:</p>
                  <div className="bg-white/10 p-4 rounded-lg mb-8">
                    <p className="text-white">{player === 1 ? answers.p1 : answers.p2}</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-400 text-sm">Waiting for partner's answer...</p>
                  </div>
                </div>
              </div>
            </GameCard>
          </div>
        )}
      </div>
    </Suspense>
  );
}
