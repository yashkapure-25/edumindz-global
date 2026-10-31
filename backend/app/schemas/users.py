from pydantic import BaseModel, EmailStr, Field, ConfigDict
from app.models import Role
class UserCreate(BaseModel):
    full_name: str = Field(min_length=2, max_length=160)
    email: EmailStr
    password: str = Field(min_length=12, max_length=72)
    role: Role
    manager_id: int | None = None
class UserUpdate(BaseModel):
    is_active: bool | None = None
    manager_id: int | None = None
class UserRead(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role: Role
    manager_id: int | None
    is_active: bool
    model_config = ConfigDict(from_attributes=True)
