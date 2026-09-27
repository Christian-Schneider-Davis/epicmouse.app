import { useEffect, useState } from 'react'
import {
  getStoredConsent,
  saveConsent,
  DEFAULT_CONSENT,
  REOPEN_EVENT,
} from '../lib/cookieConsent.js'
import Terms from './Terms.jsx'

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [analytics, setAnalytics] = useState(DEFAULT_CONSENT.analytics)
  const [termsOpen, setTermsOpen] = useState(false)

  useEffect(() => {
    const stored = getStoredConsent()
    if (!stored) {
      setVisible(true)
    } else {
      setAnalytics(Boolean(stored.analytics))
    }

    const reopen = () => {
      const current = getStoredConsent()
      setAnalytics(Boolean(current?.analytics))
      setExpanded(true)
      setVisible(true)
    }
    window.addEventListener(REOPEN_EVENT, reopen)
    return () => window.removeEventListener(REOPEN_EVENT, reopen)
  }, [])

  function acceptAll() {
    saveConsent({ necessary: true, analytics: true })
    setAnalytics(true)
    setVisible(false)
    setExpanded(false)
  }

  function declineNonEssential() {
    saveConsent({ necessary: true, analytics: false })
    setAnalytics(false)
    setVisible(false)
    setExpanded(false)
  }

  function savePreferences() {
    saveConsent({ necessary: true, analytics })
    setVisible(false)
    setExpanded(false)
  }

  if (!visible) return null

  return (
    <>
      <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie preferences">
        <div className="cookie-banner-inner">
          <button
            type="button"
            className="cookie-dismiss"
            aria-label="Dismiss"
            onClick={declineNonEssential}
          >
            &times;
          </button>

          <p className="cookie-text">
            We use cookies to keep you signed in and to make Epic Mouse work properly. With your
            permission, we&apos;d also like to use a few optional cookies to understand how the site
            is used.{' '}
            <button type="button" className="cookie-inline-link" onClick={() => setTermsOpen(true)}>
              Terms &amp; Privacy
            </button>
          </p>

          {expanded && (
            <div className="cookie-options">
              <div className="cookie-option">
                <div className="cookie-option-text">
                  <span className="cookie-option-title">Necessary</span>
                  <span className="cookie-option-desc">
                    Required for sign-in and saving your chapters. Always on.
                  </span>
                </div>
                <span className="cookie-toggle cookie-toggle-locked" aria-hidden="true">
                  <span className="cookie-toggle-knob" />
                </span>
              </div>

              <div className="cookie-option">
                <div className="cookie-option-text">
                  <span className="cookie-option-title">Analytics</span>
                  <span className="cookie-option-desc">
                    Helps us understand how the site is used, so we can improve it.
                  </span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={analytics}
                  className={`cookie-toggle ${analytics ? 'is-on' : ''}`}
                  onClick={() => setAnalytics((value) => !value)}
                >
                  <span className="cookie-toggle-knob" />
                </button>
              </div>
            </div>
          )}

          <div className="cookie-actions">
            {expanded ? (
              <>
                <button type="button" className="cookie-btn cookie-btn-primary" onClick={savePreferences}>
                  Save preferences
                </button>
                <button type="button" className="cookie-btn cookie-btn-ghost" onClick={acceptAll}>
                  Accept all
                </button>
              </>
            ) : (
              <>
                <button type="button" className="cookie-btn cookie-btn-primary" onClick={acceptAll}>
                  Accept all
                </button>
                <button type="button" className="cookie-btn cookie-btn-ghost" onClick={declineNonEssential}>
                  Decline non-essential
                </button>
                <button
                  type="button"
                  className="cookie-btn cookie-btn-text"
                  onClick={() => setExpanded(true)}
                >
                  Customize
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <Terms open={termsOpen} onClose={() => setTermsOpen(false)} />

      <style>{`
        .cookie-banner {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1000;
          padding: 16px;
          display: flex;
          justify-content: center;
        }
        .cookie-banner-inner {
          position: relative;
          width: 100%;
          max-width: 640px;
          background: var(--cream-soft, #fff8f2);
          border: 1px solid hsl(262deg 25% 90%);
          border-radius: 16px;
          box-shadow: 0 12px 32px rgba(30, 20, 40, 0.18);
          padding: 20px 22px;
        }
        .cookie-dismiss {
          position: absolute;
          top: 10px;
          right: 12px;
          background: none;
          border: none;
          font-size: 1.3rem;
          line-height: 1;
          color: var(--ink-faint, #8a7f8a);
          cursor: pointer;
          padding: 4px;
        }
        .cookie-dismiss:hover {
          color: var(--ink-soft, #4a3f4a);
        }
        .cookie-text {
          margin: 0 28px 14px 0;
          font-size: 0.9rem;
          line-height: 1.5;
          color: var(--ink-soft, #4a3f4a);
        }
        .cookie-inline-link {
          background: none;
          border: none;
          padding: 0;
          font: inherit;
          font-weight: 600;
          text-decoration: underline;
          color: var(--coral-dark, #c9503f);
          cursor: pointer;
        }
        .cookie-options {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 16px;
          padding: 14px;
          border: 1px solid hsl(262deg 25% 90%);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.6);
        }
        .cookie-option {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .cookie-option-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .cookie-option-title {
          font-weight: 700;
          font-size: 0.88rem;
        }
        .cookie-option-desc {
          font-size: 0.8rem;
          color: var(--ink-faint, #8a7f8a);
        }
        .cookie-toggle {
          position: relative;
          flex: none;
          width: 42px;
          height: 24px;
          border-radius: 999px;
          border: none;
          background: hsl(262deg 15% 82%);
          cursor: pointer;
          padding: 0;
          transition: background 0.2s ease;
        }
        .cookie-toggle.is-on {
          background: var(--coral, #e8735f);
        }
        .cookie-toggle-locked {
          background: var(--coral, #e8735f);
          opacity: 0.6;
          cursor: not-allowed;
        }
        .cookie-toggle-knob {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: white;
          transition: transform 0.2s ease;
        }
        .cookie-toggle.is-on .cookie-toggle-knob,
        .cookie-toggle-locked .cookie-toggle-knob {
          transform: translateX(18px);
        }
        .cookie-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .cookie-btn {
          border-radius: 999px;
          padding: 9px 18px;
          font-size: 0.86rem;
          font-weight: 700;
          cursor: pointer;
          border: 1px solid transparent;
        }
        .cookie-btn-primary {
          background: var(--coral, #e8735f);
          color: white;
        }
        .cookie-btn-primary:hover {
          background: var(--coral-dark, #c9503f);
        }
        .cookie-btn-ghost {
          background: transparent;
          border-color: hsl(262deg 25% 85%);
          color: var(--ink-soft, #4a3f4a);
        }
        .cookie-btn-ghost:hover {
          border-color: var(--coral, #e8735f);
          color: var(--coral-dark, #c9503f);
        }
        .cookie-btn-text {
          background: none;
          border: none;
          color: var(--ink-faint, #8a7f8a);
          text-decoration: underline;
          padding: 9px 4px;
        }
        .cookie-btn-text:hover {
          color: var(--ink-soft, #4a3f4a);
        }
        @media (max-width: 480px) {
          .cookie-banner {
            padding: 10px;
          }
          .cookie-banner-inner {
            padding: 18px 16px;
          }
        }
      `}</style>
    </>
  )
}
