# Brayyan database state

Updated: 2026-05-29 20:20 BRT

## Current database status
- Local smoke tests proved that parse_and_store_csv can create/populate ai_screening_records.
- brayyan.db is ignored and should not be committed.
- Vercel deployment currently has no reliable persisted SQLite dataset.
- Railway target is down/Application not found, so it is not serving as the real data source right now.

## Tables / data model
Main imported review table: ai_screening_records.

Expected important fields:
- source_filename
- record_key
- pubmed_id
- doi
- title
- abstract
- year
- journal
- a_decision, a_confidence, a_labels
- b_decision, b_confidence, b_labels
- comparison_status
- conflict_priority
- provisional_decision
- human_review_needed
- automated_final_queue
- created_at / updated_at

## Confirmed CSV sources
CSV files were temporarily copied to data/:
- automated_screening_consolidated_export.csv, 3,539 records expected
- auto_include.csv, 886 records expected
- auto_exclude.csv, 115 records expected

These files were removed by revert commit 6050e3c because the startup loader deployment broke Vercel APIs. Reintroduce them only with a non-startup import strategy.

## Safe DB plan
1. Restore persistent production DB first, preferably Railway/Postgres.
2. Keep Vercel /api/health independent from import/database bootstrap.
3. Add manual import endpoint or CLI import command.
4. Add idempotency/deduplication by record_key, pubmed_id or doi before repeated imports.
5. Add smoke checks for /api/articles/summary, /api/articles/prisma and /api/articles/metrics after import.
