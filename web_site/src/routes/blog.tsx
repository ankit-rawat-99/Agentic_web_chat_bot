import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — AgentVerse Academy" },
      { name: "description", content: "AI news, tutorials, agent guides and career insights." },
      { property: "og:title", content: "AgentVerse Blog" },
      { property: "og:description", content: "Tutorials, agent guides and AI news." },
    ],
  }),
  component: BlogPage,
});

const CATS = ["AI News", "AI Agents", "LLM", "Automation", "Tutorials", "Career"];

const posts = [
  { cat: "AI Agents", title: "Building your first multi-agent crew with CrewAI", date: "Jul 12, 2026", excerpt: "A step-by-step guide to designing roles, tasks and delegation." },
  { cat: "LLM", title: "RAG in 2026: what actually works in production", date: "Jul 5, 2026", excerpt: "From chunking strategies to reranking and evaluation." },
  { cat: "Automation", title: "Zero-code AI workflows with n8n and OpenAI", date: "Jun 28, 2026", excerpt: "Automate research, sales and support with a visual builder." },
  { cat: "Tutorials", title: "MCP Protocol for beginners", date: "Jun 20, 2026", excerpt: "Understand Model Context Protocol and ship your first server." },
  { cat: "Career", title: "How to break into AI engineering in 90 days", date: "Jun 12, 2026", excerpt: "The exact roadmap our top students followed." },
  { cat: "AI News", title: "The state of agent frameworks: mid-2026", date: "Jun 3, 2026", excerpt: "LangGraph, CrewAI, AutoGen and Agno compared." },
];

const gradients = ["from-blue-500 to-cyan-400", "from-violet-500 to-fuchsia-500", "from-emerald-500 to-teal-400", "from-orange-500 to-rose-500", "from-indigo-500 to-blue-500", "from-pink-500 to-red-500"];

function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
      <section className="text-center max-w-2xl mx-auto mb-10">
        <p className="text-sm uppercase tracking-[0.2em] text-brand mb-2">Blog</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold">The <span className="gradient-text">Agentic</span> journal</h1>
        <p className="mt-4 text-muted-foreground">Tutorials, agent patterns and AI news — from our instructors.</p>
      </section>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {CATS.map((c) => (
          <button key={c} className="glass px-4 py-1.5 rounded-full text-sm hover:text-brand transition-colors">{c}</button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((p, i) => (
          <article key={p.title} className="group glass rounded-2xl overflow-hidden hover:glow transition-all hover:-translate-y-1">
            <div className={`h-40 bg-gradient-to-br ${gradients[i % gradients.length]} relative`}>
              <div className="absolute inset-0 grid-bg opacity-30" />
            </div>
            <div className="p-6">
              <Badge variant="outline" className="mb-3">{p.cat}</Badge>
              <h3 className="font-bold text-lg group-hover:gradient-text">{p.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{p.excerpt}</p>
              <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{p.date}</span>
                <span className="text-brand inline-flex items-center gap-1">Read <ArrowRight className="h-3.5 w-3.5" /></span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}