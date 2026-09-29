import { contentSchema } from "./schema";

export const content = contentSchema.parse({
  profile: {
    name: "Gustavo Tozzo Campos",
    role: "Desenvolvedor Back-end Júnior",
    location: "Maringá, PR — Brasil",
    availability: "Estágio, remoto/integral, júnior ou freelance",
    positioning:
      "Construo APIs e serviços em Java/Spring com banco de dados versionado e testado, prontos pra sustentar um time em cima.",
    cvHref: "/cv/gustavo-tozzo-campos-cv.pdf",
    social: {
      github: "https://github.com/GustavoTozzo",
      linkedin: "https://www.linkedin.com/in/gustavotozzo/",
      email: "gustavotozzo21@gmail.com",
    },
    about: [
      "Depois de quase 4 anos como Analista SEO na Agência liveSEO — otimizando Core Web Vitals, ajustando código front-end e automatizando análise de dados para e-commerces — estou migrando para desenvolvimento back-end. Hoje curso Análise e Desenvolvimento de Sistemas no Instituto Infnet e construo APIs em Java e Spring Boot, como no MedSafe Senior.",
      "Trago da SEO uma base sólida em dados (SQL, Oracle PL/SQL, Power BI, Python) que uso junto com o que estou aprendendo agora em back-end — inclusive este portfólio, feito em Next.js e TypeScript. Estou aberto a estágio, trabalho remoto ou período integral, vagas júnior e freelance.",
    ],
    languages: ["Inglês"],
  },
  skills: [
    {
      category: "linguagens",
      items: [
        { name: "Java", usageContext: "MedSafe Senior, Farmácia Encomendas" },
        { name: "Kotlin", usageContext: "MedSafe Senior (mobile)" },
        { name: "TypeScript", usageContext: "este portfólio" },
        { name: "Python", usageContext: "automação e análise de dados, Analista SEO" },
      ],
    },
    {
      category: "backend",
      items: [
        { name: "Spring Boot", usageContext: "MedSafe Senior, Farmácia Encomendas" },
        { name: "Spring Data JPA", usageContext: "Farmácia Encomendas" },
        { name: "PostgreSQL", usageContext: "MedSafe Senior" },
        { name: "Flyway", usageContext: "MedSafe Senior, Farmácia Encomendas" },
      ],
    },
    {
      category: "frontend",
      items: [
        { name: "React", usageContext: "este portfólio" },
        { name: "Next.js", usageContext: "este portfólio" },
        { name: "Tailwind CSS", usageContext: "este portfólio" },
      ],
    },
    {
      category: "dados",
      items: [
        { name: "SQL", usageContext: "4 anos como Analista SEO" },
        { name: "Oracle PL/SQL", usageContext: "Analista SEO" },
        { name: "Power BI", usageContext: "Analista SEO" },
        { name: "Looker Studio", usageContext: "Analista SEO" },
      ],
    },
    {
      category: "ferramentas",
      items: [
        { name: "Git" },
        { name: "GitHub" },
        { name: "Maven" },
        { name: "pnpm" },
        { name: "Google Apps Script", usageContext: "Analista SEO" },
        { name: "WordPress", usageContext: "Analista SEO" },
      ],
    },
  ],
  projects: [
    {
      slug: "medsafe-senior",
      title: "MedSafe Senior",
      problem:
        "Idosos esquecem horários de medicação, e cuidadores não têm visibilidade do histórico ou do estoque em casa.",
      stack: ["Java", "Spring Boot", "PostgreSQL", "Flyway", "Kotlin", "Jetpack Compose"],
      metrics: ["6 testes de integração passando", "83h de processo documentadas (Trello + GitHub)"],
      repoUrl: "https://github.com/GustavoTozzo/software-senior-backend",
      category: "fullstack",
      featured: true,
      caseStudy: {
        context:
          "Projeto acadêmico de um semestre (280h) para ajudar idosos a manterem a adesão a medicamentos, com um backend que cuidadores e farmácias também usam.",
        decisions: [
          "CRUD completo de Usuário, Medicamento, Histórico de Ingestão e Farmácia, com regras de negócio como baixa automática de estoque e geração de link do WhatsApp para contato com a farmácia",
          "Migrations versionadas com Flyway e perfis de datasource separados para dev e test",
          "Tratamento global de exceção para respostas de erro consistentes na API",
        ],
        challenges: [
          "O Spring Boot 4 mudou os nomes dos starters e o pacote do Jackson (tools.jackson, não com.fasterxml) — precisei confirmar cada dependência com mvn compile em vez de assumir pela experiência com o Boot 3",
          "O repositório, sincronizado via OneDrive, teve o .git corrompido (um rebase-merge travado sem conflito real por trás) — precisou de limpeza manual",
        ],
        retrospective:
          "Com mais tempo, eu adicionaria testes de contrato entre backend e mobile antes de escalar as regras de negócio.",
      },
    },
    {
      slug: "biblioteca-online",
      title: "Biblioteca Online",
      problem:
        "Um projeto acadêmico de biblioteca digital tinha ficado pela metade — só um app Java de console, sem API real nem autenticação — e precisava virar algo que desse pra mostrar rodando de verdade.",
      stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "NextAuth", "Tailwind CSS"],
      metrics: ["Em produção na Vercel", "8 fases + polish pós-deploy"],
      repoUrl: "https://github.com/GustavoTozzo/biblioteca-online",
      demoUrl: "https://biblioteca-online-snowy.vercel.app",
      category: "fullstack",
      caseStudy: {
        context:
          "Reescrita completa em Next.js de um projeto acadêmico de biblioteca digital (aluguel avulso + assinaturas mensal/semestral/anual) que só existia como app Java de console incompleto — sem API, sem autenticação de verdade.",
        decisions: [
          "Prisma 7 + adaptador Neon (driver WebSocket) para Postgres serverless na Vercel, com a config de conexão movida para prisma.config.ts (o Prisma 7 tirou url/directUrl do schema.prisma)",
          "NextAuth v5 com Credentials + JWT; toda ação sensível (preço, existência do livro, usuário dono) é re-derivada no servidor, nunca confiando no payload do cliente",
          "Pagamento simulado: o número do cartão nunca sai do navegador além dos últimos 4 dígitos",
          "Recurso /gratuitos: 5 livros de domínio público verificados manualmente contra a Internet Archive (status de acesso + PDF sem DRM) antes de listar qualquer um como gratuito",
        ],
        challenges: [
          "next/image injeta style=\"color:transparent\" em todo <img> — um CSP style-src estrito sem unsafe-inline quebrava silenciosamente todas as capas de livro; só apareceu num next build && next start real, não no next dev",
          "Um bug de redirect para localhost em produção sobreviveu ~20 minutos depois de remover a env var — era um bundle de Edge Middleware cacheado num PoP específico da Vercel, só resolvido com um deploy que mudasse código de verdade",
        ],
        retrospective:
          "Formatar uma data de nascimento e ver o dia errado me ensinou a sempre testar formatação de data no navegador real (parse de string vira meia-noite UTC), não só ler o código.",
      },
    },
    {
      slug: "seo-toolkit",
      title: "SEO Toolkit",
      problem:
        "Scripts Python que eu usava no dia a dia como Analista SEO viviam espalhados em notebooks pessoais — sem versionamento, sem documentação, com dados reais de cliente misturados no meio.",
      stack: ["Python", "Next.js", "TypeScript", "Tailwind CSS"],
      metrics: ["7 ferramentas documentadas", "demo ao vivo testada contra sitemap real de 526 URLs"],
      repoUrl: "https://github.com/GustavoTozzo/seo-toolkit",
      demoUrl: "https://seo-toolkit-nine.vercel.app",
      category: "fullstack",
      caseStudy: {
        context:
          "7 scripts Python de SEO técnico que eu usava na Agência liveSEO, limpos de qualquer dado real de cliente e reorganizados como repositório público com um site Next.js de documentação e demos ao vivo.",
        decisions: [
          "Cada ferramenta é documentada a partir do próprio arquivo .py real (lido em build time e destacado com shiki) — o código mostrado no site nunca pode divergir do código-fonte",
          "Só a extratora de sitemap tem demo ao vivo sem credenciais, com guarda de SSRF (bloqueia localhost/IPs privados) e limites de 15 sitemaps / 500 URLs / 10s",
          "Dashboard mock de SEO/GA4 com dados determinísticos (seed fixa) e marcado noindex — nunca pode parecer dado real para um crawler",
        ],
        challenges: [
          "O parser robots.txt da própria stdlib do Python (urllib.robotparser) descarta silenciosamente todo bloco 'User-agent: *' depois do primeiro — bug real do CPython, confirmado reproduzindo contra o robots.txt do wordpress.org antes e depois da correção",
          "A primeira versão do validador marcava anthropic.com como 'bloqueia tudo' porque o site retorna 403 para o User-Agent genérico do urllib — corrigido buscando o robots.txt com um User-Agent identificável",
        ],
        retrospective:
          "Ainda faltam as ideias já sugeridas no próprio site: um auditor de Core Web Vitals em lote e um detector de canibalização de keywords via Search Console.",
      },
    },
  ],
  experience: [
    {
      role: "Analista SEO",
      company: "Agência liveSEO",
      period: { start: "jun. 2022", end: "nov. 2025" },
      bullets: [
        "Otimizei performance técnica (Core Web Vitals) e indexação em e-commerces nas plataformas VTEX, Shopify, WordPress e Nuvemshop",
        "Ajustei código front-end (HTML, CSS, JS) para novos componentes e melhorias de UX",
        "Automatizei análises de dados em planilhas com fórmulas complexas e Google Apps Script",
      ],
    },
  ],
  education: [
    {
      institution: "Instituto Infnet",
      program: "Bacharelado em Análise e Desenvolvimento de Sistemas",
      period: { start: "jul. 2024", end: "jun. 2027" },
      status: "cursando",
    },
  ],
});
