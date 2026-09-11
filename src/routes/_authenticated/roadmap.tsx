import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useData, type RoadmapUnit } from "../../lib/data-context";
import { useAuth } from "../../lib/auth-context";
import { Button } from "../../components/ui/button";
import {
  Map,
  CheckCircle2,
  Lock,
  PlayCircle,
  Zap,
  ArrowRight,
  Layers,
  CalendarDays,
  ChevronRight,
  BookOpen,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/roadmap")({
  head: () => ({
    meta: [
      { title: "Learning Roadmap — Langfly" },
      {
        name: "description",
        content: "Your personalized step-by-step path to fluent conversations.",
      },
    ],
  }),
  component: RoadmapPage,
});

interface UnitModule {
  id: number;
  title: string;
  type: "vocab" | "grammar" | "dialogue" | "checkpoint";
  duration: string;
}

const mockModulesByUnit: Record<string, UnitModule[]> = {
  u1: [
    { id: 1, title: "Essential Greetings & Politeness", type: "vocab", duration: "8 min" },
    { id: 2, title: "Introducing Yourself & Origins", type: "dialogue", duration: "12 min" },
    { id: 3, title: "Numbers 1–100 & Counting", type: "vocab", duration: "10 min" },
    {
      id: 4,
      title: "Basic Question Words (Who, What, Where)",
      type: "grammar",
      duration: "15 min",
    },
    { id: 5, title: "Weather & Everyday Small Talk", type: "dialogue", duration: "10 min" },
    {
      id: 6,
      title: "Unit 1 Checkpoint & Pronunciation Drill",
      type: "checkpoint",
      duration: "15 min",
    },
  ],
  u2: [
    {
      id: 1,
      title: "Entering the Restaurant & Requesting a Table",
      type: "dialogue",
      duration: "10 min",
    },
    { id: 2, title: "Deciphering Menu Categories & Courses", type: "vocab", duration: "12 min" },
    { id: 3, title: "Ordering Drinks & Beverages", type: "dialogue", duration: "8 min" },
    { id: 4, title: "Dietary Restrictions & Food Allergies", type: "vocab", duration: "14 min" },
    { id: 5, title: "Asking for Recommendations", type: "dialogue", duration: "10 min" },
    { id: 6, title: "Polite Request Forms & Conditionals", type: "grammar", duration: "15 min" },
    { id: 7, title: "Making Custom Order Adjustments", type: "dialogue", duration: "12 min" },
    { id: 8, title: "Handling Missing or Wrong Items", type: "dialogue", duration: "10 min" },
    { id: 9, title: "Requesting the Check & Split Bills", type: "dialogue", duration: "8 min" },
    { id: 10, title: "Tipping Culture & Payment Verbs", type: "vocab", duration: "10 min" },
    { id: 11, title: "Complimenting the Host & Farewell", type: "dialogue", duration: "8 min" },
    {
      id: 12,
      title: "Dining Out Live Simulation Checkpoint",
      type: "checkpoint",
      duration: "20 min",
    },
  ],
  u3: [
    { id: 1, title: "Airport Check-in & Luggage Vocabulary", type: "vocab", duration: "10 min" },
    {
      id: 2,
      title: "Asking for Street Directions & Landmarks",
      type: "dialogue",
      duration: "12 min",
    },
    {
      id: 3,
      title: "Public Transit: Metro, Buses, and Tickets",
      type: "vocab",
      duration: "14 min",
    },
    { id: 4, title: "Hotel Check-in & Inquiries", type: "dialogue", duration: "15 min" },
    { id: 5, title: "Emergency & Medical Assistance", type: "dialogue", duration: "12 min" },
    { id: 6, title: "Travel Checkpoint", type: "checkpoint", duration: "18 min" },
  ],
};

