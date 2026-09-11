import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "../../lib/auth-context";
import { useData } from "../../lib/data-context";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import { SignOutDialog } from "../../components/SignOutDialog";
import {
  User,
  Settings,
  Globe,
  Bell,
  Volume2,
  RotateCcw,
  LogOut,
  Check,
  Flame,
  Trophy,
  Shield,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [
      { title: "Profile & Preferences — Langfly" },
      {
        name: "description",
        content: "Manage your learner profile, target languages, and study reminders.",
      },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = useAuth();
  const { data, updateData } = useData();
  const router = useRouter();

  const [signOutOpen, setSignOutOpen] = useState(false);
  const [name, setName] = useState(user?.name || "Riya");
  const [selectedLanguage, setSelectedLanguage] = useState(user?.language || "French");
  const [selectedLevel, setSelectedLevel] = useState(user?.level || data.level || "B1");
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState(20);
  const [autoPlayAudio, setAutoPlayAudio] = useState(true);
  const [dailyReminder, setDailyReminder] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    // Update auth user in localStorage
    if (user) {
      const updatedUser = {
        ...user,
        name,
        language: selectedLanguage,
        level: selectedLevel,
      };
      localStorage.setItem("langfly_auth_user", JSON.stringify(updatedUser));
    }
    updateData((prev) => ({
      ...prev,
      level: selectedLevel,
    }));

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResetData = () => {
    if (confirm("Reset all learning progress and demo bookings to initial factory state?")) {
      localStorage.removeItem("langfly_data_guest");
      if (user?.id) localStorage.removeItem(`langfly_data_${user.id}`);
      setResetSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 800);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-coral font-semibold">
              Account Control
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Learner Profile & Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Customize your learning pace, active dialect, and session preferences.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => setSignOutOpen(true)}
          className="border-destructive/30 text-destructive hover:bg-destructive/10 h-10 px-4 cursor-pointer self-start md:self-auto"
        >
          <LogOut className="mr-2 size-4" /> Sign Out
        </Button>
      </div>

      {savedSuccess && (
        <div className="rounded-xl border border-mint/40 bg-mint/10 p-4 text-sm font-medium text-brand flex items-center gap-2 animate-fade-up">
          <Check className="size-4 text-mint stroke-[3]" />
          Profile and study preferences updated successfully!
        </div>
      )}

      {resetSuccess && (
        <div className="rounded-xl border border-lemon/40 bg-lemon/10 p-4 text-sm font-medium text-brand flex items-center gap-2 animate-fade-up">
          <RotateCcw className="size-4 text-coral stroke-[3]" />
          Progress reset. Reloading initial demo seed...
        </div>
      )}

      {/* User Card */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="size-16 rounded-2xl bg-brand text-cream text-2xl font-bold grid place-items-center shadow-xs">
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-brand">{name}</h2>
            <p className="text-sm text-muted-foreground">{user?.email || "learner@example.com"}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="rounded-md bg-cream px-2 py-0.5 font-mono text-xs font-semibold text-coral">
                {selectedLanguage}
              </span>
              <span className="rounded-md bg-cream px-2 py-0.5 font-mono text-xs font-semibold text-brand">
                Level {selectedLevel}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-border pt-4 sm:pt-0 sm:pl-6">
          <div className="text-center">
            <p className="font-mono text-xs text-muted-foreground uppercase">Streak</p>
            <p className="text-xl font-bold text-coral flex items-center justify-center gap-1 mt-0.5">
              <Flame className="size-4 text-coral" /> {data.streak}d
            </p>
          </div>
          <div className="text-center">
            <p className="font-mono text-xs text-muted-foreground uppercase">Total XP</p>
            <p className="text-xl font-bold text-brand flex items-center justify-center gap-1 mt-0.5">
              <Trophy className="size-4 text-lemon" /> {data.xp}
            </p>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSavePreferences} className="space-y-6">
        {/* Personal Details */}
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <User className="size-4 text-coral" />
            <h3 className="font-bold text-base">Learner Information</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Display Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={user?.email || "learner@example.com"}
                disabled
                className="bg-muted opacity-80"
              />
            </div>
          </div>
        </div>

        {/* Language & Fluency Focus */}
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Globe className="size-4 text-mint" />
            <h3 className="font-bold text-base">Target Language & Fluency Tier</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="targetLanguage">Active Target Language</Label>
              <select
                id="targetLanguage"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs focus:outline-none focus:ring-1 focus:ring-coral"
              >
                <option value="French">French 🇫🇷</option>
                <option value="Spanish">Spanish 🇪🇸</option>
                <option value="German">German 🇩🇪</option>
                <option value="Italian">Italian 🇮🇹</option>
                <option value="Japanese">Japanese 🇯🇵</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="targetLevel">Target CEFR Level</Label>
              <select
                id="targetLevel"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs focus:outline-none focus:ring-1 focus:ring-coral"
              >
                <option value="A1">A1 — Absolute Beginner</option>
                <option value="A2">A2 — Elementary Conversational</option>
                <option value="B1">B1 — Intermediate Independence</option>
                <option value="B2">B2 — Advanced Fluency</option>
              </select>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <Label>Daily Study Commitment</Label>
            <div className="grid grid-cols-3 gap-3">
              {[10, 20, 30].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setDailyGoalMinutes(mins)}
                  className={`py-3 rounded-xl border text-center transition-all cursor-pointer ${
                    dailyGoalMinutes === mins
                      ? "border-coral bg-coral/5 font-bold text-coral"
                      : "border-border bg-card text-muted-foreground hover:border-brand/30"
                  }`}
                >
                  <p className="text-base font-bold">{mins} mins</p>
                  <p className="text-[10px] font-mono text-muted-foreground mt-0.5">
                    {mins === 10 ? "Casual" : mins === 20 ? "Recommended" : "Intensive"}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Study Preferences & Switches */}
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Settings className="size-4 text-coral" />
            <h3 className="font-bold text-base">Study Behavior & Notifications</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-semibold flex items-center gap-2">
                  <Volume2 className="size-4 text-muted-foreground" /> Audio Pronunciation
                </p>
                <p className="text-xs text-muted-foreground">
                  Automatically pronounce foreign phrases when flipping flashcards.
                </p>
              </div>
              <Switch checked={autoPlayAudio} onCheckedChange={setAutoPlayAudio} />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div className="space-y-0.5">
                <p className="text-sm font-semibold flex items-center gap-2">
                  <Bell className="size-4 text-muted-foreground" /> Daily Streak Reminders
                </p>
                <p className="text-xs text-muted-foreground">
                  Send reminder prompt if daily challenge hasn't been started by 7:00 PM.
                </p>
              </div>
              <Switch checked={dailyReminder} onCheckedChange={setDailyReminder} />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="bg-coral text-white hover:bg-brand px-6 py-3 h-auto rounded-md font-semibold cursor-pointer"
        >
          Save Changes
        </Button>
      </form>

      {/* Danger Zone / Demo Tools */}
      <div className="rounded-2xl border border-border bg-card p-6 space-y-4 mt-8">
        <div className="flex items-center gap-2 border-b border-border pb-3">
          <Shield className="size-4 text-muted-foreground" />
          <h3 className="font-bold text-base">Data Management & Reset</h3>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-brand">Reset Demo Data</p>
            <p className="text-xs text-muted-foreground">
              Clear local study data, flashcards progress, and bookings to return to default demo
              state.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={handleResetData}
            className="border-border hover:border-destructive hover:text-destructive text-xs cursor-pointer"
          >
            <RotateCcw className="mr-1.5 size-3.5" /> Reset Local State
          </Button>
        </div>
      </div>
      <SignOutDialog open={signOutOpen} onOpenChange={setSignOutOpen} />
    </div>
  );
}
