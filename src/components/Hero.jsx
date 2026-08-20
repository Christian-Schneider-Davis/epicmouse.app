import { LuFlame, LuSparkles, LuBookOpen, LuPlay } from 'react-icons/lu'
import WaitlistForm from './shared/WaitlistForm.jsx'
import AppStoreBadge from './shared/AppStoreBadge.jsx'
import Sparkles from './shared/Sparkles.jsx'
import Reveal from './shared/Reveal.jsx'

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-bg" aria-hidden="true">
        <span className="blob blob-a" />
        <span className="blob blob-b" />
        <span className="blob blob-c" />
      </div>

      <div className="container hero-inner">
        <div className="hero-copy">
          <Reveal type="fade">
            <span className="eyebrow hero-eyebrow">
              <LuSparkles size={14} /> Coming soon &middot; iOS
            </span>
          </Reveal>

          <Reveal type="fade" delay={80}>
            <h1 className="hero-title">
              Write a little.
              <br />
              <span className="text-gradient">Feel amazing.</span>
            </h1>
          </Reveal>

          <Reveal type="fade" delay={160}>
            <p className="hero-sub">
              Epic Mouse App is the writing companion built for ADHD brains — and anyone whose motivation needs a
              little spark. Every sentence you write grows a tiny magical friend who's rooting for you, one word at a time.
            </p>
          </Reveal>

          <Reveal type="fade" delay={240}>
            <div className="hero-actions">
              <WaitlistForm />
            </div>
            <div className="hero-badges">
              <AppStoreBadge size="sm" />
              <p className="hero-badges-note">Free to join &middot; No spam, ever</p>
            </div>
          </Reveal>

          <Reveal type="fade" delay={320}>
            <div className="hero-trust">
              <div className="hero-trust-item">
                <LuFlame size={18} />
                <span>Built for momentum, not guilt</span>
              </div>
              <div className="hero-trust-item">
                <LuBookOpen size={18} />
                <span>Designed with neurodivergent writers</span>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal type="scale" delay={200} className="hero-visual">
          <div className="hero-frame">
            <video
              className="hero-video"
              src="/media/mouse-hero-loop.mp4"
              poster="/media/poster-full.jpg"
              autoPlay
              muted
              loop
              playsInline
            />
            <Sparkles count={7} />
          </div>

          <div className="hero-chip hero-chip-1 animate-float">
            <LuFlame size={16} />
            <span>7‑day streak!</span>
          </div>
          <div className="hero-chip hero-chip-2 animate-float-slow">
            <LuSparkles size={16} />
            <span>Chapter unlocked</span>
          </div>
          <div className="hero-chip hero-chip-3 animate-bob">
            <LuPlay size={14} />
            <span>+312 words today</span>
          </div>
          <div className="hero-frame-glow" aria-hidden="true" />
        </Reveal>
      </div>

      <style>{`
        .hero {
          position: relative;
          padding-block: clamp(120px, 16vw, 168px) 80px;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          opacity: 0.55;
        }
        .blob-a {
          width: 480px;
          height: 480px;
          top: -180px;
          left: -140px;
          background: var(--blush);
        }
        .blob-b {
          width: 420px;
          height: 420px;
          top: -80px;
          right: -160px;
          background: var(--sage-light);
        }
        .blob-c {
          width: 380px;
          height: 380px;
          bottom: -220px;
          left: 30%;
          background: var(--butter);
          opacity: 0.4;
        }
        .hero-inner {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 0.92fr);
          gap: clamp(32px, 6vw, 64px);
          align-items: center;
        }
        .hero-eyebrow {
          background: hsl(0 0% 100% / 0.7);
          backdrop-filter: blur(6px);
        }
        .hero-title {
          font-size: clamp(2.6rem, 5.6vw, 4.1rem);
          font-weight: 700;
          margin-top: 18px;
          margin-bottom: 20px;
        }
        .hero-sub {
          font-size: clamp(1.02rem, 1.6vw, 1.18rem);
          color: var(--ink-soft);
          max-width: 540px;
          margin-bottom: 32px;
        }
        .hero-actions {
          max-width: 520px;
          margin-bottom: 18px;
        }
        .hero-badges {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 36px;
        }
        .hero-badges-note {
          font-size: 0.85rem;
          color: var(--ink-faint);
          font-weight: 500;
        }
        .hero-trust {
          display: flex;
          gap: 28px;
          flex-wrap: wrap;
        }
        .hero-trust-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--ink-soft);
        }
        .hero-trust-item svg {
          color: var(--coral);
        }

        .hero-visual {
          position: relative;
          justify-self: center;
          width: 100%;
          max-width: 460px;
        }
        .hero-frame {
          position: relative;
          border-radius: 36px;
          overflow: hidden;
          box-shadow: var(--shadow-glow);
          border: 6px solid white;
          aspect-ratio: 1 / 1.06;
          background: linear-gradient(160deg, #fff, var(--cream));
        }
        .hero-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 20%;
        }
        .hero-frame-glow {
          position: absolute;
          inset: 6%;
          z-index: -1;
          background: radial-gradient(circle, hsl(6deg 90% 70% / 0.4), transparent 70%);
          filter: blur(40px);
        }
        .hero-chip {
          position: absolute;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: white;
          padding: 9px 14px;
          border-radius: 999px;
          box-shadow: var(--shadow-md);
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--ink);
          z-index: 3;
        }
        .hero-chip svg {
          color: var(--coral);
        }
        .hero-chip-1 {
          top: 8%;
          left: -8%;
        }
        .hero-chip-2 {
          top: 62%;
          right: -12%;
        }
        .hero-chip-2 svg {
          color: var(--sage-dark);
        }
        .hero-chip-3 {
          bottom: 6%;
          left: -6%;
        }
        .hero-chip-3 svg {
          color: var(--cape);
        }

        @media (max-width: 980px) {
          .hero-inner {
            grid-template-columns: 1fr;
          }
          .hero-copy {
            text-align: center;
          }
          .hero-sub {
            margin-inline: auto;
          }
          .hero-actions {
            margin-inline: auto;
          }
          .hero-badges {
            justify-content: center;
          }
          .hero-trust {
            justify-content: center;
          }
          .hero-visual {
            max-width: 380px;
          }
          .hero-chip {
            font-size: 0.74rem;
            padding: 7px 11px;
          }
          .hero-chip-1 { left: -2%; }
          .hero-chip-2 { right: -2%; }
          .hero-chip-3 { left: -2%; }
        }

        @media (max-width: 480px) {
          .hero-chip { display: none; }
        }
      `}</style>
    </section>
  )
}