function RoadmapPage() {
  const { user } = useAuth();
  const { data, updateData } = useData();

  const [selectedUnitId, setSelectedUnitId] = useState<string>(
    data.units.find((u) => u.status === "in-progress")?.id || data.units[0].id,
  );

  const selectedUnit = data.units.find((u) => u.id === selectedUnitId) || data.units[0];
  const modules = mockModulesByUnit[selectedUnit.id] || mockModulesByUnit.u2;

  // Complete one module in current unit
  const handleAdvanceModule = () => {
    updateData((prev) => {
      const updatedUnits = prev.units.map((unit) => {
        if (unit.id === selectedUnit.id) {
          const nextCompleted = Math.min(unit.completedModules + 1, unit.totalModules);
          const isDone = nextCompleted >= unit.totalModules;
          return {
            ...unit,
            completedModules: nextCompleted,
            status: isDone ? ("completed" as const) : ("in-progress" as const),
          };
        }
        return unit;
      });

      // If unit completed, unlock the next unit
      const currentIndex = updatedUnits.findIndex((u) => u.id === selectedUnit.id);
      if (
        updatedUnits[currentIndex].status === "completed" &&
        currentIndex + 1 < updatedUnits.length &&
        updatedUnits[currentIndex + 1].status === "locked"
      ) {
        updatedUnits[currentIndex + 1].status = "in-progress";
      }

      return {
        ...prev,
        xp: prev.xp + 25,
        units: updatedUnits,
      };
    });
  };

  const totalModulesCompleted = data.units.reduce((sum, u) => sum + u.completedModules, 0);
  const totalModulesCount = data.units.reduce((sum, u) => sum + u.totalModules, 0);

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-coral font-semibold">
              Curriculum Roadmap · {user?.language || "French"}
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Structured Path to Fluency</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Progress through real-world contextual themes from beginner survival to spontaneous
            conversation.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-card border border-border rounded-xl p-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Overall Path
            </p>
            <p className="text-xl font-bold text-brand mt-0.5">
              {totalModulesCompleted}{" "}
              <span className="text-sm text-muted-foreground font-normal">
                / {totalModulesCount} modules
              </span>
            </p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Current Level
            </p>
            <p className="text-xl font-bold text-coral mt-0.5">{user?.level || data.level}</p>
          </div>
        </div>
      </div>

      {/* Main Roadmap Area */}
      <div className="grid grid-cols-12 gap-8">
        {/* Left Column: Units Timeline List */}
        <div className="col-span-12 lg:col-span-5 space-y-3">
          <h2 className="text-sm font-mono uppercase tracking-[0.15em] text-muted-foreground mb-3">
            Core Units
          </h2>

          <div className="space-y-3">
            {data.units.map((unit, index) => {
              const isSelected = unit.id === selectedUnit.id;
              const isCompleted = unit.status === "completed";
              const isInProgress = unit.status === "in-progress";
              const isLocked = unit.status === "locked";

              return (
                <div
                  key={unit.id}
                  onClick={() => !isLocked && setSelectedUnitId(unit.id)}
                  className={`group relative rounded-xl border p-4 transition-all ${
                    isLocked
                      ? "border-border/60 bg-muted/40 opacity-70 cursor-not-allowed"
                      : isSelected
                        ? "border-2 border-coral bg-card shadow-sm cursor-pointer"
                        : "border-border bg-card hover:border-brand/40 cursor-pointer"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`size-8 rounded-lg grid place-items-center text-xs font-bold ${
                          isCompleted
                            ? "bg-mint text-white"
                            : isInProgress
                              ? "bg-coral text-white"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="size-4" />
                        ) : isLocked ? (
                          <Lock className="size-3.5" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <div>
                        <span
                          className={`font-mono text-[10px] uppercase tracking-wider font-semibold ${
                            isCompleted
                              ? "text-mint"
                              : isInProgress
                                ? "text-coral"
                                : "text-muted-foreground"
                          }`}
                        >
                          {unit.status.replace("-", " ")}
                        </span>
                        <h3 className="font-semibold text-base leading-tight mt-0.5">
                          {unit.title}
                        </h3>
                      </div>
                    </div>

                    <ChevronRight
                      className={`size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 ${
                        isSelected ? "rotate-90 text-coral" : ""
                      }`}
                    />
                  </div>

                  {/* Progress Bar inside Unit Card */}
                  <div className="mt-4 flex items-center justify-between gap-3 text-xs font-mono text-muted-foreground">
                    <span>
                      {unit.completedModules} / {unit.totalModules} modules
                    </span>
                    <div className="h-1.5 flex-1 max-w-[120px] rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full ${isCompleted ? "bg-mint" : "bg-coral"}`}
                        style={{
                          width: `${Math.round((unit.completedModules / unit.totalModules) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Unit Detail & Interactive Modules */}
        <div className="col-span-12 lg:col-span-7">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sticky top-24 space-y-6">
            {/* Header of selected unit */}
            <div className="border-b border-border pb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs uppercase tracking-wider text-coral font-bold">
                  Unit Breakdown
                </span>
                <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-cream text-brand font-semibold">
                  {selectedUnit.completedModules} of {selectedUnit.totalModules} Finished
                </span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight">{selectedUnit.title}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Practical, realistic scenario lessons designed for immediate conversational usage.
              </p>

              {/* Action Banner */}
              {selectedUnit.status === "in-progress" && (
                <div className="mt-4 flex items-center justify-between bg-cream/70 rounded-xl p-4 border border-border">
                  <div className="flex items-center gap-3">
                    <Zap className="size-5 text-coral" />
                    <div>
                      <p className="text-xs font-mono font-semibold uppercase text-coral">
                        Ready for Next Lesson
                      </p>
                      <p className="text-sm font-semibold text-brand">
                        Module {selectedUnit.completedModules + 1}:{" "}
                        {modules[selectedUnit.completedModules]?.title || "Speaking practice"}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={handleAdvanceModule}
                    className="bg-coral text-white hover:bg-brand h-9 text-xs px-4 rounded-md cursor-pointer font-semibold transition-colors"
                  >
                    Complete (+25 XP)
                  </Button>
                </div>
              )}
            </div>

            {/* List of Modules */}
            <div className="space-y-2.5">
              <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Lesson Modules
              </h3>

              <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                {modules.map((mod, idx) => {
                  const isDone = idx < selectedUnit.completedModules;
                  const isCurrent =
                    idx === selectedUnit.completedModules && selectedUnit.status === "in-progress";
                  const isPending = idx > selectedUnit.completedModules;

                  return (
                    <div
                      key={mod.id}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                        isDone
                          ? "border-mint/30 bg-mint/5"
                          : isCurrent
                            ? "border-2 border-coral bg-card shadow-xs"
                            : "border-border bg-background/50 opacity-70"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`size-7 rounded-full grid place-items-center text-xs font-semibold ${
                            isDone
                              ? "bg-mint text-white"
                              : isCurrent
                                ? "bg-coral text-white animate-pulse"
                                : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {isDone ? "✓" : idx + 1}
                        </div>
                        <div>
                          <p
                            className={`text-sm ${isDone ? "font-medium text-brand" : isCurrent ? "font-bold text-brand" : "text-muted-foreground"}`}
                          >
                            {mod.title}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="font-mono text-[10px] uppercase text-muted-foreground">
                              {mod.type}
                            </span>
                            <span className="text-[10px] text-muted-foreground/60">•</span>
                            <span className="font-mono text-[10px] text-muted-foreground">
                              {mod.duration}
                            </span>
                          </div>
                        </div>
                      </div>

                      {isCurrent && (
                        <Button
                          onClick={handleAdvanceModule}
                          size="sm"
                          className="bg-coral text-white hover:bg-brand text-xs h-8 px-3 cursor-pointer"
                        >
                          Start <PlayCircle className="ml-1 size-3.5" />
                        </Button>
                      )}

                      {isDone && (
                        <span className="font-mono text-xs font-semibold text-mint">Done</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Cross-Navigation */}
            <div className="pt-4 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="text-xs border-border cursor-pointer"
                >
                  <Link to="/flashcards">
                    <Layers className="mr-1.5 size-3.5" /> Review Unit Cards
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="text-xs border-border cursor-pointer"
                >
                  <Link to="/practice">
                    <CalendarDays className="mr-1.5 size-3.5" /> Book Live Practice
                  </Link>
                </Button>
              </div>

              <span className="font-mono text-xs text-muted-foreground">
                +25 XP per completed module
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
