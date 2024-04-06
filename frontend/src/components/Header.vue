<template>
  <header class="header"> 
      <div >
        <h1>XpenseCalc</h1>
      </div>
      <div>
        <h2 v-if="!isLoggedIn && currentPath.includes('register')"><router-link to="/login" style="color: #fff; text-decoration: none;" >Log In</router-link></h2>
        <h2 v-if="!isLoggedIn && currentPath.includes('login')"><router-link to="/register" style="color: #fff; text-decoration: none;" >Register</router-link></h2>
        <h2 v-if="isLoggedIn"><router-link  to="/" style="color: #fff; text-decoration: none;"  @click="logOut" >Logout</router-link></h2>
      </div>
  </header>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default {
  name: "HeaderView",
  props: ["userLoggedIn"],
  setup(props) {
    const route = useRoute();
    const isLoggedIn = computed(()=> props.userLoggedIn)
    const currentPath = ref(route.fullPath);
    const store = useStore();

    const logOut = () => {
      store.dispatch("logoutUser");
      window.location.reload();
    }
    onMounted(() => {
      currentPath.value = route.fullPath;
    })

    watch(route, () => {
      currentPath.value = route.fullPath;
    })

    return { currentPath, route, isLoggedIn, logOut }
  }
};
</script>
