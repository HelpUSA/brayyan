# Production DB Connectivity TODO

Current state: staging returns database_available=true. Production returns HTTP 200 through graceful degraded responses but database_available=false with OperationalError.

Next actions:
1. Fix Railway production Postgres connectivity or service reference.
2. Verify SELECT 1 from the brayyan production runtime.
3. Keep graceful degraded responses as fallback.
4. Re-run production smoke for root, health, articles, summary, projects, conflicts, and export.
5. Confirm production articles payload returns database_available=true.

Do not remove the graceful degradation until production DB connectivity is stable.
