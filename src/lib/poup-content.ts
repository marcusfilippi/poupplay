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
  nivel: "Iniciante" | "Intermediário" | "Avançado";
  licoes: Licao[];
};

export const trilhas: Trilha[] = [
  {
    id: "orcamento",
    titulo: "Orçamento pessoal",
    subtitulo: "Saiba para onde vai cada real que entra no seu bolso.",
    emoji: "🧾",
    cor: "primary",
    nivel: "Iniciante",
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
    nivel: "Iniciante",
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
    nivel: "Intermediário",
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
    nivel: "Intermediário",
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
  {
    id: "renda-e-carreira",
    titulo: "Renda e carreira",
    subtitulo: "Entenda salário, benefícios e como aumentar sua capacidade de ganhar.",
    emoji: "💼",
    cor: "primary",
    nivel: "Iniciante",
    licoes: [
      {
        id: "salario-liquido",
        titulo: "Salário bruto e líquido",
        resumo: "Leia um pagamento sem confundir o combinado com o que chega à conta.",
        minutos: 6,
        paragrafos: [
          "Salário bruto é o valor antes dos descontos. O líquido é o que realmente entra na conta depois de contribuições, impostos e outros descontos autorizados.",
          "Benefícios também têm valor: vale-transporte, alimentação, plano de saúde e bolsa de estudos podem mudar bastante a comparação entre duas propostas.",
          "Organize seu orçamento com a renda líquida recorrente. Horas extras e bônus são variáveis e funcionam melhor para metas do que para contas fixas.",
        ],
        dica: "Antes de aceitar uma proposta, compare o pacote total e pergunte quais descontos aparecerão no pagamento.",
        quiz: { pergunta: "Qual valor deve sustentar suas despesas fixas?", opcoes: ["Salário bruto", "Renda líquida recorrente", "Bônus futuro", "Limite do cartão"], correta: 1, explicacao: "Somente a renda líquida recorrente está disponível com previsibilidade." },
      },
      {
        id: "primeiro-trabalho",
        titulo: "Planejamento do primeiro trabalho",
        resumo: "Use a primeira renda para construir autonomia, não novas dívidas.",
        minutos: 6,
        paragrafos: [
          "Quando a renda aumenta, os gastos costumam crescer junto. Esse fenômeno é chamado inflação do estilo de vida e pode impedir qualquer avanço financeiro.",
          "Defina antecipadamente uma porcentagem para contribuir em casa, outra para objetivos e uma parte para lazer. Assim, cada aumento melhora seu futuro.",
          "Investir em habilidades também pode trazer retorno: cursos úteis, idiomas e ferramentas podem ampliar oportunidades, desde que tenham propósito e caibam no orçamento.",
        ],
        dica: "Separe a quantia das metas no mesmo dia em que receber.",
        quiz: { pergunta: "O que é inflação do estilo de vida?", opcoes: ["Alta do IPCA", "Gastar mais sempre que a renda cresce", "Redução salarial", "Investir em cursos"], correta: 1, explicacao: "É elevar o padrão de gastos na mesma velocidade da renda, sem criar patrimônio." },
      },
      {
        id: "renda-extra",
        titulo: "Renda extra com responsabilidade",
        resumo: "Calcule preço, custos e tempo antes de vender um produto ou serviço.",
        minutos: 7,
        paragrafos: [
          "Faturamento é tudo que entrou; lucro é o que sobra após materiais, taxas, transporte e outros custos. Confundir os dois faz um negócio parecer melhor do que é.",
          "Para precificar, some custos diretos e indiretos, atribua valor ao seu tempo e inclua uma margem. Pesquisar concorrentes ajuda, mas copiar preço pode esconder realidades diferentes.",
          "Registre cada venda e separe o dinheiro do trabalho do dinheiro pessoal. Mesmo em pequena escala, essa separação mostra se a atividade compensa.",
        ],
        dica: "Calcule quanto você ganha por hora já descontando todos os custos.",
        quiz: { pergunta: "Uma venda de R$ 100 com R$ 65 de custos gera quanto de lucro?", opcoes: ["R$ 100", "R$ 65", "R$ 35", "R$ 165"], correta: 2, explicacao: "Lucro é faturamento menos custos: 100 − 65 = 35." },
      },
    ],
  },
  {
    id: "impostos-e-cidadania",
    titulo: "Impostos e cidadania",
    subtitulo: "Descubra como tributos aparecem no consumo, na renda e nos serviços públicos.",
    emoji: "🏛️",
    cor: "warning",
    nivel: "Intermediário",
    licoes: [
      {
        id: "tributos-no-dia-a-dia", titulo: "Tributos no dia a dia", resumo: "Veja impostos embutidos no preço e cobrados sobre renda e patrimônio.", minutos: 7,
        paragrafos: ["Tributos financiam serviços e estruturas públicas. Eles podem incidir sobre consumo, renda ou patrimônio, e cada tipo afeta as pessoas de maneira diferente.", "Nos impostos sobre consumo, parte do valor já está embutida no preço. Por isso, mesmo quem não entrega declaração de renda paga tributos ao comprar.", "A nota fiscal registra a operação, protege o consumidor e ajuda a reduzir a informalidade. Conferi-la também revela quanto do preço corresponde a tributos."],
        dica: "Observe na próxima nota fiscal o campo de tributos aproximados.",
        quiz: { pergunta: "Quem compra um produto paga tributos?", opcoes: ["Não", "Sim, parte pode estar no preço", "Só se declarar renda", "Só maiores de idade"], correta: 1, explicacao: "Tributos sobre consumo estão embutidos no preço final." },
      },
      {
        id: "declaracao-e-documentos", titulo: "Documentos e declaração", resumo: "Organização evita erros e dá visão do patrimônio.", minutos: 7,
        paragrafos: ["Comprovantes de renda, informes bancários, notas e recibos ajudam a explicar movimentações e confirmar despesas.", "Declarar não significa necessariamente pagar imposto: a obrigação e o valor dependem das regras de cada ano e da situação da pessoa.", "Nunca entregue senhas bancárias a quem promete fazer sua declaração. Compartilhe somente documentos necessários com profissionais confiáveis."],
        dica: "Crie uma pasta por ano e guarde informes e recibos importantes.",
        quiz: { pergunta: "Declarar renda sempre significa pagar imposto?", opcoes: ["Sempre", "Nunca", "Não; depende das regras e da situação", "Só para estudantes"], correta: 2, explicacao: "Obrigação de declarar e imposto a pagar são coisas diferentes." },
      },
      {
        id: "servicos-publicos", titulo: "Orçamento público", resumo: "Conecte arrecadação, prioridades e fiscalização cidadã.", minutos: 8,
        paragrafos: ["O orçamento público estima receitas e define despesas. Como os recursos são limitados, escolher uma prioridade significa adiar ou reduzir outra.", "Portais de transparência permitem acompanhar gastos, contratos e transferências. Fiscalização social é parte da cidadania financeira.", "Políticas públicas podem reduzir desigualdades quando ampliam acesso a educação, saúde e oportunidades, mas precisam de metas e avaliação de resultados."],
        dica: "Consulte o portal de transparência da sua cidade e pesquise uma despesa pública.",
        quiz: { pergunta: "Por que o orçamento público exige prioridades?", opcoes: ["Porque recursos são limitados", "Porque não há receitas", "Porque impostos são opcionais", "Porque não existem serviços"], correta: 0, explicacao: "Demandas são maiores que os recursos, exigindo escolhas e controle." },
      },
    ],
  },
  {
    id: "protecao-financeira",
    titulo: "Proteção financeira",
    subtitulo: "Reconheça golpes, proteja seus dados e entenda quando um seguro faz sentido.",
    emoji: "🛡️",
    cor: "accent",
    nivel: "Intermediário",
    licoes: [
      {
        id: "golpes-digitais", titulo: "Golpes digitais", resumo: "Urgência, promessa e pedido de segredo são sinais de alerta.", minutos: 7,
        paragrafos: ["Golpistas exploram emoções: medo, urgência, ganância ou autoridade. Uma mensagem que exige ação imediata deve ser verificada por outro canal.", "Nunca compartilhe senha, código de autenticação ou tela do aplicativo bancário. Instituições legítimas não pedem esses dados por mensagem.", "Em transferências, confira nome, instituição e valor antes de confirmar. Se houver fraude, avise o banco imediatamente e registre as evidências."],
        dica: "Pare, confira e só então aja. A urgência do golpista não é sua urgência.",
        quiz: { pergunta: "Qual pedido é um forte sinal de golpe?", opcoes: ["Conferir o destinatário", "Compartilhar código de autenticação", "Ler um contrato", "Pesquisar a empresa"], correta: 1, explicacao: "Códigos e senhas são pessoais e nunca devem ser compartilhados." },
      },
      {
        id: "credito-e-identidade", titulo: "Proteção de identidade", resumo: "Seus dados também fazem parte do seu patrimônio.", minutos: 6,
        paragrafos: ["Dados pessoais podem ser usados para abrir contas, pedir crédito e assumir compromissos em seu nome.", "Use senhas diferentes, autenticação em dois fatores e alertas de movimentação. Evite cadastrar documentos em páginas acessadas por links suspeitos.", "Consultar regularmente contas e compromissos associados ao seu CPF ajuda a detectar problemas cedo."],
        dica: "Prefira um gerenciador de senhas a repetir a mesma senha em vários serviços.",
        quiz: { pergunta: "Por que repetir senha é perigoso?", opcoes: ["Deixa o celular lento", "Um vazamento compromete várias contas", "Aumenta impostos", "Reduz o limite"], correta: 1, explicacao: "Uma única senha vazada pode abrir acesso a todos os serviços que a reutilizam." },
      },
      {
        id: "seguros", titulo: "Risco e seguros", resumo: "Transfira riscos grandes sem pagar por coberturas inúteis.", minutos: 8,
        paragrafos: ["Seguro troca uma perda incerta e potencialmente grande por um custo previsível. Ele faz sentido para riscos que você não conseguiria absorver sozinho.", "Prêmio é o preço do seguro; franquia é a parte que você paga em determinados sinistros; cobertura define o que está protegido.", "Leia exclusões e limites. O seguro mais barato pode não cobrir o risco importante, enquanto coberturas duplicadas desperdiçam dinheiro."],
        dica: "Compare cobertura, franquia e exclusões — não apenas o preço.",
        quiz: { pergunta: "O que é franquia em muitos seguros?", opcoes: ["O valor investido", "A parte paga pelo segurado no sinistro", "O lucro da seguradora", "Um imposto"], correta: 1, explicacao: "A franquia é a participação do segurado em determinados prejuízos cobertos." },
      },
    ],
  },
  {
    id: "investimentos-avancados",
    titulo: "Estratégia de investimentos",
    subtitulo: "Monte uma carteira coerente com prazo, risco, custos e objetivos.",
    emoji: "🧭",
    cor: "chart",
    nivel: "Avançado",
    licoes: [
      {
        id: "alocacao", titulo: "Alocação e diversificação", resumo: "Distribua riscos sem colecionar ativos aleatórios.", minutos: 9,
        paragrafos: ["Alocação é a divisão do patrimônio entre classes de ativos. Ela costuma influenciar mais o comportamento da carteira do que escolher um único investimento vencedor.", "Diversificar reduz riscos específicos, mas não elimina oscilações do mercado. Ativos precisam ter funções claras: liquidez, estabilidade, renda ou crescimento.", "Rebalancear significa retornar às proporções planejadas, vendendo parte do que cresceu ou direcionando novos aportes ao que ficou abaixo da meta."],
        dica: "Escreva a função de cada investimento antes de comprá-lo.",
        quiz: { pergunta: "Qual é o objetivo do rebalanceamento?", opcoes: ["Prever o mercado", "Retornar à alocação planejada", "Eliminar todo risco", "Comprar só o que subiu"], correta: 1, explicacao: "Rebalancear mantém o risco alinhado ao plano original." },
      },
      {
        id: "marcacao-mercado", titulo: "Marcação a mercado", resumo: "Entenda por que um título pode oscilar antes do vencimento.", minutos: 9,
        paragrafos: ["O preço de um título prefixado muda quando as taxas de mercado mudam. Se novas taxas sobem, títulos antigos com taxa menor tendem a perder valor no curto prazo.", "Levar o título até o vencimento preserva a regra contratada, desde que o emissor pague. Vender antes expõe você ao preço daquele dia.", "Prazo e objetivo precisam combinar: dinheiro com data próxima não deve depender de vender um ativo volátil em um momento ruim."],
        dica: "Antes de investir, descubra o que acontece se você precisar resgatar antes do vencimento.",
        quiz: { pergunta: "Quando taxas de mercado sobem, um prefixado antigo tende a:", opcoes: ["Valorizar imediatamente", "Cair de preço no curto prazo", "Virar ação", "Perder o vencimento"], correta: 1, explicacao: "Novos títulos ficam mais atraentes, reduzindo o preço de negociação do antigo." },
      },
      {
        id: "custos-e-impostos", titulo: "Custos, impostos e retorno líquido", resumo: "Compare o que realmente fica no bolso.", minutos: 8,
        paragrafos: ["Taxas de administração, corretagem, spreads e impostos reduzem o retorno. Pequenas diferenças anuais se acumulam ao longo de décadas.", "Compare investimentos na mesma base: risco, prazo, liquidez e retorno líquido. Uma taxa maior pode não compensar menor segurança ou dinheiro preso.", "Rentabilidade passada ajuda a estudar comportamento, mas não é promessa. O plano deve sobreviver a cenários diferentes."],
        dica: "Peça sempre a taxa líquida estimada e liste todos os custos.",
        quiz: { pergunta: "Qual retorno deve ser comparado ao decidir?", opcoes: ["O bruto anunciado", "O líquido após custos e impostos", "O melhor mês", "A promessa do vendedor"], correta: 1, explicacao: "É o retorno líquido que efetivamente aumenta seu patrimônio." },
      },
    ],
  },
  {
    id: "planejamento-de-vida",
    titulo: "Planejamento de longo prazo",
    subtitulo: "Transforme grandes escolhas de estudo, moradia e aposentadoria em cenários possíveis.",
    emoji: "🗺️",
    cor: "primary",
    nivel: "Avançado",
    licoes: [
      {
        id: "cenarios", titulo: "Decisões por cenários", resumo: "Planeje sem fingir que o futuro é previsível.", minutos: 9,
        paragrafos: ["Uma projeção não é previsão. Crie cenários conservador, provável e otimista variando renda, inflação, custos e prazo.", "Decisões robustas continuam razoáveis mesmo no cenário conservador. Se um plano só funciona quando tudo dá certo, ele é frágil.", "Revise os cenários quando sua realidade mudar. Planejamento é um processo contínuo, não um documento definitivo."],
        dica: "Teste sua meta com renda 10% menor e custo 10% maior.",
        quiz: { pergunta: "Para que serve um cenário conservador?", opcoes: ["Garantir o futuro", "Testar se o plano suporta condições piores", "Eliminar revisões", "Aumentar dívidas"], correta: 1, explicacao: "Ele revela a margem de segurança do plano." },
      },
      {
        id: "grandes-compras", titulo: "Grandes compras", resumo: "Compare custo total, oportunidade e flexibilidade.", minutos: 9,
        paragrafos: ["Uma grande compra inclui custos além do preço: manutenção, seguro, impostos, juros e perda de valor também entram na conta.", "Custo de oportunidade é aquilo que você deixa de fazer com o dinheiro. Uma parcela que cabe pode atrasar uma meta mais importante.", "Entrada maior reduz juros, mas não deve consumir toda a reserva. Equilibre custo financeiro e proteção contra imprevistos."],
        dica: "Calcule o custo total por ano, não apenas a parcela mensal.",
        quiz: { pergunta: "O que a parcela mensal pode esconder?", opcoes: ["A cor do produto", "O custo total e outras despesas", "A data", "A nota fiscal"], correta: 1, explicacao: "Prazo, juros e manutenção podem tornar uma parcela aparentemente leve muito cara." },
      },
      {
        id: "aposentadoria", titulo: "Tempo e aposentadoria", resumo: "Começar cedo reduz o esforço necessário no futuro.", minutos: 10,
        paragrafos: ["A aposentadoria depende de renda futura e patrimônio acumulado. Quanto maior o prazo, mais os juros compostos podem contribuir para o objetivo.", "Risco de longevidade é viver mais do que o dinheiro planejado. Inflação e custos de saúde tornam importante trabalhar com margem.", "Contribuições públicas e investimentos próprios podem se complementar. Diversificar fontes de renda futura reduz dependência de uma única regra."],
        dica: "Aumente o aporte quando sua renda subir, antes de elevar o padrão de vida.",
        quiz: { pergunta: "Qual vantagem principal de começar cedo?", opcoes: ["Retorno garantido", "Mais tempo para juros compostos", "Ausência de inflação", "Não precisar aportar"], correta: 1, explicacao: "Mais tempo permite que rendimentos também produzam rendimentos por mais ciclos." },
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
    descricao: "Distribua uma renda sorteada entre necessidades, desejos e poupança sem estourar o mês.",
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
  {
    id: "reserva-de-emergencia",
    nome: "Operação imprevisto",
    descricao: "Monte uma reserva capaz de enfrentar diferentes emergências sem recorrer a dívidas.",
    emoji: "🧯",
    habilidade: "Reserva de emergência",
  },
  {
    id: "detetive-do-credito",
    nome: "Detetive do crédito",
    descricao: "Compare propostas pelo custo total e descubra qual crédito pesa menos no orçamento.",
    emoji: "🔎",
    habilidade: "Crédito e CET",
  },
  {
    id: "monte-sua-carteira",
    nome: "Monte sua carteira",
    descricao: "Associe objetivos a investimentos considerando prazo, liquidez e risco.",
    emoji: "🧩",
    habilidade: "Investimentos",
  },
];
