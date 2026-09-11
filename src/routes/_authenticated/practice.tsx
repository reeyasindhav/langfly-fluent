import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useData, type Tutor, type Booking } from "../../lib/data-context";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import {
  CalendarDays,
  Video,
  Star,
  Clock,
  Check,
  X,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  MessageSquare,
  PhoneOff,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/practice")({
  head: () => ({
    meta: [
      { title: "Live Practice — Langfly" },
      {
        name: "description",
        content: "Book real-time speaking sessions with native tutors and practice fluently.",
      },
    ],
  }),
  component: PracticePage,
});

function PracticePage() {
  const { data, bookSession, cancelBooking, updateData } = useData();

  const [languageFilter, setLanguageFilter] = useState("All");
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  // Live Simulated Room state
  const [activeCallBooking, setActiveCallBooking] = useState<Booking | null>(null);
  const [micActive, setMicActive] = useState(true);
  const [camActive, setCamActive] = useState(true);
  const [currentScenarioStep, setCurrentScenarioStep] = useState(0);

  const conversationScenarios = [
    {
      tutorPrompt: "Bonjour ! Bienvenue au Bistro des Fleurs. Vous êtes combien aujourd'hui ?",
      translation: "Hello! Welcome to Bistro des Fleurs. How many are in your party today?",
      suggestedReply: "Bonjour ! Une table pour deux personnes, s'il vous plaît.",
    },
    {
      tutorPrompt:
        "Très bien, suivez-moi près de la terrasse. Avez-vous déjà choisi vos boissons ?",
      translation: "Very well, follow me near the terrace. Have you already chosen your drinks?",
      suggestedReply: "Oui, nous aimerions une carafe d'eau et deux verres de vin blanc.",
    },
    {
      tutorPrompt: "Parfait. Notre plat du jour est le saumon grillé aux herbes. Cela vous tente ?",
      translation: "Perfect. Today's special is grilled salmon with herbs. Does that tempt you?",
      suggestedReply: "Ça a l'air délicieux ! Est-ce qu'il y a des fruits à coque dedans ?",
    },
  ];

  const filteredTutors = data.tutors.filter((tutor) => {
    if (languageFilter === "All") return true;
    return tutor.language.toLowerCase() === languageFilter.toLowerCase();
  });

  const handleBook = (tutorId: string, slot: string) => {
    bookSession(tutorId, slot);
    const tutor = data.tutors.find((t) => t.id === tutorId);
    setBookingSuccess(`Successfully booked session with ${tutor?.name} for ${slot}!`);
    setSelectedSlot(null);
    setTimeout(() => setBookingSuccess(null), 5000);
  };

  const handleEndCall = () => {
    updateData((prev) => ({
      ...prev,
      speakingMinutes: prev.speakingMinutes + 15,
      xp: prev.xp + 50,
    }));
    setActiveCallBooking(null);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-coral font-semibold">
              Real-Time Conversational Practice
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Live Speaking Sessions</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Build conversational muscle memory with short, friendly 15-minute 1-on-1 speaking slots.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-card border border-border rounded-xl p-3 px-4">
          <div className="text-right">
            <p className="font-mono text-[10px] uppercase text-muted-foreground">Speaking Total</p>
            <p className="text-lg font-bold text-brand">{data.speakingMinutes} mins</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-right">
            <p className="font-mono text-[10px] uppercase text-muted-foreground">Upcoming</p>
            <p className="text-lg font-bold text-coral">{data.bookings.length} slots</p>
          </div>
        </div>
      </div>

      {/* Booking Success Toast Alert */}
      {bookingSuccess && (
        <div className="rounded-xl border border-mint/40 bg-mint/10 p-4 text-sm font-medium text-brand flex items-center justify-between animate-fade-up">
          <span className="flex items-center gap-2">
            <Check className="size-4 text-mint stroke-[3]" />
            {bookingSuccess}
          </span>
          <button
            onClick={() => setBookingSuccess(null)}
            className="text-muted-foreground hover:text-brand"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      {/* My Bookings Section */}
      {data.bookings.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-mono uppercase tracking-[0.15em] text-muted-foreground">
            My Scheduled Sessions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.bookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-xl border border-mint/50 bg-card p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-mint/10 text-mint grid place-items-center shrink-0">
                    <Video className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-brand">
                      Practice with {booking.tutorName}
                    </h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                      <Clock className="size-3.5" /> {booking.slot} · 15 mins
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => setActiveCallBooking(booking)}
                    className="bg-mint text-white hover:bg-brand cursor-pointer text-xs h-9 px-4 font-semibold"
                  >
                    Enter Room
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => cancelBooking(booking.id)}
                    className="border-border hover:border-destructive hover:text-destructive cursor-pointer text-xs h-9 px-3"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tutors Header & Language Filter */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold tracking-tight">Available Practice Tutors</h2>
            <p className="text-xs text-muted-foreground">Select a tutor to choose an open slot</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {["All", "Spanish", "French", "Italian"].map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguageFilter(lang)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                  languageFilter === lang
                    ? "bg-brand text-cream font-bold"
                    : "bg-card border border-border text-muted-foreground hover:border-brand/40"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Tutor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {filteredTutors.map((tutor) => {
            return (
              <div
                key={tutor.id}
                className="rounded-2xl border border-border bg-card p-6 hover-lift flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`size-12 rounded-xl ${tutor.avatarColor} text-white font-bold text-lg grid place-items-center shadow-xs`}
                      >
                        {tutor.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg leading-tight">{tutor.name}</h3>
                        <p className="font-mono text-xs text-coral font-medium">
                          {tutor.language} Tutor
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-cream px-2 py-1 rounded-md border border-border">
                      <Star className="size-3.5 fill-lemon text-lemon" />
                      <span className="font-mono text-xs font-bold text-brand">{tutor.rating}</span>
                    </div>
                  </div>

                  <div className="rounded-lg bg-cream/70 p-2.5 border border-border/70 text-xs mb-4">
                    <span className="font-semibold text-brand">Best for: </span>
                    <span className="text-muted-foreground">{tutor.level} learners</span>
                  </div>

                  <p className="text-xs text-muted-foreground mb-4">
                    Specializes in pronunciation, dining dialogues, and everyday colloquial fluency
                    without pressure.
                  </p>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="font-mono text-[10px] uppercase text-muted-foreground tracking-wider mb-2">
                    Available Slots ({tutor.slots.length})
                  </p>

                  {tutor.slots.length > 0 ? (
                    <div className="space-y-1.5">
                      {tutor.slots.map((slot) => (
                        <div
                          key={slot}
                          className="flex items-center justify-between p-2 rounded-lg bg-background border border-border hover:border-coral transition-colors"
                        >
                          <span className="text-xs font-mono text-brand">{slot}</span>
                          <Button
                            size="sm"
                            onClick={() => handleBook(tutor.id, slot)}
                            className="bg-coral text-white hover:bg-brand text-[11px] h-7 px-2.5 rounded-md cursor-pointer font-semibold"
                          >
                            Book (+25 XP)
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground italic py-2">
                      All slots booked for this week.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Simulated Live Speaking Room Dialog */}
      <Dialog
        open={!!activeCallBooking}
        onOpenChange={(open) => !open && setActiveCallBooking(null)}
      >
        <DialogContent className="sm:max-w-3xl bg-card p-6">
          <DialogHeader>
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-3">
                <span className="size-3 rounded-full bg-mint animate-pulse" />
                <DialogTitle className="text-xl font-bold">
                  Speaking Session with {activeCallBooking?.tutorName}
                </DialogTitle>
              </div>
              <span className="font-mono text-xs text-muted-foreground bg-cream px-2 py-1 rounded">
                Live · 15:00 Call
              </span>
            </div>
          </DialogHeader>

          {/* Video Simulation Feeds */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            {/* Tutor Video Frame */}
            <div className="relative rounded-2xl bg-brand/95 text-cream h-56 flex flex-col justify-between p-4 overflow-hidden border border-border">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs bg-black/40 px-2 py-1 rounded text-white">
                  {activeCallBooking?.tutorName} (Tutor)
                </span>
                <span className="flex items-center gap-1 font-mono text-xs text-mint">
                  <span className="size-2 rounded-full bg-mint animate-ping" /> Speaking
                </span>
              </div>
              <div className="text-center">
                <div className="size-16 rounded-full bg-coral mx-auto text-white text-2xl font-bold grid place-items-center mb-2 shadow-md">
                  {activeCallBooking?.tutorName.charAt(0)}
                </div>
                <p className="text-xs text-cream/70 font-mono">Audio waveform connected</p>
              </div>
              <div className="h-1.5 w-32 mx-auto rounded-full bg-mint/50 animate-pulse" />
            </div>

            {/* Learner Video Frame */}
            <div className="relative rounded-2xl bg-muted h-56 flex flex-col justify-between p-4 border border-border">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs bg-black/40 px-2 py-1 rounded text-white">
                  You (Learner)
                </span>
                <span className="text-xs font-mono text-muted-foreground">
                  {micActive ? "Mic on" : "Muted"}
                </span>
              </div>
              <div className="text-center">
                <div className="size-16 rounded-full bg-brand text-cream mx-auto text-xl font-bold grid place-items-center mb-2">
                  YOU
                </div>
                <p className="text-xs text-muted-foreground">
                  {camActive ? "HD Camera Active" : "Camera Paused"}
                </p>
              </div>
              <div className="h-1.5 w-24 mx-auto rounded-full bg-coral/40" />
            </div>
          </div>

          {/* Interactive Roleplay Prompt Card */}
          <div className="rounded-xl border border-border bg-cream p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs uppercase tracking-wider text-coral font-bold flex items-center gap-1.5">
                <MessageSquare className="size-3.5" /> Scenario Guidance Step{" "}
                {currentScenarioStep + 1} of {conversationScenarios.length}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setCurrentScenarioStep((prev) => (prev + 1) % conversationScenarios.length)
                }
                className="text-xs h-7 cursor-pointer"
              >
                Next Dialogue Prompt →
              </Button>
            </div>
            <p className="text-sm font-bold text-brand">
              "{conversationScenarios[currentScenarioStep].tutorPrompt}"
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Meaning: {conversationScenarios[currentScenarioStep].translation}
            </p>
            <div className="mt-3 p-2.5 rounded-lg bg-card border border-border text-xs">
              <span className="font-semibold text-coral">Suggested Reply: </span>
              <span className="italic font-medium text-brand">
                "{conversationScenarios[currentScenarioStep].suggestedReply}"
              </span>
            </div>
          </div>

          {/* Call Action Bar */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMicActive(!micActive)}
                className={`size-9 p-0 rounded-full cursor-pointer ${
                  !micActive ? "bg-destructive/10 text-destructive border-destructive" : ""
                }`}
              >
                {micActive ? <Mic className="size-4" /> : <MicOff className="size-4" />}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCamActive(!camActive)}
                className={`size-9 p-0 rounded-full cursor-pointer ${
                  !camActive ? "bg-destructive/10 text-destructive border-destructive" : ""
                }`}
              >
                {camActive ? <Camera className="size-4" /> : <CameraOff className="size-4" />}
              </Button>
            </div>

            <Button
              onClick={handleEndCall}
              className="bg-destructive text-white hover:bg-destructive/90 cursor-pointer h-9 px-4 font-semibold"
            >
              <PhoneOff className="mr-2 size-4" /> End Session (+50 XP)
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
