import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useData, type Challenge } from "../../lib/data-context";
import { Button } from "../../components/ui/button";
import {
  Trophy,
  CheckCircle2,
  Zap,
  Flame,
  ArrowRight,
  HelpCircle,
  Clock,
  PlayCircle,
  XCircle,
  RotateCw,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/challenges")({
  head: () => ({
    meta: [
      { title: "Daily Challenges — Langfly" },
      {
        name: "description",
        content: "Gamified bite-sized language drills and daily streak bonuses.",
      },
    ],
  }),
  component: ChallengesPage,
});

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  challengeId: string;
}

const dailyQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "In French, what is the most polite way to ask for the bill at a cafe?",
    options: [
      "Je veux payer maintenant",
      "L'addition, s'il vous plaît",
      "Donnez-moi la facture",
      "Combien pour tout ça",
    ],
    correctIndex: 1,
    explanation:
      "'L'addition, s'il vous plaît' is the standard polite phrase across francophone dining.",
    challengeId: "c1",
  },
  {
    id: 2,
    question: "Which of these Spanish words translates to 'the airport'?",
    options: ["El restaurante", "El supermercado", "El aeropuerto", "La estación"],
    correctIndex: 2,
    explanation: "'El aeropuerto' is airport in Spanish.",
    challengeId: "c2",
  },
  {
    id: 3,
    question: "In Italian, how do you say 'A table for two near the window'?",
    options: [
      "Un tavolo per due vicino alla finestra",
      "Una sedia per due alla porta",
      "Due piatti con vista",
      "Un caffe per favore",
    ],
    correctIndex: 0,
    explanation:
      "'Un tavolo per due vicino alla finestra' translates directly to a table for two by the window.",
    challengeId: "c4",
  },
];

