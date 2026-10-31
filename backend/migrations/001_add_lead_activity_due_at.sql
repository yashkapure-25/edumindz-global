-- Run once against an existing PostgreSQL database created before Phase 6.
ALTER TABLE lead_activities ADD COLUMN IF NOT EXISTS due_at TIMESTAMPTZ NULL;
