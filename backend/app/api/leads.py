from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_, func
from app.database import get_db
from app.models import Lead, LeadActivity, User, Role, LeadStatus
from app.schemas.leads import PublicLeadCreate, LeadOut, LeadUpdate, ActivityCreate, ActivityOut
from app.security.auth import current_user
from app.security.permissions import assert_lead_access, team_counsellor_ids

router = APIRouter(prefix="/api/leads", tags=["student enquiries"])

@router.post("", response_model=LeadOut, status_code=201)
def create_public_enquiry(payload: PublicLeadCreate, db: Session = Depends(get_db)):
    if not payload.consent_to_store:
        raise HTTPException(status_code=400, detail="Consent is required before storing personal information")
    data = payload.model_dump(exclude={"consent_to_store", "consent_policy_version"})
    lead = Lead(**data, consent_to_store=True, consent_policy_version=payload.consent_policy_version,
                consent_timestamp=datetime.now(timezone.utc))
    db.add(lead); db.commit(); db.refresh(lead)
    db.add(LeadActivity(lead_id=lead.id, activity_type="public_enquiry_created",
                        note="Submitted through website with consent"))
    db.commit()
    return lead

def scoped_query(db: Session, user: User):
    q = db.query(Lead)
    if user.role == Role.counsellor:
        q = q.filter(Lead.assigned_counsellor_id == user.id)
    elif user.role == Role.manager:
        ids = team_counsellor_ids(db, user.id)
        q = q.filter(Lead.assigned_counsellor_id.in_(ids) if ids else Lead.id == -1)
    return q

@router.get("", response_model=list[LeadOut])
def list_enquiries(status: LeadStatus | None = None, q: str | None = Query(default=None, max_length=120),
                   country: str | None = None, db: Session = Depends(get_db),
                   user: User = Depends(current_user)):
    query = scoped_query(db, user)
    if status: query = query.filter(Lead.status == status)
    if country: query = query.filter(Lead.preferred_country.ilike(f"%{country}%"))
    if q:
        term = f"%{q.strip()}%"
        query = query.filter(or_(Lead.full_name.ilike(term), Lead.email.ilike(term),
                                 Lead.phone.ilike(term), Lead.preferred_course.ilike(term)))
    return query.order_by(Lead.created_at.desc()).limit(500).all()

@router.get("/stats")
def lead_stats(db: Session = Depends(get_db), user: User = Depends(current_user)):
    q = scoped_query(db, user)
    total = q.count()
    new_count = q.filter(Lead.status == LeadStatus.new).count()
    converted = q.filter(Lead.status == LeadStatus.converted).count()
    due = db.query(LeadActivity).join(Lead, Lead.id == LeadActivity.lead_id).filter(
        LeadActivity.due_at.is_not(None), LeadActivity.due_at <= datetime.now(timezone.utc))
    allowed = scoped_query(db, user).with_entities(Lead.id).subquery()
    due_count = due.filter(Lead.id.in_(allowed)).count()
    return {"total": total, "new": new_count, "converted": converted, "followups_due": due_count}

@router.get("/{lead_id}/activities", response_model=list[ActivityOut])
def get_activities(lead_id: int, db: Session = Depends(get_db), user: User = Depends(current_user)):
    lead = db.get(Lead, lead_id)
    if not lead: raise HTTPException(status_code=404, detail="Enquiry not found")
    assert_lead_access(db, user, lead)
    return db.query(LeadActivity).filter(LeadActivity.lead_id == lead_id).order_by(LeadActivity.created_at.desc()).all()

@router.post("/{lead_id}/activities", response_model=ActivityOut, status_code=201)
def add_activity(lead_id: int, payload: ActivityCreate, db: Session = Depends(get_db),
                 user: User = Depends(current_user)):
    lead = db.get(Lead, lead_id)
    if not lead: raise HTTPException(status_code=404, detail="Enquiry not found")
    assert_lead_access(db, user, lead)
    item = LeadActivity(lead_id=lead_id, actor_user_id=user.id, activity_type=payload.activity_type,
                        note=payload.note, due_at=payload.due_at)
    db.add(item); db.commit(); db.refresh(item)
    return item

@router.patch("/{lead_id}", response_model=LeadOut)
def update_enquiry(lead_id: int, payload: LeadUpdate, db: Session = Depends(get_db),
                   user: User = Depends(current_user)):
    lead = db.get(Lead, lead_id)
    if not lead: raise HTTPException(status_code=404, detail="Enquiry not found")
    assert_lead_access(db, user, lead)
    changes = payload.model_dump(exclude_unset=True)
    if "assigned_counsellor_id" in changes:
        if user.role not in (Role.super_admin, Role.admin, Role.manager):
            raise HTTPException(status_code=403, detail="You cannot assign enquiries")
        target_id = changes["assigned_counsellor_id"]
        target = db.get(User, target_id) if target_id else None
        if target_id and (not target or not target.is_active or target.role != Role.counsellor):
            raise HTTPException(status_code=422, detail="Select an active Counsellor")
        if user.role == Role.manager and target and target.manager_id != user.id:
            raise HTTPException(status_code=403, detail="Managers can assign only to their own counsellors")
    for key, value in changes.items(): setattr(lead, key, value)
    db.add(LeadActivity(lead_id=lead.id, actor_user_id=user.id, activity_type="lead_updated",
                        note="CRM record updated"))
    db.commit(); db.refresh(lead)
    return lead
