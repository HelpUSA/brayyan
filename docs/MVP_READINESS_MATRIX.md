# Brayyan practical MVP readiness matrix

Updated: 2026-05-30

Branch: safe/practical-use-roadmap

## Goal
Summarize current Brayyan readiness for practical use and guide the decision to restore Railway/FastAPI/Postgres. This is documentation only and does not change production, Vercel routing, backend execution, startup import, SQLite assumptions or credentials.

## Readiness matrix

| Area | Status | Railway/Postgres dependency | Risk | Relative effort | Notes |
|---|---|---|---|---|---|
| Production static UI | Ready | No | Low | Low | Master baseline is stable and must remain protected. |
| Practical MVP UI tab | Ready | No | Low | Low | Implemented on safe branch as static-only. |
| Operational UI tab | Ready | No | Low | Low | Covers upload, conflicts, PRISMA, Kappa, export and auth readiness. |
| Roadmap and guardrails | Ready | No | Low | Low | Docs define prohibited Vercel/serverless/startup patterns. |
| Frontend-backend contract | Ready | No | Low | Low | API_BASE_URL, endpoints, auth, CORS, loading and error behavior documented. |
| CardioReview import mapping | Ready | No | Medium | Low | Mapping and validation rules documented; execution depends on backend. |
| Postgres migrations plan | Ready | Yes | Medium | Medium | Migration/order/constraints checklist documented, not implemented. |
| Railway backend | Blocked | Yes | High | Medium | Requires Railway/FastAPI/Postgres restoration. |
| Persistent Postgres database | Blocked | Yes | High | Medium | Required before real data or decisions. |
| Manual CSV import | Blocked | Yes | High | Medium | Must be manual/dry-run capable; never startup import. |
| Real articles API | Blocked | Yes | High | Medium | Must live on Railway or equivalent backend, not Vercel api/index.py. |
| Save screening decisions | Blocked | Yes | High | Medium | Requires auth, users and persistent DB. |
| Conflicts A vs B workflow | Partial | Yes | Medium | Medium | UI readiness exists; backend endpoints and human decision persistence pending. |
| PRISMA flow | Partial | Yes | Medium | Low | UI readiness exists; real counts require imported data. |
| Kappa metrics | Partial | Yes | Medium | Low | UI readiness exists; real metrics require persisted A/B decisions. |
| Export CSV | Partial | Yes | Medium | Medium | Contract documented; protected backend endpoint pending. |
| Basic auth | Partial | Yes | High | Medium | Roles and token strategy documented; implementation pending. |

## Recommended execution order
1. Keep master production stable and unchanged.
2. Restore Railway/FastAPI/Postgres in isolated staging.
3. Implement migrations and run them against staging Postgres.
4. Implement dry-run import script for small fixture.
5. Implement real import and rollback scripts for small fixture.
6. Run dry-run on CardioReview consolidated CSV.
7. Run real CardioReview import after count/quality review.
8. Implement and smoke articles, summary, prisma, metrics, conflicts and export endpoints.
9. Implement minimal auth and protect import/export/conflict resolution.
10. Connect frontend to Railway API_BASE_URL in staging only.
11. Run browser smoke and export smoke.
12. Decide whether to merge safe branch UI/docs into master or keep as staging preview.

## Go criteria before backend real work
- Railway project exists and is accessible.
- Postgres database exists and credentials are available only as environment variables.
- Backend /api/health can be restored without Vercel rewrites.
- Backup/rollback strategy is approved.
- CardioReview CSV source file and expected count are confirmed.
- Owner approves manual import path and rejects startup loader path.

## No-go criteria
- Any plan requires Vercel api/index.py or /api rewrites.
- Any plan imports CSV during FastAPI startup.
- Any plan relies on SQLite persistence in Vercel.
- Any smoke returns FUNCTION_INVOCATION_FAILED in production.
- CSV source count discrepancy is unexplained.
- Auth protection for import/export is not defined.

## Checklist before backend real execution
- git status is clean.
- Work is on a backend/staging branch, not master.
- Railway service and Postgres are restored.
- Environment variables are configured in Railway only.
- Migrations are reviewed.
- Dry-run script exists.
- Rollback script exists.
- Small fixture test is ready.
- CardioReview CSV is available.
- Smoke plan and rollback plan are documented.

## Final recommendation
Do not attempt more Vercel API work. The safe path is now clear: keep Vercel as static frontend, restore Railway/FastAPI/Postgres, implement migrations and manual import in staging, validate CardioReview counts, then connect the frontend through API_BASE_URL only after backend smoke is green. The current safe branch is ready as a planning/UI readiness branch and should not be deployed to production without explicit approval.
