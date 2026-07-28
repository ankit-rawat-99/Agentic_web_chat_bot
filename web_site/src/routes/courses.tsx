import { createFileRoute, Link } from "@tanstack/react-router";
import { Bot, Search, Star, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CATEGORIES, courses } from "@/lib/site-data";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "All Courses — AgentVerse Academy" },
      { name: "description", content: "Explore AI Agent, LLM, RAG, LangChain, CrewAI, AutoGen and automation courses." },
      { property: "og:title", content: "AI Courses — AgentVerse Academy" },
      { property: "og:description", content: "Industry-focused AI courses from beginner to advanced." },
    ],
  }),
  component: CoursesPage,
});

const DIFFICULTIES = ["All", "Beginner", "Intermediate", "Advanced"] as const;

function CoursesPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [diff, setDiff] = useState<(typeof DIFFICULTIES)[number]>("All");
  const [maxPrice, setMaxPrice] = useState(500);

  const filtered = useMemo(
    () =>
      courses.filter(
        (c) =>
          (cat === "All" || c.category === cat) &&
          (diff === "All" || c.difficulty === diff) &&
          c.price <= maxPrice &&
          (q === "" || c.title.toLowerCase().includes(q.toLowerCase()) || c.tagline.toLowerCase().includes(q.toLowerCase())),
      ),
    [q, cat, diff, maxPrice],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="text-sm uppercase tracking-[0.2em] text-brand mb-2">Curriculum</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold">Explore <span className="gradient-text">AI courses</span></h1>
        <p className="mt-4 text-muted-foreground">From your first agent to production multi-agent systems.</p>
      </div>

      {/* Filters */}
      <div className="glass rounded-2xl p-5 mb-10 grid gap-4 md:grid-cols-[1fr_auto_auto_auto]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search courses..."
            className="w-full h-11 pl-10 pr-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm"
          />
        </div>
        <select value={cat} onChange={(e) => setCat(e.target.value as typeof cat)} className="h-11 px-3 rounded-lg bg-background border border-border text-sm">
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={diff} onChange={(e) => setDiff(e.target.value as typeof diff)} className="h-11 px-3 rounded-lg bg-background border border-border text-sm">
          {DIFFICULTIES.map((d) => <option key={d}>{d}</option>)}
        </select>
        <div className="flex items-center gap-3 min-w-[180px]">
          <span className="text-xs text-muted-foreground whitespace-nowrap">Max ${maxPrice}</span>
          <input type="range" min={50} max={500} step={10} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="w-full accent-[oklch(0.65_0.2_265)]" />
        </div>
      </div>

      <div className="text-sm text-muted-foreground mb-5">Showing <span className="text-foreground font-medium">{filtered.length}</span> courses</div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((c) => (
          <div key={c.slug} className="group glass rounded-2xl overflow-hidden hover:glow transition-all hover:-translate-y-1">
            <div className={`h-40 bg-gradient-to-br ${c.gradient} relative`}>
              <div className="absolute inset-0 grid-bg opacity-30" />
              <Badge className="absolute top-3 right-3 bg-black/40 text-white border-0">{c.difficulty}</Badge>
              <Bot className="absolute bottom-3 left-4 h-10 w-10 text-white/80" />
            </div>
            <div className="p-5">
              <div className="text-xs text-muted-foreground mb-2">{c.category} · {c.duration} · {c.instructor}</div>
              <h3 className="font-bold text-lg group-hover:gradient-text transition-all">{c.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{c.tagline}</p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />{c.rating}</span>
                  <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{c.students.toLocaleString()}</span>
                </div>
                <span className="font-bold text-foreground">${c.price}</span>
              </div>
              <Button asChild className="w-full mt-4 gradient-bg text-white border-0 hover:opacity-90">
                <Link to="/courses/$slug" params={{ slug: c.slug }}>Learn More</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">No courses match your filters.</div>
      )}
    </div>
  );
}