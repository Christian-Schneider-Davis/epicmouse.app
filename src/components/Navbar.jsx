import { useEffect, useState } from 'react'
import { LuMenu, LuX } from 'react-icons/lu'

const LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#story', label: 'The Story' },
  { href: '#faq', label: 'FAQ' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleLinkClick = () => setOpen(false)

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#top" className="nav-brand" onClick={handleLinkClick}>
          <img src="/apple-touch-icon.png" alt="" className="nav-brand-icon" width={36} height={36} />
          <span className="nav-brand-name">Epic Mouse</span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-cta">
          <a href="#waitlist" className="btn btn-primary btn-sm">
            Join Waitlist
          </a>
        </div>

        <button
          className="nav-burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <LuX size={24} /> : <LuMenu size={24} />}
        </button>
      </div>

      {open && (
        <div className="nav-mobile">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav-mobile-link" onClick={handleLinkClick}>
              {link.label}
            </a>
          ))}
          <a href="#waitlist" className="btn btn-primary btn-block" onClick={handleLinkClick}>
            Join Waitlist
          </a>
        </div>
      )}

      <style>{`
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding-block: 18px;
          transition: padding 0.3s ease, background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease;
        }
        .nav--scrolled {
          padding-block: 10px;
          background: hsl(38deg 45% 97% / 0.78);
          backdrop-filter: blur(14px) saturate(1.4);
          -webkit-backdrop-filter: blur(14px) saturate(1.4);
          box-shadow: 0 4px 24px hsl(262deg 40% 20% / 0.06);
        }
        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .nav-brand-icon {
          border-radius: 10px;
          box-shadow: var(--shadow-sm);
        }
        .nav-brand-name {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.15rem;
          color: var(--ink);
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 30px;
        }
        .nav-link {
          font-weight: 600;
          font-size: 0.94rem;
          color: var(--ink-soft);
          transition: color 0.2s ease;
          position: relative;
        }
        .nav-link:hover {
          color: var(--ink);
        }
        .nav-burger {
          display: none;
          background: none;
          border: none;
          color: var(--ink);
          padding: 6px;
        }
        .nav-mobile {
          display: none;
        }

        @media (max-width: 860px) {
          .nav-links, .nav-cta {
            display: none;
          }
          .nav-burger {
            display: inline-flex;
          }
          .nav-mobile {
            display: flex;
            flex-direction: column;
            gap: 4px;
            padding: 16px 24px 24px;
            background: var(--cream-soft);
            border-top: 1px solid hsl(262deg 25% 90%);
          }
          .nav-mobile-link {
            padding: 14px 4px;
            font-weight: 600;
            color: var(--ink);
            border-bottom: 1px solid hsl(262deg 25% 92%);
          }
          .nav-mobile .btn {
            margin-top: 14px;
          }
        }
      `}</style>
    </header>
  )
}
