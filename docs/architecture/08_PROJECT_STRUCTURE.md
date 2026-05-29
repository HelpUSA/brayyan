# Estrutura do Projeto — Brayyan

## Repositorio (Monorepo)


brayyan/
├── README.md
├── .gitignore
├── .github/
│ └── workflows/
│ ├── deploy-frontend.yml
│ └── deploy-backend.yml
├── docs/
│ ├── analysis/
│ │ ├── 00_SYSTEM_ANALYSIS_INDEX.md
│ │ ├── 09_RISK_ANALYSIS.md
│ │ └── 12_MVP_ROADMAP.md
│ ├── research/
│ │ ├── 01_RAYYAN_RESEARCH.md
│ │ └── 02_COMPETITOR_ANALYSIS.md
│ ├── modeling/
│ │ ├── 03_DATA_MODEL.md
│ │ ├── 04_ER_DIAGRAM.md
│ │ └── 05_DATABASE_SCHEMA.sql
│ └── architecture/
│ ├── 06_SYSTEM_ARCHITECTURE.md
│ ├── 07_TECH_STACK.md
│ ├── 08_PROJECT_STRUCTURE.md
│ └── 14_DEPLOY.md
├── frontend/
│ ├── index.html
│ ├── package.json
│ ├── tsconfig.json
│ ├── vite.config.ts
│ ├── tailwind.config.ts
│ ├── public/
│ │ └── favicon.ico
│ └── src/
│ ├── main.tsx
│ ├── App.tsx
│ ├── routes/
│ │ ├── Dashboard.tsx
│ │ ├── ProjectView.tsx
│ │ ├── ScreeningView.tsx
│ │ ├── ConflictsView.tsx
│ │ └── AnalyticsView.tsx
│ ├── components/
│ │ ├── ui/ (shadcn/ui)
│ │ ├── layout/
│ │ │ ├── Sidebar.tsx
│ │ │ └── Header.tsx
│ │ ├── upload/
│ │ │ └── CSVUploader.tsx
│ │ ├── screening/
│ │ │ ├── ArticleCard.tsx
│ │ │ └── DecisionButtons.tsx
│ │ ├── conflicts/
│ │ │ └── ConflictResolver.tsx
│ │ └── analytics/
│ │ ├── PrismaFlow.tsx
│ │ └── ConcordanceChart.tsx
│ ├── hooks/
│ │ ├── useArticles.ts
│ │ ├── useProjects.ts
│ │ └── useUpload.ts
│ ├── lib/
│ │ ├── api.ts
│ │ └── utils.ts
│ └── types/
│ └── index.ts
├── backend/
│ ├── requirements.txt
│ ├── Dockerfile
│ ├── alembic.ini
│ ├── main.py
│ ├── config.py
│ ├── database.py
│ ├── migrations/
│ │ └── versions/
│ ├── models/
│ │ ├── user.py
│ │ ├── project.py
│ │ ├── article.py
│ │ ├── decision.py
│ │ ├── evidence.py
│ │ └── conflict.py
│ ├── schemas/
│ │ ├── user.py
│ │ ├── project.py
│ │ ├── article.py
│ │ └── upload.py
│ ├── routers/
│ │ ├── auth.py
│ │ ├── projects.py
│ │ ├── articles.py
│ │ ├── upload.py
│ │ ├── conflicts.py
│ │ └── export.py
│ ├── services/
│ │ ├── csv_parser.py
│ │ ├── consensus.py
│ │ ├── conflict_detector.py
│ │ └── metrics.py
│ └── tasks/
│ ├── celery_app.py
│ └── import_task.py

