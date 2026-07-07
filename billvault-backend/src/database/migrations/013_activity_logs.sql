-- 013_activity_logs.sql
-- Create activity_logs table

CREATE TABLE IF NOT EXISTS activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    bill_id UUID REFERENCES bills(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    metadata JSONB,
    ip_address TEXT,
    device TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);
