from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
from sqlalchemy import text
from sqlalchemy.orm import Session
import uuid

from database import get_db

router = APIRouter()

def ensure_projects_table(db: Session):
    db.execute(text("""
        CREATE TABLE IF NOT EXISTS projects (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            domain TEXT,
            study_type TEXT,
            pico_population TEXT,
            pico_intervention TEXT,
            pico_comparator TEXT,
            pico_outcome TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """))
    # Seed project 1 if missing
    existing = db.execute(text("SELECT id FROM projects WHERE id = '1'")).fetchone()
    if not existing:
        db.execute(text("""
            INSERT INTO projects (id, title, domain, study_type, pico_population, pico_intervention, pico_comparator, pico_outcome)
            VALUES ('1', 'Revisão Cardiovascular - IA em Diagnóstico Eletrocardiográfico', 'Cardiologia', 'Revisão Sistemática & Meta-análise', 'Pacientes adultos com suspeita de síndrome coronariana aguda', 'Modelos de IA / Aprendizado Profundo em ECG de 12 derivações', 'Especialistas em cardiologia / Laudo padrão', 'Acurácia diagnóstica, Sensibilidade, Especificidade, AUC-ROC')
        """))
    db.commit()

class ProjectCreate(BaseModel):
    title: str
    domain: Optional[str] = "Geral"
    study_type: Optional[str] = "Revisão Sistemática"
    pico_population: Optional[str] = ""
    pico_intervention: Optional[str] = ""
    pico_comparator: Optional[str] = ""
    pico_outcome: Optional[str] = ""

@router.get('/')
async def list_projects(db: Session = Depends(get_db)):
    ensure_projects_table(db)
    rows = db.execute(text("SELECT * FROM projects ORDER BY created_at ASC")).fetchall()
    result = []
    for r in rows:
        m = dict(r._mapping)
        # get record count
        cnt = db.execute(text("SELECT COUNT(*) FROM ai_screening_records WHERE project_id = :pid"), {"pid": m["id"]}).scalar() or 0
        if m["id"] == "1" and cnt == 0:
            # fallback total count if project_id not set on existing records
            cnt = db.execute(text("SELECT COUNT(*) FROM ai_screening_records")).scalar() or 0
        m["record_count"] = cnt
        result.append(m)
    return result

@router.post('/')
async def create_project(data: ProjectCreate, db: Session = Depends(get_db)):
    ensure_projects_table(db)
    project_id = str(uuid.uuid4())[:8]
    db.execute(text("""
        INSERT INTO projects (id, title, domain, study_type, pico_population, pico_intervention, pico_comparator, pico_outcome)
        VALUES (:id, :title, :domain, :study_type, :pico_pop, :pico_int, :pico_comp, :pico_out)
    """), {
        "id": project_id,
        "title": data.title,
        "domain": data.domain or "Geral",
        "study_type": data.study_type or "Revisão Sistemática",
        "pico_pop": data.pico_population or "",
        "pico_int": data.pico_intervention or "",
        "pico_comp": data.pico_comparator or "",
        "pico_out": data.pico_outcome or ""
    })
    db.commit()
    return {"id": project_id, "title": data.title, "status": "created"}

@router.get('/{project_id}')
async def get_project(project_id: str, db: Session = Depends(get_db)):
    ensure_projects_table(db)
    row = db.execute(text("SELECT * FROM projects WHERE id = :id"), {"id": project_id}).fetchone()
    if not row:
        if project_id == "1":
            return {
                "id": "1",
                "title": "Revisão Cardiovascular - IA em Diagnóstico Eletrocardiográfico",
                "domain": "Cardiologia",
                "study_type": "Revisão Sistemática & Meta-análise",
                "record_count": 3578
            }
        raise HTTPException(status_code=404, detail="Projeto não encontrado")
    res = dict(row._mapping)
    res["record_count"] = db.execute(text("SELECT COUNT(*) FROM ai_screening_records WHERE project_id = :pid"), {"pid": project_id}).scalar() or 0
    return res

@router.delete('/{project_id}')
async def delete_project(project_id: str, db: Session = Depends(get_db)):
    ensure_projects_table(db)
    if project_id == "1":
        raise HTTPException(status_code=400, detail="O projeto padrão '1' não pode ser removido")
    db.execute(text("DELETE FROM projects WHERE id = :id"), {"id": project_id})
    db.execute(text("DELETE FROM ai_screening_records WHERE project_id = :id"), {"id": project_id})
    db.commit()
    return {"id": project_id, "status": "deleted"}
