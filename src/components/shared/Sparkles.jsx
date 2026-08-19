import { useMemo } from 'react'
import { LuSparkle, LuStar } from 'react-icons/lu'

const ICONS = [LuSparkle, LuStar]

/**
 * Scattered decorative sparkles — echoes the glittering "magic moment"
 * from the source animation when the mouse's companion transforms.
 * Purely decorative, aria-hidden.
 */
export default function Sparkles({ count = 10, area = 'full', className = '' }) {
  const sparks = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const Icon = ICONS[i % ICONS.length]
      return {
        id: i,
        Icon,
        top: `${Math.round(Math.random() * 100)}%`,
        left: `${Math.round(Math.random() * 100)}%`,
        size: 10 + Math.round(Math.random() * 16),
        delay: `${(Math.random() * 6).toFixed(2)}s`,
        duration: `${(3 + Math.random() * 3).toFixed(2)}s`,
        opacity: (0.35 + Math.random() * 0.5).toFixed(2),
      }
    })
  }, [count])

  return (
    <div className={`sparkle-field sparkle-field--${area} ${className}`} aria-hidden="true">
      {sparks.map((s) => (
        <span
          key={s.id}
          className="sparkle-item"
          style={{
            top: s.top,
            left: s.left,
            animationDelay: s.delay,
            animationDuration: s.duration,
            opacity: s.opacity,
            color: s.id % 3 === 0 ? 'var(--butter-dark)' : s.id % 3 === 1 ? 'var(--coral)' : 'var(--cape)',
          }}
        >
          <s.Icon size={s.size} />
        </span>
      ))}
      <style>{`
        .sparkle-field {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
        }
        .sparkle-item {
          position: absolute;
          animation-name: sparkle-pop;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }
      `}</style>
    </div>
  )
}
