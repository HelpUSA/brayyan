from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

app = FastAPI(title='Brayyan', version='0.1.0')

from routers import auth, projects, articles, upload, conflicts, export, decisions

app.include_router(auth.router, prefix='/api/auth', tags=['auth'])
app.include_router(projects.router, prefix='/api/projects', tags=['projects'])
app.include_router(articles.router, prefix='/api/articles', tags=['articles'])
app.include_router(upload.router, prefix='/api/upload', tags=['upload'])
app.include_router(conflicts.router, prefix='/api/conflicts', tags=['conflicts'])
app.include_router(export.router, prefix='/api/export', tags=['export'])
app.include_router(decisions.router, prefix='/api/decisions', tags=['decisions'])

@app.get('/api/health')
async def health():
    return {'status': 'ok', 'version': '0.1.0'}

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC = BASE_DIR

ASSETS = os.path.join(STATIC, 'assets')
if os.path.isdir(ASSETS):
    app.mount('/assets', StaticFiles(directory=ASSETS), name='assets')

@app.get('/{path:path}')
async def spa(path: str = ''):
    clean_path = path.lstrip('/')
    if not clean_path:
        return FileResponse(os.path.join(STATIC, 'index.html'))
    fp = os.path.join(STATIC, clean_path)
    if os.path.isfile(fp):
        return FileResponse(fp)
    return FileResponse(os.path.join(STATIC, 'index.html'))


