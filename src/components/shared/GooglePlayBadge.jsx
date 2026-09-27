import { FaGooglePlay } from 'react-icons/fa'

export default function GooglePlayBadge({ size = 'md', href = '#waitlist' }) {
  return (
    <a href={href} className={`asb asb--${size}`}>
      <FaGooglePlay className="asb-icon asb-icon--play" aria-hidden="true" />
      <span className="asb-copy">
        <span className="asb-eyebrow">Download now</span>
        <span className="asb-store">Google Play</span>
      </span>
      <style>{`
        .asb {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: #14121f;
          color: white;
          padding: 10px 20px 10px 16px;
          border-radius: 14px;
          border: 1px solid hsl(0 0% 100% / 0.08);
          transition: transform 0.25s cubic-bezier(.22,1,.36,1), box-shadow 0.25s ease, background 0.25s ease;
          box-shadow: 0 10px 26px hsl(262deg 50% 10% / 0.28);
        }
        .asb:hover {
          transform: translateY(-2px);
          background: #201d30;
          box-shadow: 0 16px 32px hsl(262deg 50% 10% / 0.36);
        }
        .asb-icon {
          font-size: 1.9rem;
          flex-shrink: 0;
        }
        .asb-icon--play {
          font-size: 1.5rem;
        }
        .asb-copy {
          display: flex;
          flex-direction: column;
          line-height: 1.15;
        }
        .asb-eyebrow {
          font-size: 0.66rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: hsl(0 0% 100% / 0.65);
        }
        .asb-store {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.15rem;
        }
        .asb--sm {
          padding: 7px 14px 7px 12px;
          border-radius: 11px;
        }
        .asb--sm .asb-icon {
          font-size: 1.15rem;
        }
        .asb--sm .asb-store {
          font-size: 0.92rem;
        }
      `}</style>
    </a>
  )
}
