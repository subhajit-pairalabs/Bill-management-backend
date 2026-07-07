-- database/indexes.sql
-- Consolidated Index Structure for high-performance querying
-- It's best to run these after all migrations have been executed.

-- profiles
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_phone ON profiles(phone);

-- merchants
CREATE INDEX IF NOT EXISTS idx_merchants_default_category_id ON merchants(default_category_id);

-- bills
CREATE INDEX IF NOT EXISTS idx_bills_user_id ON bills(user_id);
CREATE INDEX IF NOT EXISTS idx_bills_merchant_id ON bills(merchant_id);
CREATE INDEX IF NOT EXISTS idx_bills_category_id ON bills(category_id);
CREATE INDEX IF NOT EXISTS idx_bills_invoice_number ON bills(invoice_number);
CREATE INDEX IF NOT EXISTS idx_bills_purchase_date ON bills(purchase_date);
CREATE INDEX IF NOT EXISTS idx_bills_created_at ON bills(created_at);
CREATE INDEX IF NOT EXISTS idx_bills_ocr_status ON bills(ocr_status);
CREATE INDEX IF NOT EXISTS idx_bills_ai_status ON bills(ai_status);

-- bill_items
CREATE INDEX IF NOT EXISTS idx_bill_items_bill_id ON bill_items(bill_id);

-- attachments
CREATE INDEX IF NOT EXISTS idx_attachments_bill_id ON attachments(bill_id);

-- ML Results
CREATE INDEX IF NOT EXISTS idx_ocr_results_bill_id ON ocr_results(bill_id);
CREATE INDEX IF NOT EXISTS idx_ai_extractions_bill_id ON ai_extractions(bill_id);

-- notifications
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_status ON notifications(is_read);

-- activity_logs
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_bill_id ON activity_logs(bill_id);

-- family_groups & members
CREATE INDEX IF NOT EXISTS idx_family_members_family_id ON family_members(family_id);
CREATE INDEX IF NOT EXISTS idx_family_members_user_id ON family_members(user_id);

-- shared_bills
CREATE INDEX IF NOT EXISTS idx_shared_bills_family_id ON shared_bills(family_id);
CREATE INDEX IF NOT EXISTS idx_shared_bills_bill_id ON shared_bills(bill_id);