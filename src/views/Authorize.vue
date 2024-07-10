<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import useAuthStore from '@/store/auth';
import useClientStore from '@/store/client';

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();
const clientStore = useClientStore()

onMounted(async () => {
  if (route.query.code && route.query.state) {
    await authStore.handleAuthCallback();
    const userAuth = await authStore.checkAuth();
    if (!userAuth || userAuth === undefined) {
      router.push({ path: '/login' });
      return;
    }
    await clientStore.getClientByEmail(userAuth?.email);
    router.push({ path: '/app/restaurant-info' });
  } else {
    router.push('/register');
  }
})
</script>

<template>
  <div>Processing authentication</div>
</template>