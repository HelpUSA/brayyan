from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session
from database import get_db
from services.csv_parser import ensure_ai_screening_table

router = APIRouter()

def rb(db):
    try: db.rollback()
    except Exception: pass

def ok(db):
    try:
        ensure_ai_screening_table(db)
        return True
    except Exception:
        rb(db)
        return False

def val(db, sql):
    try: return db.execute(text(sql)).scalar() or 0
    except Exception:
        rb(db)
        return 0

def empty(project_id='1', page=1, limit=50):
    return {'project_id': project_id, 'page': page, 'limit': limit, 'total': 0, 'articles': [], 'source': 'empty_or_unavailable_db'}

@router.get('')
@router.get('/')
async def list_articles(project_id: str = '1', page: int = 1, limit: int = 50, db: Session = Depends(get_db)):
    page=max(page,1); limit=min(max(limit,1),200)
    if not ok(db): return empty(project_id,page=page, limit=limit)
    try:
        offset=(page-1)*limit
        total=val(db,'SELECT COUNT(*) FROM ai_screening_records')
        rows=db.execute(text('SELECT id, record_key AS key, pubmed_id, doi, title, abstract, year, journal, a_decision AS A_decision, a_confidence AS A_confidence, a_labels AS A_labels, b_decision AS B_decision, b_confidence AS B_confidence, b_labels AS B_labels, comparison_status, conflict_priority, provisional_decision, human_review_needed, automated_final_queue FROM ai_screening_records ORDER BY id DESC LIMIT :limit OFFSET :offset'), {'limit':limit,'offset':offset}).fetchall()
        return {'project_id': project_id, 'page': page, 'limit': limit, 'total': total, 'articles': [dict(r._mapping) for r in rows], 'source': 'database'}
    except Exception as exc:
        rb(db); data=empty(project_id,page,limit); data['error']=str(exc); return data

@router.get('/summary')
async def article_summary(project_id: str = '1', db: Session = Depends(get_db)):
    if not ok(db): return {'project_id': project_id, 'total':0,'screened':0,'included':0,'conflicts':0,'human_review_needed':0,'source':'empty_or_unavailable_db'}
    return {'project_id': project_id, 'total': val(db,'SELECT COUNT(*) FROM ai_screening_records'), 'screened': val(db,"SELECT COUNT(*) FROM ai_screening_records WHERE coalesce(a_decision, '') <> '' OR coalesce(b_decision, '') <> ''"), 'included': val(db,"SELECT COUNT(*) FROM ai_screening_records WHERE lower(coalesce(provisional_decision, '')) LIKE '%include%'"), 'conflicts': val(db,"SELECT COUNT(*) FROM ai_screening_records WHERE lower(coalesce(comparison_status, '')) LIKE '%conflict%'"), 'human_review_needed': val(db,'SELECT COUNT(*) FROM ai_screening_records WHERE human_review_needed = 1'), 'source':'batabase'}

@router.get('/prisma')
async def prisma(project_id: str = '1', db: Session = Depends(get_db)):
    s=await article_summary(project_id=project_id, db=db); screened=s.get('screened',0); included=s.get('included',0)
    return {'project_id': project_id, 'identified': s.get('total',0), 'duplicates':0, 'screened':screened, 'excluded':max(screened-included,0), 'full_text_assessed':included, 'included':included, 'conflicts':s.get('conflicts',0), 'source':s.get('source')}

@router.get('/metrics')
async def metrics(project_id: str = '1', db: Session = Depends(get_db)):
    if not ok(db): return {'project_id':project_id,'paired_decisions':0,'agreement':None,'cohen_kappa':None,"source":"empty_or_unavailable_db"}
    try:
        rows=db.execute(text("SELECT lower(a_decision) AS a, lower(b_decision) AS b FROM ai_screening_records WHERE coalesce(a_decision, '') <> '' AND coalesce(b_decision, '') <> ''").fetchall()
        n=len(rows)
        if n==0: return {'project_id':project_id,'paired_decisions':0,'agreement':None,'cohen_kappa':None,'source':'database'}
        agree=sum(1 for r in rows if r._mapping['a']==r._mapping['b'])
        labels=sorted({r._mapping['a'] for r in rows}|{r._mapping['b'] for r in rows})
        pe=sum((sum(1 for r in rows if r._mapping['a']==lab)/n)*(sum(1 for r in rows if r._mapping['b']==lab)/n) for lab in labels)
        po=agree/n; k=None if pe==1 else (po-pe)/(1-pe)
        return {'project_id':project_id,'paired_decisions':n,'agreement':round(po,4),'cohen_kappa':None if k is None else round(k,4),'source':'batabase'}
    except Exception as exc:
        rb(db); return {'project_id':project_id,'paired_decisions':0,'agreement':None,'cohen_kappa':None,'source':'empty_or_unavailable_db','error':str(exc)}

