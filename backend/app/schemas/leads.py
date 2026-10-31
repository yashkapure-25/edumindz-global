from datetime import datetime
from pydantic import BaseModel, EmailStr, Field
from app.models import LeadStatus

class PublicLeadCreate(BaseModel):
    full_name: str = Field(min_length=2, max_length=160)
    email: EmailStr | None = None
    phone: str | None = Field(default=None, max_length=40)
    qualification: str | None = None
    institution: str | None = None
    graduation_year: int | None = None
    grade_or_cgpa: str | None = None
    english_test: str | None = None
    english_score: str | None = None
    preferred_country: str | None = None
    preferred_course: str | None = None
    preferred_intake: str | None = None
    budget_range: str | None = None
    funding_preference: str | None = None
    enquiry_summary: str | None = None
    preferred_contact_method: str | None = None
    consent_to_store: bool
    consent_policy_version: str = "2026-10"

class LeadOut(BaseModel):
    id: int
    full_name: str
    email: str | None
    phone: str | None
    qualification: str | None
    institution: str | None
    graduation_year: int | None
    grade_or_cgpa: str | None
    english_test: str | None
    english_score: str | None
    preferred_country: str | None
    preferred_course: str | None
    preferred_intake: str | None
    budget_range: str | None
    funding_preference: str | None
    enquiry_summary: str | None
    status: LeadStatus
    assigned_counsellor_id: int | None
    preferred_contact_method: str | None
    created_at: datetime
    updated_at: datetime
    class Config:
        from_attributes = True

class LeadUpdate(BaseModel):
    status: LeadStatus | None = None
    assigned_counsellor_id: int | None = None
    enquiry_summary: str | None = None

class ActivityCreate(BaseModel):
    activity_type: str = Field(min_length=2, max_length=60)
    note: str | None = Field(default=None, max_length=4000)
    due_at: datetime | None = None

class ActivityOut(BaseModel):
    id: int
    lead_id: int
    actor_user_id: int | None
    activity_type: str
    note: str | None
    due_at: datetime | None
    created_at: datetime
    class Config:
        from_attributes = True
