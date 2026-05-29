from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

app = FastAPI(title='Brayyan', version='0.1.0')

from routers import auth, projects, articles, upload, conflicts, export

app.include_router(auth.router, prefix='/api/auth', tags=['auth'])
app.include_router(projects.router, prefix='/api/projects', tags=['projects'])
app.include_router(articles.router, prefix='/api/articles', tags=['articles'])
app.include_router(upload.router, prefix='/api/upload', tags=['upload'])
app.include_router(conflicts.router, prefix='/api/conflicts', tags=['conflicts'])
app.include_router(export.router, prefix='/api/export', tags=['export'])

@app.get('/api/health')
async def health():
    return {'status': 'ok', 'version': '0.1.0'}

STATIC = os.path.join(os.path.dirname(__file__), 'static')
ASSETS = os.path.join(STATIC, 'assets')
if os.path.isdir(ASSETS):
    app.mount('/assets', StaticFiles(directory=ASSETS), name='assets')

@app.get('/{path:path}')
async def spa(path: str):
    if not os.path.exists(STATIC):
        return {'message': 'Static files not found'}
    fp = os.path.join(STATIC, path)
    if os.path.isfile(fp):
        return FileResponse(fp)
    return FileResponse(os.path.join(STATIC, 'index.html'))
