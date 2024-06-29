<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted, computed, ref } from 'vue';

import useAuthStore from '@/store/auth';
import useClientStore from '@/store/client';
import useRestaurantStore from '@/store/restaurant';
import ModalEdit from './components/ModalEdit.vue/index.vue';
import RestaurantDetails from './components/RestaurantDetails.vue';

const router = useRouter();
const authStore = useAuthStore();
const clientStore = useClientStore();
const restaurantStore = useRestaurantStore();

const showModal = ref(false);
const restaurant = computed(() => restaurantStore.restaurant);

onMounted(async () => {
  const userAuth = await authStore.checkAuth();
  await clientStore.getClientByEmail(userAuth?.email!);
  await restaurantStore.getRestaurantById(clientStore.client?.restaurant?._id!);
  if (!clientStore.client?.restaurant?.companyName) {
    router.push({ path: '/wizard' });
  }
});
</script>

<template>
  <div 
    v-if="restaurant && !showModal" 
    class="restaurant-info">
      <RestaurantDetails 
        :companyName="restaurant.companyName" 
        :logo="restaurant.logo"
        :website="restaurant.website"
        :manager="restaurant.manager"
        @edit="showModal = true" />
  </div>
  <ModalEdit 
    :showModal="showModal" 
    @closeModal="showModal = false" />
</template>

<style lang="scss" scoped>
.restaurant-info {
  max-width: 80dvw;
  padding: 20px;
  @media (max-width: 768px) {
    max-width: 100%;
  }
}
</style>