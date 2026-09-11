import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
import { ArrowLeft, Mail, Twitter, Github, Send } from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Langfly" },
      {
        name: "description",
        content: "Get in touch with the Langfly team. We'd love to hear from you.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
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
            Contact Us
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#163b2e] font-serif leading-[1.1]">
            We'd love to hear from you.
          </h1>
          <p className="mt-4 text-lg text-[#556157]">
            Questions, feedback, or just want to say hello? Reach out and we'll get back to you.
          </p>
        </header>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#163b2e]">Direct Contact</h2>
            <div className="space-y-4">
              <a
                href="mailto:hello@langfly.app"
                className="flex items-center gap-3 text-[#556157] hover:text-[#163b2e] transition-colors group"
              >
                <div className="size-10 rounded-lg bg-[#d7e780] flex items-center justify-center text-[#163b2e] group-hover:bg-[#163b2e] group-hover:text-white transition-colors">
                  <Mail className="size-5" />
                </div>
                <div>
                  <p className="font-medium text-[#163b2e]">hello@langfly.app</p>
                  <p className="text-sm text-[#717a73]">General inquiries & support</p>
                </div>
              </a>
              <a
                href="mailto:press@langfly.app"
                className="flex items-center gap-3 text-[#556157] hover:text-[#163b2e] transition-colors group"
              >
                <div className="size-10 rounded-lg bg-[#d7e780] flex items-center justify-center text-[#163b2e] group-hover:bg-[#163b2e] group-hover:text-white transition-colors">
                  <Mail className="size-5" />
                </div>
                <div>
                  <p className="font-medium text-[#163b2e]">press@langfly.app</p>
                  <p className="text-sm text-[#717a73]">Media & press inquiries</p>
                </div>
              </a>
              <a
                href="mailto:careers@langfly.app"
                className="flex items-center gap-3 text-[#556157] hover:text-[#163b2e] transition-colors group"
              >
                <div className="size-10 rounded-lg bg-[#d7e780] flex items-center justify-center text-[#163b2e] group-hover:bg-[#163b2e] group-hover:text-white transition-colors">
                  <Mail className="size-5" />
                </div>
                <div>
                  <p className="font-medium text-[#163b2e]">careers@langfly.app</p>
                  <p className="text-sm text-[#717a73]">Job applications & recruiting</p>
                </div>
              </a>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#163b2e]">Social</h2>
            <div className="space-y-4">
              <a
                href="https://twitter.com/langfly"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#556157] hover:text-[#163b2e] transition-colors group"
              >
                <div className="size-10 rounded-lg bg-[#d7e780] flex items-center justify-center text-[#163b2e] group-hover:bg-[#163b2e] group-hover:text-white transition-colors">
                  <Twitter className="size-5" />
                </div>
                <div>
                  <p className="font-medium text-[#163b2e]">@langfly</p>
                  <p className="text-sm text-[#717a73]">Updates, tips, and community</p>
                </div>
              </a>
              <a
                href="https://github.com/langfly"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#556157] hover:text-[#163b2e] transition-colors group"
              >
                <div className="size-10 rounded-lg bg-[#d7e780] flex items-center justify-center text-[#163b2e] group-hover:bg-[#163b2e] group-hover:text-white transition-colors">
                  <Github className="size-5" />
                </div>
                <div>
                  <p className="font-medium text-[#163b2e]">github.com/langfly</p>
                  <p className="text-sm text-[#717a73]">Open source & development</p>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-[#e8e4dc] bg-white p-8">
          <h2 className="text-xl font-bold text-[#163b2e] mb-6">Send us a message</h2>
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#163b2e] mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full rounded-md border border-[#e8e4dc] bg-white px-3 py-2 text-sm text-[#163b2e] placeholder:text-[#717a73] focus:outline-none focus:ring-2 focus:ring-[#163b2e]/20"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#163b2e] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full rounded-md border border-[#e8e4dc] bg-white px-3 py-2 text-sm text-[#163b2e] placeholder:text-[#717a73] focus:outline-none focus:ring-2 focus:ring-[#163b2e]/20"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-[#163b2e] mb-1">
                Subject
              </label>
              <select
                id="subject"
                className="w-full rounded-md border border-[#e8e4dc] bg-white px-3 py-2 text-sm text-[#163b2e] focus:outline-none focus:ring-2 focus:ring-[#163b2e]/20"
              >
                <option value="general">General inquiry</option>
                <option value="support">Technical support</option>
                <option value="press">Press & media</option>
                <option value="partnership">Partnership</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[#163b2e] mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full rounded-md border border-[#e8e4dc] bg-white px-3 py-2 text-sm text-[#163b2e] placeholder:text-[#717a73] focus:outline-none focus:ring-2 focus:ring-[#163b2e]/20 resize-none"
                placeholder="Tell us what's on your mind..."
              ></textarea>
            </div>
            <Button
              type="submit"
              className="w-full sm:w-auto bg-[#163b2e] text-white hover:bg-[#1e4e3c] px-8 py-3 rounded-md flex items-center gap-2"
            >
              <Send className="size-4" />
              Send message
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
