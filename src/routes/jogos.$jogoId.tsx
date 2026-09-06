import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, RotateCcw, Trophy } from "lucide-react";
import * as React from "react";
import { jogos } from "@/lib/poup-content";
import { useProgresso } from "@/lib/poup-progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/jogos/$jogoId")({
  loader: ({ params }) => {
    const jogo = jogos.find((j) => j.id === params.jogoId);
    if (!jogo) throw notFound();
    return { nome: jogo.nome, descricao: jogo.descricao };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Jogo não encontrado | Poup!" }, { name: "robots", content: "noindex" }] };
    }
    const t = `${loaderData.nome} | Poup!`;
    return {
      meta: [
        { title: t },
        { name: "description", content: loaderData.descricao },
        { property: "og:title", content: t },
        { property: "og:description", content: loaderData.descricao },
      ],
    };
  },
  component: JogoPage,
});

function JogoPage() {
  const { jogoId } = Route.useParams();
  const jogo = jogos.find((j) => j.id === jogoId)!;
  const { progresso } = useProgresso();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <Link
        to="/jogos"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Todos os minijogos
      </Link>

      <header className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="text-5xl">{jogo.emoji}</span>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">{jogo.nome}</h1>
          <p className="mt-2 max-w-xl text-muted-foreground">{jogo.descricao}</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-sm font-bold text-secondary-foreground">
          <Trophy className="size-4" /> {progresso.jogos[jogo.id] ?? 0}
        </span>
      </header>

      <div className="mt-8">
        {jogoId === "orcamento-mensal" && <JogoOrcamento />}
        {jogoId === "gasto-ou-guardo" && <JogoEscolhas />}
        {jogoId === "bola-de-neve" && <JogoJuros />}
      </div>
    </div>
  );
}

function Painel({ children }: { children: React.ReactNode }) {
  return <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">{children}</div>;
}

/* ---------- Jogo 1: dividir a mesada ---------- */

const RENDA = 800;

