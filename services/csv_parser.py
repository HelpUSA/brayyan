import csv
import io
import re
from typing import Any

from sqlalchemy import text
from sqlalchemy.orm import Session

EXPECTED_COLUMNS = [
    "key", "pubmed_id", "doi", "title", "year", "journal",
    "A_decision", "A_confidence", "A_labels",
    "B_decision", "B_confidence", "B_labels",
    "comparison_status", "conflict_priority",
    "provisional_decision", "human_review_needed",
]

def clean(value: Any) -> str | None:
    if value is None:
        return None
    value = str(value).strip()
    return value or None

def as_int(value: Any) -> int | None:
    value = clean(value)
    if value is None:
        return None
    try:
        return int(float(value))
    except ValueError:
        m = re.search(r'\b(19\d\d|20\d\d)\b', value)
        return int(m.group(1)) if m else None

def as_float(value: Any) -> float | None:
    value = clean(value)
    if value is None:
        return None
    try:
        return float(value)
    except ValueError:
        return None

def as_bool_int(value: Any) -> int:
    value = clean(value)
    if value is None:
        return 0
    return 1 if value.lower() in {"1", "true", "yes", "y", "sim", "needed", "human_review"} else 0

def ensure_ai_screening_table(db: Session) -> None:
    db.execute(text("""
        CREATE TABLE IF NOT EXISTS ai_screening_records (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            project_id TEXT DEFAULT '1',
            source_filename TEXT,
            record_key TEXT,
            pubmed_id TEXT,
            doi TEXT,
            title TEXT,
            abstract TEXT,
            year INTEGER,
            journal TEXT,
            a_decision TEXT,
            a_confidence REAL,
            a_labels TEXT,
            b_decision TEXT,
            b_confidence REAL,
            b_labels TEXT,
            comparison_status TEXT,
            conflict_priority TEXT,
            provisional_decision TEXT,
            human_review_needed INTEGER DEFAULT 0,
            automated_final_queue TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """))
    # Check if project_id column exists on existing databases
    try:
        cols = [r._mapping['name'] for r in db.execute(text("PRAGMA table_info(ai_screening_records)")).fetchall()]
        if 'project_id' not in cols:
            db.execute(text("ALTER TABLE ai_screening_records ADD COLUMN project_id TEXT DEFAULT '1'"))
    except Exception:
        pass

    db.execute(text("CREATE INDEX IF NOT EXISTS ix_ai_screening_records_key ON ai_screening_records(record_key)"))
    db.execute(text("CREATE INDEX IF NOT EXISTS ix_ai_screening_records_pubmed ON ai_screening_records(pubmed_id)"))
    db.execute(text("CREATE INDEX IF NOT EXISTS ix_ai_screening_records_doi ON ai_screening_records(doi)"))
    db.execute(text("CREATE INDEX IF NOT EXISTS ix_ai_screening_records_proj ON ai_screening_records(project_id)"))
    db.commit()

def parse_ris_bytes(content: bytes) -> list[dict[str, Any]]:
    text_data = content.decode("utf-8-sig", errors="replace")
    entries = re.split(r'\nER\s*-\s*', text_data)
    rows: list[dict[str, Any]] = []

    for idx, entry in enumerate(entries, 1):
        if not entry.strip():
            continue
        title, abstract, year, journal, doi, pmid, key = None, None, None, None, None, None, f"RIS_{idx}"
        for line in entry.splitlines():
            line = line.strip()
            if not line or len(line) < 6 or line[2:5] != '  -':
                continue
            tag = line[:2].upper()
            val = line[6:].strip()
            if tag in {'TI', 'T1', 'CT'} and not title:
                title = val
            elif tag in {'AB', 'N2'} and not abstract:
                abstract = val
            elif tag in {'PY', 'Y1'} and not year:
                year = as_int(val)
            elif tag in {'JO', 'JF', 'T2', 'JA'} and not journal:
                journal = val
            elif tag in {'DO'} and not doi:
                doi = val
            elif tag in {'AN'} and not pmid:
                pmid = val
            elif tag in {'ID', 'C1'} and key == f"RIS_{idx}":
                key = val

        if title or abstract:
            rows.append({
                "record_key": clean(key),
                "pubmed_id": clean(pmid),
                "doi": clean(doi),
                "title": clean(title) or "Sem título",
                "abstract": clean(abstract),
                "year": year,
                "journal": clean(journal),
                "a_decision": None,
                "a_confidence": None,
                "a_labels": None,
                "b_decision": None,
                "b_confidence": None,
                "b_labels": None,
                "comparison_status": "unscreened",
                "conflict_priority": "normal",
                "provisional_decision": None,
                "human_review_needed": 0,
                "automated_final_queue": None,
            })
    return rows

