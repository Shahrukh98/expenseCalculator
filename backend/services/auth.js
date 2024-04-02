// services/authService.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '12h' });
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = { generateAccessToken, hashPassword, comparePasswords };
