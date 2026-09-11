import * as React from "react";

export type Progresso = {
  licoesConcluidas: string[];
  quizzesAcertados: string[];
  provasAprovadas: string[];
  pontos: number;
  jogos: Record<string, number>;
  metas: Meta[];
};

export type Meta = {
  id: string;
  nome: string;
  alvo: number;
  guardado: number;
};

const CHAVE = "poup-progresso-v1";

const inicial: Progresso = {
  licoesConcluidas: [],
  quizzesAcertados: [],
  provasAprovadas: [],
  pontos: 0,
  jogos: {},
  metas: [],
};

type Ctx = {
  progresso: Progresso;
  pronto: boolean;
  concluirLicao: (id: string, acertouQuiz: boolean) => void;
  aprovarProva: (trilhaId: string) => void;
  registrarJogo: (id: string, pontos: number) => void;
  adicionarMeta: (nome: string, alvo: number) => void;
  guardarNaMeta: (id: string, valor: number) => void;
  removerMeta: (id: string) => void;
  reiniciar: () => void;
};

const ProgressoContext = React.createContext<Ctx | null>(null);

export function ProgressoProvider({ children }: { children: React.ReactNode }) {
  const [progresso, setProgresso] = React.useState<Progresso>(inicial);
  const [pronto, setPronto] = React.useState(false);

  React.useEffect(() => {
    try {
      const bruto = localStorage.getItem(CHAVE);
      if (bruto) setProgresso({ ...inicial, ...JSON.parse(bruto) });
    } catch {
      /* ignora */
    }
    setPronto(true);
  }, []);

  React.useEffect(() => {
    if (!pronto) return;
    try {
      localStorage.setItem(CHAVE, JSON.stringify(progresso));
    } catch {
      /* ignora */
    }
  }, [progresso, pronto]);

  const valor = React.useMemo<Ctx>(
    () => ({
      progresso,
      pronto,
      concluirLicao: (id, acertouQuiz) =>
        setProgresso((p) => {
          const jaFeita = p.licoesConcluidas.includes(id);
          const jaAcertou = p.quizzesAcertados.includes(id);
          return {
            ...p,
            licoesConcluidas: jaFeita ? p.licoesConcluidas : [...p.licoesConcluidas, id],
            quizzesAcertados:
              acertouQuiz && !jaAcertou ? [...p.quizzesAcertados, id] : p.quizzesAcertados,
            pontos: p.pontos + (jaFeita ? 0 : 20) + (acertouQuiz && !jaAcertou ? 30 : 0),
          };
        }),
      aprovarProva: (trilhaId) =>
        setProgresso((p) => {
          if (p.provasAprovadas.includes(trilhaId)) return p;
          return {
            ...p,
            provasAprovadas: [...p.provasAprovadas, trilhaId],
            pontos: p.pontos + 100,
          };
        }),
      registrarJogo: (id, pontos) =>
        setProgresso((p) => {
          const anterior = p.jogos[id] ?? 0;
          const ganho = Math.max(0, pontos - anterior);
          return {
            ...p,
            jogos: { ...p.jogos, [id]: Math.max(anterior, pontos) },
            pontos: p.pontos + ganho,
          };
        }),
      adicionarMeta: (nome, alvo) =>
        setProgresso((p) => ({
          ...p,
          metas: [
            ...p.metas,
            { id: `${Date.now()}`, nome, alvo, guardado: 0 },
          ],
        })),
      guardarNaMeta: (id, valorGuardado) =>
        setProgresso((p) => ({
          ...p,
          metas: p.metas.map((m) =>
            m.id === id ? { ...m, guardado: Math.max(0, m.guardado + valorGuardado) } : m,
          ),
        })),
      removerMeta: (id) =>
        setProgresso((p) => ({ ...p, metas: p.metas.filter((m) => m.id !== id) })),
      reiniciar: () => setProgresso(inicial),
    }),
    [progresso, pronto],
  );

  return <ProgressoContext.Provider value={valor}>{children}</ProgressoContext.Provider>;
}

export function useProgresso() {
  const ctx = React.useContext(ProgressoContext);
  if (!ctx) throw new Error("useProgresso precisa estar dentro de ProgressoProvider");
  return ctx;
}

export function nivelDe(pontos: number) {
  const niveis = [
    { nome: "Poupador Iniciante", min: 0 },
    { nome: "Organizador", min: 100 },
    { nome: "Planejador", min: 250 },
    { nome: "Investidor Jr.", min: 450 },
    { nome: "Mestre das Finanças", min: 700 },
  ];
  const atual = [...niveis].reverse().find((n) => pontos >= n.min) ?? niveis[0];
  const proximo = niveis.find((n) => n.min > pontos);
  return { atual: atual?.nome ?? "Poupador Iniciante", proximo: proximo?.nome, faltam: proximo ? proximo.min - pontos : 0 };
}
