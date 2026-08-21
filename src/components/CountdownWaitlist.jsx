import { useEffect, useState } from 'react'
import { LuGift, LuUsers, LuMail } from 'react-icons/lu'
import WaitlistForm from './shared/WaitlistForm.jsx'
import Reveal from './shared/Reveal.jsx'
import Sparkles from './shared/Sparkles.jsx'

const LAUNCH_TARGET = new Date('2026-09-21T00:00:00')

function getTimeLeft() {
  const diff = Math.max(0, LAUNCH_TARGET.getTime() - Date.now())
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function CountdownWaitlist() {
  const [time, setTime] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Min', value: time.minutes },
    { label: 'Sec', value: time.seconds },
  ]

  return (
    <section id="waitlist" className="countdown section">
      <div className="countdown-bg" aria-hidden="true">
        <Sparkles count={12} />
      </div>

      <div className="container">
        <Reveal type="scale" className="countdown-card">
          <span className="eyebrow countdown-eyebrow">
            <LuGift size={14} /> Early access perks
          </span>
          <h2 className="countdown-title">Be first through the door</h2>
          <p className="countdown-sub">
            Join the waitlist for early access, a founding-writer badge in the app, and updates as we get closer
            to launch. Estimated arrival:
          </p>

          <div className="countdown-timer" role="timer" aria-live="off">
            {units.map((u) => (
              <div className="countdown-unit" key={u.label}>
                <span className="countdown-unit-value">{String(u.value).padStart(2, '0')}</span>
                <span className="countdown-unit-label">{u.label}</span>
              </div>
            ))}
          </div>

          <div className="countdown-form">
            <WaitlistForm variant="stacked" buttonText="Notify me at launch" />
          </div>

          <div className="countdown-meta">
            <span className="countdown-meta-item">
              <LuUsers size={16} />Early access, first come first served &middot;
            </span>
            <span className="countdown-meta-item">
              <LuMail size={18} />One launch email only, promise &middot; We’ll never sell or share your information &middot;
            </span>
          </div>
        </Reveal>
      </div>

      <style>{`
        .countdown {
          position: relative;
          overflow: hidden;
        }
        .countdown-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--cape-dark) 0%, #362a52 55%, #4a2f4f 100%);
        }
        .countdown-card {
          position: relative;
          z-index: 2;
          max-width: 640px;
          margin-inline: auto;
          text-align: center;
          padding: clamp(40px, 6vw, 64px) clamp(24px, 5vw, 56px);
          background: hsl(0 0% 100% / 0.06);
          border: 1px solid hsl(0 0% 100% / 0.14);
          border-radius: var(--radius-lg);
          backdrop-filter: blur(10px);
        }
        .countdown-eyebrow {
          background: hsl(0 0% 100% / 0.14);
          color: white;
        }
        .countdown-title {
          font-size: clamp(1.9rem, 4vw, 2.6rem);
          color: white;
          margin-top: 18px;
          margin-bottom: 14px;
        }
        .countdown-sub {
          color: hsl(270deg 30% 88%);
          margin-bottom: 30px;
          max-width: 460px;
          margin-inline: auto;
        }
        .countdown-timer {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 34px;
          flex-wrap: wrap;
        }
        .countdown-unit {
          background: hsl(0 0% 100% / 0.09);
          border: 1px solid hsl(0 0% 100% / 0.14);
          border-radius: 16px;
          width: 76px;
          padding: 14px 0 12px;
        }
        .countdown-unit-value {
          display: block;
          font-family: var(--font-display);
          font-size: 1.7rem;
          font-weight: 700;
          color: white;
          font-variant-numeric: tabular-nums;
        }
        .countdown-unit-label {
          display: block;
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: hsl(270deg 30% 78%);
          margin-top: 4px;
        }
        .countdown-form {
          max-width: 420px;
          margin-inline: auto;
        }
        .countdown-form .waitlist-input {
          border-color: transparent;
        }
        .countdown-meta {
          margin-top: 22px;
          display: flex;
          justify-content: center;
          gap: 22px;
          flex-wrap: wrap;
        }
        .countdown-meta-item {
          display: inline-flex;
          align-items: flex-start;
          gap: 6px;
          font-size: 0.82rem;
          color: hsl(270deg 30% 84%);
          font-weight: 500;
        }
        .countdown-meta-item svg {
          flex-shrink: 0;
          margin-top: 2px; 
        }
      `}</style>
    </section>
  )
}
