---
title: "Brayyan — Status Atual do Sistema (Plataforma SaaS & Google Auth)"
tags: [brayyan, status, vercel, deploy, helpus, saas, multi-project, auth, google-login]
date: 2026-09-27
status: ativo
aliases: ["Status do Projeto", "Current Status"]
---

# 🚀 Brayyan — Status Atual do Sistema

> [!SUCCESS] Sistema SaaS Operacional com Autenticação Google & Dashboard Multi-Projeto
> A aplicação **Brayyan (HelpUS Technology)** opera como uma plataforma SaaS universal completa. Cada usuário conta com uma **Tela Inicial / Landing Page com Login Oficial da Google**, além de um **Dashboard de Trabalhos Cadastrados** para gerenciar múltiplos estudos de revisão sistemática simultâneos.

---

## 🌐 Infraestrutura & Links de Produção

| Componente | Status | URL Oficial / Detalhes |
| :--- | :---: | :--- |
| **Vercel CDN + FastAPI** | 🟢 Online | `https://brayyan.helpusbr.com` |
| **Repositório GitHub** | 🟢 Ativo | `https://github.com/HelpUSA/brayyan` |
| **Autenticação Oficial** | 🟢 Ativa | Login Google (`/api/auth/google`) + Login E-mail (`/api/auth/login`) |
| **Dashboard de Trabalhos** | 🟢 Ativo | Tela `#dashboardScreen` com cards dinâmicos e atalho PICO |
| **Idiomas Suportados** | 🟢 Ativo | 🇧🇷 PT-BR / 🇺🇸 EN / 🇪🇸 ES |

---

## 🎯 Principais Recursos Ativos em Produção

- [x] **Tela Inicial / Landing Page (`#landingScreen`)**: Apresentação institucional da HelpUS Technology, lista de vantagens competitivas, formulário de login por e-mail e **botão oficial de Login com a Google**.
- [x] **Dashboard do Usuário Logado (`#dashboardScreen`)**: Hub visual com saudação personalizada ("Olá, Wagner Santos! 👋"), lista de todos os trabalhos/estudos cadastrados, progresso de triagem, edição de parâmetros PICO e atalho `➕ Cadastrar Novo Trabalho`.
- [x] **Navegação & Breadcrumb no Workspace**: Botão `← Minhas Revisões` no topo do workspace para retorno instantâneo ao dashboard do usuário.
- [x] **Múltiplos Formatos de Importação**: Parser backend de arquivos **CSV, RIS (`.ris`) e BibTeX (`.bib`)** com associação por `project_id`.
- [x] **Triagem Interativa com IA & Atalhos**: Teclas `1` (Incluir), `2` (Talvez), `3` (Excluir) e `U` (Desfazer), com gravação em tempo real no banco SQLite.
- [x] **Highlight Dinâmico de Palavras-Chave**: Destaque automático no abstract para termos de inclusão e exclusão.
- [x] **Extração Estruturada de Evidências por IA**: Tabela de extração dinâmica com exportação CSV (`brayyan_extracao_evidencias.csv`).
- [x] **Matriz QUADAS-2 (Risco de Viés)**: Gráfico de semáforo por domínios e exportação CSV (`brayyan_quadas2_risco_vies.csv`).
- [x] **Fluxograma PRISMA 2020 Interativo**: Modal visual com download de relatório PDF e imagem PNG.
- [x] **Rodapé Institucional & LGPD**: Modal de Privacidade, Aviso de Cookies e atendimento via WhatsApp.

---

## 🔗 Links Relacionados (Obsidian Vault)
- [[00_INDEX_MOC]] — Mapa central de conteúdos.
- [[DATABASE_STATE]] — Estado do banco de dados e esquema.
- [[HANDOFF]] — Instruções para desenvolvedores.
- [[01_RAYYAN_RESEARCH]] — Benchmark e comparativo Rayyan.
