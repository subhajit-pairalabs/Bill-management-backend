-- 011_reminders.sql
-- Create reminders table

CREATE TABLE IF NOT EXISTS reminders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bill_id UUID NOT NULL REFERENCES bills(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    reminder_type TEXT,
    remind_at TIMESTAMPTZ NOT NULL,
    repeat_interval TEXT,
    status TEXT CHECK (status IN ('PENDING', 'SENT', 'CANCELLED')),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);
