-- 007_ocr_results.sql
-- Create ocr_results table

CREATE TABLE IF NOT EXISTS ocr_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bill_id UUID NOT NULL REFERENCES bills(id) ON DELETE CASCADE,
    ocr_engine TEXT NOT NULL,
    raw_text TEXT,
    confidence NUMERIC(5, 4),
    processing_time_ms INTEGER,
    language TEXT,
    status TEXT CHECK (status IN ('PENDING', 'SUCCESS', 'FAILED')),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);
