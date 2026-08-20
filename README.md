# Epic Mouse — Landing Page

A one-page React + Vite marketing site for **Epic Mouse**, a "coming soon" iOS writing
companion app built for ADHD brains (and anyone who needs a few extra dopamine hits to
keep writing). Built from the project's source video and working-title brand assets.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build      # production build -> dist/
npm run preview    # preview the production build
```

Requires Node 18+.

## Project structure

```
src/
  App.jsx                     – assembles all sections in order
  index.css                   – design tokens, resets, animation keyframes
  hooks/
    useReveal.js               – IntersectionObserver scroll-reveal hook
    useCountUp.js               – animated number counter
  components/
    Navbar.jsx
    Hero.jsx
    VideoShowcase.jsx
    ProblemSolution.jsx
    Features.jsx
    HowItWorks.jsx
    StoryWorld.jsx
    ADHDScience.jsx
    FAQ.jsx
    CountdownWaitlist.jsx
    FinalCTA.jsx
    Footer.jsx
    shared/
      Reveal.jsx               – scroll-reveal wrapper
      SectionHeading.jsx
      Sparkles.jsx              – decorative floating sparkle field
      AppStoreBadge.jsx         – "coming soon" App Store badge
      WaitlistForm.jsx          – email capture (see note below)
public/
  media/                       – hero video (cropped/optimized) + story stills
  favicon-*.png, apple-touch-icon.png, og-image.jpg
```

No animation library is used — all motion is CSS keyframes plus a small
IntersectionObserver hook, so the dependency footprint stays light
(`react`, `react-dom`, `react-icons` only).

## Before you launch — things to wire up

This is a front-end-only build. A few things are intentionally stubbed and should be
connected before it goes live:

1. **Waitlist emails** — `src/components/shared/WaitlistForm.jsx` validates the email
   and simulates a submit, but doesn't send anywhere yet. Wire `handleSubmit` up to a
   real endpoint (Formspree, a Supabase/Firebase function, ConvertKit, Mailchimp, your
   own API route, etc.).
2. **App Store link** — `src/components/shared/AppStoreBadge.jsx` currently links to the
   `#waitlist` section rather than a real App Store URL, since the app hasn't shipped.
   Swap the `href` once the listing is live, and consider changing the copy from
   "Coming soon" once it's real.
3. **Launch countdown date** — `src/components/CountdownWaitlist.jsx` has a
   `LAUNCH_TARGET` placeholder date. Update it to your real target (or remove the
   countdown block if you'd rather not commit to a public date).
4. **Brand name** — "Epic Mouse" is the working title used throughout copy, the page
   title/meta tags, and filenames. Find-and-replace if you land on a different final
   name.
5. **Social links** — the footer's Instagram/Twitter icons currently point to `#`.
6. **Pricing / privacy specifics** in the FAQ are intentionally non-committal since
   those decisions haven't been made yet — tighten the copy once they are.

## Assets

The hero video and story stills in `public/media/` were extracted from the source
clip you supplied, with the video-player UI chrome cropped out and everything
re-encoded for the web (H.264 + WebP stills). `mouse-hero-loop.mp4` is a muted,
lower-res loop for ambient backgrounds; `mouse-hero-web.mp4` keeps the original audio
for the "watch with sound" showcase player.
