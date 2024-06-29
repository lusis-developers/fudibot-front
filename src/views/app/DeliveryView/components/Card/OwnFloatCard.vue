<script setup lang="ts">
import { ref, computed } from 'vue';

import Card from '@/components/Card.vue';
import ToggleInput from '@/components/ToggleInput.vue';

const emit = defineEmits(['handleSelection'])

const props = defineProps({
  hasOwnFleet: {
    type: Boolean,
    required: true,
  }
})

const isActive = ref(props.hasOwnFleet);

const messageCard = computed(() => {
  return isActive
    ? 'Has activado tu propia flota de vehículos.' 
    : 'Activa esta opción para configurar tu propia flota de vehículos.'
});

function setOwnFleet(isOwnFleet: boolean) {
  console.log('toggle: ', isOwnFleet);
  emit('handleSelection', isOwnFleet);
};
</script>

<template>
   <Card>
      <template #content>
        {{ isActive }}
        <div class="delivery-config-toggle-container">
          <ToggleInput
            v-model:value="isActive"
            :text="'Activar'"
            @update:modelValue="setOwnFleet" />
        </div>
        <p class="delivery-config-status-message">
          {{ messageCard }}
        </p> 
      </template>
    </Card>
</template>