---
title: "Brayyan — Estado e Estrutura do Banco de Dados"
tags: [brayyan, database, sqlite, schema, cardioreview]
date: 2026-09-27
status: ativo
aliases: ["Database State", "Modelo de Dados SQLite"]
---

# 🗄️ Brayyan — Estado do Banco de Dados

> [!NOTE] Resumo do Banco de Dados
> O banco de dados do Brayyan é gerenciado via **SQLite** local embarcado (`brayyan.db`, 1,88 MB), garantindo alta velocidade de leitura sem cold-starts no ambiente serverless da Vercel.

---

## 📊 Estado Atual dos Dados

- **Tabela Principal**: `ai_screening_records`
- **Total de Registros**: `3.578` artigos provenientes do dataset CardioReview.
- **Tabela de Decisões Humanas**: `human_decisions`
- **Índices Ativos**: `ix_ai_screening_records_key`, `ix_ai_screening_records_pubmed`, `ix_ai_screening_records_doi`.

---

## 📐 Estrutura da Tabela `ai_screening_records`

```sql
CREATE TABLE ai_screening_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source_filename TEXT,
    record_key TEXT,
    pubmed_id TEXT,
    doi TEXT,
    title TEXT,
    abstract TEXT,
    year INTEGER,
    journal TEXT,
    a_decision TEXT,
    a_confidence REAL,
    a_labels TEXT,
    b_decision TEXT,
    b_confidence REAL,
    b_labels TEXT,
    comparison_status TEXT,
    conflict_priority TEXT,
    provisional_decision TEXT,
    human_review_needed INTEGER DEFAULT 0,
    automated_final_queue TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔍 Endpoints de Leitura e Métricas

> [!TIP] Validação das APIs
> - `GET /api/articles/` — Retorna os artigos paginados.
> - `GET /api/articles/summary` — Retorna as contagens de incluídos/excluídos e conflitos.
> - `GET /api/articles/prisma` — Retorna a contagem exata para o fluxo PRISMA.
> - `GET /api/articles/metrics` — Retorna o cálculo do índice **Cohen's Kappa** ($K = 0.9479$).

---

## 🔗 Links Relacionados (Obsidian Vault)
- [[00_INDEX_MOC]] — MOC do projeto.
- [[CURRENT_STATUS]] — Status atual do deploy.
- [[03_DATA_MODEL]] — Modelo relacional detalhado.
- [[05_DATABASE_SCHEMA.sql]] — Script SQL original.
