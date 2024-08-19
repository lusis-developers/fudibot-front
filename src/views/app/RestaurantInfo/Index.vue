<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted, computed, ref } from 'vue';

import useBotStore from '@/store/bot';
import useAuthStore from '@/store/auth';
import useClientStore from '@/store/client';
import qrCode from './components/qrCode.vue';
import useRestaurantStore from '@/store/restaurant';
import GlobalLoading from '@/components/GlobalLoading.vue'
import ModalEdit from './components/ModalEdit.vue/index.vue';
import RestaurantDetails from './components/RestaurantDetails.vue';

const router = useRouter();
const authStore = useAuthStore();
const clientStore = useClientStore();
const restaurantStore = useRestaurantStore();
const botStore = useBotStore();

const showModal = ref(false);
const isLoading = ref(true);
const botId = computed(() => restaurantStore.restaurant?.botId);
const restaurant = computed(() => restaurantStore.restaurant);
const qrCodeStatus = computed(() => botStore.status);

async function getQRInterval(): Promise<void> {
  setInterval(async () => {
    if (botId.value) {
      await botStore.getBot(botId.value);
    }
  }, 10000); // 10000 milisegundos = 10 segundos
}

onMounted(async () => {
  const userAuth = await authStore.checkAuth();
  await clientStore.getClientByEmail(userAuth?.email!);
  await restaurantStore.getRestaurantById(clientStore.client?.restaurant?._id!);
  if (!clientStore.client?.restaurant?.companyName) {
    router.push({ path: '/wizard' });
  }
  getQRInterval();
  isLoading.value = false;
});
</script>

<template>
  <GlobalLoading v-if="isLoading" />
  <div
    v-else
    class="info-wrapper crush-two-column-layout">
    <div
      v-if="restaurant && !showModal" 
      class="restaurant-info crush-col-1">
      <RestaurantDetails 
        :companyName="restaurant.companyName" 
        :logo="restaurant.logo"
        :website="restaurant.website"
        :manager="restaurant.manager"
        @edit="showModal = true" />
    </div>
    <div class="restaurant-status crush-col-2">
      <CrushButton
        v-if="botId && !qrCodeStatus"
        @click="botStore.createBot(botId)">
        Crear QR
      </CrushButton>
      <div v-if="botStore.status">
        {{ qrCodeStatus.status }}
      </div>
      <qrCode
        v-if="botStore.status"
        :base64="botStore.status.base64Qr"
        :status="botStore.status.status"
        :botId="botId!" />
    </div>
  </div>
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