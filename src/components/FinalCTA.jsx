import Reveal from './shared/Reveal.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function FinalCTA() {
  const { user, authChecked, openLogin, goToApp } = useAuth()
  const signedIn = authChecked && Boolean(user)

  return (
    <section className="final-cta section-tight">
      <div className="container">
        <Reveal type="scale" className="final-cta-card">
          <div className="final-cta-copy">
            <h2 className="final-cta-title">Your story is waiting to be written.</h2>
            <p className="final-cta-sub">
              One tiny mouse, one blank page, and a whole world that grows with every word. Free to try right
              now on PC.
            </p>
            <div className="final-cta-actions">
              <button type="button" className="btn btn-primary" onClick={signedIn ? goToApp : openLogin}>
                {signedIn ? 'Begin writing' : 'Try it free now'}
              </button>
            </div>
          </div>
          <div className="final-cta-visual" aria-hidden="true">
            <picture>
              <source srcSet="/media/poster-full.webp" type="image/webp" />
              <img src="/media/poster-full.jpg" alt="" />
            </picture>
          </div>
        </Reveal>
      </div>

      <style>{`
        .final-cta-card {
          position: relative;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          align-items: center;
          background: linear-gradient(135deg, #fff 0%, var(--cream-soft) 100%);
          border-radius: var(--radius-lg);
          border: 1px solid hsl(262deg 30% 92%);
          box-shadow: var(--shadow-glow);
          overflow: hidden;
        }
        .final-cta-copy {
          padding: clamp(36px, 6vw, 64px);
        }
        .final-cta-title {
          font-size: clamp(1.8rem, 3.6vw, 2.5rem);
          margin-bottom: 16px;
        }
        .final-cta-sub {
          color: var(--ink-soft);
          max-width: 440px;
          margin-bottom: 26px;
        }
        .final-cta-actions {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 18px;
        }
        .final-cta-visual {
          position: relative;
          align-self: stretch;
          min-height: 280px;
          background: linear-gradient(160deg, var(--blush) 0%, var(--sage-light) 100%);
        }
        .final-cta-visual img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
        }

        @media (max-width: 860px) {
          .final-cta-card {
            grid-template-columns: 1fr;
          }
          .final-cta-copy {
            text-align: center;
          }
          .final-cta-sub {
            margin-inline: auto;
          }
          .final-cta-actions {
            justify-content: center;
          }
          .final-cta-visual {
            min-height: 220px;
            order: -1;
          }
        }
      `}</style>
    </section>
  )
}
