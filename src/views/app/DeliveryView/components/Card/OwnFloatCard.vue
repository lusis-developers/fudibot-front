<script setup lang="ts">
import { computed } from 'vue';

import Card from '@/components/Card.vue';
import ToggleInput from '@/components/ToggleInput.vue';

const emit = defineEmits(['handleSelection'])

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
</script>

<template>
   <Card>
      <template #content>
        <div class="delivery-config-toggle-container">
          <ToggleInput
            :value="hasOwnFleet"
            :text="'Activar'"
            @update:modelValue="setOwnFleet" />
        </div>
        <p class="delivery-config-status-message">
          {{ messageCard }}
        </p> 
      </template>
    </Card>
</template>