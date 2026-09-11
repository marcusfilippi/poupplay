import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Target, Trash2, Trophy } from "lucide-react";
import * as React from "react";
import { jogos, trilhas, totalLicoes } from "@/lib/poup-content";
import { nivelDe, useProgresso } from "@/lib/poup-progress";

const titulo = "Meu progresso e minhas metas | Poup!";
const descricao =
  "Acompanhe lições concluídas, recordes nos minijogos, pontos, nível e o avanço das suas metas financeiras.";

export const Route = createFileRoute("/progresso")({
  head: () => ({
    meta: [
      { title: titulo },
      { name: "description", content: descricao },
      { property: "og:title", content: titulo },
      { property: "og:description", content: descricao },
    ],
  }),
  component: ProgressoPage,
});

function ProgressoPage() {
  const { progresso, pronto, adicionarMeta, guardarNaMeta, removerMeta, reiniciar } = useProgresso();
  const nivel = nivelDe(progresso.pontos);
  const feitas = progresso.licoesConcluidas.length;

  const [nome, setNome] = React.useState("");
  const [alvo, setAlvo] = React.useState("");

  if (!pronto) {
    return <div className="mx-auto max-w-6xl px-4 py-12 text-muted-foreground">Carregando…</div>;
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12">
      <h1 className="text-4xl font-extrabold sm:text-5xl">Meu progresso</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Tudo fica salvo neste dispositivo, sem precisar de cadastro.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Cartao valor={`${progresso.pontos}`} rotulo="pontos acumulados" />
        <Cartao valor={`${feitas}/${totalLicoes}`} rotulo="lições concluídas" />
        <Cartao valor={nivel.atual} rotulo={nivel.proximo ? `faltam ${nivel.faltam} pts para ${nivel.proximo}` : "nível máximo"} />
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-extrabold">Trilhas</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {trilhas.map((t) => {
            const done = t.licoes.filter((l) =>
              progresso.licoesConcluidas.includes(`${t.id}/${l.id}`),
            ).length;
            return (
              <Link
                key={t.id}
                to="/trilhas/$trilhaId"
                params={{ trilhaId: t.id }}
                className="rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:border-primary/40"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold">
                    {t.emoji} {t.titulo} <small className="ml-1 font-medium text-muted-foreground">{t.nivel}</small>
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {done}/{t.licoes.length}
                  </span>
                </div>
                {progresso.provasAprovadas.includes(t.id) && <p className="mt-2 text-xs font-bold text-primary">Prova aprovada</p>}
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${(done / t.licoes.length) * 100}%` }}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-extrabold">Minijogos</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {jogos.map((j) => (
            <Link
              key={j.id}
              to="/jogos/$jogoId"
              params={{ jogoId: j.id }}
              className="rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:border-primary/40"
            >
              <p className="font-bold">
                {j.emoji} {j.nome}
              </p>
              <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Trophy className="size-4" /> Recorde: {progresso.jogos[j.id] ?? 0}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-extrabold">Minhas metas</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Defina um objetivo com valor e registre o quanto já guardou.
        </p>

        <form
          className="mt-5 flex flex-wrap gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            const valor = Number(alvo);
            if (!nome.trim() || !valor || valor <= 0) return;
            adicionarMeta(nome.trim(), valor);
            setNome("");
            setAlvo("");
          }}
        >
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex.: Notebook para estudar"
            aria-label="Nome da meta"
            className="min-w-52 flex-1 rounded-full border-2 border-border bg-card px-5 py-3 text-sm outline-none focus:border-primary"
          />
          <input
            value={alvo}
            onChange={(e) => setAlvo(e.target.value)}
            type="number"
            min={1}
            placeholder="Valor (R$)"
            aria-label="Valor da meta"
            className="w-40 rounded-full border-2 border-border bg-card px-5 py-3 text-sm outline-none focus:border-primary"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
          >
            <Plus className="size-4" /> Criar meta
          </button>
        </form>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {progresso.metas.length === 0 && (
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Target className="size-4" /> Você ainda não tem metas cadastradas.
            </p>
          )}
          {progresso.metas.map((m) => {
            const pct = Math.min(100, Math.round((m.guardado / m.alvo) * 100));
            return (
              <div key={m.id} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold">{m.nome}</p>
                    <p className="text-sm text-muted-foreground">
                      R$ {m.guardado.toLocaleString("pt-BR")} de R$ {m.alvo.toLocaleString("pt-BR")}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remover meta ${m.nome}`}
                    onClick={() => removerMeta(m.id)}
                    className="text-muted-foreground transition hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
                <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[10, 25, 50, 100].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => guardarNaMeta(m.id, v)}
                      className="rounded-full border-2 border-border px-4 py-1.5 text-xs font-bold transition hover:border-primary"
                    >
                      + R$ {v}
                    </button>
                  ))}
                  {pct === 100 && (
                    <span className="rounded-full bg-success/25 px-4 py-1.5 text-xs font-bold">
                      🎉 Meta conquistada!
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <button
        type="button"
        onClick={() => reiniciar()}
        className="mt-14 text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-destructive"
      >
        Zerar meu progresso
      </button>
    </div>
  );
}

function Cartao({ valor, rotulo }: { valor: string; rotulo: string }) {
  return (
    <div className="rounded-3xl bg-ink p-6 text-ink-foreground">
      <p className="font-display text-3xl font-extrabold">{valor}</p>
      <p className="mt-1 text-sm opacity-80">{rotulo}</p>
    </div>
  );
}
