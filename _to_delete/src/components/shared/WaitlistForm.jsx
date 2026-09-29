import { useState } from 'react'
import { LuArrowRight, LuCheck, LuLoaderCircle } from 'react-icons/lu'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// --- Formspree setup (2 minutes, no backend required) -----------------
// 1. Go to https://formspree.io and create a free account.
// 2. Create a new form with the recipient email set to epicmouseapp@gmail.com.
// 3. Formspree gives you a form ID that looks like "xyzabcde" — paste it below.
//    (This ID is meant to be public/client-side — it's not a secret.)
const FORMSPREE_FORM_ID = 'mqpznlno'
const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_FORM_ID}`

/**
 * Email capture for the pre-launch waitlist.
 *
 * On submit, this posts to Formspree, which relays a notification email to
 * epicmouseapp@gmail.com with the signer's address and a submission
 * timestamp. Swap FORMSPREE_FORM_ID above for your own form ID, or replace
 * the fetch call in handleSubmit with a different backend entirely
 * (a Supabase/Firebase function, your own API route, etc.) if you'd rather
 * not depend on Formspree.
 */
export default function WaitlistForm({
  variant = 'inline',
  placeholder = 'you@email.com',
  buttonText = 'Join the waitlist',
  compact = false,
}) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!EMAIL_RE.test(email.trim())) {
      setStatus('error')
      setErrorMsg("That email doesn't look quite right — mind double-checking it?")
      return
    }

    setStatus('loading')
    setErrorMsg('')

    const signedUpAt = new Date().toLocaleString('en-US', {
      dateStyle: 'long',
      timeStyle: 'short',
    })

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          message: `This user, ${email.trim()}, has signed up for the Epic Mouse App waitlist on ${signedUpAt}.`,
          _subject: 'New Epic Mouse App waitlist signup',
        }),
      })

      if (!res.ok) throw new Error('Formspree request failed')

      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMsg("Something went wrong on our end — mind trying again in a moment?")
    }
  }

  if (status === 'success') {
    return (
      <div className={`waitlist waitlist--success waitlist--${variant}`}>
        <span className="waitlist-success-icon">
          <LuCheck size={18} />
        </span>
        <div>
          <p className="waitlist-success-title">You're on the list!</p>
          {!compact && <p className="waitlist-success-sub">We'll email you the moment Epic Mouse launches. First cohort gets early perks.</p>}
        </div>
        <style>{formStyles}</style>
      </div>
    )
  }

  return (
    <form className={`waitlist waitlist--${variant}`} onSubmit={handleSubmit} noValidate>
      <div className="waitlist-row">
        <label htmlFor={`waitlist-email-${variant}`} className="visually-hidden">
          Email address
        </label>
        <input
          id={`waitlist-email-${variant}`}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status === 'error') setStatus('idle')
          }}
          className="waitlist-input"
          aria-invalid={status === 'error'}
          aria-describedby={status === 'error' ? `waitlist-error-${variant}` : undefined}
        />
        <button type="submit" className="btn btn-primary waitlist-btn" disabled={status === 'loading'}>
          {status === 'loading' ? (
            <LuLoaderCircle className="waitlist-spinner" size={18} />
          ) : (
            <>
              {buttonText}
              <LuArrowRight size={18} />
            </>
          )}
        </button>
      </div>
      {status === 'error' && (
        <p id={`waitlist-error-${variant}`} className="waitlist-error" role="alert">
          {errorMsg}
        </p>
      )}
      <style>{formStyles}</style>
    </form>
  )
}

const formStyles = `
  .waitlist-row {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  .waitlist-input {
    flex: 1 1 240px;
    min-width: 0;
    padding: 15px 20px;
    border-radius: 999px;
    border: 1.5px solid hsl(262deg 25% 88%);
    background: white;
    font-family: var(--font-body);
    font-size: 1rem;
    color: var(--ink);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
  .waitlist-input::placeholder {
    color: var(--ink-faint);
  }
  .waitlist-input:focus {
    outline: none;
    border-color: var(--coral);
    box-shadow: 0 0 0 4px hsl(6deg 90% 63% / 0.15);
  }
  .waitlist-input[aria-invalid="true"] {
    border-color: #e0554a;
  }
  .waitlist-btn {
    flex: auto;
    width: 35%;
    padding: 10px;
  }
  .waitlist-spinner {
    animation: spin-slow 0.9s linear infinite;
  }
  .waitlist-error {
    margin-top: 10px;
    color: #c23b2e;
    font-size: 0.88rem;
    font-weight: 500;
  }
  .waitlist--stacked .waitlist-row {
    flex-direction: column;
  }
  .waitlist--stacked .waitlist-input {
    flex: none;
    width: 100%;
  }
  .waitlist--stacked .waitlist-btn {
    width: 100%;
  }
  .waitlist--success {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    background: var(--sage-light);
    border: 1.5px solid hsl(155deg 35% 78%);
    padding: 16px 20px;
    border-radius: 20px;
    animation: count-pop 0.5s cubic-bezier(.22,1,.36,1);
  }
  .waitlist-success-icon {
    flex-shrink: 0;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: var(--sage-dark);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .waitlist-success-title {
    font-family: var(--font-display);
    font-weight: 600;
    color: var(--ink);
    margin-bottom: 2px;
  }
  .waitlist-success-sub {
    color: var(--ink-soft);
    font-size: 0.92rem;
  }
`
