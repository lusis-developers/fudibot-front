<script setup lang="ts">
import { reactive, computed } from 'vue';

import Modal from '@/components/Modal.vue';
import useDeliveryStore from '@/store/delivery';
import { formatNumberToSave, formatPriceToDisplay } from '@/utils/inputFormats';

import type { AddOrEditFleetDetail, FleetDetail } from '@/interfaces/delivery.interface';

const emit = defineEmits(['update:visibleForm']);

const deliveryStore = useDeliveryStore();

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
})

const deliveryData = reactive({
  fleetDetails: [] as FleetDetail[] | undefined,
  active: false,
  price: '',
  radius: ''
});

function handleInput(event: string, type: string): void {
  if (type === 'radius') {
    deliveryData.radius = event;
  }
  if (type === 'price') {
    deliveryData.price = formatPriceToDisplay(event);
    console.log("formateado: ", deliveryData.price)
  }
}

async function AddFleetDetails(): Promise<void> {
  const data: AddOrEditFleetDetail = {
    id: deliveryStore.delivery?._id!,
    radius: Number(deliveryData.radius),
    price: formatNumberToSave(String(deliveryData.price))
  }
  await deliveryStore.addFleetDetail(data);
  emit('update:visibleForm', false)
}

const buttonActive = computed(() => {
  return deliveryData.price !== '' && deliveryData.radius !== '';
});
</script>

<template>
  <Modal 
    :modalValue="active"
    class="modal-fleet">
    <template #header>
      <h3 class="modal-fleet-title">Agrega aquí el detalle de tu flota</h3>
    </template>
    <template #content>
      <div class="modal-fleet-form">
        <CrushTextField 
          :value="deliveryData.radius"
          prependContent="Km"
          placeholder="Escribe la cantidad de km desde tu restaurante a la redonda"
          label="Kilómetros"
          @update:modelValue="handleInput($event, 'radius')" />
        <CrushTextField 
          :value="deliveryData.price"
          prependContent="$"
          placeholder="Escribe el costo de ese kilometraje a la redonda" 
          label="Precio"
          @update:modelValue="handleInput($event, 'price')"/>
          <CrushButton
          :disabled="!buttonActive"
          text="Guardar"
          class="button"
          @click="AddFleetDetails"/>
      </div>
    </template>
  </Modal>
</template>

<style lang="scss" scoped>
.modal-fleet {
  &-title {
    margin-bottom: 16px;
  }
  &-form {
    display: flex;
    flex-direction: column;
    .button {
      width: 40%;
      align-self: flex-end; 
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
</style>