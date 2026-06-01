# Brayyan backend staging environment block

Updated: 2026-05-30

Branch: backend/staging

## Current status
Backend staging work is blocked at local environment validation. The repository is on branch backend/staging. No production, Vercel, deploy, secrets, startup loader, SQLite persistence or API rewrite changes are involved.

## Findings
- The only Python version found locally is Python 3.14.0.
- The existing .venv also uses Python 3.14.0.
- Python 3.12 was not found through py launcher, where python3.12, where python312, common install paths, pyenv or asdf.
- requirements.txt declares FastAPI, uvicorn, SQLAlchemy, psycopg2-binary, Alembic, pandas, Pydantic and related backend dependencies.
- Importing main:app failed before dependency install with ModuleNotFoundError for fastapi.
- Installing requirements into the Python 3.14 .venv exceeded watcher timeout repeatedly.
- No Brayyan .venv python, pip or uvicorn processes remained after the timeout probes.

## Risk assessment
- Continuing to use Python 3.14 for this backend is risky because dependency installation already timed out and the project docs expect a more stable Python 3.12 style environment.
- Repeating the same pip install command in the same .venv is not recommended.
- Local validation of /api/health is not reliable until the Python environment is corrected.

## Unlock options
### Option A: Local Python 3.12
1. Install Python 3.12 locally.
2. Create a fresh .venv312.
3. Install requirements.txt inside .venv312.
4. Validate import main:app.
5. Start uvicorn locally and curl /api/health.

### Option B: Railway build remoto/staging
1. Keep local code untouched.
2. Use Railway staging build with its supported Python/runtime.
3. Configure environment variables only in Railway.
4. Let Railway install requirements.txt.
5. Validate Railway /api/health before any production or frontend integration.

## Recommendation
Prefer Option A if operator can install Python 3.12 quickly. If local Python installation is not available, use Option B and validate through Railway staging build. Do not continue with the Python 3.14 .venv for full dependency installation unless explicitly approved.

## Guardrails
- Do not touch master or production.
- Do not modify Vercel api/index.py.
- Do not add Vercel API rewrites.
- Do not add CSV startup loader.
- Do not rely on SQLite persistence in Vercel.
- Do not commit credentials, tokens, DATABASE_URL or secrets.