function ChallengesPage() {
  const { data, completeChallenge, updateData } = useData();

  // Quiz Modal State
  const [activeQuiz, setActiveQuiz] = useState<QuizQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 });
  const [quizFinished, setQuizFinished] = useState(false);

  const completedCount = data.challenges.filter((c) => c.completed).length;
  const totalXpAvailable = data.challenges.reduce((sum, c) => sum + c.xp, 0);
  const earnedXp = data.challenges.filter((c) => c.completed).reduce((sum, c) => sum + c.xp, 0);

  const handleStartQuiz = () => {
    setActiveQuiz(dailyQuizQuestions[0]);
    setSelectedOption(null);
    setIsAnswered(false);
    setQuizScore({ correct: 0, total: 0 });
    setQuizFinished(false);
  };

  const handleAnswer = (index: number) => {
    if (isAnswered || !activeQuiz) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === activeQuiz.correctIndex;
    if (isCorrect) {
      setQuizScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
      completeChallenge(activeQuiz.challengeId);
    }
  };

  const handleNextQuestion = () => {
    if (!activeQuiz) return;
    const currentIdx = dailyQuizQuestions.findIndex((q) => q.id === activeQuiz.id);
    if (currentIdx + 1 < dailyQuizQuestions.length) {
      setActiveQuiz(dailyQuizQuestions[currentIdx + 1]);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      setActiveQuiz(null);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-lemon font-semibold">
              Daily Challenge Arena
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Today's Missions</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Complete quick language drills to keep your daily streak alive and collect bonus XP.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleStartQuiz}
            className="bg-coral text-white hover:bg-brand h-10 px-5 rounded-md cursor-pointer font-semibold transition-colors"
          >
            <PlayCircle className="mr-2 size-4" /> Start Daily Quiz
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Daily Quota
            </span>
            <Trophy className="size-4 text-lemon" />
          </div>
          <p className="text-3xl font-bold text-brand mt-2">
            {completedCount}{" "}
            <span className="text-base text-muted-foreground font-normal">
              / {data.challenges.length} Done
            </span>
          </p>
          <div className="mt-3 h-2 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-mint transition-all duration-300"
              style={{ width: `${(completedCount / data.challenges.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              XP Earned Today
            </span>
            <Zap className="size-4 text-coral" />
          </div>
          <p className="text-3xl font-bold text-coral mt-2">
            +{earnedXp}{" "}
            <span className="text-base text-muted-foreground font-normal">
              / {totalXpAvailable} XP
            </span>
          </p>
          <p className="text-xs text-muted-foreground mt-3">Reset in 14h 22m</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Active Streak
            </span>
            <Flame className="size-4 text-coral" />
          </div>
          <p className="text-3xl font-bold text-brand mt-2">
            {data.streak} <span className="text-base text-muted-foreground font-normal">Days</span>
          </p>
          <p className="text-xs text-mint mt-3">Multiplier: 1.25x XP active</p>
        </div>
      </div>

      {/* Interactive Quiz Arena (Active or Completed) */}
      {activeQuiz && (
        <div className="rounded-2xl border-2 border-coral bg-card p-6 shadow-md animate-fade-up max-w-2xl mx-auto">
          <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
            <span className="font-mono text-xs uppercase tracking-wider text-coral font-bold">
              Question {activeQuiz.id} of {dailyQuizQuestions.length}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveQuiz(null)}
              className="text-xs h-7 cursor-pointer"
            >
              Exit Quiz
            </Button>
          </div>

          <h3 className="text-xl font-bold tracking-tight mb-4">{activeQuiz.question}</h3>

          <div className="space-y-2.5 mb-6">
            {activeQuiz.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === activeQuiz.correctIndex;

              let optionStyle = "border-border bg-background hover:border-brand/40";
              if (isAnswered) {
                if (isCorrect) optionStyle = "border-mint bg-mint/10 text-brand font-semibold";
                else if (isSelected)
                  optionStyle = "border-destructive bg-destructive/10 text-destructive";
                else optionStyle = "border-border opacity-50";
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleAnswer(idx)}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                >
                  <span className="text-sm font-medium">{option}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className="size-4 text-mint" />}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="size-4 text-destructive" />
                  )}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="rounded-xl bg-cream/70 p-4 border border-border flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono font-bold uppercase text-coral">
                  {selectedOption === activeQuiz.correctIndex
                    ? "Correct! +15 XP"
                    : "Keep practicing!"}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{activeQuiz.explanation}</p>
              </div>
              <Button
                onClick={handleNextQuestion}
                className="bg-brand text-cream hover:bg-coral cursor-pointer shrink-0"
              >
                Next <ArrowRight className="ml-1.5 size-4" />
              </Button>
            </div>
          )}
        </div>
      )}

      {quizFinished && (
        <div className="rounded-2xl border border-mint bg-mint/5 p-6 text-center max-w-lg mx-auto animate-fade-up">
          <div className="size-12 rounded-full bg-mint text-white mx-auto grid place-items-center mb-3">
            <CheckCircle2 className="size-6" />
          </div>
          <h3 className="text-xl font-bold text-brand mb-1">Quiz Completed!</h3>
          <p className="text-sm text-muted-foreground mb-4">
            You answered {quizScore.correct} of {dailyQuizQuestions.length} correctly.
          </p>
          <Button
            onClick={handleStartQuiz}
            variant="outline"
            className="border-border cursor-pointer"
          >
            <RotateCw className="mr-2 size-4" /> Try Again
          </Button>
        </div>
      )}

      {/* List of Challenges */}
      <div className="space-y-3">
        <h2 className="text-sm font-mono uppercase tracking-[0.15em] text-muted-foreground">
          All Daily Quests
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.challenges.map((challenge) => {
            const isCompleted = challenge.completed;

            return (
              <div
                key={challenge.id}
                className={`rounded-xl border p-5 transition-all flex items-center justify-between ${
                  isCompleted
                    ? "border-mint/30 bg-card opacity-85"
                    : "border-border bg-card hover:border-brand/40"
                }`}
              >
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => !isCompleted && completeChallenge(challenge.id)}
                    className={`size-8 rounded-full grid place-items-center text-sm font-bold transition-all cursor-pointer ${
                      isCompleted
                        ? "bg-mint text-white"
                        : "border-2 border-muted-foreground/40 hover:border-coral text-transparent"
                    }`}
                  >
                    {isCompleted ? "✓" : ""}
                  </button>

                  <div>
                    <h3
                      className={`text-base font-semibold ${
                        isCompleted ? "line-through text-muted-foreground" : "text-brand"
                      }`}
                    >
                      {challenge.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-mono text-[10px] uppercase text-muted-foreground">
                        Type: {challenge.type}
                      </span>
                      <span className="text-[10px] text-muted-foreground/60">•</span>
                      <span className="font-mono text-[10px] text-coral font-semibold">
                        +{challenge.xp} XP
                      </span>
                    </div>
                  </div>
                </div>

                {!isCompleted ? (
                  <Button
                    size="sm"
                    onClick={() => completeChallenge(challenge.id)}
                    className="bg-coral text-white hover:bg-brand text-xs h-8 px-3 cursor-pointer"
                  >
                    Claim XP
                  </Button>
                ) : (
                  <span className="font-mono text-xs font-semibold text-mint">Completed</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
