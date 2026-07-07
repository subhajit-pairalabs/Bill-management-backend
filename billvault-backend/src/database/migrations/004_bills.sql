-- 004_bills.sql
-- Create core bills table

CREATE TABLE IF NOT EXISTS bills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    merchant_id UUID REFERENCES merchants(id) ON DELETE SET NULL,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    invoice_number TEXT,
    purchase_date TIMESTAMPTZ,
    subtotal NUMERIC(12, 2) DEFAULT 0.00,
    tax_amount NUMERIC(12, 2) DEFAULT 0.00,
    discount_amount NUMERIC(12, 2) DEFAULT 0.00,
    total_amount NUMERIC(12, 2) DEFAULT 0.00 NOT NULL,
    currency TEXT NOT NULL DEFAULT 'USD',
    payment_method TEXT,
    payment_status TEXT CHECK (payment_status IN ('PAID', 'UNPAID', 'PARTIAL', 'REFUNDED')),
    bill_status TEXT CHECK (bill_status IN ('DRAFT', 'PROCESSED', 'FLAGGED', 'ARCHIVED')),
    warranty_until TIMESTAMPTZ,
    purchase_location TEXT,
    notes TEXT,
    ocr_status TEXT CHECK (ocr_status IN ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED')),
    ai_status TEXT CHECK (ai_status IN ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED')),
    confidence_score NUMERIC(5, 4),
    deleted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);
