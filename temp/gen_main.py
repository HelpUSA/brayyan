n = chr(10)
s4 = chr(32) * 4

code = ''
code += 'from fastapi import FastAPI' + n
code += 'from fastapi.staticfiles import StaticFiles' + n
code += 'from fastapi.responses import FileResponse' + n
code += 'import os' + n
code += n
code += 'app = FastAPI(title=' + chr(39) + 'Brayyan' + chr(39) + ', version=' + chr(39) + '0.1.0' + chr(39) + ')' + n
code += n
code += 'from routers import auth, projects, articles, upload, conflicts, export' + n
code += n
code += 'app.include_router(auth.router, prefix=' + chr(39) + '/api/auth' + chr(39) + ', tags=[' + chr(39) + 'auth' + chr(39) + '])' + n
code += 'app.include_router(projects.router, prefix=' + chr(39) + '/api/projects' + chr(39) + ', tags=[' + chr(39) + 'projects' + chr(39) + '])' + n
code += 'app.include_router(articles.router, prefix=' + chr(39) + '/api/articles' + chr(39) + ', tags=[' + chr(39) + 'articles' + chr(39) + '])' + n
code += 'app.include_router(upload.router, prefix=' + chr(39) + '/api/upload' + chr(39) + ', tags=[' + chr(39) + 'upload' + chr(39) + '])' + n
code += 'app.include_router(conflicts.router, prefix=' + chr(39) + '/api/conflicts' + chr(39) + ', tags=[' + chr(39) + 'conflicts' + chr(39) + '])' + n
code += 'app.include_router(export.router, prefix=' + chr(39) + '/api/export' + chr(39) + ', tags=[' + chr(39) + 'export' + chr(39) + '])' + n
code += n
code += '@app.get(' + chr(39) + '/api/health' + chr(39) + ')' + n
code += 'async def health():' + n
code += s4 + 'return {' + chr(39) + 'status' + chr(39) + ': ' + chr(39) + 'ok' + chr(39) + ', ' + chr(39) + 'version' + chr(39) + ': ' + chr(39) + '0.1.0' + chr(39) + '}' + n
code += n
code += 'STATIC = os.path.join(os.path.dirname(file), ' + chr(39) + '..' + chr(39) + ', ' + chr(39) + 'static' + chr(39) + ')' + n
code += 'if os.path.exists(STATIC):' + n
code += s4 + 'app.mount(' + chr(39) + '/assets' + chr(39) + ', StaticFiles(directory=os.path.join(STATIC, ' + chr(39) + 'assets' + chr(39) + ')), name=' + chr(39) + 'assets' + chr(39) + ')' + n
code += n
code += '@app.get(' + chr(39) + '/{path:path}' + chr(39) + ')' + n
code += 'async def spa(path: str):' + n
code += s4 + 'if not os.path.exists(STATIC):' + n
code += s4 * 2 + 'return {' + chr(39) + 'message' + chr(39) + ': ' + chr(39) + 'Static files not found' + chr(39) + '}' + n
code += s4 + 'fp = os.path.join(STATIC, path)' + n
code += s4 + 'if os.path.isfile(fp):' + n
code += s4 * 2 + 'return FileResponse(fp)' + n
code += s4 + 'return FileResponse(os.path.join(STATIC, ' + chr(39) + 'index.html' + chr(39) + '))' + n

open('D:/dev/brayyan/backend/main.py', 'w').write(code)
print('main.py generated successfully')
