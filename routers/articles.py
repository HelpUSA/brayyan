from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session

from database import get_db
from services.csv_parser import ensure_ai_screening_table

router = APIRouter()

def row_to_article(row):
 data = dict(row._mapping)
 return data

@router.get('/')
async def list_articles(project_id: str = '1', page: int = 1, limit: int = 50, db: Session = Depends(get_db)):
 ensure_ai_screening_table(db)
 page = max(page, 1)
 limit = min(max(limit, 1), 200)
 offset = (page - 1) * limit
 total = db.execute(text('SELECT COUNT() FROM ai_screening_records')).scalar() or 0
 rows = db.execute(text('SELECT id, record_key AS key, pubmed_id, doi, title, abstract, year, journal, a_decision AS A_decision, a_confidence AS A_confidence, a_labels AS A_labels, b_decision AS B_decision, b_confidence AS B_confidence, b_labels AS B_labels, comparison_status, conflict_priority, provisional_decision, human_review_needed, automated_final_queue FROM ai_screening_records ORDER BY id DESC LIMIT :limit OFFSET :offset'), {'limit': limit, 'offset': offset}).fetchall()
 return {'project_id': project_id, 'page': page, 'limit': limit, 'total': total, 'articles': [row_to_article(row) for row in rows]}

@router.get('/summary')
async def article_summary(project_id: str = '1', db: Session = Depends(get_db)):
 ensure_ai_screening_table(db)
 total = db.execute(text('SELECT COUNT() FROM ai_screening_records')).scalar() or 0
 screened = db.execute(text('SELECT COUNT() FROM ai_screening_records WHERE coalesce(a_decision, '') <> '' OR coalesce(b_decision, '') <> ''')).scalar() or 0
 included = db.execute(text('SELECT COUNT() FROM ai_screening_records WHERE lower(coalesce(provisional_decision, '')) LIKE ''%include%'' ')).scalar() or 0
 conflicts = db.execute(text('SELECT COUNT() FROM ai_screening_records WHERE lower(coalesce(comparison_status, '')) LIKE ''%conflict%'' ')).scalar() or 0
 human = db.execute(text('SELECT COUNT() FROM ai_screening_records WHERE human_review_needed = 1')).scalar() or 0
 return {'project_id': project_id, 'total': total, 'screened': screened, 'included': included, 'conflicts': conflicts, 'human_review_needed': human}

@router.get('/prisma')
async def prisma(project_id: str = '1', db: Session = Depends(get_db)):
 s = await article_summary(project_id=project_id, db=db)
 return {'project_id': project_id, 'identified': s['total'], 'duplicates': 0, 'screened': s['screened'], 'excluded': max(s['screened'] - s['included'], 0), 'full_text_assessed': s['included'], 'included': s['included'], 'conflicts': s['conflicts']}

@router.get('/metrics')
async def metrics(project_id: str = '1', db: Session = Depends(get_db)):
 ensure_ai_screening_table(db)
 rows = db.execute(text('SELECT lower(a_decision) AS a, lower(b_decision) AS b FROM ai_screening_records WHERE coalesce(a_decision, '') <> '' AND coalesce(b_decision, '') <> ''')).fetchall()
 n = len(rows)
 if n == 0:
 return {'project_id': project_id, 'paired_decisions': 0, 'agreement': None, 'cohen_kappa': None}
 agree = sum(1 for row in rows if row._mapping['a'] == row._mapping['b'])
 labels = sorted({row._mapping['a'] for row in rows} | {row._mapping['b'] for row in rows})
 pe = 0.0
 for label in labels:
 pa = sum(1 for row in rows if row._mapping['a'] == label) / n
 pb = sum(1 for row in rows if row._mapping['b'] == label) / n
 pe += pa * pb
 po = agree / n
 kappa = None if pe == 1 else (po - pe) / (1 - pe)
 return {'project_id': project_id, 'paired_decisions': n, 'agreement': round(po, 4), 'cohen_kappa': None if kappa is None else round(kappa, 4)}
