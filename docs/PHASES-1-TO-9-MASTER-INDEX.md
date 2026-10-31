# EduMindz Global — Master Development Index (Phases 1–9)

This is the consolidated project folder. It uses the latest integrated codebase as the single source of truth. Earlier phase ZIPs are historical snapshots and should not be copied over this folder because they may overwrite newer work.

## Phase-by-phase status

| Phase | Scope | Current status | Where to look |
|---|---|---|---|
| 1 | Initial project setup and frontend foundation | Superseded by the integrated Next.js frontend | `frontend/` |
| 2 | Website redesign and public-facing pages | Implemented as the current frontend foundation; content migration still needs owner review | `frontend/app/`, `frontend/public/` |
| 3 | CRM backend foundation, database models and role permissions | Implemented foundation; requires database-backed integration and security tests | `backend/app/`, `docs/ROLE-PERMISSIONS.md` |
| 4 | Website/backend integration and consent-based enquiry capture | Implemented foundation; requires end-to-end verification | `frontend/`, `backend/app/api/leads.py`, `docs/PRIVACY-AND-LEAD-CAPTURE.md` |
| 5 | Authentication and team/user management | Implemented foundation; production session hardening remains | `docs/PHASE-5-AUTH-AND-USERS.md`, `backend/app/api/`, `frontend/app/admin/` |
| 6 | CRM dashboard, lead operations, assignments and follow-ups | Implemented foundation; requires full permission and database tests | `frontend/app/admin/dashboard/`, `backend/app/api/leads.py`, `backend/migrations/` |
| 7 | Mindzy AI assistant | Groq-first integration implemented; requires a real server-side API key and live testing | `backend/app/api/mindzy.py`, `backend/app/ai/knowledge.py` |
| 8 | Mindzy / website enquiry handoff to CRM and WhatsApp | Basic consent-based CRM handoff and student-click WhatsApp route implemented; automated messaging is not included | `frontend/app/`, `backend/app/api/leads.py` |
| 9 | Website content completion, privacy and release preparation | Foundation implemented; not a fully audited, exact migration of every live-site page or asset | `docs/PHASES-6-TO-9.md`, `docs/LIVE-WEBSITE-CONTENT-SOURCES.md`, `docs/RELEASE-CHECKLIST.md` |

## Confirmed project decisions

See `USER-DECISIONS-2026-10-30.md`. Current decisions: Groq as the AI provider; counsellor handoff through both CRM and WhatsApp; use the existing live website as the content source; hosting is deferred.

## Important interpretation

“Implemented” means code and project structure are present. It does **not** mean the feature has passed production acceptance testing. This package has not been deployed, has not been tested end-to-end against a live PostgreSQL database, and has not completed a production Next.js build in the recorded checks.

## Recommended next development sequence

1. Install dependencies and run the frontend production build; fix TypeScript, lint and build errors.
2. Configure a local PostgreSQL database and backend `.env`; run the schema/migration process and bootstrap the first Super Admin.
3. Run backend tests for authentication, all four roles, lead visibility, assignment, consent and activity history.
4. Test the full student journey: public site → Mindzy → consented enquiry → CRM lead → counsellor → WhatsApp handoff.
5. Harden sessions, CSRF, rate limiting, login protection, secrets, data retention and privacy controls.
6. Obtain business approval for website claims, contact details, locations, testimonials, images and course availability.
7. Complete accessibility, mobile, SEO, backup/restore and monitoring checks.
8. Choose hosting and deploy only after the release checklist is signed off.

## Folder map

- `frontend/` — Next.js public website, Mindzy chat UI and CRM screens.
- `backend/` — FastAPI API, PostgreSQL models, authentication, permissions and Groq adapter.
- `docs/` — phase notes, decisions, content source audit, role matrix, privacy notes and release checklist.

## Historical ZIPs

Do not merge the old starter/phase ZIPs into this project. They are earlier snapshots. This consolidated folder is the working baseline for future development.
