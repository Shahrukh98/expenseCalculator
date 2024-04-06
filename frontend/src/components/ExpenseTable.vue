<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th @click="sortBy('category')">Category</th>
                    <th @click="sortBy('description')">Description</th>
                    <th @click="sortBy('amount')">Amount</th>
                    <th @click="sortBy('date')">Date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(expense, index) in filteredExpenses" :key="index">
                    <td>{{ expense.category }}</td>
                    <td>{{ expense.description }}</td>
                    <td>$ {{ expense.amount }}</td>
                    <td>{{ expense.date.split("T")[0] }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        expenses: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            filterQuery: '',
            sortKey: '',
            sortOrder: 'asc'
        };
    },
    computed: {
        filteredExpenses() {
            return this.expenses.filter(expense =>
                expense.category.toLowerCase().includes(this.filterQuery.toLowerCase())
            ).sort((a, b) => {
                if (this.sortKey) {
                    let comparison = a[this.sortKey] > b[this.sortKey] ? 1 : -1;
                    return this.sortOrder === 'asc' ? comparison : -comparison;
                }
                return 0;
            });
        }
    },
    methods: {
        sortBy(key) {
            if (this.sortKey === key) {
                this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
            } else {
                this.sortKey = key;
                this.sortOrder = 'asc';
            }
        }
    }
};
</script>