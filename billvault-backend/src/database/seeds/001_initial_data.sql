-- database/seeds/001_initial_data.sql
-- Default seed data for Categories and Tags

INSERT INTO categories (name, icon, color, description, is_default)
VALUES
    ('Groceries', 'shopping-cart', '#4CAF50', 'Supermarkets and grocery stores', TRUE),
    ('Dining', 'utensils', '#FF9800', 'Restaurants, cafes, and fast food', TRUE),
    ('Utilities', 'bolt', '#2196F3', 'Electricity, water, internet bills', TRUE),
    ('Transportation', 'car', '#9C27B0', 'Gas, public transit, rideshare', TRUE),
    ('Entertainment', 'film', '#F44336', 'Movies, games, subscriptions', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO tags (name, color)
VALUES
    ('Tax Deductible', '#FF5722'),
    ('Business Expense', '#607D8B'),
    ('Reimbursable', '#8BC34A'),
    ('Warranty Active', '#00BCD4')
ON CONFLICT DO NOTHING;
