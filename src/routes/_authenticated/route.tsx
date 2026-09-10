import { createFileRoute, Link, Outlet, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "../../lib/auth-context";
import { useData } from "../../lib/data-context";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet";
import {
  Flame,
  Map,
  Layers,
  Trophy,
  CalendarDays,
  TrendingUp,
  User,
  LogOut,
  Menu,
  Home,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
});

const navItems = [
  { to: "/dashboard", icon: Home, label: "Dashboard" },
  { to: "/roadmap", icon: Map, label: "Roadmap" },
  { to: "/flashcards", icon: Layers, label: "Flashcards" },
  { to: "/challenges", icon: Trophy, label: "Challenges" },
  { to: "/practice", icon: CalendarDays, label: "Practice" },
  { to: "/progress", icon: TrendingUp, label: "Progress" },
  { to: "/profile", icon: User, label: "Profile" },
];

function AuthenticatedLayout() {
  const { user, isAuthenticated, logout } = useAuth();
  const { data } = useData();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.navigate({ to: "/login", search: { redirect: window.location.pathname } });
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-coral border-t-transparent" />
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-brand text-cream text-lg font-bold">L</span>
              <span className="hidden text-xl font-bold tracking-tight sm:inline">Langfly</span>
            </Link>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand/40 hidden sm:inline-block border border-brand/15 px-2 py-0.5 rounded">
              v2.4
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-lg bg-cream px-3 py-1.5 md:flex">
              <Flame className="size-4 text-coral" />
              <span className="text-sm font-semibold">{data.streak}</span>
              <span className="text-xs text-muted-foreground">day streak</span>
            </div>
            <div className="hidden items-center gap-1.5 rounded-lg bg-cream px-3 py-1.5 md:flex">
              <Trophy className="size-4 text-lemon" />
              <span className="text-sm font-semibold">{data.xp.toLocaleString()}</span>
              <span className="text-xs text-muted-foreground">XP</span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 px-2">
                  <Avatar className="size-8">
                    <AvatarFallback className="bg-brand text-cream text-sm font-semibold">
                      {user?.name?.charAt(0) ?? "?"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden max-w-[120px] truncate text-sm font-medium sm:inline">
                    {user?.name}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/progress">Progress</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="mr-2 size-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-background">
                <MobileNav onLogout={handleLogout} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex items-start gap-8 py-8">
          <aside className="sticky top-24 hidden w-56 shrink-0 lg:block">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink key={item.to} item={item} />
              ))}
            </nav>

            <div className="mt-8 rounded-xl border border-border bg-card p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-2">
                Weekly goal
              </p>
              <div className="flex items-center justify-between text-sm font-medium">
                <span>{Math.min(data.weeklyActivity.reduce((a, b) => a + b, 0), 500)}/500 XP</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-brand/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-mint"
                  style={{ width: `${Math.min((data.weeklyActivity.reduce((a, b) => a + b, 0) / 500) * 100, 100)}%` }}
                />
              </div>
            </div>
          </aside>

          <main className="min-w-0 flex-1 animate-fade-in">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

function NavLink({ item }: { item: { to: string; icon: React.ElementType; label: string } }) {
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
      activeProps={{ className: "bg-brand text-cream hover:bg-brand" }}
      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-brand/70 transition-colors hover:bg-brand/5 hover:text-brand"
    >
      <Icon className="size-4" />
      {item.label}
    </Link>
  );
}

function MobileNav({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 py-4">
        <span className="grid size-8 place-items-center rounded-lg bg-brand text-cream text-lg font-bold">L</span>
        <span className="text-xl font-bold tracking-tight">Langfly</span>
      </div>
      <nav className="mt-4 flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: "bg-brand text-cream" }}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-brand/70 transition-colors hover:bg-brand/5"
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto pt-6">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/5"
        >
          <LogOut className="size-4" />
          Log out
        </button>
      </div>
    </div>
  );
}
