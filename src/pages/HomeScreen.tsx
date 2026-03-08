import { useNavigate } from 'react-router-dom'
import { useGameStore, TIME_OPTIONS } from '../store/gameStore'

export default function HomeScreen() {
  const navigate = useNavigate()
  const reset = useGameStore((s) => s.reset)
  const duration = useGameStore((s) => s.duration)
  const setDuration = useGameStore((s) => s.setDuration)

  const handlePlay = () => {
    reset()
    navigate('/game')
  }

  const formatTime = (seconds: number) => {
    if (seconds >= 60) return `${seconds / 60}m`
    return `${seconds}s`
  }

  return (
    <div className="h-full w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center justify-center gap-8">
      <div className="text-center">
        <h1 className="text-6xl font-black text-white tracking-tight mb-2">
          TAP
        </h1>
        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 tracking-tight">
          DUEL
        </h1>
        <p className="text-white/50 text-sm mt-4 tracking-wide">
          2 PLAYERS - 1 DEVICE
        </p>
      </div>

      {/* Time selector */}
      <div className="flex flex-col items-center gap-3">
        <span className="text-white/50 text-xs tracking-widest uppercase">Duration</span>
        <div className="flex gap-2">
          {TIME_OPTIONS.map((t) => (
            <button
              key={t}
              onClick={() => setDuration(t)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                duration === t
                  ? 'bg-white text-indigo-900 scale-110 shadow-lg'
                  : 'bg-white/10 text-white/70 active:scale-95'
              }`}
            >
              {formatTime(t)}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handlePlay}
        className="mt-4 px-12 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-xl rounded-full shadow-lg shadow-orange-500/30 active:scale-95 transition-transform"
      >
        PLAY
      </button>

      <div className="absolute bottom-8 text-white/30 text-xs text-center px-8">
        Hold the phone between two players. Each player taps their half of the screen!
      </div>
    </div>
  )
}
