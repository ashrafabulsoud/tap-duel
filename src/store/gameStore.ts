import { create } from 'zustand'

type GameState = 'idle' | 'countdown' | 'playing' | 'finished'

interface GameStore {
  gameState: GameState
  player1Score: number
  player2Score: number
  timeLeft: number
  countdownValue: number

  setGameState: (state: GameState) => void
  incrementScore: (player: 1 | 2) => void
  setTimeLeft: (time: number) => void
  setCountdownValue: (value: number) => void
  reset: () => void
}

export const useGameStore = create<GameStore>((set) => ({
  gameState: 'idle',
  player1Score: 0,
  player2Score: 0,
  timeLeft: 60,
  countdownValue: 3,

  setGameState: (gameState) => set({ gameState }),
  incrementScore: (player) =>
    set((state) => ({
      [player === 1 ? 'player1Score' : 'player2Score']:
        player === 1 ? state.player1Score + 1 : state.player2Score + 1,
    })),
  setTimeLeft: (timeLeft) => set({ timeLeft }),
  setCountdownValue: (countdownValue) => set({ countdownValue }),
  reset: () =>
    set({
      gameState: 'idle',
      player1Score: 0,
      player2Score: 0,
      timeLeft: 60,
      countdownValue: 3,
    }),
}))
