<script setup lang="ts">
import { reactive, computed } from 'vue';

import Modal from '@/components/Modal.vue';
import useDeliveryStore from '@/store/delivery';
import { formatNumberToSave, formatPriceToDisplay } from '@/utils/inputFormats';

import type { AddOrEditFleetDetail, FleetDetail } from '@/interfaces/delivery.interface';

const emit = defineEmits(['update:visibleForm', 'closeModal']);

const deliveryStore = useDeliveryStore();

defineProps({
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

const buttonActive = computed(() => {
  return deliveryData.price !== '' && deliveryData.radius !== '';
});

function handleInput(event: string, type: string): void {
  if (type === 'radius') {
    deliveryData.radius = event;
  };
  if (type === 'price') {
    deliveryData.price = formatPriceToDisplay(event);
  };
};
function closeModal() {
  emit('closeModal', false);
};

async function AddFleetDetails(): Promise<void> {
  const deliveryId = deliveryStore.delivery?._id;
  const data: AddOrEditFleetDetail = {
    id: deliveryId!,
    radius: Number(deliveryData.radius),
    price: formatNumberToSave(String(deliveryData.price))
  }
  await deliveryStore.addFleetDetail(data);
  await deliveryStore.getDeliveryData(deliveryId!);

  emit('update:visibleForm', false);
  emit('closeModal', false);
};
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
          class="question"
          @update:modelValue="handleInput($event, 'radius')" />
        <CrushTextField 
          :value="deliveryData.price"
          prependContent="$"
          placeholder="Escribe el costo de ese kilometraje a la redonda" 
          label="Precio"
          class="question"
          @update:modelValue="handleInput($event, 'price')"/>
        <CrushButton
          text="Cancelar"
          class="button-cancel"
          @click="closeModal"/>
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
    flex-wrap: wrap;
    justify-content: space-around;
    .question {
      width: 80%;
    }
    .button {
      width: 40%;
      align-self: flex-end; 
    }
    .button-cancel {
      color: $red;
      width: 40%;
      align-self: flex-start;
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