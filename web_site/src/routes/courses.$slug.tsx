import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Award, Bot, CheckCircle2, Clock, PlayCircle, Star, Users } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { courses, faqs } from "@/lib/site-data";

export const Route = createFileRoute("/courses/$slug")({
  loader: ({ params }) => {
    const course = courses.find((c) => c.slug === params.slug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.course.title} — AgentVerse Academy` },
          { name: "description", content: loaderData.course.tagline },
          { property: "og:title", content: loaderData.course.title },
          { property: "og:description", content: loaderData.course.tagline },
        ]
      : [{ title: "Course not found" }, { name: "robots", content: "noindex" }],
  }),
  component: CourseDetail,
});

const curriculum = [
  { title: "Foundations & Setup", lessons: 6 },
  { title: "Core Concepts", lessons: 8 },
  { title: "Tools, Memory & Planning", lessons: 7 },
  { title: "Building Multi-Agent Systems", lessons: 9 },
  { title: "Production, Evaluation & Deployment", lessons: 6 },
  { title: "Capstone Project", lessons: 4 },
];

function CourseDetail() {
  const { course } = Route.useLoaderData();
  const learn = [
    "Design & ship production-grade AI agents",
    "Integrate LLMs with tools, memory and RAG",
    "Evaluate agents with modern benchmarks",
    "Deploy with observability, guardrails & cost controls",
    "Coordinate multi-agent crews for real workflows",
    "Build a portfolio-ready capstone project",
  ];

  return (
    <div>
      {/* HERO */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${course.gradient}`}>
        <div className="absolute inset-0 grid-bg opacity-20" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 lg:py-24 text-white">
          <Link to="/courses" className="text-sm text-white/80 hover:text-white">← Back to courses</Link>
          <div className="grid lg:grid-cols-[1fr_360px] gap-10 mt-6 items-start">
            <div>
              <Badge className="bg-white/20 text-white border-0 mb-4">{course.category} · {course.difficulty}</Badge>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white">{course.title}</h1>
              <p className="mt-4 text-lg text-white/90 max-w-2xl">{course.tagline}</p>
              <div className="mt-6 flex flex-wrap gap-5 text-sm text-white/90">
                <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-yellow-300 text-yellow-300" />{course.rating} rating</span>
                <span className="flex items-center gap-1"><Users className="h-4 w-4" />{course.students.toLocaleString()} students</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{course.duration}</span>
                <span>By {course.instructor}</span>
              </div>
            </div>

            <div className="glass rounded-2xl overflow-hidden text-foreground">
              <div className="relative h-44 bg-gradient-to-br from-black/50 to-black/20 grid place-items-center">
                <PlayCircle className="h-14 w-14 text-white/90" />
              </div>
              <div className="p-6">
                <div className="text-3xl font-extrabold gradient-text">${course.price}</div>
                <div className="text-xs text-muted-foreground mb-4">Lifetime access · Certificate included</div>
                <Button className="w-full gradient-bg text-white border-0 hover:opacity-90 glow">Enroll Now</Button>
                <Button variant="outline" className="w-full mt-2">Add to Wishlist</Button>
                <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                  {["Self-paced + live sessions", "Real-world capstone", "Community & mentorship", "30-day money-back"].map((i) => (
                    <li key={i} className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-brand mt-0.5" />{i}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-muted-foreground leading-relaxed">
              This course takes you from fundamentals to production. You'll build hands-on projects at every step and finish with a capstone you can ship. Taught by {course.instructor}, an industry practitioner shipping AI to real users.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {learn.map((l) => (
                <div key={l} className="flex gap-2 items-start"><CheckCircle2 className="h-5 w-5 text-brand mt-0.5 shrink-0" /><span className="text-sm">{l}</span></div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Curriculum</h2>
            <Accordion type="single" collapsible className="glass rounded-2xl px-4">
              {curriculum.map((m, i) => (
                <AccordionItem key={m.title} value={`m${i}`}>
                  <AccordionTrigger className="text-left">
                    <span className="flex items-center gap-3"><span className="text-brand font-mono text-sm">0{i + 1}</span>{m.title}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {m.lessons} lessons · projects · quizzes
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Instructor</h2>
            <div className="glass rounded-2xl p-6 flex gap-4 items-start">
              <div className="h-14 w-14 rounded-full gradient-bg grid place-items-center text-white font-bold shrink-0">{course.instructor[0]}</div>
              <div>
                <div className="font-semibold">{course.instructor}</div>
                <div className="text-sm text-muted-foreground">Senior AI Engineer · 10+ yrs shipping ML & agents</div>
                <p className="text-sm text-muted-foreground mt-2">Practitioner-first educator who has trained thousands of AI engineers.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">FAQs</h2>
            <Accordion type="single" collapsible className="glass rounded-2xl px-4">
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`f${i}`}>
                  <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="glass rounded-2xl p-6">
            <Award className="h-8 w-8 text-brand mb-3" />
            <h3 className="font-semibold">Verifiable Certificate</h3>
            <p className="text-sm text-muted-foreground mt-1">Shareable credential trusted by hiring teams worldwide.</p>
          </div>
          <div className="glass rounded-2xl p-6">
            <Bot className="h-8 w-8 text-brand-2 mb-3" />
            <h3 className="font-semibold">Real Projects</h3>
            <p className="text-sm text-muted-foreground mt-1">Portfolio-ready builds you can deploy the day you finish.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}