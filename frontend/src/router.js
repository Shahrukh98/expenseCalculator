import { createRouter, createWebHistory } from 'vue-router';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Dashboard from './views/Dashboard.vue';
import store from './store';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login, meta: { requiresAuth: false } },
    { path: '/register', component: Register, meta: { requiresAuth: false } },
    { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } }
  ]
});

router.beforeEach((to, from, next) => {
  const user = store.getters.getUser;

  if (to.meta.requiresAuth && !user) {
    next('/login');
  } else if (!to.meta.requiresAuth && user) {
    next('/dashboard'); 
  } else {
    next();
  }
});

export default router;