# Brayyan current status

Updated: 2026-05-29

## Production
- GET / is live again on brayyan.vercel.app.
- The Rayyan-like interface is deployed with static/index.html, static/rayyan.css and static/rayyan.js.
- The previous FUNCTION_INVOCATION_FAILED page-load error was fixed.
- HEAD / may return 405, but GET / works.
- /api/health is still pending because vercel.json rewrites /api/* to Railway, which returns Application not found.

## UI delivered
- Rayyan-style header, tabs and review toolbar.
- Overview with Review Info, Data Summary, Review Members, Your Progress and Screening Summary.
- Review data panel with imported dataset and database status.
- Screening panel with keyword chips, article list and article details.
- Empty states for Full text screening, Data extraction and Risk of bias.
- Screening criteria content and JavaScript tab navigation.

## Stabilization fixes
- Fixed database.py indentation.
- Guarded FastAPI assets mount when static/assets is absent.
- Removed broken CSV parser dependency from upload router.
- Upload CSV endpoint is temporarily a safe received stub.

## Next tasks
1. Fix API routing in vercel.json or Railway so /api/health works.
2. Rebuild CSV parser with tests before commit.
3. Connect UI mock data to database/API.
4. Add users, graphs, review state and real screening actions.
