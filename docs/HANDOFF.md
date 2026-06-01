# Brayyan handoff

Updated: 2026-05-30

Branch: safe/practical-use-roadmap

## Current safe state
- Production master is stable on the static baseline and must remain protected.
- Safe branch safe/practical-use-roadmap contains static UI readiness panels and planning docs only.
- No production deploy has been performed from this branch.
- No Vercel API routing, api/index.py, startup CSV loader, SQLite persistence assumption or credentials were added.

## What changed on the safe branch
- Added static Practical MVP tab.
- Added static Operational tab.
- Added planning docs for production guardrails, UI acceptance, Railway/FastAPI/Postgres, frontend-backend contract, CardioReview import mapping, Postgres migrations/import scripts, readiness matrix, planning index and operator summary.

## Read first when resuming
1. docs/SAFE_BRANCH_PLANNING_INDEX.md
2. docs/OPERATOR_EXECUTIVE_SUMMARY.md
3. docs/MVP_READINESS_MATRIX.md
4. docs/PRODUCTION_GUARDRAILS.md
5. docs/RAILWAY_FASTAPI_POSTGRES_PLAN.md

## Required local smoke
Run before committing any future change on this branch:

powershell
python -m py_compile main.py config.py database.py routers/auth.py routers/projects.py routers/articles.py routers/upload.py routers/conflicts.py routers/export.py services/csv_parser.py
node --check static/rayyan.js
git status -sb


## Critical restrictions
- Do not modify master or production without explicit approval.
- Do not reintroduce Vercel api/index.py.
- Do not add Vercel /api rewrites.
- Do not import CSV during FastAPI startup.
- Do not rely on SQLite persistence inside Vercel.
- Do not commit credentials, DATABASE_URL, tokens or auth secrets.

## Backend readiness
Practical use is blocked until Railway/FastAPI/Postgres is restored in an isolated environment. Once restored, follow:

- docs/RAILWAY_FASTAPI_POSTGRES_PLAN.md
- docs/FRONTEND_BACKEND_API_CONTRACT.md
- docs/CARDIOREVIEW_IMPORT_MAPPING.md
- docs/POSTGRES_MIGRATIONS_IMPORT_CHECKLIST.md

## Next recommended step
Await operator decision to restore Railway/Postgres. If backend remains unavailable, continue only docs/static UI work on safe/practical-use-roadmap.

## Recovery note
If production ever returns FUNCTION_INVOCATION_FAILED after backend/routing changes, restore the latest verified static baseline immediately and avoid Vercel serverless API routing.

## Backend staging environment block
- Local backend validation is blocked because only Python 3.14 is available and Python 3.12 is absent.
- requirements install in the Python 3.14 .venv timed out repeatedly.
- See docs/BACKEND_STAGING_ENV_BLOCK.md for unlock options: install Python 3.12/create .venv312 or use Railway staging build.

## Full functionality roadmap saved
- Roadmap saved in docs/BRAYYAN_FULL_FUNCTIONALITY_ROADMAP.md.
- Operator decision recorded: proceed with Python 3.14 when possible and replace incompatible dependencies instead of staying blocked on older Python versions.
- Railway next action recorded: use staging first, deploy correct backend/staging snapshot to brayyan service, validate /api/health, then continue Postgres, migrations, imports, endpoints, frontend integration and smoke.
- Production remains protected until staging is green.

## Pre-up gate for Railway staging
- Railway staging is created and linked locally.
- Service brayyan is linked in staging and has URL https://brayyan-staging.up.railway.app .
- Postgres staging is SUCCESS.
- Production is not linked and must remain untouched.
- Required root files for deploy: main.py, requirements.txt, railway.toml, Procfile.
- .railwayignore must be non-empty before railway up and must exclude local venvs, temp, caches, env files, logs, Vercel metadata, node_modules, dist and local SQLite/database files.
- .railwayignore must not exclude main.py, requirements.txt, railway.toml, Procfile or static assets needed by the backend.
- Command for operator only after final gate approval: cd D:/dev/brayyan; railway environment link staging; railway service link brayyan; railway up
- Post-up checks: railway service list --json; railway logs --service brayyan --environment staging --tail 120; curl.exe -i https://brayyan-staging.up.railway.app/api/health 
- Rollback/check: if staging build fails, do not touch production; inspect logs, fix staging branch/config, redeploy staging only.
- Risks: excluding frontend may be acceptable for backend health but can affect full static frontend serving; excluding static is not allowed if static assets are needed.

