import { useCallback, useRef, useState } from 'react'

interface Ripple {
  id: number
  x: number
  y: number
}

interface PlayerAreaProps {
  score: number
  onTap: () => void
  disabled: boolean
  color: string
  label: string
  isRotated?: boolean
}

export default function PlayerArea({ score, onTap, disabled, color, label, isRotated }: PlayerAreaProps) {
  const rippleId = useRef(0)
  const [ripples, setRipples] = useState<Ripple[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const scoreRef = useRef<HTMLSpanElement>(null)

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (disabled) return
    e.preventDefault()
    e.stopPropagation()

    onTap()

    if (scoreRef.current) {
      scoreRef.current.style.transform = 'scale(1.15)'
      setTimeout(() => {
        if (scoreRef.current) scoreRef.current.style.transform = 'scale(1)'
      }, 80)
    }

    if (circleRef.current) {
      circleRef.current.classList.remove('animate-bounce-tap')
      void circleRef.current.offsetWidth
      circleRef.current.classList.add('animate-bounce-tap')
    }

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const id = ++rippleId.current

      setRipples((prev) => [...prev, { id, x, y }])
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id))
      }, 400)
    }
  }, [disabled, onTap])

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      className={`relative flex-1 flex flex-col items-center justify-center overflow-hidden ${color} ${isRotated ? 'rotate-180' : ''}`}
      style={{ touchAction: 'none' }}
    >
      <div className="text-white/60 text-sm font-semibold tracking-widest uppercase mb-2">
        {label}
      </div>

      <div
        ref={circleRef}
        className="w-28 h-28 rounded-full bg-white/20 border-4 border-white/40 flex items-center justify-center backdrop-blur-sm"
      >
        <span
          ref={scoreRef}
          className="text-5xl font-black text-white tabular-nums transition-transform duration-75"
        >
          {score}
        </span>
      </div>

      <div className="mt-3 text-white/40 text-xs tracking-wide">
        TAP!
      </div>

      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute w-20 h-20 rounded-full bg-white/30 animate-ripple pointer-events-none"
          style={{
            left: ripple.x - 40,
            top: ripple.y - 40,
          }}
        />
      ))}
    </div>
  )
}
