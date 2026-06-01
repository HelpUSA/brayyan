# Brayyan full functionality roadmap

Updated: 2026-05-31

Branch: backend/staging

## Current decision
The operator decided that Brayyan should move forward with Python 3.14 when possible. The project should not stay blocked on older Python versions. If a dependency is incompatible with Python 3.14, update or replace that dependency in the staging branch after isolating the exact failure.

## Current Railway state
- Railway project: brayyan.
- Current environment inspected: production.
- Service Postgres: online and latest status SUCCESS.
- Service brayyan: latest status FAILED.
- Current production domain observed: brayyan-production.up.railway.app.
- Do not deploy production until staging is green.
- The failed Railway build logs showed Railpack could not determine how to build the app from the deployed snapshot.
- Local backend/staging has the expected root files: main.py, requirements.txt, railway.toml and Procfile.
- This indicates the deployed snapshot or Railway source may not match the current local backend/staging state.

## Guardrails
- Do not touch master until staging is validated.
- Do not deploy production until staging smoke is green.
- Do not modify Vercel api/index.py.
- Do not add Vercel API rewrites.
- Do not add CSV startup loader.
- Do not use SQLite persistence on Vercel.
- Do not commit credentials, tokens, DATABASE_URL or secrets.
- Do not kill broad python.exe processes. Stop only explicitly identified Brayyan PIDs if required.

## Next activities to make Brayyan fully functional

### 1. Stabilize Railway staging
1. Create or select a Railway staging environment.
2. Ensure the active service is brayyan, not Postgres.
3. Deploy the correct local backend/staging snapshot only to staging.
4. Confirm Railway uses root files main.py, requirements.txt, railway.toml and Procfile.
5. Capture build logs and stop before production.

### 2. Fix backend build and deploy
1. Keep railway.toml aligned with FastAPI.
2. Use build command pip install -r requirements.txt or Railway equivalent.
3. Use start command uvicorn main:app --host 0.0.0.0 --port 8000.
4. If Railpack still cannot detect the app, add a minimal start.sh or equivalent Railway-recognized startup file in staging only.
5. Validate that the backend process starts successfully.

### 3. Validate health endpoint
1. Test /api/health in Railway staging.
2. Require HTTP 200 before continuing.
3. Record response and domain in docs.

### 4. Connect backend to Postgres
1. Confirm backend service variables by name only, without exposing values.
2. Ensure DATABASE_URL is available to service brayyan.
3. Use Railway CLI plus psql for select 1 checks when safe.
4. Resolve current proxy connection close observed through DATABASE_PUBLIC_URL.
5. Validate database connectivity from the backend service context.

### 5. Run schema and migrations
1. Inspect models and migration files.
2. Confirm Alembic or SQL migration path.
3. Create or validate tables for projects, articles, uploads, conflicts, decisions, exports and auth if used.
4. Run migrations in staging.
5. Validate schema with read-only SQL checks.

### 6. Import CardioReview or Rayyan data
1. Confirm final CSV format.
2. Run parser dry-run.
3. Validate counts, columns and duplicate behavior.
4. Import into staging only.
5. Validate imported rows and prepare rollback or cleanup if needed.

### 7. Validate backend endpoints
Test health, projects, articles, upload, conflicts, export and auth endpoints. For each endpoint, validate status code, minimal payload, expected error behavior, Postgres persistence and no dependency on Vercel SQLite or startup CSV import.

### 8. Integrate frontend with backend
1. Set API_BASE_URL to Railway staging.
2. Ensure frontend calls Railway backend, not Vercel serverless API.
3. Avoid Vercel API rewrites and api/index.py.
4. Test real browser flows.

### 9. Full application smoke
1. Open site.
2. Authenticate if enabled.
3. Create or open project.
4. Import CSV.
5. List and filter articles.
6. Mark screening decisions.
7. View and resolve conflicts.
8. Export results.
9. Reopen site and confirm Postgres persistence.

### 10. Documentation and handoff
1. Update docs/HANDOFF.md after each validated block.
2. Keep this roadmap current.
3. Document Railway environment, service, domain, health status, database status and pending risks.
4. Never record secrets.

### 11. Commit staging branch
1. Remove unnecessary temp artifacts before commit.
2. Review git diff and diff stat.
3. Commit only intentional docs and code.
4. Push backend/staging.

### 12. Promote to production only after staging is green
1. Prepare production checklist.
2. Confirm database backup or recovery plan.
3. Confirm production variables.
4. Deploy in controlled window.
5. Run post-deploy smoke.
6. Monitor Railway logs.

## Immediate recommended next action
Create or select Railway staging and deploy the correct backend/staging snapshot to service brayyan in staging only. Then validate /api/health before any production action.
