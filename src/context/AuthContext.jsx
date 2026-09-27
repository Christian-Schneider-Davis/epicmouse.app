import { createContext, useContext, useEffect, useState } from 'react'
import {
  auth,
  firebaseReady,
  googleProvider,
  appleProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from '../lib/firebase.js'

const AuthContext = createContext(null)

// Where a signed-in visitor gets taken — the writing app, merged under
// this same domain at /app/. Firebase Auth's session is shared
// automatically since both are served from the same origin.
const APP_URL = '/app/'

function friendlyAuthError(err) {
  const code = err?.code || ''
  if (code.includes('popup-closed-by-user') || code.includes('cancelled-popup-request')) return null
  if (code.includes('popup-blocked')) {
    return 'Your browser blocked the sign-in popup — allow popups for this site and try again.'
  }
  if (code.includes('account-exists-with-different-credential')) {
    return 'That email is already linked to a different sign-in method.'
  }
  if (code.includes('operation-not-allowed')) {
    return "This sign-in method isn't turned on for this app yet."
  }
  if (code.includes('network-request-failed')) {
    return "Couldn't reach the sign-in service — check your connection and try again."
  }
  if (code.includes('email-already-in-use')) {
    return 'An account already exists with that email — try signing in instead.'
  }
  if (code.includes('invalid-email')) {
    return "That email doesn't look quite right — mind double-checking it?"
  }
  if (code.includes('weak-password')) {
    return 'Password needs to be at least 6 characters.'
  }
  if (code.includes('wrong-password') || code.includes('invalid-credential') || code.includes('user-not-found')) {
    return 'Incorrect email or password — mind double-checking them?'
  }
  if (code.includes('too-many-requests')) {
    return 'Too many attempts — please wait a moment and try again.'
  }
  return 'Sign-in failed — please try again.'
}

/**
 * Wraps the whole landing page. Exposes who's signed in (if anyone, via
 * the same Firebase project the writing app uses), the login modal's
 * open/closed state, and the sign-in actions the modal calls.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [authChecked, setAuthChecked] = useState(!firebaseReady)
  const [authError, setAuthError] = useState(null)
  const [justSignedIn, setJustSignedIn] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)

  useEffect(() => {
    if (!firebaseReady) return
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser)
      setAuthChecked(true)
    })
    return unsubscribe
  }, [])

  function openLogin() {
    setAuthError(null)
    setJustSignedIn(false)
    setLoginOpen(true)
  }

  function closeLogin() {
    setLoginOpen(false)
  }

  function goToApp() {
    window.location.href = APP_URL
  }

  async function signInGoogle() {
    setAuthError(null)
    try {
      await signInWithPopup(auth, googleProvider)
      setJustSignedIn(true)
    } catch (err) {
      console.error('Google sign-in failed:', err)
      setAuthError(friendlyAuthError(err))
    }
  }

  async function signInApple() {
    setAuthError(null)
    try {
      await signInWithPopup(auth, appleProvider)
      setJustSignedIn(true)
    } catch (err) {
      console.error('Apple sign-in failed:', err)
      setAuthError(friendlyAuthError(err))
    }
  }

  async function signUpEmail(email, password, displayName) {
    setAuthError(null)
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      if (displayName) {
        await updateProfile(cred.user, { displayName })
      }
      setJustSignedIn(true)
    } catch (err) {
      console.error('Email sign-up failed:', err)
      setAuthError(friendlyAuthError(err))
    }
  }

  async function signInEmail(email, password) {
    setAuthError(null)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      setJustSignedIn(true)
    } catch (err) {
      console.error('Email sign-in failed:', err)
      setAuthError(friendlyAuthError(err))
    }
  }

  // Returns true/false so the modal can show "reset link sent" only once
  // the email has actually gone out.
  async function resetPassword(email) {
    setAuthError(null)
    try {
      await sendPasswordResetEmail(auth, email)
      return true
    } catch (err) {
      console.error('Password reset failed:', err)
      setAuthError(friendlyAuthError(err))
      return false
    }
  }

  async function signOutUser() {
    try {
      await signOut(auth)
    } catch (err) {
      console.error('Sign-out failed:', err)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        authChecked,
        authError,
        setAuthError,
        firebaseReady,
        justSignedIn,
        loginOpen,
        openLogin,
        closeLogin,
        goToApp,
        signInGoogle,
        signInApple,
        signUpEmail,
        signInEmail,
        resetPassword,
        signOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
