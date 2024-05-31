<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';

import useAuthStore from './store/auth';

const authStore = useAuthStore();

onMounted(() => {
  authStore.checkAuth();
})
onMounted
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
