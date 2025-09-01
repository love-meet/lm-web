import React, { useState, Suspense } from "react";
import SimpleLoader from "./Loader";

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

  const Header = ({ status }) => (
    <div className="bg-[#141428] px-4 py-3 flex flex-col items-center border-b border-gray-800 overscroll-y-auto">
      <div className="w-full flex justify-between items-center">
        <p className="text-pink-400 font-semibold text-sm">
          {status || "Waiting for Partner..."}
        </p>
        <button
          onClick={() => {
            setStep(0);
            setPlayer(1);
            setAnswers({ p1: "", p2: "" });
          }}
          className="text-red-400 hover:text-red-500 text-sm font-bold"
        >
          Leave ↩
        </button>
      </div>

      <div className="flex justify-center items-center gap-3 mt-3">
        <div className="bg-[#2a1f4d] px-4 py-2 rounded-lg text-xs font-medium">
          {step < 2 ? "Waiting..." : "Connected"}
        </div>
        <span className="text-pink-400">❤️</span>
        <div className="bg-[#2a1f4d] px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/30"
            alt="avatar"
            className="w-5 h-5 rounded-full"
          />
          Wisdom Joe
        </div>
      </div>
    </div>
  );

  const GameCard = ({ children }) => (
    <div className="flex items-center justify-center min-h-[70vh] bg-black text-white">
      <div className="bg-[#0d0d1a] rounded-xl w-[360px] overflow-hidden shadow-lg border border-gray-800">
        <div className="px-4 pb-6 flex justify-center">
          <div className="bg-[#0d0d2b] rounded-lg w-full h-[260px] flex items-center justify-center overflow-y-auto p-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Suspense fallback={<SimpleLoader />}>
      <>
       {/* Step 0 → Start */}
      {step === 0 && (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white overscroll-y-auto">
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
          <>
            <Header status="Waiting for Partner..." />
            <GameCard>
              <p className="text-blue-400 text-lg">Connecting....</p>
            </GameCard>
            <div className="flex justify-center mt-4">
              <button
                onClick={nextStep}
                className="bg-green-600 px-6 py-2 rounded hover:bg-green-700"
              >
                Simulate Connected
              </button>
            </div>
          </>
        )}

        {/* Step 2 → Partner picks number */}
        {step === 2 && (
          <>
            <Header status="Connected" />
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
    <Header status="Connected" />
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
            onClick={nextStep}
            disabled={!number}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-400 disabled:text-gray-600"
          >
            send
          </button>
        </div>
      </div>
    </GameCard>
  </>
)}



        {/* Step 4 → Answer questions */}
        {step === 4 && (
          <>
            <Header status="Connected" />
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
            <Header status="Game Over" />
            <GameCard>
              <div className="flex flex-col items-center text-sm w-full px-2">
                <h2 className="mb-3 text-lg text-purple-300">💖 Final Answers</h2>
                <p className="bg-gray-900 px-6 py-3 rounded-lg border border-pink-600 text-pink-200 shadow-lg mb-2 w-full">
                  Player 1: {answers.p1}
                </p>
                <p className="bg-gray-900 px-6 py-3 rounded-lg border border-pink-600 text-pink-200 shadow-lg w-full">
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
      </>
    </Suspense>
  );
}
