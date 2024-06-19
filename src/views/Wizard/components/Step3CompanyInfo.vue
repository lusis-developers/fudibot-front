<script setup lang="ts">
import { computed, ref } from 'vue';
import CrushSelect from '@nabux-crush/crush-select';
import CrushTextField from '@nabux-crush/crush-text-field'

import useRestaurantStore from '@/store/restaurantDeprecated';
import SelectDaysIsOpen from '@/components/SelectDaysIsOpen.vue';


const emit = defineEmits(['next', 'prev']);

const restaurantStore = useRestaurantStore();

const form = ref({
  companyName: '',
  schedule: {
    open: '',
    close: '',
    days: [] as any
  }
});
const timeOptions = [
  '6:00', '7:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
];
const isFormValid = computed(() => {
  return form.value.schedule.open !== '' && 
         form.value.schedule.close !== '' && 
         form.value.schedule.days.length > 0;
});

function updateSelectedDays(days: string[]) {
  form.value.schedule.days = days;
}
function handleInput(event: string, type: string): void {
  if (type === 'restaurantName') {
    form.value.companyName = event;
  }
  if (type === 'open') {
    form.value.schedule.open = event;
  }
  if (type === 'close') {
    form.value.schedule.close = event;
  }
  if (type === 'days') {
    form.value.schedule.days = event;
  }
}
async function submitForm() {
  emit('next', form.value);
  await updateCompanyInfo();
}
function goBack(): void {
  emit('prev')
}
async function updateCompanyInfo() {
  await restaurantStore.addCompanyName(form.value.companyName)
  for(let day of form.value.schedule.days){
    await restaurantStore.addSchedule({
      day: day,
      open: form.value.schedule.open,
      close: form.value.schedule.close
    })
  }
}
</script>

<template>
  <div class="step-content">
    <h2>
      Información del Negocio
    </h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <CrushTextField
          :value="form.companyName"
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
          type="submit">
            Siguiente
        </button>
      </div>
    </form>
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