import { AuthProvider } from './context/AuthContext.jsx'
import LoginModal from './components/LoginModal.jsx'
import CookieConsentBanner from './components/CookieConsentBanner.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import VideoShowcase from './components/VideoShowcase.jsx'
import ProblemSolution from './components/ProblemSolution.jsx'
import Features from './components/Features.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import ADHDScience from './components/ADHDScience.jsx'
import FAQ from './components/FAQ.jsx'
import FinalCTA from './components/FinalCTA.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <main>
        <Hero />
        <VideoShowcase />
        <ProblemSolution />
        <Features />
        <HowItWorks />
        <ADHDScience />
        <FAQ />
        <FinalCTA />


      </main>
      <Footer />
      <LoginModal />
      <CookieConsentBanner />
    </AuthProvider>
  )
}

export default App
