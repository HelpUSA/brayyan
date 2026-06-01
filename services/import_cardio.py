import csv
import os

def import_csv_to_db(csv_path, db_session):
 from services.csv_parser import parse_csv_bytes, store_rows
 
 filename = os.path.basename(csv_path)
 print(f'Importing {filename}...')
 
 with open(csv_path, 'rb') as f:
 content = f.read()
 
 rows, warnings = parse_csv_bytes(content)
 print(f' Parsed: {len(rows)} rows, {len(warnings)} warnings')
 
 stored = store_rows(db_session, rows, filename=filename)
 print(f' Stored: {stored} rows')
 
 return stored, warnings
