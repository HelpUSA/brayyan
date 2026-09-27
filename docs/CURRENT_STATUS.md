---
title: "Brayyan — Status Atual do Sistema"
tags: [brayyan, status, vercel, deploy, helpus]
date: 2026-09-27
status: ativo
aliases: ["Status do Projeto", "Current Status"]
---

# 🚀 Brayyan — Status Atual do Sistema

> [!SUCCESS] Sistema Operacional & Produção Ativa
> A aplicação **Brayyan** está 100% online, estilizada e operacional em produção no domínio oficial da **HelpUS Technology**.

---

## 🌐 Infraestrutura & Links

| Componente | Status | URL Oficial |
| :--- | :---: | :--- |
| **Vercel CDN + Python API** | 🟢 Online | `https://brayyan.vercel.app` |
| **Domínio Oficial HelpUS** | 🟢 Online | `https://brayyan.helpusbr.com` |
| **Repositório GitHub** | 🟢 Ativo | `https://github.com/HelpUSA/brayyan` |
| **Banco de Dados SQLite** | 🟢 Embarcado | `brayyan.db` (3.578 registros) |

---

## 📊 Métricas do Dataset em Produção

> [!INFO] Dados do CardioReview Carregados
> - **Total de Artigos**: `3.578`
> - **Artigos Incluídos pela IA**: `886`
> - **Artigos Excluídos pela IA**: `2.692`
> - **Conflitos Pendentes entre Watchers**: `81`
> - **Concordância da IA**: `97.74%`
> - **Coeficiente Kappa de Cohen**: `0.9479` (Excelente)

---

## 🎯 Funcionalidades Concluídas

- [x] **Frontend SPA estilizado**: Layout responsivo em dark-mode no padrão Rayyan com marca **HelpUS Technology**.
- [x] **Padronização de Idioma (pt-BR)**: Toda a UI, botões, abas e diálogos traduzidos para Português.
- [x] **Rodapé Institucional & LGPD**: Modal de Política de Privacidade, Termos de Uso e aviso de Cookies.
- [x] **Botão Flutuante de WhatsApp**: Atendimento integrado no canto inferior direito.
- [x] **Backend FastAPI**: Servidor Python com 6 routers ativos (`/api/articles`, `/api/conflicts`, `/api/upload`, `/api/export`, `/api/decisions`, `/api/health`).
- [x] **Auditabilidade & Métricas**: Cálculo em tempo real do PRISMA Flow e Cohens Kappa.

---

## 🔗 Links Relacionados (Obsidian Vault)
- [[00_INDEX_MOC]] — Mapa central de conteúdos.
- [[DATABASE_STATE]] — Estado do banco de dados e esquema.
- [[HANDOFF]] — Instruções para desenvolvedores.
- [[06_SYSTEM_ARCHITECTURE]] — Arquitetura de microsserviços.
