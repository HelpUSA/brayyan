from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
from sqlalchemy import text
from sqlalchemy.orm import Session
import uuid
import base64
import json

from database import get_db

router = APIRouter()

def ensure_users_table(db: Session):
    db.execute(text("""
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            picture TEXT,
            auth_provider TEXT DEFAULT 'email',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """))
    db.commit()

def decode_google_jwt(credential: str) -> dict:
    try:
        parts = credential.split(".")
        if len(parts) >= 2:
            padding = "=" * (4 - len(parts[1]) % 4)
            payload_b64 = parts[1] + padding
            decoded_bytes = base64.urlsafe_b64decode(payload_b64)
            return json.loads(decoded_bytes.decode("utf-8"))
    except Exception:
        pass
    return {}

class LoginRequest(BaseModel):
    email: str
    password: Optional[str] = None
    name: Optional[str] = None

class GoogleAuthRequest(BaseModel):
    credential: Optional[str] = None
    email: Optional[str] = None
    name: Optional[str] = None
    picture: Optional[str] = None

@router.post('/login')
async def login(data: LoginRequest, db: Session = Depends(get_db)):
    ensure_users_table(db)
    email = data.email.strip().lower()
    if not email or "@" not in email:
        raise HTTPException(status_code=400, detail="Endereço de e-mail inválido")
    
    user = db.execute(text("SELECT * FROM users WHERE email = :email"), {"email": email}).fetchone()
    if not user:
        name = data.name or email.split("@")[0].title()
        user_id = str(uuid.uuid4())[:8]
        db.execute(text("""
            INSERT INTO users (id, name, email, auth_provider)
            VALUES (:id, :name, :email, 'email')
        """), {"id": user_id, "name": name, "email": email})
        db.commit()
        user = db.execute(text("SELECT * FROM users WHERE email = :email"), {"email": email}).fetchone()

    u_dict = dict(user._mapping)
    return {
        "status": "ok",
        "user": {
            "id": u_dict["id"],
            "name": u_dict["name"],
            "email": u_dict["email"],
            "picture": u_dict.get("picture"),
            "auth_provider": u_dict.get("auth_provider", "email")
        },
        "token": f"brayyan_token_{u_dict['id']}"
    }

@router.post('/google')
async def google_login(data: GoogleAuthRequest, db: Session = Depends(get_db)):
    ensure_users_table(db)
    
    email = data.email
    name = data.name
    picture = data.picture

    if data.credential:
        jwt_payload = decode_google_jwt(data.credential)
        if jwt_payload.get("email"):
            email = jwt_payload.get("email")
            name = jwt_payload.get("name") or jwt_payload.get("given_name") or name
            picture = jwt_payload.get("picture") or picture

    email = (email or "usuario.google@helpusbr.com").strip().lower()
    name = name or "Usuário Google"
    picture = picture or ""

    user = db.execute(text("SELECT * FROM users WHERE email = :email"), {"email": email}).fetchone()
    if not user:
        user_id = str(uuid.uuid4())[:8]
        db.execute(text("""
            INSERT INTO users (id, name, email, picture, auth_provider)
            VALUES (:id, :name, :email, :picture, 'google')
        """), {"id": user_id, "name": name, "email": email, "picture": picture})
        db.commit()
        user = db.execute(text("SELECT * FROM users WHERE email = :email"), {"email": email}).fetchone()
    else:
        db.execute(text("""
            UPDATE users SET name = :name, picture = :picture, auth_provider = 'google' WHERE email = :email
        """), {"name": name, "picture": picture, "email": email})
        db.commit()
        user = db.execute(text("SELECT * FROM users WHERE email = :email"), {"email": email}).fetchone()

    u_dict = dict(user._mapping)
    return {
        "status": "ok",
        "user": {
            "id": u_dict["id"],
            "name": u_dict["name"],
            "email": u_dict["email"],
            "picture": u_dict.get("picture"),
            "auth_provider": "google"
        },
        "token": f"google_token_{u_dict['id']}"
    }

@router.get('/me')
async def get_me(email: str = "wagner.redes@gmail.com", db: Session = Depends(get_db)):
    ensure_users_table(db)
    user = db.execute(text("SELECT * FROM users WHERE email = :email"), {"email": email.strip().lower()}).fetchone()
    if not user:
        return {"authenticated": False}
    return {"authenticated": True, "user": dict(user._mapping)}
