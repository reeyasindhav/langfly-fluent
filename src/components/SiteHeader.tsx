import { Link } from "@tanstack/react-router";
import { useAuth } from "../lib/auth-context";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu, BookOpen, Layers, Users, Info, Newspaper, ArrowRight, LogOut } from "lucide-react";
import { useState } from "react";
import { SignOutDialog } from "./SignOutDialog";

export function SiteHeader() {
  const { isAuthenticated } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signOutOpen, setSignOutOpen] = useState(false);

  const navLinks = [
    { href: "/#tasting-menu", label: "Tasting Menu", icon: BookOpen },
    { href: "/#pantry", label: "Pantry Cards", icon: Layers },
    { href: "/#chefs-table", label: "Chef's Table", icon: Users },
    { href: "/community", label: "Community", icon: Users },
    { href: "/about", label: "About", icon: Info },
    { href: "/blog", label: "Blog", icon: Newspaper },
  ];

  return (
    <header className="sticky top-0 z-30 w-full border-b border-[#e8e4dc]/80 bg-[#fbf9f4]/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        {/* Brand Identity */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="size-8 rounded-lg bg-[#163b2e] flex items-center justify-center text-[#d7e780] shadow-xs group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 24 24" className="size-5 fill-current">
              <path d="M12 2a4 4 0 0 0-4 4c0 1.6 1 3 2.4 3.6A4 4 0 0 0 6.8 12 4 4 0 0 0 2 16a4 4 0 0 0 4 4c1.6 0 3-1 3.6-2.4A4 4 0 0 0 12 19.2a4 4 0 0 0 4 2.8 4 4 0 0 0 4-4c0-1.6-1-3-2.4-3.6A4 4 0 0 0 19.2 12 4 4 0 0 0 22 8a4 4 0 0 0-4-4c-1.6 0-3 1-3.6 2.4A4 4 0 0 0 12 2z" />
            </svg>
          </div>
          <span className="text-2xl font-bold tracking-tight text-[#163b2e] font-serif">
            langfly
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-[#58645b]">
          <a href="/#tasting-menu" className="hover:text-[#163b2e] transition-colors">
            Tasting Menu
          </a>
          <a href="/#pantry" className="hover:text-[#163b2e] transition-colors">
            Pantry Cards
          </a>
          <a href="/#chefs-table" className="hover:text-[#163b2e] transition-colors">
            Chef's Table
          </a>
          <Link to="/community" className="hover:text-[#163b2e] transition-colors">
            Community
          </Link>
          <Link to="/about" className="hover:text-[#163b2e] transition-colors">
            About
          </Link>
          <Link to="/blog" className="hover:text-[#163b2e] transition-colors">
            Blog
          </Link>
        </nav>

        {/* Action Controls & Mobile Trigger */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Button
                asChild
                className="text-xs sm:text-sm font-bold bg-[#163b2e] text-white hover:bg-[#22503f] px-4 py-2 h-auto rounded-full cursor-pointer shadow-xs"
              >
                <Link to="/dashboard">Go to Kitchen →</Link>
              </Button>
              <Button
                variant="ghost"
                onClick={() => setSignOutOpen(true)}
                className="text-xs font-semibold text-[#717a73] hover:text-[#d96b52] hover:bg-[#eae5da]/60 px-2.5 py-2 rounded-full cursor-pointer h-auto"
                title="Sign out"
              >
                <LogOut className="size-4" />
                <span className="hidden md:inline ml-1.5">Sign out</span>
              </Button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Button
                asChild
                variant="ghost"
                className="text-xs sm:text-sm font-bold text-[#163b2e] px-3 py-2 hover:bg-[#eae5da]/60 rounded-full"
              >
                <Link to="/login">Log in</Link>
              </Button>
              <Button
                asChild
                className="text-xs sm:text-sm font-bold bg-[#d7e780] text-[#163b2e] hover:bg-[#e4f38e] px-4 py-2 h-auto rounded-full cursor-pointer shadow-xs"
              >
                <Link to="/signup">Start free</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-[#163b2e] hover:bg-[#eae5da]/60 rounded-lg size-9 cursor-pointer"
                aria-label="Open Navigation Menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] bg-[#fbf9f4] p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-8">
                  <div className="size-8 rounded-lg bg-[#163b2e] flex items-center justify-center text-[#d7e780]">
                    <svg viewBox="0 0 24 24" className="size-5 fill-current">
                      <path d="M12 2a4 4 0 0 0-4 4c0 1.6 1 3 2.4 3.6A4 4 0 0 0 6.8 12 4 4 0 0 0 2 16a4 4 0 0 0 4 4c1.6 0 3-1 3.6-2.4A4 4 0 0 0 12 19.2a4 4 0 0 0 4 2.8 4 4 0 0 0 4-4c0-1.6-1-3-2.4-3.6A4 4 0 0 0 19.2 12 4 4 0 0 0 22 8a4 4 0 0 0-4-4c-1.6 0-3 1-3.6 2.4A4 4 0 0 0 12 2z" />
                    </svg>
                  </div>
                  <span className="text-2xl font-bold font-serif text-[#163b2e]">langfly</span>
                </div>

                <nav className="space-y-1">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    return link.href.startsWith("/#") ? (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[#3b473e] hover:bg-[#eae5da]/60 hover:text-[#163b2e] transition-colors"
                      >
                        <Icon className="size-4 text-[#717a73]" />
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.label}
                        to={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[#3b473e] hover:bg-[#eae5da]/60 hover:text-[#163b2e] transition-colors"
                      >
                        <Icon className="size-4 text-[#717a73]" />
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-6 border-t border-[#e8e4dc] space-y-2.5">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <Button
                      asChild
                      onClick={() => setMobileOpen(false)}
                      className="w-full bg-[#163b2e] text-white hover:bg-[#22503f] rounded-full font-bold h-11"
                    >
                      <Link to="/dashboard">
                        Go to Kitchen <ArrowRight className="size-4 ml-2" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setMobileOpen(false);
                        setSignOutOpen(true);
                      }}
                      className="w-full border-[#e8e4dc] text-[#d96b52] hover:bg-[#d96b52]/10 rounded-full font-bold h-11 cursor-pointer"
                    >
                      <LogOut className="size-4 mr-2" />
                      Sign out
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button
                      asChild
                      onClick={() => setMobileOpen(false)}
                      className="w-full bg-[#d7e780] text-[#163b2e] hover:bg-[#e4f38e] rounded-full font-bold h-11 shadow-xs"
                    >
                      <Link to="/signup">Start free pass</Link>
                    </Button>
                    <Button
                      asChild
                      onClick={() => setMobileOpen(false)}
                      variant="outline"
                      className="w-full border-[#e8e4dc] text-[#163b2e] hover:bg-[#eae5da]/60 rounded-full font-bold h-11"
                    >
                      <Link to="/login">Log in</Link>
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <SignOutDialog open={signOutOpen} onOpenChange={setSignOutOpen} />
    </header>
  );
}
