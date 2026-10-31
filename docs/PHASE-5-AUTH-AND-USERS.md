# Phase 5 — Authentication and user management

| Role | User administration |
|---|---|
| Super Admin | Can list, create, and update all roles |
| Admin | Can list users and create/update Manager and Counsellor accounts only |
| Manager | No user-administration endpoints |
| Counsellor | No user-administration endpoints |

The first Super Admin is created locally through a CLI command, not an internet-accessible endpoint. The script refuses to create another Super Admin if one already exists.

Passwords are bcrypt-hashed. Newly created passwords require at least 12 characters and no more than 72 UTF-8 bytes. Counsellors may be attached to an active Manager. Admins cannot modify Admin or Super Admin accounts. The last active Super Admin cannot be deactivated.

Before production: add Alembic migrations, invitations and password reset, MFA, login throttling, session revocation, automated tests, frontend integration, and security review.
