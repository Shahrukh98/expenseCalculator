<template>
  <main>
    <section class="hero">
      <NewExpenseModal v-if="showModal" @close-modal="showModal=false" />
      <div style="display: flex; flex-direction: row; justify-content: space-between;">

        <div style="text-align: left; color: #fff; font-size: 48px;">
        <h2>Total: $ {{ totalExpenditure }}</h2>
      </div>
      <div style="display: flex; flex-direction: row; align-items: center; text-align: right; color: #fff; font-size: 38px;">
        <h3>Show Summary</h3>
        <label class="switch">
          <input type="checkbox" :value="showSummary" @click="showSummary = !showSummary">
          <span class="slider round"></span>
        </label>
      </div>
      </div>
      <SummaryTable v-if="showSummary"  :expenseSummary="expenseSummary" />
      <ExpenseTable v-else  :expenses="expenses" />
      <button class="fab" @click="showModal=true">+</button>
    </section>
  </main>
</template>


<script>
import ExpenseTable from '@/components/ExpenseTable.vue';
import SummaryTable from '@/components/SummaryTable.vue';
import NewExpenseModal from '@/components/NewExpenseModal.vue';
import { computed, onMounted, ref } from 'vue'; 
import api from '@/api';
import { useStore } from 'vuex';

export default {
  name: 'DashboardView',
  components: {
    ExpenseTable,
    NewExpenseModal,
    SummaryTable
  },
  setup() {
    const expenses = computed(()=> store.state.expenses);
    const expenseSummary = computed(()=> store.state.expenseSummary)
    const totalExpenditure = ref(0);
    const showModal = ref(false);
    const showSummary = ref(false);
    const store = useStore();

    onMounted(async () => {
      const allExpenseReq = await api.getAllUserExpenses();
      const expenseSummaryReq = await api.getUserSummary();
      const _expenses = allExpenseReq.data;
      const _expenseSummary = expenseSummaryReq.data;
      const total = allExpenseReq.data.reduce((a,b)=> a + parseInt(b?.amount), 0 )
      totalExpenditure.value = total;
      store.dispatch("storeExpenses",_expenses);
      store.dispatch("storeExpenseSummary",_expenseSummary);
    })

    return {
      expenses,
      expenseSummary,
      showModal,
      totalExpenditure,
      showSummary
    }
  }
}
</script>
