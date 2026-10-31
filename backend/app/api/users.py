from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import get_db
from app.models import User, Role, AuditLog
from app.schemas.users import UserCreate, UserRead, UserUpdate
from app.security.auth import current_user
from app.security.permissions import require_role
from app.security.passwords import hash_password
router = APIRouter(prefix="/api/users", tags=["user management"])
def record_audit(db: Session, actor: User, action: str, target: User):
    db.add(AuditLog(actor_user_id=actor.id, action=action, resource_type="user", resource_id=str(target.id)))
def validate_manager(db: Session, manager_id: int | None):
    if manager_id is None:
        return
    manager = db.get(User, manager_id)
    if not manager or not manager.is_active or manager.role != Role.manager:
        raise HTTPException(status_code=422, detail="manager_id must identify an active Manager")
@router.get("", response_model=list[UserRead])
def list_users(db: Session = Depends(get_db), actor: User = Depends(current_user)):
    require_role(actor, Role.super_admin, Role.admin)
    query = db.query(User)
    if actor.role == Role.admin:
        query = query.filter(User.role.in_([Role.manager, Role.counsellor]))
    return query.order_by(User.full_name.asc()).all()
@router.post("", response_model=UserRead, status_code=201)
def create_user(payload: UserCreate, db: Session = Depends(get_db), actor: User = Depends(current_user)):
    require_role(actor, Role.super_admin, Role.admin)
    if actor.role == Role.admin and payload.role not in (Role.manager, Role.counsellor):
        raise HTTPException(status_code=403, detail="Admins can create Managers and Counsellors only")
    if db.query(User).filter(func.lower(User.email) == payload.email.lower()).first():
        raise HTTPException(status_code=409, detail="An account with this email already exists")
    if payload.role == Role.counsellor:
        validate_manager(db, payload.manager_id)
    elif payload.manager_id is not None:
        raise HTTPException(status_code=422, detail="Only Counsellors can be assigned to a Manager")
    user = User(full_name=payload.full_name.strip(), email=payload.email.lower(),
                password_hash=hash_password(payload.password), role=payload.role,
                manager_id=payload.manager_id, is_active=True)
    db.add(user)
    db.flush()
    record_audit(db, actor, "user.created", user)
    db.commit()
    db.refresh(user)
    return user
@router.patch("/{user_id}", response_model=UserRead)
def update_user(user_id: int, payload: UserUpdate, db: Session = Depends(get_db),
                actor: User = Depends(current_user)):
    require_role(actor, Role.super_admin, Role.admin)
    target = db.get(User, user_id)
    if not target:
        raise HTTPException(status_code=404, detail="User not found")
    if actor.role == Role.admin and target.role not in (Role.manager, Role.counsellor):
        raise HTTPException(status_code=403, detail="Admins cannot modify Admin or Super Admin accounts")
    if payload.manager_id is not None:
        if target.role != Role.counsellor:
            raise HTTPException(status_code=422, detail="Only Counsellors can be assigned to a Manager")
        validate_manager(db, payload.manager_id)
        target.manager_id = payload.manager_id
    if payload.is_active is not None:
        if target.role == Role.super_admin and not payload.is_active:
            active = db.query(User).filter(User.role == Role.super_admin, User.is_active.is_(True)).count()
            if active <= 1:
                raise HTTPException(status_code=409, detail="The last active Super Admin cannot be deactivated")
        target.is_active = payload.is_active
    record_audit(db, actor, "user.updated", target)
    db.commit()
    db.refresh(target)
    return target
