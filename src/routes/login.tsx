import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "../lib/auth-context";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — Langfly" },
      {
        name: "description",
        content: "Log in to Langfly to continue your language learning streak.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    router.navigate({ to: "/dashboard" });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    router.navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-fade-up">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-coral transition-colors mb-6"
        >
          <ArrowLeft className="size-4" />
          Back to home
        </Link>
        <div className="rounded-2xl border border-border bg-card p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-[#163b2e] flex items-center justify-center text-[#d7e780] shadow-xs">
              <svg viewBox="0 0 24 24" className="size-6 fill-current">
                <path d="M12 2a4 4 0 0 0-4 4c0 1.6 1 3 2.4 3.6A4 4 0 0 0 6.8 12 4 4 0 0 0 2 16a4 4 0 0 0 4 4c1.6 0 3-1 3.6-2.4A4 4 0 0 0 12 19.2a4 4 0 0 0 4 2.8 4 4 0 0 0 4-4c0-1.6-1-3-2.4-3.6A4 4 0 0 0 19.2 12 4 4 0 0 0 22 8a4 4 0 0 0-4-4c-1.6 0-3 1-3.6 2.4A4 4 0 0 0 12 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
              <p className="text-sm text-muted-foreground">Log in to continue learning</p>
            </div>
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-coral text-white hover:bg-brand py-3 h-auto rounded-md"
            >
              {loading ? "Logging in…" : "Log in"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-coral hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
