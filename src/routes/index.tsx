import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
import {
  Layers,
  Map,
  CalendarDays,
  Trophy,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Langfly — Learn, Retain, Speak" },
      { name: "description", content: "Langfly pairs spaced flashcards with live speaking practice so new words stick and your confidence follows." },
      { property: "og:title", content: "Langfly — Learn, Retain, Speak" },
      { property: "og:description", content: "Langfly pairs spaced flashcards with live speaking practice so new words stick and your confidence follows." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <LandingNav />

      <section className="mx-auto max-w-6xl px-6 pt-16 pb-12 lg:pt-24">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-7 animate-fade-up">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-coral mb-5">
              / Language retention, rebuilt
            </p>
            <h1 className="text-5xl md:text-6xl font-bold leading-[1.02] tracking-tight">
              Speak a language
              <br />
              you actually <span className="text-coral">remember.</span>
            </h1>
            <p className="mt-6 text-lg text-brand/60 max-w-md leading-relaxed">
              Langfly pairs spaced flashcards with live speaking practice, so new words stick and your confidence finally follows.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild className="bg-coral text-white hover:bg-brand px-6 py-3 h-auto rounded-md">
                <Link to="/signup">Begin your streak</Link>
              </Button>
              <Button asChild variant="outline" className="border-brand/20 hover:border-brand px-4 py-3 h-auto rounded-md">
                <Link to="/roadmap">See a roadmap</Link>
              </Button>
            </div>
            <div className="mt-10 flex items-center gap-5 font-mono text-[11px] uppercase tracking-[0.15em] text-brand/40">
              <span>12k learners</span>
              <span className="text-brand/20">/</span>
              <span>94% recall</span>
              <span className="text-brand/20">/</span>
              <span>4.9 rating</span>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <div className="border border-border rounded-xl bg-card p-6 hover-lift">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Today</span>
                <span className="font-mono text-xs text-mint">Day 42</span>
              </div>
              <div className="py-5 flex items-center gap-4">
                <div className="text-5xl font-bold leading-none">
                  40<span className="text-2xl text-brand/30">/60</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold mb-2">Words recalled</p>
                  <div className="h-2 rounded-full bg-brand/10 overflow-hidden">
                    <div className="h-full rounded-full bg-mint" style={{ width: "66%" }} />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
                <div className="rounded-lg bg-cream p-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Streak</p>
                  <p className="text-2xl font-bold text-coral">18</p>
                </div>
                <div className="rounded-lg bg-cream p-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Level</p>
                  <p className="text-2xl font-bold">B1</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap preview */}
      <section className="mx-auto max-w-6xl px-6 py-12 border-t border-border">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-2">01 — Roadmap</p>
            <h2 className="text-3xl font-bold tracking-tight">A path that bends as you learn</h2>
          </div>
          <span className="hidden sm:block font-mono text-xs text-muted-foreground">Unit 3 of 8</span>
        </div>
        <div className="grid grid-cols-12 gap-4">
          {[
            { label: "Done", title: "Greetings & Small Talk", progress: "12 / 12 modules", color: "bg-mint" },
            { label: "Current", title: "Ordering & Dining Out", progress: "7 / 12 modules", color: "bg-coral", active: true },
            { label: "Up next", title: "Travel & Directions", progress: "0 / 14 modules", color: "bg-brand/20" },
            { label: "Locked", title: "Workplace & Meetings", progress: "0 / 10 modules", color: "bg-brand/20", dashed: true },
          ].map((item, i) => (
            <div
              key={i}
              className={`col-span-12 sm:col-span-6 lg:col-span-3 rounded-xl border ${
                item.active ? "border-2 border-coral" : item.dashed ? "border-dashed border-border" : "border-border"
              } bg-card p-5 hover-lift`}
            >
              <p className={`font-mono text-[10px] uppercase tracking-[0.15em] mb-3 ${item.active ? "text-coral" : "text-muted-foreground"}`}>
                {item.label}
              </p>
              <p className={`font-semibold text-lg leading-tight ${item.dashed ? "text-brand/60" : ""}`}>{item.title}</p>
              <p className="text-sm text-muted-foreground mt-1">{item.progress}</p>
              <div className="mt-4 flex items-center gap-1.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} className={`size-2 rounded-full ${item.color}`} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-12 border-t border-border">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-2">02 — Recall</p>
            <h2 className="text-3xl font-bold tracking-tight">Cards that resurface right when you'll forget</h2>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-7 animate-fade-up" style={{ animationDelay: "0.05s" }}>
            <div className="rounded-2xl border border-border bg-card p-8 hover-lift">
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Card 5 / 20</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-lemon">Reviewing · due 2d</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">French → English</p>
              <p className="text-4xl md:text-5xl font-bold tracking-tight mb-2">la bibliothèque</p>
              <p className="text-lg text-muted-foreground mb-8">Tap to reveal the meaning</p>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 text-coral border-coral/20 hover:border-coral hover:bg-coral/5">Again</Button>
                <Button variant="outline" className="flex-1 text-mint border-mint/20 hover:border-mint hover:bg-mint/5">Good</Button>
                <Button className="flex-1 bg-brand text-cream hover:bg-mint">Easy</Button>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <div className="rounded-2xl border border-border bg-brand text-cream p-6 h-full">
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/50">Daily challenges</span>
                <span className="font-mono text-[11px] text-lemon">3 of 5 done</span>
              </div>
              <ul className="divide-y divide-cream/10">
                {[
                  { text: "Recall 10 dining words", done: true, xp: 10 },
                  { text: "Read one news short", done: true, xp: 15 },
                  { text: "Book a 10-min speaking slot", done: false, xp: 25, active: true },
                  { text: "Speak for 2 minutes straight", done: false, xp: 20 },
                ].map((c, i) => (
                  <li key={i} className="flex items-center gap-3 py-3">
                    <span
                      className={`size-5 rounded-full grid place-items-center text-xs font-bold ${
                        c.done ? "bg-mint text-white" : "bg-cream/10 text-cream/60"
                      }`}
                    >
                      {c.done ? "✓" : i + 1}
                    </span>
                    <span className="text-sm flex-1">{c.text}</span>
                    <span className={`font-mono text-[10px] ${c.active ? "text-lemon" : "text-cream/40"}`}>
                      +{c.xp} XP
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="mx-auto max-w-6xl px-6 py-12 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden border border-border">
          {[
            { label: "Words known", value: "1,284", note: "+64 this week", noteColor: "text-mint" },
            { label: "Speaking time", value: "3h 12m", note: "across 9 sessions", noteColor: "text-muted-foreground" },
            { label: "Recall rate", value: "94%", note: "30-day average", noteColor: "text-muted-foreground", valueColor: "text-coral" },
            { label: "Confidence", value: "7.2", note: "trending up", noteColor: "text-mint", suffix: "/10" },
          ].map((s, i) => (
            <div key={i} className="bg-card p-6 hover-lift">
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-2">{s.label}</p>
              <p className={`text-3xl font-bold ${s.valueColor ?? ""}`}>
                {s.value}
                {s.suffix && <span className="text-lg text-brand/30">{s.suffix}</span>}
              </p>
              <p className={`text-xs mt-1 ${s.noteColor}`}>{s.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features grid */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-border">
        <div className="mb-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-2">03 — Method</p>
          <h2 className="text-3xl font-bold tracking-tight">Everything you need, in one place</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Map, title: "Roadmap", desc: "Themed units that show your whole route from first words to fluent conversations." },
            { icon: Layers, title: "Flashcards", desc: "Spaced repetition keeps words alive. Review them exactly when you need to." },
            { icon: Trophy, title: "Challenges", desc: "Small daily wins build momentum without turning study into a game show." },
            { icon: CalendarDays, title: "Live practice", desc: "Book real speaking sessions with tutors when you're ready to talk." },
          ].map((f, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-5 hover-lift">
              <div className="mb-3 grid size-10 place-items-center rounded-lg bg-cream text-coral">
                <f.icon className="size-5" />
              </div>
              <h3 className="text-lg font-semibold mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-border">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { quote: "I finally stopped relearning the same 40 words. The deck just brings them back at the right time.", author: "Priya N.", meta: "French, week 11" },
            { quote: "The live sessions got me through my first real ordering at a restaurant. Ten minutes, zero panic.", author: "Theo R.", meta: "Spanish, week 7" },
            { quote: "The roadmap is the first thing that made a course feel finishable. I actually know where I am.", author: "Aisha K.", meta: "Japanese, week 19" },
          ].map((t, i) => (
            <figure key={i} className="rounded-xl border border-border bg-card p-6 hover-lift">
              <blockquote className="text-lg font-medium leading-snug">"{t.quote}"</blockquote>
              <figcaption className="mt-4 text-sm text-muted-foreground">
                {t.author} · {t.meta}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-2xl bg-brand text-cream p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Start your streak today</h2>
            <p className="mt-2 text-cream/70 max-w-md">Join thousands of learners who finally stopped forgetting what they studied.</p>
          </div>
          <Button asChild className="bg-coral text-white hover:bg-cream hover:text-brand px-8 py-3 h-auto rounded-md text-base">
            <Link to="/signup">Create free account</Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid size-8 place-items-center rounded-lg bg-brand text-cream text-lg font-bold">L</span>
            <span className="text-lg font-bold">Langfly</span>
            <span className="text-sm text-muted-foreground">Learn it. Keep it. Say it.</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/login" className="story-link">Log in</Link>
            <Link to="/signup" className="story-link">Sign up</Link>
            <span className="hover:text-coral cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-coral cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function LandingNav() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-border bg-background/85 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid size-8 place-items-center rounded-lg bg-brand text-cream text-lg font-bold">L</span>
          <span className="text-xl font-bold tracking-tight">Langfly</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand/40 border border-brand/15 px-2 py-0.5 rounded hidden sm:inline-block">
            v2.4
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm text-brand/70">
          <Link to="/roadmap" className="story-link">Roadmap</Link>
          <Link to="/flashcards" className="story-link">Flashcards</Link>
          <Link to="/practice" className="story-link">Practice</Link>
          <Link to="/progress" className="story-link">Progress</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="text-sm font-medium px-3 py-2 hover:text-coral">
            <Link to="/login">Log in</Link>
          </Button>
          <Button asChild className="text-sm font-semibold bg-brand text-cream px-4 py-2 h-auto rounded-md hover:bg-coral">
            <Link to="/signup">Start free</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
