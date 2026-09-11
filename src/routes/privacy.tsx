import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
import { ArrowLeft, Shield, FileText, Gavel } from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Langfly" },
      {
        name: "description",
        content: "Langfly's privacy policy. We take your data privacy seriously.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const lastUpdated = "September 11, 2026";

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
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-[#717a73]">Last updated: {lastUpdated}</p>
        </header>
        <div className="prose prose-brand max-w-none space-y-8 text-[#3b473e]">
          <div className="rounded-xl border border-[#e8e4dc] bg-white p-6 mb-8">
            <p className="text-sm text-[#556157]">
              At Langfly, we believe privacy is a fundamental right. This policy explains what data
              we collect, why we collect it, and how you can control it.
            </p>
          </div>
          <section>
            <h2 className="text-xl font-bold text-[#163b2e] mb-4 flex items-center gap-2">
              <Shield className="size-5" /> 1. Data We Collect
            </h2>
            <ul className="space-y-3 pl-6 list-disc">
              <li>
                <strong>Account data:</strong> Email, name, language preferences, and learning level
                when you create an account.
              </li>
              <li>
                <strong>Learning data:</strong> Progress, flashcard reviews, challenge completions,
                and speaking session bookings.
              </li>
              <li>
                <strong>Usage data:</strong> Anonymous analytics on feature usage, session duration,
                and error logs (no personal identifiers).
              </li>
              <li>
                <strong>Communication:</strong> Messages you send to support, feedback, or survey
                responses.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[#163b2e] mb-4 flex items-center gap-2">
              <FileText className="size-5" /> 2. How We Use Your Data
            </h2>
            <ul className="space-y-3 pl-6 list-disc">
              <li>
                To provide and personalize the learning experience (spaced repetition scheduling,
                roadmap progress).
              </li>
              <li>To enable speaking practice bookings and tutor matching.</li>
              <li>To send important account notifications (security, billing, feature updates).</li>
              <li>To improve the product through anonymous, aggregated analytics.</li>
              <li>
                We do <strong>not</strong> sell your data or use it for advertising.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[#163b2e] mb-4 flex items-center gap-2">
              <Gavel className="size-5" /> 3. Your Rights
            </h2>
            <ul className="space-y-3 pl-6 list-disc">
              <li>
                Access, correct, or delete your personal data at any time via account settings.
              </li>
              <li>Export all your learning data in a portable format.</li>
              <li>Opt out of non-essential communications.</li>
              <li>Request deletion of your account and all associated data.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[#163b2e] mb-4">4. Data Storage & Security</h2>
            <p className="text-[#556157] mb-3">
              Data is stored on secure, SOC 2 compliant cloud infrastructure. We use encryption in
              transit (TLS 1.3) and at rest (AES-256). Access is limited to authorized personnel
              only.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[#163b2e] mb-4">5. Contact</h2>
            <p className="text-[#556157]">
              Questions about this policy? Email{" "}
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
