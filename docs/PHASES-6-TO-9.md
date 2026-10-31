# Phases 6–9 implementation notes

## Phase 6 — CRM frontend and API
- Login page, token-based client session, lead dashboard, search/status filters, role-aware counsellor assignment, lead status updates, activity notes and due-date capture.
- API additions: lead statistics, scoped search, activity history and creation, active counsellor listing.
- User management screen uses the existing role-restricted API.
- Note: browser token storage is a temporary development implementation. Production should move to secure HttpOnly cookies and CSRF protection.

## Phase 7 — Mindzy AI
- Public chat interface and `/api/mindzy/chat`.
- FAQ matching runs without an LLM call.
- Provider adapter supports Groq and OpenRouter via server-side environment variables.
- Responses are deliberately concise and instructed not to invent admissions, fee, scholarship or visa facts.
- No model API key is included in source control.

## Phase 8 — Mindzy to CRM enquiry handoff
- Public enquiry form posts to `/api/leads`.
- Personal data is submitted only after the required consent checkbox is checked.
- AI chat does not automatically persist chat transcripts or personal details.
- Students can switch from chat to the enquiry form to request counsellor contact.
- The website form is a basic handoff; automated WhatsApp/email notifications and in-chat structured lead extraction are not implemented yet.

## Phase 9 — website completion foundation
- Existing redesign pages retained; competitive exam preparation page added.
- Privacy information page added as a draft.
- SEO metadata and responsive site styling remain in the project.
- This is not a verified full content migration. The source website must be audited page-by-page and all original copy, testimonials, images, branch details, claims and contact data approved by EduMindz before launch.

## Configuration
Backend `.env.example` documents database, JWT, CORS and AI provider settings. Frontend `.env.example` documents the API URL.

## Production blockers
1. Add Alembic migrations; `create_all` is not a substitute for schema migration on an existing database. Adding `due_at` requires a migration.
2. Use secure HttpOnly cookie sessions, CSRF controls, rate limiting, abuse prevention, CAPTCHA or equivalent where appropriate, and login throttling.
3. Add tests for permissions, consent, data access and lead assignment.
4. Add data retention/deletion workflows and final reviewed privacy terms.
5. Add notifications, provider budget controls, monitoring, backups and incident response.
6. Verify AI provider commercial terms and data processing terms before use with real student enquiries.
7. Complete content and image rights audit and verify all business contact information.
