import { GordianAspect, ServiceClass } from "./types";

export const ObreroManifesto = {
  title: "obrero.",
  subtitle: "Estúdio de Engenharia Visual e Craft Digital",
  philosophy: "Inspirados na solidez do trabalho manual e na precisão da arquitetura, construímos sites que não apenas ocupam espaço na web, mas que estabelecem novas estruturas de interação. Rejeitamos o modelo de templates genéricos. Abraçamos a matemática, a arte generativa e a engenharia robusta.",
  pillars: [
    {
      title: "Matéria-Prima Pura",
      desc: "Trabalhamos na raiz física da web: HTML sem excessos, CSS sob medida, JavaScript cru, p5.js para expressão matemática e React para arquiteturas de alta fidelidade e componentes modulares duradouros."
    },
    {
      title: "Bordas de Engenharia",
      desc: "Mapeamos interfaces com grades explícitas, linhas de delimitação sólidas e layouts proporcionais bem fundamentados, inspirados na escola suíça de design e em estúdios de vanguarda."
    },
    {
      title: "Interatividade como Arte",
      desc: "Com o p5.js, transformamos o cursor do usuário de um simples ponteiro de seleção em uma ferramenta de pintura, colisão física e exploração visual viva."
    }
  ]
};

export const GordianAnalysisData: GordianAspect[] = [
  {
    id: "g-grid",
    title: "1. Grade Estrutural & Divisórias Sólidas",
    description: "O layout do Gordian afasta-se de sombras flutuantes e foca em grades rígidas com bordas finas de 1px. As proporções separam a tela em boxes simétricos que guiam o conteúdo principal e a sua metainformação técnica com precisão matemática.",
    metrics: [
      {
        title: "Divisões em Grade",
        gordianValue: "Bordas finas cinza-escuro (border-neutral-800) separando seções verticais e horizontais, simulando uma planta arquitetônica física.",
        translationToObrero: "Adotamos a 'Grade Operária', usando linhas finas com contraste calculado em 15% opacidade, mantendo a sensação estrutural de site em construção constante.",
        impactLabel: "Foco Estrutural",
        visualPercent: 95
      },
      {
        title: "Proporção Lateral",
        gordianValue: "Paddings laterais generosos (entre 6% a 8% da largura da viewport) para reter o foco nos blocos centrais de conteúdo.",
        translationToObrero: "Margens laterais simétricas fluidas `px-6 md:px-16 lg:px-24` para manter o ritmo editorial elegante.",
        impactLabel: "Espaço Negativo",
        visualPercent: 85
      }
    ]
  },
  {
    id: "g-typo",
    title: "2. Tipografia Editorial & Escala de Contraste",
    description: "Uso drástico de tamanhos opostos — títulos gigantes de peso pesado em contraste com metadados minúsculos em fonte monoespaçada. Não há pesos medianos desnecessários; ou a informação é um marco visual ou é uma nota técnica de rodapé.",
    metrics: [
      {
        title: "Hierarquia Dinâmica",
        gordianValue: "Headings em Sans-Serif ou Serif contemporâneo de tamanho display (`text-5xl` a `text-8xl`), emparelhadas com tags de dados em Mono.",
        translationToObrero: "Emparelhamos a Inter (limpa, densidade neutra) e JetBrains Mono (estética bruta e técnica) para codificar as propostas de forma transparente.",
        impactLabel: "Legibilidade de Peso",
        visualPercent: 90
      },
      {
        title: "Espaçamento de Letras (Tracking)",
        gordianValue: "Títulos displays muito compactos (`tracking-tighter`) e labels técnicas expandidas (`tracking-widest uppercase`).",
        translationToObrero: "Adotamos esse ritmo tipográfico para destacar as seções do orçamento e do manifesto de negócio.",
        impactLabel: "Consistência Visual",
        visualPercent: 78
      }
    ]
  },
  {
    id: "g-motion",
    title: "3. Micro-Interações & Fluidez Sem Ruído",
    description: "Cada botão no Gordian responde imediatamente ao passar do mouse com transições suaves de preenchimento ou revelação sutil de ícones. Toda transição de estados é justificada — não há animações decorativas, apenas funcionais.",
    metrics: [
      {
        title: "Estabilidade de Layout",
        gordianValue: "Transições suaves baseadas em CSS Vanilla ou Framer Motion, evitando layouts que quebram ou chacoalham ao mudar de estado.",
        translationToObrero: "Usamos hooks otimizados e motion simplificado (`motion/react`) para criar feedbacks estruturais ao clicar ou arrastar parâmetros de preço.",
        impactLabel: "Refinamento Técnico",
        visualPercent: 82
      },
      {
        title: "Animações de Entrada",
        gordianValue: "Efeito suave offset vertical (Y-axis translate + fade-in) ao carregar novos cartões ou ao rolar a página.",
        translationToObrero: "Staggered transitions nos cartões e seções, valorizando a ordem na leitura das categorias.",
        impactLabel: "Previsibilidade",
        visualPercent: 75
      }
    ]
  }
];

