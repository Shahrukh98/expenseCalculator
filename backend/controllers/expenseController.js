const express = require('express');
const router = express.Router();
const ExpenseService = require('../services/expenseService');
const ExpenseRepository = require('../repositories/expenseRepository');

const expenseRepository = new ExpenseRepository();
const expenseService = new ExpenseService(expenseRepository)

router.post('/', async (req, res) => {
  const { amount, category, description, date } = req.body;
  try {
    const newExpense = await expenseService.createExpense(req?.user?.id, amount, category, description, date);
    res.status(201).json(newExpense);
  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const expenses = await expenseService.getAllUserExpenses(req?.user?.id);
    res.json(expenses);
  } catch (error) {
    console.error('Error fetching all expenses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const expenses = await expenseService.getUserSummary(req?.user?.id);
    res.json(expenses);
  } catch (error) {
    console.error('Error fetching all expenses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// router.get('/:id', async (req, res) => {
//   const expenseId = req.params.id;
//   try {
//     const expense = await expenseService.getExpenseById(expenseId);
//     if (expense) {
//       res.json(expense);
//     } else {
//       res.status(404).json({ error: 'Expense not found' });
//     }
//   } catch (error) {
//     console.error('Error fetching expense by ID:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


module.exports = router;
