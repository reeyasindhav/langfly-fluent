import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useData, type Flashcard } from "../../lib/data-context";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  Volume2,
  RotateCw,
  Plus,
  ArrowRight,
  CheckCircle2,
  Shuffle,
  Layers,
  ArrowLeft,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/flashcards")({
  head: () => ({
    meta: [
      { title: "Spaced Flashcards — Langfly" },
      {
        name: "description",
        content: "Retain vocabulary permanently with spaced repetition flashcards.",
      },
    ],
  }),
  component: FlashcardsPage,
});

function FlashcardsPage() {
  const { data, rateFlashcard, updateData } = useData();

  const [filterLanguage, setFilterLanguage] = useState<string>("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [sessionXp, setSessionXp] = useState(0);

  // New card modal state
  const [newFront, setNewFront] = useState("");
  const [newBack, setNewBack] = useState("");
  const [newLang, setNewLang] = useState("French");
  const [newExample, setNewExample] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredCards = data.flashcards.filter((card) => {
    if (filterLanguage === "All") return true;
    if (filterLanguage === "Due Today") return card.dueInDays === 0;
    return card.language.toLowerCase() === filterLanguage.toLowerCase();
  });

  const currentCard: Flashcard | undefined = filteredCards[currentIndex];

  // Flip card on Space key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !dialogOpen) {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dialogOpen]);

  // Audio pronunciation using Web Speech API
  const speakWord = (text: string, langName: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const utterance = new SpeechSynthesisUtterance(text);
    const langCodeMap: Record<string, string> = {
      French: "fr-FR",
      Spanish: "es-ES",
      German: "de-DE",
      Italian: "it-IT",
      Japanese: "ja-JP",
    };
    utterance.lang = langCodeMap[langName] || "en-US";
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  const handleRate = (rating: "again" | "good" | "easy") => {
    if (!currentCard) return;

    rateFlashcard(currentCard.id, rating);
    const earned = rating === "again" ? 0 : rating === "good" ? 5 : 10;
    setSessionXp((prev) => prev + earned);

    setIsFlipped(false);
    if (currentIndex + 1 < filteredCards.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setSessionCompleted(true);
    }
  };

  const restartSession = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setSessionCompleted(false);
    setSessionXp(0);
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFront.trim() || !newBack.trim()) return;

    const newCard: Flashcard = {
      id: `fc_${Date.now()}`,
      front: newFront.trim(),
      back: newBack.trim(),
      language: newLang,
      example: newExample.trim() || undefined,
      status: "new",
      dueInDays: 0,
    };

    updateData((prev) => ({
      ...prev,
      flashcards: [newCard, ...prev.flashcards],
    }));

    setNewFront("");
    setNewBack("");
    setNewExample("");
    setDialogOpen(false);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-coral font-semibold">
              Spaced Repetition System
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Flashcard Recall</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Strengthen memory pathways by grading recall difficulty right as forgetting sets in.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-border hover:border-brand h-10 px-4 cursor-pointer"
              >
                <Plus className="mr-2 size-4" /> Add Card
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-card">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">Add Custom Flashcard</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddCard} className="space-y-4 mt-2">
                <div className="space-y-1.5">
                  <Label htmlFor="front">Prompt / Word (Foreign)</Label>
                  <Input
                    id="front"
                    placeholder="e.g. la boulangerie"
                    value={newFront}
                    onChange={(e) => setNewFront(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="back">Meaning / Translation</Label>
                  <Input
                    id="back"
                    placeholder="e.g. the bakery"
                    value={newBack}
                    onChange={(e) => setNewBack(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lang">Language</Label>
                  <select
                    id="lang"
                    value={newLang}
                    onChange={(e) => setNewLang(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs focus:outline-none focus:ring-1 focus:ring-coral"
                  >
                    <option value="French">French</option>
                    <option value="Spanish">Spanish</option>
                    <option value="German">German</option>
                    <option value="Italian">Italian</option>
                    <option value="Japanese">Japanese</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="example">Context Sentence (Optional)</Label>
                  <Input
                    id="example"
                    placeholder="e.g. J'achète du pain à la boulangerie."
                    value={newExample}
                    onChange={(e) => setNewExample(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-coral text-white hover:bg-brand cursor-pointer mt-2"
                >
                  Save Flashcard
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            onClick={restartSession}
            className="border-border hover:border-brand h-10 px-3 cursor-pointer"
            title="Shuffle & Reset Deck"
          >
            <Shuffle className="size-4" />
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {["All", "Due Today", "French", "Spanish", "German", "Italian"].map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => {
              setFilterLanguage(tag);
              setCurrentIndex(0);
              setIsFlipped(false);
              setSessionCompleted(false);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
              filterLanguage === tag
                ? "bg-brand text-cream font-bold"
                : "bg-card border border-border text-muted-foreground hover:border-brand/40"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Main Flashcard Container */}
      {sessionCompleted ? (
        <div className="max-w-xl mx-auto rounded-2xl border border-border bg-card p-8 text-center animate-fade-up shadow-sm">
          <div className="size-16 rounded-full bg-mint/10 text-mint mx-auto grid place-items-center mb-4">
            <CheckCircle2 className="size-8" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">Review Session Completed!</h2>
          <p className="text-sm text-muted-foreground mb-6">
            You've reviewed all {filteredCards.length} cards in this set.
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mb-8">
            <div className="rounded-xl bg-cream p-4 border border-border">
              <p className="font-mono text-[10px] uppercase text-muted-foreground">XP Earned</p>
              <p className="text-2xl font-bold text-coral mt-0.5">+{sessionXp}</p>
            </div>
            <div className="rounded-xl bg-cream p-4 border border-border">
              <p className="font-mono text-[10px] uppercase text-muted-foreground">Mastery Rate</p>
              <p className="text-2xl font-bold text-brand mt-0.5">{data.recallRate}%</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Button
              onClick={restartSession}
              variant="outline"
              className="border-border cursor-pointer"
            >
              <RotateCw className="mr-2 size-4" /> Practice Again
            </Button>
            <Button asChild className="bg-coral text-white hover:bg-brand cursor-pointer">
              <Link to="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      ) : filteredCards.length === 0 ? (
        <div className="max-w-xl mx-auto rounded-2xl border border-dashed border-border bg-card p-12 text-center">
          <Layers className="size-12 text-muted-foreground/50 mx-auto mb-3" />
          <h3 className="text-lg font-semibold">No flashcards found</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto mb-6">
            There are no cards in this category right now. Add a new card or switch the filter tag
            above.
          </p>
          <Button
            onClick={() => setDialogOpen(true)}
            className="bg-coral text-white hover:bg-brand cursor-pointer"
          >
            <Plus className="mr-2 size-4" /> Create First Card
          </Button>
        </div>
      ) : (
        <div className="max-w-xl mx-auto space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
            <span>
              Card {currentIndex + 1} of {filteredCards.length}
            </span>
            <span className="rounded bg-cream px-2 py-0.5 text-brand font-semibold">
              {currentCard?.status.toUpperCase()}
            </span>
          </div>

          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-coral transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / filteredCards.length) * 100}%` }}
            />
          </div>

          {/* 3D Flip Card Container */}
          <div
            onClick={() => setIsFlipped((prev) => !prev)}
            className="group perspective-1000 cursor-pointer min-h-[340px] select-none"
          >
            <div
              className={`relative h-[340px] w-full rounded-2xl border-2 transition-transform duration-500 preserve-3d shadow-sm hover:shadow-md ${
                isFlipped
                  ? "rotate-y-180 border-mint"
                  : "border-border bg-card hover:border-coral/40"
              }`}
            >
              {/* Front Side */}
              <div className="absolute inset-0 rounded-2xl p-8 flex flex-col justify-between backface-hidden bg-card">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {currentCard?.language} · Tap to flip
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (currentCard) speakWord(currentCard.front, currentCard.language);
                    }}
                    className="p-2 rounded-full hover:bg-cream text-coral transition-colors"
                    title="Pronounce Word"
                  >
                    <Volume2 className="size-5" />
                  </button>
                </div>

                <div className="text-center py-6">
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-brand">
                    {currentCard?.front}
                  </h2>
                  <p className="mt-3 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                    Spacebar or Click to reveal translation
                  </p>
                </div>

                <div className="text-center">
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <RotateCw className="size-3.5" /> Tap card to see answer
                  </span>
                </div>
              </div>

              {/* Back Side */}
              <div className="absolute inset-0 rounded-2xl p-8 flex flex-col justify-between backface-hidden rotate-y-180 bg-card border-mint">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-mint font-semibold">
                    Translation & Context
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (currentCard) speakWord(currentCard.front, currentCard.language);
                    }}
                    className="p-2 rounded-full hover:bg-cream text-mint transition-colors"
                    title="Pronounce Word"
                  >
                    <Volume2 className="size-5" />
                  </button>
                </div>

                <div className="text-center py-4">
                  <p className="text-sm font-mono text-muted-foreground mb-1">Meaning</p>
                  <h3 className="text-3xl md:text-4xl font-bold text-brand mb-4">
                    {currentCard?.back}
                  </h3>

                  {currentCard?.example && (
                    <div className="rounded-xl bg-cream/70 p-3.5 border border-border/80 max-w-md mx-auto text-left">
                      <p className="text-xs font-mono uppercase text-muted-foreground mb-1">
                        Usage Example
                      </p>
                      <p className="text-sm font-medium text-brand italic">
                        "{currentCard.example}"
                      </p>
                    </div>
                  )}
                </div>

                <div className="text-center">
                  <span className="text-xs font-mono text-muted-foreground">
                    Rate how well you recalled this card below
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Rating Controls (SRS) */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleRate("again")}
              className="flex flex-col py-6 h-auto border-coral/30 hover:bg-coral/10 text-coral cursor-pointer rounded-xl"
            >
              <span className="font-bold text-sm">Again</span>
              <span className="font-mono text-[10px] text-muted-foreground mt-0.5">
                +0 XP · Due Now
              </span>
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleRate("good")}
              className="flex flex-col py-6 h-auto border-mint/30 hover:bg-mint/10 text-mint cursor-pointer rounded-xl"
            >
              <span className="font-bold text-sm">Good</span>
              <span className="font-mono text-[10px] text-muted-foreground mt-0.5">
                +5 XP · Due 2d
              </span>
            </Button>

            <Button
              type="button"
              onClick={() => handleRate("easy")}
              className="flex flex-col py-6 h-auto bg-brand text-cream hover:bg-coral transition-colors cursor-pointer rounded-xl"
            >
              <span className="font-bold text-sm">Easy</span>
              <span className="font-mono text-[10px] text-cream/70 mt-0.5">+10 XP · Mastered</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
