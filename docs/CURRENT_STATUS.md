---
title: "Brayyan — Status Atual do Sistema"
tags: [brayyan, status, vercel, deploy, helpus, rayyan-features]
date: 2026-09-27
status: ativo
aliases: ["Status do Projeto", "Current Status"]
---

# 🚀 Brayyan — Status Atual do Sistema

> [!SUCCESS] Sistema Operacional & Recursos Avançados Ativos
> A aplicação **Brayyan (HelpUS Technology)** está 100% online, estilizada, com responsividade total e equipada com recursos avançados de auditoria e IA.

---

## 🌐 Infraestrutura & Links de Produção

| Componente | Status | URL Oficial / Detalhes |
| :--- | :---: | :--- |
| **Vercel CDN + FastAPI** | 🟢 Online | `https://brayyan.helpusbr.com` |
| **Repositório GitHub** | 🟢 Ativo | `https://github.com/HelpUSA/brayyan` |
| **Banco de Dados SQLite** | 🟢 Embarcado | `brayyan.db` (3.578 registros) |
| **Idiomas Suportados** | 🟢 Ativo | 🇧🇷 PT-BR / 🇺🇸 EN / 🇪🇸 ES |

---

## 📊 Métricas do Dataset em Produção

> [!INFO] Dados do CardioReview Carregados
> - **Total de Artigos**: `3.578`
> - **Artigos Incluídos**: `886`
> - **Artigos Excluídos**: `2.692`
> - **Conflitos Divergentes (A vs B)**: `81`
> - **Concordância da IA**: `97.74%`
> - **Coeficiente Kappa de Cohen**: `0.9479` (Excelente)

---

## 🎯 Funcionalidades Entregues & Recursos Incorporados do Rayyan

- [x] **Cabeçalho Fixo Simplificado**: Exibe apenas Logo HelpUS, HelpUS Technology, idiomas e avatar do usuário.
- [x] **Responsividade Total**: Layout adaptativo para mobile, tablet e desktop sem cortes.
- [x] **Rodapé Institucional & LGPD**: Modal de Privacidade, Aviso de Cookies e botão flutuante de WhatsApp.
- [x] **Triagem Interativa com Banco Real**: Leitura dinâmica dos 3.578 registros com gravação via `PATCH /api/decisions/{id}/decision`.
- [x] **Atalhos de Teclado (Rayyan Hotkeys)**: Teclas `1` (Incluir), `2` (Talvez), `3` (Excluir) e `U` (Desfazer).
- [x] **Highlight Dinâmico de Palavras-Chave**: Destaque automático de termos de inclusão (verde/roxo) e exclusão (vermelho) no abstract.
- [x] **Filtro de Confiança da IA**: Seleção por limiar de confiança (`>90%`, `>80%`).
- [x] **Botão Desfazer (Undo)**: Reversão em 1 clique da última decisão tomada.
- [x] **Extração de Dados com IA**: Tabela dinâmica de evidências (AUC, Sensibilidade, Arquitetura IA, N) com exportação CSV.
- [x] **Matriz QUADAS-2 (Risco de Viés)**: Gráfico em formato de semáforo (*Traffic Light Plot*) para os 4 domínios de acurácia.
- [x] **Fluxograma PRISMA 2020 Interativo**: Modal visual com as 4 etapas de seleção e download de relatório PDF/PNG.
- [x] **Gestão de Equipe & Edição**: Modais interativos para convite de membros e edição de dados do projeto.

---

## 🔗 Links Relacionados (Obsidian Vault)
- [[00_INDEX_MOC]] — Mapa central de conteúdos.
- [[DATABASE_STATE]] — Estado do banco de dados e esquema.
- [[HANDOFF]] — Instruções para desenvolvedores.
- [[01_RAYYAN_RESEARCH]] — Benchmark e comparativo Rayyan.
