import { LuCircleSlash, LuTimerOff, LuFrown, LuArrowRight, LuHeart } from 'react-icons/lu'
import Reveal from './shared/Reveal.jsx'

const PAIN_POINTS = [
  {
    icon: LuCircleSlash,
    title: 'The blank page feels like a wall',
    body: "You know what you want to write. Somehow that doesn't make starting any easier.",
  },
  {
    icon: LuTimerOff,
    title: 'Motivation shows up... eventually',
    body: 'Willpower is not a reliable co-author. You need something that meets your brain where it is.',
  },
  {
    icon: LuFrown,
    title: 'Guilt is not a great writing partner',
    body: "Streak-shaming apps and rigid habit trackers just add shame to the pile. That's not fuel, that's friction.",
  },
]

export default function ProblemSolution() {
  return (
    <section className="problem section-tight">
      <div className="container">
        <Reveal type="fade" className="section-head">
          <span className="eyebrow">For ADHD &amp; distracted brains</span>
          <h2 className="section-title">You don't need more discipline. You need more dopamine.</h2>
          <p className="section-sub">
            Traditional productivity tools were not built for brains that run on novelty and reward. Epic Mouse
            was.
          </p>
        </Reveal>

        <div className="problem-grid">
          {PAIN_POINTS.map((p, i) => (
            <Reveal key={p.title} type="left" delay={i * 100} className="problem-card">
              <span className="problem-icon">
                <p.icon size={22} />
              </span>
              <h3 className="problem-title">{p.title}</h3>
              <p className="problem-body">{p.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal type="fade" delay={200} className="problem-pivot">
          <LuHeart size={20} className="problem-pivot-icon" />
          <p>
            Epic Mouse trades pressure for play — a companion that rewards you the moment you show up, so writing
            starts to feel like the good kind of habit.
          </p>
          <a href="#features" className="problem-pivot-link">
            See how it works <LuArrowRight size={16} />
          </a>
        </Reveal>
      </div>

      <style>{`
        .problem-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
          margin-bottom: 56px;
        }
        .problem-card {
          background: var(--paper);
          border: 1px solid hsl(262deg 30% 92%);
          border-radius: var(--radius-md);
          padding: 30px 26px;
          box-shadow: var(--shadow-sm);
        }
        .problem-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 46px;
          height: 46px;
          border-radius: 14px;
          background: var(--coral-light);
          color: var(--coral-dark);
          margin-bottom: 18px;
        }
        .problem-title {
          font-size: 1.15rem;
          margin-bottom: 10px;
        }
        .problem-body {
          color: var(--ink-soft);
          font-size: 0.95rem;
        }
        .problem-pivot {
          max-width: 680px;
          margin-inline: auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }
        .problem-pivot-icon {
          color: var(--coral);
        }
        .problem-pivot p {
          font-family: var(--font-display);
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--ink);
          line-height: 1.35;
        }
        .problem-pivot-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-weight: 700;
          color: var(--coral-dark);
        }

        @media (max-width: 860px) {
          .problem-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
