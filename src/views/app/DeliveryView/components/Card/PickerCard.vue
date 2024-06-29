<script setup lang="ts">
import { computed } from 'vue';

import Card from '@/components/Card.vue';
import ToggleInput from '@/components/ToggleInput.vue';

const emit = defineEmits(['handleSelection']);

const props = defineProps({
  pickerFloatIsActive: {
    type: Boolean,
    required: true
  }
});

const messageCard = computed(() => {
  return props.pickerFloatIsActive
    ? 'Activa esta opcion para usar nuestra FudiFlota' 
    : 'Estas trabajando con la FudiFlota'
})

function activePicker(isActivePicker: boolean) {
  emit('handleSelection', isActivePicker);
}
</script>

<template>
  <Card>
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
      </template>
    </Card>
</template>