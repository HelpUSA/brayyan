import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///brayyan.db')
SECRET_KEY = os.getenv('SECRET_KEY', 'dev-key-change-in-production')
ENVIRONMENT = os.getenv('ENVIRONMENT', 'development')
CORS_ORIGINS = os.getenv('CORS_ORIGINS', '*')
GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID', '812202824664-s716306ibb7c15jh7aok2v0lfnuocpkn.apps.googleusercontent.com')
