import {
  LuWandSparkles,
  LuPartyPopper,
  LuFlame,
  LuFocus,
  LuBellRing,
} from 'react-icons/lu'
import SectionHeading from './shared/SectionHeading.jsx'
import Reveal from './shared/Reveal.jsx'

const FEATURES = [
  {
    icon: LuWandSparkles,
    title: 'A companion that grows with you',
    body: 'Every writing session feeds your character. New story beats unlock as you go. Nobody wants to leave their companion hanging.',
    tint: 'coral',
  },
  {
    icon: LuFocus,
    title: 'A distraction-free canvas',
    body: 'One page. Your words. A companion cheering quietly in the background. Everything else fades away while you write.',
    tint: 'sage',
  },
  {
    icon: LuPartyPopper,
    title: "Engage your brain's reward system intentionally",
    body: 'Tiny bursts of delight! Sparkles & motion fire the moment you begin typing. Your brain gets the reward right when it needs it.',
    tint: 'butter',
  },
  {
    icon: LuFlame,
    title: 'Streaks without the shame spiral',
    body: 'Miss a day? Your streak bends, it doesn’t break. Forgiving by design, because guilt has never once helped anyone write more.',
    tint: 'coral',
  },
  {
    icon: LuBellRing,
    title: 'Encouragement, no guilt-trips',
    body: 'A simple timer feature with check-ins that pull you back in. Never a guilt trip, always an invitation.',
    tint: 'cape',
  },
]

export default function Features() {
  return (
    <section id="features" className="features section">
      <div className="container">
        <SectionHeading
          eyebrow="Everything you need"
          title="Built to make writing feel even better"
          subtitle="Every feature exists for one reason: to make the next sentence feel just a little easier and a little more fun than the last."
        />

        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} type="scale" delay={(i % 3) * 90} className={`feature-card feature-card--${f.tint}`}>
              <span className="feature-icon">
                <f.icon size={24} />
              </span>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-body">{f.body}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
        }
        .feature-card {
          position: relative;
          background: var(--paper);
          border-radius: var(--radius-md);
          padding: 32px 28px;
          border: 1px solid hsl(262deg 30% 92%);
          box-shadow: var(--shadow-sm);
          transition: transform 0.3s cubic-bezier(.22,1,.36,1), box-shadow 0.3s ease;
        }
        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-lg);
        }
        .feature-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border-radius: 16px;
          margin-bottom: 20px;
        }
        .feature-card--coral .feature-icon { background: var(--coral-light); color: var(--coral-dark); }
        .feature-card--butter .feature-icon { background: hsl(38deg 90% 90%); color: var(--butter-dark); }
        .feature-card--cape .feature-icon { background: var(--cape-light); color: var(--cape); }
        .feature-card--sage .feature-icon { background: var(--sage-light); color: var(--sage-dark); }
        .feature-title {
          font-size: 1.18rem;
          margin-bottom: 10px;
        }
        .feature-body {
          color: var(--ink-soft);
          font-size: 0.95rem;
        }

        @media (max-width: 980px) {
          .features-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 620px) {
          .features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
