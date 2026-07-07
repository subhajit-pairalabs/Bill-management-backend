-- 010_bill_tags.sql
-- Create bill_tags table with composite primary key

CREATE TABLE IF NOT EXISTS bill_tags (
    bill_id UUID REFERENCES bills(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (bill_id, tag_id)
);
