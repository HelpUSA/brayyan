from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from database import get_db
from services.csv_parser import ensure_ai_screening_table

router = APIRouter()


def row_to_article(row):
    return dict(row._mapping)


def db_degraded_payload(exc: Exception):
    return {
        "database_available": False,
        "error_type": exc.__class__.__name__,
        "message": "Database temporarily unavailable",
    }


@router.get("/")
async def list_articles(project_id: str = "1", page: int = 1, limit: int = 50, db: Session = Depends(get_db)):
    page = max(page, 1)
    limit = min(max(limit, 1), 200)
    offset = (page - 1) * limit
    try:
        ensure_ai_screening_table(db)
        total = db.execute(text("SELECT COUNT(*) FROM ai_screening_records")).scalar() or 0
        rows = db.execute(
            text(
                "SELECT id, record_key AS key, pubmed_id, doi, title, abstract, year, journal, "
                "a_decision AS A_decision, a_confidence AS A_confidence, a_labels AS A_labels, "
                "b_decision AS B_decision, b_confidence AS B_confidence, b_labels AS B_labels, "
                "comparison_status, conflict_priority, provisional_decision, human_review_needed, automated_final_queue "
                "FROM ai_screening_records ORDER BY id DESC LIMIT :limit OFFSET :offset"
            ),
            {"limit": limit, "offset": offset},
        ).fetchall()
        return {
            "database_available": True,
            "project_id": project_id,
            "page": page,
            "limit": limit,
            "total": total,
            "articles": [row_to_article(row) for row in rows],
        }
    except SQLAlchemyError as exc:
        payload = db_degraded_payload(exc)
        payload.update({
            "project_id": project_id,
            "page": page,
            "limit": limit,
            "total": 0,
            "articles": [],
        })
        return payload


@router.get("/summary")
async def article_summary(project_id: str = "1", db: Session = Depends(get_db)):
    try:
        ensure_ai_screening_table(db)
        total = db.execute(text("SELECT COUNT(*) FROM ai_screening_records")).scalar() or 0
        conflicts = db.execute(
            text("SELECT COUNT(*) FROM ai_screening_records WHERE comparison_status = 'conflict'")
        ).scalar() or 0
        human_review = db.execute(
            text("SELECT COUNT(*) FROM ai_screening_records WHERE human_review_needed = true")
        ).scalar() or 0
        return {
            "database_available": True,
            "project_id": project_id,
            "total": total,
            "conflicts": conflicts,
            "human_review_needed": human_review,
        }
    except SQLAlchemyError as exc:
        payload = db_degraded_payload(exc)
        payload.update({
            "project_id": project_id,
            "total": 0,
            "conflicts": 0,
            "human_review_needed": 0,
        })
        return payload
