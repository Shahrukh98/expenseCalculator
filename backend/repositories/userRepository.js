const pool = require("../database/connection");

class UserRepository {
  async createUser(username, email, password) {
    const client = await pool.connect();
    try {
      const query = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *';
      const values = [username, email, password];
      const result = await client.query(query, values);
      
      delete result.rows[0].password;
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async getUserById(id) {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM users WHERE id = $1';
      const values = [id];
      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async getUserByEmail(email) {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM users WHERE email = $1';
      const values = [email];
      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async getAllUsers() {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM users';
      const result = await client.query(query);
      return result.rows;
    } finally {
      client.release();
    }
  }
}

module.exports = UserRepository;
