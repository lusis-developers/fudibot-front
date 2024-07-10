<script setup lang="ts">
import { computed, reactive } from 'vue';

import useRestaurantStore from '@/store/restaurant';
import { timeOptions } from '@/utils/timeSchedules';
import SelectDaysIsOpen from '@/components/SelectDaysIsOpen.vue';


const emit = defineEmits(['next', 'prev']);

const restaurantStore = useRestaurantStore();

const form = reactive({
  restaurantName: '',
  schedule: {
    open: '',
    close: '',
    days: [] as any
  }
});

const isFormValid = computed(() => {
  return form.schedule.open !== '' && 
         form.schedule.close !== '' && 
         form.schedule.days.length > 0;
});

function updateSelectedDays(days: string[]) {
  form.schedule.days = days;
}
function handleInput(event: string, type: string): void {
  if (type === 'restaurantName') {
    form.restaurantName = event;
  }
  if (type === 'open') {
    form.schedule.open = event;
  }
  if (type === 'close') {
    form.schedule.close = event;
  }
  if (type === 'days') {
    form.schedule.days = event;
  }
}
async function submitForm() {
  updateCompanyInfo();
  emit('next');
}
function goBack(): void {
  emit('prev')
}
function updateCompanyInfo(): void {
  const schedule = form.schedule.days.map((day: string) => {
    return {
      day: day,
      open: form.schedule.open,
      close: form.schedule.close
    }
  });
  restaurantStore.addCompanyData(form.restaurantName, schedule)
}
</script>

<template>
  <div class="step-content">
    <h2>
      Información del Negocio
    </h2>
    <div class="form">
      <div class="form-group">
        <CrushTextField
          :value="form.restaurantName"
          placeholder="Nombre del Restaurante"
          label="Nombre del Restaurante:"
          class="form-group-text-field"
          @update:modelValue="handleInput($event, 'restaurantName')" />
      </div>

      <div class="form-group">
        <CrushSelect
          :options="timeOptions"
          :value="form.schedule.open"
          label="Hora de Apertura:"
          class="form-group-select"
          @update:value="handleInput($event, 'open')" />
      </div>

      <div class="form-group">
        <CrushSelect
          :options="timeOptions"
          :value="form.schedule.close"
          label="Hora de Cierre:"
          class="form-group-select"
          @update:value="handleInput($event, 'close')" />
      </div>

      <div class="form-group">
        <SelectDaysIsOpen @update:selectedDays="updateSelectedDays" />
      </div>

      <div class="form-actions">
        <button
          type="button"
          @click="goBack">
            Retroceder
        </button>
        <button 
          :disabled="!isFormValid"
          @click="submitForm">
            Siguiente
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.step-content {
  width: 100%;
}
.form-group {
  margin-bottom: 20px;
  :deep(.form-container-label){
    color: $black;
    font-family: $font;
  }
  :deep(.form-container-label-select){
    color: $black;
    border-color: $green;
  }
  :deep(.form-container-label-select){
    color: $black;
    border-color: $green;
  }
  :deep(.form-group-text-field .crush-text-field-input) {
    color: $black;
    font-family: $font;
  }
  :deep(.crush-text-field .input-container.active) {
    border-color: $green;
  }
  :deep(.form-group-text-field .crush-text-field-input) {
    color: $black;
    font-family: $font;
  }
  :deep(.crush-text-field .input-container.active) {
    border-color: $green;
  }
  :deep(.crush-text-field-label-text){
    color: $black;
    font-family: $font;
  };
}
label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}
input {
  width: 100%;
  padding: 10px;
  border: 1px solid $white;
  border-radius: 5px;
  box-sizing: border-box;
}
.form-actions {
  display: flex;
  justify-content: space-between;
}
button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: $green;
  color: white;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  &:not(:disabled):hover {
    background-color: $light-green;
  }
}
</style>