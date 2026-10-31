from fastapi import FastAPI
from sqlalchemy import text
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.api.leads import router as leads_router
from app.api.auth import router as auth_router
from app.api.users import router as users_router
from app.api.team import router as team_router
from app.api.mindzy import router as mindzy_router
app = FastAPI(title="EduMindz Global CRM API", version="0.6.0")

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)
        response.headers.setdefault("X-Content-Type-Options", "nosniff")
        response.headers.setdefault("X-Frame-Options", "DENY")
        response.headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")
        response.headers.setdefault("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
        return response

app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(CORSMiddleware,
    allow_origins=[x.strip() for x in settings.cors_origins.split(",") if x.strip()],
    allow_credentials=True, allow_methods=["GET", "POST", "PATCH"],
    allow_headers=["Authorization", "Content-Type"])
app.include_router(leads_router)
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(team_router)
app.include_router(mindzy_router)
@app.get("/health")
def health():
    return {"status": "ok", "service": "edumindz-crm", "version": "0.6.0"}

@app.get("/ready")
def readiness():
    """Readiness probe: confirms the API can reach its configured database."""
    from app.database import engine
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        return {"status": "ready", "database": "reachable"}
    except Exception:
        from fastapi import HTTPException
        raise HTTPException(status_code=503, detail="Database is not reachable")
