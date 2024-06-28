<script setup lang="ts">
import { onMounted, reactive, computed } from "vue";

import useAuthStore from '@/store/auth';
import useClientStore from '@/store/client';
import useDeliveryStore from '@/store/delivery';


import type {
  FleetDetail,
  AddOrEditFleetDetail,
} from '@/interfaces/delivery.interface';


const emit = defineEmits(['update:visibleForm']);

const deliveryStore = useDeliveryStore();
const clientStore = useClientStore();
const authStore = useAuthStore();

const deliveryData = reactive({
  fleetDetails: [] as FleetDetail[] | undefined,
  active: false,
  price: '',
  radius: ''
});
const buttonActive = computed(() => {
  return deliveryData.price !== '' && deliveryData.radius !== '';
});


function handleInput(event: string, type: string): void {
  if (type === 'radius') {
    deliveryData.radius = event;
  }
  if (type === 'price') {
    deliveryData.price = event;
  }
}
async function AddFleetDetails(): Promise<void> {
  const data: AddOrEditFleetDetail = {
    id: deliveryStore.delivery?._id!,
    radius: Number(deliveryData.radius),
    price: Number(deliveryData.price)
  }
  await deliveryStore.addFleetDetail(data);
  emit('update:visibleForm', false)
}

onMounted(async () => {
  const userAuth = await authStore.checkAuth();
  await clientStore.getClientByEmail(userAuth?.email!);
  const deliveryId = clientStore.client?.restaurant?.delivery!;
  await deliveryStore.getDeliveryData(deliveryId);
  deliveryData.fleetDetails = deliveryStore.delivery?.fleetDetails;
  deliveryData.active = true;
});
</script>

<template>
	<div class="container">
		Agrega aquí los detalles de tu flota
		<div class="container-form">
			<CrushTextField 
        :value="deliveryData.radius"
        prependContent="Km"
        placeholder="Escribe la cantidad de km desde tu restaurante a la redonda"
        label="Kilómetros"
        @update:modelValue="handleInput($event, 'radius')"
        />
      <CrushTextField 
        :value="deliveryData.price"
        prependContent="$"
        placeholder="Escribe el costo de ese kilometraje a la redonda" 
        label="Precio"
        @update:modelValue="handleInput($event, 'price')"/>
      <CrushButton
        :disabled="!buttonActive"
        text="Guardar"
        @click="AddFleetDetails"/>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: $tablet-upper-breakpoint;
  margin: 0 auto;
  &-form {
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
}
</style>
