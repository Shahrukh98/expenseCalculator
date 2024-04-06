<template>
  <main>
    <div class="login-container">
      <form @submit.prevent="login">
      <h2>Login</h2>
        <div class="form-group">
          <label style="flex: 1;" for="email">Email</label>
          <input style="flex: 1;" type="text" id="email" placeholder="john.doe@gmail.com" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="********" v-model="password" required>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </main>
</template>

<script>

import { ref } from 'vue';
import { useRouter } from "vue-router/dist/vue-router";
import api from "@/api";
import { useStore } from 'vuex';

export default {
  name: "LoginView",
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();
    const store = useStore();

    const handleLogin = async()=>{
      try {
        const request = await api.login(email.value, password.value);
        const user = request.data;
        user.isLoggedIn = true;
        store.dispatch("loginUser", user);
        router.push("/dashboard")
      } catch (error) {
        console.log(error);
      }
    }
    return {
      email,
      password,
      login: handleLogin
    }
  }
}
</script>
