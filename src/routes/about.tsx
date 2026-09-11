import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Langfly" },
      {
        name: "description",
        content:
          "Learn about Langfly's mission to help language learners retain vocabulary and speak with confidence.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fbf9f4]">
      <SiteHeader />
      <section className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-[#717a73] hover:text-[#163b2e] transition-colors mb-8"
        >
          <ArrowLeft className="size-4" />
          Back to home
        </Link>
        <header className="mb-12 animate-fade-up">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#d96b52] mb-4">
            About Langfly
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#163b2e] font-serif leading-[1.1]">
            Helping you speak a language you actually remember.
          </h1>
        </header>
        <div className="prose prose-brand max-w-none space-y-8 text-[#3b473e]">
          <p className="text-lg leading-relaxed">
            Most language apps optimize for engagement. Langfly optimizes for{" "}
            <strong className="text-[#163b2e]">retention</strong>.
          </p>
          <p className="leading-relaxed">
            We built Langfly because we were tired of forgetting what we studied. Spaced repetition
            is the most effective way to memorize vocabulary, but existing tools feel like clinical
            software. Speaking practice is essential, but finding tutors is a hassle.
          </p>
          <p className="leading-relaxed">
            Langfly pairs <strong className="text-[#163b2e]">spaced flashcards</strong> with{" "}
            <strong className="text-[#163b2e]">live speaking practice</strong> so new words stick
            and your confidence finally follows.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <div className="rounded-xl border border-[#e8e4dc] bg-white p-6 hover-lift">
              <h3 className="font-semibold text-[#163b2e] mb-3">Our approach</h3>
              <ul className="space-y-2 text-sm text-[#556157]">
                <li className="flex items-center gap-2">✓ Spaced repetition that adapts to you</li>
                <li className="flex items-center gap-2">
                  ✓ Themed roadmaps with clear progression
                </li>
                <li className="flex items-center gap-2">✓ Daily challenges for momentum</li>
                <li className="flex items-center gap-2">
                  ✓ Live tutors when you're ready to speak
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-[#e8e4dc] bg-white p-6 hover-lift">
              <h3 className="font-semibold text-[#163b2e] mb-3">Our values</h3>
              <ul className="space-y-2 text-sm text-[#556157]">
                <li className="flex items-center gap-2">✓ Retention over gamification</li>
                <li className="flex items-center gap-2">✓ Quality over quantity</li>
                <li className="flex items-center gap-2">✓ Learner autonomy</li>
                <li className="flex items-center gap-2">✓ Privacy by design</li>
              </ul>
            </div>
          </div>
          <p className="mt-12 text-center text-[#717a73]">
            Join thousands of learners who finally stopped forgetting what they studied.
          </p>
          <div className="mt-6 text-center">
            <Button
              asChild
              className="bg-[#163b2e] text-white hover:bg-[#1e4e3c] px-8 py-3 rounded-md"
            >
              <Link to="/signup">Start free</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
