# Phase 11 — Deployment & Launch Plan

**Status: Planned; do not execute until Phase 10 exit criteria pass.**

Hosting was explicitly deferred by the project owner. This phase defines the launch sequence without choosing a provider prematurely.

## Deployment decisions required

- Frontend hosting provider and region.
- Backend/API hosting provider and region.
- Managed PostgreSQL provider, backup policy and recovery point objectives.
- Domain/DNS ownership and access.
- Production email provider, if email notifications are introduced.
- Whether automated WhatsApp Business Platform messaging is in scope; current flow is CRM capture plus a student-clicked WhatsApp handoff.

## Launch sequence

1. Approve hosting architecture and monthly operating budget.
2. Create isolated staging and production environments.
3. Provision frontend, backend and managed PostgreSQL resources.
4. Configure secrets through the host's secret manager; never commit `.env` files.
5. Apply the complete versioned database migrations and provision the first Super Admin securely.
6. Configure domain, DNS, TLS/HTTPS, CORS, allowed origins and security headers.
7. Configure Groq credentials server-side and test usage limits and fallback behaviour.
8. Run staging smoke tests for website pages, enquiry forms, CRM permissions, Mindzy and WhatsApp handoff.
9. Run backup and restore verification; enable uptime, error and security monitoring.
10. Obtain business approval for content, claims, privacy notice, testimonials and contact channels.
11. Perform production deployment, verify critical journeys, and monitor the launch.
12. Keep a rollback plan and a named owner for incident response.

## Launch acceptance checklist

- [ ] Phase 10 exit criteria signed off.
- [ ] Hosting and budget approved.
- [ ] Staging smoke tests passed.
- [ ] Production secrets and database secured.
- [ ] HTTPS and DNS verified.
- [ ] Database backup and restore tested.
- [ ] Super Admin access verified; no default credentials remain.
- [ ] Website and CRM end-to-end journeys passed.
- [ ] Groq and WhatsApp behaviour approved.
- [ ] Privacy, content and business approvals recorded.
- [ ] Monitoring and rollback plan active.

## Explicitly out of scope until approved

- Automatic WhatsApp outbound notifications or two-way WhatsApp inbox synchronisation.
- Any new student login or student portal.
- Hosting-provider-specific infrastructure files.
