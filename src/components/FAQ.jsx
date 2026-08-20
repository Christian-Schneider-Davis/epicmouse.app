import { useState } from 'react'
import { LuChevronDown } from 'react-icons/lu'
import SectionHeading from './shared/SectionHeading.jsx'
import Reveal from './shared/Reveal.jsx'

const FAQS = [
    {
    q: 'When does Epic Mouse launch?',
    a: "We're putting the finishing touches on it now. Join the waitlist and you'll be the first to know the moment it's available on the App Store — plus you'll get early access before the general public.",
  },
  {
    q: 'Do I need to be diagnosed with ADHD to use Epic Mouse?',
    a: "Not at all. Epic Mouse was designed with ADHD brains front of mind, but it's genuinely for anyone who struggles with motivation, procrastination, or blank-page anxiety — students, novelists, journalers, students cramming a thesis, all of it.",
  },

  {
    q: 'Will Epic Mouse be free?',
    a: "We're still finalizing pricing. Waitlist members will always be the first to hear about launch pricing and any early-bird offers, before anyone else.",
  },
  {
    q: 'What devices will it work on?',
    a: "Epic Mouse is launching first on iPhone. We're listening closely to waitlist feedback to help decide what comes next.",
  },
  {
    q: 'Is my writing private?',
    a: 'Your words are yours. Epic Mouse is built as a personal writing space first. Full privacy details will be published alongside the App Store listing at launch.',
  },
  {
    q: "How is this different from any other habit tracker apps?",
    a: "Those apps are wonderful, but they're general habit tools. Epic Mouse App is purpose-built for writing specifically. The rewards and story are all tuned around the act of getting words on the page.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="faq section">
      <div className="container">
        <SectionHeading eyebrow="Questions" title="Everything you're probably wondering" />

        <div className="faq-list">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <Reveal as="div" type="fade" delay={i * 60} key={item.q} className="faq-item">
                <button
                  className="faq-question"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                >
                  <span>{item.q}</span>
                  <LuChevronDown className={`faq-chevron ${isOpen ? 'faq-chevron--open' : ''}`} size={20} />
                </button>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  className="faq-answer"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <p className="faq-answer-inner">{item.a}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>

      <style>{`
        .faq-list {
          max-width: 760px;
          margin-inline: auto;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .faq-item {
          background: var(--paper);
          border: 1px solid hsl(262deg 30% 92%);
          border-radius: var(--radius-md);
          overflow: hidden;
        }
        .faq-question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          background: none;
          border: none;
          padding: 20px 24px;
          text-align: left;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.02rem;
          color: var(--ink);
        }
        .faq-chevron {
          flex-shrink: 0;
          color: var(--coral);
          transition: transform 0.3s cubic-bezier(.22,1,.36,1);
        }
        .faq-chevron--open {
          transform: rotate(180deg);
        }
        .faq-answer {
          display: grid;
          transition: grid-template-rows 0.35s cubic-bezier(.22,1,.36,1);
        }
        .faq-answer-inner {
          overflow: hidden;
          padding: 0 24px 20px;
          color: var(--ink-soft);
          font-size: 0.95rem;
        }
      `}</style>
    </section>
  )
}
