# Brayyan handoff

Updated: 2026-05-29 20:20 BRT

Production has been restored and is stable. Do not re-enable the static CSV bootstrap loader on FastAPI startup. It caused all Vercel API routes, including /api/health, to fail with FUNCTION_INVOCATION_FAILED.

Safe current state:
- GET / works.
- /api/health works.
- UI Rayyan-like is deployed.
- CSV parser/upload endpoint remains in code.
- Real articles API routes exist but need persistent/imported data.

Important failed experiment:
- Commit 14dd8ba added static CSV bootstrap loader and data.
- That deployment failed with 500 FUNCTION_INVOCATION_FAILED on all APIs.
- Commit 6050e3c reverted it and restored production.

Next agent instructions:
1. Do not load CSV during startup.
2. Prefer frontend fallback first.
3. If importing CSV, make it manual and isolated, validate locally, and do not block /api/health.
4. Use Railway/Postgres or another persistent DB for production real data.
5. Always validate with py_compile and deploy smoke before proceeding.
