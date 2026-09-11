import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "../lib/auth-context";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign up — Langfly" },
      {
        name: "description",
        content: "Create your Langfly account and start speaking with lasting recall.",
      },
    ],
  }),
  component: SignupPage,
});

const languages = [
  { id: "Spanish", name: "Spanish", flag: "🇪🇸", learners: "4.2k active" },
  { id: "French", name: "French", flag: "🇫🇷", learners: "3.8k active" },
  { id: "German", name: "German", flag: "🇩🇪", learners: "2.1k active" },
  { id: "Italian", name: "Italian", flag: "🇮🇹", learners: "1.9k active" },
  { id: "Japanese", name: "Japanese", flag: "🇯🇵", learners: "2.5k active" },
];

const levels = [
  { id: "A1", label: "Complete Beginner", desc: "First time learning or just a few basic words" },
  { id: "A2", label: "Elementary", desc: "Can form simple sentences & order at cafes" },
  { id: "B1", label: "Intermediate", desc: "Understand main points & hold brief casual chats" },
];

function SignupPage() {
  const { signup, isAuthenticated } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("French");
  const [selectedLevel, setSelectedLevel] = useState("A1");
  const [step, setStep] = useState<1 | 2>(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    router.navigate({ to: "/dashboard" });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!name.trim() || !email.trim() || !password) {
        setError("Please complete all fields to proceed.");
        return;
      }
      if (password.length < 6) {
        setError("Password should be at least 6 characters long.");
        return;
      }
      setError("");
      setStep(2);
      return;
    }

    setError("");
    setLoading(true);
    const result = await signup({
      name,
      email,
      password,
      language: selectedLanguage,
    });
    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    router.navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg animate-fade-up">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-coral transition-colors mb-6"
        >
          <ArrowLeft className="size-4" />
          Back to home
        </Link>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-[#163b2e] flex items-center justify-center text-[#d7e780] shadow-xs">
                <svg viewBox="0 0 24 24" className="size-6 fill-current">
                  <path d="M12 2a4 4 0 0 0-4 4c0 1.6 1 3 2.4 3.6A4 4 0 0 0 6.8 12 4 4 0 0 0 2 16a4 4 0 0 0 4 4c1.6 0 3-1 3.6-2.4A4 4 0 0 0 12 19.2a4 4 0 0 0 4 2.8 4 4 0 0 0 4-4c0-1.6-1-3-2.4-3.6A4 4 0 0 0 19.2 12 4 4 0 0 0 22 8a4 4 0 0 0-4-4c-1.6 0-3 1-3.6 2.4A4 4 0 0 0 12 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>
                <p className="text-sm text-muted-foreground">
                  {step === 1 ? "Step 1 of 2: Your credentials" : "Step 2 of 2: Your language goal"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className={`size-2.5 rounded-full transition-colors ${
                  step === 1 ? "bg-coral" : "bg-mint"
                }`}
              />
              <span
                className={`size-2.5 rounded-full transition-colors ${
                  step === 2 ? "bg-coral" : "bg-border"
                }`}
              />
            </div>
          </div>

          {error && (
            <div className="mb-5 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {step === 1 ? (
              <>
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Alex Morgan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password">Create a password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-coral text-white hover:bg-brand py-3 h-auto rounded-md font-semibold transition-colors cursor-pointer"
                >
                  Continue to learning setup
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">
                    Which language do you want to learn?
                  </Label>
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                    {languages.map((lang) => {
                      const isSelected = selectedLanguage === lang.id;
                      return (
                        <button
                          type="button"
                          key={lang.id}
                          onClick={() => setSelectedLanguage(lang.id)}
                          className={`flex flex-col items-start rounded-xl border p-3 text-left transition-all cursor-pointer ${
                            isSelected
                              ? "border-coral bg-coral/5 shadow-xs"
                              : "border-border bg-card hover:border-brand/30"
                          }`}
                        >
                          <span className="text-2xl mb-1">{lang.flag}</span>
                          <span className="font-semibold text-sm">{lang.name}</span>
                          <span className="font-mono text-[10px] text-muted-foreground">
                            {lang.learners}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2.5 pt-2">
                  <Label className="text-sm font-semibold">What is your current level?</Label>
                  <div className="space-y-2">
                    {levels.map((lvl) => {
                      const isSelected = selectedLevel === lvl.id;
                      return (
                        <button
                          type="button"
                          key={lvl.id}
                          onClick={() => setSelectedLevel(lvl.id)}
                          className={`flex w-full items-center justify-between rounded-xl border p-3.5 text-left transition-all cursor-pointer ${
                            isSelected
                              ? "border-coral bg-coral/5 shadow-xs"
                              : "border-border bg-card hover:border-brand/30"
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="rounded bg-brand/10 px-1.5 py-0.5 font-mono text-xs font-bold text-brand">
                                {lvl.id}
                              </span>
                              <span className="font-semibold text-sm">{lvl.label}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">{lvl.desc}</p>
                          </div>
                          {isSelected && (
                            <div className="grid size-5 place-items-center rounded-full bg-coral text-white shrink-0">
                              <Check className="size-3 stroke-[3]" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 h-auto cursor-pointer"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-2 bg-coral text-white hover:bg-brand py-3 h-auto rounded-md font-semibold transition-colors cursor-pointer"
                  >
                    {loading ? (
                      "Creating your profile…"
                    ) : (
                      <span className="inline-flex items-center gap-1.5">
                        <ArrowRight className="size-4" /> Start learning
                      </span>
                    )}
                  </Button>
                </div>
              </>
            )}
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-coral hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
