<script setup lang="ts">
import { computed, ref } from 'vue';

import Modal from '@/components/Modal.vue';
import useDeliveryStore from '@/store/delivery';
import useClientStore from '@/store/client';
import { formatNumberToSave, formatPriceToDisplay } from '@/utils/inputFormats';

const emit = defineEmits(['closeModal'])

const deliveryStore = useDeliveryStore();
const clientStore = useClientStore();

defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});

const generalDeliveryCost = ref('');

const buttonActive = computed(() => {
  return generalDeliveryCost.value !== '';
});

function handleInput(event: string, type: string): void {
  if (type === 'price') {
    generalDeliveryCost.value = formatPriceToDisplay(event);
  };
};

function closeModal() {
  emit('closeModal', false);
};

async function addgeneralDeliveryCost(): Promise<void> {
  const id = deliveryStore.delivery?._id;
  if (id) {
    const data = {
      id: id,
      generalDeliveryCost: formatNumberToSave(generalDeliveryCost.value),
    };
    const attentionRadius = clientStore.client?.restaurant?.location.radius;
    
    if (!deliveryStore.delivery?.fleetDetails?.length) {
      await deliveryStore.addFleetDetail(
      {
        id: deliveryStore.delivery?._id!, 
        price: 0, 
        radius: attentionRadius!
      })
    }
    await deliveryStore.addGeneralDeliveryCost(data);
    await deliveryStore.getDeliveryData(id)
    emit('closeModal', false);
  }
}
</script>

<template>
  <Modal 
    :modalValue="active"
    class="modal-fleet">
    <template #header>
      <h3 class="modal-fleet-title">
        Agrega tu costo general de envío
      </h3>
      <li class="modal-fleet-li">
        Este será el valor que se cobrará en todos tus envíos
      </li>
    </template>
    <template #content>
      <div class="modal-fleet-form">
        <CrushTextField 
          class="question"
          :value="generalDeliveryCost"
          prependContent="$"
          placeholder="Establece un precio estandar para todos los envíos"
          label="Precio estándar"
          @update:modelValue="handleInput($event, 'price')"/>
          <CrushButton
            text="Cancelar"
            class="button-cancel"
            @click="closeModal"/>
          <CrushButton
            :disabled="!buttonActive"
            text="Guardar"
            class="button"
            @click="addgeneralDeliveryCost"/>
      </div>
    </template>
  </Modal>
</template>

<style lang="scss" scoped>
.modal-fleet {
  &-title {
    margin-bottom: 16px;
  }
  &-li {
    list-style: none;
    margin-bottom: 16px;
    &::before {
      content: '** Aviso: ';
      color: $red;
    }
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