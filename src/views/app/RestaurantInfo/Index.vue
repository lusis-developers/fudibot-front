<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted, computed, ref } from 'vue';

import useAuthStore from '@/store/auth';
import useClientStore from '@/store/client';
import useRestaurantStore from '@/store/restaurant';
import ModalEdit from './components/ModalEdit.vue/index.vue';
import RestaurantDetails from './components/RestaurantDetails.vue';
import qrCode from './components/qrCode.vue';
import useBotStore from '@/store/bot';

const router = useRouter();
const authStore = useAuthStore();
const clientStore = useClientStore();
const restaurantStore = useRestaurantStore();
const botStore = useBotStore();

const showModal = ref(false);
const botId = computed(() => restaurantStore.restaurant?.botId);
const restaurant = computed(() => restaurantStore.restaurant);
const qrCodeStatus = computed(() => botStore.status);

function getQRInterval(): void {
  setInterval(async () => {
    if (botId.value) {
      await botStore.getBot(botId.value);
    }
  }, 20000); // 20000 milisegundos = 20 segundos
}

onMounted(async () => {
  const userAuth = await authStore.checkAuth();
  await clientStore.getClientByEmail(userAuth?.email!);
  await restaurantStore.getRestaurantById(clientStore.client?.restaurant?._id!);
  if (!clientStore.client?.restaurant?.companyName) {
    router.push({ path: '/wizard' });
  }
  getQRInterval();
  if (botId.value && !qrCodeStatus.value) {
    await botStore.createBot(botId.value);
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
  <qrCode
    v-if="botStore.status"
    :base64="botStore.status.base64Qr"
    :status="botStore.status.status"
    :botId="botId!" />
  <ModalEdit 
    :showModal="showModal" 
    @closeModal="showModal = false" />
</template>

<style lang="scss" scoped>
.restaurant-info {
  max-width: 80dvw;
  @media (max-width: 768px) {
    max-width: 100%;
  }
}
</style>