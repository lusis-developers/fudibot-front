<script setup lang="ts">
import { onMounted, reactive } from 'vue';

import useAuthStore from '@/store/auth';
import Card from '@/components/Card.vue';
import useClientStore from '@/store/client';
import useDeliveryStore from '@/store/delivery';
import ToggleInput from '@/components/ToggleInput.vue';

const deliveryStore = useDeliveryStore();
const clientStore = useClientStore();
const authStore = useAuthStore();

const deliveryConfig = reactive({
  active: false,
  inactive: false,
  isLoaded: false,
});

function isActive(event: boolean): void {
  deliveryConfig.active = event;
  if (deliveryStore.delivery) {
    deliveryStore.postHasOwnFleet({id: deliveryStore.delivery._id, hasOwnFleet: event});
  };
};
function isDesactive(event: boolean): void {
  event = true;
  deliveryConfig.inactive = event;
  if(deliveryStore.delivery) {
    deliveryStore.postHasOwnFleet({id: deliveryStore.delivery._id, hasOwnFleet: event});
  }
}


onMounted(async() => {
  const userAuth = await authStore.checkAuth();
  await clientStore.getClientByEmail(userAuth?.email!);
  const deliveryId = clientStore.client?.restaurant?.delivery!;
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
    <Card>
      <template #content>
        <div class="delivery-config-toggle-container">
          <ToggleInput
            v-model:value="deliveryConfig.inactive"
            :text="'Activar'"
            @update:modelValue="isDesactive" />
        </div>
        <p class="delivery-config-status-message">
          {{ deliveryConfig.active 
            ? 'Activa esta opcion para usar nuestra FudiFlota' 
            : 'Estas trabajando con la FudiFlota' }}
        </p> 
      </template>
    </Card>
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