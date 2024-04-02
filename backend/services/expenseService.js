class ExpenseService {
  constructor(expenseRepository) {
    this.expenseRepository = expenseRepository;
  }

  async createExpense(userId, amount, category, description, date) {
    return this.expenseRepository.createExpense(userId, amount, category, description, date);
  }

  async getExpenseById(expenseId) {
    return this.expenseRepository.getExpenseById(expenseId);
  }

  async getAllUserExpenses(userId) {
    return this.expenseRepository.getAllUserExpenses(userId);
  }
}

module.exports = ExpenseService;
