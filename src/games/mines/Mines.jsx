import React, { Suspense, useState, useEffect } from 'react'
import { Heart, ArrowRightFromLine, Send } from 'lucide-react'
import MinesLoader from './Loader'

function FitText({ text, className = '', suffix = '....', title }) {
  const containerRef = React.useRef(null)
  const measureRef = React.useRef(null)
  const [display, setDisplay] = useState(text || '')

  const recompute = React.useCallback(() => {
    const container = containerRef.current
    const measurer = measureRef.current
    if (!container || !measurer) return

    const full = String(text || '')
    measurer.textContent = full
    const fits = () => measurer.scrollWidth <= container.clientWidth

    if (fits()) {
      setDisplay(full)
      return
    }

    let low = 0
    let high = full.length
    let best = ''
    while (low <= high) {
      const mid = Math.floor((low + high) / 2)
      const candidate = full.slice(0, Math.max(0, mid)) + suffix
      measurer.textContent = candidate
      if (fits()) {
        best = candidate
        low = mid + 1
      } else {
        high = mid - 1
      }
    }
    setDisplay(best || suffix.trim())
  }, [text, suffix])

  useEffect(() => {
    setDisplay(text || '')
  }, [text])

  useEffect(() => {
    recompute()
    const container = containerRef.current
    if (!container) return
    const ro = new ResizeObserver(() => recompute())
    ro.observe(container)
    return () => ro.disconnect()
  }, [recompute])

  return (
    <span
      ref={containerRef}
      className={`block overflow-hidden whitespace-nowrap ${className}`}
      title={title ?? text}
    >
      <span
        aria-hidden
        style={{
          position: 'absolute',
          visibility: 'hidden',
          whiteSpace: 'nowrap',
          pointerEvents: 'none'
        }}
        ref={measureRef}
      />
      {display}
    </span>
  )
}

