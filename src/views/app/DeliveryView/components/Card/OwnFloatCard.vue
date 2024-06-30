<script setup lang="ts">
import { computed, ref } from 'vue';

import Card from '@/components/Card.vue';
import ToggleInput from '@/components/ToggleInput.vue';
import useDeliveryStore from '@/store/delivery';

const emit = defineEmits(['handleSelection', 'showForm', 'showSecondForm'])

const deliveryStore = useDeliveryStore();

const showForm = ref(false);
const showFormOnePrice = ref(false);

const props = defineProps({
  hasOwnFleet: {
    type: Boolean,
    required: true,
  }
})

const messageCard = computed(() => {
  return props.hasOwnFleet
    ? 'Has activado tu propia flota de vehículos.' 
    : 'Activa esta opción para configurar tu propia flota de vehículos.'
});

function setOwnFleet(isOwnFleet: boolean) {
  emit('handleSelection', isOwnFleet);
};
function showAddUniquePriceToAllDelieveries(): void {
  showFormOnePrice.value = !showFormOnePrice.value;
  emit('showSecondForm', showFormOnePrice.value);
};

function showAddFleetDetails (): void {
  showForm.value = !showForm.value;
  emit('showForm', showForm.value)
};
</script>

<template>
  <Card class="principal">
    <template #content>
      <div class="delivery-config-toggle-container">
        <p>
          Tu flota personalizada
        </p>
        <ToggleInput
          :value="hasOwnFleet"
          :text="'Activar'"
          class="toggle"
          @update:modelValue="setOwnFleet" />
      </div>
      <p class="delivery-config-status-message">
        {{ messageCard }}
      </p> 
      <div class="section">
        <CrushButton
          v-if="deliveryStore.delivery?.hasOwnFleet"
          class="section-container-button"
          text="Agregar detalle de flota"
          @click="showAddFleetDetails"/>
        <CrushButton
          v-if="deliveryStore.delivery?.hasOwnFleet"
          class="section-container-button"
          text="Establecer precio único de envío"
          @click="showAddUniquePriceToAllDelieveries" />  
      </div>
    </template>
  </Card>
</template>

<style lang="scss" scoped>
.principal {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;
  p {
    font-size: $body-font-size;
  }
  .toggle {
    width: auto;
  }
  .delivery-config-toggle-container{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .delivery-config-status-message {
    font-size: $body-font-size;
  }
  .section {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    &-container-button {
      color: $black;
      background-color: $light-green;
      width: 50%;
    }
  }
}
</style>