import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/site-data";

const gradients = [
  "from-blue-500 to-cyan-400",
  "from-violet-500 to-fuchsia-500",
  "from-emerald-500 to-teal-400",
  "from-orange-500 to-rose-500",
  "from-indigo-500 to-blue-500",
  "from-pink-500 to-red-500",
  "from-amber-500 to-orange-600",
  "from-lime-500 to-emerald-500",
  "from-purple-500 to-pink-500",
];

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Student Projects — AgentVerse Academy" },
      { name: "description", content: "Real AI agents, chatbots and automation projects built by our students." },
      { property: "og:title", content: "Student AI Projects" },
      { property: "og:description", content: "Portfolio-ready AI agents built by AgentVerse learners." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
      <section className="text-center max-w-2xl mx-auto">
        <p className="text-sm uppercase tracking-[0.2em] text-brand mb-2">Student projects</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold">AI shipped by <span className="gradient-text">our students</span></h1>
        <p className="mt-6 text-muted-foreground">Every project below is production-ready, open source and forkable.</p>
      </section>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
        {projects.map((p, i) => (
          <div key={p.title} className="group glass rounded-2xl overflow-hidden hover:glow transition-all hover:-translate-y-1">
            <div className={`h-40 relative bg-gradient-to-br ${gradients[i % gradients.length]}`}>
              <div className="absolute inset-0 grid-bg opacity-30" />
              <div className="absolute inset-0 grid place-items-center text-white font-display font-bold text-2xl px-4 text-center">{p.title}</div>
            </div>
            <div className="p-5">
              <Badge variant="outline" className="mb-2">{p.tag}</Badge>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1"><Github className="h-4 w-4 mr-1" />GitHub</Button>
                <Button size="sm" className="flex-1 gradient-bg text-white border-0 hover:opacity-90"><ExternalLink className="h-4 w-4 mr-1" />Demo</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}