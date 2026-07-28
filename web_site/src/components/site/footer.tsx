import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Sparkles, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30 mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <span className="grid h-9 w-9 place-items-center rounded-xl gradient-bg">
              <Sparkles className="h-5 w-5 text-white" />
            </span>
            <span className="font-display font-bold">AgentVerse Academy</span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-xs">
            Industry-focused education in AI Agents, Agentic AI, LLMs & Automation.
          </p>
          <div className="flex gap-3 mt-5">
            {[Twitter, Github, Linkedin, Youtube].map((Icon, i) => (
              <a key={i} href="#" aria-label="social" className="h-9 w-9 grid place-items-center rounded-lg border border-border hover:border-brand hover:text-brand transition-colors">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Learn</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/courses" className="hover:text-foreground">All Courses</Link></li>
            <li><Link to="/pricing" className="hover:text-foreground">Pricing</Link></li>
            <li><Link to="/projects" className="hover:text-foreground">Student Projects</Link></li>
            <li><Link to="/blog" className="hover:text-foreground">Blog</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/services" className="hover:text-foreground">Services</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Newsletter</h4>
          <p className="text-sm text-muted-foreground mb-3">AI news, tutorials & new courses.</p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="you@email.com" className="flex-1 h-10 rounded-md bg-background border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <button className="h-10 px-4 rounded-md gradient-bg text-white text-sm font-medium hover:opacity-90">Join</button>
          </form>
        </div>
      </div>
      <div className="border-t border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5 text-xs text-muted-foreground flex flex-col sm:flex-row justify-between gap-2">
          <p>© {new Date().getFullYear()} AgentVerse Academy. All rights reserved.</p>
          <p>Built for the future of Agentic AI.</p>
        </div>
      </div>
    </footer>
  );
}