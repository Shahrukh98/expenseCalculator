import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  state: {
    user: null,
    expenses: [],
    expenseSummary: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
      state.expenses = [];
    },
    setExpenses(state, expenses) {
      state.expenses = expenses;
    },
    setExpenseSummary(state, expenseSummary) {
      state.expenseSummary = expenseSummary;
    }
  },
  actions: {
    loginUser({ commit }, user) {
      commit('setUser', user);
    },
    logoutUser({ commit }) {
      commit('clearUser');
    },
    storeExpenses({commit}, expenses) {
      commit('setExpenses', expenses);
    },
    storeExpenseSummary({commit}, expenseSummary) {
      commit('setExpenseSummary', expenseSummary);
    }
  },
  getters:{
    getUser(state){
      return state.user;
    },
    getUserToken(state){
      return state?.user?.token;
    }
  },
  plugins: [createPersistedState()]
});

export default store;