def parse_bib_bytes(content: bytes) -> list[dict[str, Any]]:
    text_data = content.decode("utf-8-sig", errors="replace")
    blocks = re.findall(r'@[a-zA-Z]+\s*\{\s*([^,]+),\s*(.*?)\n\}', text_data, re.DOTALL)
    rows: list[dict[str, Any]] = []

    for idx, (key, body) in enumerate(blocks, 1):
        title, abstract, year, journal, doi, pmid = None, None, None, None, None, None
        fields = re.findall(r'(\w+)\s*=\s*[\{"\']?(.*?)[\}"\']?\s*(?:,|\n|$)', body, re.DOTALL)
        for name, val in fields:
            name_lower = name.lower()
            val_clean = val.strip(' {}"\'\n')
            if name_lower == 'title':
                title = val_clean
            elif name_lower in {'abstract', 'summary'}:
                abstract = val_clean
            elif name_lower in {'year', 'date'}:
                year = as_int(val_clean)
            elif name_lower in {'journal', 'booktitle'}:
                journal = val_clean
            elif name_lower == 'doi':
                doi = val_clean
            elif name_lower in {'pmid', 'pubmed_id'}:
                pmid = val_clean

        if title or abstract:
            rows.append({
                "record_key": clean(key) or f"BIB_{idx}",
                "pubmed_id": clean(pmid),
                "doi": clean(doi),
                "title": clean(title) or "Sem título",
                "abstract": clean(abstract),
                "year": year,
                "journal": clean(journal),
                "a_decision": None,
                "a_confidence": None,
                "a_labels": None,
                "b_decision": None,
                "b_confidence": None,
                "b_labels": None,
                "comparison_status": "unscreened",
                "conflict_priority": "normal",
                "provisional_decision": None,
                "human_review_needed": 0,
                "automated_final_queue": None,
            })
    return rows

