import { Link } from "@tanstack/react-router";
import { useAuth } from "../lib/auth-context";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { SignOutDialog } from "./SignOutDialog";

export function Footer() {
  const { isAuthenticated } = useAuth();
  const [signOutOpen, setSignOutOpen] = useState(false);

  const legalLinks = [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Policy" },
  ];

  return (
    <footer className="border-t border-[#e8e4dc] bg-[#fbf9f4]">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-10">
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="size-8 rounded-lg bg-[#163b2e] flex items-center justify-center text-[#d7e780] shadow-xs group-hover:scale-105 transition-transform">
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
            <p className="text-sm text-[#717a73] leading-relaxed max-w-sm">
              Ingredients for lasting conversational fluency. Spaced repetition pantry cards,
              tasting menu roadmaps, and real-time live tutor practice.
            </p>
            <div className="flex items-center gap-4 pt-1">
              <a
                href="https://twitter.com/langfly"
                className="text-[#717a73] hover:text-[#163b2e] transition-colors"
                aria-label="Twitter"
                target="_blank"
                rel="noreferrer"
              >
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              </a>
              <a
                href="https://github.com/langfly"
                className="text-[#717a73] hover:text-[#163b2e] transition-colors"
                aria-label="GitHub"
                target="_blank"
                rel="noreferrer"
              >
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.305-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="mailto:hello@langfly.app"
                className="text-[#717a73] hover:text-[#163b2e] transition-colors"
                aria-label="Email"
              >
                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 1: The Menu */}
          <div>
            <h3 className="font-semibold text-[#163b2e] mb-4 text-sm uppercase tracking-wider font-mono">
              The Menu
            </h3>
            <nav className="space-y-3">
              <a
                href="/#tasting-menu"
                className="text-sm text-[#717a73] hover:text-[#163b2e] transition-colors block"
              >
                Tasting Menu
              </a>
              <a
                href="/#pantry"
                className="text-sm text-[#717a73] hover:text-[#163b2e] transition-colors block"
              >
                Pantry Cards
              </a>
              <a
                href="/#chefs-table"
                className="text-sm text-[#717a73] hover:text-[#163b2e] transition-colors block"
              >
                Chef's Table
              </a>
              <Link
                to="/challenges"
                className="text-sm text-[#717a73] hover:text-[#163b2e] transition-colors block"
              >
                Kitchen Challenges
              </Link>
            </nav>
          </div>

          {/* Col 2: Company */}
          <div>
            <h3 className="font-semibold text-[#163b2e] mb-4 text-sm uppercase tracking-wider font-mono">
              Company
            </h3>
            <nav className="space-y-3">
              <Link
                to="/about"
                className="text-sm text-[#717a73] hover:text-[#163b2e] transition-colors block"
              >
                About Us
              </Link>
              <Link
                to="/blog"
                className="text-sm text-[#717a73] hover:text-[#163b2e] transition-colors block"
              >
                Blog
              </Link>
              <Link
                to="/careers"
                className="text-sm text-[#717a73] hover:text-[#163b2e] transition-colors block"
              >
                Careers
              </Link>
              <Link
                to="/contact"
                className="text-sm text-[#717a73] hover:text-[#163b2e] transition-colors block"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Col 3: Support */}
          <div>
            <h3 className="font-semibold text-[#163b2e] mb-4 text-sm uppercase tracking-wider font-mono">
              Support
            </h3>
            <nav className="space-y-3">
              <Link
                to="/help"
                className="text-sm text-[#717a73] hover:text-[#163b2e] transition-colors block"
              >
                Help Center
              </Link>
              <Link
                to="/faq"
                className="text-sm text-[#717a73] hover:text-[#163b2e] transition-colors block"
              >
                FAQ
              </Link>
              <Link
                to="/community"
                className="text-sm text-[#717a73] hover:text-[#163b2e] transition-colors block"
              >
                Community
              </Link>
              {isAuthenticated && (
                <button
                  type="button"
                  onClick={() => setSignOutOpen(true)}
                  className="flex items-center gap-2 text-sm text-[#717a73] hover:text-[#d96b52] transition-colors w-full text-left cursor-pointer"
                >
                  <LogOut className="size-4" />
                  Log out
                </button>
              )}
            </nav>
          </div>

          {/* Col 4: Legal */}
          <div>
            <h3 className="font-semibold text-[#163b2e] mb-4 text-sm uppercase tracking-wider font-mono">
              Legal
            </h3>
            <nav className="space-y-3">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm text-[#717a73] hover:text-[#163b2e] transition-colors block"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#e8e4dc] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#717a73]">
            &copy; {new Date().getFullYear()} Langfly. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-[#717a73]">
            <Link to="/privacy" className="hover:text-[#163b2e] transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-[#163b2e] transition-colors">
              Terms
            </Link>
            <Link to="/cookies" className="hover:text-[#163b2e] transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
      <SignOutDialog open={signOutOpen} onOpenChange={setSignOutOpen} />
    </footer>
  );
}
