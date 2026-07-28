import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bot, Brain, Cpu, GraduationCap, Rocket, ShieldCheck, Sparkles, Star, Users, Workflow, Zap } from "lucide-react";
import heroImg from "@/assets/hero-ai.jpg";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { courses, partners, testimonials } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AgentVerse Academy — Master AI Agents & Agentic AI" },
      { name: "description", content: "Learn AI Agents, LLMs, RAG, LangChain, CrewAI, AutoGen and AI automation from industry experts." },
      { property: "og:title", content: "AgentVerse Academy" },
      { property: "og:description", content: "Master AI Agents & Build the Future of Automation." },
    ],
  }),
  component: Home,
});

const stats = [
  { label: "Students", value: "10,000+", icon: Users },
  { label: "Courses", value: "50+", icon: GraduationCap },
  { label: "Projects", value: "100+", icon: Rocket },
  { label: "Satisfaction", value: "95%", icon: Star },
];

const features = [
  { icon: Bot, title: "Agent-First Curriculum", desc: "Every course centers on building real, autonomous AI systems." },
  { icon: Brain, title: "Taught by Practitioners", desc: "Instructors ship agents to production at leading AI companies." },
  { icon: Workflow, title: "Real Projects", desc: "Portfolio-ready builds from RAG apps to multi-agent crews." },
  { icon: ShieldCheck, title: "Verifiable Certificates", desc: "Shareable credentials trusted by hiring teams." },
  { icon: Zap, title: "Lifetime Access", desc: "Course updates every time the AI stack evolves." },
  { icon: Cpu, title: "GPU-Ready Labs", desc: "Cloud notebooks & sandboxes ready in one click." },
];

function Home() {
  const featured = courses.slice(0, 6);
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full gradient-bg blur-3xl opacity-30 animate-pulse-glow" aria-hidden />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-brand-2 blur-3xl opacity-30 animate-pulse-glow" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-16 pb-20 lg:pt-24 lg:pb-28 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="outline" className="glass border-brand/30 text-brand mb-6">
              <Sparkles className="h-3 w-3 mr-1.5" /> New: Agentic AI Bootcamp 2026
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight">
              Master <span className="gradient-text">AI Agents</span> & Build the Future of Automation
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Learn Agentic AI, Multi-Agent Systems, LLMs, MCP, RAG, LangChain, CrewAI, AutoGen and production AI applications with expert-led courses.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="gradient-bg text-white border-0 hover:opacity-90 glow">
                <Link to="/courses">Explore Courses <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-border">
                <Link to="/pricing">Get Started</Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> 4.9 avg rating</div>
              <div className="flex items-center gap-2"><Users className="h-4 w-4 text-brand" /> 10,000+ learners</div>
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-brand-3" /> Certified curriculum</div>
            </div>
          </div>

          <div className="relative animate-float">
            <div className="absolute inset-0 rounded-3xl gradient-bg blur-2xl opacity-30" aria-hidden />
            <div className="relative rounded-3xl overflow-hidden glass glow">
              <img src={heroImg} alt="AI neural network visualization" width={1600} height={1200} className="w-full h-auto" />
              <div className="absolute top-4 left-4 glass rounded-xl px-3 py-2 text-xs font-medium flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> Live agent training
              </div>
              <div className="absolute bottom-4 right-4 glass rounded-xl px-3 py-2 text-xs font-medium">
                <span className="gradient-text font-bold">98.4%</span> task success
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl p-6 text-center">
              <s.icon className="h-6 w-6 mx-auto mb-3 text-brand" />
              <div className="text-3xl font-extrabold gradient-text">{s.value}</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PARTNERS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-16">
        <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">Powering learners at</p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70">
          {partners.map((p) => (
            <span key={p} className="font-display text-lg font-semibold text-muted-foreground hover:text-foreground transition-colors">{p}</span>
          ))}
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-24">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-brand mb-2">Featured</p>
            <h2 className="text-3xl sm:text-4xl font-bold">Bestselling <span className="gradient-text">AI courses</span></h2>
          </div>
          <Button asChild variant="ghost" className="text-brand">
            <Link to="/courses">View all <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((c) => (
            <Link
              key={c.slug}
              to="/courses/$slug"
              params={{ slug: c.slug }}
              className="group glass rounded-2xl overflow-hidden hover:glow transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`h-40 bg-gradient-to-br ${c.gradient} relative`}>
                <div className="absolute inset-0 grid-bg opacity-30" />
                <Badge className="absolute top-3 right-3 bg-black/40 text-white border-0">{c.difficulty}</Badge>
                <Bot className="absolute bottom-3 left-4 h-10 w-10 text-white/80" />
              </div>
              <div className="p-5">
                <div className="text-xs text-muted-foreground mb-2">{c.category} · {c.duration}</div>
                <h3 className="font-bold text-lg group-hover:gradient-text transition-all">{c.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{c.tagline}</p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />{c.rating}</span>
                  <span className="font-bold text-foreground">${c.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm uppercase tracking-[0.2em] text-brand mb-2">Why us</p>
          <h2 className="text-3xl sm:text-4xl font-bold">Built for the <span className="gradient-text">Agentic era</span></h2>
          <p className="mt-4 text-muted-foreground">Every module is designed around shipping real agents — not toy demos.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.title} className="glass rounded-2xl p-6 hover:glow transition-all">
              <div className="h-11 w-11 rounded-xl gradient-bg grid place-items-center mb-4">
                <f.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-semibold mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm uppercase tracking-[0.2em] text-brand mb-2">Loved worldwide</p>
          <h2 className="text-3xl sm:text-4xl font-bold">What our <span className="gradient-text">students say</span></h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {testimonials.map((t) => (
            <div key={t.name} className="glass rounded-2xl p-7">
              <div className="flex gap-1 mb-4">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}</div>
              <p className="text-lg leading-relaxed">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full gradient-bg grid place-items-center text-white font-bold text-sm">{t.name[0]}</div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-24">
        <div className="relative overflow-hidden rounded-3xl gradient-bg p-10 sm:p-16 text-center text-white glow">
          <div className="absolute inset-0 grid-bg opacity-20" aria-hidden />
          <div className="relative">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Start building agents today</h2>
            <p className="mt-4 text-white/85 max-w-xl mx-auto">Join 10,000+ learners shipping production AI systems.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="bg-white text-brand hover:bg-white/90 border-0">
                <Link to="/courses">Browse Courses</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">
                <Link to="/contact">Talk to us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
