-- Seed initial data into the expenses table
INSERT INTO expenses (user_id, amount, description, category, date)
VALUES
    (1, 50.00, 'Groceries', 'Food', '2022-03-25'),
    (1, 30.00, 'Dinner with friends', 'Entertainment', '2022-03-26'),
    (2, 20.00, 'Coffee', 'Food', '2022-03-26');
