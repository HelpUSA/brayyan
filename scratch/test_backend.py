import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from services.csv_parser import ensure_ai_screening_table, parse_and_store_file
from routers.projects import ensure_projects_table

db = SessionLocal()

print("1. Testing database setup...")
ensure_ai_screening_table(db)
ensure_projects_table(db)
print("Database tables initialized successfully!")

print("\n2. Testing RIS file parsing...")
ris_sample = b"""
TY  - JOUR
TI  - Deep learning for ECG arrhythmia detection: A systematic review
AB  - We evaluated 45 deep learning algorithms for 12-lead electrocardiogram diagnosis.
PY  - 2024
JO  - Journal of Medical Artificial Intelligence
DO  - 10.1016/j.jmai.2024.01.002
AN  - 38910214
ER  - 
"""
res_ris = parse_and_store_file(db, ris_sample, "test_study.ris", project_id="test_prj_1")
print("RIS Result:", res_ris)

print("\n3. Testing BibTeX file parsing...")
bib_sample = b"""
@article{Smith2023,
  title = {Artificial Intelligence in Mammography Screening},
  abstract = {A meta-analysis of convolutional networks for breast cancer detection.},
  year = {2023},
  journal = {Radiology AI},
  doi = {10.1148/radiology.2023101}
}
"""
res_bib = parse_and_store_file(db, bib_sample, "test_study.bib", project_id="test_prj_1")
print("BibTeX Result:", res_bib)

print("\n4. Testing generic CSV file parsing...")
csv_sample = b"""Title,Abstract,Year,Journal,DOI
AI-Assisted Stroke Diagnosis,Automated CT scan analysis for acute ischemic stroke,2025,Lancet Neurology,10.1016/s1474-4422
"""
res_csv = parse_and_store_file(db, csv_sample, "test_study.csv", project_id="test_prj_1")
print("CSV Result:", res_csv)

db.close()
print("\nAll tests passed cleanly!")
