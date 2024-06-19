<!-- <script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import useAuthStore from '@/store/auth';
const authStore = useAuthStore();

onMounted(async () => {
  const route = useRoute();
  const router = useRouter();
  if (route.query.code && route.query.state) {
    await authStore.handleAuthCallback();
    router.push('/app/restaurant-info');
  } else {
    router.push('/register');
  }
})
</script>

<template>
</template>

<style scoped>
</style> -->