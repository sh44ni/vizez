'use client'

import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 5000, suffix: '+', label: 'AI-processed visas daily' },
  { value: 1, suffix: '', label: 'operator, powered by AI' },
  { value: 60, suffix: 's', label: 'per AI-automated application' },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 1400
          const start = performance.now()

          function tick(now: number) {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setDisplay(Math.round(eased * value))
            if (progress < 1) requestAnimationFrame(tick)
          }

          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref} className="stat-number">
      {display}{suffix}
    </span>
  )
}

export default function StatStrip() {
  return (
    <div className="stat-strip">
      <div className="stat-strip-inner container">
        {stats.map((stat, i) => (
          <div key={i} className="stat-item">
            <AnimatedNumber value={stat.value} suffix={stat.suffix} />
            <span className="stat-desc">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
