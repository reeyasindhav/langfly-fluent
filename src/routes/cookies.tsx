import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
import { ArrowLeft, Cookie, Eye, Database, Zap, Shield } from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — Langfly" },
      {
        name: "description",
        content: "Langfly's cookie policy. Learn how we use cookies and similar technologies.",
      },
    ],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  const lastUpdated = "September 11, 2026";

  const cookieCategories = [
    {
      name: "Essential",
      icon: Shield,
      description: "Required for the site to function. Cannot be disabled.",
      cookies: [
        { name: "session", purpose: "Keeps you logged in securely" },
        { name: "csrf_token", purpose: "Prevents cross-site request forgery" },
        { name: "auth_token", purpose: "Manages authentication state" },
      ],
    },
    {
      name: "Analytics",
      icon: Database,
      description: "Helps us understand how visitors use the site.",
      cookies: [
        { name: "ga_*", purpose: "Google Analytics - anonymous usage stats" },
        { name: "plausible_*", purpose: "Privacy-friendly analytics alternative" },
      ],
    },
    {
      name: "Preferences",
      icon: Eye,
      description: "Remembers your settings for a better experience.",
      cookies: [
        { name: "theme", purpose: "Light/dark mode preference" },
        { name: "language", purpose: "Selected learning language" },
        { name: "dismissed_banners", purpose: "Remembers dismissed notifications" },
      ],
    },
    {
      name: "Marketing",
      icon: Zap,
      description: "Used to measure marketing effectiveness (optional).",
      cookies: [
        { name: "utm_*", purpose: "Tracks referral sources" },
        { name: "conversion_*", purpose: "Measures signup conversions" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#fbf9f4]">
      <SiteHeader />
      <section className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-[#717a73] hover:text-[#163b2e] transition-colors mb-8"
        >
          <ArrowLeft className="size-4" />
          Back to home
        </Link>
        <header className="mb-12 animate-fade-up">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#d96b52] mb-4">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#163b2e] font-serif leading-[1.1]">
            Cookie Policy
          </h1>
          <p className="mt-4 text-sm text-[#717a73]">Last updated: {lastUpdated}</p>
        </header>
        <div className="prose prose-brand max-w-none space-y-8 text-[#3b473e]">
          <div className="rounded-xl border border-[#e8e4dc] bg-white p-6 mb-8">
            <p className="text-sm text-[#556157]">
              This policy explains how Langfly uses cookies and similar technologies. You can manage
              preferences at any time.
            </p>
          </div>
          <section>
            <h2 className="text-xl font-bold text-[#163b2e] mb-4">What Are Cookies?</h2>
            <p className="text-[#556157] mb-3">
              Cookies are small text files stored on your device when you visit a website. They help
              the site remember your preferences and improve your experience.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[#163b2e] mb-4">Cookie Categories</h2>
            <div className="space-y-6">
              {cookieCategories.map((cat, i) => (
                <div key={i} className="rounded-xl border border-[#e8e4dc] bg-white p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="size-10 rounded-lg bg-[#d7e780] flex items-center justify-center text-[#163b2e] shrink-0">
                      <cat.icon className="size-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-[#163b2e]">{cat.name}</h3>
                        {cat.name === "Essential" && (
                          <span className="px-2 py-0.5 rounded text-xs font-bold bg-[#163b2e] text-[#d7e780]">
                            Always active
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[#556157]">{cat.description}</p>
                    </div>
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#e8e4dc] text-left text-[#717a73]">
                        <th className="pb-2 font-medium text-[#163b2e]">Cookie Name</th>
                        <th className="pb-2 font-medium text-[#163b2e]">Purpose</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cat.cookies.map((c, j) => (
                        <tr key={j} className="border-b border-[#e8e4dc]/50 last:border-0">
                          <td className="py-2 font-mono text-[#163b2e]">{c.name}</td>
                          <td className="py-2 text-[#556157]">{c.purpose}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[#163b2e] mb-4">Managing Cookies</h2>
            <p className="text-[#556157] mb-3">
              You can control cookies through your browser settings. Disabling essential cookies
              will break site functionality.
            </p>
            <ul className="space-y-2 pl-6 list-disc text-[#556157]">
              <li>Chrome: Settings → Privacy → Cookies</li>
              <li>Firefox: Options → Privacy → Cookies</li>
              <li>Safari: Preferences → Privacy → Cookies</li>
              <li>Edge: Settings → Cookies → Site permissions</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[#163b2e] mb-4">Contact</h2>
            <p className="text-[#556157]">
              Questions? Email{" "}
              <a href="mailto:privacy@langfly.app" className="underline hover:text-[#163b2e]">
                privacy@langfly.app
              </a>
              .
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
