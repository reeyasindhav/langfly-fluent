import { createFileRoute } from "@tanstack/react-router";
import { useData } from "../../lib/data-context";
import { useAuth } from "../../lib/auth-context";
import {
  TrendingUp,
  Flame,
  Trophy,
  Layers,
  CalendarDays,
  CheckCircle2,
  Award,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/progress")({
  head: () => ({
    meta: [
      { title: "Learning Analytics & Retention — Langfly" },
      {
        name: "description",
        content: "Inspect vocabulary recall retention, weekly study time, and fluency milestones.",
      },
    ],
  }),
  component: ProgressPage,
});

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const topicBreakdown = [
  { topic: "Greetings & Small Talk", count: 410, mastery: 98, color: "bg-mint" },
  { topic: "Ordering & Dining Out", count: 340, mastery: 92, color: "bg-coral" },
  { topic: "Travel & Directions", count: 280, mastery: 88, color: "bg-brand" },
  { topic: "Workplace & Professional", count: 140, mastery: 65, color: "bg-lemon" },
  { topic: "Culture & Idioms", count: 114, mastery: 72, color: "bg-coral" },
];

export function ProgressPage() {
  const { user } = useAuth();
  const { data } = useData();

  const totalWeeklyXp = data.weeklyActivity.reduce((a, b) => a + b, 0);
  const maxDailyXp = Math.max(...data.weeklyActivity, 100);

  // 30 days dummy heatmap data
  const heatmapDays = Array.from({ length: 28 }, (_, i) => ({
    day: i + 1,
    active: i % 7 !== 2 && i < 24, // simulated streak pattern
    xp: i % 7 !== 2 && i < 24 ? Math.floor(Math.random() * 60 + 20) : 0,
  }));

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-coral font-semibold">
              Analytics & Fluency Metrics
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Retention & Mastery</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Tracking your spaced repetition recall accuracy and CEFR conversational milestones.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-card border border-border rounded-xl p-3 px-4">
          <Award className="size-5 text-lemon" />
          <div>
            <p className="font-mono text-[10px] uppercase text-muted-foreground">
              Current CEFR Status
            </p>
            <p className="text-base font-bold text-brand">
              {user?.level || data.level} Intermediate
            </p>
          </div>
        </div>
      </div>

      {/* Top 4 Metric Highlights */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-border bg-card p-5 hover-lift">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Words Retained
            </span>
            <Layers className="size-4 text-coral" />
          </div>
          <p className="text-3xl font-bold text-brand">{data.wordsKnown.toLocaleString()}</p>
          <p className="text-xs text-mint mt-1 flex items-center gap-1">
            <TrendingUp className="size-3" /> +64 new this week
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 hover-lift">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              30-Day Recall
            </span>
            <CheckCircle2 className="size-4 text-mint" />
          </div>
          <p className="text-3xl font-bold text-coral">{data.recallRate}%</p>
          <p className="text-xs text-muted-foreground mt-1">Target benchmark: 90%+</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 hover-lift">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Speaking Time
            </span>
            <CalendarDays className="size-4 text-brand" />
          </div>
          <p className="text-3xl font-bold text-brand">
            {Math.floor(data.speakingMinutes / 60)}h {data.speakingMinutes % 60}m
          </p>
          <p className="text-xs text-mint mt-1">Across 9 interactive sessions</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 hover-lift">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Active Streak
            </span>
            <Flame className="size-4 text-coral" />
          </div>
          <p className="text-3xl font-bold text-brand">{data.streak} Days</p>
          <p className="text-xs text-lemon mt-1">Record: {data.longestStreak} days</p>
        </div>
      </div>

      {/* Weekly Activity & Retention Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Activity Bar Chart */}
        <div className="col-span-12 lg:col-span-7 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-border">
            <div>
              <h2 className="text-lg font-bold tracking-tight">Weekly Study Output</h2>
              <p className="text-xs text-muted-foreground">XP collected across the last 7 days</p>
            </div>
            <div className="text-right">
              <span className="font-mono text-sm font-bold text-coral">{totalWeeklyXp} XP</span>
              <p className="font-mono text-[10px] text-muted-foreground">Goal: 500 XP</p>
            </div>
          </div>

          {/* Bar Chart Bars */}
          <div className="h-52 flex items-end justify-between gap-3 pt-4 px-2">
            {data.weeklyActivity.map((xp, index) => {
              const heightPercent = Math.max(Math.round((xp / maxDailyXp) * 100), 12);
              const isToday = index === 6;

              return (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center gap-2 h-full justify-end"
                >
                  <span className="font-mono text-[10px] text-muted-foreground">{xp}</span>
                  <div className="w-full max-w-[36px] bg-muted rounded-t-lg overflow-hidden h-full flex items-end">
                    <div
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        isToday ? "bg-coral" : "bg-brand/70 hover:bg-brand"
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span
                    className={`font-mono text-xs ${
                      isToday ? "font-bold text-coral" : "text-muted-foreground"
                    }`}
                  >
                    {dayLabels[index]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Retention Advantage Comparison */}
        <div className="col-span-12 lg:col-span-5 rounded-2xl border border-border bg-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold tracking-tight">The Retention Curve</h2>
              <span className="rounded-full bg-mint/10 text-mint font-mono text-xs px-2.5 py-0.5 font-bold">
                Spaced Recall
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-6">
              Without spaced repetition, learners lose 68% of new vocabulary within 48 hours.
              Langfly's algorithm resets your forgetting curve.
            </p>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-coral flex items-center gap-1.5">
                    <Zap className="size-3.5" /> Langfly Spaced Repetition
                  </span>
                  <span className="font-mono text-coral font-bold">94% Retention</span>
                </div>
                <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-coral w-[94%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-muted-foreground">Standard Cramming / Word Lists</span>
                  <span className="font-mono text-muted-foreground font-bold">32% Retention</span>
                </div>
                <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-muted-foreground/40 w-[32%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-cream p-4 border border-border text-xs">
            <p className="font-semibold text-brand">Daily recommendation:</p>
            <p className="text-muted-foreground mt-0.5">
              Reviewing 10 flashcards right before bed solidifies synaptic recall by up to 22%.
            </p>
          </div>
        </div>
      </div>

      {/* Vocabulary Mastery by Domain */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-bold tracking-tight mb-1">Vocabulary Breakdown by Domain</h2>
        <p className="text-xs text-muted-foreground mb-6">
          Words committed to long-term memory across syllabus categories.
        </p>

        <div className="space-y-4">
          {topicBreakdown.map((item) => (
            <div key={item.topic} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-brand">{item.topic}</span>
                <span className="font-mono text-muted-foreground">
                  <strong className="text-brand">{item.count} words</strong> ({item.mastery}% fluent
                  recall)
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full ${item.color}`}
                  style={{ width: `${item.mastery}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Streak Calendar Matrix (Heatmap) */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold tracking-tight">Study Frequency Calendar</h2>
            <p className="text-xs text-muted-foreground">4-week consistency matrix</p>
          </div>
          <span className="font-mono text-xs text-mint font-semibold">
            22 active days this month
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2 pt-2">
          {heatmapDays.map((d) => (
            <div
              key={d.day}
              className={`rounded-lg p-3 text-center border transition-all ${
                d.active
                  ? "bg-coral/10 border-coral/30 text-coral font-bold shadow-2xs"
                  : "bg-muted/40 border-border/50 text-muted-foreground/60"
              }`}
            >
              <span className="font-mono text-xs block">{d.day}</span>
              <span className="text-[10px] font-mono mt-0.5 block">
                {d.active ? `+${d.xp}xp` : "—"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
