import csv
import io
from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session
from database import get_db
from services.csv_parser import ensure_ai_screening_table
from routers.decisions import ensure_human_decisions_table

router = APIRouter()

@router.get('/csv')
async def export_csv(project_id: str = '1', db: Session = Depends(get_db)):
    try:
        ensure_ai_screening_table(db)
        ensure_human_decisions_table(db)
        sql = 'SELECT r.id, r.record_key, r.pubmed_id, r.doi, r.title, r.year, r.journal, r.a_decision, r.b_decision, r.comparison_status, hd.decision AS human_decision, hd.note AS human_note FROM ai_screening_records r LEFT JOIN human_decisions hd ON hd.id = (SELECT MAX(id) FROM human_decisions WHERE record_id = r.id) ORDER BY r.id'
        rows = db.execute(text(sql)).fetchall()
        out = io.StringIO()
        fields = ['id','record_key','pubmed_id','doi','title','year','journal','a_decision','b_decision','comparison_status','human_decision','human_note']
        writer = csv.DictWriter(out, fieldnames=fields)
        writer.writeheader()
        for row in rows: writer.writerow(dict(row._mapping))
        return StreamingResponse(iter([out.getvalue()]), media_type='text/csv')
    except SQLAlchemyError as exc:
        return {'status': 'error', 'error': str(exc)}
