from pathlib import Path
from sqlalchemy import text

from database import SessionLocal
from services.csv_parser import ensure_ai_screening_table, parse_and_store_csv

ROOT = Path.cwd()
CANDIDATES = [
    ROOT / 'data' / 'automated_screening_consolidated_export.csv',
    ROOT / 'data' / 'consolidated_export.csv',
    ROOT / 'data' / 'auto_include.csv',
    ROOT / 'data' / 'auto_exclude.csv',
]

def count_records(db):
    ensure_ai_screening_table(db)
    return db.execute(text('SELECT COUNT(*) FROM ai_screening_records')).scalar() or 0

def find_static_csv_files():
    files = []
    seen = set()
    for path in CANDIDATES:
        resolved = path.resolve()
        if path.is_file() and resolved not in seen:
            seen.add(resolved)
            files.append(path)
    return files

def bootstrap_static_csv_data(force=False):
    db = SessionLocal()
    try:
        existing = count_records(db)
        if existing and not force:
            return {'status': 'skipped', 'reason': 'records_exist', 'existing_count': existing}
        files = find_static_csv_files()
        if not files:
            return {'status': 'skipped', 'reason': 'no_static_csv_files', 'existing_count': existing}
        imported = []
        errors = []
        for path in files:
            try:
                result = parse_and_store_csv(db, path.read_bytes(), filename=path.name)
                imported.append(result)
                if path.name in {'automated_screening_consolidated_export.csv', 'consolidated_export.csv'} and result.get('imported_count', 0) > 0:
                    break
            except Exception as exc:
                errors.append({'file': path.name, 'error': str(exc)})
        final_count = count_records(db)
        status = 'ok' if imported else 'error'
        return {'status': status, 'existing_count': existing, 'final_count': final_count, 'imported': imported, 'errors': errors}
    finally:
        db.close()
