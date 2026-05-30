# Brayyan frontend-backend API contract

Updated: 2026-05-30

Branch: safe/practical-use-roadmap

## Goal

Define the future contract between the static Brayyan frontend and a Railway-hosted FastAPI backend without changing Vercel production, Vercel rewrites, api/index.py, startup loaders, or persistence behavior.

## API_BASE_URL

The frontend should use one configurable base URL:

```text
API_BASE_URL=https://<railway-backend-domain>
```

Rules:

- Local development can use `http://127.0.0.1:8000`.
- Staging should use a Railway staging backend.
- Production should use the verified Railway production backend.
- The static Vercel frontend must not route `/api` through Vercel serverless functions.
- The API base URL must be switched only after backend smoke tests pass.

## Environment strategy

### Local

- Frontend: local static server or Vercel preview.
- Backend: local FastAPI.
- Database: local Postgres or isolated test database.
- CSV import: small fixture first, then CardioReview CSV.

### Staging

- Frontend: Vercel preview branch or local static build.
- Backend: Railway staging service.
- Database: Railway staging Postgres.
- Purpose: validate import, endpoints, CORS, auth and browser integration.

### Production

- Frontend: Vercel static deployment.
- Backend: Railway production FastAPI.
- Database: Railway production Postgres.
- Import: admin/manual action only, never startup import.

## UI-consumed endpoints

### Health

Request:

```http
GET /api/health
```

Response:

```json
{
  "status": "ok",
  "version": "0.1.0",
  "database": "ok"
}
```

### Articles list

Request:

```http
GET /api/articles?project_id=1&page=1&limit=50&status=pending
```

Response:

```json
{
  "project_id": "1",
  "page": 1,
  "limit": 50,
  "total": 3539,
  "articles": [
    {
      "id": 1,
      "key": "record-key",
      "pubmed_id": "123456",
      "doi": "10.x/example",
      "title": "Article title",
      "abstract": "Abstract text",
      "year": 2026,
      "journal": "Journal name",
      "A_decision": "include",
      "A_confidence": 0.91,
      "A_labels": "ai,ecg",
      "B_decision": "exclude",
      "B_confidence": 0.82,
      "B_labels": "ecg",
      "comparison_status": "conflict",
      "conflict_priority": "high",
      "provisional_decision": "include",
      "human_review_needed": true,
      "automated_final_queue": "review"
    }
  ]
}
```

### Article detail

Request:

```http
GET /api/articles/{id}
```

Response:

```json
{
  "article": {
    "id": 1,
    "title": "Article title",
    "abstract": "Abstract text"
  },
  "decisions": {
    "A": "include",
    "B": "exclude",
    "human_final": null
  }
}
```

### Save human decision

Request:

```http
POST /api/articles/{id}/decision
Authorization: Bearer <token>
Content-Type: application/json
```

Body:

```json
{
  "final_decision": "include",
  "exclusion_reason": null,
  "notes": "Resolved after human review."
}
```

Response:

```json
{
  "status": "ok",
  "article_id": 1,
  "final_decision": "include"
}
```

### Conflicts

Request:

```http
GET /api/conflicts?project_id=1&page=1&limit=50
```

Response:

```json
{
  "project_id": "1",
  "total": 120,
  "conflicts": [
    {
      "article_id": 1,
      "title": "Article title",
      "A_decision": "include",
      "B_decision": "exclude",
      "conflict_priority": "high",
      "human_review_needed": true
    }
  ]
}
```

### PRISMA

Request:

```http
GET /api/articles/prisma?project_id=1
```

Response:

```json
{
  "project_id": "1",
  "identified": 3539,
  "duplicates": 0,
  "screened": 3539,
  "excluded": 0,
  "full_text_assessed": 0,
  "included": 0,
  "conflicts": 0
}
```

### Metrics

Request:

```http
GET /api/articles/metrics?project_id=1
```

Response:

```json
{
  "project_id": "1",
  "paired_decisions": 3539,
  "agreement": 0.82,
  "cohen_kappa": 0.64,
  "conflicts": 120,
  "source": "database"
}
```

### Export CSV

Request:

```http
GET /api/export/csv?project_id=1
Authorization: Bearer <token>
```

Response:

- Content-Type: `text/csv`
- Download filename: `brayyan_project_1_export.csv`

Required columns:

```text
id,key,pubmed_id,doi,title,year,journal,A_decision,A_confidence,A_labels,B_decision,B_confidence,B_labels,comparison_status,conflict_priority,provisional_decision,human_review_needed,final_decision,exclusion_reason,notes
```

### Auth

Login request:

```http
POST /api/auth/login
Content-Type: application/json
```

Body:

```json
{
  "email": "reviewer@example.com",
  "password": "secret"
}
```

Response:

```json
{
  "access_token": "jwt-or-session-token",
  "token_type": "bearer",
  "user": {
    "email": "reviewer@example.com",
    "role": "reviewer"
  }
}
```

## Error format

All API errors should use a predictable JSON shape:

```json
{
  "status": "error",
  "code": "IMPORT_VALIDATION_FAILED",
  "message": "Human readable error.",
  "details": {}
}
```

Frontend handling:

- `401`: show login required.
- `403`: show permission denied.
- `404`: show not found.
- `409`: show conflict or duplicate action.
- `422`: show validation message.
- `500`: show backend unavailable and keep existing static UI usable.

## Loading and empty states

- Article list loading: show loading card, keep previous list if present.
- Empty article list: show "No imported records yet" and link to Upload CSV readiness.
- Conflicts empty: show "No conflicts pending".
- PRISMA empty: show zero counts with "awaiting import".
- Metrics empty: show Kappa TBD and explain that paired A/B decisions are required.
- Export disabled: explain that persistent DB and admin auth are required.

## Auth and token strategy

- Use `Authorization: Bearer <token>` for protected endpoints.
- Store token in memory or secure browser storage per final auth decision.
- Admin-only endpoints: import, export, conflict finalization if required.
- Reviewer endpoints: article decisions.
- Viewer endpoints: dashboards, PRISMA, metrics.
- Never expose secrets in static files.

## CORS

Railway FastAPI must allow the verified frontend origins:

- `https://brayyan.vercel.app`
- approved Vercel preview URLs when testing
- local development origin when needed

CORS should allow:

- Methods: GET, POST, PATCH, OPTIONS
- Headers: Authorization, Content-Type, Accept
- Credentials: only if cookie/session auth is chosen

## Acceptance criteria

- Frontend can configure API_BASE_URL without Vercel rewrites.
- Health endpoint returns JSON from Railway.
- Articles endpoint returns JSON and never HTML.
- Empty states render without console errors.
- Auth-protected endpoints return 401/403 predictably.
- CSV export downloads with the required columns.
- PRISMA and Kappa cards match backend metrics.
- Production static frontend remains deployable without backend hard failure.

## Future smoke checklist

1. Set API_BASE_URL to Railway staging.
2. Run browser console check for JS errors.
3. GET /api/health from frontend origin.
4. GET /api/articles with empty DB and imported DB.
5. Import small fixture CSV manually.
6. Import CardioReview CSV manually.
7. Validate 3,539 expected records or document discrepancy.
8. Save one test human decision.
9. Resolve one test conflict.
10. Load PRISMA and metrics.
11. Download export CSV.
12. Test login/logout and unauthorized access.
13. Revert API_BASE_URL if any production risk appears.

## Non-goals for this branch

- No production deploy.
- No Vercel API rewrites.
- No api/index.py.
- No startup import.
- No real credentials.
- No persistent data migration execution.
