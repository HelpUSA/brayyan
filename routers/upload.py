from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlalchemy.orm import Session

from database import get_db
from services.csv_parser import parse_and_store_csv

router = APIRouter()

@router.post('/csv')
async def upload_csv(file: UploadFile = File(...), db: Session = Depends(get_db)):
    filename = file.filename or 'uploaded.csv'
    if not filename.lower().endswith('.csv'):
        raise HTTPException(status_code=400, detail='Only CSV files are supported')
    content = await file.read()
    if not content:
        raise HTTPException(status_code=400, detail='CSV file is empty')
    try:
        return parse_and_store_csv(db, content, filename=filename)
    except UnicodeDecodeError as exc:
        raise HTTPException(status_code=400, detail='Could not decode CSV as UTF-8') from exc
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
