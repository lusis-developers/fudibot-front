<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import useClientStore from '@/store/client';
import useAuthStore from '@/store/auth';
// import useRestaurantStore from '@/store/restaurant';

// const restaurantStore = useRestaurantStore();
const authStore = useAuthStore();
const clientStore = useClientStore();

const router = useRouter();

onMounted(async () => {
  const userAuth = await authStore.checkAuth();
  await clientStore.getClientByEmail(userAuth?.email!);

  if (!clientStore.client) {
    router.push({ path: '/wizard' });
  }
})
</script>

<template>
  <div>
    Vamos a trabajar en el restaurante
  </div>
</template>