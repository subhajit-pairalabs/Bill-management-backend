-- 022_add_user_id_to_attachments.sql
-- Add user_id to attachments table to enforce ownership before bill creation

BEGIN;

ALTER TABLE attachments
ADD COLUMN user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_attachments_user_id ON attachments(user_id);

COMMIT;
