<script setup lang="ts">
import { onMounted, computed } from 'vue';

import useAuthStore from '@/store/auth';
import useClientStore from '@/store/client';
import useDeliveryStore from '@/store/delivery';
import FleetConfig from './components/FleetConfig.vue';
import { formatPriceToDisplay } from '@/utils/inputFormats';
import FleetDetailCard from './components/FleetDetailCard.vue';


const deliveryStore = useDeliveryStore();
const clientStore = useClientStore();
const authStore = useAuthStore();


const cards = computed(()=> {
  return deliveryStore.delivery?.hasOwnFleet
});

onMounted(async() => {
  const userAuth = await authStore.checkAuth();
  await clientStore.getClientByEmail(userAuth?.email!);
  const deliveryId = clientStore.client?.restaurant?.delivery!;
  await deliveryStore.getDeliveryData(deliveryId);
});
</script>

<template>
  <div class="container" v-if="deliveryStore.delivery">
    <FleetConfig />
    <div class="container-cards" v-if="cards">
      <Card class="card">
         <template #content>
          <FleetDetailCard
            v-for="(fleetDetail, index) in deliveryStore.delivery.fleetDetails"
            :key="index"
            :km="String(fleetDetail.radiusKm)"
            :price="formatPriceToDisplay(String(fleetDetail.price))"
            :deliveryId="deliveryStore.delivery._id" 
            :fleetDetailId="fleetDetail._id"/>
        </template>
      </Card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  &-button {
    width: 40%;
  }
  &-cards {
    width: 100%;
    gap: 24px;
    flex-wrap: wrap;
    .card {
      & > *:not(:last-child) {
        border-bottom: 1px solid $green;
      }
    }
  }
  :deep(.crush-text-field-label-text){
    color: $black;
    font-family: $font;
  }
  :deep(.form-group-text-field .crush-text-field-input) {
    color: $black;
    font-family: $font;
  }
  :deep(.crush-text-field .input-container .crush-text-field-input ) {
    color: $black;
    border-color: $light-green;
  }
  :deep(.crush-text-field .input-container .content) {
    color: $black;
  }
}
</style>./components/Modals/FleetDetailModal.vue