import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
import { ArrowLeft, ChevronDown, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { SiteHeader } from "../components/SiteHeader";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Langfly" },
      {
        name: "description",
        content: "Frequently asked questions about Langfly language learning platform.",
      },
    ],
  }),
  component: FAQPage,
});

function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does spaced repetition work in Langfly?",
      a: 'Langfly uses a proven algorithm (SM-2 variant) that schedules reviews at optimal intervals. When you rate a card "Again", "Good", or "Easy", the system calculates the next review time to maximize retention with minimum effort.',
    },
    {
      q: "Can I learn multiple languages at once?",
      a: "Yes! You can add multiple languages to your account. Each language has its own roadmap, flashcards, and progress tracking. Switch between them from your profile or the language selector in the top bar.",
    },
    {
      q: "What happens if I miss a day of reviews?",
      a: "No problem. Your cards will simply be due when you return. The algorithm adjusts intervals based on actual review times, so a missed day just means a slightly larger review queue next session.",
    },
    {
      q: "How do speaking practice sessions work?",
      a: "Browse available tutors in the Practice section, select a time slot, and book. Sessions are 25 or 50 minutes via video call. You'll receive a calendar invite and reminder. Tutors are native speakers vetted by our team.",
    },
    {
      q: "Can I use Langfly offline?",
      a: "Currently, Langfly requires an internet connection for spaced repetition sync and speaking sessions. Offline flashcard review is on our roadmap.",
    },
    {
      q: "Is there a free trial?",
      a: "Yes. All new accounts get 14 days of full access (unlimited flashcards, roadmaps, and 2 speaking sessions). After the trial, you can continue with a free tier (limited daily reviews) or upgrade.",
    },
    {
      q: "How do I cancel my subscription?",
      a: "Go to Settings → Subscription → Cancel. You'll keep access until the end of your billing period. No questions asked, and you can resubscribe anytime.",
    },
    {
      q: "What languages are available?",
      a: "Currently: French, Spanish, Italian, German, Japanese, Korean, Portuguese, and Mandarin. More languages are added based on demand. Request a language via the contact form!",
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
            Support
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#163b2e] font-serif leading-[1.1]">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-[#556157]">Quick answers to common questions.</p>
        </header>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl border border-[#e8e4dc] bg-white overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-medium text-[#163b2e] pr-4">{faq.q}</span>
                <ChevronDown
                  className={`size-5 text-[#717a73] transition-transform shrink-0 ${openIndex === i ? "rotate-180" : ""}`}
                />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6 border-t border-[#e8e4dc] animate-fade-in">
                  <p className="text-[#556157] leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-[#556157] mb-4">Still have questions?</p>
          <Button
            asChild
            className="bg-[#163b2e] text-white hover:bg-[#1e4e3c] px-8 py-3 rounded-md"
          >
            <Link to="/contact">Ask Us Directly</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
