# Brayyan safe branch planning index

Updated: 2026-05-30

Branch: safe/practical-use-roadmap

## Goal
Provide a master index for all planning and readiness documents created or updated on the safe branch. This is documentation only. It does not change master, production, Vercel routing, api/index.py, startup import behavior, SQLite persistence assumptions, backend execution or credentials.

## Recommended reading order
1. docs/HANDOFF.md
2. docs/PRACTICAL_USE_ROADMAP.md
3. docs/PRODUCTION_GUARDRAILS.md
4. docs/UI_ACCEPTANCE_CHECKLIST.md
5. docs/MVP_READINESS_MATRIX.md
6. docs/RAILWAY_FASTAPI_POSTGRES_PLAN.md
7. docs/FRONTEND_BACKEND_API_CONTRACT.md
8. docs/CARDIOREVIEW_IMPORT_MAPPING.md
9. docs/POSTGRES_MIGRATIONS_IMPORT_CHECKLIST.md

## Document index

| Document | Objective | Readiness status | Railway/Postgres dependency | Notes |
|---|---|---|---|---|
| docs/HANDOFF.md | Current operational handoff and latest safe branch notes. | Ready | No | First file to read when resuming. |
| docs/PRACTICAL_USE_ROADMAP.md | Practical MVP roadmap, implemented static UI progress and links to planning docs. | Ready | Partial | Central roadmap for next phases. |
| docs/PRODUCTION_GUARDRAILS.md | Production safety rules, prohibited actions and backend/data gates. | Ready | No | Critical to avoid repeating Vercel/serverless/startup failures. |
| docs/UI_ACCEPTANCE_CHECKLIST.md | Visual acceptance and smoke gates for Practical MVP and Operational tabs. | Ready | No | Covers static UI readiness only. |
| docs/MVP_READINESS_MATRIX.md | Final readiness matrix for practical MVP, blockers and go/no-go criteria. | Ready | Yes | Best document for decision-making before backend restoration. |
| docs/RAILWAY_FASTAPI_POSTGRES_PLAN.md | Backend architecture plan for Railway/FastAPI/Postgres. | Ready | Yes | Planning only; no backend execution yet. |
| docs/FRONTEND_BACKEND_API_CONTRACT.md | API_BASE_URL, endpoints, request/response shapes, auth, CORS and frontend states. | Ready | Yes | Contract for future Railway integration. |
| docs/CARDIOREVIEW_IMPORT_MAPPING.md | CSV source mapping, normalization, duplicates, dry-run, import and rollback rules. | Ready | Yes | Planning for CardioReview real data import. |
| docs/POSTGRES_MIGRATIONS_IMPORT_CHECKLIST.md | Migration order, constraints, scripts, env vars, logs, tests and acceptance gates. | Ready | Yes | Checklist for future backend implementation. |

## Current readiness summary
- Static production baseline: ready and protected on master.
- Safe branch UI/docs: ready and pushed.
- Practical MVP static panels: ready on safe branch.
- Backend real API: blocked until Railway/FastAPI/Postgres is restored.
- Persistent data: blocked until Postgres is available.
- CardioReview real import: blocked until manual import path exists on Railway backend.
- Screening decisions, conflicts, PRISMA, Kappa, export and auth: partially planned; operational implementation depends on backend and persistent DB.

## Critical restrictions
- Do not modify master or production unless explicitly approved.
- Do not reintroduce Vercel api/index.py.
- Do not add Vercel /api rewrites.
- Do not add CSV import to FastAPI startup.
- Do not rely on SQLite persistence inside Vercel.
- Do not commit credentials, tokens, DATABASE_URL or auth secrets.
- Do not deploy this safe branch to production without explicit approval and smoke.

## Go/no-go next steps
### Go for continued docs/static work
- Branch safe/practical-use-roadmap is clean and synced.
- Work remains documentation or static UI only.
- py_compile and node --check pass.
- No production deploy is required.

### Go for backend real work only when
- Railway/FastAPI service is restored in isolated staging.
- Postgres is available and credentials are configured only in environment variables.
- Migration plan is reviewed.
- Dry-run, import and rollback scripts are ready to implement/test.
- CardioReview CSV source and expected count are confirmed.
- Rollback and backup strategy is approved.

### No-go for backend real work if
- The plan requires Vercel serverless API routing.
- The plan imports CSV on startup.
- The plan relies on SQLite persistence in Vercel.
- Railway/Postgres is not available.
- Expected CardioReview count is unresolved.
- Auth protection for import/export is undefined.

## Future resume checklist
1. Confirm current branch with git status -sb.
2. Read docs/HANDOFF.md.
3. Read docs/MVP_READINESS_MATRIX.md.
4. Confirm production master remains stable.
5. Confirm whether Railway/Postgres has been restored.
6. If not restored, continue only docs/static UI work.
7. If restored, create a backend/staging branch before any implementation.
8. Run local smoke gates before commit.
9. Report completion immediately to coordinator/orchestrator.

## Final recommendation
The safe branch has enough planning artifacts to support the next decision point. The recommended next operational move is not more Vercel work. Restore Railway/FastAPI/Postgres in staging, then follow the migration/import/API contract documents. Until that backend is available, continue only docs/static UI work on safe/practical-use-roadmap.
