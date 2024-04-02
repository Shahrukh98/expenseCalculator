const pool = require("../database/connection");

class ExpenseRepository {
  async createExpense(userId, amount, category, description, date) {
    const client = await pool.connect();
    try {
      const query = 'INSERT INTO expenses (user_id, amount, category, description, date) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const values = [userId, amount, category, description, date];
      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async getExpenseById(expenseId) {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM expenses WHERE id = $1';
      const result = await client.query(query, [expenseId]);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async getAllUserExpenses(user_id) {
    const client = await pool.connect();
    try {
      console.log(user_id);
      const query = 'SELECT * FROM expenses where user_id = $1';
      const result = await client.query(query,[user_id]);
      return result.rows;
    } finally {
      client.release();
    }
  }
}

module.exports = ExpenseRepository;
