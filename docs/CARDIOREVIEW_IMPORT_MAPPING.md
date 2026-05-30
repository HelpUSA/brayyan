# Brayyan CardioReview CSV import mapping

Updated: 2026-05-30

Branch: safe/practical-use-roadmap

## Goal
Document the future manual CardioReview CSV import into the Railway FastAPI Postgres backend. This is planning only. No production deploy, no Vercel routing change, no startup loader and no persistent SQLite assumption.

## Expected sources
- Primary consolidated source: automated_screening_consolidated_export.csv or consolidated_export.csv.
- Optional queue files: auto_include.csv and auto_exclude.csv.
- Expected consolidated count: 3,539 records unless the source file documents a different count.
- Known historical UI/source count differences must be documented during import, for example 3,539 versus 3,552 if observed.

## Expected CSV columns
- batch_file
- row_in_batch
- key
- pubmed_id
- doi
- title
- year
- journal
- A_decision
- A_confidence
- A_labels
- B_decision
- B_confidence
- B_labels
- comparison_status
- conflict_priority
- provisional_decision
- human_review_needed
- automated_final_queue

## Destination tables
### projects
Stores the review project metadata. One import run must link to one project_id.

### articles
Stores stable article metadata: record_key, pubmed_id, doi, title, abstract if present, year, journal, authors if present, source_file and timestamps.

### ai_screening_records
Stores A/B reviewer data, comparison status, provisional decision, conflict priority, human review flag and automated final queue.

### import_runs
Stores import audit data: filename, row_count, imported_count, skipped_count, duplicate_count, error_count, status, started_at, finished_at and log_summary.

### human_decisions
Initially empty after import. Filled later by human screening and conflict resolution.

## Key and ID strategy
- Use project_id plus record_key as the preferred natural unique key when key is present.
- If key is missing, use pubmed_id when present.
- If pubmed_id is missing, use normalized DOI when present.
- If all stable identifiers are missing, generate a deterministic hash from title, year and journal.
- Store original CSV row location using batch_file and row_in_batch for traceability.
- Never use CSV row number alone as the permanent article identity.

## Normalization rules
- Trim whitespace from all string fields.
- Convert empty strings, NA and null-like values to database NULL where appropriate.
- Normalize DOI to lowercase and remove URL prefixes.
- Keep original title text but collapse repeated internal whitespace.
- Parse year as integer when possible.
- Normalize A_decision, B_decision and provisional_decision to lowercase canonical values when possible: include, exclude, maybe, uncertain, pending.
- Parse A_confidence and B_confidence as numeric values when possible.
- Parse human_review_needed as boolean from 1, true, yes or equivalent.
- Preserve original labels as text first; split into structured labels only in a later migration if needed.

## Duplicate handling
- Detect duplicates by project_id plus record_key, pubmed_id, doi or deterministic fallback hash.
- In dry-run, report duplicate groups without writing.
- In real import, skip exact duplicates and count them in skipped_count or duplicate_count.
- If duplicate records disagree on decisions, mark for human review and include in log_summary.
- Do not delete existing imported data unless rollback is explicitly requested for a specific import_run.

## Required fields
Minimum required for an article row:
- title or pubmed_id or doi or key.

Recommended fields:
- title
- year
- journal
- A_decision
- B_decision
- comparison_status
- provisional_decision

Rows missing all identifiers and title must be rejected and counted as errors.

## Dry-run behavior
Dry-run must:
- Read the CSV.
- Validate headers.
- Count total rows.
- Count rows with missing identifiers.
- Count duplicates.
- Count invalid years and invalid confidence values.
- Count A/B decision distributions.
- Count comparison_status distribution.
- Count human_review_needed true values.
- Return a summary without writing to articles or ai_screening_records.

## Real import behavior
Real import must:
1. Create an import_runs row with status running.
2. Validate headers before writes.
3. Insert or reuse project.
4. Insert or update articles using stable keys.
5. Insert ai_screening_records linked to articles.
6. Commit in controlled batches or one transaction depending on file size and Railway limits.
7. Update import_runs with imported, skipped, duplicate and error counts.
8. Mark status completed or failed.

## Count validations
- Total CSV rows equals expected consolidated count or documented override.
- Imported plus skipped plus errors equals total parsed rows.
- ai_screening_records count for the project matches imported usable rows.
- articles count is less than or equal to imported rows because duplicates may collapse.
- A_decision and B_decision non-empty counts match screening summary.
- Conflict count matches lower comparison_status containing conflict.
- Human review count matches human_review_needed true.

## Quality validations
- No empty title for rows without pubmed_id or doi.
- DOI format is plausible when DOI is present.
- Year is numeric and in a plausible range.
- Confidence values are numeric and within expected range if present.
- Decision values are in known canonical set or mapped to uncertain.
- Conflict rows have both A and B decisions when possible.
- Human review rows appear in the conflict or uncertain queues.

## Rollback plan
- Rollback by import_run_id.
- Delete ai_screening_records created by that import_run.
- Delete articles created only by that import_run and not referenced by human_decisions.
- Keep import_runs audit row with status rolled_back.
- Never rollback manually with ad hoc deletes in production without a database backup.

## Acceptance criteria
- Dry-run completes with a clear JSON summary.
- Real import completes without startup side effects.
- Expected 3,539 records are validated or discrepancy is documented.
- articles, summary, prisma, metrics, conflicts and export endpoints return JSON against imported data.
- Import audit is visible through import_runs.
- Re-running the same import is idempotent or safely reports duplicates.

## Future smoke checklist
1. Restore Railway FastAPI Postgres.
2. Confirm GET /api/health returns ok.
3. Run dry-run import on a small fixture.
4. Run real import on the small fixture.
5. Roll back the fixture import.
6. Run dry-run on CardioReview consolidated CSV.
7. Review count and quality warnings.
8. Run real CardioReview import.
9. Validate expected row counts.
10. Smoke articles, summary, prisma, metrics, conflicts and export.
11. Export CSV and confirm required columns.
12. Document final import_run_id and counts in handoff.

## Non-goals for this branch
- No production deploy.
- No backend execution.
- No Vercel API rewrites.
- No api/index.py.
- No startup CSV loader.
- No real credentials or secrets.
- No SQLite persistence assumptions in Vercel.
