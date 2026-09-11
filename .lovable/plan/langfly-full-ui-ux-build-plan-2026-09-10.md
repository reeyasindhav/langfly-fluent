# Langfly — Full UI/UX Build Plan

## Direction

Typographic Stepped: warm cream background, Space Grotesk/Space Mono, coral/mint/lemon accents, card-based surfaces, clear typographic hierarchy.

## Pages (10)

1. `/` — Landing page (hero, roadmap preview, flashcards preview, challenges preview, stats strip, footer)
2. `/login` — Sign in form
3. `/signup` — Create account form
4. `/dashboard` — Authenticated home with today’s path, streak, quick actions
5. `/roadmap` — Full learning path / units
6. `/flashcards` — Interactive flip flashcards with rating (Again/Good/Easy)
7. `/challenges` — Daily challenge quiz
8. `/practice` — Live practice booking with tutors and time slots
9. `/progress` — Stats charts and weekly activity
10. `/profile` — User profile and settings

## Auth / Data

- localStorage-only mock auth and progress data (per user request: mock data only).
- Auth context: sign up, log in, log out, current user.
- Data context: streak, XP, words known, roadmap progress, flashcards due, challenges, booked sessions.
- Persist state in `localStorage`; seed initial demo data on first visit.

## Tech

- TanStack Router file routes under `src/routes/`.
- Pathless `_authenticated` layout for pages 4–10; redirects to `/login` if not signed in.
- Public routes 1–3.
- Tailwind v4 tokens in `src/styles.css`.
- Fonts loaded in `src/routes/__root.tsx` via `<link>`.
- CSS keyframe animations in `src/styles.css`.

## Visual polish

- Page transitions / fade-in sections.
- 3D flip animation on flashcards.
- Hover lifts on cards.
- Progress bars, streak flame, XP badges.
- Mobile responsive sidebar sheet.

## Verification

- Build/dev passes.
- Spot-check each route loads and interactions update localStorage state.
