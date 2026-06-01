import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from config import DATABASE_URL

connect_args = {}
engine_kwargs = {'pool_pre_ping': True}
if DATABASE_URL.startswith('sqlite:'):
	connect_args = {'check_same_thread': False}
else:
	connect_args['connect_timeout'] = 5
	sslmode = os.getenv('PGSSLMODE') or os.getenv('DB_SSLMODE')
	if sslmode:
		connect_args['sslmode'] = sslmode
	elif '.proxy.rlwy.net' in DATABASE_URL:
		connect_args['sslmode'] = 'require'

engine = create_engine(DATABASE_URL, connect_args=connect_args, **engine_kwargs)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

class Base(DeclarativeBase):
	pass

def get_db():
	db = SessionLocal()
	try:
		yield db
	finally:
		db.close()
