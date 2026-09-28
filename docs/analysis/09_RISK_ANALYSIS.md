---
title: "Brayyan — Análise e Matriz de Riscos"
tags: [brayyan, risk-analysis, security, architecture, obsidian-vault]
date: 2026-09-27
status: ativo
aliases: ["Matriz de Riscos", "Risk Analysis"]
---

# ⚠️ Brayyan — Análise e Matriz de Risco

> [!IMPORTANT] Monitoramento Contínuo
> A matriz abaixo identifica os principais riscos operacionais, técnicos e de dados na triagem assistida por IA do **Brayyan**, acompanhada dos planos de mitigação ativos.

---

## 📊 1. Matriz de Risco

| ID | Risco | Probabilidade | Impacto | Severidade | Status |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **R01** | Formato inconsistente de CSVs de IAs externas | Alta | Alto | 🔴 Crítico | Mitigado |
| **R02** | Degradação de performance em datasets (10k+ artigos) | Média | Médio | 🟡 Alto | Monitorado |
| **R03** | Perda de dados por falha de persistência | Baixa | Alto | 🟡 Médio | Mitigado |
| **R04** | Divergência de colunas entre Watchers A e B | Alta | Médio | 🟡 Alto | Mitigado |
| **R05** | Discrepância nos cálculos estatísticos (Kappa / PRISMA) | Média | Alto | 🟡 Alto | Testado |
| **R06** | Vulnerabilidades de segurança (XSS / Injection) | Baixa | Alto | 🟡 Médio | Mitigado |
| **R07** | Limite de requisições do plano serverless Vercel | Média | Médio | 🟢 Baixo | Monitorado |
| **R08** | Resistência acadêmica à triagem 100% automatizada | Média | Alto | 🟡 Alto | Tratado |

---

## 🔍 2. Detalhamento dos Riscos e Mitigações

### R01 — Formato Inconsistente de CSVs
> [!WARNING] Risco
> Diferentes modelos de IA (ChatGPT, DeepSeek, Claude) podem retornar arquivos CSV com cabeçalhos não padronizados.
- **Mitigação**: Mapeamento dinâmico de colunas no backend (`services/csv_parser.py`), validação estrita de schema e suporte a upload manual padronizado.

### R02 — Performance em Datasets Grandes
> [!TIP] Desempenho
> Datasets acima de 10.000 registros podem desacelerar a renderização do navegador.
- **Mitigação**: Paginação otimizada via SQL (`GET /api/articles/?page=1&limit=50`), virtualização de elementos DOM e índices SQLite por `pubmed_id` e `doi`.

### R03 — Persistência e Backup de Dados
- **Mitigação**: O banco SQLite embarcado (`brayyan.db`) é versionado no repositório com suporte a rotinas de exportação em CSV consolidado a qualquer momento.

### R05 — Precisão das Métricas Estatísticas
> [!NOTE] Auditoria Matemática
> - **Cohen's Kappa**: Implementado em `services/metrics.py` com validação cruzada automatizada.
> - **Fluxo PRISMA**: Contagem em tempo real refletida nos endpoints da API.

---

## 🔗 Links Relacionados (Obsidian Vault)
- [[00_INDEX_MOC]] — Mapa de conteúdo central.
- [[DATABASE_STATE]] — Estado do banco SQLite de 3.578 registros.
- [[06_SYSTEM_ARCHITECTURE]] — Arquitetura de mitigação e rotas API.
