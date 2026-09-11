import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
import { ArrowLeft, ArrowRight, Star, Github, Hash, MessageCircle, Heart } from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — Langfly" },
      {
        name: "description",
        content:
          "Join the Langfly community. Connect with other learners, share tips, and stay motivated.",
      },
    ],
  }),
  component: CommunityPage,
});

function CommunityPage() {
  const stats = [
    { label: "Active Learners", value: "12,000+" },
    { label: "Languages Spoken", value: "50+" },
    { label: "Weekly Sessions", value: "3,400+" },
    { label: "Helpful Answers", value: "98%" },
  ];

  const channels = [
    {
      icon: Hash,
      tag: "Live Chat & Voice",
      title: "Discord Server",
      desc: "Real-time chat, study groups, voice practice rooms, and weekly events.",
      cta: "Join Discord",
      href: "https://discord.gg/langfly",
      iconBg: "bg-[#5865F2]/10 text-[#5865F2]",
    },
    {
      icon: Github,
      tag: "Open Source",
      title: "GitHub Discussions",
      desc: "Feature requests, bug reports, and technical discussions for contributors.",
      cta: "View Discussions",
      href: "https://github.com/langfly/discussions",
      iconBg: "bg-[#163b2e]/10 text-[#163b2e]",
    },
    {
      icon: MessageCircle,
      tag: "Group Practice",
      title: "Speaking Circles",
      desc: "Free group practice sessions every Tuesday & Thursday. All levels welcome.",
      cta: "Explore Practice",
      href: "/practice",
      iconBg: "bg-[#d96b52]/10 text-[#d96b52]",
    },
  ];

  const testimonials = [
    {
      quote:
        "The Discord study groups kept me accountable when motivation dipped. Found my current speaking partner there!",
      author: "Marie L.",
      meta: "French · 8 months learning",
    },
    {
      quote:
        "Asked a grammar question on GitHub Discussions and got a detailed answer from the team within hours.",
      author: "Kenji T.",
      meta: "Japanese · 3 months learning",
    },
    {
      quote:
        "The weekly speaking circles are low-pressure and fun. Perfect for shaking off rust before a live tutor session.",
      author: "Sofia R.",
      meta: "Spanish · 11 months learning",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fbf9f4] text-[#163b2e]">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-6 py-12 lg:py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#717a73] hover:text-[#163b2e] transition-colors mb-8 group"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
          Back to home
        </Link>

        {/* Hero Header */}
        <header className="mb-14 animate-fade-up text-center max-w-2xl mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#d96b52] font-bold mb-3">
            COMMUNITY & CONNECTIONS
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#163b2e] font-serif leading-[1.12]">
            Learn together. Stay motivated.
          </h1>
          <p className="mt-4 text-base md:text-lg text-[#556157] leading-relaxed">
            Language learning thrives in good company. Join thousands of culinary language learners
            sharing active recipes, tips, and weekly conversation practice.
          </p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {stats.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[#e8e4dc] bg-white p-5 sm:p-6 text-center hover:border-[#163b2e]/30 hover:shadow-xs transition-all"
            >
              <p className="text-3xl md:text-4xl font-bold text-[#163b2e] font-serif">{s.value}</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-[#717a73] font-semibold">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Where We Hang Out - Channel Cards */}
        <section className="mb-16">
          <div className="text-center max-w-md mx-auto mb-10">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#717a73] font-bold">
              JOIN THE CONVERSATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#163b2e] font-serif mt-1">
              Where We Hang Out
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {channels.map((c, i) => (
              <Link
                key={i}
                to={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex flex-col justify-between rounded-2xl border border-[#e8e4dc] bg-white p-6 sm:p-7 hover:border-[#163b2e]/30 hover:shadow-md transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`size-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 ${c.iconBg}`}
                    >
                      <c.icon className="size-6" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#f4f0e8] text-[#717a73] font-semibold">
                      {c.tag}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#163b2e] mb-2 group-hover:underline">
                    {c.title}
                  </h3>
                  <p className="text-sm text-[#556157] leading-relaxed mb-6">{c.desc}</p>
                </div>

                <div className="pt-4 border-t border-[#e8e4dc]/70 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#163b2e] group-hover:text-[#d96b52] transition-colors">
                    {c.cta}
                  </span>
                  <div className="size-7 rounded-full bg-[#f4f0e8] group-hover:bg-[#d7e780] flex items-center justify-center text-[#163b2e] transition-colors">
                    <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* What Learners Say - Testimonial Cards */}
        <section className="mb-16">
          <div className="text-center max-w-md mx-auto mb-10">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#717a73] font-bold">
              LEARNER EXPERIENCES
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#163b2e] font-serif mt-1">
              What Learners Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="flex flex-col justify-between rounded-2xl border border-[#e8e4dc] bg-white p-6 sm:p-7 hover:border-[#163b2e]/30 hover:shadow-xs transition-all"
              >
                <div>
                  <div className="flex items-center gap-1 mb-4 text-[#e07a5f]">
                    {[...Array(5)].map((_, starIdx) => (
                      <Star key={starIdx} className="size-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-[#3b473e] text-sm leading-relaxed mb-6 italic">
                    "{t.quote}"
                  </blockquote>
                </div>
                <div className="pt-4 border-t border-[#e8e4dc]/70">
                  <p className="font-bold text-sm text-[#163b2e]">{t.author}</p>
                  <p className="font-mono text-[11px] text-[#717a73] mt-0.5">{t.meta}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Banner */}
        <div className="rounded-3xl bg-[#183d2c] text-white p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-md">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#d7e780] font-bold">
            READY TO TASTE FLUENCY?
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white mt-2 mb-3">
            Pull up a chair at our table.
          </h2>
          <p className="text-sm text-white/80 max-w-lg mx-auto mb-8 leading-relaxed">
            Create your free account today and start reviewing spaced repetition cards, booking live
            practice sessions, and connecting with other learners.
          </p>
          <Button
            asChild
            className="bg-[#d7e780] text-[#163b2e] hover:bg-[#e4f38e] font-bold rounded-full px-8 py-3.5 h-auto text-sm shadow-xs cursor-pointer"
          >
            <Link to="/signup">
              Start Free Pass <ArrowRight className="size-4 ml-1.5 inline" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
