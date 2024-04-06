<template>
    <div class="modal">
        <div class="modal-content">
            <span class="close" @click="$emit('close-modal')">&times;</span>
            <h2>Add Expense</h2>
            <form class="expense-form" @submit.prevent="addExpense">
                <label>Description</label>
                <input type="text" v-model="newExpense.description" required><br>
                <label>Amount</label>
                <input type="number" v-model="newExpense.amount" required><br>
                <label>Date</label>
                <input type="date" v-model="newExpense.date" required><br>
                <label>Category</label>
                <select id="dropdown" v-model="newExpense.category" required class="custom-select">
                    <option value="Entertainment">Entertainment</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Dining Out">Dining Out</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Groceries">Groceries</option>
                </select>

                <br>
                <button type="submit">Add Expense</button>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import api from '@/api';

export default {
    name: "ExpenseModalView",
    setup(_,context) {
        const newExpense = ref({
            description: '',
            amount: null,
            date: '',
            category: ''
        });

        const addExpense = async () => {
            try {
                await api.addExpense(newExpense.value);
                context.emit("close-modal","")
                window.location.reload();
            } catch (error) {
                alert("Some Error Occured!")
                console.log(error);
            }
        }

        return {
            newExpense,
            addExpense,
        }

    }
};
</script>
