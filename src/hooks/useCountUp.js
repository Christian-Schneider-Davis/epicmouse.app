import { useEffect, useState } from 'react'

/**
 * Animates a number from 0 -> target once `start` becomes true.
 * Used for the "dopamine hit" stat counters — small satisfying detail
 * that mirrors the in-app reward feedback the product itself provides.
 */
export function useCountUp(target, { start = true, duration = 1400 } = {}) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return
    let raf
    const startTime = performance.now()
    const from = 0

    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(from + (target - from) * eased))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, target, duration])

  return value
}

export default useCountUp
