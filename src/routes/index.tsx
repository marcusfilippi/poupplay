import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Gamepad2, LineChart, Target, Wallet } from "lucide-react";
import heroImg from "@/assets/poup-hero.jpg";
import { trilhas, jogos, totalLicoes } from "@/lib/poup-content";
import { useProgresso, nivelDe } from "@/lib/poup-progress";

const titulo = "Poup! — Educação financeira gamificada para jovens";
const descricao =
  "Aprenda orçamento, economia, crédito e investimentos com trilhas curtas, minijogos e acompanhamento de progresso. Grátis e feito para estudantes.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: titulo },
      { name: "description", content: descricao },
      { property: "og:title", content: titulo },
      { property: "og:description", content: descricao },
    ],
  }),
  component: Index,
});

const pilares = [
  {
    icone: Wallet,
    titulo: "Conteúdo simples",
    texto: "Lições curtas sobre orçamento, gastos, economia e planejamento, em linguagem do dia a dia.",
  },
  {
    icone: Gamepad2,
    titulo: "Minijogos práticos",
    texto: "Situações reais para você aplicar o que aprendeu e ver o resultado das suas escolhas.",
  },
  {
    icone: Target,
    titulo: "Metas de verdade",
    texto: "Defina objetivos com valor e prazo e acompanhe cada passo até conquistar.",
  },
  {
    icone: LineChart,
    titulo: "Juros e investimentos",
    texto: "Entenda juros, inflação, crédito e os primeiros investimentos sem termos complicados.",
  },
];

function Index() {
  const { progresso, pronto } = useProgresso();
  const nivel = nivelDe(progresso.pontos);

  return (
    <div>
      <section className="surface-grid border-b border-border/70">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
              Educação financeira para jovens
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] sm:text-5xl md:text-6xl">
              Dinheiro deixa de ser <span className="text-gradient-poup">assunto difícil</span> aqui.
            </h1>
            <p className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">
              O número de jovens endividados dobrou entre 2016 e 2024, e educação financeira ainda
              não é matéria obrigatória na escola. O Poup! preenche essa lacuna com trilhas curtas,
              minijogos e progresso visível.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/trilhas"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-soft transition hover:brightness-110"
              >
                Começar a aprender <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/jogos"
                className="inline-flex items-center gap-2 rounded-full border-2 border-ink/15 bg-card px-6 py-3 text-sm font-bold transition hover:bg-secondary"
              >
                Jogar agora
              </Link>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
              {[
                { k: `${trilhas.length}`, v: "trilhas" },
                { k: `${totalLicoes}`, v: "lições" },
                { k: `${jogos.length}`, v: "minijogos" },
              ].map((i) => (
                <div key={i.v} className="rounded-2xl bg-card p-4 shadow-soft">
                  <dt className="font-display text-3xl font-extrabold text-primary">{i.k}</dt>
                  <dd className="text-xs uppercase tracking-wide text-muted-foreground">{i.v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative">
            <img
              src={heroImg}
              width={1280}
              height={1024}
              alt="Jovens estudantes acompanhando o progresso das economias em um aplicativo"
              className="w-full rounded-[2rem] border border-border bg-card shadow-soft"
            />
          </div>
        </div>
      </section>

      {pronto && progresso.pontos > 0 && (
        <section className="mx-auto w-full max-w-6xl px-4 pt-10">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-ink px-6 py-5 text-ink-foreground">
            <div>
              <p className="text-sm opacity-80">Continue de onde parou</p>
              <p className="font-display text-xl font-bold">
                {nivel.atual} · {progresso.pontos} pontos
              </p>
            </div>
            <Link
              to="/progresso"
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground"
            >
              Ver meu progresso
            </Link>
          </div>
        </section>
      )}

      <section className="mx-auto w-full max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-extrabold sm:text-4xl">O que você encontra no Poup!</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pilares.map((p) => (
            <div key={p.titulo} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
                <p.icone className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-bold">{p.titulo}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border/70 bg-secondary/40">
        <div className="mx-auto w-full max-w-6xl px-4 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Trilhas de aprendizado</h2>
            <Link to="/trilhas" className="text-sm font-bold text-primary hover:underline">
              Ver todas
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {trilhas.slice(0, 4).map((t) => (
              <Link
                key={t.id}
                to="/trilhas/$trilhaId"
                params={{ trilhaId: t.id }}
                className="group rounded-3xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-primary/40"
              >
                <span className="text-3xl">{t.emoji}</span>
                <span className="ml-3 rounded-full bg-secondary px-2.5 py-1 text-xs font-bold text-secondary-foreground">{t.nivel}</span>
                <h3 className="mt-3 text-xl font-bold">{t.titulo}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t.subtitulo}</p>
                <p className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary">
                  {t.licoes.length} lições <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16">
        <div className="rounded-[2rem] bg-ink px-6 py-12 text-center text-ink-foreground sm:px-12">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Aprender sobre dinheiro pode ser divertido
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm opacity-80 sm:text-base">
            Ganhe pontos a cada lição concluída e a cada minijogo vencido. Sem cadastro, sem custo,
            funciona no celular e no computador.
          </p>
          <Link
            to="/trilhas"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-bold text-accent-foreground"
          >
            Começar agora <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
