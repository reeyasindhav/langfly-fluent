import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
import { ArrowLeft, FileText, Gavel, Shield } from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Langfly" },
      {
        name: "description",
        content: "Langfly's terms of service. Please read carefully before using our service.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="mt-4 text-sm text-[#717a73]">Last updated: {lastUpdated}</p>
        </header>
        <div className="prose prose-brand max-w-none space-y-8 text-[#3b473e]">
          <div className="rounded-xl border border-[#e8e4dc] bg-white p-6 mb-8">
            <p className="text-sm text-[#556157]">
              By accessing or using Langfly, you agree to these terms. Please read them carefully.
            </p>
          </div>
          <section>
            <h2 className="text-xl font-bold text-[#163b2e] mb-4 flex items-center gap-2">
              <FileText className="size-5" /> 1. Acceptance of Terms
            </h2>
            <p className="text-[#556157] mb-3">
              By creating an account or using Langfly, you agree to be bound by these Terms of
              Service and our Privacy Policy. If you disagree with any part, you may not use the
              service.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[#163b2e] mb-4 flex items-center gap-2">
              <Shield className="size-5" /> 2. Account Responsibilities
            </h2>
            <ul className="space-y-3 pl-6 list-disc">
              <li>
                You are responsible for maintaining the security of your account and password.
              </li>
              <li>You must be at least 13 years old to use Langfly.</li>
              <li>You agree to provide accurate information and update it as needed.</li>
              <li>You are responsible for all activity under your account.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[#163b2e] mb-4 flex items-center gap-2">
              <Gavel className="size-5" /> 3. Acceptable Use
            </h2>
            <p className="text-[#556157] mb-3">You may not use Langfly to:</p>
            <ul className="space-y-2 pl-6 list-disc">
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Attempt to gain unauthorized access to systems or data</li>
              <li>Scrape, crawl, or extract data programmatically</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[#163b2e] mb-4">4. Subscriptions & Billing</h2>
            <p className="text-[#556157] mb-3">
              Paid plans auto-renew unless cancelled. Refunds are handled per our refund policy.
              Prices may change with 30 days' notice.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[#163b2e] mb-4">5. Intellectual Property</h2>
            <p className="text-[#556157] mb-3">
              Langfly's content, software, and trademarks are our property. User-generated content
              (your flashcards, notes) remains yours.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[#163b2e] mb-4">
              6. Disclaimers & Limitation of Liability
            </h2>
            <p className="text-[#556157] mb-3">
              Langfly is provided "as is" without warranties. We are not liable for indirect,
              incidental, or consequential damages. Our total liability is limited to the amount you
              paid in the last 12 months.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[#163b2e] mb-4">7. Termination</h2>
            <p className="text-[#556157] mb-3">
              We may suspend or terminate access for violations. You may delete your account at any
              time.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[#163b2e] mb-4">8. Contact</h2>
            <p className="text-[#556157]">
              Questions? Email{" "}
              <a href="mailto:legal@langfly.app" className="underline hover:text-[#163b2e]">
                legal@langfly.app
              </a>
              .
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
