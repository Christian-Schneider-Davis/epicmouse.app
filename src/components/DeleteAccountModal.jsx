import { useEffect, useState } from 'react'
import { LuX } from 'react-icons/lu'
import { useAuth } from '../context/AuthContext.jsx'

export default function DeleteAccountModal({ open, onClose }) {
  const { user, deleteAccount, authError, setAuthError } = useAuth()
  const isPasswordAccount = user?.providerData?.[0]?.providerId === 'password'
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!open) return
    setAuthError(null)
    setPassword('')
    const onKey = (e) => e.key === 'Escape' && !submitting && onClose()
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  if (!open) return null

  async function handleConfirm() {
    setSubmitting(true)
    const ok = await deleteAccount(isPasswordAccount ? password : undefined)
    setSubmitting(false)
    // On success there's nothing left to do here — the account is gone, so
    // the app's own auth listener notices and the page reflects that on
    // its own (the navbar drops back to "Log in", etc). Just close.
    if (ok) onClose()
  }

  return (
    <div className="delete-modal-backdrop" onClick={() => !submitting && onClose()}>
      <div
        className="delete-modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-account-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="delete-modal-close"
          aria-label="Close"
          onClick={onClose}
          disabled={submitting}
        >
          <LuX size={20} />
        </button>

        <h2 id="delete-account-title" className="delete-modal-title">
          Delete your account?
        </h2>

        <p className="delete-modal-body">
          This permanently deletes your account and every chapter saved to it — on PC and in the
          app. There's no undo — once it's gone, it's gone for good.
        </p>

        {isPasswordAccount && (
          <input
            type="password"
            className="delete-modal-input"
            placeholder="Confirm your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setAuthError(null)
            }}
            autoComplete="current-password"
            autoFocus
          />
        )}

        {authError && <p className="delete-modal-error">{authError}</p>}

        <div className="delete-modal-actions">
          <button type="button" className="btn btn-ghost btn-block" onClick={onClose} disabled={submitting}>
            Go back
          </button>
          <button
            type="button"
            className="delete-modal-confirm"
            onClick={handleConfirm}
            disabled={submitting || (isPasswordAccount && !password)}
          >
            {submitting ? 'Deleting…' : 'Permanently delete my account'}
          </button>
        </div>
      </div>

      <style>{`
        .delete-modal-backdrop {
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
        .delete-modal {
          position: relative;
          width: 100%;
          max-width: 420px;
          max-height: 90vh;
          overflow-y: auto;
          background: var(--paper);
          border: 1.5px dashed #c23b2e;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          padding: clamp(28px, 5vw, 36px);
        }
        .delete-modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: var(--cream);
          border: none;
          border-radius: 999px;
          width: 34px;
          height: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--ink-soft);
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .delete-modal-close:hover {
          background: var(--coral-light);
          color: var(--coral-dark);
        }
        .delete-modal-title {
          font-size: 1.25rem;
          margin: 0 32px 12px 0;
        }
        .delete-modal-body {
          color: var(--ink-soft);
          font-size: 0.92rem;
          line-height: 1.6;
          margin: 0 0 18px;
        }
        .delete-modal-input {
          width: 100%;
          box-sizing: border-box;
          padding: 14px 18px;
          border-radius: var(--radius-md);
          border: 1.5px solid hsl(262deg 25% 88%);
          background: var(--cream-soft);
          font-family: var(--font-body);
          font-size: 0.96rem;
          color: var(--ink);
          margin-bottom: 14px;
        }
        .delete-modal-input::placeholder {
          color: var(--ink-faint);
        }
        .delete-modal-input:focus {
          outline: none;
          border-color: #c23b2e;
          box-shadow: 0 0 0 4px rgba(194, 59, 46, 0.15);
        }
        .delete-modal-error {
          color: #c23b2e;
          font-size: 0.86rem;
          font-weight: 500;
          margin: 0 0 14px;
        }
        .delete-modal-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .delete-modal-confirm {
          width: 100%;
          box-sizing: border-box;
          padding: 13px 20px;
          border-radius: var(--radius-pill);
          border: 1.5px solid #c23b2e;
          background: transparent;
          color: #c23b2e;
          font-family: inherit;
          font-weight: 700;
          font-size: 0.92rem;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .delete-modal-confirm:hover:not(:disabled) {
          background: #c23b2e;
          color: white;
        }
        .delete-modal-confirm:disabled {
          opacity: 0.55;
          cursor: default;
        }
      `}</style>
    </div>
  )
}
