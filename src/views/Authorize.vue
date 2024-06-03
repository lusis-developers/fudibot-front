<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';

import useAuthStore from '@/store/auth';
import { onMounted } from 'vue';

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();

onMounted(async () => {
  console.log('Route', route)
  console.log('condition', route.query.code && route.query.state)

  if (route.query.code && route.query.state) {
    await authStore.handleAuthCallback();
    router.push('/app/restaurant-info');
  } else {
    router.push('/register');
  }
})
</script>

<template>
  <div>Processing authentication</div>
</template>