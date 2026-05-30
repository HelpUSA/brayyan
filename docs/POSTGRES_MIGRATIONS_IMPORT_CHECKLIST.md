# Brayyan Postgres migrations and import scripts checklist

Updated: 2026-05-30

Branch: safe/practical-use-roadmap

## Goal
Plan the future implementation of Postgres migrations and CardioReview import scripts for Railway/FastAPI/Postgres. This is documentation only: no backend execution, no deploy, no Vercel routing changes, no api/index.py, no startup import and no credentials.

## Migration order
1. Create users table for admin/reviewer/viewer identities.
2. Create projects table for review metadata.
3. Create articles table for canonical article metadata.
4. Create import_runs table for import audit and rollback traceability.
5. Create ai_screening_records table linked to projects, articles and import_runs.
6. Create human_decisions table linked to users, projects and articles.
7. Create indexes and unique constraints.
8. Add optional audit/event table only after core workflow is stable.

## Tables, indexes and constraints
### users
- Primary key: id.
- Unique index: lower(email).
- Required: email, role, created_at.
- Role constraint: admin, reviewer, viewer.

### projects
- Primary key: id.
- Unique index: normalized project name if needed.
- Required: name, created_at.

### articles
- Primary key: id.
- Foreign key: project_id.
- Unique constraints per project: record_key when present, pubmed_id when present, normalized DOI when present, fallback_hash when generated.
- Indexes: project_id, pubmed_id, doi, year, journal, title search if needed.

### import_runs
- Primary key: id.
- Foreign key: project_id.
- Required: filename, status, started_at.
- Status constraint: dry_run, running, completed, failed, rolled_back.
- Indexes: project_id, status, started_at.

### ai_screening_records
- Primary key: id.
- Foreign keys: project_id, article_id, import_run_id.
- Unique constraint: one screening record per project/article/import source policy.
- Indexes: project_id, article_id, comparison_status, conflict_priority, human_review_needed, provisional_decision.

### human_decisions
- Primary key: id.
- Foreign keys: project_id, article_id, user_id.
- Indexes: project_id, article_id, final_decision, decided_at.
- Constraint: final_decision in include, exclude, maybe, uncertain, pending.

## Alembic or equivalent commands
Preferred path: Alembic migrations managed in the Railway backend repository.

powershell
alembic init migrations
alembic revision -m "create core brayyan tables"
alembic upgrade head
alembic current
alembic history


If Alembic is not adopted, use explicit SQL migration files with ordered filenames and a schema_migrations table.

## Future scripts
### Dry-run import
- Script: scripts/import_cardioreview_csv.py --dry-run --project-id 1 --file <csv>.
- Reads CSV, validates headers, normalizes rows, reports counts and warnings, writes nothing.

### Real import
- Script: scripts/import_cardioreview_csv.py --project-id 1 --file <csv>.
- Creates import_runs row, writes articles and ai_screening_records, records errors, commits safely.

### Rollback
- Script: scripts/rollback_import.py --import-run-id <id>.
- Deletes ai_screening_records for the import_run, deletes only unreferenced articles created by that import, marks import_run rolled_back.

## Environment variables
- DATABASE_URL: Railway/Postgres connection string.
- APP_ENV: local, staging, production.
- AUTH_SECRET or JWT_SECRET: backend-only secret.
- ADMIN_EMAIL or initial admin bootstrap variable if needed.
- CORS_ALLOWED_ORIGINS: comma-separated approved frontend origins.
- IMPORT_MAX_ROWS or IMPORT_BATCH_SIZE if batching is required.

No secrets should be committed to git.

## Pre-import validations
- Database migrations are at head.
- /api/health returns ok and database ok.
- CSV file exists and is readable.
- Headers match expected CardioReview columns.
- Dry-run completed successfully.
- Expected 3,539 consolidated records or documented discrepancy is confirmed.
- Current project_id is correct.
- Existing import_runs do not indicate an unfinished import.

## Post-import validations
- imported_count plus skipped_count plus error_count equals parsed row_count.
- ai_screening_records count matches imported usable rows.
- articles count is less than or equal to imported usable rows.
- conflict count matches comparison_status conflict distribution.
- human_review_needed count matches CSV boolean parsing.
- summary, prisma, metrics, conflicts and export endpoints return JSON.
- Export CSV contains required columns.

## Logs and audit
- Every dry-run should produce a structured summary.
- Every real import should create import_runs audit row.
- Errors should include row number, key, field and reason.
- Rollback should preserve the import_runs row with rolled_back status.
- Backend logs should avoid full secrets and avoid excessive row payloads.

## Local test plan
1. Create local Postgres database.
2. Run migrations.
3. Run dry-run on a tiny fixture.
4. Run real import on a tiny fixture.
5. Smoke all endpoints.
6. Roll back fixture import.
7. Repeat with a representative sample.

## Staging test plan
1. Restore Railway staging backend and Postgres.
2. Set env vars in Railway only.
3. Run migrations.
4. Smoke /api/health.
5. Dry-run CardioReview CSV.
6. Real import CardioReview CSV only after dry-run is clean.
7. Smoke UI contract endpoints from allowed origin.
8. Export CSV and verify required columns.

## Risks
- Migration mistakes can corrupt production data; require backup and staging first.
- Duplicate handling can collapse records unexpectedly; log duplicate groups.
- Count discrepancies such as 3,539 vs 3,552 must be documented before acceptance.
- Large CSV imports may exceed request timeouts; prefer CLI or background worker.
- Auth mistakes can expose import/export; admin protection is required before production use.

## Acceptance criteria
- Migrations run from empty DB to current schema.
- Dry-run reports deterministic counts and warnings.
- Real import is idempotent or safely duplicate-aware.
- Rollback works for a test import_run.
- All planned API endpoints return predictable JSON.
- No Vercel production routing changes are needed.

## Future smoke checklist
1. git status -sb is clean before backend work.
2. Migrations compile/run locally.
3. Local tiny fixture dry-run passes.
4. Local tiny fixture import passes.
5. Local rollback passes.
6. Railway staging /api/health passes.
7. Railway staging migrations pass.
8. Railway staging dry-run CardioReview passes.
9. Railway staging real import passes.
10. Endpoint smoke passes: health, articles, summary, prisma, metrics, conflicts, export.
11. Auth smoke passes: login, me, unauthorized protected route.
12. Document import_run_id, counts, warnings and deployment URLs.
