import { useRef, useState } from 'react'
import { LuPlay, LuVolume2 } from 'react-icons/lu'
import Reveal from './shared/Reveal.jsx'
import Sparkles from './shared/Sparkles.jsx'

export default function VideoShowcase() {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const handlePlay = () => {
    const v = videoRef.current
    if (!v) return
    v.controls = true
    v.play()
    setPlaying(true)
  }

  return (
    <section className="showcase section" id="story-preview">
      <div className="container">
        <Reveal type="fade" className="showcase-head">
          <span className="eyebrow">Meet your companion</span>
          <h2 className="section-title">
            As you write, <span className="text-gradient">the story comes alive</span>
          </h2>
          <p className="section-sub">
            This little mouse is your writing companion. A hand‑illustrated character who reacts, grows, and
            levels up right alongside your work. Watch what happens after just one good writing session.
          </p>
        </Reveal>

        <Reveal type="scale" delay={120} className="showcase-player-wrap">
          <div className="showcase-player">
            <video
              ref={videoRef}
              className="showcase-video"
              src="/media/mouse-hero-web.mp4"
              poster="/media/glow-moment.jpg"
              playsInline
              onPause={() => setPlaying(false)}
              onPlay={() => setPlaying(true)}
              onEnded={() => setPlaying(false)}
            />
            {!playing && (
              <button className="showcase-play" onClick={handlePlay} aria-label="Play preview video">
                <span className="showcase-play-icon">
                  <LuPlay size={28} />
                </span>
                <span className="showcase-play-label">
                </span>
              </button>
            )}
            {!playing && <Sparkles count={6} />}
          </div>
        </Reveal>
      </div>

      <style>{`
        .showcase {
          position: relative;
        }
        .showcase-head {
          max-width: 680px;
          margin-inline: auto;
          text-align: center;
          margin-bottom: 48px;
        }
        .showcase-player-wrap {
          max-width: 780px;
          margin-inline: auto;
        }
        .showcase-player {
          position: relative;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-glow);
          background: #16131f;
          aspect-ratio: 16 / 9;
        }
        .showcase-video {
          width: 100%;
          height: 100%;
          object-fit: contain;
          background: #16131f;
        }
        .showcase-play {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          background: linear-gradient(180deg, hsl(262deg 40% 10% / 0.15), hsl(262deg 40% 8% / 0.55));
          border: none;
          z-index: 4;
        }
        .showcase-play-icon {
          width: 76px;
          height: 76px;
          border-radius: 50%;
          background: white;
          color: var(--coral-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 12px 30px hsl(262deg 50% 10% / 0.4);
          transition: transform 0.25s cubic-bezier(.22,1,.36,1);
        }
        .showcase-play:hover .showcase-play-icon {
          transform: scale(1.08);
        }
        .showcase-play-label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: white;
          font-weight: 600;
          font-size: 0.88rem;
          background: hsl(0 0% 100% / 0.15);
          padding: 6px 14px;
          border-radius: 999px;
          backdrop-filter: blur(6px);
        }
      `}</style>
    </section>
  )
}
