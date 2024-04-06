<template>
  <div>
    <Header :userLoggedIn="userLoggedIn" />
    <router-view />
    <Footer />
  </div>
</template>



<script>
import { computed, onMounted } from 'vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { useStore } from 'vuex';
import './index.css';

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  setup() {
    const store = useStore();
    const isLoggedIn = computed(()=> store.state.user?.isLoggedIn);

    onMounted(()=>{
      document.title = "Xpense Calculator"
    })

    return { userLoggedIn: isLoggedIn }
  }
}
</script>
