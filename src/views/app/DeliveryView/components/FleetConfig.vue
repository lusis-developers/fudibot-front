<script setup lang="ts">
import { computed, provide, ref } from 'vue';

import PickerCard from './Card/PickerCard.vue';
import useDeliveryStore from '@/store/delivery';
import OwnFloatCard from './Card/OwnFloatCard.vue'
import ModalFleetDetail from './Modals/ModalFleetDetail.vue';
import ModalAddGeneralCost from './Modals/ModalAddGeneralCost.vue';


const deliveryStore = useDeliveryStore();

provide('has-own-fleet', deliveryStore.delivery?.hasOwnFleet);

const firtForm = ref(false);
const secondForm = ref(false);

const messageCard = computed(() => {
  return deliveryStore.delivery?.hasOwnFleet
    ? 'Estás usando tu propia flota de vehículos.' 
    : 'Actualmente usas nuestra flota de vehículos. Si deseas configurar tu propia flota, activa el interruptor y sigue los pasos.'
});

async function handleSelection(hasOwnFleet: boolean): Promise<void> {
  
  await deliveryStore.postHasOwnFleet({ id: deliveryStore.delivery?._id!, hasOwnFleet: hasOwnFleet}); 
  
  await deliveryStore.getDeliveryData(deliveryStore.delivery?._id!);

  hasOwnFleet == deliveryStore.delivery?.hasOwnFleet ?? false;
};

function showForm (value: boolean): void {
  firtForm.value = value;
};
function showSecondForm(value: boolean): void {
  secondForm.value = value
};
function closeModal(value: boolean): void {
  firtForm.value = value;
  secondForm.value = value;
  console.log('active 1: ', firtForm.value);
  console.log('active 2: ', secondForm.value)
};
</script>

<template>
  <div 
    v-if="deliveryStore.delivery" 
    class="delivery-config">
    <p>
      {{ messageCard }}
    </p>
    <PickerCard
      :pickerFloatIsActive="!deliveryStore.delivery.hasOwnFleet"
      @handleSelection="handleSelection" />
    <OwnFloatCard 
      :hasOwnFleet="deliveryStore.delivery.hasOwnFleet"
      @handleSelection="handleSelection" 
      @showForm="showForm"
      @showSecondForm="showSecondForm"/>
  </div>
  <ModalFleetDetail 
    :active="firtForm"
    @closeModal="closeModal"/>
  <ModalAddGeneralCost
    :active="secondForm"
    @closeModal="closeModal"/>
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
</style>./Modals/AddGeneralCostModal.vue./Modals/ModalAddGeneralCost.vue./Modals/ModalFleetDetail.vue