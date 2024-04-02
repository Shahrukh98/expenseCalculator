const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const expenseController = require("../controllers/expenseController");
const { Auth } = require('../middlewares/authMiddleware');

router.use('/users', userController);
router.use('/expenses', Auth, expenseController);

module.exports = router;
