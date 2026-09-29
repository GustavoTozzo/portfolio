# Portfólio — Gustavo Tozzo Campos

Site pessoal para apresentar minha transição de Analista SEO para desenvolvimento back-end: quem sou, o que já construí e como entrar em contato.

## O que tem aqui

- **Sobre** — minha trajetória, da SEO técnica ao back-end
- **Skills** — linguagens, back-end, front-end, dados e ferramentas, sempre com o contexto real de onde usei cada uma
- **Projetos** — cada um com estudo de caso completo (contexto, decisões técnicas, desafios, o que eu faria diferente):
  - [MedSafe Senior](https://github.com/GustavoTozzo/software-senior-backend) — app de adesão a medicamentos para idosos (Java/Spring Boot + Kotlin/Jetpack Compose)
  - [Biblioteca Online](https://github.com/GustavoTozzo/biblioteca-online) — reescrita completa de um projeto acadêmico em Next.js, com aluguel e assinatura de livros
  - [SEO Toolkit](https://github.com/GustavoTozzo/seo-toolkit) — ferramentas Python de SEO técnico que eu usava na Agência liveSEO, limpas e publicadas
- **Experiência e Educação** — incluindo uma página dedicada aos [estudos de SQL e banco de dados](/estudos) da faculdade
- **Contato** — formulário funcional (validação server-side, honeypot, limite de tentativas), além do e-mail direto

Disponível em português (`/`) e inglês (`/en`).

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS · Zod · Resend

## Rodando localmente

```bash
pnpm install
cp .env.example .env   # preencha RESEND_API_KEY e CONTACT_TO_EMAIL para testar o formulário de contato
pnpm dev
```
