import { Link } from "@tanstack/react-router";
import { Menu, Sparkles } from "lucide-react";
import * as React from "react";
import { useProgresso } from "@/lib/poup-progress";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Início" },
  { to: "/trilhas", label: "Trilhas" },
  { to: "/jogos", label: "Minijogos" },
  { to: "/progresso", label: "Meu progresso" },
] as const;

export function PoupLogo({ className }: { className?: string }) {
  return (
    <span className={cn("font-display text-2xl font-extrabold tracking-tight", className)}>
      <span className="text-gradient-poup">Poup</span>
      <span className="text-accent">!</span>
    </span>
  );
}

export function PoupLayout({ children }: { children: React.ReactNode }) {
  const { progresso, pronto } = useProgresso();
  const [aberto, setAberto] = React.useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <PoupLogo />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
                activeProps={{ className: "bg-secondary text-secondary-foreground" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-sm font-bold text-accent-foreground sm:inline-flex">
              <Sparkles className="size-4" />
              {pronto ? progresso.pontos : 0} pts
            </span>
            <button
              type="button"
              aria-label="Abrir menu"
              onClick={() => setAberto((v) => !v)}
              className="inline-flex size-10 items-center justify-center rounded-full border border-border md:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>

        {aberto && (
          <nav className="grid gap-1 border-t border-border/70 px-4 py-3 md:hidden">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setAberto(false)}
                className="rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary"
                activeProps={{ className: "bg-secondary text-secondary-foreground" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border/70 bg-secondary/40">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <PoupLogo className="text-xl" />
          <p>Educação financeira acessível e gamificada para jovens estudantes.</p>
        </div>
      </footer>
    </div>
  );
}
