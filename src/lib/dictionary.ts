import type { Locale } from "@/content/schema";

const dictionary = {
  pt: {
    brand: "Gustavo Tozzo",
    skip: "Pular para o conteúdo principal",
    present: "Atual",
    nav: {
      about: "Sobre",
      skills: "Skills",
      projects: "Projetos",
      experience: "Experiência",
      education: "Educação",
      contact: "Contato",
    },
    ui: {
      navLabel: "Navegação",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
      lightTheme: "Ativar tema claro",
      darkTheme: "Ativar tema escuro",
    },
    hero: {
      viewProjects: "Ver projetos",
      downloadCv: "Baixar CV",
      availabilityLabel: "Disponibilidade",
    },
    about: {
      location: "Localização",
      availability: "Disponibilidade",
      languages: "Idiomas",
    },
    education: {
      heading: "Educação",
      inProgress: "Em andamento",
      completed: "Concluído",
      viewCoursework: "Ver estudos de SQL & Banco de Dados",
    },
    coursework: {
      backHome: "Voltar para o início",
      repo: "Repositório",
      viewSource: "Ver arquivo",
    },
    projectDetail: {
      backHome: "Voltar para o início",
      context: "Contexto",
      decisions: "Decisões técnicas",
      challenges: "Desafios",
      retrospective: "O que eu faria diferente",
      repo: "Repositório",
      demo: "Demo",
    },
    projects: {
      viewCase: "Ver caso",
      repo: "Repositório",
      demo: "Demo",
    },
    contact: {
      heading: "Contato",
      intro: "Prefere falar direto? Me manda um e-mail, ou usa o formulário abaixo.",
      nameLabel: "Nome",
      emailLabel: "E-mail",
      messageLabel: "Mensagem",
      submit: "Enviar mensagem",
      sending: "Enviando...",
      success: "Mensagem enviada! Te respondo em breve.",
      errors: {
        generic: "Algo deu errado. Tenta de novo ou manda um e-mail direto.",
        invalid_payload: "Confere os campos e tenta de novo.",
        too_fast: "Muito rápido — tenta de novo em alguns segundos.",
        rate_limited: "Muitas tentativas. Tenta de novo mais tarde ou manda um e-mail direto.",
        not_configured: "Formulário indisponível no momento — manda um e-mail direto.",
        send_failed: "Não consegui enviar agora. Tenta de novo ou manda um e-mail direto.",
      },
    },
    footer: {
      sourceCode: "Código deste site",
    },
  },
  en: {
    brand: "Gustavo Tozzo",
    skip: "Skip to main content",
    present: "Present",
    nav: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      experience: "Experience",
      education: "Education",
      contact: "Contact",
    },
    ui: {
      navLabel: "Navigation",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      lightTheme: "Switch to light theme",
      darkTheme: "Switch to dark theme",
    },
    hero: {
      viewProjects: "View projects",
      downloadCv: "Download CV",
      availabilityLabel: "Availability",
    },
    about: {
      location: "Location",
      availability: "Availability",
      languages: "Languages",
    },
    education: {
      heading: "Education",
      inProgress: "In progress",
      completed: "Completed",
      viewCoursework: "View SQL & Database case studies",
    },
    coursework: {
      backHome: "Back to home",
      repo: "Repository",
      viewSource: "View file",
    },
    projectDetail: {
      backHome: "Back to home",
      context: "Context",
      decisions: "Technical decisions",
      challenges: "Challenges",
      retrospective: "What I'd do differently",
      repo: "Repository",
      demo: "Demo",
    },
    projects: {
      viewCase: "View case",
      repo: "Repository",
      demo: "Demo",
    },
    contact: {
      heading: "Contact",
      intro: "Prefer to talk directly? Email me, or use the form below.",
      nameLabel: "Name",
      emailLabel: "Email",
      messageLabel: "Message",
      submit: "Send message",
      sending: "Sending...",
      success: "Message sent! I'll get back to you soon.",
      errors: {
        generic: "Something went wrong. Try again or email me directly.",
        invalid_payload: "Check the fields and try again.",
        too_fast: "Too fast — try again in a few seconds.",
        rate_limited: "Too many attempts. Try again later or email me directly.",
        not_configured: "The form isn't available right now — email me directly.",
        send_failed: "Couldn't send it right now. Try again or email me directly.",
      },
    },
    footer: {
      sourceCode: "This site's source",
    },
  },
} satisfies Record<Locale, unknown>;

export function getDictionary(locale: Locale) {
  return dictionary[locale];
}
