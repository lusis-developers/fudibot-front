<script setup lang="ts">
import { computed, ref } from 'vue';
import CrushSelect from '@nabux-crush/crush-select';

import useRestaurantStore from '@/store/restaurant';
import SelectDaysIsOpen from '@/components/SelectDaysIsOpen.vue';

const emit = defineEmits(['next']);

const restaurantStore = useRestaurantStore();
const form = ref({
  restaurantName: '',
  openingHours: {
    start: '',
    end: '',
    days: [] as any
  }
});
const timeOptions = [
  '6:00', '7:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
];

const isFormValid = computed(() => {
  return form.value.openingHours.start !== '' && 
         form.value.openingHours.end !== '' && 
         form.value.openingHours.days.length > 0;
});

function updateSelectedDays(days: string[]) {
  form.value.openingHours.days = days;
  console.log('Días seleccionados:', days);
}
function handleInput(event: string, type: string): void {
  if (type === 'restaurantName') {
    form.value.restaurantName = event;
  }
  if (type === 'start') {
    form.value.openingHours.start = event;
    console.log('Hora de Apertura:', form.value.openingHours.start);
  }
  if (type === 'end') {
    form.value.openingHours.end = event;
    console.log('Hora de Cierre:', form.value.openingHours.end);
  }
  if (type === 'days') {
    form.value.openingHours.days = event;
  }
}
function submitForm(): void {
  if (isFormValid.value) {
    emit('next', form.value);
    console.log('Formulario enviado exitosamente:', form.value);
  } else {
    console.log('faltan datos');
  }
}
function updateCompanyInfo() {
  const schedule = `${form.value.openingHours.start} - ${form.value.openingHours.end}`;
  const newForm = {
    companyName: form.value.restaurantName,
    schedule,
  };
  restaurantStore.addCompanyInfo(newForm)
}
</script>

<template>
  <div class="step-content">
    <h2>Información del Negocio</h2>
    <form @submit.prevent="submitForm">

      <div class="form-group">
        <CrushSelect
          label="Hora de Apertura:"
          :options="timeOptions"
          :value="form.openingHours.start"
          @update:value="handleInput($event, 'start')"
          class="form-group-select"
        />
      </div>

      <div class="form-group">
        <CrushSelect
          label="Hora de Cierre:"
          :options="timeOptions"
          :value="form.openingHours.end"
          @update:value="handleInput($event, 'end')"
          class="form-group-select"
        />
      </div>

      <div class="form-group">
        <SelectDaysIsOpen @update:selectedDays="updateSelectedDays"/>
      </div>
      <div class="form-actions">
        <button 
          type="submit"
          @click="updateCompanyInfo"
          :style="{ cursor: isFormValid ? 'pointer' : 'not-allowed' }">
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
  justify-content: flex-end;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: $green;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: $light-green;
}
</style>