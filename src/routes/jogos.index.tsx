import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Trophy } from "lucide-react";
import { jogos } from "@/lib/poup-content";
import { useProgresso } from "@/lib/poup-progress";

const titulo = "Minijogos de educação financeira | Poup!";
const descricao =
  "Coloque em prática o que aprendeu: divida uma mesada, decida entre gastar ou guardar e domine os juros compostos.";

export const Route = createFileRoute("/jogos/")({
  head: () => ({
    meta: [
      { title: titulo },
      { name: "description", content: descricao },
      { property: "og:title", content: titulo },
      { property: "og:description", content: descricao },
    ],
  }),
  component: JogosPage,
});

function JogosPage() {
  const { progresso } = useProgresso();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12">
      <h1 className="text-4xl font-extrabold sm:text-5xl">Minijogos</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Cada jogo apresenta situações financeiras reais. Sua melhor pontuação fica salva e conta
        para o seu nível.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {jogos.map((j) => {
          const recorde = progresso.jogos[j.id] ?? 0;
          return (
            <Link
              key={j.id}
              to="/jogos/$jogoId"
              params={{ jogoId: j.id }}
              className="group flex flex-col rounded-3xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-primary/40"
            >
              <span className="text-4xl">{j.emoji}</span>
              <h2 className="mt-4 text-xl font-bold">{j.nome}</h2>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{j.descricao}</p>
              <span className="mt-4 inline-flex w-fit rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">
                {j.habilidade}
              </span>
              <div className="mt-5 flex items-center justify-between text-sm">
                <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                  <Trophy className="size-4" /> Recorde: {recorde}
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-primary">
                  Jogar <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
