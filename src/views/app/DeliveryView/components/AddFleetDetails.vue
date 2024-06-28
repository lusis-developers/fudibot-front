<script setup lang="ts">
import { onMounted, reactive, computed } from "vue";

import useDeliveryStore from "@/store/delivery";

const emit = defineEmits(['update:visibleForm']);


import type {
  FleetDetail,
  AddOrEditFleetDetail,
} from "@/interfaces/delivery.interface";

const deliveryStore = useDeliveryStore();

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
    id: '667a5e020da963d6fc72797f',
    radius: Number(deliveryData.radius),
    price: Number(deliveryData.price)
  }
  await deliveryStore.addFleetDetail(data);
  emit('update:visibleForm', false)
}

onMounted(async () => {
  const deliveryId = "667a5e020da963d6fc72797f";
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
