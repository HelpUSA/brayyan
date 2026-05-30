# Brayyan UI acceptance checklist

Updated: 2026-05-30

Branch: safe/practical-use-roadmap

## Scope
This checklist validates the static Practical MVP and Operational tabs without touching production backend, Vercel API routing, startup loaders, or persistent database assumptions.

## Visual acceptance
- Header, tabs and overview remain visible.
- Practical MVP tab is present in the top navigation.
- Operational tab is present in the top navigation.
- Practical MVP tab shows six readiness cards: Import, Screening, Conflicts A vs B, PRISMA, Kappa, Export.
- Operational tab shows six operational cards: Upload CSV, Conflicts A vs B, PRISMA flow, Kappa metrics, Export CSV, Auth readiness.
- Disabled action buttons clearly indicate that Railway/Postgres or persistent DB is required before real operations.
- Cards remain readable on desktop and narrow widths through CSS grid auto-fit behavior.

## Local smoke gates
Run before any commit from this branch:

powershell
python -m py_compile main.py config.py database.py routers/auth.py routers/projects.py routers/articles.py routers/upload.py routers/conflicts.py routers/export.py services/csv_parser.py
node --check static/rayyan.js
git status -sb


## Production safety gates
- Do not deploy this branch to production until explicitly approved.
- Do not modify master directly.
- Do not reintroduce api/index.py.
- Do not add Vercel rewrites for /api.
- Do not add CSV import on FastAPI startup.
- Do not rely on SQLite persistence inside Vercel.

## Backend readiness gates before real data
- Railway/FastAPI/Postgres service is restored and has a stable /api/health.
- Manual CardioReview CSV import command or admin endpoint is implemented outside startup.
- Import validates expected 3,539 consolidated records or documents count differences.
- articles, summary, prisma, metrics, conflicts and export endpoints pass smoke against persistent DB.
- Frontend integration points are switched only after the backend smoke is green.
