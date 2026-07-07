-- 016_shared_bills.sql
-- Create shared_bills table

CREATE TABLE IF NOT EXISTS shared_bills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bill_id UUID NOT NULL REFERENCES bills(id) ON DELETE CASCADE,
    family_id UUID NOT NULL REFERENCES family_groups(id) ON DELETE CASCADE,
    permission TEXT CHECK (permission IN ('READ', 'WRITE')),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    UNIQUE (bill_id, family_id)
);