def parse_csv_bytes(content: bytes) -> list[dict[str, Any]]:
    decoded = content.decode("utf-8-sig", errors="replace")
    reader = csv.DictReader(io.StringIO(decoded))
    if reader.fieldnames is None:
        raise ValueError("CSV format sem cabeçalho válido")
    
    raw_fields = [field.strip() for field in reader.fieldnames if field]
    fields_lower = {f.lower(): f for f in raw_fields}

    # Check if standard CardioReview columns exist
    is_standard = all(col in raw_fields for col in EXPECTED_COLUMNS)

    rows: list[dict[str, Any]] = []
    for idx, row in enumerate(reader, 1):
        normalized = {(key.strip() if key else ""): value for key, value in row.items()}
        if not any(clean(value) for value in normalized.values()):
            continue

        if is_standard:
            rows.append({
                "record_key": clean(normalized.get("key")),
                "pubmed_id": clean(normalized.get("pubmed_id")),
                "doi": clean(normalized.get("doi")),
                "title": clean(normalized.get("title")),
                "abstract": clean(normalized.get("abstract")),
                "year": as_int(normalized.get("year")),
                "journal": clean(normalized.get("journal")),
                "a_decision": clean(normalized.get("A_decision")),
                "a_confidence": as_float(normalized.get("A_confidence")),
                "a_labels": clean(normalized.get("A_labels")),
                "b_decision": clean(normalized.get("B_decision")),
                "b_confidence": as_float(normalized.get("B_confidence")),
                "b_labels": clean(normalized.get("B_labels")),
                "comparison_status": clean(normalized.get("comparison_status")),
                "conflict_priority": clean(normalized.get("conflict_priority")),
                "provisional_decision": clean(normalized.get("provisional_decision")),
                "human_review_needed": as_bool_int(normalized.get("human_review_needed")),
                "automated_final_queue": clean(normalized.get("automated_final_queue")),
            })
        else:
            # Generic CSV mapping
            title = None
            abstract = None
            year = None
            journal = None
            doi = None
            pmid = None
            key = normalized.get("key") or normalized.get("id") or f"CSV_{idx}"

            for k, val in normalized.items():
                k_low = k.lower()
                if not title and any(t in k_low for t in ["title", "titulo"]):
                    title = val
                elif not abstract and any(a in k_low for a in ["abstract", "resumo", "summary"]):
                    abstract = val
                elif not year and any(y in k_low for y in ["year", "ano", "py", "publication_year"]):
                    year = as_int(val)
                elif not journal and any(j in k_low for j in ["journal", "revista", "source", "periodico"]):
                    journal = val
                elif not doi and "doi" in k_low:
                    doi = val
                elif not pmid and any(p in k_low for p in ["pmid", "pubmed"]):
                    pmid = val

            if title or abstract:
                rows.append({
                    "record_key": clean(key),
                    "pubmed_id": clean(pmid),
                    "doi": clean(doi),
                    "title": clean(title) or "Sem título",
                    "abstract": clean(abstract),
                    "year": year,
                    "journal": clean(journal),
                    "a_decision": None,
                    "a_confidence": None,
                    "a_labels": None,
                    "b_decision": None,
                    "b_confidence": None,
                    "b_labels": None,
                    "comparison_status": "unscreened",
                    "conflict_priority": "normal",
                    "provisional_decision": None,
                    "human_review_needed": 0,
                    "automated_final_queue": None,
                })
    return rows

def parse_and_store_file(db: Session, content: bytes, filename: str, project_id: str = "1") -> dict[str, Any]:
    ensure_ai_screening_table(db)
    ext = filename.lower().split('.')[-1]
    
    if ext == 'ris':
        rows = parse_ris_bytes(content)
    elif ext in ('bib', 'bibtex'):
        rows = parse_bib_bytes(content)
    else:
        rows = parse_csv_bytes(content)

    if not rows:
        return {"filename": filename, "status": "ok", "imported_count": 0, "message": "Arquivo sem registros válidos"}

    sql = text("""
        INSERT INTO ai_screening_records (
            project_id, source_filename, record_key, pubmed_id, doi, title, abstract, year, journal,
            a_decision, a_confidence, a_labels, b_decision, b_confidence, b_labels,
            comparison_status, conflict_priority, provisional_decision, human_review_needed,
            automated_final_queue
        ) VALUES (
            :project_id, :source_filename, :record_key, :pubmed_id, :doi, :title, :abstract, :year, :journal,
            :a_decision, :a_confidence, :a_labels, :b_decision, :b_confidence, :b_labels,
            :comparison_status, :conflict_priority, :provisional_decision, :human_review_needed,
            :automated_final_queue
        )
    """)
    payload = [dict(row, source_filename=filename, project_id=project_id) for row in rows]
    try:
        db.execute(sql, payload)
        db.commit()
    except Exception:
        db.rollback()
        raise
    return {"filename": filename, "status": "ok", "imported_count": len(rows), "project_id": project_id, "table": "ai_screening_records"}

# Backward compatibility alias
def parse_and_store_csv(db: Session, content: bytes, filename: str) -> dict[str, Any]:
    return parse_and_store_file(db, content, filename, project_id="1")
