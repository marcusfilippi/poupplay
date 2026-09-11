import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { trilhas } from "@/lib/poup-content";
import { useProgresso } from "@/lib/poup-progress";

const titulo = "Trilhas de educação financeira | Poup!";
const descricao =
  "Trilhas de educação financeira do nível iniciante ao avançado, com lições, atividades e provas finais.";

export const Route = createFileRoute("/trilhas/")({
  head: () => ({
    meta: [
      { title: titulo },
      { name: "description", content: descricao },
      { property: "og:title", content: titulo },
      { property: "og:description", content: descricao },
    ],
  }),
  component: TrilhasPage,
});

function TrilhasPage() {
  const { progresso } = useProgresso();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12">
      <h1 className="text-4xl font-extrabold sm:text-5xl">Trilhas</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Evolua do iniciante ao avançado. Cada trilha reúne lições práticas e uma prova final com
        aprovação mínima de 70%.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {trilhas.map((t) => {
          const feitas = t.licoes.filter((l) =>
            progresso.licoesConcluidas.includes(`${t.id}/${l.id}`),
          ).length;
          const pct = Math.round((feitas / t.licoes.length) * 100);
          return (
            <Link
              key={t.id}
              to="/trilhas/$trilhaId"
              params={{ trilhaId: t.id }}
              className="group rounded-3xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-primary/40"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{t.emoji}</span>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">{t.nivel}</span>
                </div>
                {progresso.provasAprovadas.includes(t.id) && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-success/20 px-3 py-1 text-xs font-bold text-success-foreground">
                    <CheckCircle2 className="size-3.5" /> Concluída
                  </span>
                )}
              </div>
              <h2 className="mt-4 text-2xl font-bold">{t.titulo}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{t.subtitulo}</p>

              <div className="mt-5 h-2.5 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {feitas} de {t.licoes.length} lições · prova {progresso.provasAprovadas.includes(t.id) ? "aprovada" : "pendente"}
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-primary">
                  Abrir <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
