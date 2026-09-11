import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "../../lib/auth-context";
import { useData } from "../../lib/data-context";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Star,
  MessageCircle,
  Headphones,
  BookOpen,
  Key,
  Users,
  Clock,
  Play,
  Mic,
  CheckCircle2,
  Coffee,
  Check,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Today's Menu — Langfly" },
      {
        name: "description",
        content: "What are we cooking up today? Your daily personalized language path.",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { user } = useAuth();
  const { data, completeChallenge } = useData();

  const [activeFilter, setActiveFilter] = useState<"all" | "speaking" | "listening">("all");
  const [challengeModalOpen, setChallengeModalOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDone, setRecordingDone] = useState(false);
  const [subModalOpen, setSubModalOpen] = useState(false);

  const userName = user?.name ? user.name.split(" ")[0].toUpperCase() : "ALEX";

  const weekDays = [
    { name: "Mon", day: 12, status: "Done", icon: true },
    { name: "Tue", day: 13, status: "Done", icon: true },
    { name: "Wed", day: 14, status: "Today", isToday: true },
    { name: "Thu", day: 15, status: "Up next" },
    { name: "Fri", day: 16, status: "Up next" },
    { name: "Sat", day: 17, status: "Up next" },
    { name: "Sun", day: 18, status: "Up next" },
  ];

  const handleStartRecording = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setRecordingDone(true);
      completeChallenge("c4");
    }, 2800);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Top Header: Greeting & Manage Subscription */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#163b2e]">
            GOOD MORNING, {userName}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#163b2e] font-serif mt-1">
            What are we cooking up today?
          </h1>
        </div>

        <button
          type="button"
          onClick={() => setSubModalOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#163b2e] hover:bg-[#1e4e3c] px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <span>Manage subscription</span>
          <ChevronDown className="size-3.5" />
        </button>
      </div>

      {/* Hero Banner: Today's Special */}
      <div className="relative rounded-3xl bg-[#183d2c] p-7 md:p-9 text-white shadow-sm overflow-hidden">
        <div className="relative z-10 max-w-xl">
          {/* Streak pill */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#0d261b]/80 border border-white/10 px-3 py-1 text-xs font-bold text-[#d7e780] mb-4">
            <span>🔥</span>
            <span>8 day streak</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold tracking-tight font-serif leading-[1.1]">
            Today's special:
            <br />
            <span className="text-[#e2f08a]">French café culture</span>
          </h2>

          <p className="mt-3 text-sm text-white/80 leading-relaxed max-w-md font-normal">
            Learn to order like a local, make small talk, and find your new favorite spot in Paris.
          </p>

          <Link
            to="/roadmap"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#d7e780] hover:bg-[#e4f38e] text-[#163b2e] px-5 py-2.5 text-sm font-bold mt-6 transition-all shadow-xs group"
          >
            <span>Start today's lesson</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Decorative Floating Flashcards (Right) */}
        <div className="hidden md:flex absolute right-12 top-1/2 -translate-y-1/2 items-center gap-4 pointer-events-none select-none">
          {/* Tilted Terracotta Card: un croissant (using Star icon) */}
          <div className="w-32 rounded-2xl bg-[#d96b52] p-4 text-white shadow-xl rotate-[-6deg] transition-transform hover:rotate-0">
            <div className="size-8 rounded-full border border-dashed border-white/50 mx-auto grid place-items-center mb-2">
              <Star className="size-4 text-white fill-white" />
            </div>
            <p className="text-xs font-serif font-bold text-center lowercase tracking-wide">
              un croissant
            </p>
          </div>

          {/* Tilted Cream Card: un café */}
          <div className="w-32 rounded-2xl bg-[#faf8f4] border border-[#e8e4dc] p-4 text-[#163b2e] shadow-xl rotate-[8deg] transition-transform hover:rotate-0">
            <div className="size-8 rounded-full bg-[#163b2e]/5 mx-auto grid place-items-center mb-2">
              <Coffee className="size-4 text-[#163b2e]" />
            </div>
            <p className="text-sm font-serif font-bold text-center leading-tight">un café</p>
            <p className="text-[10px] text-[#717a73] text-center italic mt-0.5">a coffee</p>
          </div>
        </div>
      </div>

      {/* Your Week at a Glance Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-[#163b2e] font-serif">
              Your week at a glance
            </h2>
            <p className="text-xs text-[#717a73] mt-0.5">A little every day goes a long way.</p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#163b2e]">
            <button
              type="button"
              className="p-1 rounded-md hover:bg-[#eae5da]/60 text-[#717a73] hover:text-[#163b2e] transition-colors"
              title="Previous month"
            >
              <ChevronLeft className="size-4" />
            </button>
            <span className="font-serif font-bold">September 2022</span>
            <button
              type="button"
              className="p-1 rounded-md hover:bg-[#eae5da]/60 text-[#717a73] hover:text-[#163b2e] transition-colors"
              title="Next month"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        {/* 7 Daily Cards Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {weekDays.map((item) => (
            <div
              key={item.day}
              className={`rounded-2xl p-4 transition-all ${
                item.isToday
                  ? "bg-[#183d2c] text-white shadow-sm ring-1 ring-[#183d2c]"
                  : "bg-white border border-[#e8e4dc] text-[#163b2e]"
              }`}
            >
              <p
                className={`text-xs font-medium ${
                  item.isToday ? "text-white/80" : "text-[#717a73]"
                }`}
              >
                {item.name}
              </p>
              <p
                className={`text-2xl font-bold font-serif mt-1 ${
                  item.isToday ? "text-white" : "text-[#163b2e]"
                }`}
              >
                {item.day}
              </p>

              <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold">
                {item.icon ? (
                  <>
                    <Check className="size-3 text-[#163b2e] stroke-[3]" />
                    <span>Done</span>
                  </>
                ) : item.isToday ? (
                  <>
                    <span className="size-2 rounded-full bg-[#d7e780]" />
                    <span className="text-[#d7e780]">Today</span>
                  </>
                ) : (
                  <>
                    <span className="size-1.5 rounded-full bg-[#c2c8c4]" />
                    <span className="text-[#717a73]">Up next</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: On Today's Menu (8 cols) + Right Rail Widgets (4 cols) */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: On Today's Menu */}
        <div className="col-span-12 lg:col-span-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-[#163b2e] font-serif">
                On today's menu
              </h2>
              <p className="text-xs text-[#717a73] mt-0.5">
                Handpicked to keep your momentum going.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  activeFilter === "all"
                    ? "bg-[#d7e780] text-[#163b2e]"
                    : "bg-white border border-[#e8e4dc] text-[#556157] hover:border-[#163b2e]/40"
                }`}
              >
                All lessons
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter("speaking")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  activeFilter === "speaking"
                    ? "bg-[#d7e780] text-[#163b2e]"
                    : "bg-white border border-[#e8e4dc] text-[#556157] hover:border-[#163b2e]/40"
                }`}
              >
                Speaking
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter("listening")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  activeFilter === "listening"
                    ? "bg-[#d7e780] text-[#163b2e]"
                    : "bg-white border border-[#e8e4dc] text-[#556157] hover:border-[#163b2e]/40"
                }`}
              >
                Listening
              </button>
            </div>
          </div>

          {/* 3 Recipe Preview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Lesson Card 1 */}
            {(activeFilter === "all" || activeFilter === "speaking") && (
              <div className="rounded-2xl border border-[#e8e4dc] bg-white p-5 flex flex-col justify-between shadow-2xs hover:border-[#163b2e]/30 transition-all">
                <div>
                  <div className="size-10 rounded-full bg-[#d7e780] flex items-center justify-center text-[#163b2e] mb-4">
                    <MessageCircle className="size-5" />
                  </div>
                  <p className="font-mono text-[10px] uppercase font-bold tracking-wider text-[#717a73]">
                    CONVERSATION <span className="mx-0.5">•</span> 8 MIN
                  </p>
                  <h3 className="text-lg font-bold font-serif text-[#163b2e] mt-1 leading-snug">
                    Ordering at a café
                  </h3>
                  <p className="text-xs text-[#717a73] mt-1">
                    A2 <span className="mx-0.5">•</span> Beginner
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="h-1.5 w-full rounded-full bg-[#f0ede6] overflow-hidden">
                    <div className="h-full rounded-full bg-[#183d2c]" style={{ width: "60%" }} />
                  </div>
                  <Link
                    to="/roadmap"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#163b2e] hover:underline"
                  >
                    <span>Continue</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {/* Lesson Card 2 */}
            {(activeFilter === "all" || activeFilter === "listening") && (
              <div className="rounded-2xl border border-[#e8e4dc] bg-white p-5 flex flex-col justify-between shadow-2xs hover:border-[#163b2e]/30 transition-all">
                <div>
                  <div className="size-10 rounded-full bg-[#e8a382]/30 text-[#d96b52] flex items-center justify-center mb-4">
                    <Headphones className="size-5" />
                  </div>
                  <p className="font-mono text-[10px] uppercase font-bold tracking-wider text-[#717a73]">
                    LISTENING <span className="mx-0.5">•</span> 12 MIN
                  </p>
                  <h3 className="text-lg font-bold font-serif text-[#163b2e] mt-1 leading-snug">
                    The art of small talk
                  </h3>
                  <p className="text-xs text-[#717a73] mt-1">
                    B1 <span className="mx-0.5">•</span> Intermediate
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="h-1.5 w-full rounded-full bg-[#f0ede6] overflow-hidden">
                    <div className="h-full rounded-full bg-[#d96b52]" style={{ width: "30%" }} />
                  </div>
                  <Link
                    to="/roadmap"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#163b2e] hover:underline"
                  >
                    <span>Continue</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {/* Lesson Card 3 */}
            {activeFilter === "all" && (
              <div className="rounded-2xl border border-[#e8e4dc] bg-white p-5 flex flex-col justify-between shadow-2xs hover:border-[#163b2e]/30 transition-all">
                <div>
                  <div className="size-10 rounded-full bg-[#d0e1fd] text-[#3b6ecc] flex items-center justify-center mb-4">
                    <BookOpen className="size-5" />
                  </div>
                  <p className="font-mono text-[10px] uppercase font-bold tracking-wider text-[#717a73]">
                    GRAMMAR <span className="mx-0.5">•</span> 10 MIN
                  </p>
                  <h3 className="text-lg font-bold font-serif text-[#163b2e] mt-1 leading-snug">
                    Past tense, made easy
                  </h3>
                  <p className="text-xs text-[#717a73] mt-1">
                    A2 <span className="mx-0.5">•</span> Beginner
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="h-1.5 w-full rounded-full bg-[#f0ede6] overflow-hidden">
                    <div className="h-full rounded-full bg-[#3b6ecc]" style={{ width: "0%" }} />
                  </div>
                  <Link
                    to="/roadmap"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#163b2e] hover:underline"
                  >
                    <span>Begin lesson</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Daily Challenge & Live Practice */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          {/* Card 1: Daily Challenge */}
          <div className="rounded-2xl border border-[#e8e4dc] bg-white p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase font-extrabold tracking-widest text-[#d96b52]">
                DAILY CHALLENGE
              </span>
              <Key className="size-3.5 text-[#d96b52]" />
            </div>

            <h3 className="text-lg font-bold font-serif text-[#163b2e]">Say it out loud</h3>

            <p className="text-xs text-[#717a73] leading-relaxed">
              Record yourself ordering a coffee in French. No pressure, just practice.
            </p>

            <button
              type="button"
              onClick={() => setChallengeModalOpen(true)}
              className="w-full rounded-full bg-[#e07a5f] hover:bg-[#d56b4f] text-white font-bold text-xs py-2.5 px-4 flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Play className="size-3.5 fill-current" />
              <span>Start challenge</span>
            </button>
          </div>

          {/* Card 2: Live Practice */}
          <div className="rounded-2xl border border-[#e8e4dc] bg-white p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase font-extrabold tracking-widest text-[#163b2e]">
                LIVE PRACTICE
              </span>
              <Users className="size-4 text-[#163b2e]" />
            </div>

            <h3 className="text-lg font-bold font-serif text-[#163b2e]">Speak with a human</h3>

            {/* Tutor snippet */}
            <div className="flex items-center justify-between rounded-xl bg-[#f7f5ef] p-3 border border-[#ece8df]">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-full bg-[#d7e780] text-[#163b2e] font-bold text-xs grid place-items-center">
                  JM
                </div>
                <div>
                  <p className="text-xs font-bold text-[#163b2e] leading-tight">Julie M.</p>
                  <p className="text-[10px] text-[#717a73]">Available today · 25 min</p>
                </div>
              </div>
              <Clock className="size-3.5 text-[#717a73]" />
            </div>

            <Link
              to="/practice"
              className="w-full rounded-full border border-[#e8e4dc] hover:border-[#163b2e] text-[#163b2e] font-bold text-xs py-2.5 px-4 flex items-center justify-center gap-1.5 transition-colors text-center cursor-pointer"
            >
              <span>Browse sessions</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Voice Recording Challenge Modal */}
      <Dialog open={challengeModalOpen} onOpenChange={setChallengeModalOpen}>
        <DialogContent className="sm:max-w-md bg-white p-6 rounded-2xl">
          <DialogHeader>
            <span className="font-mono text-[10px] uppercase font-extrabold tracking-widest text-[#d96b52] mb-1">
              SPEAKING CHALLENGE
            </span>
            <DialogTitle className="text-2xl font-bold font-serif text-[#163b2e]">
              Say it out loud: Ordering Coffee
            </DialogTitle>
          </DialogHeader>

          <div className="my-4 rounded-xl bg-[#fbf9f4] p-4 border border-[#e8e4dc]">
            <p className="text-xs font-bold text-[#717a73] uppercase font-mono">
              Prompt in French:
            </p>
            <p className="text-lg font-serif font-bold text-[#163b2e] mt-1">
              "Bonjour ! Je voudrais un café au lait et un croissant, s'il vous plaît."
            </p>
            <p className="text-xs text-[#717a73] italic mt-1">
              (Hello! I would like a coffee with milk and a croissant, please.)
            </p>
          </div>

          <div className="text-center py-4">
            {isRecording ? (
              <div className="space-y-3">
                <div className="size-16 rounded-full bg-[#d96b52]/20 text-[#d96b52] mx-auto grid place-items-center animate-pulse">
                  <Mic className="size-8" />
                </div>
                <p className="text-xs font-mono text-[#d96b52] font-bold">
                  Listening & analyzing pronunciation...
                </p>
                <div className="h-1.5 w-32 bg-[#d96b52]/30 rounded-full mx-auto overflow-hidden">
                  <div className="h-full bg-[#d96b52] animate-pulse w-full" />
                </div>
              </div>
            ) : recordingDone ? (
              <div className="space-y-2">
                <div className="size-14 rounded-full bg-[#183d2c]/10 text-[#183d2c] mx-auto grid place-items-center">
                  <CheckCircle2 className="size-8 text-[#183d2c]" />
                </div>
                <p className="text-base font-bold font-serif text-[#163b2e]">
                  Excellent accent! +25 XP
                </p>
                <p className="text-xs text-[#717a73]">Speech clarity rating: 96%</p>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleStartRecording}
                  className="size-16 rounded-full bg-[#e07a5f] hover:bg-[#d56b4f] text-white mx-auto grid place-items-center shadow-md transition-transform hover:scale-105 cursor-pointer"
                >
                  <Mic className="size-7" />
                </button>
                <p className="text-xs text-[#717a73]">Tap microphone to begin speaking</p>
              </div>
            )}
          </div>

          <div className="flex justify-end pt-2">
            <Button
              variant="outline"
              onClick={() => {
                setChallengeModalOpen(false);
                setRecordingDone(false);
              }}
              className="rounded-full text-xs cursor-pointer"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Subscription Management Modal */}
      <Dialog open={subModalOpen} onOpenChange={setSubModalOpen}>
        <DialogContent className="sm:max-w-md bg-white p-6 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold font-serif text-[#163b2e]">
              Langfly Kitchen Membership
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2 text-sm text-[#163b2e]">
            <div className="p-4 rounded-xl bg-[#183d2c] text-white">
              <span className="font-mono text-[10px] text-[#d7e780] font-bold uppercase tracking-wider">
                ACTIVE PLAN
              </span>
              <p className="text-lg font-bold font-serif mt-1">Unlimited Connoisseur</p>
              <p className="text-xs text-white/80 mt-0.5">Renews Oct 14, 2026 · $19/month</p>
            </div>
            <ul className="space-y-2 text-xs text-[#717a73]">
              <li className="flex items-center gap-2">
                <Check className="size-3.5 text-[#183d2c]" /> Unlimited daily culinary modules &
                roadmaps
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-3.5 text-[#183d2c]" /> 4 Live 1-on-1 tutor speaking slots per
                month
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-3.5 text-[#183d2c]" /> Spaced repetition flashcards with
                native speech
              </li>
            </ul>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setSubModalOpen(false)}
              className="rounded-full text-xs cursor-pointer"
            >
              Keep Current Plan
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
