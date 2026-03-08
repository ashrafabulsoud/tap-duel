import { useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'
import PlayerArea from '../components/PlayerArea'
import TimerDisplay from '../components/TimerDisplay'

export default function GameScreen() {
  const navigate = useNavigate()
  const {
    gameState,
    player1Score,
    player2Score,
    timeLeft,
    countdownValue,
    setGameState,
    incrementScore,
    setTimeLeft,
    setCountdownValue,
  } = useGameStore()

  const timerRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)

  // Start countdown on mount
  useEffect(() => {
    setGameState('countdown')
    setCountdownValue(3)

    let count = 3
    const interval = setInterval(() => {
      count--
      if (count > 0) {
        setCountdownValue(count)
      } else {
        setCountdownValue(0)
        clearInterval(interval)
        setGameState('playing')
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Game timer using requestAnimationFrame
  useEffect(() => {
    if (gameState !== 'playing') return

    startTimeRef.current = performance.now()
    setTimeLeft(60)

    const tick = (now: number) => {
      const elapsed = (now - startTimeRef.current) / 1000
      const remaining = Math.max(0, 60 - elapsed)
      setTimeLeft(remaining)

      if (remaining <= 0) {
        setGameState('finished')
        return
      }

      timerRef.current = requestAnimationFrame(tick)
    }

    timerRef.current = requestAnimationFrame(tick)

    return () => {
      if (timerRef.current) cancelAnimationFrame(timerRef.current)
    }
  }, [gameState])

  // Navigate to result when finished
  useEffect(() => {
    if (gameState === 'finished') {
      navigate('/result')
    }
  }, [gameState, navigate])

  const handleTap = useCallback((player: 1 | 2) => {
    if (useGameStore.getState().gameState !== 'playing') return
    incrementScore(player)
  }, [incrementScore])

  const isPlaying = gameState === 'playing'

  return (
    <div className="h-full w-full flex flex-col relative">
      {/* Countdown overlay */}
      {gameState === 'countdown' && (
        <div className="absolute inset-0 z-30 bg-black/80 flex items-center justify-center">
          <span
            key={countdownValue}
            className="text-8xl font-black text-white animate-countdown-pop"
          >
            {countdownValue > 0 ? countdownValue : 'GO!'}
          </span>
        </div>
      )}

      {/* Player 1 - top (rotated 180 so they read it from the other side) */}
      <PlayerArea
        score={player1Score}
        onTap={() => handleTap(1)}
        disabled={!isPlaying}
        color="bg-gradient-to-b from-blue-600 to-blue-800"
        label="Player 1"
        isRotated
      />

      {/* Timer in the middle */}
      {isPlaying && <TimerDisplay timeLeft={timeLeft} />}

      {/* Divider */}
      <div className="h-1 bg-white/20 relative z-10" />

      {/* Player 2 - bottom */}
      <PlayerArea
        score={player2Score}
        onTap={() => handleTap(2)}
        disabled={!isPlaying}
        color="bg-gradient-to-t from-red-600 to-red-800"
        label="Player 2"
      />
    </div>
  )
}
