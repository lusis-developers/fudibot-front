<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import useClientStore from '@/store/client';
import useRestaurantStore from '@/store/restaurant';

const restaurantStore = useRestaurantStore();
const clientStore = useClientStore();

const router = useRouter();

onMounted(async() => {
  const id = await clientStore.getUserIDRestaurant();
  if(!id) {
    router.push('/wizard')
  } else{
    const restaurant = await restaurantStore.getRestaurant(id);
    console.log(restaurant)
  }
})
</script>

<template>
  <div>
    Vamos a trabajar en el restaurante
  </div>
</template>