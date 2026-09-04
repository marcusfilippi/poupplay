import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Circle, Clock, Lightbulb } from "lucide-react";
import * as React from "react";
import { getTrilha, type Licao } from "@/lib/poup-content";
import { useProgresso } from "@/lib/poup-progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/trilhas/$trilhaId")({
  loader: ({ params }) => {
    const trilha = getTrilha(params.trilhaId);
    if (!trilha) throw notFound();
    return { titulo: trilha.titulo, subtitulo: trilha.subtitulo };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Trilha não encontrada | Poup!" }, { name: "robots", content: "noindex" }] };
    }
    const t = `${loaderData.titulo} | Poup!`;
    return {
      meta: [
        { title: t },
        { name: "description", content: loaderData.subtitulo },
        { property: "og:title", content: t },
        { property: "og:description", content: loaderData.subtitulo },
      ],
    };
  },
  component: TrilhaPage,
});

function TrilhaPage() {
  const { trilhaId } = Route.useParams();
  const trilha = getTrilha(trilhaId)!;
  const { progresso } = useProgresso();
  const [abertaId, setAbertaId] = React.useState<string | null>(trilha.licoes[0].id);

  const feitas = trilha.licoes.filter((l) =>
    progresso.licoesConcluidas.includes(`${trilha.id}/${l.id}`),
  ).length;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <Link
        to="/trilhas"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Todas as trilhas
      </Link>

      <header className="mt-6">
        <span className="text-5xl">{trilha.emoji}</span>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">{trilha.titulo}</h1>
        <p className="mt-2 text-muted-foreground">{trilha.subtitulo}</p>
        <div className="mt-5 flex items-center gap-3">
          <div className="h-2.5 w-full max-w-xs overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${(feitas / trilha.licoes.length) * 100}%` }}
            />
          </div>
          <span className="text-sm font-bold text-muted-foreground">
            {feitas}/{trilha.licoes.length}
          </span>
        </div>
      </header>

      <div className="mt-8 space-y-4">
        {trilha.licoes.map((licao, i) => (
          <LicaoCard
            key={licao.id}
            index={i}
            licao={licao}
            trilhaId={trilha.id}
            aberta={abertaId === licao.id}
            onToggle={() => setAbertaId(abertaId === licao.id ? null : licao.id)}
          />
        ))}
      </div>
    </div>
  );
}

function LicaoCard({
  licao,
  trilhaId,
  index,
  aberta,
  onToggle,
}: {
  licao: Licao;
  trilhaId: string;
  index: number;
  aberta: boolean;
  onToggle: () => void;
}) {
  const chave = `${trilhaId}/${licao.id}`;
  const { progresso, concluirLicao } = useProgresso();
  const concluida = progresso.licoesConcluidas.includes(chave);
  const [escolha, setEscolha] = React.useState<number | null>(null);
  const respondido = escolha !== null;
  const acertou = escolha === licao.quiz.correta;

  function responder(i: number) {
    if (respondido) return;
    setEscolha(i);
    concluirLicao(chave, i === licao.quiz.correta);
  }

  return (
    <article
      className={cn(
        "overflow-hidden rounded-3xl border bg-card shadow-soft transition",
        concluida ? "border-primary/40" : "border-border",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-4 p-5 text-left"
        aria-expanded={aberta}
      >
        <span className="shrink-0">
          {concluida ? (
            <CheckCircle2 className="size-6 text-primary" />
          ) : (
            <Circle className="size-6 text-muted-foreground/50" />
          )}
        </span>
        <span className="flex-1">
          <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Lição {index + 1}
          </span>
          <h2 className="text-lg font-bold">{licao.titulo}</h2>
          <p className="text-sm text-muted-foreground">{licao.resumo}</p>
        </span>
        <span className="hidden shrink-0 items-center gap-1 text-xs text-muted-foreground sm:inline-flex">
          <Clock className="size-3.5" /> {licao.minutos} min
        </span>
      </button>

      {aberta && (
        <div className="border-t border-border px-5 pb-6 pt-5">
          <div className="space-y-4 text-[0.975rem] leading-relaxed text-foreground/90">
            {licao.paragrafos.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <div className="mt-5 flex gap-3 rounded-2xl bg-accent/25 p-4">
            <Lightbulb className="mt-0.5 size-5 shrink-0 text-accent-foreground" />
            <p className="text-sm font-medium text-accent-foreground">{licao.dica}</p>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-secondary/40 p-5">
            <h3 className="text-base font-bold">Teste rápido</h3>
            <p className="mt-1 text-sm text-muted-foreground">{licao.quiz.pergunta}</p>
            <div className="mt-4 grid gap-2">
              {licao.quiz.opcoes.map((op, i) => {
                const correta = i === licao.quiz.correta;
                const selecionada = escolha === i;
                return (
                  <button
                    key={op}
                    type="button"
                    onClick={() => responder(i)}
                    disabled={respondido}
                    className={cn(
                      "rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition",
                      !respondido && "border-border bg-card hover:border-primary/50",
                      respondido && correta && "border-success bg-success/20",
                      respondido && selecionada && !correta && "border-destructive bg-destructive/15",
                      respondido && !correta && !selecionada && "border-border bg-card opacity-60",
                    )}
                  >
                    {op}
                  </button>
                );
              })}
            </div>
            {respondido && (
              <p className="mt-4 text-sm font-medium">
                {acertou ? "✅ Isso aí! " : "🤔 Quase lá. "}
                <span className="font-normal text-muted-foreground">{licao.quiz.explicacao}</span>
              </p>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
