# Production DB Connectivity TODO

## Current state
- Staging returns database_available=true on article endpoints.
- Production returns HTTP 200 on article endpoints, but database_available=false with OperationalError.
- The application fallback is working and prevents HTTP 500.
- The remaining blocker is Railway production Postgres connectivity, not article route code.

## Done
- Graceful degraded responses added for article DB failures.
- Database connection hardening added.
- Production smoke recovered to HTTP 200.
- CSV import helper repaired and validated with py_compile.

## Next actions
1. Inspect Railway production Postgres service status and service reference.
2. Compare production database variables with staging.
3. Run SELECT 1 from the brayyan production runtime.
4. If SELECT 1 fails, correct DATABASE_URL or service reference in Railway production.
5. Redeploy production after variable changes.
6. Confirm production article endpoints return database_available=true.
7. Import and validate the real CSV only after production DB is healthy.

## Safety rule
Do not remove graceful degraded responses until production DB connectivity is stable.
