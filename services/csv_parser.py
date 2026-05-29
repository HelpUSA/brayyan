import csv
import io
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
        return None

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
    db.execute(text("CREATE INDEX IF NOT EXISTS ix_ai_screening_records_key ON ai_screening_records(record_key)"))
    db.execute(text("CREATE INDEX IF NOT EXISTS ix_ai_screening_records_pubmed ON ai_screening_records(pubmed_id)"))
    db.execute(text("CREATE INDEX IF NOT EXISTS ix_ai_screening_records_doi ON ai_screening_records(doi)"))
    db.commit()

def parse_csv_bytes(content: bytes) -> list[dict[str, Any]]:
    decoded = content.decode("utf-8-sig", errors="replace")
    reader = csv.DictReader(io.StringIO(decoded))
    if reader.fieldnames is None:
        raise ValueError("CSV has no header row")
    fields = [field.strip() for field in reader.fieldnames if field]
    missing = [column for column in EXPECTED_COLUMNS if column not in fields]
    if missing:
        raise ValueError("CSV missing required columns: " + ", ".join(missing))

    rows: list[dict[str, Any]] = []
    for row in reader:
        normalized = {(key.strip() if key else ""): value for key, value in row.items()}
        if not any(clean(value) for value in normalized.values()):
            continue
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
    return rows

def parse_and_store_csv(db: Session, content: bytes, filename: str) -> dict[str, Any]:
    ensure_ai_screening_table(db)
    rows = parse_csv_bytes(content)
    if not rows:
        return {"filename": filename, "status": "ok", "imported_count": 0, "message": "CSV had no data rows"}

    sql = text("""
        INSERT INTO ai_screening_records (
            source_filename, record_key, pubmed_id, doi, title, abstract, year, journal,
            a_decision, a_confidence, a_labels, b_decision, b_confidence, b_labels,
            comparison_status, conflict_priority, provisional_decision, human_review_needed,
            automated_final_queue
        ) VALUES (
            :source_filename, :record_key, :pubmed_id, :doi, :title, :abstract, :year, :journal,
            :a_decision, :a_confidence, :a_labels, :b_decision, :b_confidence, :b_labels,
            :comparison_status, :conflict_priority, :provisional_decision, :human_review_needed,
            :automated_final_queue
        )
    """)
    payload = [dict(row, source_filename=filename) for row in rows]
    try:
        db.execute(sql, payload)
        db.commit()
    except Exception:
        db.rollback()
        raise
    return {"filename": filename, "status": "ok", "imported_count": len(rows), "table": "ai_screening_records"}
