/**
 * Firebase, loaded straight from Google's CDN as real ES modules — no
 * `npm install` required. Vite (and the browser) treat an https:// import
 * specifier as external and fetch it directly, so this works in both
 * `npm run dev` and a production build with zero bundler config.
 *
 * This is the SAME Firebase project (epic-mouse-app) the writing app at
 * /app/ uses. Because both are served from the same origin (epicmouse.app)
 * once deployed together, signing in here and signing in there share one
 * session automatically — no token hand-off needed.
 *
 * To go live: copy the writing app's .env values into a `.env` file here
 * too (see `.env.example`), and make sure Email/Password + Google (+
 * Apple, later) are turned on in the Firebase console for this project.
 */
import { initializeApp, getApps } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js'
import {
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// True once the .env file is actually filled in. Lets the login modal
// show a friendly "not configured yet" state instead of throwing.
export const firebaseReady = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId)

const app = firebaseReady ? (getApps()[0] ?? initializeApp(firebaseConfig)) : null

export const auth = firebaseReady ? getAuth(app) : null

export const googleProvider = new GoogleAuthProvider()

export const appleProvider = new OAuthProvider('apple.com')
appleProvider.addScope('email')
appleProvider.addScope('name')

export {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
}
