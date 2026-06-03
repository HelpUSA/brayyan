from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session
from database import get_db
from services.csv_parser import ensure_ai_screening_table

router = APIRouter()

def ensure_human_decisions_table(db):
    db.execute(text('CREATE TABLE IF NOT EXISTS human_decisions (id INTEGER PRIMARY KEY AUTOINCREMENT, record_id INTEGER NOT NULL, decision TEXT NOT NULL, note TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)'))
    db.execute(text('CREATE INDEX IF NOT EXISTS idx_human_decisions_record_id ON human_decisions(record_id)'))
    db.commit()

@router.patch('/{record_id}/decision')
async def save_human_decision(record_id: int, payload: dict, db: Session = Depends(get_db)):
    decision = str(payload.get('decision','')).strip().lower()
    note = payload.get('note')
    if decision not in {'include','exclude','maybe','skip'}:
        raise HTTPException(status_code=400, detail='invalid decision')
    try:
        ensure_ai_screening_table(db)
        ensure_human_decisions_table(db)
        exists = db.execute(text('SELECT COUNT(*) FROM ai_screening_records WHERE id = :id'), {'id': record_id}).scalar() or 0
        if not exists:
            raise HTTPException(status_code=404, detail='article not found')
        db.execute(text('INSERT INTO human_decisions (record_id, decision, note) VALUES (:record_id, :decision, :note)'), {'record_id': record_id, 'decision': decision, 'note': note})
        db.commit()
        return {'status': 'ok', 'record_id': record_id, 'decision': decision}
    except HTTPException:
        raise
    except SQLAlchemyError as exc:
        db.rollback()
        return {'status': 'error', 'error': str(exc)}
