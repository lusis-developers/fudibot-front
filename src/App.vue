<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { RouterView, useRouter } from 'vue-router';

import useAuthStore from './store/auth';

const router = useRouter();

const authStore = useAuthStore();

onMounted(() => {
  authStore.checkAuth();
});

watch(
  () => authStore.user,
  (user) => {
    if (user !== null) {
      // router.push('/app/restaurant-info');
    }
  },
  {
    deep: true
  }
)
</script>

<template>
  <div class="app-container">
    <router-view />
  </div>
</template>

<style scoped>
.app-container {
  width: 100%;
  padding: 0;
  margin: 0;
  min-height: 100vh;
}
</style>
