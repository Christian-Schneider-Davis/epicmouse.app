import { useEffect, useRef, useState } from 'react'

/**
 * Lightweight scroll-reveal hook powered by IntersectionObserver.
 * Pairs with the `[data-reveal]` / `[data-visible]` CSS in index.css —
 * no animation library dependency required.
 *
 * @param {Object} options
 * @param {number} options.threshold - fraction of element visible before reveal fires
 * @param {string} options.rootMargin - margin around the root for early/late triggering
 * @param {boolean} options.once - keep the element visible after first reveal
 */
export function useReveal({ threshold = 0.18, rootMargin = '0px 0px -8% 0px', once = true } = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Respect users who've asked for reduced motion — just show content.
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setVisible(false)
          }
        })
      },
      { threshold, rootMargin }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, visible]
}

export default useReveal
