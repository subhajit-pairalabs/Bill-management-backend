-- 017_rls_policies.sql
-- Enable Row Level Security and configure policies

-- 1. Enable RLS on all business tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE bill_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ocr_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_extractions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_bills ENABLE ROW LEVEL SECURITY;

-- Categories and Tags are global, but we can make them readable by everyone
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE merchants ENABLE ROW LEVEL SECURITY;

-- 2. Global Read Policies
CREATE POLICY "Categories are readable by everyone" ON categories FOR SELECT USING (true);
CREATE POLICY "Tags are readable by everyone" ON tags FOR SELECT USING (true);
CREATE POLICY "Merchants are readable by everyone" ON merchants FOR SELECT USING (true);

-- 3. Profile Policies
CREATE POLICY "Users can view own profile" ON profiles 
    FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles 
    FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- 4. Bill Policies (Direct Ownership)
CREATE POLICY "Users can manage own bills" ON bills 
    FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 5. Cascade Policies for Bill-related tables
CREATE POLICY "Users can manage items of own bills" ON bill_items 
    FOR ALL USING (EXISTS (SELECT 1 FROM bills WHERE bills.id = bill_items.bill_id AND bills.user_id = auth.uid()))
    WITH CHECK (EXISTS (SELECT 1 FROM bills WHERE bills.id = bill_items.bill_id AND bills.user_id = auth.uid()));

CREATE POLICY "Users can manage attachments of own bills" ON attachments 
    FOR ALL USING (EXISTS (SELECT 1 FROM bills WHERE bills.id = attachments.bill_id AND bills.user_id = auth.uid()))
    WITH CHECK (EXISTS (SELECT 1 FROM bills WHERE bills.id = attachments.bill_id AND bills.user_id = auth.uid()));

CREATE POLICY "Users can view ocr of own bills" ON ocr_results 
    FOR ALL USING (EXISTS (SELECT 1 FROM bills WHERE bills.id = ocr_results.bill_id AND bills.user_id = auth.uid()))
    WITH CHECK (EXISTS (SELECT 1 FROM bills WHERE bills.id = ocr_results.bill_id AND bills.user_id = auth.uid()));

CREATE POLICY "Users can view ai of own bills" ON ai_extractions 
    FOR ALL USING (EXISTS (SELECT 1 FROM bills WHERE bills.id = ai_extractions.bill_id AND bills.user_id = auth.uid()))
    WITH CHECK (EXISTS (SELECT 1 FROM bills WHERE bills.id = ai_extractions.bill_id AND bills.user_id = auth.uid()));

CREATE POLICY "Users can manage reminders of own bills" ON reminders 
    FOR ALL USING (EXISTS (SELECT 1 FROM bills WHERE bills.id = reminders.bill_id AND bills.user_id = auth.uid()))
    WITH CHECK (EXISTS (SELECT 1 FROM bills WHERE bills.id = reminders.bill_id AND bills.user_id = auth.uid()));

-- 6. Direct Ownership tables
CREATE POLICY "Users can manage own notifications" ON notifications 
    FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage own activity logs" ON activity_logs 
    FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 7. Family Policies
CREATE POLICY "Users can manage own family groups" ON family_groups 
    FOR ALL USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can view family groups they belong to" ON family_groups 
    FOR SELECT USING (EXISTS (SELECT 1 FROM family_members WHERE family_members.family_id = family_groups.id AND family_members.user_id = auth.uid()));

CREATE POLICY "Users can manage their own memberships" ON family_members 
    FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Family owners can manage members" ON family_members
    FOR ALL USING (EXISTS (SELECT 1 FROM family_groups WHERE family_groups.id = family_members.family_id AND family_groups.owner_id = auth.uid()))
    WITH CHECK (EXISTS (SELECT 1 FROM family_groups WHERE family_groups.id = family_members.family_id AND family_groups.owner_id = auth.uid()));

-- 8. Shared Bills Policies
CREATE POLICY "Users can view shared bills for their families" ON shared_bills 
    FOR SELECT USING (EXISTS (SELECT 1 FROM family_members WHERE family_members.family_id = shared_bills.family_id AND family_members.user_id = auth.uid()));

CREATE POLICY "Users can view shared bills" ON bills
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM shared_bills 
            JOIN family_members ON family_members.family_id = shared_bills.family_id 
            WHERE shared_bills.bill_id = bills.id AND family_members.user_id = auth.uid()
        )
    );
