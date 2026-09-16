import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, RotateCcw, Trophy } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { jogos } from "@/lib/poup-content";
import { useProgresso } from "@/lib/poup-progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/jogos/$jogoId")({
  loader: ({ params }) => {
    const jogo = jogos.find((item) => item.id === params.jogoId);
    if (!jogo) throw notFound();
    return { nome: jogo.nome, descricao: jogo.descricao };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Jogo não encontrado | Poup!" }, { name: "robots", content: "noindex" }] };
    const titulo = `${loaderData.nome} | Poup!`;
    return { meta: [{ title: titulo }, { name: "description", content: loaderData.descricao }, { property: "og:title", content: titulo }, { property: "og:description", content: loaderData.descricao }] };
  },
  component: JogoPage,
});

type Opcao = { texto: string; correta: boolean };
type Rodada = { pergunta: string; opcoes: Opcao[]; explicacao: string };

type RodadaBase = {
  pergunta: string;
  respostas: string[];
  correta: number;
  explicacao: string;
};

function embaralhar<T>(itens: T[]) {
  return [...itens].sort(() => Math.random() - 0.5);
}

function preparar(pool: RodadaBase[], limite = 5): Rodada[] {
  return embaralhar(pool).slice(0, Math.min(limite, pool.length)).map((rodada) => ({
    pergunta: rodada.pergunta,
    explicacao: rodada.explicacao,
    opcoes: embaralhar(rodada.respostas.map((texto, index) => ({ texto, correta: index === rodada.correta }))),
  }));
}

function JogoPage() {
  const { jogoId } = Route.useParams();
  const jogo = jogos.find((item) => item.id === jogoId);
  const { progresso } = useProgresso();
  if (!jogo) return null;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <Link to="/jogos" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
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
        {jogoId === "orcamento-mensal" ? <JogoOrcamento /> : <JogoPerguntas jogoId={jogoId} pool={bancos[jogoId] ?? []} />}
      </div>
    </div>
  );
}

function Painel({ children }: { children: React.ReactNode }) {
  return <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">{children}</div>;
}

function JogoOrcamento() {
  const { registrarJogo } = useProgresso();
  const [renda, setRenda] = React.useState(800);
  const [necessidades, setNecessidades] = React.useState(300);
  const [desejos, setDesejos] = React.useState(300);
  const [enviado, setEnviado] = React.useState(false);
  const poupanca = renda - necessidades - desejos;
  const ideal = { n: renda * 0.5, d: renda * 0.3, p: renda * 0.2 };
  const desvio = Math.abs(necessidades - ideal.n) + Math.abs(desejos - ideal.d) + Math.abs(poupanca - ideal.p);
  const pontos = Math.max(0, Math.round(100 - (desvio / (renda * 1.2)) * 100));

  function reiniciar() {
    const novaRenda = [600, 800, 1000, 1200][Math.floor(Math.random() * 4)] ?? 800;
    setRenda(novaRenda);
    setNecessidades(Math.round(novaRenda * 0.4 / 20) * 20);
    setDesejos(Math.round(novaRenda * 0.35 / 20) * 20);
    setEnviado(false);
  }

  React.useEffect(reiniciar, []);

  return (
    <Painel>
      <p className="text-sm text-muted-foreground">Você recebe <strong className="text-foreground">R$ {renda}</strong> neste mês. Distribua o valor usando a regra 50-30-20 como referência.</p>
      <div className="mt-6 space-y-6">
        <Faixa rotulo="Necessidades" valor={necessidades} max={renda} cor="bg-primary" onChange={(valor) => { setNecessidades(Math.min(valor, renda - desejos)); setEnviado(false); }} />
        <Faixa rotulo="Desejos" valor={desejos} max={renda} cor="bg-warning" onChange={(valor) => { setDesejos(Math.min(valor, renda - necessidades)); setEnviado(false); }} />
        <div>
          <div className="flex items-center justify-between text-sm font-medium"><span>Poupança e objetivos</span><strong className="text-primary">R$ {poupanca}</strong></div>
          <div className="mt-2 h-3 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-accent" style={{ width: `${Math.max(0, poupanca / renda * 100)}%` }} /></div>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button className="h-11 rounded-full px-6 font-bold" onClick={() => { setEnviado(true); registrarJogo("orcamento-mensal", pontos); }}>Conferir orçamento</Button>
        <Button variant="outline" className="h-11 rounded-full px-5 font-bold" onClick={reiniciar}><RotateCcw /> Novo desafio</Button>
      </div>
      {enviado && <div className="mt-6 rounded-2xl bg-secondary/60 p-5"><p className="text-2xl font-extrabold text-primary">{pontos} pontos</p><p className="mt-2 text-sm text-muted-foreground">A divisão de referência seria R$ {ideal.n}, R$ {ideal.d} e R$ {ideal.p}. Cada novo desafio sorteia uma renda diferente.</p></div>}
    </Painel>
  );
}