export const ObreroServiceClasses: ServiceClass[] = [
  {
    id: "cl-01",
    code: "CLASS-01",
    title: "Lander de Alta Conversão",
    description: "Micro-arquitetura de uma única página para impacto imediato e máxima velocidade.",
    detailedDescription: "Desenvolvida com HTML/CSS sintético extremamente otimizado ou React limpo. É ideal para lançamentos rápidos, campanhas específicas ou portfólios pessoais focados onde a taxa de retenção do usuário precisa passar de 80%. Sem scripts inflados de rastreio genérico; cada byte é calculado.",
    stack: ["HTML5", "CSS3 / Tailwind", "JS Vanilla", "React Lite", "Motion"],
    basePrice: 3200,
    deliveryDays: 8,
    idealFor: "Lançamento de produtos, portfólios individuais objetivos, captação de leads e campanhas expressas de marca.",
    features: [
      "Layout Monopágina responsivo otimizado para celulares e computadores",
      "Animações de entrada com motion suaves e calibradas",
      "Configuração de SEO estrutural básico e microdados JSON-LD",
      "Formulário de contato seguro com validação nativa",
      "Pontuação máxima no Google PageSpeed Insights (95%+)"
    ],
    proportions: {
      uxUi: 30,
      development: 50,
      optimization: 15,
      animation: 5
    }
  },
  {
    id: "cl-02",
    code: "CLASS-02",
    title: "Ecossistema Multipágina",
    description: "Arquitetura conectada entre múltiplas rotas para narrativas mais ricas e estruturadas.",
    detailedDescription: "Focado em empresas e profissionais que necessitam organizar seus serviços, projetos ou documentação em páginas separadas. Utiliza o ecossistema React com transições fluidas e controle de estados compartilhado. O roteamento ocorre de forma instantânea sem reloads bruscos na janela, mantendo o usuário engajado.",
    stack: ["React Router", "Tailwind CSS", "TypeScript", "Motion Layout", "Lucide Icons"],
    basePrice: 6500,
    deliveryDays: 15,
    idealFor: "Empresas com múltiplas frentes de serviços, portfólios de múltiplos projetos detalhados e centrais de documentação.",
    features: [
      "Até 6 Páginas personalizadas estruturadas (ex: Sobre, Serviços, Galeria, Contato)",
      "Transição de rotas animada por fade / slide sem recarregamento de browser",
      "Menu de navegação inteligente e adaptável a qualquer dispositivo",
      "Componentes de UI consistentes, isolados e reutilizáveis",
      "Páginas de erro customizadas (404) e redirecionamentos seguros"
    ],
    proportions: {
      uxUi: 25,
      development: 45,
      optimization: 20,
      animation: 10
    }
  },
  {
    id: "cl-03",
    code: "CLASS-03",
    title: "Arquitetura com CMS",
    description: "Uma plataforma dinâmica onde você tem controle total para gerenciar o conteúdo com independência.",
    detailedDescription: "Unimos a elegância e interatividade de nosso código React customizado com a flexibilidade de um Painel CMS fácil de usar (como headless CMS ou integração de banco de dados estruturado). O cliente Obrero pode adicionar novos artigos, serviços, depoimentos ou trocar mídias em tempo real sem precisar abrir um arquivo de código ou pagar taxa de alteração técnica.",
    stack: ["React Engine", "Headless CMS API / API REST", "Rich Editor Content", "Tailwind Theme Injection"],
    basePrice: 8900,
    deliveryDays: 22,
    idealFor: "Blogs corporativos, portais de novidades em atualização constante, sites imobiliários, catálogos online de exposição de produtos.",
    features: [
      "Integração com headless CMS seguro (como Sanity, Strapi ou Decap)",
      "Painel administrativo limpo protegido por login para gerenciamento do cliente",
      "Bancos de dados de conteúdo estruturado (artigos, categorias, galerias)",
      "Filtros de conteúdo e buscas em tempo real integradas no client-side",
      "Manual em formato wiki de uso para o cliente e treinamento incluso de 1h"
    ],
    proportions: {
      uxUi: 20,
      development: 50,
      optimization: 20,
      animation: 10
    }
  },
  {
    id: "cl-04",
    code: "CLASS-04",
    title: "Arte Generativa & P5.JS",
    description: "Componentes criativos baseados em equações, interações físicas e arte matemática.",
    detailedDescription: "O ápice do diferencial tecnológico do Obrero. Desenvolvemos módulos interativos e experimentais em canvas usando p5.js e algoritmos matemáticos criativos de fluidos, forças gravitacionais ou renderização de dados dinâmica. Ideal para agências criativas, marcas ousadas e produtos de tecnologia que desejam que seu próprio site seja uma experiência de entretenimento imersiva.",
    stack: ["HTML5 Canvas", "p5.js Core", "Vector Physics Engine", "Mathematical Noise Functions", "Audio & Mouse Inputs"],
    basePrice: 4800,
    deliveryDays: 12,
    idealFor: "Instalações de marca, campanhas conceituais interativas, elementos heróis de alta tecnologia, simulações físicas de cursor.",
    features: [
      "Módulo Canvas adaptável a proporções fluidas do contêiner HTML",
      "Interações baseadas no movimento, tração, arrastamento de mouse ou toques na tela",
      "Painel lateral de depuração de parâmetros físicos (onde o cliente de teste altera no ar)",
      "Otimização matemática via loops para garantir 60fps constantes",
      "Músicas ou efeitos acionados por interação visual (opcional)"
    ],
    proportions: {
      uxUi: 35,
      development: 30,
      optimization: 15,
      animation: 20
    }
  }
];

export const PricingCoefficients = {
  pricePerPage: 500,               // Additional cost per page exceeding the tier limit
  cmsIntegrationMultiplier: 1.35,  // Cost multiplier if CMS is toggled on a normal tier
  p5ComplexityExtra: {
    none: 0,
    subtle: 1500,                  // Simple generative background / header widget
    immersive: 3800                // Custom sandbox canvas with user inputs and physics
  },
  designComplexityFactor: {
    minimalist: 0.9,               // Streamlined, clean, lower layout complexity
    standard: 1.0,                 // High focus, elegant standard proportions
    ultra_premium: 1.25            // Advanced bespoke art-direction, tailored typography details
  },
  urgencyMultiplier: 1.3,          // 30% increase for fast delivery (reduces days by ~50%)
  hourlyRateBRL: 120               // Base hour rate in BRL used to estimate visual hours
};
