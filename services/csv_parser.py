import csv
import io
from sqlalchemy import text

EXPECTED_COLUMNS = ['key','pubmed_id','doi','title','year','journal','A_decision','A_confidence','A_labels','B_decision','B_confidence','B_labels','comparison_status','conflict_priority','provisional_decision','human_review_needed']

def clean(value):
 if value is None:
 return None
 value = str(value).strip()
 return value or None

def as_int(value):
 value = clean(value)
 if value is None:
 return None
 try:
 return int(float(value))
 except ValueError:
 return None

def as_float(value):
 value = clean(value)
 if value is None:
 return None
 try:
 return float(value)
 except ValueError:
 return None

def as_bool_int(value):
 value = clean(value)
 if value is None:
 return 0
 return 1 if value.lower() in {'1','true','yes','y','sim','needed','human_review'} else 0

def ensure_ai_screening_table(db):
 sql = text('CREATE TABLE IF NOT EXISTS ai_screening_records (id INTEGER PRIMARY KEY AUTOINCREMENT, source_filename TEXT, record_key TEXT, pubmed_id TEXT, doi TEXT, title TEXT, year INTEGER, journal TEXT, a_decision TEXT, a_confidence REAL, a_labels TEXT, b_decision TEXT, b_confidence REAL, b_labels TEXT, comparison_status TEXT, conflict_priority TEXT, provisional_decision TEXT, human_review_needed INTEGER DEFAULT 0, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)')
 db.execute(sql)
 db.execute(text('CREATE INDEX IF NOT EXISTS ix_ai_screening_records_key ON ai_screening_records(record_key)'))
 db.execute(text('CREATE INDEX IF NOT EXISTS ix_ai_screening_records_pubmed ON ai_screening_records(pubmed_id)'))
 db.execute(text('CREATE INDEX IF NOT EXISTS ix_ai_screening_records_doi ON ai_screening_records(doi)'))
 db.commit()

def parse_csv_bytes(content):
 reader = csv.DictReader(io.StringIO(content.decode('utf-8-sig', errors='replace')))
 if reader.fieldnames is None:
 raise ValueError('CSV has no header row')
 fields = [f.strip() for f in reader.fieldnames if f]
 missing = [c for c in EXPECTED_COLUMNS if c not in fields]
 warnings = []
 if missing:
 warnings.append('Missing columns: ' + ', '.join(missing))
 rows = []
 for line_no, raw in enumerate(reader, start=2):
 if not raw or not any(clean(v) for v in raw.values()):
 continue
 row = {k: clean(raw.get(k)) for k in EXPECTED_COLUMNS}
 if not row.get('key') and not row.get('title'):
 warnings.append('Skipped row ' + str(line_no) + ': missing key and title')
 continue
 rows.append(row)
 return rows, warnings

def store_rows(db, rows, filename=None):
 ensure_ai_screening_table(db)
 stored = 0
 for row in rows:
 db.execute(text('INSERT INTO ai_screening_records (source_filename, record_key, pubmed_id, doi, title, year, journal, a_decision, a_confidence, a_labels, b_decision, b_confidence, b_labels, comparison_status, conflict_priority, provisional_decision, human_review_needed) VALUES (:source_filename, :record_key, :pubmed_id, :doi, :title, :year, :journal, :a_decision, :a_confidence, :a_labels, :b_decision, :b_confidence, :b_labels, :comparison_status, :conflict_priority, :provisional_decision, :human_review_needed)'), {
 'source_filename': filename,
 'record_key': row.get('key'),
 'pubmed_id': row.get('pubmed_id'),
 'doi': row.get('doi'),
 'title': row.get('title'),
 'year': as_int(row.get('year')),
 'journal': row.get('journal'),
 'a_decision': row.get('A_decision'),
 'a_confidence': as_float(row.get('A_confidence')),
 'a_labels': row.get('A_labels'),
 'b_decision': row.get('B_decision'),
 'b_confidence': as_float(row.get('B_confidence')),
 'b_labels': row.get('B_labels'),
 'comparison_status': row.get('comparison_status'),
 'conflict_priority': row.get('conflict_priority'),
 'provisional_decision': row.get('provisional_decision'),
 'human_review_needed': as_bool_int(row.get('human_review_needed')),
 })
 stored += 1
 db.commit()
 return stored
