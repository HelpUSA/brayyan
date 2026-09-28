from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session

from database import get_db
from services.csv_parser import ensure_ai_screening_table

router = APIRouter()

def row_to_article(row):
    return dict(row._mapping)

def get_project_where_clause(project_id: str):
    if project_id == "1":
        return "(project_id = '1' OR project_id IS NULL OR project_id = '')"
    return "project_id = :project_id"

@router.get("/")
async def list_articles(project_id: str = "1", page: int = 1, limit: int = 50, db: Session = Depends(get_db)):
    ensure_ai_screening_table(db)
    page = max(page, 1)
    limit = min(max(limit, 1), 200)
    offset = (page - 1) * limit

    where = get_project_where_clause(project_id)
    total = db.execute(text(f"SELECT COUNT(*) FROM ai_screening_records WHERE {where}"), {"project_id": project_id}).scalar() or 0
    rows = db.execute(
        text(
            f"SELECT id, project_id, record_key AS key, pubmed_id, doi, title, abstract, year, journal, "
            f"a_decision AS A_decision, a_confidence AS A_confidence, a_labels AS A_labels, "
            f"b_decision AS B_decision, b_confidence AS B_confidence, b_labels AS B_labels, "
            f"comparison_status, conflict_priority, provisional_decision, human_review_needed, automated_final_queue "
            f"FROM ai_screening_records WHERE {where} ORDER BY id DESC LIMIT :limit OFFSET :offset"
        ),
        {"project_id": project_id, "limit": limit, "offset": offset},
    ).fetchall()
    return {"project_id": project_id, "page": page, "limit": limit, "total": total, "articles": [row_to_article(row) for row in rows]}

@router.get("/summary")
async def article_summary(project_id: str = "1", db: Session = Depends(get_db)):
    ensure_ai_screening_table(db)
    where = get_project_where_clause(project_id)
    total = db.execute(text(f"SELECT COUNT(*) FROM ai_screening_records WHERE {where}"), {"project_id": project_id}).scalar() or 0
    screened = db.execute(text(f"SELECT COUNT(*) FROM ai_screening_records WHERE {where} AND (coalesce(a_decision, '') <> '' OR coalesce(b_decision, '') <> '')"), {"project_id": project_id}).scalar() or 0
    included = db.execute(text(f"SELECT COUNT(*) FROM ai_screening_records WHERE {where} AND lower(coalesce(provisional_decision, '')) LIKE '%include%'"), {"project_id": project_id}).scalar() or 0
    conflicts = db.execute(text(f"SELECT COUNT(*) FROM ai_screening_records WHERE {where} AND lower(coalesce(comparison_status, '')) LIKE '%conflict%'"), {"project_id": project_id}).scalar() or 0
    human = db.execute(text(f"SELECT COUNT(*) FROM ai_screening_records WHERE {where} AND human_review_needed = 1"), {"project_id": project_id}).scalar() or 0
    return {"project_id": project_id, "total": total, "screened": screened, "included": included, "conflicts": conflicts, "human_review_needed": human}

@router.get("/prisma")
async def prisma(project_id: str = "1", db: Session = Depends(get_db)):
    s = await article_summary(project_id=project_id, db=db)
    return {
        "project_id": project_id,
        "identified": s["total"],
        "duplicates": 0,
        "screened": s["screened"],
        "excluded": max(s["screened"] - s["included"], 0),
        "full_text_assessed": s["included"],
        "included": s["included"],
        "conflicts": s["conflicts"],
    }

@router.get("/metrics")
async def metrics(project_id: str = "1", db: Session = Depends(get_db)):
    ensure_ai_screening_table(db)
    where = get_project_where_clause(project_id)
    rows = db.execute(
        text(
            f"SELECT lower(a_decision) AS a, lower(b_decision) AS b FROM ai_screening_records "
            f"WHERE {where} AND coalesce(a_decision, '') <> '' AND coalesce(b_decision, '') <> ''"
        ),
        {"project_id": project_id}
    ).fetchall()
    n = len(rows)
    if n == 0:
        return {"project_id": project_id, "paired_decisions": 0, "agreement": None, "cohen_kappa": None}
    agree = sum(1 for row in rows if row._mapping["a"] == row._mapping["b"])
    labels = sorted({row._mapping["a"] for row in rows} | {row._mapping["b"] for row in rows})
    pe = 0.0
    for label in labels:
        pa = sum(1 for row in rows if row._mapping["a"] == label) / n
        pb = sum(1 for row in rows if row._mapping["b"] == label) / n
        pe += pa * pb
    po = agree / n
    kappa = None if pe == 1 else (po - pe) / (1 - pe)
    return {"project_id": project_id, "paired_decisions": n, "agreement": round(po, 4), "cohen_kappa": None if kappa is None else round(kappa, 4)}

@router.get("/{article_id}")
async def get_article(article_id: int, db: Session = Depends(get_db)):
    ensure_ai_screening_table(db)
    row = db.execute(text("SELECT * FROM ai_screening_records WHERE id = :id"), {"id": article_id}).fetchone()
    if row is None:
        return {"id": article_id}
    return row_to_article(row)
