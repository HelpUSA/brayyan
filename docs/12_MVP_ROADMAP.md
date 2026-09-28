---
title: "Brayyan — Roadmap MVP e Fases Concluídas"
tags: [brayyan, roadmap, mvp, obsidian-vault]
date: 2026-09-27
status: concluido
aliases: ["Roadmap MVP", "Fases do Projeto"]
---

# 🎯 Brayyan — Roadmap MVP & Fases Concluídas

> [!SUCCESS] Todas as Fases Concluídas com Sucesso
> O MVP da plataforma **Brayyan (HelpUS Technology)** foi 100% entregue, integrando o banco SQLite real do CardioReview, ferramentas de auditoria e recursos inspirados no Rayyan.ai.

---

## 📅 Status das Fases de Desenvolvimento

### ✅ Fase 0 — Infrastructure & Repository Setup
- [x] Repositório GitHub criado (`https://github.com/HelpUSA/brayyan`).
- [x] Deploy contínuo na Vercel ativo em `https://brayyan.helpusbr.com`.
- [x] Servidor FastAPI com rotas `/api/articles`, `/api/conflicts`, `/api/decisions`, `/api/upload`, `/api/export`, `/api/health`.

### ✅ Fase 1 — UI/UX, Cabeçalho & Responsividade
- [x] Header topo fixo simplificado com logo HelpUS, nome HelpUS Technology, idioma (PT/EN/ES) e avatar.
- [x] Migração dos elementos do projeto para o cartão do projeto (`projectHeaderCard`) no corpo da página.
- [x] Responsividade 100% para celulares, tablets e desktops sem cortes.
- [x] Rodapé fixo, aviso de cookies, LGPD e botão flutuante de WhatsApp.

### ✅ Fase 2 — Triagem Interativa & Resolução de Conflitos
- [x] Conexão da aba *Triagem* aos 3.578 artigos reais do SQLite.
- [x] Salvamento de decisões humanas (`Incluir`, `Talvez`, `Excluir`) via API `PATCH /api/decisions/{id}/decision`.
- [x] Recálculo em tempo real de contadores, concordância e índice **Cohen's Kappa**.

### ✅ Fase 3 — Recursos Avançados Inspirados no Rayyan.ai
- [x] ⌨️ **Atalhos de Teclado**: Teclas `1` (Incluir), `2` (Talvez), `3` (Excluir) e `U` (Desfazer).
- [x] 🔍 **Highlight Dinâmico de Palavras-Chave**: Destaque automático de termos em verde/vermelho no abstract.
- [x] 🎛️ **Filtro de Confiança da IA**: Seleção por score de confiança (`>90%`, `>80%`).
- [x] ↩️ **Botão Desfazer (Undo)**: Reversão em 1 clique da última decisão.

### ✅ Fase 4 — Extração de Evidências por IA
- [x] Tabela dinâmica de extração de dados (AUC, Sensibilidade, Arquitetura IA, N).
- [x] Busca filtrada e exportação da planilha em CSV (`brayyan_extracao_evidencias.csv`).
- [x] Modal de configuração de campos (`#extractionModal`).

### ✅ Fase 5 — Avaliação de Risco de Viés (Ferramenta QUADAS-2)
- [x] Módulo QUADAS-2 com gráfico de semáforo (*Traffic Light Plot*) para 4 domínios.
- [x] Classificação estudo por estudo, busca e exportação CSV (`brayyan_quadas2_risco_vies.csv`).
- [x] Modal de diretrizes QUADAS-2 (`#riskModal`).

### ✅ Fase 6 — Fluxograma PRISMA 2020 & Gestão de Equipe
- [x] Modal interativo do Fluxograma PRISMA 2020 (`#prismaModal`) com download de relatório PDF e imagem PNG.
- [x] Módulo de Triagem em Texto Completo (`#fulltext`).
- [x] Modais para convidar membros (`#inviteModal`) e editar dados do projeto (`#editDataModal`).

---

## 🔗 Links Relacionados (Obsidian Vault)
- [[00_INDEX_MOC]] — Mapa central de conteúdos.
- [[CURRENT_STATUS]] — Status atual do deploy e métricas.
- [[01_RAYYAN_RESEARCH]] — Benchmark e comparativo do Rayyan.
