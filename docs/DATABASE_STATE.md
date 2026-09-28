---
title: "Brayyan — Estado e Estrutura do Banco de Dados"
tags: [brayyan, database, sqlite, schema, multi-project, parsers]
date: 2026-09-27
status: ativo
aliases: ["Database State", "Modelo de Dados SQLite"]
---

# 🗄️ Brayyan — Estado do Banco de Dados

> [!NOTE] Resumo do Banco de Dados Multi-Projeto
> O banco de dados do Brayyan é gerenciado via **SQLite** local embarcado (`brayyan.db`), garantindo alta velocidade de leitura sem cold-starts no ambiente serverless da Vercel. Oferece suporte nativo a múltiplos projetos/estudos e importação de datasets em formatos **CSV, RIS e BibTeX**.

---

## 📊 Estado Atual das Tabelas

- **Tabela de Projetos**: `projects` (Persistência multi-estudo com metadados PICO)
- **Tabela de Artigos**: `ai_screening_records` (Com coluna `project_id` para escopo isolado por revisão)
- **Total de Registros Padrão**: `3.578` artigos no projeto semente CardioReview (`id: 1`).
- **Tabela de Decisões Humanas**: `human_decisions`
- **Índices Ativos**: `ix_ai_screening_records_key`, `ix_ai_screening_records_pubmed`, `ix_ai_screening_records_doi`, `ix_ai_screening_records_proj`.

---

## 📐 Estrutura da Tabela `projects`

```sql
CREATE TABLE projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    domain TEXT,
    study_type TEXT,
    pico_population TEXT,
    pico_intervention TEXT,
    pico_comparator TEXT,
    pico_outcome TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📐 Estrutura da Tabela `ai_screening_records`

```sql
CREATE TABLE ai_screening_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id TEXT DEFAULT '1',
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

## 📂 Suporte a Arquivos de Entrada

> [!TIP] Formatos Suportados
> - **CSV**: Formato padrão CardioReview ou CSV genérico com mapeamento flexível de colunas (`Title`, `Abstract`, `Year`, `Journal`, `DOI`, `PMID`).
> - **RIS (`.ris`)**: Suporte a tags RIS acadêmicas (`TI`/`T1`, `AB`/`N2`, `PY`/`Y1`, `JO`/`JF`, `DO`, `AN`).
> - **BibTeX (`.bib`)**: Suporte a entradas `@article`, `@inproceedings` e `@misc`.

---

## 🔗 Links Relacionados (Obsidian Vault)
- [[00_INDEX_MOC]] — MOC do projeto.
- [[CURRENT_STATUS]] — Status atual do deploy.
- [[12_MVP_ROADMAP]] — Fases do roadmap concluídas.
