import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — AgentVerse Academy" },
      { name: "description", content: "Get in touch about courses, corporate training or AI consulting." },
      { property: "og:title", content: "Contact AgentVerse Academy" },
      { property: "og:description", content: "Reach our team for training, consulting, and partnerships." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  company: z.string().trim().max(100).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(1500),
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your inputs");
      return;
    }
    toast.success("Message sent! We'll be in touch shortly.");
    setForm({ name: "", email: "", phone: "", company: "", message: "" });
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const field = "w-full h-11 rounded-lg bg-background border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
      <section className="text-center max-w-2xl mx-auto mb-12">
        <p className="text-sm uppercase tracking-[0.2em] text-brand mb-2">Contact</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold">Let's build <span className="gradient-text">together</span></h1>
        <p className="mt-4 text-muted-foreground">Questions about courses, teams or consulting? We reply within 24 hours.</p>
      </section>

      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        <form onSubmit={submit} className="glass rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <input value={form.name} onChange={set("name")} className={field + " mt-1"} required />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input type="email" value={form.email} onChange={set("email")} className={field + " mt-1"} required />
            </div>
            <div>
              <label className="text-sm font-medium">Phone</label>
              <input value={form.phone} onChange={set("phone")} className={field + " mt-1"} />
            </div>
            <div>
              <label className="text-sm font-medium">Company</label>
              <input value={form.company} onChange={set("company")} className={field + " mt-1"} />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Message</label>
            <textarea value={form.message} onChange={set("message")} rows={6} className="w-full rounded-lg bg-background border border-border px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-ring" required />
          </div>
          <Button type="submit" size="lg" className="gradient-bg text-white border-0 hover:opacity-90 glow">Send message</Button>
        </form>

        <aside className="space-y-4">
          {[
            { icon: MapPin, title: "Office", val: "500 Innovation Drive, San Francisco, CA" },
            { icon: Mail, title: "Email", val: "hello@agentverse.academy" },
            { icon: Phone, title: "Phone", val: "+1 (415) 555-0199" },
          ].map((c) => (
            <div key={c.title} className="glass rounded-2xl p-5 flex gap-4">
              <div className="h-10 w-10 rounded-lg gradient-bg grid place-items-center shrink-0"><c.icon className="h-5 w-5 text-white" /></div>
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.title}</div>
                <div className="font-medium truncate">{c.val}</div>
              </div>
            </div>
          ))}
          <div className="glass rounded-2xl overflow-hidden">
            <iframe
              title="Office map"
              className="w-full h-56 border-0"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-122.42%2C37.77%2C-122.39%2C37.79&layer=mapnik"
              loading="lazy"
            />
          </div>
        </aside>
      </div>
    </div>
  );
}