function JogoOrcamento() {
  const { registrarJogo } = useProgresso();
  const [necessidades, setNecessidades] = React.useState(300);
  const [desejos, setDesejos] = React.useState(300);
  const [enviado, setEnviado] = React.useState(false);

  const poupanca = RENDA - necessidades - desejos;
  const ideal = { n: 400, d: 240, p: 160 };
  const desvio =
    Math.abs(necessidades - ideal.n) + Math.abs(desejos - ideal.d) + Math.abs(poupanca - ideal.p);
  const pontos = Math.max(0, Math.round(100 - (desvio / (RENDA * 1.2)) * 100));

  function finalizar() {
    setEnviado(true);
    registrarJogo("orcamento-mensal", pontos);
  }

  return (
    <Painel>
      <p className="text-sm text-muted-foreground">
        Você recebe <strong className="text-foreground">R$ {RENDA}</strong> por mês entre mesada e um
        bico. Distribua o valor entre as três fatias usando a regra 50-30-20 como referência.
      </p>

      <div className="mt-6 space-y-6">
        <Faixa
          rotulo="Necessidades (transporte, comida, material)"
          valor={necessidades}
          max={RENDA}
          cor="bg-primary"
          onChange={(v) => {
            setNecessidades(Math.min(v, RENDA - desejos));
            setEnviado(false);
          }}
        />
        <Faixa
          rotulo="Desejos (lazer, streaming, saídas)"
          valor={desejos}
          max={RENDA}
          cor="bg-warning"
          onChange={(v) => {
            setDesejos(Math.min(v, RENDA - necessidades));
            setEnviado(false);
          }}
        />
        <div>
          <div className="flex items-center justify-between text-sm font-medium">
            <span>Poupança e objetivos (o que sobra)</span>
            <strong className={poupanca < 0 ? "text-destructive" : "text-primary"}>
              R$ {poupanca}
            </strong>
          </div>
          <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-accent"
              style={{ width: `${Math.max(0, (poupanca / RENDA) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={finalizar}
          className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition hover:brightness-110"
        >
          Conferir meu orçamento
        </button>
        <button
          type="button"
          onClick={() => {
            setNecessidades(300);
            setDesejos(300);
            setEnviado(false);
          }}
          className="inline-flex items-center gap-1.5 rounded-full border-2 border-border px-5 py-3 text-sm font-bold"
        >
          <RotateCcw className="size-4" /> Recomeçar
        </button>
      </div>

      {enviado && (
        <div className="mt-6 rounded-2xl bg-secondary/60 p-5">
          <p className="font-display text-2xl font-extrabold text-primary">{pontos} pontos</p>
          <p className="mt-2 text-sm text-muted-foreground">
            A referência 50-30-20 para R$ {RENDA} seria R$ {ideal.n} em necessidades, R$ {ideal.d} em
            desejos e R$ {ideal.p} em poupança.{" "}
            {poupanca <= 0
              ? "Sem nenhuma fatia de poupança, qualquer imprevisto vira dívida."
              : poupanca >= ideal.p
                ? "Ótima fatia de poupança: seu futuro agradece."
                : "Tente aumentar um pouco a poupança cortando desejos."}
          </p>
        </div>
      )}
    </Painel>
  );
}

function Faixa({
  rotulo,
  valor,
  max,
  cor,
  onChange,
}: {
  rotulo: string;
  valor: number;
  max: number;
  cor: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="flex items-center justify-between text-sm font-medium">
        <span>{rotulo}</span>
        <strong>R$ {valor}</strong>
      </label>
      <input
        type="range"
        min={0}
        max={max}
        step={20}
        value={valor}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-primary"
        aria-label={rotulo}
      />
      <div className="mt-1 h-3 w-full overflow-hidden rounded-full bg-muted">
        <div className={cn("h-full rounded-full", cor)} style={{ width: `${(valor / max) * 100}%` }} />
      </div>
    </div>
  );
}

/* ---------- Jogo 2: gasto ou guardo ---------- */

type Situacao = {
  cenario: string;
  opcoes: { texto: string; boa: boolean }[];
  feedback: string;
};

const situacoes: Situacao[] = [
  {
    cenario:
      "Você juntou R$ 300 para um curso. Um tênis que você queria entrou em promoção por R$ 280.",
    opcoes: [
      { texto: "Comprar o tênis agora", boa: false },
      { texto: "Manter o dinheiro do curso e esperar 24h", boa: true },
    ],
    feedback:
      "Promoção não é motivo suficiente para trocar um objetivo definido. A regra das 24 horas evita o arrependimento.",
  },
  {
    cenario: "Sua fatura do cartão é R$ 400 e você só tem R$ 400 no total do mês.",
    opcoes: [
      { texto: "Pagar o mínimo e usar o resto", boa: false },
      { texto: "Pagar a fatura inteira e cortar gastos", boa: true },
    ],
    feedback:
      "O rotativo do cartão é um dos juros mais caros do país. Pagar o total sempre vem antes.",
  },
  {
    cenario: "Você recebeu R$ 200 de presente e não tem nenhuma reserva de emergência.",
    opcoes: [
      { texto: "Guardar em algo seguro e com resgate rápido", boa: true },
      { texto: "Investir tudo em cripto para render mais", boa: false },
    ],
    feedback: "Sem reserva, o primeiro imprevisto vira dívida. Segurança e liquidez vêm primeiro.",
  },
  {
    cenario: "Um amigo oferece um 'investimento' com 20% de lucro garantido por mês.",
    opcoes: [
      { texto: "Entrar com pouco para testar", boa: false },
      { texto: "Recusar: ganho garantido alto é sinal de golpe", boa: true },
    ],
    feedback: "Não existe retorno altíssimo sem risco. Promessa de garantia é o clássico sinal de fraude.",
  },
  {
    cenario: "Você paga 3 assinaturas de streaming, mas só usa uma de verdade.",
    opcoes: [
      { texto: "Cancelar as duas que não usa", boa: true },
      { texto: "Manter, afinal são valores pequenos", boa: false },
    ],
    feedback: "Gastos formiga recorrentes são os que mais corroem o orçamento ao longo do ano.",
  },
  {
    cenario: "Você quer um celular de R$ 2.400 e pode parcelar em 12x de R$ 240.",
    opcoes: [
      { texto: "Parcelar: cabe na mesada deste mês", boa: false },
      { texto: "Calcular o total (R$ 2.880) e comparar à vista", boa: true },
    ],
    feedback:
      "Parcelar sem olhar o total esconde os juros: nesse caso, R$ 480 a mais pelo mesmo aparelho.",
  },
];

function JogoEscolhas() {
  const { registrarJogo } = useProgresso();
  const [i, setI] = React.useState(0);
  const [escolha, setEscolha] = React.useState<number | null>(null);
  const [acertos, setAcertos] = React.useState(0);
  const fim = i >= situacoes.length;

  React.useEffect(() => {
    if (fim) registrarJogo("gasto-ou-guardo", Math.round((acertos / situacoes.length) * 100));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fim]);

  if (fim) {
    return (
      <Painel>
        <p className="font-display text-3xl font-extrabold text-primary">
          {acertos} de {situacoes.length}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {acertos === situacoes.length
            ? "Perfeito! Você já pensa como alguém financeiramente consciente."
            : "Boa! Revise as trilhas de consumo consciente e crédito para melhorar ainda mais."}
        </p>
        <button
          type="button"
          onClick={() => {
            setI(0);
            setAcertos(0);
            setEscolha(null);
          }}
          className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
        >
          <RotateCcw className="size-4" /> Jogar de novo
        </button>
      </Painel>
    );
  }

  const s = situacoes[i]!;
  const respondido = escolha !== null;

  return (
    <Painel>
      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wide text-muted-foreground">
        <span>
          Situação {i + 1} de {situacoes.length}
        </span>
        <span>{acertos} acertos</span>
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-accent transition-all"
          style={{ width: `${(i / situacoes.length) * 100}%` }}
        />
      </div>

      <p className="mt-6 text-lg font-medium">{s.cenario}</p>

      <div className="mt-5 grid gap-3">
        {s.opcoes.map((op, idx) => (
          <button
            key={op.texto}
            type="button"
            disabled={respondido}
            onClick={() => {
              setEscolha(idx);
              if (op.boa) setAcertos((a) => a + 1);
            }}
            className={cn(
              "rounded-2xl border-2 px-5 py-4 text-left text-sm font-medium transition",
              !respondido && "border-border hover:border-primary/60 hover:bg-secondary/50",
              respondido && op.boa && "border-success bg-success/20",
              respondido && !op.boa && escolha === idx && "border-destructive bg-destructive/15",
              respondido && !op.boa && escolha !== idx && "border-border opacity-60",
            )}
          >
            {op.texto}
          </button>
        ))}
      </div>

      {respondido && (
        <div className="mt-5">
          <p className="text-sm text-muted-foreground">{s.feedback}</p>
          <button
            type="button"
            onClick={() => {
              setI(i + 1);
              setEscolha(null);
            }}
            className="mt-4 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
          >
            {i === situacoes.length - 1 ? "Ver resultado" : "Próxima situação"}
          </button>
        </div>
      )}
    </Painel>
  );
}

/* ---------- Jogo 3: bola de neve dos juros ---------- */

type Rodada = { pergunta: string; opcoes: string[]; correta: number; explicacao: string };

const rodadas: Rodada[] = [
  {
    pergunta:
      "Você guarda R$ 100 por mês durante 2 anos, rendendo cerca de 0,8% ao mês. Quanto terá no fim?",
    opcoes: ["Cerca de R$ 2.400", "Cerca de R$ 2.640", "Cerca de R$ 3.500", "Cerca de R$ 5.000"],
    correta: 1,
    explicacao:
      "Você deposita R$ 2.400 e os juros compostos acrescentam aproximadamente R$ 240 no período.",
  },
  {
    pergunta:
      "Uma dívida de R$ 1.000 no rotativo do cartão a 14% ao mês, sem pagar nada, vira quanto em 12 meses?",
    opcoes: ["Cerca de R$ 1.140", "Cerca de R$ 2.680", "Cerca de R$ 4.820", "Cerca de R$ 12.000"],
    correta: 2,
    explicacao:
      "1,14 elevado a 12 resulta em cerca de 4,82. Por isso o rotativo é considerado a dívida mais perigosa.",
  },
  {
    pergunta:
      "Seu dinheiro rendeu 8% no ano e a inflação foi de 5%. Qual foi o seu ganho real aproximado?",
    opcoes: ["13%", "8%", "Cerca de 3%", "Zero"],
    correta: 2,
    explicacao: "O ganho real é o quanto sobra acima da inflação: aproximadamente 3%.",
  },
  {
    pergunta:
      "Quem começa a investir R$ 50 por mês aos 15 anos, comparado a quem começa aos 25, tende a:",
    opcoes: [
      "Ter praticamente o mesmo valor",
      "Ter bem mais, por causa do tempo",
      "Ter menos, porque investe menos",
      "Não fazer diferença",
    ],
    correta: 1,
    explicacao: "Tempo é o ingrediente mais poderoso dos juros compostos — mais até que o valor.",
  },
];

function JogoJuros() {
  const { registrarJogo } = useProgresso();
  const [i, setI] = React.useState(0);
  const [escolha, setEscolha] = React.useState<number | null>(null);
  const [acertos, setAcertos] = React.useState(0);
  const fim = i >= rodadas.length;

  React.useEffect(() => {
    if (fim) registrarJogo("bola-de-neve", Math.round((acertos / rodadas.length) * 100));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fim]);

  if (fim) {
    return (
      <Painel>
        <p className="font-display text-3xl font-extrabold text-primary">
          {acertos} de {rodadas.length}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Juros trabalham a favor de quem investe e contra quem atrasa. Agora você sabe reconhecer os
          dois lados.
        </p>
        <button
          type="button"
          onClick={() => {
            setI(0);
            setAcertos(0);
            setEscolha(null);
          }}
          className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
        >
          <RotateCcw className="size-4" /> Jogar de novo
        </button>
      </Painel>
    );
  }

  const r = rodadas[i]!;
  const respondido = escolha !== null;

  return (
    <Painel>
      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wide text-muted-foreground">
        <span>
          Rodada {i + 1} de {rodadas.length}
        </span>
        <span>{acertos} acertos</span>
      </div>
      <p className="mt-5 text-lg font-medium">{r.pergunta}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {r.opcoes.map((op, idx) => (
          <button
            key={op}
            type="button"
            disabled={respondido}
            onClick={() => {
              setEscolha(idx);
              if (idx === r.correta) setAcertos((a) => a + 1);
            }}
            className={cn(
              "rounded-2xl border-2 px-5 py-4 text-left text-sm font-medium transition",
              !respondido && "border-border hover:border-primary/60 hover:bg-secondary/50",
              respondido && idx === r.correta && "border-success bg-success/20",
              respondido && idx === escolha && idx !== r.correta && "border-destructive bg-destructive/15",
              respondido && idx !== r.correta && idx !== escolha && "border-border opacity-60",
            )}
          >
            {op}
          </button>
        ))}
      </div>
      {respondido && (
        <div className="mt-5">
          <p className="text-sm text-muted-foreground">{r.explicacao}</p>
          <button
            type="button"
            onClick={() => {
              setI(i + 1);
              setEscolha(null);
            }}
            className="mt-4 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
          >
            {i === rodadas.length - 1 ? "Ver resultado" : "Próxima rodada"}
          </button>
        </div>
      )}
    </Painel>
  );
}
