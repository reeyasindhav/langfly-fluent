import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
import { ArrowLeft, Search, Mail, LifeBuoy, BookOpen, MessageCircle } from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help Center — Langfly" },
      { name: "description", content: "Find answers to common questions about using Langfly." },
    ],
  }),
  component: HelpPage,
});

function HelpPage() {
  const categories = [
    {
      title: "Getting Started",
      icon: BookOpen,
      articles: [
        "Creating your account",
        "Choosing your first language",
        "Understanding the roadmap",
        "Your first flashcard session",
      ],
    },
    {
      title: "Flashcards & Spaced Repetition",
      icon: LifeBuoy,
      articles: [
        "How spaced repetition works",
        "Rating cards: Again, Good, Easy",
        "Managing your review queue",
        "Customizing intervals",
      ],
    },
    {
      title: "Speaking Practice",
      icon: MessageCircle,
      articles: [
        "Booking your first session",
        "Preparing for a speaking session",
        "Technical requirements",
        "Cancellation & rescheduling",
      ],
    },
    {
      title: "Account & Billing",
      icon: Mail,
      articles: [
        "Updating your profile",
        "Subscription plans & pricing",
        "Cancelling your subscription",
        "Requesting a refund",
      ],
    },
  ];

  const popularArticles = [
    "Why am I seeing cards I already know?",
    "How do I reset my progress?",
    "Can I learn multiple languages at once?",
    "What happens if I miss a day?",
  ];

  return (
    <div className="min-h-screen bg-[#fbf9f4]">
      <SiteHeader />
      <section className="mx-auto max-w-4xl px-6 py-12 lg:py-16">
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
            Help Center
          </h1>
          <p className="mt-4 text-lg text-[#556157]">
            Find answers, learn the ropes, and get back to learning.
          </p>
        </header>
        <div className="mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#717a73] size-5" />
            <input
              type="search"
              placeholder="Search help articles..."
              className="w-full rounded-xl border border-[#e8e4dc] bg-white pl-12 pr-4 py-3 text-sm text-[#163b2e] placeholder:text-[#717a73] focus:outline-none focus:ring-2 focus:ring-[#163b2e]/20"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((cat, i) => (
            <Link
              key={i}
              to={`/help/${cat.title.toLowerCase().replace(/\s+/g, "-")}`}
              className="group block rounded-xl border border-[#e8e4dc] bg-white p-6 hover:border-[#163b2e]/30 hover:shadow-md transition-all"
            >
              <div className="size-10 rounded-lg bg-[#d7e780] flex items-center justify-center text-[#163b2e] mb-4 group-hover:bg-[#163b2e] group-hover:text-white transition-colors">
                <cat.icon className="size-5" />
              </div>
              <h3 className="font-semibold text-[#163b2e] mb-3">{cat.title}</h3>
              <ul className="space-y-2 text-sm text-[#556157]">
                {cat.articles.map((a, j) => (
                  <li key={j} className="group-hover:text-[#163b2e] transition-colors">
                    {a}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
        <div className="rounded-xl border border-[#e8e4dc] bg-white p-6">
          <h2 className="text-xl font-bold text-[#163b2e] mb-4">Popular This Week</h2>
          <ul className="space-y-3">
            {popularArticles.map((a, i) => (
              <Link
                key={i}
                to={`/help/${a.toLowerCase().replace(/\s+/g, "-")}`}
                className="flex items-center justify-between text-sm text-[#556157] hover:text-[#163b2e] transition-colors py-2 border-b border-[#e8e4dc]/50 last:border-0 group"
              >
                <span>{a}</span>
                <ArrowLeft className="size-4 text-[#717a73] group-hover:text-[#163b2e] group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </ul>
        </div>
        <div className="mt-12 text-center">
          <p className="text-[#556157] mb-4">Can't find what you're looking for?</p>
          <Button
            asChild
            className="bg-[#163b2e] text-white hover:bg-[#1e4e3c] px-8 py-3 rounded-md"
          >
            <Link to="/contact">Contact Support</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
