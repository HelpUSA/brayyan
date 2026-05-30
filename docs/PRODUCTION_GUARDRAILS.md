# Brayyan production guardrails

Updated: 2026-05-30

## Never do directly on production
- Do not add CSV loading to FastAPI startup.
- Do not commit large CSV bootstrap data into production deployment until size/runtime is validated.
- Do not route all /api traffic through Vercel Python functions without a minimal isolated smoke.
- Do not deploy if node --check static/rayyan.js fails.
- Do not deploy if python -m py_compile fails.

## Required smoke before deploy
- git status -sb
- python -m py_compile main.py config.py database.py routers/auth.py routers/projects.py routers/articles.py routers/upload.py routers/conflicts.py routers/export.py services/csv_parser.py
- node --check static/rayyan.js
- Vercel deploy only after the above pass.
- After deploy: /api/health must return JSON ok and / must return UI markers.

## Recovery baseline
- Known stable restore point: commit 0cc2100 Emergency restore stable frontend and API files.
- If production returns FUNCTION_INVOCATION_FAILED, immediately restore stable files and deploy.

## Architecture decision
Use Vercel for static frontend and Railway/FastAPI/Postgres for practical API/data. Avoid persistent SQLite expectations inside Vercel.

## Checklist before backend/data sprint
1. Restore Railway/FastAPI/Postgres in an isolated environment.
2. Smoke /api/health on Railway before connecting frontend.
3. Import CardioReview CSV manually, never during app startup.
4. Validate 3,539 expected consolidated records or document any count difference.
5. Smoke articles, summary, prisma, metrics, conflicts and export endpoints against persistent DB.
6. Only then consider frontend API integration. Do not route FastAPI through Vercel api/index.py.