function Faixa({ rotulo, valor, max, cor, onChange }: { rotulo: string; valor: number; max: number; cor: string; onChange: (valor: number) => void }) {
  return <div><label className="flex items-center justify-between text-sm font-medium"><span>{rotulo}</span><strong>R$ {valor}</strong></label><input type="range" min={0} max={max} step={20} value={valor} onChange={(evento) => onChange(Number(evento.target.value))} className="mt-3 w-full accent-primary" aria-label={rotulo} /><div className="mt-1 h-3 overflow-hidden rounded-full bg-muted"><div className={cn("h-full rounded-full", cor)} style={{ width: `${valor / max * 100}%` }} /></div></div>;
}

function JogoPerguntas({ jogoId, pool }: { jogoId: string; pool: RodadaBase[] }) {
  const { registrarJogo } = useProgresso();
  const [rodadas, setRodadas] = React.useState(() => preparar(pool));
  const [indice, setIndice] = React.useState(0);
  const [escolha, setEscolha] = React.useState<number | null>(null);
  const [acertos, setAcertos] = React.useState(0);
  const fim = indice >= rodadas.length;

  function reiniciar() {
    setRodadas(preparar(pool));
    setIndice(0);
    setEscolha(null);
    setAcertos(0);
  }

  React.useEffect(() => { reiniciar(); }, [jogoId]);
  React.useEffect(() => { if (fim && rodadas.length) registrarJogo(jogoId, Math.round(acertos / rodadas.length * 100)); }, [fim, acertos, jogoId, registrarJogo, rodadas.length]);

  if (fim) return <Painel><p className="text-3xl font-extrabold text-primary">{acertos} de {rodadas.length}</p><p className="mt-2 text-sm text-muted-foreground">Sua pontuação foi registrada. A próxima partida terá perguntas e alternativas em outra ordem.</p><Button className="mt-6 h-11 rounded-full px-6 font-bold" onClick={reiniciar}><RotateCcw /> Jogar novamente</Button></Painel>;
  const rodada = rodadas[indice];
  if (!rodada) return <Painel><p className="text-sm text-muted-foreground">Este desafio está sendo preparado.</p></Painel>;
  const respondido = escolha !== null;

  return <Painel>
    <div className="flex justify-between text-xs font-bold uppercase tracking-wide text-muted-foreground"><span>Rodada {indice + 1} de {rodadas.length}</span><span>{acertos} acertos</span></div>
    <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-accent transition-all" style={{ width: `${indice / rodadas.length * 100}%` }} /></div>
    <p className="mt-6 text-lg font-medium">{rodada.pergunta}</p>
    <div className="mt-5 grid gap-3">
      {rodada.opcoes.map((opcao, opcaoIndice) => <Button key={opcao.texto} variant="outline" disabled={respondido} onClick={() => { setEscolha(opcaoIndice); if (opcao.correta) setAcertos((valor) => valor + 1); }} className={cn("h-auto min-h-12 justify-start whitespace-normal rounded-2xl border-2 px-5 py-4 text-left", !respondido && "hover:border-primary/60", respondido && opcao.correta && "border-success bg-success/20", respondido && !opcao.correta && escolha === opcaoIndice && "border-destructive bg-destructive/15", respondido && !opcao.correta && escolha !== opcaoIndice && "opacity-50")}>{opcao.texto}</Button>)}
    </div>
    {respondido && <div className="mt-5"><p className="text-sm text-muted-foreground">{rodada.explicacao}</p><Button className="mt-4 h-11 rounded-full px-6 font-bold" onClick={() => { setIndice((valor) => valor + 1); setEscolha(null); }}>{indice === rodadas.length - 1 ? "Ver resultado" : "Próxima rodada"}</Button></div>}
  </Painel>;
}

