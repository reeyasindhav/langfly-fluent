import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
import { ArrowLeft, Briefcase, Users, MapPin, Heart, GraduationCap } from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Langfly" },
      {
        name: "description",
        content: "Join the Langfly team. We're building the future of language learning retention.",
      },
    ],
  }),
  component: CareersPage,
});

function CareersPage() {
  const roles = [
    {
      title: "Senior Frontend Engineer",
      type: "Full-time",
      location: "Remote (US/EU)",
      description: "Build delightful, performant React interfaces for our learning platform.",
      skills: ["React", "TypeScript", "TanStack", "Tailwind"],
    },
    {
      title: "Language Content Designer",
      type: "Contract",
      location: "Remote",
      description: "Design themed roadmaps and flashcard content for French, Spanish, and more.",
      skills: ["Curriculum Design", "CEFR", "Content Strategy"],
    },
    {
      title: "Growth Marketing Lead",
      type: "Full-time",
      location: "Remote (US)",
      description: "Drive learner acquisition and retention through content, SEO, and community.",
      skills: ["SEO", "Content Marketing", "Analytics", "Community"],
    },
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Learner-first culture",
      desc: "We optimize for retention, not engagement metrics.",
    },
    {
      icon: GraduationCap,
      title: "Continuous learning",
      desc: "Annual budget for courses, books, and language tutors.",
    },
    { icon: MapPin, title: "Remote-first", desc: "Work from anywhere with flexible hours." },
    {
      icon: Users,
      title: "Small team, big impact",
      desc: "Join early and shape the product direction.",
    },
    {
      icon: Briefcase,
      title: "Equity & benefits",
      desc: "Competitive salary, equity, and health coverage.",
    },
  ];

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
            Join the Team
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#163b2e] font-serif leading-[1.1]">
            Help millions remember what they learn.
          </h1>
          <p className="mt-4 text-lg text-[#556157]">
            We're a small team building tools that make language retention effortless. If you care
            about learning science and great product design, we'd love to hear from you.
          </p>
        </header>
        <div className="space-y-8 mb-16">
          <h2 className="text-2xl font-bold text-[#163b2e]">Open Roles</h2>
          <div className="space-y-4">
            {roles.map((role, i) => (
              <div
                key={i}
                className="rounded-xl border border-[#e8e4dc] bg-white p-6 hover:border-[#163b2e]/30 hover:shadow-md transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-[#163b2e]">{role.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-[#717a73]">
                      <span className="px-2 py-0.5 rounded bg-[#d7e780] text-[#163b2e] font-medium">
                        {role.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="size-3.5" />
                        {role.location}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-[#556157] mb-4">{role.description}</p>
                <div className="flex flex-wrap gap-2">
                  {role.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 rounded text-xs font-medium bg-[#f0ede6] text-[#163b2e]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-8 mb-16">
          <h2 className="text-2xl font-bold text-[#163b2e]">Why Langfly?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="rounded-xl border border-[#e8e4dc] bg-white p-6">
                <div className="size-10 rounded-lg bg-[#d7e780] flex items-center justify-center text-[#163b2e] mb-4">
                  <b.icon className="size-5" />
                </div>
                <h3 className="font-semibold text-[#163b2e] mb-2">{b.title}</h3>
                <p className="text-sm text-[#556157]">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center">
          <p className="text-[#556157] mb-4">
            Don't see a role that fits? We're always open to hearing from exceptional people.
          </p>
          <Button
            asChild
            className="bg-[#163b2e] text-white hover:bg-[#1e4e3c] px-8 py-3 rounded-md"
          >
            <Link to="/contact">Get in touch</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
