# EduMindz CRM backend — Phase 5

Adds one-time local Super Admin provisioning, authenticated user management, role boundaries, Manager assignment validation, password hashing, and basic account audit events.

## Local setup
1. Create a PostgreSQL database.
2. Copy `.env.example` to `.env`; set `DATABASE_URL`, a long random `JWT_SECRET`, and `CORS_ORIGINS`.
3. Create a virtual environment and install `requirements.txt`.
4. From this `backend` directory, run:
   `python scripts/create_super_admin.py --name "Your Name" --email "admin@example.com"`
   Enter a unique password when prompted. The script refuses to create a second Super Admin.
5. Start locally with `uvicorn app.main:app --reload`.
6. Inspect endpoints at `/docs`.

## User-management endpoints
All endpoints require `Authorization: Bearer <token>` except login:
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/users` — Super Admin and Admin
- `POST /api/users` — Super Admin can create all roles; Admin can create Manager/Counsellor only
- `PATCH /api/users/{id}` — Super Admin/Admin can activate/deactivate accounts; Counsellors can be assigned to a Manager

This remains a development foundation. Alembic migrations, invitation/password-reset, MFA, login throttling, session revocation, tests, security review, and frontend authentication integration remain outstanding. The admin dashboard is not yet wired to these APIs. Do not expose publicly until completed and tested.


## Mindzy / Groq configuration
Set `MINDZY_PROVIDER=groq`, `GROQ_API_KEY`, and optionally `GROQ_MODEL` in the backend environment. Never place the provider key in frontend environment variables or commit it to source control. Without a key, Mindzy returns the safe fallback after FAQ matching.

## Existing database migration
For databases already created before Phase 6, run the SQL in `migrations/001_add_lead_activity_due_at.sql` once before using follow-up due dates. Back up the database first.
