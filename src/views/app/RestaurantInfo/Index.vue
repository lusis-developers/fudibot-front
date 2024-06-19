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
  console.log('cliente desde restaurant infor', clientStore.client)
  
  const userAuth = await authStore.checkAuth();
  await clientStore.getClientBySub(userAuth?.sub!);

  if (!clientStore.client) {
    console.log('del restaurnat al wizard')
    router.push({ path: '/wizard' });
  }
})
</script>

<template>
  <div>
    Vamos a trabajar en el restaurante
  </div>
</template>