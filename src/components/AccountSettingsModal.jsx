import { useEffect } from 'react'
import { LuX, LuCookie, LuTrash2 } from 'react-icons/lu'
import { useAuth } from '../context/AuthContext.jsx'
import { reopenCookiePreferences } from '../lib/cookieConsent.js'

/**
 * Small "Settings" panel opened from the quiet gear icon in the footer. */
export default function AccountSettingsModal({ open, onClose, onRequestDelete }) {
  const { user } = useAuth()

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="account-settings-backdrop" onClick={onClose}>
      <div
        className="account-settings-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="account-settings-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="account-settings-close" aria-label="Close" onClick={onClose}>
          <LuX size={20} />
        </button>

        <h2 id="account-settings-title" className="account-settings-title">
          Settings
        </h2>

        <div className="account-settings-list">
          <button
            type="button"
            className="account-settings-row"
            onClick={() => {
              reopenCookiePreferences()
              onClose()
            }}
          >
            <LuCookie size={18} />
            <span>Cookie preferences</span>
          </button>

          {user && (
            <button
              type="button"
              className="account-settings-row account-settings-row-danger"
              onClick={() => {
                onClose()
                onRequestDelete()
              }}
            >
              <LuTrash2 size={18} />
              <span>Delete account</span>
            </button>
          )}
        </div>
      </div>

      <style>{`
        .account-settings-backdrop {
          position: fixed;
          inset: 0;
          z-index: 300;
          background: hsl(262deg 40% 12% / 0.55);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .account-settings-modal {
          position: relative;
          width: 100%;
          max-width: 340px;
          background: var(--paper);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          padding: clamp(24px, 5vw, 30px);
        }
        .account-settings-close {
          position: absolute;
          top: 14px;
          right: 14px;
          background: var(--cream);
          border: none;
          border-radius: 999px;
          width: 32px;
          height: 32px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--ink-soft);
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .account-settings-close:hover {
          background: var(--coral-light);
          color: var(--coral-dark);
        }
        .account-settings-title {
          font-size: 1.1rem;
          margin: 0 32px 16px 0;
        }
        .account-settings-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .account-settings-row {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          box-sizing: border-box;
          padding: 12px 14px;
          border-radius: var(--radius-md);
          border: none;
          background: var(--cream-soft);
          color: var(--ink);
          font-family: inherit;
          font-weight: 600;
          font-size: 0.9rem;
          text-align: left;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .account-settings-row:hover {
          background: var(--coral-light);
          color: var(--coral-dark);
        }
        .account-settings-row-danger {
          color: #c23b2e;
        }
        .account-settings-row-danger:hover {
          background: rgba(194, 59, 46, 0.1);
          color: #c23b2e;
        }
      `}</style>
    </div>
  )
}
