import { createFileRoute, Link, Outlet, useRouter, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "../../lib/auth-context";
import { useData } from "../../lib/data-context";
import { Button } from "../../components/ui/button";
import { SignOutDialog } from "../../components/SignOutDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet";
import {
  BookOpen,
  Layers,
  Target,
  Video,
  Settings,
  Bell,
  Search,
  ChevronDown,
  LayoutGrid,
  Menu,
  LogOut,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
});

const navItems = [
  { to: "/dashboard", icon: LayoutGrid, label: "Today's menu" },
  { to: "/roadmap", icon: BookOpen, label: "My roadmap" },
  { to: "/flashcards", icon: Layers, label: "Flashcards", badge: "124" },
  { to: "/challenges", icon: Target, label: "Challenges" },
  { to: "/practice", icon: Video, label: "Live practice" },
];

function AuthenticatedLayout() {
  const { user, isAuthenticated } = useAuth();
  const { data } = useData();
  const router = useRouter();
  const location = useLocation();
  const [signOutOpen, setSignOutOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.navigate({ to: "/login", search: { redirect: window.location.pathname } });
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbf9f4]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#163b2e] border-t-transparent" />
      </div>
    );
  }

  const userName = user?.name || "Alex Morgan";
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const userLang = user?.language || "French";

  return (
    <div className="min-h-screen bg-[#fbf9f4] text-[#163b2e] font-sans antialiased flex">
      {/* Fixed Left Sidebar (Desktop) */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col justify-between border-r border-[#e8e4dc] bg-[#fbf9f4] p-5 fixed top-0 bottom-0 z-30">
        <div>
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2.5 px-2 py-1 mb-8">
            <div className="size-8 rounded-lg bg-[#163b2e] flex items-center justify-center text-[#d7e780]">
              {/* Four leaf / kitchen clover symbol */}
              <svg
                viewBox="0 0 24 24"
                className="size-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2a4 4 0 0 0-4 4c0 1.6 1 3 2.4 3.6A4 4 0 0 0 6.8 12 4 4 0 0 0 2 16a4 4 0 0 0 4 4c1.6 0 3-1 3.6-2.4A4 4 0 0 0 12 19.2a4 4 0 0 0 4 2.8 4 4 0 0 0 4-4c0-1.6-1-3-2.4-3.6A4 4 0 0 0 19.2 12 4 4 0 0 0 22 8a4 4 0 0 0-4-4c-1.6 0-3 1-3.6 2.4A4 4 0 0 0 12 2z" />
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#163b2e] font-serif">
              langfly
            </span>
          </Link>

          {/* Section: YOUR KITCHEN */}
          <div className="mb-2 px-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-[#727d74]">
              YOUR KITCHEN
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-[#d7e780] text-[#163b2e] shadow-2xs"
                      : "text-[#3b473e] hover:bg-[#eae5da]/60 hover:text-[#163b2e]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`size-4.5 ${isActive ? "text-[#163b2e]" : "text-[#58645b]"}`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive ? "bg-[#163b2e] text-[#d7e780]" : "bg-[#163b2e] text-[#d7e780]"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar: Weekly Goal + User Footer */}
        <div className="space-y-4">
          {/* Weekly Goal Card */}
          <div className="rounded-2xl bg-[#163b2e] p-4 text-white shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white tracking-wide">Weekly goal</span>
              <div className="size-4 rounded-full border border-white/30 flex items-center justify-center text-white">
                <span className="size-1.5 rounded-full bg-[#d7e780]" />
              </div>
            </div>
            <p className="text-xs text-white/80 leading-relaxed mt-1.5 font-normal">
              You're 2 sessions away from a perfect week.
            </p>

            <div className="mt-3.5 h-1.5 w-full rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#d7e780] transition-all duration-500"
                style={{ width: "68%" }}
              />
            </div>

            <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-[#d7e780] font-semibold">
              <span>12 / 18 lessons</span>
              <span>68%</span>
            </div>
          </div>

          {/* User Profile Card */}
          <div className="flex items-center justify-between pt-2 border-t border-[#e8e4dc]">
            <Link to="/profile" className="flex items-center gap-3 group">
              <div className="size-9 rounded-full bg-[#d7e780] text-[#163b2e] font-bold text-xs grid place-items-center shrink-0">
                {userInitials}
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-[#163b2e] group-hover:text-black leading-tight">
                  {userName}
                </p>
                <p className="text-xs text-[#717a73] mt-0.5">Learning {userLang}</p>
              </div>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="p-1.5 rounded-lg text-[#717a73] hover:text-[#163b2e] hover:bg-[#eae5da]/60 transition-colors cursor-pointer"
                  title="Settings & Logout"
                >
                  <Settings className="size-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white">
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/progress">Analytics & Progress</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                    setSignOutOpen(true);
                  }}
                  className="text-destructive cursor-pointer"
                >
                  <LogOut className="mr-2 size-4" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Main Content Area (offset by 256px on desktop) */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="sticky top-0 z-20 bg-[#fbf9f4]/90 backdrop-blur-md px-6 lg:px-10 h-16 flex items-center justify-between border-b border-[#e8e4dc]/60">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-[#163b2e] cursor-pointer"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-[#fbf9f4] p-5">
                <div className="flex items-center gap-2.5 mb-8">
                  <div className="size-8 rounded-lg bg-[#163b2e] flex items-center justify-center text-[#d7e780]">
                    <svg viewBox="0 0 24 24" className="size-5 fill-current">
                      <path d="M12 2a4 4 0 0 0-4 4c0 1.6 1 3 2.4 3.6A4 4 0 0 0 6.8 12 4 4 0 0 0 2 16a4 4 0 0 0 4 4c1.6 0 3-1 3.6-2.4A4 4 0 0 0 12 19.2a4 4 0 0 0 4 2.8 4 4 0 0 0 4-4c0-1.6-1-3-2.4-3.6A4 4 0 0 0 19.2 12 4 4 0 0 0 22 8a4 4 0 0 0-4-4c-1.6 0-3 1-3.6 2.4A4 4 0 0 0 12 2z" />
                    </svg>
                  </div>
                  <span className="text-2xl font-bold font-serif text-[#163b2e]">langfly</span>
                </div>
                <nav className="space-y-1.5">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.to;
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all ${
                          isActive
                            ? "bg-[#d7e780] text-[#163b2e]"
                            : "text-[#3b473e] hover:bg-[#eae5da]/60"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="size-4.5" />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#163b2e] text-[#d7e780]">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>
                <div className="mt-auto pt-8 border-t border-[#e8e4dc]">
                  <button
                    type="button"
                    onClick={() => setSignOutOpen(true)}
                    className="flex w-full items-center gap-3 px-3 py-2 text-sm font-semibold text-destructive cursor-pointer"
                  >
                    <LogOut className="size-4" /> Log out
                  </button>
                </div>
              </SheetContent>
            </Sheet>

            {/* Left Status: Date & Week */}
            <p className="text-xs text-[#717a73] font-medium hidden sm:block">
              Wednesday, September 14 <span className="mx-1">•</span> Week 8 of your journey
            </p>
          </div>

          {/* Right Top Bar Items */}
          <div className="flex items-center gap-3">
            {/* Language Selector Pill */}
            <Link
              to="/profile"
              className="flex items-center gap-2 rounded-full border border-[#e8e4dc] bg-white px-3 py-1.5 text-xs font-bold text-[#163b2e] shadow-2xs hover:border-[#163b2e]/30 transition-colors"
            >
              <span className="size-4 rounded-full bg-[#e8a382] flex items-center justify-center text-[10px] text-white">
                🇫🇷
              </span>
              <span>{userLang}</span>
              <ChevronDown className="size-3 text-[#717a73]" />
            </Link>

            {/* Search Button */}
            <button
              type="button"
              className="size-8 rounded-full flex items-center justify-center text-[#556157] hover:text-[#163b2e] hover:bg-[#eae5da]/60 transition-colors"
              title="Search"
            >
              <Search className="size-4" />
            </button>

            {/* Notification Bell */}
            <button
              type="button"
              className="size-8 rounded-full flex items-center justify-center text-[#556157] hover:text-[#163b2e] hover:bg-[#eae5da]/60 transition-colors relative"
              title="Notifications"
            >
              <Bell className="size-4" />
              <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-[#d96b52] ring-2 ring-[#fbf9f4]" />
            </button>
          </div>
        </header>

        {/* Main Routed Page Content */}
        <main className="flex-1 px-6 lg:px-10 py-6 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
      <SignOutDialog open={signOutOpen} onOpenChange={setSignOutOpen} />
    </div>
  );
}
