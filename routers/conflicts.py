from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session
from database import get_db
from services.csv_parser import ensure_ai_screening_table

router = APIRouter()

@router.get('/')
async def list_conflicts(limit: int = 50, db: Session = Depends(get_db)):
    try:
        ensure_ai_screening_table(db)
        sql = """
            SELECT id, title, a_decision, b_decision, comparison_status, conflict_priority
            FROM ai_screening_records
            WHERE comparison_status = :status OR human_review_needed = true
            ORDER BY id DESC
            LIMIT :limit
        """
        rows = db.execute(text(sql), {"status": "conflict", "limit": limit}).fetchall()
        return {
            "database_available": True,
            "total": len(rows),
            "conflicts": [dict(row._mapping) for row in rows],
        }
    except SQLAlchemyError as exc:
        return {
            "database_available": False,
            "total": 0,
            "conflicts": [],
            "error": str(exc),
        }
