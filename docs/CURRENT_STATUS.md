---
title: "Brayyan — Status Atual do Sistema (Plataforma Multi-Projeto)"
tags: [brayyan, status, vercel, deploy, helpus, saas, multi-project]
date: 2026-09-27
status: ativo
aliases: ["Status do Projeto", "Current Status"]
---

# 🚀 Brayyan — Status Atual do Sistema

> [!SUCCESS] Sistema SaaS Operacional & Suporte a Qualquer Estudo
> A aplicação **Brayyan (HelpUS Technology)** opera como uma plataforma SaaS universal para **qualquer usuário criar e auditar qualquer revisão sistemática** (Cardiologia, Oncologia, Neurologia, Ciência da Computação, etc.).

---

## 🌐 Infraestrutura & Links de Produção

| Componente | Status | URL Oficial / Detalhes |
| :--- | :---: | :--- |
| **Vercel CDN + FastAPI** | 🟢 Online | `https://brayyan.helpusbr.com` |
| **Repositório GitHub** | 🟢 Ativo | `https://github.com/HelpUSA/brayyan` |
| **Arquitetura Multi-Projeto** | 🟢 Ativa | Dashboard `📁 Meus Projetos` + Wizard `➕ Nova Revisão` |
| **Idiomas Suportados** | 🟢 Ativo | 🇧🇷 PT-BR / 🇺🇸 EN / 🇪🇸 ES |

---

## 🎯 Principais Recursos Ativos em Produção

- [x] **Criação de Novos Projetos (`➕ Nova Revisão`)**: Wizard interativo para cadastrar título, tipo de estudo, domínio, pergunta PICO e upload de datasets (CSV/RIS/BibTeX).
- [x] **Dashboard de Projetos (`📁 Meus Projetos`)**: Gerenciamento e alternância em tempo real entre diferentes pesquisas.
- [x] **Interface Genérica & Dinâmica**: O workspace adapta título, área, métricas, artigos e tabelas para o projeto selecionado pelo usuário.
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
