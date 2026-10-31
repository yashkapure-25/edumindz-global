from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models import Role, User, Lead


def require_role(user: User, *roles: Role):
    """Ensure the user has one of the required roles."""
    if user.role not in roles:
        raise HTTPException(
            status_code=403,
            detail="Insufficient permissions",
        )


def team_counsellor_ids(db: Session, manager_id: int) -> list[int]:
    """Return counsellor IDs directly assigned to a manager."""
    counsellors = (
        db.query(User.id)
        .filter(
            User.manager_id == manager_id,
            User.role == Role.counsellor,
            User.is_active.is_(True),
        )
        .all()
    )

    return [counsellor.id for counsellor in counsellors]


def assert_lead_access(db: Session, user: User, lead: Lead):
    """Verify whether a user can access a particular lead."""

    if not user.is_active:
        raise HTTPException(
            status_code=403,
            detail="Inactive users cannot access student records",
        )

    if user.role in (Role.super_admin, Role.admin):
        return

    if user.role == Role.manager:
        counsellor_ids = team_counsellor_ids(db, user.id)

        if lead.assigned_counsellor_id in counsellor_ids:
            return

    elif user.role == Role.counsellor:
        if lead.assigned_counsellor_id == user.id:
            return

    raise HTTPException(
        status_code=403,
        detail="You do not have access to this student record",
    )