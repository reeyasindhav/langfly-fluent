import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "../lib/auth-context";
import { Button } from "../components/ui/button";
import { SiteHeader } from "../components/SiteHeader";
import {
  ArrowRight,
  Check,
  Star,
  Coffee,
  Volume2,
  RotateCw,
  Clock,
  MessageCircle,
  Headphones,
  BookOpen,
  CalendarDays,
  Flame,
  CheckCircle2,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Langfly — Languages Learned Like Fine Recipes" },
      {
        name: "description",
        content:
          "Langfly pairs culinary-themed structured roadmaps, spaced repetition pantry flashcards, and live speaking practice for genuine conversational confidence.",
      },
      { property: "og:title", content: "Langfly — Languages Learned Like Fine Recipes" },
      {
        property: "og:description",
        content:
          "Langfly pairs culinary-themed structured roadmaps, spaced repetition pantry flashcards, and live speaking practice for genuine conversational confidence.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  const { isAuthenticated } = useAuth();

  // Interactive states & animations
  const [demoFlipped, setDemoFlipped] = useState(false);
  const [demoRating, setDemoRating] = useState<string | null>(null);
  const [isHeroSpeaking, setIsHeroSpeaking] = useState(false);
  const [isCardSpeaking, setIsCardSpeaking] = useState(false);

  const speakText = (text: string, lang = "fr-FR", isHero = false) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (isHero) setIsHeroSpeaking(true);
    else setIsCardSpeaking(true);

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.85;

    utterance.onend = () => {
      if (isHero) setIsHeroSpeaking(false);
      else setIsCardSpeaking(false);
    };
    utterance.onerror = () => {
      if (isHero) setIsHeroSpeaking(false);
      else setIsCardSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleRateDemo = (rating: string) => {
    setDemoRating(rating);
    setTimeout(() => {
      setDemoRating(null);
      setDemoFlipped(false);
    }, 2400);
  };

  return (
    <div className="min-h-screen bg-[#fbf9f4] text-[#163b2e] font-sans antialiased selection:bg-[#d7e780] selection:text-[#163b2e]">
      {/* Top Navigation */}
      <SiteHeader />

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 pt-12 pb-20 lg:pt-20 lg:pb-24">
        <div className="grid grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="col-span-12 lg:col-span-7 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#163b2e]/5 border border-[#163b2e]/10 mb-5">
              <span className="relative flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#163b2e] opacity-75" />
                <span className="relative inline-flex rounded-full size-2 bg-[#163b2e]" />
              </span>
              <span className="font-mono text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#163b2e]">
                INGREDIENTS FOR CONVERSATIONAL FLUENCY
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-[68px] font-bold leading-[1.04] tracking-tight font-serif text-[#163b2e]">
              Languages learned like fine recipes.
              <br />
              <span className="italic font-normal text-[#e07a5f]">Spoken with confidence.</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-[#58645b] max-w-xl leading-relaxed font-normal">
              Langfly combines bite-sized pantry vocabulary, spaced repetition recall, and real-time
              conversation sessions. No stale grammar drills. Just real conversational flavor.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Button
                asChild
                className="bg-[#d7e780] hover:bg-[#e4f38e] text-[#163b2e] px-7 py-3.5 h-auto rounded-full font-bold text-base shadow-sm transition-all cursor-pointer group animate-pulse-glow"
              >
                <Link to={isAuthenticated ? "/dashboard" : "/signup"}>
                  <span>{isAuthenticated ? "Enter your kitchen" : "Join the kitchen (Free)"}</span>
                  <ArrowRight className="ml-2 size-4.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                </Link>
              </Button>

              <a
                href="#tasting-menu"
                className="inline-flex items-center justify-center rounded-full border border-[#163b2e]/25 hover:border-[#163b2e] hover:bg-[#eae5da]/50 px-6 py-3.5 text-sm font-bold text-[#163b2e] transition-all"
              >
                Explore the menu
              </a>
            </div>

            {/* Social proof strip */}
            <div className="mt-12 flex flex-wrap items-center gap-6 font-mono text-xs uppercase tracking-[0.15em] text-[#717a73] pt-6 border-t border-[#e8e4dc]">
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#163b2e]" /> 12k+ home learners
              </span>
              <span className="text-[#c2c8c4]">•</span>
              <span>94% recipe recall</span>
              <span className="text-[#c2c8c4]">•</span>
              <span className="flex items-center gap-1 text-[#163b2e] font-bold">
                <Star className="size-3.5 fill-[#163b2e] text-[#163b2e]" /> 4.9 / 5 rating
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual Container ("Today's Special") */}
          <div
            className="col-span-12 lg:col-span-5 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="rounded-3xl bg-[#183d2c] p-7 sm:p-8 text-white shadow-2xl relative overflow-hidden group">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#0d261b]/80 border border-white/10 px-3 py-1 text-xs font-bold text-[#d7e780]">
                  <span className="relative flex size-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d7e780] opacity-75" />
                    <span className="relative inline-flex rounded-full size-2 bg-[#d7e780]" />
                  </span>
                  <span>8 day streak</span>
                </div>
                <span className="font-mono text-xs text-[#d7e780] font-semibold">
                  Today's Special
                </span>
              </div>

              <div className="pt-6 pb-4">
                <h2 className="text-3xl font-bold font-serif leading-tight text-white">
                  French café culture
                </h2>
                <p className="mt-2 text-sm text-white/80 leading-relaxed font-normal">
                  Learn to order like a Parisian local, make charming small talk, and ask for the
                  check without hesitation.
                </p>
              </div>

              {/* Animated Floating Recipe Cards inside Hero */}
              <div className="py-8 flex items-center justify-center gap-5 select-none relative min-h-[160px]">
                {/* Card 1: un croissant (Animated gentle float) */}
                <div className="w-34 rounded-2xl bg-[#d96b52] p-4 text-white shadow-xl animate-float transition-transform duration-300 hover:scale-105 cursor-pointer">
                  <div className="size-8 rounded-full border border-dashed border-white/60 mx-auto grid place-items-center mb-2">
                    <Star className="size-4 text-white fill-white" />
                  </div>
                  <p className="text-xs font-serif font-bold text-center lowercase tracking-wide">
                    un croissant
                  </p>
                  <p className="text-[9px] font-mono text-white/70 text-center mt-0.5">pastry</p>
                </div>

                {/* Card 2: un café (Animated reverse float) */}
                <div className="w-34 rounded-2xl bg-[#faf8f4] border border-[#e8e4dc] p-4 text-[#163b2e] shadow-xl animate-float-reverse transition-transform duration-300 hover:scale-105 cursor-pointer">
                  <div className="size-8 rounded-full bg-[#163b2e]/5 mx-auto grid place-items-center mb-2">
                    <Coffee className="size-4 text-[#163b2e]" />
                  </div>
                  <p className="text-sm font-serif font-bold text-center leading-tight">un café</p>
                  <p className="text-[10px] text-[#717a73] text-center italic mt-0.5">a coffee</p>
                </div>
              </div>

              {/* Bottom Hero Action Bar with Animated Soundwave */}
              <div className="mt-2 pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() =>
                    speakText(
                      "Bonjour ! Un café au lait et un croissant, s'il vous plaît.",
                      "fr-FR",
                      true,
                    )
                  }
                  className="inline-flex items-center gap-2.5 text-xs font-semibold text-[#d7e780] hover:text-white transition-colors cursor-pointer"
                >
                  {isHeroSpeaking ? (
                    <div className="flex items-center gap-1 h-3">
                      <span className="w-1 bg-[#d7e780] rounded-full animate-[wave-bar_0.6s_ease-in-out_infinite]" />
                      <span className="w-1 bg-[#d7e780] rounded-full animate-[wave-bar_0.6s_ease-in-out_infinite_0.15s]" />
                      <span className="w-1 bg-[#d7e780] rounded-full animate-[wave-bar_0.6s_ease-in-out_infinite_0.3s]" />
                    </div>
                  ) : (
                    <Volume2 className="size-4" />
                  )}
                  <span>{isHeroSpeaking ? "Playing audio..." : "Pronounce phrase"}</span>
                </button>

                <Link
                  to={isAuthenticated ? "/dashboard" : "/signup"}
                  className="text-xs font-bold text-white hover:text-[#d7e780] transition-colors inline-flex items-center gap-1"
                >
                  <span>Start lesson</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: The Tasting Menu (Curriculum Roadmap) */}
      <section id="tasting-menu" className="mx-auto max-w-7xl px-6 py-16 border-t border-[#e8e4dc]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#717a73] font-bold mb-2">
              01 — THE TASTING MENU
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-[#163b2e]">
              A structured syllabus from Amuse-Bouche to Master Chef
            </h2>
          </div>
          <p className="text-sm text-[#717a73] mt-2 md:mt-0 font-medium">
            4-stage progression across 60+ conversational scenario modules
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              course: "Course 1 (A1)",
              title: "Amuse-Bouche & Greetings",
              desc: "Essential table greetings, polite requests, numbers, and basic café survival phrases.",
              status: "Foundations",
              color: "border-[#163b2e]/30 bg-white",
              badge: "bg-[#163b2e]/10 text-[#163b2e]",
            },
            {
              course: "Course 2 (A2)",
              title: "Entrées & Dining Out",
              desc: "Ordering specialties, expressing allergies & dietary preferences, transit, and directions.",
              status: "Current Special",
              color: "border-2 border-[#163b2e] bg-white shadow-sm ring-2 ring-[#d7e780]/50",
              badge: "bg-[#d7e780] text-[#163b2e] font-bold",
              highlight: true,
            },
            {
              course: "Course 3 (B1)",
              title: "Main Dishes & Stories",
              desc: "Spontaneous dinner conversations, recounting travel memories, storytelling, and workplaces.",
              status: "Up Next",
              color: "border-[#e8e4dc] bg-white",
              badge: "bg-[#f4f0e8] text-[#717a73]",
            },
            {
              course: "Course 4 (B2)",
              title: "Dessert & Digestif",
              desc: "Cultural nuances, witty retorts, colloquial humor, and passionate debates.",
              status: "Mastery",
              color: "border-[#e8e4dc] bg-[#fbf9f4] opacity-85",
              badge: "bg-[#f4f0e8] text-[#717a73]",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover-lift ${item.color}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-[#717a73]">
                    {item.course}
                  </span>
                  <span
                    className={`font-mono text-[10px] px-2.5 py-0.5 rounded-full ${item.badge}`}
                  >
                    {item.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold font-serif text-[#163b2e] leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#58645b] mt-2.5 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#e8e4dc] flex items-center justify-between">
                <span className="text-xs font-mono text-[#717a73]">12–14 modules</span>
                <Link
                  to={isAuthenticated ? "/roadmap" : "/signup"}
                  className="text-xs font-bold text-[#163b2e] hover:underline inline-flex items-center gap-1 group"
                >
                  <span>View syllabus</span>
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: The Vocabulary Pantry (Spaced Recall Preview with 3D Flip Card) */}
      <section id="pantry" className="mx-auto max-w-7xl px-6 py-16 border-t border-[#e8e4dc]">
        <div className="mb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#717a73] font-bold mb-2">
            02 — PANTRY RECALL
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-[#163b2e]">
            Words that resurface right when you're about to forget
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-8 items-center">
          {/* Interactive 3D Flip Card Demo */}
          <div className="col-span-12 lg:col-span-7 space-y-4">
            <div
              onClick={() => setDemoFlipped((prev) => !prev)}
              className="perspective-1000 cursor-pointer min-h-[300px] select-none group"
            >
              <div
                className={`relative h-[300px] w-full rounded-3xl border-2 transition-transform duration-500 preserve-3d shadow-md ${
                  demoFlipped
                    ? "rotate-y-180 border-[#163b2e] bg-white"
                    : "border-[#e8e4dc] bg-white group-hover:border-[#163b2e]/40"
                }`}
              >
                {/* Front Side */}
                <div className="absolute inset-0 rounded-3xl p-8 flex flex-col justify-between backface-hidden bg-white">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#717a73] font-semibold">
                      French 🇫🇷 • Tap to flip
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        speakText("L'addition, s'il vous plaît.");
                      }}
                      className="p-2 rounded-full hover:bg-[#f7f5ef] text-[#163b2e] transition-colors"
                      title="Pronounce Word"
                    >
                      {isCardSpeaking ? (
                        <div className="flex items-center gap-0.5 h-4">
                          <span className="w-1 bg-[#163b2e] rounded-full animate-[wave-bar_0.6s_ease-in-out_infinite]" />
                          <span className="w-1 bg-[#163b2e] rounded-full animate-[wave-bar_0.6s_ease-in-out_infinite_0.15s]" />
                          <span className="w-1 bg-[#163b2e] rounded-full animate-[wave-bar_0.6s_ease-in-out_infinite_0.3s]" />
                        </div>
                      ) : (
                        <Volume2 className="size-5" />
                      )}
                    </button>
                  </div>

                  <div className="text-center py-4">
                    <p className="text-xs font-mono uppercase text-[#e07a5f] font-bold tracking-widest mb-1">
                      Dining Phrase
                    </p>
                    <h3 className="text-4xl sm:text-5xl font-bold font-serif text-[#163b2e]">
                      l'addition, s'il vous plaît
                    </h3>
                    <p className="mt-3 text-xs text-[#717a73] font-mono">
                      Click anywhere on card or tap to reveal meaning
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-xs text-[#717a73] font-medium">
                    <RotateCw className="size-3.5 transition-transform duration-300 group-hover:rotate-180" />
                    <span>Tap to reveal translation</span>
                  </div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 rounded-3xl p-8 flex flex-col justify-between backface-hidden rotate-y-180 bg-white border-[#163b2e]">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#163b2e] font-bold">
                      Translation & Context
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        speakText("Pardon monsieur, l'addition s'il vous plaît.");
                      }}
                      className="p-2 rounded-full hover:bg-[#f7f5ef] text-[#163b2e] transition-colors"
                      title="Pronounce Sentence"
                    >
                      <Volume2 className="size-5" />
                    </button>
                  </div>

                  <div className="text-center py-2">
                    <h3 className="text-3xl sm:text-4xl font-bold font-serif text-[#163b2e] mb-2">
                      the check / bill, please
                    </h3>
                    <div className="rounded-xl bg-[#f7f5ef] p-3.5 border border-[#e8e4dc] max-w-md mx-auto text-left mt-2">
                      <p className="text-[11px] font-mono uppercase text-[#717a73]">
                        Bistro Example
                      </p>
                      <p className="text-sm font-medium text-[#163b2e] italic mt-0.5">
                        "Pardon monsieur, l'addition s'il vous plaît."
                      </p>
                    </div>
                  </div>

                  <div className="text-center text-xs text-[#717a73] font-mono">
                    Rate your recall difficulty below to schedule next review
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive SRS Rating Controls with Pop-in celebration */}
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => handleRateDemo("again")}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer hover-lift ${
                    demoRating === "again"
                      ? "border-[#d96b52] bg-[#d96b52]/10 text-[#d96b52] font-bold scale-95"
                      : "border-[#e8e4dc] bg-white text-[#d96b52] hover:bg-[#d96b52]/5"
                  }`}
                >
                  <p className="text-xs font-bold">Again</p>
                  <p className="text-[10px] font-mono text-[#717a73]">+0 XP · Due 10m</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleRateDemo("good")}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer hover-lift ${
                    demoRating === "good"
                      ? "border-[#163b2e] bg-[#163b2e]/10 text-[#163b2e] font-bold scale-95"
                      : "border-[#e8e4dc] bg-white text-[#163b2e] hover:bg-[#163b2e]/5"
                  }`}
                >
                  <p className="text-xs font-bold">Good</p>
                  <p className="text-[10px] font-mono text-[#717a73]">+5 XP · Due 2d</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleRateDemo("easy")}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer hover-lift ${
                    demoRating === "easy"
                      ? "border-[#163b2e] bg-[#d7e780] text-[#163b2e] font-bold scale-95"
                      : "border-[#e8e4dc] bg-white text-[#163b2e] hover:bg-[#d7e780]/25"
                  }`}
                >
                  <p className="text-xs font-bold">Easy</p>
                  <p className="text-[10px] font-mono text-[#717a73]">+10 XP · Mastered</p>
                </button>
              </div>

              {/* Toast animation when rated */}
              {demoRating && (
                <div className="rounded-xl bg-[#183d2c] text-white p-3 text-center text-xs font-bold font-mono animate-pop-in flex items-center justify-center gap-2">
                  <CheckCircle2 className="size-4 text-[#d7e780]" />
                  <span>
                    {demoRating === "easy"
                      ? "+10 XP Awarded! Card marked as Mastered (Scheduled in 5 days)"
                      : demoRating === "good"
                        ? "+5 XP Awarded! Scheduled for review in 2 days"
                        : "Card reset for immediate practice"}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Retention Advantage Comparison */}
          <div className="col-span-12 lg:col-span-5 rounded-3xl border border-[#e8e4dc] bg-white p-7 sm:p-8 space-y-6 shadow-xs">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#163b2e] bg-[#d7e780] px-2.5 py-1 rounded-full">
                Ebbinghaus Reset
              </span>
              <h3 className="text-2xl font-bold font-serif text-[#163b2e] mt-3 leading-snug">
                Why standard language apps fail
              </h3>
              <p className="text-xs text-[#58645b] mt-2 leading-relaxed">
                Without spaced reinforcement, self-directed learners lose 68% of vocabulary within
                48 hours. Langfly schedules review moments right as neural pathways begin to fade.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#163b2e] font-bold">Langfly Spaced Recall</span>
                  <span className="font-mono text-[#163b2e] font-bold">
                    94% Retention (30 Days)
                  </span>
                </div>
                <div className="h-3 w-full rounded-full bg-[#f4f0e8] overflow-hidden">
                  <div className="h-full rounded-full bg-[#183d2c] w-[94%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#717a73]">Standard Word Lists & Cramming</span>
                  <span className="font-mono text-[#717a73]">32% Retention (48 Hours)</span>
                </div>
                <div className="h-3 w-full rounded-full bg-[#f4f0e8] overflow-hidden">
                  <div className="h-full rounded-full bg-[#717a73]/40 w-[32%]" />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#e8e4dc]">
              <Link
                to={isAuthenticated ? "/flashcards" : "/signup"}
                className="w-full inline-flex items-center justify-center rounded-full bg-[#163b2e] text-white py-3 px-5 text-xs font-bold hover:bg-[#235342] transition-colors"
              >
                Start building your vocabulary pantry →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: The Chef's Table (Live Practice Hub Preview) */}
      <section id="chefs-table" className="mx-auto max-w-7xl px-6 py-16 border-t border-[#e8e4dc]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#717a73] font-bold mb-2">
              03 — THE CHEF'S TABLE
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-[#163b2e]">
              15-minute speaking sessions with native conversationalists
            </h2>
          </div>
          <p className="text-sm text-[#717a73] mt-2 md:mt-0 font-medium">
            Low-stakes, friendly speaking practice with zero performance anxiety
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Sophie M.",
              lang: "French • Paris",
              level: "A1–C1 Friendly",
              rating: 5.0,
              initials: "SM",
              color: "bg-[#d7e780]",
              slot: "Today, 16:00",
              quote:
                "We'll practice ordering pastries and making casual café small talk without over-correcting.",
            },
            {
              name: "Elena R.",
              lang: "Spanish • Madrid",
              level: "B1 Conversational",
              rating: 4.9,
              initials: "ER",
              color: "bg-[#e8a382]",
              slot: "Tomorrow, 10:30",
              quote:
                "Conversational Spanish should feel like chatting over tapas with a good friend.",
            },
            {
              name: "Marco B.",
              lang: "Italian • Rome",
              level: "A2–B2 Expressive",
              rating: 4.8,
              initials: "MB",
              color: "bg-[#70b791]",
              slot: "Friday, 11:00",
              quote:
                "Focusing on hand gestures, natural cadence, and everyday espresso bar banter.",
            },
          ].map((tutor, i) => (
            <div
              key={i}
              className="rounded-3xl border border-[#e8e4dc] bg-white p-6 shadow-2xs hover:border-[#163b2e]/40 transition-all duration-300 hover-lift flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`size-12 rounded-2xl ${tutor.color} text-[#163b2e] font-bold text-sm grid place-items-center`}
                    >
                      {tutor.initials}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-tight text-[#163b2e]">
                        {tutor.name}
                      </h3>
                      <p className="font-mono text-xs text-[#717a73]">{tutor.lang}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-[#fbf9f4] px-2 py-1 rounded-md border border-[#e8e4dc]">
                    <Star className="size-3.5 fill-[#163b2e] text-[#163b2e]" />
                    <span className="font-mono text-xs font-bold text-[#163b2e]">
                      {tutor.rating}
                    </span>
                  </div>
                </div>

                <div className="rounded-xl bg-[#f7f5ef] p-3 text-xs text-[#58645b] italic mb-4">
                  "{tutor.quote}"
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-[#717a73]">
                  <Clock className="size-3.5" /> Next slot:{" "}
                  <strong className="text-[#163b2e]">{tutor.slot}</strong>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#e8e4dc]">
                <Button
                  asChild
                  className="w-full bg-[#163b2e] hover:bg-[#22503f] text-white rounded-full text-xs font-bold py-2.5 h-auto cursor-pointer shadow-xs"
                >
                  <Link to={isAuthenticated ? "/practice" : "/signup"}>
                    Reserve a 15-min seat →
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Kitchen Stories (Testimonials) */}
      <section id="stories" className="mx-auto max-w-7xl px-6 py-16 border-t border-[#e8e4dc]">
        <div className="mb-10 text-center max-w-xl mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#717a73] font-bold mb-2">
            04 — KITCHEN STORIES
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-[#163b2e]">
            Learners who finally stopped forgetting what they studied
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              quote:
                "I finally stopped relearning the same 40 words over and over. The pantry deck just brings them back at the exact right moment.",
              author: "Priya N.",
              meta: "French learner • Week 11",
            },
            {
              quote:
                "The live sessions got me through my first real ordering at a Paris bakery. Ten minutes with a tutor, zero panic at the counter.",
              author: "Theo R.",
              meta: "Spanish & French • Week 7",
            },
            {
              quote:
                "The tasting menu syllabus is the first thing that made a course feel finishable. I actually know where I am on the route.",
              author: "Aisha K.",
              meta: "Japanese learner • Week 19",
            },
          ].map((t, i) => (
            <div
              key={i}
              className="rounded-3xl border border-[#e8e4dc] bg-white p-7 shadow-2xs hover-lift flex flex-col justify-between transition-all duration-300"
            >
              <blockquote className="text-base font-serif italic text-[#163b2e] leading-relaxed">
                "{t.quote}"
              </blockquote>
              <div className="mt-6 pt-4 border-t border-[#e8e4dc]">
                <p className="text-sm font-bold text-[#163b2e]">{t.author}</p>
                <p className="text-xs font-mono text-[#717a73] mt-0.5">{t.meta}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Conversion Banner */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-3xl bg-[#183d2c] text-white p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="max-w-lg">
            <h2 className="text-3xl md:text-4xl font-bold font-serif tracking-tight leading-tight text-white">
              Ready to start cooking up your new language?
            </h2>
            <p className="mt-3 text-white/80 text-sm md:text-base leading-relaxed font-normal">
              Join thousands of learners building real conversational muscle memory. Start free
              today with no credit card required.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Button
              asChild
              className="bg-[#d7e780] hover:bg-[#e4f38e] text-[#163b2e] px-8 py-3.5 h-auto rounded-full font-bold text-base shadow-sm cursor-pointer animate-pulse-glow"
            >
              <Link to="/signup">Claim your kitchen pass →</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
