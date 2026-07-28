import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Compass, Heart, Rocket, Target, Users } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { faqs } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — AgentVerse Academy" },
      { name: "description", content: "Meet the team teaching the next generation of AI Agent builders." },
      { property: "og:title", content: "About AgentVerse Academy" },
      { property: "og:description", content: "Our mission, vision and trainers." },
    ],
  }),
  component: About,
});

const trainers = [
  { name: "Dr. Aisha Verma", role: "Head of Curriculum · ex-DeepMind" },
  { name: "Marcus Chen", role: "Agentic AI Lead · ex-OpenAI" },
  { name: "Priya Nair", role: "LLM Engineering · ex-HuggingFace" },
  { name: "Diego Ramirez", role: "AI Automation · ex-Zapier" },
  { name: "Elena Petrova", role: "Multi-Agent Systems · ex-Microsoft" },
  { name: "James Okafor", role: "AI SaaS · Serial Founder" },
];

function About() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
      <section className="text-center max-w-3xl mx-auto">
        <p className="text-sm uppercase tracking-[0.2em] text-brand mb-2">About us</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold">Educating the builders of the <span className="gradient-text">Agentic era</span></h1>
        <p className="mt-6 text-muted-foreground text-lg">
          AgentVerse Academy trains students and professionals in cutting-edge AI: agents, LLMs, RAG, automation and AI-powered software development — with a relentless focus on shipping.
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-5 mt-16">
        {[
          { icon: Target, title: "Mission", desc: "Make world-class AI agent education accessible to everyone." },
          { icon: Compass, title: "Vision", desc: "A world where every developer can build production AI systems." },
          { icon: Heart, title: "Values", desc: "Practitioner-first. Ship-focused. Radically transparent." },
        ].map((v) => (
          <div key={v.title} className="glass rounded-2xl p-6">
            <div className="h-11 w-11 rounded-xl gradient-bg grid place-items-center mb-4"><v.icon className="h-5 w-5 text-white" /></div>
            <h3 className="font-semibold text-lg">{v.title}</h3>
            <p className="text-sm text-muted-foreground mt-2">{v.desc}</p>
          </div>
        ))}
      </section>

      <section className="mt-24">
        <h2 className="text-3xl font-bold mb-8">Our journey</h2>
        <div className="relative border-l-2 border-brand/30 pl-8 space-y-8">
          {[
            { y: "2022", t: "Founded", d: "Started as a small cohort teaching prompt engineering." },
            { y: "2023", t: "5,000 students", d: "Launched RAG, LangChain and LLM engineering tracks." },
            { y: "2024", t: "Agentic AI Bootcamp", d: "Our flagship agent bootcamp launched to 4.9★ reviews." },
            { y: "2026", t: "10,000+ learners", d: "Now training engineers at 200+ companies worldwide." },
          ].map((m) => (
            <div key={m.y} className="relative">
              <span className="absolute -left-[42px] top-1 h-4 w-4 rounded-full gradient-bg" />
              <div className="text-xs uppercase tracking-widest text-brand">{m.y}</div>
              <div className="font-semibold text-lg">{m.t}</div>
              <div className="text-sm text-muted-foreground">{m.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-brand mb-2">Team</p>
          <h2 className="text-3xl font-bold">Meet our <span className="gradient-text">trainers</span></h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {trainers.map((t) => (
            <div key={t.name} className="glass rounded-2xl p-6 flex items-center gap-4">
              <div className="h-14 w-14 rounded-full gradient-bg grid place-items-center text-white font-bold text-lg shrink-0">{t.name[0]}</div>
              <div className="min-w-0">
                <div className="font-semibold truncate">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24 grid md:grid-cols-3 gap-5">
        {[
          { icon: Award, title: "Certifications", desc: "Industry-recognized credentials on every completion." },
          { icon: Rocket, title: "Why learn with us", desc: "Real projects, current stack, practitioner instructors." },
          { icon: Users, title: "Community", desc: "10,000+ builders sharing agents, jobs and reviews." },
        ].map((v) => (
          <div key={v.title} className="glass rounded-2xl p-6">
            <div className="h-11 w-11 rounded-xl gradient-bg grid place-items-center mb-4"><v.icon className="h-5 w-5 text-white" /></div>
            <h3 className="font-semibold text-lg">{v.title}</h3>
            <p className="text-sm text-muted-foreground mt-2">{v.desc}</p>
          </div>
        ))}
      </section>

      <section className="mt-24">
        <h2 className="text-3xl font-bold mb-6">FAQs</h2>
        <Accordion type="single" collapsible className="glass rounded-2xl px-4">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`f${i}`}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="mt-16 text-center">
        <Button asChild size="lg" className="gradient-bg text-white border-0 hover:opacity-90 glow">
          <Link to="/courses">Browse the Curriculum</Link>
        </Button>
      </section>
    </div>
  );
}