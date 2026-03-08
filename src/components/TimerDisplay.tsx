interface TimerDisplayProps {
  timeLeft: number
}

export default function TimerDisplay({ timeLeft }: TimerDisplayProps) {
  const seconds = Math.ceil(timeLeft)
  const isLow = seconds <= 10

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold shadow-lg backdrop-blur-md ${
          isLow
            ? 'bg-red-500/80 text-white animate-pulse'
            : 'bg-black/60 text-white'
        }`}
      >
        {seconds}
      </div>
    </div>
  )
}
