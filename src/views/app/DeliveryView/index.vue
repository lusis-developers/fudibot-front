<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

import Card from '@/components/Card.vue';
import useAuthStore from '@/store/auth';
import useClientStore from '@/store/client';
import useDeliveryStore from '@/store/delivery';
import HasOwnFleetCard from './components/HasOwnFleetCard.vue';
import AddFleetDetails from './components/AddFleetDetails.vue';
import FleetDetailCard from './components/FleetDetailCard.vue';

const deliveryStore = useDeliveryStore();
const clientStore = useClientStore();
const authStore = useAuthStore();

const showForm = ref(false);
const cards = computed(()=> {
  return deliveryStore.delivery?.hasOwnFleet
});


function showAddFleetDetails () {
  showForm.value = !showForm.value;
};
function handleVisibleForm (data: boolean) {
  showForm.value = data
};
onMounted(async() => {
  const userAuth = await authStore.checkAuth();
  await clientStore.getClientByEmail(userAuth?.email!);
  const deliveryId = clientStore.client?.restaurant?.delivery!;
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
      <Card class="card">
        <template #content>
          <FleetDetailCard
            v-for="(fleetDetail, index) in deliveryStore.delivery.fleetDetails"
            :key="index"
            :km="String(fleetDetail.radiusKm)"
            :price="String(fleetDetail.price)"
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
}
</style>