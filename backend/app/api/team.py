from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, Role
from app.security.auth import current_user
router = APIRouter(prefix="/api/team", tags=["team"])
@router.get("/counsellors")
def counsellors(db: Session = Depends(get_db), actor: User = Depends(current_user)):
    q = db.query(User).filter(User.role == Role.counsellor, User.is_active.is_(True))
    if actor.role == Role.manager:
        q = q.filter(User.manager_id == actor.id)
    elif actor.role == Role.counsellor:
        q = q.filter(User.id == actor.id)
    return [{"id": u.id, "name": u.full_name} for u in q.order_by(User.full_name).all()]
 