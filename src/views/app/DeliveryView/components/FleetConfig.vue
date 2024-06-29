<script setup lang="ts">
import { computed, provide } from 'vue';

import PickerCard from './Card/PickerCard.vue';
import useDeliveryStore from '@/store/delivery';
import OwnFloatCard from './Card/OwnFloatCard.vue'

const deliveryStore = useDeliveryStore();

provide('has-own-fleet', deliveryStore.delivery?.hasOwnFleet);

const messageCard = computed(() => {
  return deliveryStore.delivery?.hasOwnFleet
    ? 'Estás usando tu propia flota de vehículos.' 
    : 'Actualmente usas nuestra flota de vehículos. Si deseas configurar tu propia flota, activa el interruptor y sigue los pasos.'
})

async function handleSelection(hasOwnFleet: boolean): Promise<void> {
  
  await deliveryStore.postHasOwnFleet({ id: deliveryStore.delivery?._id!, hasOwnFleet: hasOwnFleet}); 
  
  await deliveryStore.getDeliveryData(deliveryStore.delivery?._id!);

  hasOwnFleet == deliveryStore.delivery?.hasOwnFleet ?? false;
};
</script>

<template>
  <div 
    v-if="deliveryStore.delivery" 
    class="delivery-config">
    <p>
      {{ messageCard }}
    </p>
    <OwnFloatCard 
      :hasOwnFleet="deliveryStore.delivery.hasOwnFleet"
      @handleSelection="handleSelection" />
    <PickerCard
      :pickerFloatIsActive="!deliveryStore.delivery.hasOwnFleet"
      @handleSelection="handleSelection" />
  </div>
</template>

<style lang="scss" scoped>
.delivery-config {
  max-width: 600px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  h2 {
    margin-bottom: 16px;
    font-size: 24px;
    color: #333;
  }
  p {
    margin-bottom: 20px;
    font-size: 16px;
    color: #666;
  }
  &-toggle-container {
    display: flex;
    align-items: center;
  }
  &-status-message {
    margin-top: 20px;
    font-size: 14px;
    color: #888;
  }
}
</style>