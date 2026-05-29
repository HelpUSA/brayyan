# Brayyan current status

Updated: 2026-05-29 20:20 BRT

## Production status
- Production is stable again after reverting the static CSV startup loader.
- GET / works and serves the Rayyan-like interface.
- /api/health works and returns status ok/version 0.1.0.
- The failed static CSV bootstrap deployment was reverted by commit 6050e3c.
- Current safe production baseline includes CSV parser/upload endpoint and real articles API routes, but without persisted Vercel data.

## Stable commits
- 6050e3c Revert static CSV bootstrap loader and data; restored production stability.
- 8bac2ac Fix conflict summary SQL pattern.
- 96d1dc5 Add stable real articles APIs.
- 17fbe0d Implement CSV parser and upload endpoint.
- 4c447d8 Use local FastAPI for API routes.

## What works now
- Rayyan-like static UI with overview, tabs, screening panel, criteria and empty-state screens.
- /api/health on Vercel local FastAPI.
- CSV parser service compiles and passed local smoke import into ai_screening_records.
- /api/upload/csv is wired to parse_and_store_csv.
- /api/articles routes exist for list, summary, prisma and metrics, but depend on local SQLite data being present.

## Known limitations
- Vercel local function storage is not a reliable persistent data source.
- Railway service brayyan-production.up.railway.app was returning Application not found.
- Static CSV loader on startup caused FUNCTION_INVOCATION_FAILED and must not be reintroduced in startup form.
- CSV files were removed from the repo by the revert to restore production.

## Next safe implementation plan
1. Add frontend fallback/mock data when /api/articles is empty or fails.
2. Add manual admin/import endpoint only if it does not run on startup.
3. Restore Railway/Postgres or another persistent DB for real data.
4. Re-add CSV data only as an explicitly invoked import or static frontend asset after size/runtime validation.
5. Keep py_compile, git status, deploy smoke and /api/health checks mandatory before every push/deploy.
