import { LuTarget, LuPencilLine, LuSparkle, LuTrophy } from 'react-icons/lu'
import SectionHeading from './shared/SectionHeading.jsx'
import Reveal from './shared/Reveal.jsx'

const STEPS = [
  {
    icon: LuTarget,
    step: '01',
    title: 'Set a tiny goal',
    body: '100 words. 10 minutes. One paragraph. Start small. Momentum matters more than ambition.',
  },
  {
    icon: LuPencilLine,
    step: '02',
    title: 'Write, your way',
    body: 'Open the distraction-free canvas and go. No setup, no friction, no judgment if you stop and start again.',
  },
  {
    icon: LuSparkle,
    step: '03',
    title: 'Watch your companion react',
    body: 'Real-time animations and rewards celebrate every bit of progress instantly, not "eventually."',
  },
  {
    icon: LuTrophy,
    step: '04',
    title: 'New content with every chapter',
    body: 'Hit your goals and new story beats are waiting on the other side.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="how section">
      <div className="container">
        <SectionHeading
          eyebrow="How it works"
          title="Four small steps. One big feeling."
          subtitle="No complicated setup, no productivity theory homework. Just open the app and start."
        />

        <div className="how-timeline">
          {STEPS.map((s, i) => (
            <Reveal key={s.step} type="fade" delay={i * 110} className="how-step">
              <div className="how-step-marker">
                <span className="how-step-icon">
                  <s.icon size={22} />
                </span>
                {i < STEPS.length - 1 && <span className="how-step-line" aria-hidden="true" />}
              </div>
              <div className="how-step-copy">
                <span className="how-step-num">{s.step}</span>
                <h3 className="how-step-title">{s.title}</h3>
                <p className="how-step-body">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        .how-timeline {
          max-width: 720px;
          margin-inline: auto;
          display: flex;
          flex-direction: column;
        }
        .how-step {
          display: grid;
          grid-template-columns: 64px 1fr;
          gap: 24px;
        }
        .how-step-marker {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .how-step-icon {
          width: 64px;
          height: 64px;
          border-radius: 20px;
          background: linear-gradient(150deg, var(--coral) 0%, var(--coral-dark) 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 24px hsl(6deg 90% 63% / 0.35);
          flex-shrink: 0;
        }
        .how-step-line {
          flex: 1;
          width: 3px;
          background: linear-gradient(hsl(6deg 70% 80%), hsl(262deg 25% 90%));
          margin-block: 8px;
          border-radius: 999px;
          min-height: 32px;
        }
        .how-step-copy {
          padding-bottom: 44px;
        }
        .how-step-num {
          font-family: var(--font-display);
          font-weight: 700;
          color: var(--coral);
          font-size: 0.85rem;
          letter-spacing: 0.05em;
        }
        .how-step-title {
          font-size: 1.3rem;
          margin-top: 6px;
          margin-bottom: 8px;
        }
        .how-step-body {
          color: var(--ink-soft);
        }
      `}</style>
    </section>
  )
}
