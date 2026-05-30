# Brayyan Railway FastAPI Postgres backend plan

Updated: 2026-05-30

Branch: safe/practical-use-roadmap

## Goal
Prepare a safe backend architecture for practical Brayyan usage with real CardioReview data, without changing Vercel production routing or deploying backend changes from this branch.

## Architecture
- Vercel remains static frontend only.
- Railway hosts FastAPI backend.
- Postgres on Railway or managed provider stores all review data.
- Frontend API base URL must point to Railway only after Railway smoke passes.
- No api/index.py, no Vercel /api rewrites, no startup CSV loader, and no SQLite persistence assumptions in Vercel.

## Core data model
### projects
- id
- name
- description
- created_at
- updated_at

### articles
- id
- project_id
- record_key
- pubmed_id
- doi
- title
- abstract
- year
- journal
- authors
- source_file
- created_at

### ai_screening_records
- id
- project_id
- article_id
- a_decision
- a_confidence
- a_labels
- b_decision
- b_confidence
- b_labels
- comparison_status
- conflict_priority
- provisional_decision
- human_review_needed
- automated_final_queue
- created_at
- updated_at

### human_decisions
- id
- project_id
- article_id
- user_id
- final_decision
- exclusion_reason
- notes
- decided_at

### users
- id
- email
- password_hash or external identity
- role: admin, reviewer, viewer
- created_at

### import_runs
- id
- project_id
- filename
- row_count
- imported_count
- skipped_count
- error_count
- status
- started_at
- finished_at
- log_summary

## Planned endpoints
### Health and metadata
- GET /api/health
- GET /api/projects
- GET /api/projects/{id}

### Import
- POST /api/admin/import/csv
- GET /api/admin/import-runs
- GET /api/admin/import-runs/{id}

### Articles and screening
- GET /api/articles?project_id=...&page=...&limit=...&status=...
- GET /api/articles/{id}
- POST /api/articles/{id}/decision
- PATCH /api/articles/{id}/decision

### Conflicts
- GET /api/conflicts?project_id=...
- GET /api/conflicts/{article_id}
- POST /api/conflicts/{article_id}/resolve

### PRISMA and metrics
- GET /api/articles/summary?project_id=...
- GET /api/articles/prisma?project_id=...
- GET /api/articles/metrics?project_id=...

### Export
- GET /api/export/csv?project_id=...
- GET /api/export/prisma?project_id=...
- GET /api/export/metrics?project_id=...

### Auth
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/me

## Manual CardioReview import flow
1. Restore Railway backend and Postgres.
2. Run database migrations.
3. Confirm GET /api/health returns ok from Railway.
4. Upload or mount the CardioReview consolidated CSV.
5. Run manual import command or admin endpoint.
6. Validate expected 3,539 consolidated records, or document count difference.
7. Check import_runs status and error summary.
8. Smoke articles, summary, prisma, metrics, conflicts and export endpoints.
9. Only after green backend smoke, connect frontend to Railway API base URL.

## Minimal authentication
- Admin can import CSV, export data and resolve conflicts.
- Reviewer can screen articles and add decisions.
- Viewer can read dashboards and PRISMA/metrics.
- Store secrets only in Railway environment variables.
- Never commit tokens, database URLs or password hashes.

## Rollback strategy
- If Railway backend fails: keep Vercel static frontend unchanged.
- If import fails: mark import_run failed, rollback transaction if possible, or truncate imported rows for that import_run.
- If frontend API integration fails: revert frontend API base URL change and keep static UI visible.
- If production Vercel fails: restore master baseline commit 0cc2100 or latest verified stable static commit.

## Future execution checklist
1. Confirm branch and clean git status.
2. Confirm Railway project and Postgres database exist.
3. Set DATABASE_URL and auth secrets in Railway only.
4. Run migrations.
5. Smoke Railway /api/health.
6. Run manual CSV import.
7. Validate row counts and import logs.
8. Smoke all read endpoints.
9. Smoke one write endpoint in staging/test project.
10. Connect frontend API base URL.
11. Run browser smoke.
12. Tag release and document exact commit/deploy URLs.

## Risks
- Vercel serverless routing previously caused FUNCTION_INVOCATION_FAILED. Avoid it.
- Startup import previously broke all API routes. Avoid it.
- CSV size/runtime may exceed deployment/function limits. Use manual import on backend worker/admin flow.
- Count mismatch between 3,539 and other observed counts must be explicitly documented.
- Auth must be minimal but mandatory before multi-user real screening.
