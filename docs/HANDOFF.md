---
title: "Brayyan — Guia de Retomada e Handoff"
tags: [brayyan, handoff, dev-guide, setup, vercel]
date: 2026-09-27
status: ativo
aliases: ["Handoff", "Guia de Retomada"]
---

# 🛠️ Brayyan — Guia de Retomada & Handoff

> [!IMPORTANT] Requisitos de Ambiente
> - **Python**: `3.11+` ou `3.14`
> - **Virtualenv**: `.venv/`
> - **FastAPI**: `0.111.0`
> - **SQLite**: `brayyan.db` (já incluso no repositório)

---

## 💻 Setup Local Passo a Passo

```bash
# 1. Clonar ou navegar até a pasta do projeto
cd D:\AntiG\brayyan

# 2. Ativar o ambiente virtual
.\.venv\Scripts\activate

# 3. Instalar dependências (caso necessário)
pip install -r requirements.txt

# 4. Executar o servidor de desenvolvimento
uvicorn main:app --reload --port 8000
```

Acesse localmente em: `http://localhost:8000`

---

## 🚀 Roteiro de Deploy na Vercel

```bash
# O deploy na Vercel é 100% automático via Git
git add .
git commit -m "Sua mensagem de atualização"
git push origin master
```

---

## 🔗 Links Relacionados (Obsidian Vault)
- [[00_INDEX_MOC]] — Mapa de conteúdo central.
- [[CURRENT_STATUS]] — Status da produção e domínio.
- [[06_SYSTEM_ARCHITECTURE]] — Arquitetura FastAPI + Vercel CDN.
- [[12_MVP_ROADMAP]] — Fases de evolução do produto.
