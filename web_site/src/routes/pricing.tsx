import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — AgentVerse Academy" },
      { name: "description", content: "Simple, transparent pricing for learners and teams." },
      { property: "og:title", content: "AgentVerse Pricing" },
      { property: "og:description", content: "Starter, Pro and Enterprise plans." },
    ],
  }),
  component: PricingPage,
});

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    desc: "Get started with foundational courses.",
    features: ["Beginner courses", "Community access", "Basic certificates", "Weekly newsletter"],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    desc: "For serious learners shipping AI agents.",
    features: ["All courses", "Live sessions", "Real projects", "Mentor support", "Verifiable certificates", "Career reviews"],
    cta: "Start Pro",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For teams and organizations at scale.",
    features: ["Team training", "Custom curriculum", "Dedicated success mgr", "AI consulting hours", "SSO & analytics", "Priority support"],
    cta: "Talk to sales",
    highlight: false,
  },
];

function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
      <section className="text-center max-w-2xl mx-auto">
        <p className="text-sm uppercase tracking-[0.2em] text-brand mb-2">Pricing</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold">Simple plans, <span className="gradient-text">real outcomes</span></h1>
        <p className="mt-6 text-muted-foreground">Cancel anytime. 7-day money-back guarantee.</p>
      </section>

      <div className="grid md:grid-cols-3 gap-6 mt-14">
        {plans.map((p) => (
          <div key={p.name} className={`rounded-3xl p-8 relative ${p.highlight ? "gradient-bg text-white glow" : "glass"}`}>
            {p.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-brand text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</div>}
            <div className={`text-sm uppercase tracking-widest ${p.highlight ? "text-white/80" : "text-brand"}`}>{p.name}</div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className={`text-5xl font-extrabold ${p.highlight ? "text-white" : ""}`}>{p.price}</span>
              <span className={`text-sm ${p.highlight ? "text-white/80" : "text-muted-foreground"}`}>{p.period}</span>
            </div>
            <p className={`mt-3 text-sm ${p.highlight ? "text-white/85" : "text-muted-foreground"}`}>{p.desc}</p>
            <ul className="mt-6 space-y-3 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2 items-start">
                  <Check className={`h-4 w-4 mt-0.5 shrink-0 ${p.highlight ? "text-white" : "text-brand"}`} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button
              asChild
              className={`w-full mt-8 border-0 ${p.highlight ? "bg-white text-brand hover:bg-white/90" : "gradient-bg text-white hover:opacity-90"}`}
            >
              <Link to={p.name === "Enterprise" ? "/contact" : "/courses"}>{p.cta}</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}