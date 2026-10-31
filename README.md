# EduMindz Global — Consolidated Project (Phases 1–9)

This folder is the single consolidated working baseline for the EduMindz Global website redesign, Mindzy AI assistant and CRM.

## Start here
1. `docs/PHASES-1-TO-9-MASTER-INDEX.md` — master phase-by-phase index and current status.
2. `docs/USER-DECISIONS-2026-10-30.md` — confirmed project decisions.
3. `backend/README.md` — backend setup and first Super Admin provisioning.
4. `docs/RELEASE-CHECKLIST.md` — owner inputs and production blockers.
5. `docs/LIVE-WEBSITE-CONTENT-SOURCES.md` — live-site content source notes.

## Project structure
- `frontend/` — Next.js website and CRM UI.
- `backend/` — FastAPI + PostgreSQL backend and Groq-first Mindzy integration.
- `docs/` — implementation notes, role permissions, privacy and release documentation.

## Current decisions
- AI provider: Groq.
- Counsellor handoff: CRM and WhatsApp.
- Website content source: existing live website.
- Hosting: deferred until later.

## Important status
The main implementation foundation for Phases 1–9 is consolidated here. This is **not yet production-ready**: full frontend build, live database integration, end-to-end tests, security hardening, final content/legal approval and deployment are still outstanding. See the master index and release checklist.

## Local development
See `frontend/package.json` and `backend/README.md` for the respective setup commands. Copy each `.env.example` to `.env` locally and enter secrets only in local environment files. Never commit API keys or passwords.

## Phase 10 and Phase 11
- `docs/PHASE-10-INTEGRATION-TESTING-READINESS.md` — fixes made, validation evidence, blocked checks and production blockers.
- `docs/PHASE-11-DEPLOYMENT-AND-LAUNCH-PLAN.md` — deployment sequence and launch acceptance criteria (hosting remains undecided).

Phase 10 is partially complete. Do not deploy until its exit criteria are met.
