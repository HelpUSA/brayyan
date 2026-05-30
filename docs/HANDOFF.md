# Brayyan handoff

Updated: 2026-05-30

Branch: safe/practical-use-roadmap

## Current safe state
- Production master is stable on the static baseline and must remain protected.
- Safe branch safe/practical-use-roadmap contains static UI readiness panels and planning docs only.
- No production deploy has been performed from this branch.
- No Vercel API routing, api/index.py, startup CSV loader, SQLite persistence assumption or credentials were added.

## What changed on the safe branch
- Added static Practical MVP tab.
- Added static Operational tab.
- Added planning docs for production guardrails, UI acceptance, Railway/FastAPI/Postgres, frontend-backend contract, CardioReview import mapping, Postgres migrations/import scripts, readiness matrix, planning index and operator summary.

## Read first when resuming
1. docs/SAFE_BRANCH_PLANNING_INDEX.md
2. docs/OPERATOR_EXECUTIVE_SUMMARY.md
3. docs/MVP_READINESS_MATRIX.md
4. docs/PRODUCTION_GUARDRAILS.md
5. docs/RAILWAY_FASTAPI_POSTGRES_PLAN.md

## Required local smoke
Run before committing any future change on this branch:

powershell
python -m py_compile main.py config.py database.py routers/auth.py routers/projects.py routers/articles.py routers/upload.py routers/conflicts.py routers/export.py services/csv_parser.py
node --check static/rayyan.js
git status -sb


## Critical restrictions
- Do not modify master or production without explicit approval.
- Do not reintroduce Vercel api/index.py.
- Do not add Vercel /api rewrites.
- Do not import CSV during FastAPI startup.
- Do not rely on SQLite persistence inside Vercel.
- Do not commit credentials, DATABASE_URL, tokens or auth secrets.

## Backend readiness
Practical use is blocked until Railway/FastAPI/Postgres is restored in an isolated environment. Once restored, follow:

- docs/RAILWAY_FASTAPI_POSTGRES_PLAN.md
- docs/FRONTEND_BACKEND_API_CONTRACT.md
- docs/CARDIOREVIEW_IMPORT_MAPPING.md
- docs/POSTGRES_MIGRATIONS_IMPORT_CHECKLIST.md

## Next recommended step
Await operator decision to restore Railway/Postgres. If backend remains unavailable, continue only docs/static UI work on safe/practical-use-roadmap.

## Recovery note
If production ever returns FUNCTION_INVOCATION_FAILED after backend/routing changes, restore the latest verified static baseline immediately and avoid Vercel serverless API routing.
