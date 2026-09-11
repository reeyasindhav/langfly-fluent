import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Langfly" },
      {
        name: "description",
        content:
          "Language learning tips, research-backed methods, and updates from the Langfly team.",
      },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const posts = [
    {
      slug: "spaced-repetition-science",
      title: "Why Spaced Repetition Works (And How to Use It)",
      excerpt:
        "The science behind the forgetting curve and how to build a review system that actually sticks.",
      date: "2026-08-15",
      readTime: "8 min read",
      category: "Science",
    },
    {
      slug: "speaking-confidence",
      title: "From Silent to Speaking: Building Confidence in 30 Days",
      excerpt:
        "A practical framework for overcoming the fear of speaking and making real progress.",
      date: "2026-07-28",
      readTime: "6 min read",
      category: "Speaking",
    },
    {
      slug: "vocabulary-retention",
      title: "The Vocabulary Retention Framework Used by Polyglots",
      excerpt: "How top language learners organize, review, and activate thousands of words.",
      date: "2026-07-10",
      readTime: "10 min read",
      category: "Method",
    },
    {
      slug: "language-learning-mistakes",
      title: "5 Mistakes That Kill Your Language Progress",
      excerpt: "Common traps that slow you down and how to avoid them.",
      date: "2026-06-22",
      readTime: "5 min read",
      category: "Tips",
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
            Langfly Blog
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#163b2e] font-serif leading-[1.1]">
            Research-backed language learning.
          </h1>
          <p className="mt-4 text-lg text-[#556157]">
            Tips, methods, and updates for learners who want to retain what they study.
          </p>
        </header>
        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group block rounded-xl border border-[#e8e4dc] bg-white p-6 hover:border-[#163b2e]/30 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-[#d7e780] text-[#163b2e]">
                  {post.category}
                </span>
                <span className="text-xs text-[#717a73]">{post.date}</span>
                <span className="text-xs text-[#717a73]">{post.readTime}</span>
              </div>
              <h2 className="text-xl font-bold text-[#163b2e] group-hover:underline transition-colors mb-2">
                {post.title}
              </h2>
              <p className="text-[#556157] line-clamp-2">{post.excerpt}</p>
              <div className="mt-4 flex items-center gap-2 text-sm text-[#717a73] group-hover:text-[#163b2e]">
                <MessageCircle className="size-4" />
                Read more
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button variant="outline" className="px-8 py-3 rounded-md">
            Load more posts
          </Button>
        </div>
      </section>
    </div>
  );
}
