import axios from 'axios';
import store from '@/store';

const BASE_URL = process.env.VUE_APP_BASE_URL;

export default {
    async login(email, password) {
        try {
            const user = await axios.post(`${BASE_URL}/users/login`, {
                email: email,
                password: password
            })
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    async register(name, nickname, email, password) {
        try {
            const user = await axios.post(`${BASE_URL}/users/register`, {
                username: name,
                nickname: nickname,
                email: email,
                password: password
            })
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    async addExpense(newExpense) {
        try {
            const token = store.getters.getUserToken;
            await axios.post(`${BASE_URL}/expenses`, newExpense, { headers: { "Authorization": `Bearer ${token}` } });
            return;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    async getAllUserExpenses() {
        try {
            const token = store.getters.getUserToken;
            const expenses = await axios.get(`${BASE_URL}/expenses`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            return expenses;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    async getUserSummary() {
        try {
            const token = store.getters.getUserToken;
            const expenses = await axios.get(`${BASE_URL}/expenses/stats`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            return expenses;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
};
