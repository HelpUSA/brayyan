from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from sqlalchemy.orm import Session

from database import get_db
from services.csv_parser import parse_and_store_file

router = APIRouter()

@router.post('/file')
@router.post('/csv')
async def upload_file(
    file: UploadFile = File(...),
    project_id: str = Form("1"),
    db: Session = Depends(get_db)
):
    filename = file.filename or 'uploaded.csv'
    ext = filename.lower().split('.')[-1]
    if ext not in {'csv', 'ris', 'bib', 'bibtex', 'txt'}:
        raise HTTPException(status_code=400, detail='Somente arquivos CSV, RIS e BibTeX (.bib, .ris, .csv) são suportados')
    
    content = await file.read()
    if not content:
        raise HTTPException(status_code=400, detail='O arquivo enviado está vazio')
    
    try:
        return parse_and_store_file(db, content, filename=filename, project_id=project_id)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
