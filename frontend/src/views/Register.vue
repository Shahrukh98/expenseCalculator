<template>
  <main>
    <div class="login-container">
      <h2>Register</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Name</label>
          <input type="text" id="username" placeholder="John Doe" v-model="username" required>
        </div>
        <div class="form-group">
          <label for="nickname">Nickname</label>
          <input type="text" id="nickname" placeholder="JD" v-model="nickname" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="text" id="email" placeholder="john.doe@gmail.com" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="********" v-model="password" required>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  </main>
</template>

<script>

import { ref } from 'vue';
import { useRouter } from "vue-router/dist/vue-router";
import api from "@/api";

export default {
  name: "RegisterView",
  setup() {
    const username = ref('');
    const email = ref('');
    const nickname = ref('');
    const password = ref('');
    const router = useRouter();

    const handleLogin = async()=>{
      try {
        const user = await api.register(username.value, nickname.value, email.value, password.value);
        console.log(user);
        router.replace("/login")
      } catch (error) {
        console.log(error);
      }
    }
    return {
      username,
      nickname,
      email,
      password,
      login: handleLogin
    }
  }
}
</script>
