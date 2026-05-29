# Brayyan

Sistema web para auditoria e visualizacao de revisoes sistematicas com triagem 100% automatizada por IA.

Inspirado no Rayyan.ai, o Brayyan substitui o trabalho humano de triagem por IA (watchers), mantendo o mesmo fluxo de revisao sistematica.

## URL

https://brayyan.helpusbr.com

## Funcionalidades

- Dashboard com cards (Review Info, Data Summary, Members, Screening Progress)
- Tela de Screening com lista de artigos e painel de detalhes
- Keywords include/exclude com contagens
- Estados vazios para Full Text, Data Extraction, Risk of Bias
- Upload de CSVs processados por IAs
- API REST com 6 routers
- Design dark theme Rayyan-like

## Tech Stack

- Backend: Python + FastAPI + SQLAlchemy
- Frontend: HTML/CSS/JS vanilla (servido pelo FastAPI)
- Database: SQLite (local) / PostgreSQL (Railway)
- Deploy: Vercel (frontend + API serverless) + Railway (PostgreSQL)

## Estrutura


brayyan/
├── main.py # FastAPI
├── routers/ # auth, projects, articles, upload, conflicts, export
├── services/ # csv_parser, metrics
├── static/ # index.html, rayyan.css, rayyan.js
├── data/ # CSVs do CardioReview (3.539 artigos)
└── docs/ # Documentacao


## Status

| Componente | Status |
|------------|--------|
| Frontend | Online |
| APIs | Corrigindo (500) |
| Railway | Offline |
| Dados | 3.539 artigos prontos |

## Equipe

- DeepSeek NexosAI
- ChatGPT Projeto Geral