## Railway staging pre-up gate finalized
- .railwayignore finalized to exclude local venvs, caches, temp, git metadata, Vercel metadata, node_modules, dist, frontend, docs, env files, logs and local DB/SQLite files.
- .railwayignore intentionally keeps main.py, requirements.txt, railway.toml, Procfile, static, routers, services, models, schemas and tasks available for Railway deploy.
- Staging deploy command remains operator-gated: cd D:/dev/brayyan; railway environment link staging; railway service link brayyan; railway up

## Railway staging smoke update
- Staging deployment is SUCCESS and serving Brayyan from https://brayyan-staging.up.railway.app .
- Health endpoint returned HTTP 200 with status ok/version 0.1.0.
- Root route returned HTTP 200 and serves the static frontend.
- DATABASE_URL and ENVIRONMENT are present on the brayyan staging service.
- Postgres service is SUCCESS and linked through Railway variable reference.
- GET smoke confirmed HTTP 200 for /api/articles/summary and /api/articles/ after Postgres compatibility patches.
- Production remains untouched.

## Final staging smoke before commit
- Latest staging deployment: b5fbd7f9-0f4b-463e-9842-726a65a9224a, SUCCESS, running=1, crashed=0.
- Final GET smoke: root=200, health=200, projects=200, articles=200, summary=200, conflicts=200, export=200.
- Python compile check passed for main backend modules.
- Postgres compatibility patches applied: conditional SQLAlchemy connect_args, PostgreSQL identity primary key, boolean filters.
- Procfile/start.sh use Railway PORT via bash start.sh; start.sh protected by .gitattributes eol=lf.
- Production remains untouched.

## Production smoke recovery check
- After the production command timeout, recovery checks confirmed staging remains linked locally.
- Staging health returned HTTP 200.
- Production health returned HTTP 200.
- Final full production endpoint smoke was requested in command brayyan_prod_final_smoke_status_docs_127.

## Production DB connectivity note
- Production deploy is SUCCESS and static/non-DB endpoints are HTTP 200.
- Production /api/articles/ and /api/articles/summary remain HTTP 500 due to Postgres connectivity from the brayyan service.
- Observed errors include connection refused on postgres.railway.internal and closed connection on zephyr.proxy.rlwy.net public proxy.
- Staging remains healthy and linked locally after restoring routers/articles.py from committed green state.
- Next production fix should focus on Railway Postgres service/networking/variables rather than app code because staging is green with the same commit.

## Production DB connectivity note
- Production deploy is SUCCESS and static/non-DB endpoints are HTTP 200.
- Production /api/articles/ and /api/articles/summary remain HTTP 500 due to Postgres connectivity from the brayyan service.
- Observed errors include connection refused on postgres.railway.internal and closed connection on zephyr.proxy.rlwy.net public proxy.
- Staging remains healthy and linked locally after restoring routers/articles.py from committed green state.
- Next production fix should focus on Railway Postgres service/networking/variables rather than app code because staging is green with the same commit.

## Production DB connectivity note
- Production deploy is SUCCESS and static/non-DB endpoints are HTTP 200.
- Production /api/articles/ and /api/articles/summary remain HTTP 500 due to Postgres connectivity from the brayyan service.
- Observed errors include connection refused on postgres.railway.internal and closed connection on zephyr.proxy.rlwy.net public proxy.
- Staging remains healthy and linked locally after restoring routers/articles.py from committed green state.
- Next production fix should focus on Railway Postgres service/networking/variables rather than app code because staging is green with the same commit.

## Production DB connectivity note
- Production deploy is SUCCESS and static/non-DB endpoints are HTTP 200.
- Production /api/articles/ and /api/articles/summary remain HTTP 500 due to Postgres connectivity from the brayyan service.
- Observed errors include connection refused on postgres.railway.internal and closed connection on zephyr.proxy.rlwy.net public proxy.
- Staging remains healthy and linked locally after restoring routers/articles.py from committed green state.
- Next production fix should focus on Railway Postgres service/networking/variables rather than app code because staging is green with the same commit.
