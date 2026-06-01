import os

from database import SessionLocal
from services.csv_parser import parse_csv_bytes, store_rows


def import_csv_to_db(csv_path, db_session=None):
	filename = os.path.basename(csv_path)
	print('Importing ' + filename + '...')
	with open(csv_path, 'rb') as handle:
		content = handle.read()

	rows, warnings = parse_csv_bytes(content)
	print('Parsed: ' + str(len(rows)) + ' rows, ' + str(len(warnings)) + ' warnings')

	owns_session = db_session is None
	db = db_session or SessionLocal()
	try:
		stored = store_rows(db, rows, filename=filename)
		if owns_session:
			db.commit()
		print('Stored: ' + str(stored) + ' rows')
		return {'filename': filename, 'parsed': len(rows), 'warnings': warnings, 'stored': stored}
	except Exception:
		if owns_session:
			db.rollback()
		raise
	finally:
		if owns_session:
			db.close()


def main():
	import argparse
	parser = argparse.ArgumentParser(description='Import a Brayyan/Cardio CSV into the configured database.')
	parser.add_argument('csv_path')
	args = parser.parse_args()
	result = import_csv_to_db(args.csv_path)
	print(result)

if globals().get('name') == 'main':
	main()
