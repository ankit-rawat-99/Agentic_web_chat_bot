import { Link } from "@tanstack/react-router";
import { Menu, Moon, Sun, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./theme-provider";

const links = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/pricing", label: "Pricing" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass border-b border-border/40">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="grid h-9 w-9 place-items-center rounded-xl gradient-bg glow">
              <Sparkles className="h-5 w-5 text-white" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight">
              AgentVerse<span className="gradient-text"> Academy</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative"
                activeProps={{ className: "px-3 py-2 text-sm font-medium text-foreground" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button asChild className="hidden sm:inline-flex gradient-bg text-white border-0 hover:opacity-90">
              <Link to="/courses">Get Started</Link>
            </Button>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden border-t border-border/40 px-4 py-3 space-y-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}