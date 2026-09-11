import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Circle, Clock, GraduationCap, Lightbulb, RotateCcw } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
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
  const trilha = getTrilha(trilhaId);
  const { progresso } = useProgresso();
  const [abertaId, setAbertaId] = React.useState<string | null>(trilha?.licoes[0]?.id ?? null);

  if (!trilha) return null;

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
        <div className="flex items-center gap-3">
          <span className="text-5xl">{trilha.emoji}</span>
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">
            {trilha.nivel}
          </span>
        </div>
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

      <ProvaFinal trilha={trilha} liberada={feitas === trilha.licoes.length} />
    </div>
  );
}

type QuestaoProva = {
  pergunta: string;
  opcoes: { texto: string; correta: boolean }[];
  explicacao: string;
};

function embaralhar<T>(itens: T[]) {
  return [...itens].sort(() => Math.random() - 0.5);
}

function criarProva(trilha: ReturnType<typeof getTrilha>): QuestaoProva[] {
  if (!trilha) return [];
  return embaralhar(trilha.licoes).map((licao) => ({
    pergunta: licao.quiz.pergunta,
    explicacao: licao.quiz.explicacao,
    opcoes: embaralhar(
      licao.quiz.opcoes.map((texto, index) => ({ texto, correta: index === licao.quiz.correta })),
    ),
  }));
}

function ProvaFinal({ trilha, liberada }: { trilha: NonNullable<ReturnType<typeof getTrilha>>; liberada: boolean }) {
  const { progresso, aprovarProva } = useProgresso();
  const aprovada = progresso.provasAprovadas.includes(trilha.id);
  const [questoes, setQuestoes] = React.useState(() => criarProva(trilha));
  const [respostas, setRespostas] = React.useState<Record<number, number>>({});
  const [corrigida, setCorrigida] = React.useState(false);
  const acertos = questoes.reduce(
    (total, questao, index) => total + (questao.opcoes[respostas[index] ?? -1]?.correta ? 1 : 0),
    0,
  );
  const percentual = questoes.length ? Math.round((acertos / questoes.length) * 100) : 0;
  const passou = percentual >= 70;

  function corrigir() {
    setCorrigida(true);
    if (percentual >= 70) aprovarProva(trilha.id);
  }

  function tentarNovamente() {
    setQuestoes(criarProva(trilha));
    setRespostas({});
    setCorrigida(false);
  }

  return (
    <section className="mt-10 border-t border-border pt-10">
      <div className="flex items-start gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <GraduationCap className="size-6" />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-primary">Prova final</p>
          <h2 className="text-2xl font-extrabold">Mostre que dominou esta trilha</h2>
          <p className="mt-1 text-sm text-muted-foreground">Acerte pelo menos 70% para ganhar 100 pontos e concluir o nível.</p>
        </div>
      </div>

      {!liberada && (
        <div className="mt-6 rounded-2xl border border-border bg-muted/40 p-5 text-sm text-muted-foreground">
          Conclua as {trilha.licoes.length} lições para liberar a prova.
        </div>
      )}

      {liberada && aprovada && !corrigida && (
        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-success/20 p-5 text-sm font-bold">
          <CheckCircle2 className="size-5 text-success" /> Prova aprovada. Você concluiu esta trilha.
        </div>
      )}

      {liberada && !aprovada && !corrigida && (
        <div className="mt-7 space-y-6">
          {questoes.map((questao, qi) => (
            <fieldset key={questao.pergunta} className="rounded-2xl border border-border bg-card p-5">
              <legend className="px-2 text-sm font-bold">{qi + 1}. {questao.pergunta}</legend>
              <div className="mt-3 grid gap-2">
                {questao.opcoes.map((opcao, oi) => (
                  <label key={opcao.texto} className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-3 text-sm transition hover:border-primary/50">
                    <input type="radio" name={`prova-${trilha.id}-${qi}`} checked={respostas[qi] === oi} onChange={() => setRespostas((atuais) => ({ ...atuais, [qi]: oi }))} className="accent-primary" />
                    {opcao.texto}
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
          <Button className="h-11 rounded-full px-6 font-bold" disabled={Object.keys(respostas).length !== questoes.length} onClick={corrigir}>Corrigir prova</Button>
        </div>
      )}

      {liberada && corrigida && (
        <div className={cn("mt-7 rounded-2xl border p-6", passou ? "border-success bg-success/15" : "border-destructive bg-destructive/10")}>
          <p className="text-2xl font-extrabold">{percentual}% de acertos</p>
          <p className="mt-1 text-sm text-muted-foreground">{passou ? "Aprovado! A trilha foi concluída e 100 pontos foram adicionados." : "Revise as explicações e tente novamente. As alternativas mudarão de posição."}</p>
          {!passou && (
            <div className="mt-5 space-y-3">
              {questoes.map((questao, index) => !questao.opcoes[respostas[index] ?? -1]?.correta && (
                <p key={questao.pergunta} className="text-sm"><strong>{questao.pergunta}</strong><br /><span className="text-muted-foreground">{questao.explicacao}</span></p>
              ))}
              <Button variant="outline" className="mt-2 rounded-full" onClick={tentarNovamente}><RotateCcw /> Tentar novamente</Button>
            </div>
          )}
        </div>
      )}
    </section>
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
