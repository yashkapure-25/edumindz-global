from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr, Field
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User
from app.security.auth import create_access_token, current_user
from app.security.passwords import verify_password
router = APIRouter(prefix="/api/auth", tags=["authentication"])
class LoginInput(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=72)
@router.post("/login")
def login(payload: LoginInput, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not user.is_active or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    return {"access_token": create_access_token(user.id), "token_type": "bearer",
            "user": {"id": user.id, "name": user.full_name, "role": user.role.value}}
@router.get("/me")
def me(user: User = Depends(current_user)):
    return {"id": user.id, "name": user.full_name, "email": user.email, "role": user.role.value}
