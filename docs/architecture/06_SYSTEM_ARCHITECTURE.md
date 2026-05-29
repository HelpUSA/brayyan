# Arquitetura do Sistema — Brayyan

## 1. Visao Geral

O Brayyan e uma aplicacao web full-stack com arquitetura desacoplada:
- Frontend: React SPA (Single Page Application)
- Backend: API RESTful (FastAPI)
- Banco de Dados: PostgreSQL
- File Storage: Local ou S3-compatible

## 2. Diagrama de Arquitetura


Client (Browser)
 |
 | HTTPS
 |
[Vercel CDN]
 |
 +-- Static Assets (React SPA)
 |
 +-- API Routes (Serverless Functions)
 |
 |
 [Railway / Backend]
 |
 +-- FastAPI Application
 | |
 | +-- /api/auth/*
 | +-- /api/projects/*
 | +-- /api/articles/*
 | +-- /api/decisions/*
 | +-- /api/upload/*
 | +-- /api/export/*
 | +-- /api/metrics/*
 |
 +-- Background Workers
 | +-- CSV Parser
 | +-- Consensus Calculator
 | +-- Conflict Detector
 | +-- PRISMA Generator
 |
 +-- Database Layer
 +-- PostgreSQL (Railway)


## 3. Componentes

### 3.1 Frontend (Vercel)
- React 18 + TypeScript
- Vite bundler
- TailwindCSS + shadcn/ui
- React Query (data fetching)
- React Router (routing)
- Recharts (graficos)
- Zustand (state management)

### 3.2 Backend (Railway)
- Python 3.12 + FastAPI
- SQLAlchemy ORM
- Alembic (migrations)
- Pandas (CSV processing)
- Pydantic (validation)
- JWT (authentication)
- Celery + Redis (background tasks)

### 3.3 Banco de Dados (Railway)
- PostgreSQL 16
- JSONB para settings flexiveis
- Indices para buscas frequentes

### 3.4 Deploy e DevOps
- GitHub (source control)
- Vercel (frontend + edge functions)
- Railway (backend + database)
- GitHub Actions (CI/CD)
- Codex (documentacao e assistencia)

## 4. Fluxo de Dados

### Upload Flow

User -> Upload CSV -> Vercel API Route -> Railway Backend
 -> Validate CSV -> Parse with Pandas
 -> Insert Articles -> Insert Decisions
 -> Calculate Consensus -> Detect Conflicts
 -> Generate Metrics -> Return Project Status


### Screening View Flow

User -> Request Articles -> API /api/articles?project_id=X
 -> Query with filters (decision, score, labels)
 -> Paginate (50 per page)
 -> Return JSON -> React Table render


### Conflict Resolution Flow

User -> View Conflicts -> API /api/conflicts?project_id=X
 -> Show side-by-side A vs B decisions
 -> User selects resolution -> API PATCH /api/conflicts/:id
 -> Update conflict.resolved = true
 -> Create consensus decision


## 5. Seguranca

- HTTPS obrigatorio (Vercel + Railway)
- JWT tokens com expiracao
- Rate limiting por IP
- Validacao de upload (tamanho maximo, formato CSV)
- SQL injection prevention (SQLAlchemy)
- CORS configurado para brayyan.helpusbr.com
- Senhas hash com bcrypt
- Variaveis de ambiente para secrets
