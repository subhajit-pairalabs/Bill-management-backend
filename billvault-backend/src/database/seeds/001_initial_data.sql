-- database/seeds/001_initial_data.sql
-- Default seed data for Categories and Tags

-- database/seeds/001_initial_data.sql

INSERT INTO categories (name, icon, color, description, is_default)
VALUES
    ('Groceries', 'shopping-cart', '#4CAF50', 'Supermarkets and grocery stores', TRUE),
    ('Dining', 'utensils', '#FF9800', 'Restaurants, cafes, and fast food', TRUE),
    ('Utilities', 'bolt', '#2196F3', 'Electricity, water, internet bills', TRUE),
    ('Transportation', 'car', '#9C27B0', 'Fuel, public transport, taxi and rideshare', TRUE),
    ('Entertainment', 'film', '#F44336', 'Movies, games, streaming subscriptions', TRUE),
    ('Electronics', 'cpu', '#3F51B5', 'Computers, mobiles, gadgets and accessories', TRUE),
    ('Shopping', 'shopping-bag', '#795548', 'General shopping and retail purchases', TRUE),
    ('Healthcare', 'heart-pulse', '#E91E63', 'Medicines, hospitals and healthcare', TRUE),
    ('Education', 'graduation-cap', '#009688', 'Books, courses, tuition and learning', TRUE),
    ('Travel', 'plane', '#00BCD4', 'Flights, hotels and vacations', TRUE),
    ('Home & Furniture', 'home', '#8D6E63', 'Furniture, appliances and home improvement', TRUE),
    ('Fashion', 'shirt', '#EC407A', 'Clothing, shoes and accessories', TRUE),
    ('Insurance', 'shield', '#607D8B', 'Insurance premiums and policies', TRUE),
    ('Business', 'briefcase', '#5C6BC0', 'Business purchases and office expenses', TRUE),
    ('Subscription', 'repeat', '#7E57C2', 'Monthly and yearly subscriptions', TRUE),
    ('Pet Care', 'paw', '#8BC34A', 'Veterinary and pet supplies', TRUE),
    ('Gifts', 'gift', '#FF7043', 'Gift purchases', TRUE),
    ('Taxes', 'receipt', '#546E7A', 'Government taxes and statutory payments', TRUE),
    ('Others', 'folder', '#9E9E9E', 'Bills that do not fit any predefined category', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO tags (name, color)
VALUES
    ('Tax Deductible', '#FF5722'),
    ('Business Expense', '#607D8B'),
    ('Reimbursable', '#8BC34A'),
    ('Warranty Active', '#00BCD4')
ON CONFLICT DO NOTHING;
