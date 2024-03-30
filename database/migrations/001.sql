
-- Create a new table for expenses
CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    user_id INT,
    amount DECIMAL(10, 2) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    date DATE
);

-- Add an index on user_id for faster lookup
CREATE INDEX idx_user_id ON expenses (user_id);
