import { LuArrowRight } from 'react-icons/lu'
import SectionHeading from './shared/SectionHeading.jsx'
import Reveal from './shared/Reveal.jsx'

const STAGES = [
  {
    level: 'Day 1',
    title: 'A new friend',
    body: 'Your companion sets out into the forest — small, curious, and entirely your own.',
    img: '/media/poster-full',
  },
  {
    level: 'Streak x3',
    title: 'Something awakens',
    body: 'Consistent sessions spark real magic. Every word adds a little more glow.',
    img: '/media/glow-moment',
  },
  {
    level: 'Milestone',
    title: 'A legendary find',
    body: 'Bigger goals unlock bigger moments — mysteries, encounters, and gear worth writing home about.',
    img: '/media/knight-moment',
  },
  {
    level: 'Your story',
    title: 'The adventure widens',
    body: "Keep going and the whole world opens up. It's your story — written one session at a time.",
    img: '/media/knight-wide',
  },
]

export default function StoryWorld() {
  return (
    <section id="story" className="story section">
      <div className="container">
        <SectionHeading
          eyebrow="A world that grows with you"
          title="Your words shape an entire storybook world"
          subtitle="This isn't a plant that wilts if you skip a day, or a flame you're afraid to lose. It's a warm, hand-illustrated world that only ever moves forward."
        />

        <div className="story-rail">
          {STAGES.map((s, i) => (
            <Reveal key={s.title} type="scale" delay={i * 100} className="story-card">
              <div className="story-card-img">
                <picture>
                  <source srcSet={`${s.img}.webp`} type="image/webp" />
                  <img src={`${s.img}.jpg`} alt="" loading="lazy" />
                </picture>
                <span className="story-card-level">{s.level}</span>
              </div>
              <h3 className="story-card-title">{s.title}</h3>
              <p className="story-card-body">{s.body}</p>
              {i < STAGES.length - 1 && (
                <span className="story-card-arrow" aria-hidden="true">
                  <LuArrowRight size={20} />
                </span>
              )}
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        .story-rail {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 20px;
        }
        .story-card {
          position: relative;
          background: var(--paper);
          border-radius: var(--radius-md);
          padding: 16px;
          border: 1px solid hsl(262deg 30% 92%);
          box-shadow: var(--shadow-sm);
        }
        .story-card-img {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          aspect-ratio: 4 / 5;
          margin-bottom: 16px;
          background: var(--cream);
        }
        .story-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
        }
        .story-card-level {
          position: absolute;
          top: 10px;
          left: 10px;
          background: hsl(262deg 40% 12% / 0.72);
          color: white;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 5px 10px;
          border-radius: 999px;
          backdrop-filter: blur(4px);
        }
        .story-card-title {
          font-size: 1.05rem;
          margin-bottom: 6px;
          padding-inline: 4px;
        }
        .story-card-body {
          font-size: 0.86rem;
          color: var(--ink-soft);
          padding-inline: 4px;
        }
        .story-card-arrow {
          display: none;
          position: absolute;
          top: 38%;
          right: -32px;
          color: var(--coral);
          background: white;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-sm);
          z-index: 2;
        }

        @media (min-width: 981px) {
          .story-card-arrow {
            display: flex;
          }
        }
        @media (max-width: 980px) {
          .story-rail {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 560px) {
          .story-rail {
            grid-template-columns: 1fr;
            max-width: 340px;
            margin-inline: auto;
          }
        }
      `}</style>
    </section>
  )
}
