import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "../components/SiteHeader";
import { Button } from "../components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Share2,
  Bookmark,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { useState } from "react";

interface BlogPostData {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatarInitials: string;
  };
  content: {
    intro: string;
    keyTakeaways: string[];
    sections: {
      heading: string;
      body: string[];
    }[];
    conclusion: string;
  };
}

const blogDatabase: Record<string, BlogPostData> = {
  "spaced-repetition-science": {
    slug: "spaced-repetition-science",
    title: "Why Spaced Repetition Works (And How to Use It)",
    excerpt:
      "The science behind the forgetting curve and how to build a review system that actually sticks.",
    date: "August 15, 2026",
    readTime: "8 min read",
    category: "Science",
    author: {
      name: "Dr. Élodie Martin",
      role: "Cognitive Linguist & Head of Research at Langfly",
      avatarInitials: "EM",
    },
    content: {
      intro:
        "In 1885, German psychologist Hermann Ebbinghaus conducted a series of groundbreaking experiments on his own memory. He discovered that without active reinforcement, human memory rapidly deteriorates: nearly 50% of new information is forgotten within an hour, and over 70% is lost after 24 hours. This mathematical decay is known as the Ebbinghaus Forgetting Curve.",
      keyTakeaways: [
        "Memory decay is non-linear; the steepest loss occurs immediately after learning.",
        "Reviewing an item just before the forgetting threshold drastically increases retention duration.",
        "Active recall (testing yourself) produces 300% greater synaptic consolidation than passive rereading.",
        "Spaced intervals allow you to maintain 10,000+ words in under 15 minutes of daily practice.",
      ],
      sections: [
        {
          heading: "1. The Mechanics of the Spacing Effect",
          body: [
            "Every time you recall a word or phrase from memory, you don't merely retrieve a static file—you actively reconsolidate and restructure the neural pathway. This biological phenomenon, known as long-term potentiation (LTP), strengthens the synaptic connections between neurons.",
            "When reviews are spaced out over increasing intervals (e.g., 1 day, 3 days, 8 days, 21 days, 60 days), each retrieval requires slightly more mental effort. Paradoxically, this desirable difficulty signals to your brain that the information is vital for survival, anchoring it into permanent semantic memory.",
          ],
        },
        {
          heading: "2. The Flaw of Traditional Cramming",
          body: [
            "Most language students prepare for exams or travel by cramming 100 vocabulary words the night before. While working memory can temporarily hold these terms, they fail to transition into long-term memory.",
            "Within 48 hours without reinforcement, up to 80% of crammed vocabulary evaporates. In contrast, reviewing just 15 flashcards distributed over several weeks ensures near-permanent retention with 90% less cumulative time invested.",
          ],
        },
        {
          heading: "3. How Langfly's Pantry System Implements the Science",
          body: [
            "Langfly utilizes an adaptive spaced repetition algorithm inspired by the SuperMemo SM-2 and Leitner models, tailored specifically for conversational language acquisition.",
            "Instead of abstract dictionary terms, Langfly serves bite-sized 'recipe ingredients' accompanied by native audio pronunciation and natural bistro dialogues. When you rate a card as 'Again', 'Good', or 'Easy', the system calculates the optimal millisecond to reintroduce the card into your daily pantry queue.",
          ],
        },
      ],
      conclusion:
        "Spaced repetition is not a shortcut—it is simply the most neurobiologically efficient method to learn anything. By dedicating 10 focused minutes every morning to your Langfly pantry deck, you can retain thousands of conversational expressions permanently.",
    },
  },
  "speaking-confidence": {
    slug: "speaking-confidence",
    title: "From Silent to Speaking: Building Confidence in 30 Days",
    excerpt: "A practical framework for overcoming the fear of speaking and making real progress.",
    date: "July 28, 2026",
    readTime: "6 min read",
    category: "Speaking",
    author: {
      name: "Marcus Vance",
      role: "Lead Conversational Coach",
      avatarInitials: "MV",
    },
    content: {
      intro:
        "The single biggest bottleneck language learners encounter is not vocabulary or grammar—it is the paralyzing fear of opening their mouth and looking foolish. Renowned linguist Stephen Krashen termed this the 'Affective Filter': when emotional anxiety is high, spoken fluency drops to near zero.",
      keyTakeaways: [
        "Language anxiety is normal and experienced by over 85% of adult learners.",
        "Speaking fluency is a motor skill that requires muscle memory, not just intellectual knowledge.",
        "Short, frequent low-stakes conversations eliminate performance anxiety faster than intensive classes.",
        "Praising communicative success over grammatical perfection accelerates progress.",
      ],
      sections: [
        {
          heading: "1. Lowering the Affective Filter",
          body: [
            "When you speak to a native speaker, your brain's amygdala frequently interprets the social risk of making an error as a threat. Blood flow diverts from prefrontal language centers, causing your mind to go blank.",
            "The remedy is desensitization through micro-exposure: starting with 10-to-15 minute low-stakes friendly conversations with patient conversation partners who focus on meaning rather than red-pen corrections.",
          ],
        },
        {
          heading: "2. The 'Scripting' Technique for Immediate Fluidity",
          body: [
            "Before entering a live session, master 3 to 5 conversational anchors. Rather than worrying about infinite sentence permutations, have go-to phrases for pausing, asking for clarification, and buying thinking time (such as 'C'est une bonne question, laissez-moi réfléchir' or '¿Cómo se dice...?').",
            "These conversational lubricants bridge gaps seamlessly and keep the conversational rhythm natural.",
          ],
        },
        {
          heading: "3. The 30-Day Progressive Challenge",
          body: [
            "Week 1: Shadow native audio aloud in private for 5 minutes daily to tune vocal cords and facial muscles.",
            "Week 2: Record 30-second voice notes describing your day and listen back without judgment.",
            "Week 3: Book your first 15-minute Chef's Table session with a friendly tutor to practice basic café and market scenarios.",
            "Week 4: Engage in a freeform 15-minute discussion about hobbies, favorite dishes, and travel plans.",
          ],
        },
      ],
      conclusion:
        "Fluency is not about never making mistakes; it is about communicating comfortably despite them. Give yourself permission to speak imperfectly today so that you can speak effortlessly tomorrow.",
    },
  },
  "vocabulary-retention": {
    slug: "vocabulary-retention",
    title: "The Vocabulary Retention Framework Used by Polyglots",
    excerpt: "How top language learners organize, review, and activate thousands of words.",
    date: "July 10, 2026",
    readTime: "10 min read",
    category: "Method",
    author: {
      name: "Camille Dubois",
      role: "Polyglot & Curriculum Architect",
      avatarInitials: "CD",
    },
    content: {
      intro:
        "Polyglots who speak 5, 8, or 12 languages do not possess superhuman brains. Instead, they treat vocabulary like a gourmet pantry: every ingredient is carefully sourced, stored systematically, and cooked into real meals rather than left on sterile display shelves.",
      keyTakeaways: [
        "Learn words in contextual collocations, never as isolated dictionary definitions.",
        "Anchor abstract words with sensory imagery and personal anecdotes.",
        "Prioritize the high-frequency core: 1,000 words account for 85% of spoken dialogue.",
        "Active production must follow within 24 hours of passive recognition.",
      ],
      sections: [
        {
          heading: "1. The Three Tiers of Culinary Vocabulary",
          body: [
            "Tier 1 — Base Stock (The Core 500): The structural verbs, pronouns, question words, and spatial connectors that form 70% of any conversation.",
            "Tier 2 — Fresh Produce (Topic Clusters): Contextual clusters around dining, navigating cities, expressing emotions, and negotiating.",
            "Tier 3 — Specialty Seasoning (Idioms & Nuances): Colloquial turns of phrase and cultural sayings that give your speech authentic flavor.",
          ],
        },
        {
          heading: "2. The Danger of Translation Chaining",
          body: [
            "If every time you see 'le croissant' you mentally translate it into the English word 'croissant' before visualizing the pastry, your conversational latency will always be sluggish.",
            "Polyglots bypass translation by linking the target language word directly to sensory imagery: the buttery smell, the golden flaky crust, and the morning café terrace. This creates a direct neural bridge between the language and reality.",
          ],
        },
        {
          heading: "3. From Passive Recognition to Spoken Production",
          body: [
            "There is a massive cognitive divide between recognizing a word when listening to a podcast and effortlessly producing it mid-sentence during dinner.",
            "To bridge this divide, Langfly pairs our spaced repetition pantry cards with live speaking checkpoints. Every card you master is immediately woven into your next tutor session.",
          ],
        },
      ],
      conclusion:
        "Build your pantry systematically with words you genuinely desire to use. High-value vocabulary, reviewed on an automated schedule, is the fastest vehicle to genuine fluency.",
    },
  },
  "language-learning-mistakes": {
    slug: "language-learning-mistakes",
    title: "5 Mistakes That Kill Your Language Progress",
    excerpt: "Common traps that slow you down and how to avoid them.",
    date: "June 22, 2026",
    readTime: "5 min read",
    category: "Tips",
    author: {
      name: "Alexandre Moreau",
      role: "Langfly Co-Founder",
      avatarInitials: "AM",
    },
    content: {
      intro:
        "Over 90% of people who embark on learning a new language give up within their first four months. It is rarely due to a lack of motivation or intelligence. In almost every instance, learners fall prey to preventable pedagogical mistakes that drain their momentum.",
      keyTakeaways: [
        "Mistake 1: Passive consumption mistaken for active acquisition.",
        "Mistake 2: The 'Grammar First' trap that delays actual speaking.",
        "Mistake 3: Accumulating giant word lists that are never reviewed.",
        "Mistake 4: Perfectionism and performance anxiety.",
        "Mistake 5: Sporadic 3-hour marathon study sessions instead of daily 15-minute consistency.",
      ],
      sections: [
        {
          heading: "1. Mistake #1: The Passive Illusion",
          body: [
            "Watching television shows with subtitles or swiping through multiple-choice games feels effortless, but generates minimal neural retention. Recognition memory is fundamentally different from production memory.",
            "Fix: Always engage in active recall. Close your eyes, formulate the sentence in your mind, and speak it aloud before looking at the answer.",
          ],
        },
        {
          heading: "2. Mistake #2: Waiting Until You Are 'Ready' to Speak",
          body: [
            "Nobody learns to play tennis by reading a manual for six months before touching a racket. You will never feel 100% prepared to speak a foreign language.",
            "Fix: Speak from week two. Begin with 10-minute simulated café orders and simple questions. The sooner you normalize making minor mistakes, the sooner fluency arrives.",
          ],
        },
        {
          heading: "3. Mistake #3: Marathon Sessions vs. Daily Consistency",
          body: [
            "Studying for 4 hours on Sunday afternoon yields far worse results than practicing for 15 minutes each morning. Neural consolidation relies on sleep cycles and spaced recall to transfer facts into permanent memory.",
            "Fix: Protect a non-negotiable 15-minute daily habit. Your brain will thank you.",
          ],
        },
      ],
      conclusion:
        "Language learning is a daily culinary craft, not an academic exam. Avoid these common traps, prioritize consistency over perfection, and savor the process of discovering a new voice.",
    },
  },
};

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = blogDatabase[params.slug];
    const title = post ? `${post.title} — Langfly Blog` : "Blog Post — Langfly";
    const description = post
      ? post.excerpt
      : "Read insightful language learning articles on Langfly.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { slug } = Route.useParams();
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const post = blogDatabase[slug];

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-[#fbf9f4]">
        <SiteHeader />
        <main className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-[#d96b52] font-bold mb-3">
            Article Not Found
          </p>
          <h1 className="text-4xl font-bold font-serif text-[#163b2e] mb-4">
            Recipe not in our kitchen
          </h1>
          <p className="text-[#556157] text-base mb-8 max-w-md mx-auto">
            The blog article you are looking for doesn't exist or has been relocated to another
            section.
          </p>
          <Button
            asChild
            className="bg-[#163b2e] text-white hover:bg-[#22503f] rounded-full px-6 py-2.5"
          >
            <Link to="/blog">
              <ArrowLeft className="size-4 mr-2" /> Back to all articles
            </Link>
          </Button>
        </main>
      </div>
    );
  }

  // Pick other posts for recommendation
  const otherPosts = Object.values(blogDatabase)
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-[#fbf9f4] text-[#163b2e]">
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
        {/* Back navigation */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#717a73] hover:text-[#163b2e] transition-colors mb-8 group"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Back to all articles
        </Link>

        {/* Article Header */}
        <header className="mb-10 animate-fade-up">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#d7e780] text-[#163b2e]">
              {post.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-[#717a73] font-mono">
              <Calendar className="size-3.5" />
              <span>{post.date}</span>
            </div>
            <span className="text-[#717a73] text-xs">•</span>
            <div className="flex items-center gap-1.5 text-xs text-[#717a73] font-mono">
              <Clock className="size-3.5" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold font-serif tracking-tight text-[#163b2e] leading-[1.12] mb-6">
            {post.title}
          </h1>

          <p className="text-lg text-[#556157] leading-relaxed font-normal mb-8">{post.excerpt}</p>

          {/* Author Card & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#e8e4dc]">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-[#163b2e] text-[#d7e780] font-bold text-sm flex items-center justify-center">
                {post.author.avatarInitials}
              </div>
              <div>
                <p className="text-sm font-bold text-[#163b2e]">{post.author.name}</p>
                <p className="text-xs text-[#717a73]">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="h-8 rounded-full border-[#e8e4dc] text-xs font-semibold text-[#556157] hover:text-[#163b2e] cursor-pointer"
              >
                <Share2 className="size-3.5 mr-1.5" />
                {copied ? "Link Copied!" : "Share"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setBookmarked((b) => !b)}
                className={`h-8 rounded-full border-[#e8e4dc] text-xs font-semibold cursor-pointer ${
                  bookmarked
                    ? "bg-[#d7e780] text-[#163b2e] border-transparent"
                    : "text-[#556157] hover:text-[#163b2e]"
                }`}
              >
                <Bookmark className="size-3.5 mr-1.5" />
                {bookmarked ? "Saved" : "Save"}
              </Button>
            </div>
          </div>
        </header>

        {/* Key Takeaways Callout Box */}
        <section className="rounded-2xl bg-[#f4f0e8] border border-[#e8e4dc] p-6 mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="size-4 text-[#e07a5f]" />
            <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-[#163b2e]">
              Key Takeaways
            </h3>
          </div>
          <ul className="space-y-2.5">
            {post.content.keyTakeaways.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-[#3b473e]">
                <CheckCircle2 className="size-4 text-[#163b2e] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Main Article Body */}
        <article className="prose prose-stone max-w-none text-[#3b473e] text-base leading-relaxed space-y-8">
          <p className="text-lg leading-relaxed text-[#163b2e] font-serif italic border-l-2 border-[#d7e780] pl-4">
            {post.content.intro}
          </p>

          {post.content.sections.map((section, sIndex) => (
            <div key={sIndex} className="space-y-4">
              <h2 className="text-2xl font-bold font-serif text-[#163b2e] pt-4 border-t border-[#e8e4dc]/70">
                {section.heading}
              </h2>
              {section.body.map((p, pIndex) => (
                <p key={pIndex} className="text-[#556157] leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          ))}

          {/* Conclusion Box */}
          <div className="rounded-2xl border-2 border-[#163b2e]/15 bg-white p-7 mt-8">
            <h3 className="font-serif text-xl font-bold text-[#163b2e] mb-2">The Bottom Line</h3>
            <p className="text-sm text-[#556157] leading-relaxed">{post.content.conclusion}</p>
          </div>
        </article>

        {/* Interactive CTA Banner */}
        <div className="mt-14 rounded-3xl bg-[#183d2c] text-white p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#d7e780] font-bold">
              KITCHEN PRACTICE
            </span>
            <h3 className="text-2xl font-bold font-serif text-white mt-1">
              Start building your active vocabulary
            </h3>
            <p className="text-xs text-white/80 mt-1 max-w-md">
              Put this science into practice with spaced repetition cards and 15-minute speaking
              sessions.
            </p>
          </div>
          <Button
            asChild
            className="bg-[#d7e780] hover:bg-[#e4f38e] text-[#163b2e] rounded-full font-bold px-6 py-3 h-auto shrink-0 shadow-xs"
          >
            <Link to="/signup">Start free pass →</Link>
          </Button>
        </div>

        {/* Related Articles */}
        <section className="mt-16 pt-12 border-t border-[#e8e4dc]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold font-serif text-[#163b2e]">More from the Kitchen</h3>
            <Link
              to="/blog"
              className="text-xs font-bold text-[#163b2e] hover:underline inline-flex items-center gap-1"
            >
              View all <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {otherPosts.map((other) => (
              <Link
                key={other.slug}
                to={`/blog/${other.slug}`}
                className="group block rounded-2xl border border-[#e8e4dc] bg-white p-5 hover:border-[#163b2e]/30 hover:shadow-xs transition-all"
              >
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#f4f0e8] text-[#556157] mb-2 inline-block">
                  {other.category}
                </span>
                <h4 className="font-bold text-[#163b2e] text-base group-hover:underline transition-colors line-clamp-2">
                  {other.title}
                </h4>
                <p className="text-xs text-[#717a73] mt-2 line-clamp-2">{other.excerpt}</p>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#163b2e]">
                  <span>Read article</span>
                  <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
