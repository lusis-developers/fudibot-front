<script setup lang="ts">
import { onMounted, reactive } from 'vue';

import Card from '@/components/Card.vue';
import useDeliveryStore from '@/store/delivery';
import ToggleInput from '@/components/ToggleInput.vue';

const deliveryStore = useDeliveryStore();

const deliveryConfig = reactive({
  active: false,
  isLoaded: false
});

function isActive(event: boolean): void {
  deliveryConfig.active = event;
  if (deliveryStore.delivery) {
    deliveryStore.postHasOwnFleet({id: deliveryStore.delivery._id, hasOwnFleet: event});
  };
};

onMounted(async() => {
  const deliveryId = '667a5e020da963d6fc72797f';
  await deliveryStore.getDeliveryData(deliveryId);
  deliveryConfig.active = deliveryStore.delivery?.hasOwnFleet || false;
  deliveryConfig.isLoaded = true;
});
</script>

<template>
  <div 
    v-if="deliveryConfig.isLoaded" 
    class="delivery-config">
    <p>
      {{ deliveryConfig.active 
        ? 'Estás usando tu propia flota de vehículos.' 
        : 'Actualmente usas nuestra flota de vehículos. Si deseas configurar tu propia flota, activa el interruptor y sigue los pasos.' }}
    </p>
    <Card>
      <template #content>
        <div class="delivery-config-toggle-container">
          <ToggleInput
            v-model:value="deliveryConfig.active"
            :text="'Activar'"
            @update:modelValue="isActive" />
        </div>
        <p class="delivery-config-status-message">
          {{ deliveryConfig.active 
            ? 'Has activado tu propia flota de vehículos.' 
            : 'Activa esta opción para configurar tu propia flota de vehículos.' }}
        </p> 
      </template>
    </Card>
  </div>
</template>

<style lang="scss" scoped>
.delivery-config {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
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