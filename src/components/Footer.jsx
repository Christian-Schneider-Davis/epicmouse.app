import { useState } from 'react'
import { LuInstagram, LuTwitter, LuMail, LuSettings } from 'react-icons/lu'
import Terms from './Terms.jsx'
import DeleteAccountModal from './DeleteAccountModal.jsx'
import AccountSettingsModal from './AccountSettingsModal.jsx'

const YEAR = new Date().getFullYear()

export default function Footer() {
  const [termsOpen, setTermsOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="footer-brand-row">
            <img src="/apple-touch-icon.png" alt="" className="footer-icon" width={32} height={32} />
            <span className="footer-name">Epic Mouse App</span>
          </div>
          <p className="footer-tagline">As you write, the story comes alive.</p>
        </div>

        <nav className="footer-links" aria-label="Footer">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#faq">FAQ</a>
          <button type="button" className="footer-link-btn" onClick={() => setTermsOpen(true)}>
            Terms
          </button>
        </nav>

        <div className="footer-social">
          <a href="mailto:epicmouseapp@gmail.com" aria-label="Email Epic Mouse" className="footer-social-icon">
            <LuMail size={18} />
          </a>
          <button
            type="button"
            className="footer-social-icon"
            aria-label="Settings"
            onClick={() => setSettingsOpen(true)}
          >
            <LuSettings size={18} />
          </button>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>&copy; {YEAR} Epic Mouse App. All rights reserved.</p>
        <p className="footer-note">Developed with you in mind. Thank you.</p>
      </div>

      <Terms open={termsOpen} onClose={() => setTermsOpen(false)} />
      <DeleteAccountModal open={deleteOpen} onClose={() => setDeleteOpen(false)} />
      <AccountSettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onRequestDelete={() => setDeleteOpen(true)}
      />

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
          align-items: center;
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
        .footer-link-btn {
          background: none;
          border: none;
          padding: 0;
          font-family: inherit;
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--ink-soft);
          cursor: pointer;
        }
        .footer-link-btn:hover {
          color: var(--coral-dark);
        }
        .footer-social {
          display: flex;
          gap: 10px;
        }
        .footer-social-icon {
          width: 38px;
          height: 38px;
          padding: 0;
          border-radius: 50%;
          background: white;
          border: 1px solid hsl(262deg 25% 90%);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-family: inherit;
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
