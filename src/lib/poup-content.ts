export type Quiz = {
  pergunta: string;
  opcoes: string[];
  correta: number;
  explicacao: string;
};

export type Licao = {
  id: string;
  titulo: string;
  resumo: string;
  minutos: number;
  paragrafos: string[];
  dica: string;
  quiz: Quiz;
};

export type Trilha = {
  id: string;
  titulo: string;
  subtitulo: string;
  emoji: string;
  cor: "primary" | "accent" | "warning" | "chart";
  licoes: Licao[];
};

export const trilhas: Trilha[] = [
  {
    id: "orcamento",
    titulo: "Orçamento pessoal",
    subtitulo: "Saiba para onde vai cada real que entra no seu bolso.",
    emoji: "🧾",
    cor: "primary",
    licoes: [
      {
        id: "o-que-e-orcamento",
        titulo: "O que é um orçamento",
        resumo: "Um mapa simples do dinheiro que entra e do que sai.",
        minutos: 4,
        paragrafos: [
          "Orçamento é só um combinado com você mesmo: escrever quanto dinheiro entra (mesada, bico, estágio, presente) e quanto sai (lanche, transporte, jogo, roupa).",
          "Sem esse registro, o dinheiro parece 'sumir'. Com ele, você enxerga padrões: talvez o lanche diário custe mais no mês do que aquele tênis que você acha caro.",
          "Um orçamento não serve para te proibir de gastar. Ele serve para você gastar com consciência, sabendo que o essencial já está garantido.",
        ],
        dica: "Anote seus gastos por 7 dias seguidos. Só isso já muda o comportamento da maioria das pessoas.",
        quiz: {
          pergunta: "Qual é o principal objetivo de fazer um orçamento pessoal?",
          opcoes: [
            "Parar completamente de gastar dinheiro",
            "Enxergar entradas e saídas para decidir melhor",
            "Ficar rico em um mês",
            "Guardar todo o dinheiro no colchão",
          ],
          correta: 1,
          explicacao:
            "O orçamento é uma ferramenta de visão: ele mostra a realidade do seu dinheiro para você escolher melhor.",
        },
      },
      {
        id: "regra-50-30-20",
        titulo: "A regra 50-30-20",
        resumo: "Uma divisão fácil de lembrar para organizar qualquer renda.",
        minutos: 5,
        paragrafos: [
          "A regra 50-30-20 sugere dividir o que você recebe em três partes: 50% para necessidades, 30% para desejos e 20% para poupança e objetivos.",
          "Necessidades são coisas que você não consegue cortar sem prejuízo: transporte para a escola, material, alimentação. Desejos são o que dá prazer: streaming, saídas, skins de jogo.",
          "Se sua renda é pequena, adapte as porcentagens — o importante é que a fatia da poupança exista, mesmo que seja 5%.",
        ],
        dica: "Automatize: assim que o dinheiro entrar, separe a fatia da poupança antes de gastar qualquer coisa.",
        quiz: {
          pergunta: "Na regra 50-30-20, os 20% correspondem a quê?",
          opcoes: [
            "Desejos e lazer",
            "Necessidades básicas",
            "Poupança e objetivos financeiros",
            "Impostos",
          ],
          correta: 2,
          explicacao:
            "Os 20% são a fatia que constrói seu futuro: reserva de emergência, metas e investimentos.",
        },
      },
      {
        id: "controle-de-gastos",
        titulo: "Controle de gastos no dia a dia",
        resumo: "Pequenos gastos repetidos são os que mais pesam.",
        minutos: 4,
        paragrafos: [
          "Gastos formiga são aquelas despesas pequenas e frequentes que passam despercebidas. R$ 8 por dia em lanche viram cerca de R$ 240 por mês.",
          "Registrar não significa se privar: significa escolher quais formigas valem a pena. Talvez o café com os amigos valha, e a assinatura que você não usa não valha.",
          "Use categorias simples: alimentação, transporte, lazer, estudos e outros. Cinco categorias já revelam quase tudo.",
        ],
        dica: "Revise assinaturas a cada 3 meses. Cancelar uma que você não usa é um aumento de salário instantâneo.",
        quiz: {
          pergunta: "O que são 'gastos formiga'?",
          opcoes: [
            "Dívidas de longo prazo",
            "Gastos pequenos e frequentes que somam muito no mês",
            "Investimentos de baixo risco",
            "Impostos cobrados em compras",
          ],
          correta: 1,
          explicacao:
            "Eles são pequenos individualmente, mas a repetição transforma centavos em um valor alto no fim do mês.",
        },
      },
    ],
  },
  {
    id: "economia",
    titulo: "Economizar e planejar",
    subtitulo: "Transforme vontade em meta e meta em conquista.",
    emoji: "🎯",
    cor: "accent",
    licoes: [
      {
        id: "reserva-emergencia",
        titulo: "Reserva de emergência",
        resumo: "O colchão que evita que um imprevisto vire uma dívida.",
        minutos: 4,
        paragrafos: [
          "Reserva de emergência é um dinheiro guardado para o inesperado: o celular que quebrou, a consulta que apareceu, o mês em que o bico não veio.",
          "Ela precisa ficar em algo seguro e de resgate rápido. Não adianta ter reserva presa por 2 anos.",
          "Para jovens, começar com o equivalente a um mês de gastos já muda muita coisa: é a diferença entre resolver o problema e recorrer ao cartão de crédito.",
        ],
        dica: "Dê um nome à sua reserva. Dinheiro com nome é muito mais difícil de gastar por impulso.",
        quiz: {
          pergunta: "Qual característica é essencial para a reserva de emergência?",
          opcoes: [
            "Render o máximo possível, mesmo com risco alto",
            "Estar disponível rapidamente e com segurança",
            "Ficar bloqueada por vários anos",
            "Estar em criptomoedas",
          ],
          correta: 1,
          explicacao: "Liquidez e segurança vêm antes de rentabilidade quando falamos de emergência.",
        },
      },
      {
        id: "metas-smart",
        titulo: "Metas que realmente funcionam",
        resumo: "Objetivo vago não sai do papel. Objetivo com número, sai.",
        minutos: 5,
        paragrafos: [
          "'Quero juntar dinheiro' não é uma meta. 'Quero juntar R$ 1.200 em 10 meses para um notebook' é.",
          "Uma boa meta tem valor, prazo e motivo. Com esses três, você calcula quanto precisa guardar por mês: R$ 1.200 ÷ 10 = R$ 120.",
          "Divida metas grandes em etapas visíveis. Comemorar os 25% concluídos mantém a motivação viva.",
        ],
        dica: "Coloque a foto do seu objetivo na tela de bloqueio do celular. Lembrete visual reduz compras por impulso.",
        quiz: {
          pergunta: "Você quer juntar R$ 900 em 6 meses. Quanto precisa guardar por mês?",
          opcoes: ["R$ 90", "R$ 120", "R$ 150", "R$ 180"],
          correta: 2,
          explicacao: "R$ 900 dividido por 6 meses resulta em R$ 150 por mês.",
        },
      },
      {
        id: "consumo-consciente",
        titulo: "Consumo consciente",
        resumo: "Separar desejo de necessidade é uma habilidade treinável.",
        minutos: 4,
        paragrafos: [
          "Antes de comprar, faça três perguntas: eu preciso disso agora? Eu teria comprado se não estivesse em promoção? Isso me aproxima ou me afasta da minha meta?",
          "A regra das 24 horas ajuda: para compras não essenciais, espere um dia. Boa parte da vontade some sozinha.",
          "Publicidade e redes sociais são projetadas para criar urgência. Perceber isso já é meio caminho para não cair.",
        ],
        dica: "Converta o preço em horas de trabalho ou em fatias da sua meta. O valor real fica muito mais claro.",
        quiz: {
          pergunta: "A 'regra das 24 horas' sugere que você:",
          opcoes: [
            "Compre rápido antes que a promoção acabe",
            "Espere um dia antes de compras não essenciais",
            "Parcele tudo em 24 vezes",
            "Só compre uma vez por dia",
          ],
          correta: 1,
          explicacao: "Esperar 24 horas reduz a compra por impulso, que é movida por emoção momentânea.",
        },
      },
    ],
  },
  {
    id: "credito",
    titulo: "Crédito e dívidas",
    subtitulo: "Entenda juros antes que eles entendam você.",
    emoji: "💳",
    cor: "warning",
    licoes: [
      {
        id: "juros",
        titulo: "Juros simples e compostos",
        resumo: "O mesmo mecanismo que multiplica dívidas multiplica investimentos.",
        minutos: 5,
        paragrafos: [
          "Juros são o preço do dinheiro no tempo. Nos juros simples, o cálculo incide sempre sobre o valor inicial. Nos compostos, incide sobre o valor que já cresceu.",
          "R$ 1.000 a 10% ao mês por 12 meses vira R$ 2.200 com juros simples e cerca de R$ 3.138 com juros compostos.",
          "Quando você investe, o juro composto trabalha a seu favor. Quando você atrasa uma fatura, ele trabalha contra você — e o rotativo do cartão pode passar de 400% ao ano.",
        ],
        dica: "Nunca pague o 'valor mínimo' da fatura por hábito. É o caminho mais rápido para a bola de neve.",
        quiz: {
          pergunta: "Nos juros compostos, o cálculo do período seguinte incide sobre:",
          opcoes: [
            "Sempre o valor inicial",
            "O valor acumulado, incluindo juros anteriores",
            "Apenas o valor dos juros",
            "Um valor fixo definido pelo banco",
          ],
          correta: 1,
          explicacao: "É o famoso 'juros sobre juros', que faz o valor crescer de forma exponencial.",
        },
      },
      {
        id: "cartao-e-parcelas",
        titulo: "Cartão, parcelas e empréstimos",
        resumo: "Crédito não é renda extra: é dinheiro do seu futuro.",
        minutos: 5,
        paragrafos: [
          "Cartão de crédito é uma ferramenta de prazo, não de aumento de renda. Tudo que você parcela hoje reduz o seu orçamento dos próximos meses.",
          "Antes de parcelar, some todas as parcelas já assumidas. Se o total passa de 30% da sua renda, o sinal é vermelho.",
          "Em empréstimos, compare sempre o CET (Custo Efetivo Total), não só a taxa divulgada: ele inclui tarifas e seguros.",
        ],
        dica: "Se a compra parcelada não cabe à vista no seu orçamento em algum momento, ela provavelmente não cabe.",
        quiz: {
          pergunta: "O CET de um empréstimo representa:",
          opcoes: [
            "Só a taxa de juros mensal",
            "O custo total, incluindo tarifas e seguros",
            "O valor das parcelas sem juros",
            "Um imposto do governo",
          ],
          correta: 1,
          explicacao: "O CET mostra quanto o crédito custa de verdade, somando todos os encargos.",
        },
      },
      {
        id: "inflacao",
        titulo: "Inflação: o ladrão silencioso",
        resumo: "Dinheiro parado perde poder de compra todo ano.",
        minutos: 4,
        paragrafos: [
          "Inflação é o aumento geral dos preços. Se ela foi de 5% no ano, os R$ 100 guardados na gaveta compram hoje o que R$ 95 compravam antes.",
          "Por isso guardar dinheiro parado não é neutro: é uma perda silenciosa.",
          "Um investimento só te faz ganhar de verdade se render acima da inflação. Esse é o chamado ganho real.",
        ],
        dica: "Compare sempre rendimento com a inflação do período, não com zero.",
        quiz: {
          pergunta: "Se seu investimento rende 6% ao ano e a inflação foi 6%, seu ganho real é:",
          opcoes: ["12%", "6%", "Praticamente zero", "Negativo em 6%"],
          correta: 2,
          explicacao: "Rendimento igual à inflação significa manter o poder de compra, sem ganho real.",
        },
      },
    ],
  },
  {
    id: "investimentos",
    titulo: "Primeiros investimentos",
    subtitulo: "Do porquinho à renda fixa, sem palavras difíceis.",
    emoji: "📈",
    cor: "chart",
    licoes: [
      {
        id: "risco-retorno",
        titulo: "Risco, retorno e liquidez",
        resumo: "O tripé que explica qualquer investimento do mundo.",
        minutos: 5,
        paragrafos: [
          "Todo investimento se equilibra em três pontos: risco (chance de perder), retorno (quanto pode render) e liquidez (rapidez para virar dinheiro).",
          "Não existe investimento com risco baixo, retorno altíssimo e liquidez imediata. Quando alguém promete isso, é golpe.",
          "Escolha pelo objetivo: dinheiro de curto prazo pede segurança e liquidez; dinheiro de longo prazo pode aceitar mais oscilação.",
        ],
        dica: "Desconfie de qualquer promessa de ganho garantido acima do normal. Rentabilidade passada não garante futura.",
        quiz: {
          pergunta: "O que significa 'liquidez' de um investimento?",
          opcoes: [
            "O quanto ele rende por ano",
            "A rapidez com que ele vira dinheiro disponível",
            "O risco de perder tudo",
            "O imposto cobrado sobre ele",
          ],
          correta: 1,
          explicacao: "Liquidez é a facilidade e velocidade de transformar o investimento em dinheiro.",
        },
      },
      {
        id: "renda-fixa",
        titulo: "Renda fixa para começar",
        resumo: "Tesouro, CDB e poupança explicados em linguagem simples.",
        minutos: 5,
        paragrafos: [
          "Na renda fixa você empresta dinheiro (ao governo, a um banco) e recebe de volta com juros combinados. É o ponto de partida mais comum.",
          "O Tesouro Selic acompanha a taxa básica de juros e tem resgate rápido — muito usado para reserva de emergência. CDBs de bancos funcionam de forma parecida.",
          "A poupança é simples, mas costuma render menos que outras opções igualmente seguras. Ela é conveniência, não a melhor rentabilidade.",
        ],
        dica: "Comece pequeno. Alguns títulos públicos permitem aplicar com pouco mais de R$ 30.",
        quiz: {
          pergunta: "Qual opção é mais associada à reserva de emergência?",
          opcoes: ["Ações de empresas", "Tesouro Selic", "Criptomoedas", "Imóveis"],
          correta: 1,
          explicacao: "O Tesouro Selic une baixa oscilação e liquidez, combinação ideal para emergências.",
        },
      },
      {
        id: "renda-variavel",
        titulo: "Uma espiada na renda variável",
        resumo: "Ações e fundos: o que é, sem mistificação.",
        minutos: 4,
        paragrafos: [
          "Ao comprar uma ação, você vira sócio de um pedacinho de uma empresa. Se ela vai bem, seu pedaço tende a valer mais; se vai mal, menos.",
          "Fundos reúnem o dinheiro de várias pessoas e um gestor investe por elas. É uma forma de diversificar com pouco valor.",
          "Renda variável combina com dinheiro que você não vai precisar tão cedo. Não coloque aí a sua reserva.",
        ],
        dica: "Diversificar é o jeito mais simples de reduzir risco: não concentre tudo em um único ativo.",
        quiz: {
          pergunta: "Investir em renda variável faz mais sentido para:",
          opcoes: [
            "Dinheiro que você usará no mês que vem",
            "A reserva de emergência",
            "Dinheiro de longo prazo, que pode oscilar",
            "Pagar contas atrasadas",
          ],
          correta: 2,
          explicacao: "A oscilação é natural, então o tempo é o que reduz o risco na renda variável.",
        },
      },
    ],
  },
];

export function getTrilha(id: string) {
  return trilhas.find((t) => t.id === id);
}

export const totalLicoes = trilhas.reduce((acc, t) => acc + t.licoes.length, 0);

export type Jogo = {
  id: string;
  nome: string;
  descricao: string;
  emoji: string;
  habilidade: string;
};

export const jogos: Jogo[] = [
  {
    id: "orcamento-mensal",
    nome: "Divida a mesada",
    descricao: "Distribua R$ 800 entre necessidades, desejos e poupança sem estourar o mês.",
    emoji: "🧮",
    habilidade: "Orçamento",
  },
  {
    id: "gasto-ou-guardo",
    nome: "Gasto ou guardo?",
    descricao: "Decida rápido em situações reais do dia a dia e veja o impacto de cada escolha.",
    emoji: "⚡",
    habilidade: "Consumo consciente",
  },
  {
    id: "bola-de-neve",
    nome: "Bola de neve dos juros",
    descricao: "Acerte quanto uma dívida ou um investimento vira depois de alguns meses.",
    emoji: "❄️",
    habilidade: "Juros e inflação",
  },
];
