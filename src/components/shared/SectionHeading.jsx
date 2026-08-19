import Reveal from './Reveal.jsx'

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center' }) {
  return (
    <Reveal
      type="fade"
      className="section-head"
      style={align === 'left' ? { marginInline: 0, textAlign: 'left' } : undefined}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-sub">{subtitle}</p>}
    </Reveal>
  )
}
