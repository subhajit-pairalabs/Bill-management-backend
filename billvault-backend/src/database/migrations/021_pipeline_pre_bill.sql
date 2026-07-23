-- 020_pipeline_pre_bill.sql
-- Allow Upload → OCR → AI → Review → Bill workflow

BEGIN;

ALTER TABLE ocr_results
ALTER COLUMN bill_id DROP NOT NULL;

ALTER TABLE ai_extractions
ALTER COLUMN bill_id DROP NOT NULL;

COMMIT;