const bancos: Record<string, RodadaBase[]> = {
  "gasto-ou-guardo": [
    { pergunta: "Você juntou R$ 300 para um curso e um tênis de R$ 280 entrou em promoção. O que fazer?", respostas: ["Manter o curso e esperar 24 horas", "Comprar imediatamente"], correta: 0, explicacao: "Uma promoção não deve substituir uma meta definida sem reflexão." },
    { pergunta: "Sua fatura é R$ 400 e você tem exatamente R$ 400. Qual decisão evita juros?", respostas: ["Pagar o mínimo", "Pagar a fatura inteira e ajustar gastos"], correta: 1, explicacao: "O rotativo do cartão tem juros muito altos." },
    { pergunta: "Você recebeu R$ 200 e ainda não possui reserva. Qual prioridade?", respostas: ["Guardar com segurança e liquidez", "Investir tudo em um ativo arriscado"], correta: 0, explicacao: "A reserva evita que o próximo imprevisto vire dívida." },
    { pergunta: "Uma promessa oferece 20% de lucro garantido ao mês. Como agir?", respostas: ["Testar com pouco", "Recusar e verificar a instituição"], correta: 1, explicacao: "Retorno altíssimo garantido é um sinal clássico de fraude." },
    { pergunta: "Você usa só uma de três assinaturas. Qual escolha favorece sua meta?", respostas: ["Cancelar as duas sem uso", "Manter porque cada uma custa pouco"], correta: 0, explicacao: "Gastos pequenos e recorrentes se acumulam." },
    { pergunta: "Um celular custa R$ 2.400 à vista ou 12x de R$ 240. O que comparar?", respostas: ["Só o valor da parcela", "O total de R$ 2.880 com o preço à vista"], correta: 1, explicacao: "O total revela R$ 480 de custo adicional." },
  ],
  "bola-de-neve": [
    { pergunta: "R$ 1.000 a 10% ao mês por dois meses viram quanto?", respostas: ["R$ 1.200", "R$ 1.210", "R$ 1.100"], correta: 1, explicacao: "Nos juros compostos: 1.000 × 1,1 × 1,1 = 1.210." },
    { pergunta: "Um investimento rendeu 8% e a inflação foi 5%. Qual ganho real aproximado?", respostas: ["13%", "3%", "8%"], correta: 1, explicacao: "A aproximação é o rendimento menos a inflação." },
    { pergunta: "Quem começa a investir dez anos antes tende a ganhar o quê?", respostas: ["Mais ciclos de juros compostos", "Uma taxa garantida maior", "Isenção de riscos"], correta: 0, explicacao: "Tempo permite que rendimentos gerem novos rendimentos." },
    { pergunta: "Uma dívida de R$ 500 cresce 20%. Qual o novo saldo?", respostas: ["R$ 520", "R$ 600", "R$ 700"], correta: 1, explicacao: "20% de 500 são 100; o saldo passa a 600." },
    { pergunta: "Se o rendimento é igual à inflação, o poder de compra faz o quê?", respostas: ["Praticamente se mantém", "Dobra", "Cai pela metade"], correta: 0, explicacao: "Sem ganho real, o rendimento apenas acompanha os preços." },
    { pergunta: "Qual dívida deve ser priorizada normalmente?", respostas: ["A de juros mais altos", "A de parcela visualmente menor", "A mais recente"], correta: 0, explicacao: "Atacar taxas maiores reduz o custo da bola de neve." },
  ],
  "reserva-de-emergencia": [
    { pergunta: "Se seus gastos essenciais são R$ 900, qual seria uma primeira meta de reserva?", respostas: ["R$ 90", "R$ 900", "R$ 9.000"], correta: 1, explicacao: "Um mês de gastos já é uma primeira proteção relevante." },
    { pergunta: "Qual lugar combina melhor com uma reserva?", respostas: ["Seguro e com resgate rápido", "Volátil e sem liquidez", "Bloqueado por cinco anos"], correta: 0, explicacao: "Emergências exigem segurança e acesso rápido." },
    { pergunta: "Qual situação é uma emergência real?", respostas: ["Celular quebrado usado para trabalhar", "Ingresso em promoção", "Nova roupa para uma festa"], correta: 0, explicacao: "Emergência é inesperada, necessária e urgente." },
    { pergunta: "Após usar parte da reserva, qual próximo passo?", respostas: ["Recompor gradualmente", "Cancelar a meta", "Investir o restante em alto risco"], correta: 0, explicacao: "Recompor restaura sua proteção." },
    { pergunta: "Renda instável pede uma reserva como?", respostas: ["Tendencialmente maior", "Sempre menor", "Desnecessária"], correta: 0, explicacao: "Mais incerteza de renda exige maior margem." },
    { pergunta: "Você tem dívida cara e nenhuma reserva. Qual equilíbrio inicial?", respostas: ["Criar pequena proteção e atacar a dívida", "Ignorar a dívida", "Guardar tudo sem pagar juros"], correta: 0, explicacao: "Uma reserva mínima evita nova dívida enquanto o saldo caro é reduzido." },
  ],
  "detetive-do-credito": [
    { pergunta: "Empréstimo A custa 6x de R$ 190; B custa 8x de R$ 150. Qual tem menor total?", respostas: ["A: R$ 1.140", "B: R$ 1.200", "São iguais"], correta: 0, explicacao: "Somar parcelas revela o custo: A é R$ 60 mais barato." },
    { pergunta: "Qual indicador reúne juros, tarifas e seguros?", respostas: ["CET", "Limite", "Entrada"], correta: 0, explicacao: "O Custo Efetivo Total facilita comparar propostas." },
    { pergunta: "Uma parcela cabe, mas o total é muito maior que o preço à vista. O que isso indica?", respostas: ["Crédito caro", "Desconto", "Juro zero"], correta: 0, explicacao: "Parcela baixa pode esconder prazo longo e custo elevado." },
    { pergunta: "Renegociar uma dívida é vantajoso quando:", respostas: ["O novo custo é menor e as parcelas cabem", "A parcela diminui, mesmo com total dobrado", "Não se lê o contrato"], correta: 0, explicacao: "Acordo sustentável considera custo total e orçamento." },
    { pergunta: "Qual prática protege contra o rotativo?", respostas: ["Pagar a fatura integral", "Pagar sempre o mínimo", "Usar todo o limite"], correta: 0, explicacao: "Pagar integralmente evita os juros do rotativo." },
    { pergunta: "Crédito deve ser tratado como:", respostas: ["Renda extra", "Dinheiro futuro comprometido", "Desconto automático"], correta: 1, explicacao: "Cada parcela reduz a renda disponível dos meses seguintes." },
  ],
  "monte-sua-carteira": [
    { pergunta: "Dinheiro da reserva deve priorizar:", respostas: ["Liquidez e segurança", "Máximo risco", "Prazo de dez anos"], correta: 0, explicacao: "A função da reserva é estar disponível quando necessária." },
    { pergunta: "Uma meta para daqui a 15 anos pode aceitar:", respostas: ["Alguma oscilação com diversificação", "Somente dinheiro em espécie", "Dívida cara"], correta: 0, explicacao: "Prazos longos permitem lidar melhor com oscilações." },
    { pergunta: "Diversificar significa:", respostas: ["Distribuir riscos entre ativos e classes", "Comprar muitos ativos iguais", "Eliminar todo risco"], correta: 0, explicacao: "Diversificação reduz a dependência de um único resultado." },
    { pergunta: "Se um ativo cresceu e dominou a carteira, você pode:", respostas: ["Rebalancear para o plano", "Concentrar ainda mais", "Ignorar o risco"], correta: 0, explicacao: "Rebalancear recupera as proporções e o risco planejados." },
    { pergunta: "Para comparar investimentos, observe:", respostas: ["Retorno líquido, risco, prazo e liquidez", "Só o melhor mês", "Somente a propaganda"], correta: 0, explicacao: "A comparação precisa considerar o conjunto de características." },
    { pergunta: "Qual afirmação é correta?", respostas: ["Retorno passado não garante retorno futuro", "Alto retorno é sempre garantido", "Risco não importa no longo prazo"], correta: 0, explicacao: "Histórico é informação, não promessa." },
  ],
};
