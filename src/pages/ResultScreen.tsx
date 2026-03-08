import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'

export default function ResultScreen() {
  const navigate = useNavigate()
  const { player1Score, player2Score, reset } = useGameStore()

  const winner =
    player1Score > player2Score
      ? 'Player 1'
      : player2Score > player1Score
        ? 'Player 2'
        : null

  const handlePlayAgain = () => {
    reset()
    navigate('/game')
  }

  const handleHome = () => {
    reset()
    navigate('/')
  }

  return (
    <div className="h-full w-full bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 flex flex-col items-center justify-center gap-6 px-8">
      <h1 className="text-4xl font-black text-white mb-4">
        {winner ? `${winner} Wins!` : "It's a Tie!"}
      </h1>

      <div className="w-full max-w-xs space-y-4">
        {/* Player 1 */}
        <div
          className={`flex items-center justify-between p-4 rounded-2xl ${
            player1Score >= player2Score
              ? 'bg-blue-600 ring-2 ring-yellow-400'
              : 'bg-blue-600/40'
          }`}
        >
          <span className="text-white font-semibold">Player 1</span>
          <span className="text-3xl font-black text-white tabular-nums">
            {player1Score}
          </span>
        </div>

        {/* Player 2 */}
        <div
          className={`flex items-center justify-between p-4 rounded-2xl ${
            player2Score >= player1Score
              ? 'bg-red-600 ring-2 ring-yellow-400'
              : 'bg-red-600/40'
          }`}
        >
          <span className="text-white font-semibold">Player 2</span>
          <span className="text-3xl font-black text-white tabular-nums">
            {player2Score}
          </span>
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={handlePlayAgain}
          className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg rounded-full active:scale-95 transition-transform"
        >
          Play Again
        </button>
        <button
          onClick={handleHome}
          className="px-8 py-3 bg-white/10 text-white font-bold text-lg rounded-full active:scale-95 transition-transform border border-white/20"
        >
          Home
        </button>
      </div>
    </div>
  )
}
