# Brayyan practical-use roadmap

Updated: 2026-05-30

## Current stable production baseline
- Production must remain on the stable static-first baseline until backend persistence is isolated.
- Health check and root UI are currently stable after emergency restore.
- Do not reintroduce FastAPI routing through Vercel rewrites, api/index.py, startup CSV loader, or SQLite bootstrap in production.

## Practical-use gaps
1. Persistent backend and database are not operational in production.
2. Real CSV dataset with 3,539 articles is not loaded in production.
3. Screening decisions are not saved from the UI.
4. Conflicts A vs B are not actionable in the UI.
5. PRISMA, Kappa and export are not using production data.
6. Authentication is only stub/basic and not practical for team work.

## Safe implementation strategy
- Work in a separate branch until smoke tests pass.
- Keep Vercel production static and stable.
- Implement visual/static UI panels first without changing vercel.json or startup.
- Re-enable backend only behind a separate Railway/FastAPI service with Postgres.
- Add import as a manual command or admin-only endpoint, never as startup code.

## Next safe blocks
1. Add static UI sections for practical workflow status: upload, conflicts, PRISMA, metrics, export and auth readiness.
2. Add frontend fallback only in a syntax-safe way and test with node --check before commit.
3. Add backend API work only after Railway/Postgres is restored.
4. Add integration smoke checklist before deploy.

## Definition of practical MVP
- User can import the consolidated CSV once.
- User can browse all articles.
- User can save include/exclude/maybe decisions.
- User can resolve A/B conflicts.
- User can see PRISMA counts and Kappa.
- User can export CSV with final decisions.
- Admin login protects import/export/conflict resolution.

## Static UI progress added on safe/practical-use-roadmap
- Added Practical MVP tab to expose practical-use readiness directly in the UI.
- Added Operational tab with cards for Upload CSV, Conflicts A vs B, PRISMA flow, Kappa metrics, Export CSV, and Auth readiness.
- These panels are static-only and do not change production API routing, startup behavior, or persistence.
- Current safe branch commits: be2197f, daf88b5, fa235e0.

## UI acceptance checklist
- See docs/UI_ACCEPTANCE_CHECKLIST.md for visual acceptance and smoke gates for the Practical MVP and Operational tabs.
