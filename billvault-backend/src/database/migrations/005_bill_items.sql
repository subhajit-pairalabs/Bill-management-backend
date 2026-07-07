-- 005_bill_items.sql
-- Create bill_items table

CREATE TABLE IF NOT EXISTS bill_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bill_id UUID NOT NULL REFERENCES bills(id) ON DELETE CASCADE,
    item_name TEXT NOT NULL,
    description TEXT,
    quantity NUMERIC(10, 2) DEFAULT 1.00 NOT NULL,
    unit_price NUMERIC(12, 2) DEFAULT 0.00 NOT NULL,
    total_price NUMERIC(12, 2) DEFAULT 0.00 NOT NULL,
    tax_amount NUMERIC(12, 2) DEFAULT 0.00,
    serial_number TEXT,
    warranty_months INTEGER,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);
