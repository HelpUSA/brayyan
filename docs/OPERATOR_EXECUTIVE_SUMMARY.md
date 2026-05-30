# Brayyan operator executive summary

Updated: 2026-05-30

Branch: safe/practical-use-roadmap

## Current state
Brayyan production is stable on the protected static baseline. The safe branch contains UI readiness additions and planning documentation for the practical MVP. This document is for operator decision-making only. It does not change production, Vercel routing, backend execution, startup import behavior, SQLite persistence assumptions or credentials.

## Safe branch status
- Branch: safe/practical-use-roadmap.
- Production master: unchanged by this planning work.
- Static UI additions: Practical MVP and Operational tabs.
- Documentation: complete enough to decide whether to restore Railway/FastAPI/Postgres.
- Local smoke gates have been repeatedly executed: python compile and node syntax check.

## Documents created or updated
- docs/HANDOFF.md: operational handoff and latest branch notes.
- docs/PRACTICAL_USE_ROADMAP.md: roadmap and links to all planning artifacts.
- docs/PRODUCTION_GUARDRAILS.md: production safety rules and prohibited patterns.
- docs/UI_ACCEPTANCE_CHECKLIST.md: visual acceptance and local smoke gates.
- docs/RAILWAY_FASTAPI_POSTGRES_PLAN.md: backend architecture and endpoint plan.
- docs/FRONTEND_BACKEND_API_CONTRACT.md: API_BASE_URL and UI/backend contract.
- docs/CARDIOREVIEW_IMPORT_MAPPING.md: CSV mapping, normalization, validation and rollback rules.
- docs/POSTGRES_MIGRATIONS_IMPORT_CHECKLIST.md: future migrations and import script checklist.
- docs/MVP_READINESS_MATRIX.md: readiness matrix, blockers, go/no-go and execution order.
- docs/SAFE_BRANCH_PLANNING_INDEX.md: master index and reading order for the branch.

## What is ready
- Production static baseline is stable and should remain protected.
- Static Practical MVP tab is ready on the safe branch.
- Static Operational tab is ready on the safe branch.
- Planning docs are ready for backend restoration decision.
- Frontend/backend API contract is defined.
- CardioReview import mapping is defined.
- Postgres migration/import checklist is defined.
- MVP readiness matrix is defined.

## What depends on Railway/Postgres
- Real articles API.
- Persistent article storage.
- Manual CardioReview import.
- Saving human screening decisions.
- Resolving conflicts A vs B.
- Real PRISMA counts.
- Real Kappa metrics.
- Export CSV from real data.
- Authentication-protected admin/reviewer workflows.

## Main risks
- Reintroducing Vercel api/index.py or /api rewrites can break production with FUNCTION_INVOCATION_FAILED.
- Startup CSV import can break all API routes and must remain prohibited.
- SQLite persistence inside Vercel is not reliable for practical use.
- CardioReview count discrepancies, for example 3,539 versus 3,552, must be resolved or documented.
- Import/export/conflict resolution must be protected by minimal auth before real team use.
- Large CSV imports may exceed request limits; prefer CLI/manual import or backend worker flow.

## Operator decision options
### Option A: Continue docs/static only
Use this if Railway/Postgres is not ready. This keeps risk low but does not make Brayyan operational with real data.

### Option B: Restore Railway/FastAPI/Postgres in staging
Recommended next step. This enables backend implementation without risking Vercel production.

### Option C: Merge safe branch UI/docs into master
Only after visual review and explicit approval. This improves production UI documentation but still does not enable real data.

### Option D: Attempt Vercel serverless API again
Not recommended. This path already caused production failures and violates current guardrails.

## Recommendation
Proceed with Option B: restore Railway/FastAPI/Postgres in staging, then implement migrations, dry-run import, rollback, and endpoint smoke according to the planning docs. Keep Vercel as static frontend and do not use Vercel API rewrites or api/index.py.

## Go criteria for backend real work
- Railway service exists and responds to /api/health in staging.
- Postgres database exists and credentials are stored only in environment variables.
- Backup/rollback plan is approved.
- CardioReview CSV source and expected record count are confirmed.
- Migration plan is accepted.
- Dry-run/import/rollback scripts are approved for implementation.
- Minimal auth strategy is accepted before import/export/conflict operations.

## No-go criteria
- Any plan requires Vercel api/index.py.
- Any plan requires Vercel /api rewrites.
- Any plan imports CSV during startup.
- Any plan relies on SQLite persistence in Vercel.
- Railway/Postgres is not available.
- Count discrepancy is unresolved and undocumented.
- Auth for protected operations is undefined.

## Next steps if backend is approved
1. Create backend/staging branch.
2. Restore Railway FastAPI service.
3. Attach Postgres and configure DATABASE_URL only in Railway.
4. Implement migrations for users, projects, articles, import_runs, ai_screening_records and human_decisions.
5. Implement dry-run import for a small fixture.
6. Implement real import and rollback for the fixture.
7. Dry-run CardioReview CSV.
8. Review count/quality warnings.
9. Import CardioReview CSV manually.
10. Smoke health, articles, summary, prisma, metrics, conflicts and export.
11. Implement minimal auth and protect admin operations.
12. Connect frontend via API_BASE_URL only after backend smoke is green.

## Final operator call
The planning/UI readiness phase is complete enough. The practical MVP is blocked on Railway/Postgres. The safest decision is to restore backend infrastructure in staging before any further operational feature work.
