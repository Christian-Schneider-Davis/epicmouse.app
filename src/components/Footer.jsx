import { LuInstagram, LuTwitter, LuMail } from 'react-icons/lu'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="footer-brand-row">
            <img src="/apple-touch-icon.png" alt="" className="footer-icon" width={32} height={32} />
            <span className="footer-name">Epic Mouse</span>
          </div>
          <p className="footer-tagline">As you write, the story comes alive.</p>
        </div>

        <nav className="footer-links" aria-label="Footer">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#story">The Story</a>
          <a href="#faq">FAQ</a>
          <a href="#waitlist">Join waitlist</a>
        </nav>

        <div className="footer-social">
          <a href="#" aria-label="Epic Mouse on Instagram" className="footer-social-icon">
            <LuInstagram size={18} />
          </a>
          <a href="#" aria-label="Epic Mouse on Twitter / X" className="footer-social-icon">
            <LuTwitter size={18} />
          </a>
          <a href="mailto:hello@epicmouse.app" aria-label="Email Epic Mouse" className="footer-social-icon">
            <LuMail size={18} />
          </a>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>&copy; {YEAR} Epic Mouse. All rights reserved.</p>
        <p className="footer-note">Currently in development. Not yet available on the App Store.</p>
      </div>

      <style>{`
        .footer {
          background: var(--cream-soft);
          border-top: 1px solid hsl(262deg 25% 90%);
          padding-top: 56px;
        }
        .footer-inner {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 32px;
          padding-bottom: 40px;
          border-bottom: 1px solid hsl(262deg 25% 90%);
        }
        .footer-brand-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }
        .footer-icon {
          border-radius: 9px;
        }
        .footer-name {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.1rem;
        }
        .footer-tagline {
          color: var(--ink-soft);
          font-size: 0.9rem;
        }
        .footer-links {
          display: flex;
          gap: 26px;
          flex-wrap: wrap;
        }
        .footer-links a {
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--ink-soft);
        }
        .footer-links a:hover {
          color: var(--coral-dark);
        }
        .footer-social {
          display: flex;
          gap: 10px;
        }
        .footer-social-icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: white;
          border: 1px solid hsl(262deg 25% 90%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--ink-soft);
          transition: color 0.2s ease, border-color 0.2s ease;
        }
        .footer-social-icon:hover {
          color: var(--coral-dark);
          border-color: var(--coral);
        }
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
          padding-block: 22px;
          font-size: 0.8rem;
          color: var(--ink-faint);
        }
      `}</style>
    </footer>
  )
}
