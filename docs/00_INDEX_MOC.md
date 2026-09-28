---
title: "Brayyan Vault Index — Map of Content (MOC)"
tags: [brayyan, moc, helpus, obsidian-vault, index]
date: 2026-09-27
status: ativo
author: "HelpUS Technology"
---

# 🧠 Brayyan Knowledge Base — Obsidian Vault (MOC)

> [!NOTE] Visão Geral do Ecossistema HelpUS
> O **Brayyan** é a plataforma web da **HelpUS Technology** projetada para auditoria, visualização, extração e triagem automatizada por IA de revisões sistemáticas de literatura científica (potencializado por benchmarks do Rayyan.ai).

---

## 🗺️ Mapa de Conteúdo (Map of Content)

### 📌 Estado do Sistema & Operações
- [[CURRENT_STATUS]] — Status ativo do deploy na Vercel e funcionalidades completas.
- [[DATABASE_STATE]] — Estado do banco de dados SQLite com 3.578 registros do CardioReview.
- [[HANDOFF]] — Guia de desenvolvimento local, setup e comandos.

### 📐 Arquitetura & Engenharia
- [[06_SYSTEM_ARCHITECTURE]] — Arquitetura desacoplada FastAPI + Vercel SPA.
- [[07_TECH_STACK]] — Stack tecnológica (Python 3.11, FastAPI, SQLite, Inter UI).
- [[08_PROJECT_STRUCTURE]] — Estrutura completa de diretórios do repositório.
- [[14_DEPLOY]] — Configuração de deploy contínuo na Vercel.

### 📊 Modelagem & Dados
- [[03_DATA_MODEL]] — Modelo relacional de dados para registros de triagem e IA.
- [[04_ER_DIAGRAM]] — Diagrama Entidade-Relacionamento das tabelas.
- [[05_DATABASE_SCHEMA.sql]] — Script SQL DDL de criação de tabelas e índices.

### 🔍 Análise & Produto
- [[00_SYSTEM_ANALYSIS_INDEX]] — Índice da análise detalhada de sistemas.
- [[09_RISK_ANALYSIS]] — Matriz de riscos e planos de mitigação.
- [[12_MVP_ROADMAP]] — Roadmap funcional de fases concluídas do MVP.

### 📚 Pesquisa & Concorrentes (Benchmark Rayyan)
- [[01_RAYYAN_RESEARCH]] — Benchmark, atalhos de teclado e destaque de termos inspirados no Rayyan.ai.
- [[02_COMPETITOR_ANALYSIS]] — Análise comparativa e diferenciais nativos do Brayyan (Dual-watcher, QUADAS-2, Extração IA).

---

> [!SUCCESS] Atualizações Concluídas (Setembro/2026)
> - **Aplicação 100% Online**: `https://brayyan.helpusbr.com`.
> - **Header & Layout HelpUS**: Cabeçalho limpo no topo, footer fixo, aviso de cookies, LGPD e WhatsApp flutuante.
> - **Triagem Interativa com Banco Real**: 3.578 artigos com salvamento de decisões humanas via API (`PATCH /api/decisions/{id}/decision`).
> - **Recursos Inspirados no Rayyan**:
>   - ⌨️ **Atalhos de Teclado**: `1` (Incluir), `2` (Talvez), `3` (Excluir), `U` (Desfazer).
>   - 🔍 **Highlight Dinâmico de Palavras-Chave**: Destaque automático de termos clínicos em verde/vermelho no abstract.
>   - 🎛️ **Filtro de Confiança da IA**: Seleção por score de confiança (`>90%`, `>80%`).
>   - ↩️ **Botão Desfazer (Undo)**: Reversão imediata da última decisão tomada.
> - **Extração de Dados com IA**: Tabela de evidências (AUC, Sensibilidade, Arquitetura IA, N) com exportação CSV.
> - **Matriz QUADAS-2**: Risco de viés gráfico por semáforo (*Traffic Light Plot*) em 4 domínios.
> - **Fluxograma PRISMA 2020**: Diagrama dinâmico em 4 estágios com download PDF/PNG.
