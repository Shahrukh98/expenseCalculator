class Expense {
    constructor(id,user_id, amount, category, date){
        this.id = id;
        this.user_id = user_id;
        this.amount = amount;
        this.category = category;
        this.date = date;
    }
}

module.exports = Expense;
