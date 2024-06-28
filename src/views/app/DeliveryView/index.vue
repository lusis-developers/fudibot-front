<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

import useDeliveryStore from '@/store/delivery';
import HasOwnFleetCard from './components/HasOwnFleetCard.vue';
import AddFleetDetails from './components/AddFleetDetails.vue';
import FleetDetailCard from './components/FleetDetailCard.vue';

const deliveryStore = useDeliveryStore()

const showForm = ref(false);
const cards = computed(()=> {
  return !deliveryStore.delivery?.hasOwnFleet
});


function showAddFleetDetails () {
  showForm.value = !showForm.value;
};
function handleVisibleForm (data: boolean) {
  showForm.value = data
};
onMounted(async() => {
  const deliveryId = '667a5e020da963d6fc72797f';
  await deliveryStore.getDeliveryData(deliveryId);
});
</script>

<template>
  <div class="container" v-if="deliveryStore.delivery">
    <HasOwnFleetCard />
    <CrushButton
      class="container-button"
      text="Agregar detalle de flota"
      @click="showAddFleetDetails"/>
    <AddFleetDetails 
      v-if="showForm" 
      @update:visibleForm="handleVisibleForm"/> 
    <div class="container-cards" v-if="cards">
      <FleetDetailCard
        v-for="(fleetDetail, index) in deliveryStore.delivery.fleetDetails"
        :key="index"
        :km="String(fleetDetail.radiusKm)"
        :price="String(fleetDetail.price)" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: $tablet-upper-breakpoint;
  margin: 0 auto;
  gap: 16px;
  &-button {
    align-self: flex-end;
    width: 40%;
  }
  &-cards {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;
    flex-wrap: wrap;
  }
}
</style>