export default function Mines() {
  const [guess, setGuess] = useState('')
  const [roundState, setRoundState] = useState('playing')
  const [winner, setWinner] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const totalRounds = 20
  const [round, setRound] = useState(1)
  const [myPoints, setMyPoints] = useState(0)
  const [opponentPoints, setOpponentPoints] = useState(0)
  const [correctAnswer] = useState("rubik's cube")
  const [gameStatus, setGameStatus] = useState('waiting')

  useEffect(() => {
    const timer = setTimeout(() => {
      setGameStatus('playing')
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const prevBody = document.body.style.overflow
    const prevHtml = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevBody
      document.documentElement.style.overflow = prevHtml
    }
  }, [])

  const normalizeText = (text) => text.replace(/\s+/g, '').toLowerCase()

  const onSubmit = (e) => {
    e.preventDefault()
    const userGuess = normalizeText(guess)
    const correct = normalizeText(correctAnswer)

    if (userGuess === correct) {
      handleWin('me')
    }

    setGuess('')
  }

  const handleWin = (who) => {
    setWinner(who)
    setModalOpen(true)
    if (who === 'me') {
      setMyPoints((p) => p + 1)
    } else if (who === 'opponent') {
      setOpponentPoints((p) => p + 1)
    }
  }

  const proceedToNext = () => {
    setModalOpen(false)
    setRoundState('loading')
    setTimeout(() => {
      setRoundState('playing')
      setWinner(null)
      setRound((r) => Math.min(totalRounds, r + 1))
    }, 1500)
  }

  const progress = Math.max(0, Math.min(100, (round / totalRounds) * 100))
  const knobLeft = `calc(${progress}% - 8px)`

  return (
    <Suspense fallback={<MinesLoader name={"Mines Game"} />}>
      <div
        className="fixed inset-0 z-[999] flex flex-col text-slate-200 bg-gradient-to-br from-[#0b0b1a] via-[#121226] to-[#0d1424] overflow-y-auto overscroll-y-none"
        role="dialog"
        aria-modal="true"
      >
        
        <div className="px-4 pt-4 pb-6 flex items-center justify-end">
          <button className="flex items-center gap-1 text-sm text-rose-400 hover:text-rose-300 transition-colors">
            <span>Leave</span>
            <ArrowRightFromLine size={16} />
          </button>
        </div>

        
        <div className="px-4 mt-4 mb-2">
          <div className="grid grid-cols-3 items-center gap-0">
           
            <div className="w-full">
              <div className="text-white text-sm mb-1">{opponentPoints}</div>
              <div className="flex items-center justify-center gap-2 px-2.5 py-1.5 rounded-xl border border-white/10 shadow-md bg-gradient-to-r from-indigo-700 to-purple-700 min-w-0">
                {gameStatus === 'waiting' ? (
                  <span className="text-xs font-medium text-slate-300">Waiting...</span>
                ) : (
                  <>
                    <FitText text={'Benny Love'} className="text-[13px] font-semibold max-w-full flex-1" />
                    <img
                      src="/assets/default-profile.jpg"
                      alt="opponent"
                      className="h-6 w-6 rounded-full object-cover ring-2 ring-white/30"
                    />
                  </>
                )}
              </div>
            </div>

           
            <div className="flex flex-col items-center">
              <span className="text-[13px] font-extrabold text-pink-400">
                {round}/{totalRounds}
              </span>
              <Heart className="text-white mt-1 mb-2" size={14} fill="#ffffff" />
              <div className="relative w-20 sm:w-28 md:w-32 h-1 rounded-full bg-slate-800 overflow-hidden mt-1 mb-1">
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-blue-500 to-pink-500"
                  style={{ width: `${progress}%` }}
                />
                <span
                  className="absolute -top-1 h-3 w-3 rounded-full bg-white/90 shadow-md"
                  style={{ left: knobLeft }}
                />
              </div>
            </div>

            
            <div className="w-full text-right">
              <div className="text-white text-sm mb-1">{myPoints}</div>
              <div className="ml-auto flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-white/10 shadow-md bg-gradient-to-r from-indigo-700 to-purple-700 min-w-0">
                <img
                  src="/assets/default-profile.jpg"
                  alt="me"
                  className="h-6 w-6 rounded-full object-cover ring-2 ring-white/30"
                />
                <FitText text={'Wisdom am'} className="text-[13px] font-semibold max-w-full flex-1" />
              </div>
            </div>
          </div>
        </div>

      
        <div className="px-4 mt-4">
          <div className="bg-[#111827]/70 rounded-2xl border border-white/10 p-4 shadow-inner">
            {roundState === 'playing' ? (
              <>
                <p className="text-center text-sm opacity-80 mb-3">
                  What is the name of this puzzle?
                </p>
                <div className="bg-slate-700/40 rounded-xl p-2 overflow-hidden">
                  <img
                    src="/gallery/FB_IMG_1702736841815_1.jpg"
                    alt="puzzle"
                    className="w-full h-44 object-cover rounded-lg"
                  />
                </div>
              </>
            ) : (
              <div className="h-48 rounded-xl grid place-items-center bg-slate-800/60 border border-white/5">
                <span className="text-lg font-semibold text-gradient-accent">
                  Loading new puzzle...
                </span>
              </div>
            )}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="text-center">
                <FitText
                  text={'Benny Love'}
                  className="text-sm font-semibold max-w-[140px] mx-auto"
                />
                <div className="mt-2 bg-slate-800/80 text-xs px-3 py-2 rounded-lg border border-white/5 inline-block">
                  Thinking
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold">Me</div>
                <div className="mt-2 bg-slate-800/80 text-xs px-3 py-2 rounded-lg border border-white/5 inline-block">
                  Thinking
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1" />

        {/* Input */}
        <form onSubmit={onSubmit} className="px-4 pb-5">
          <div className="flex items-center gap-2 bg-slate-800/80 border border-white/10 rounded-2xl px-3 py-2">
            <input
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Guess your word"
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="shrink-0 grid place-items-center h-9 w-9 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-white/10 text-slate-300 hover:text-white transition-colors"
              aria-label="Send guess"
            >
              <Send size={16} />
            </button>
          </div>
        </form>

        
        {modalOpen && (
          <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-sm">
            <div className="w-[85%] max-w-sm bg-slate-900/80 border border-white/10 rounded-2xl p-5 shadow-xl">
              <div className="text-center text-[18px] font-extrabold mb-4">
                <span className="text-gradient-accent">
                  {winner === 'me' ? 'You got it!!!' : 'Benny got it!!!'}
                </span>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={proceedToNext}
                  className="px-4 py-2 rounded-full text-sm font-semibold border bg-blue-600/80 hover:bg-blue-600 border-blue-400/50"
                >
                  Okay✌️
                </button>
              </div>
            </div>
          </div>
        )}

        {gameStatus === 'waiting' && <MinesLoader name={"Mines Game"}  />}
      </div>
    </Suspense>
  )
}
