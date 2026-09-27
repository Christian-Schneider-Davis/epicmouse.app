import { useEffect, useState } from 'react'
import { LuX, LuLoaderCircle } from 'react-icons/lu'
import { FcGoogle } from 'react-icons/fc'
import { FaApple } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext.jsx'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * The "Log in" / "Create account" modal */
export default function LoginModal() {
  const {
    firebaseReady,
    authError,
    setAuthError,
    justSignedIn,
    loginOpen,
    closeLogin,
    goToApp,
    signInGoogle,
    signInApple,
    signUpEmail,
    signInEmail,
    resetPassword,
  } = useAuth()

  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [localError, setLocalError] = useState('')
  const [resetStatus, setResetStatus] = useState('') // '' | 'sending' | 'sent'

  useEffect(() => {
    if (!loginOpen) return
    const onKey = (e) => e.key === 'Escape' && closeLogin()
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [loginOpen, closeLogin])

  // Once sign-in succeeds, show a beat of confirmation, then hand off.
  useEffect(() => {
    if (!justSignedIn) return
    const id = setTimeout(goToApp, 900)
    return () => clearTimeout(id)
  }, [justSignedIn, goToApp])

  if (!loginOpen) return null

  function switchMode(next) {
    setMode(next)
    setLocalError('')
    setAuthError(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLocalError('')
    setAuthError(null)

    if (!EMAIL_RE.test(email.trim())) {
      setLocalError("That email doesn't look quite right — mind double-checking it?")
      return
    }
    if (password.length < 6) {
      setLocalError('Password needs to be at least 6 characters.')
      return
    }

    setSubmitting(true)
    if (mode === 'signup') {
      await signUpEmail(email.trim(), password, name.trim())
    } else {
      await signInEmail(email.trim(), password)
    }
    setSubmitting(false)
  }

  async function handleReset() {
    if (!EMAIL_RE.test(email.trim())) {
      setLocalError('Enter your email above first, then tap "Forgot password?" again.')
      return
    }
    setLocalError('')
    setResetStatus('sending')
    const ok = await resetPassword(email.trim())
    setResetStatus(ok ? 'sent' : '')
  }

  return (
    <div className="login-modal-backdrop" onClick={closeLogin}>
      <div
        className="login-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="login-modal-close" aria-label="Close" onClick={closeLogin}>
          <LuX size={20} />
        </button>

        <div className="login-modal-head">
          <span className="login-modal-mark">●</span>
          <h2 id="login-modal-title">Welcome back, writer</h2>
          <p>Sign in to open Epic Mouse on PC — your chapters pick up right where you left off.</p>
        </div>

        {!firebaseReady ? (
          <p className="login-modal-msg">Sign-in isn't quite ready yet — check back soon.</p>
        ) : justSignedIn ? (
          <div className="login-modal-success">
            <LuLoaderCircle className="login-modal-spinner" size={22} />
            <p>You're in! Opening Epic Mouse…</p>
          </div>
        ) : (
          <>
            <div className="login-modal-tabs" role="tablist" aria-label="Sign in or create an account">
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'signin'}
                className={`login-modal-tab ${mode === 'signin' ? 'is-active' : ''}`}
                onClick={() => switchMode('signin')}
              >
                Sign in
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'signup'}
                className={`login-modal-tab ${mode === 'signup' ? 'is-active' : ''}`}
                onClick={() => switchMode('signup')}
              >
                Create account
              </button>
            </div>

            <form className="login-modal-form" onSubmit={handleSubmit}>
              {mode === 'signup' && (
                <input
                  type="text"
                  className="login-modal-input"
                  placeholder="Name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              )}
              <input
                type="email"
                className="login-modal-input"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setLocalError('')
                  setAuthError(null)
                }}
                autoComplete="email"
                required
              />
              <input
                type="password"
                className="login-modal-input"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setLocalError('')
                  setAuthError(null)
                }}
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                required
              />

              {(localError || authError) && <p className="login-modal-error">{localError || authError}</p>}

              <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
                {submitting ? 'Please wait…' : mode === 'signup' ? 'Create account' : 'Sign in'}
              </button>

              {mode === 'signin' && (
                <button
                  type="button"
                  className="login-modal-forgot"
                  onClick={handleReset}
                  disabled={resetStatus === 'sending'}
                >
                  {resetStatus === 'sending'
                    ? 'Sending reset link…'
                    : resetStatus === 'sent'
                      ? 'Reset link sent — check your inbox'
                      : 'Forgot password?'}
                </button>
              )}
            </form>

            <div className="login-modal-divider">
              <span>or</span>
            </div>

            <div className="login-modal-oauth">
              <button type="button" className="btn btn-secondary btn-block" onClick={signInGoogle}>
                <FcGoogle size={18} /> Continue with Google
              </button>
              <button type="button" className="btn btn-secondary btn-block" onClick={signInApple}>
                <FaApple size={18} /> Continue with Apple
              </button>
            </div>
          </>
        )}
      </div>

      <style>{`
        .login-modal-backdrop {
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
          animation: login-fade-in 0.2s ease;
        }
        @keyframes login-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .login-modal {
          position: relative;
          width: 100%;
          max-width: 420px;
          max-height: 90vh;
          overflow-y: auto;
          background: var(--paper);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          padding: clamp(28px, 5vw, 40px);
        }
        .login-modal-close {
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
          transition: background 0.2s ease, color 0.2s ease;
        }
        .login-modal-close:hover {
          background: var(--coral-light);
          color: var(--coral-dark);
        }
        .login-modal-head {
          text-align: center;
          margin-bottom: 22px;
        }
        .login-modal-mark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 999px;
          background: linear-gradient(135deg, var(--coral) 0%, var(--coral-dark) 100%);
          color: white;
          font-size: 1.1rem;
          margin-bottom: 14px;
        }
        .login-modal-head h2 {
          font-size: 1.35rem;
          margin-bottom: 8px;
        }
        .login-modal-head p {
          color: var(--ink-soft);
          font-size: 0.9rem;
        }
        .login-modal-msg {
          text-align: center;
          color: var(--ink-soft);
          font-size: 0.92rem;
        }
        .login-modal-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 18px 0 6px;
          color: var(--ink-soft);
          text-align: center;
        }
        .login-modal-spinner {
          animation: spin-slow 0.9s linear infinite;
          color: var(--coral);
        }
        .login-modal-tabs {
          display: flex;
          background: var(--cream);
          border-radius: var(--radius-pill);
          padding: 4px;
          margin-bottom: 18px;
        }
        .login-modal-tab {
          flex: 1;
          border: none;
          background: transparent;
          padding: 10px;
          border-radius: var(--radius-pill);
          font-family: inherit;
          font-weight: 600;
          font-size: 0.86rem;
          color: var(--ink-soft);
          transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
        }
        .login-modal-tab.is-active {
          background: var(--paper);
          color: var(--ink);
          box-shadow: var(--shadow-sm);
        }
        .login-modal-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .login-modal-input {
          padding: 14px 18px;
          border-radius: var(--radius-md);
          border: 1.5px solid hsl(262deg 25% 88%);
          background: var(--cream-soft);
          font-family: var(--font-body);
          font-size: 0.96rem;
          color: var(--ink);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .login-modal-input::placeholder {
          color: var(--ink-faint);
        }
        .login-modal-input:focus {
          outline: none;
          border-color: var(--coral);
          box-shadow: 0 0 0 4px hsl(6deg 90% 63% / 0.15);
        }
        .login-modal-error {
          color: #c23b2e;
          font-size: 0.86rem;
          font-weight: 500;
          margin: 0;
        }
        .login-modal-forgot {
          align-self: center;
          background: none;
          border: none;
          color: var(--ink-faint);
          font-size: 0.8rem;
          font-weight: 600;
          padding: 4px;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .login-modal-forgot:hover {
          color: var(--coral-dark);
        }
        .login-modal-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 20px 0 16px;
          color: var(--ink-faint);
          font-size: 0.76rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .login-modal-divider::before,
        .login-modal-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: hsl(262deg 25% 88%);
        }
        .login-modal-oauth {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .login-modal-oauth .btn {
          padding: 13px 20px;
        }
      `}</style>
    </div>
  )
}
