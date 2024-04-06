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
    const expenses = this.expenseRepository.getAllUserExpenses(userId);
    return expenses
  }

  async getUserSummary(userId){
    return this.expenseRepository.getUserSummary(userId);
  }

}

module.exports = ExpenseService;
