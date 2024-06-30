<script setup lang="ts">
import { computed } from 'vue';

import Card from '@/components/Card.vue';
import ToggleInput from '@/components/ToggleInput.vue';
import pickerLogo from '@/assets/integrations/picker-logo.png'

const emit = defineEmits(['handleSelection']);

const props = defineProps({
  pickerFloatIsActive: {
    type: Boolean,
    required: true
  }
});

const messageCard = computed(() => {
  return props.pickerFloatIsActive
  ? 'Estas trabajando Picker'
  : 'Desactiva la opción inferior para trabajar con Picker' 
})

function activePicker(isActivePicker: boolean) {
  emit('handleSelection', isActivePicker);
}
</script>

<template>
  <Card class="pickerCard">
      <template #content>
        <div class="delivery-config-toggle-container">
          <ToggleInput
            :value="pickerFloatIsActive"
            :text="'Activar'"
            @update:modelValue="activePicker" />
        </div>
        <p class="delivery-config-status-message">
          {{ messageCard }}
        </p> 
        <img 
          :src="pickerLogo"
          class="image"/>
      </template>
    </Card>
</template>

<style lang="scss" scoped>
.pickerCard {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 16px;
  pointer-events: none;
  cursor: not-allowed;
  .delivery-config-status-message {
    font-size: $body-font-size;
  }
  .image {
    width: 56px;
    height: 56px;
    border-radius: 8px;
  }
}
</style>