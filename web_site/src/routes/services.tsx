import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bot, Building2, Cpu, GraduationCap, Lightbulb, Workflow, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/site-data";

const icons = [Building2, Lightbulb, Bot, Workflow, Cpu, Wrench, GraduationCap];

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — AgentVerse Academy" },
      { name: "description", content: "Corporate AI training, consulting, custom agents and enterprise AI solutions." },
      { property: "og:title", content: "AgentVerse Services" },
      { property: "og:description", content: "AI training, consulting, and custom agent development for teams." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
      <section className="text-center max-w-2xl mx-auto">
        <p className="text-sm uppercase tracking-[0.2em] text-brand mb-2">Company services</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold">Enterprise-grade <span className="gradient-text">AI services</span></h1>
        <p className="mt-6 text-muted-foreground">From upskilling teams to shipping custom AI agents — we partner with you end-to-end.</p>
      </section>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
        {services.map((s, i) => {
          const Icon = icons[i % icons.length];
          return (
            <div key={s.title} className="group glass rounded-2xl p-6 hover:glow transition-all hover:-translate-y-1">
              <div className="h-11 w-11 rounded-xl gradient-bg grid place-items-center mb-4"><Icon className="h-5 w-5 text-white" /></div>
              <h3 className="font-semibold text-lg group-hover:gradient-text">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
              <Link to="/contact" className="text-sm text-brand inline-flex items-center gap-1 mt-4">
                Talk to us <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          );
        })}
      </div>

      <section className="mt-20 rounded-3xl gradient-bg p-10 sm:p-14 text-center text-white glow relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" aria-hidden />
        <div className="relative">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Ready to bring AI into your organization?</h2>
          <p className="mt-3 text-white/85 max-w-xl mx-auto">Book a discovery call. We'll map the fastest path to production.</p>
          <Button asChild size="lg" className="mt-6 bg-white text-brand hover:bg-white/90 border-0">
            <Link to="/contact">Book a call</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}