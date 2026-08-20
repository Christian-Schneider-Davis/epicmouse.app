import { LuZap, LuRepeat, LuUsers, LuShieldCheck } from 'react-icons/lu'
import Reveal from './shared/Reveal.jsx'

const PRINCIPLES = [
  {
    icon: LuZap,
    title: 'Immediate feedback',
    body: 'ADHD brains are drawn to fast, tangible rewards. Epic Mouse App responds in real time instead of asking you to wait for "someday" motivation.',
  },
  {
    icon: LuRepeat,
    title: 'Novelty over repetition',
    body: 'A living story keeps giving you new things to see and unlock, so writing stays interesting instead of turning into another dull checkbox.',
  },
  {
    icon: LuUsers,
    title: 'Structure without pressure',
    body: 'Gentle encouragement and just enough external structure to get moving, none of the pressure.',
  },
  {
    icon: LuShieldCheck,
    title: 'Zero shame, ever',
    body: 'No red streak-breaking warnings. No guilt-trip push notifications. Progress is celebrated; lapses are simply... not a big deal.',
  },
]

export default function ADHDScience() {
  return (
    <section className="science section-tight">
      <div className="container science-grid">
        <Reveal type="left" className="science-copy">
          <span className="eyebrow">Why it actually works</span>
          <h2 className="section-title">Designed around how your brain gets things done</h2>
          <p className="section-sub" style={{ marginBottom: 28 }}>
            Epic Mouse isn't just "cute" — every mechanic is built around the same idea: motivation lasts longer
            when reward comes quickly and pressure stays low. That's the whole design brief.
          </p>
          <p className="science-disclaimer">
            Epic Mouse app is a motivation and focus companion, not a medical or clinical treatment for ADHD.
          </p>
        </Reveal>

        <div className="science-principles">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} type="right" delay={i * 90} className="science-item">
              <span className="science-icon">
                <p.icon size={20} />
              </span>
              <div>
                <h3 className="science-item-title">{p.title}</h3>
                <p className="science-item-body">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        .science-grid {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: clamp(32px, 6vw, 72px);
          align-items: start;
        }
        .science-copy {
          position: sticky;
          top: 120px;
        }
        .science-disclaimer {
          font-size: 0.82rem;
          color: var(--ink-faint);
          border-left: 3px solid var(--butter-dark);
          padding-left: 12px;
          font-style: italic;
        }
        .science-principles {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .science-item {
          display: grid;
          grid-template-columns: 44px 1fr;
          gap: 16px;
          background: var(--paper);
          border: 1px solid hsl(262deg 30% 92%);
          border-radius: var(--radius-md);
          padding: 22px;
          box-shadow: var(--shadow-sm);
        }
        .science-icon {
          width: 44px;
          height: 44px;
          border-radius: 13px;
          background: var(--cape-light);
          color: var(--cape);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .science-item-title {
          font-size: 1.05rem;
          margin-bottom: 6px;
        }
        .science-item-body {
          font-size: 0.92rem;
          color: var(--ink-soft);
        }

        @media (max-width: 900px) {
          .science-grid {
            grid-template-columns: 1fr;
          }
          .science-copy {
            position: static;
            text-align: center;
          }
        }
      `}</style>
    </section>
  )
}
