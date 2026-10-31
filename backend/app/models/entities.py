import enum
from datetime import datetime, timezone
from sqlalchemy import Boolean, DateTime, Enum, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column
from app.database import Base

class Role(str, enum.Enum):
    super_admin = "super_admin"
    admin = "admin"
    manager = "manager"
    counsellor = "counsellor"

class LeadStatus(str, enum.Enum):
    new = "new"
    contacted = "contacted"
    counselling_scheduled = "counselling_scheduled"
    counselling_completed = "counselling_completed"
    application_in_progress = "application_in_progress"
    converted = "converted"
    not_interested = "not_interested"

class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    full_name: Mapped[str] = mapped_column(String(160))
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(255))
    role: Mapped[Role] = mapped_column(Enum(Role), default=Role.counsellor)
    manager_id: Mapped[int | None] = mapped_column(ForeignKey("users.id"), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

class Lead(Base):
    __tablename__ = "leads"
    id: Mapped[int] = mapped_column(primary_key=True)
    full_name: Mapped[str] = mapped_column(String(160))
    email: Mapped[str | None] = mapped_column(String(255), nullable=True, index=True)
    phone: Mapped[str | None] = mapped_column(String(40), nullable=True)
    qualification: Mapped[str | None] = mapped_column(String(180), nullable=True)
    institution: Mapped[str | None] = mapped_column(String(180), nullable=True)
    graduation_year: Mapped[int | None] = mapped_column(Integer, nullable=True)
    grade_or_cgpa: Mapped[str | None] = mapped_column(String(40), nullable=True)
    english_test: Mapped[str | None] = mapped_column(String(40), nullable=True)
    english_score: Mapped[str | None] = mapped_column(String(40), nullable=True)
    preferred_country: Mapped[str | None] = mapped_column(String(100), nullable=True)
    preferred_course: Mapped[str | None] = mapped_column(String(180), nullable=True)
    preferred_intake: Mapped[str | None] = mapped_column(String(80), nullable=True)
    budget_range: Mapped[str | None] = mapped_column(String(80), nullable=True)
    funding_preference: Mapped[str | None] = mapped_column(String(100), nullable=True)
    enquiry_summary: Mapped[str | None] = mapped_column(Text, nullable=True)
    status: Mapped[LeadStatus] = mapped_column(Enum(LeadStatus), default=LeadStatus.new)
    assigned_counsellor_id: Mapped[int | None] = mapped_column(ForeignKey("users.id"), nullable=True)
    consent_to_store: Mapped[bool] = mapped_column(Boolean, default=False)
    consent_timestamp: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    consent_policy_version: Mapped[str | None] = mapped_column(String(30), nullable=True)
    preferred_contact_method: Mapped[str | None] = mapped_column(String(40), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

class LeadActivity(Base):
    __tablename__ = "lead_activities"
    id: Mapped[int] = mapped_column(primary_key=True)
    lead_id: Mapped[int] = mapped_column(ForeignKey("leads.id", ondelete="CASCADE"), index=True)
    actor_user_id: Mapped[int | None] = mapped_column(ForeignKey("users.id"), nullable=True)
    activity_type: Mapped[str] = mapped_column(String(60))
    note: Mapped[str | None] = mapped_column(Text, nullable=True)
    due_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

class AuditLog(Base):
    __tablename__ = "audit_logs"
    id: Mapped[int] = mapped_column(primary_key=True)
    actor_user_id: Mapped[int | None] = mapped_column(ForeignKey("users.id"), nullable=True)
    action: Mapped[str] = mapped_column(String(100))
    resource_type: Mapped[str] = mapped_column(String(80))
    resource_id: Mapped[str] = mapped_column(String(80))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
