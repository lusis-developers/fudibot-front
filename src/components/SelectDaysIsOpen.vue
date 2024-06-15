<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['update:selectedDays']);

const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const selectedDays = ref<string[]>([]);

function toggleDay(day: string) {
  const index = selectedDays.value.indexOf(day);
  if (index === -1) {
    selectedDays.value.push(day);
  } else {
    selectedDays.value.splice(index, 1);
  }
  emit('update:selectedDays', selectedDays.value);
}
</script>
      
<template>
  <div class="select-days">
    <h3>
      Selecciona los días que tu local se encuentra abierto:
    </h3>
    <div class="select-days-days-container">
      <div
        v-for="day in daysOfWeek"
        :key="day"
        :class="['day', { selected: selectedDays.includes(day) }]"
        @click="toggleDay(day)">
          {{ day }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.select-days {
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  &-days-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
  }
  .day {
    padding: 10px 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
  } 
  .day.selected {
    background-color: darken($green, 10%);
    color: white;
    border-color: darken($green, 10%);
  } 
}
</style>