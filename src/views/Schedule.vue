<script setup lang="ts">
import { computed, onMounted, ref, reactive } from 'vue';
import { useRoute } from 'vue-router';

import useRestaurantStore from '@/store/restaurant';
import fudibot from '@/assets/fudi-isologo-color.png';
import Card from '@/components/Card.vue';

const route = useRoute();

const restaurantStore = useRestaurantStore();

const orderId = ref('');
const restaurantId = ref('');
const selectedDay = ref<string | null>(null);
const selectedTime = ref<string | null>(null);
const confirmation = reactive({
  date: '',
  time: ''
});
const schedules = computed(() => restaurantStore.restaurant?.schedule);
const availableDates = computed(() => {
  const today = new Date();
  today.setDate(today.getDate() + 1); // Empezar desde el día siguiente
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const result: string[] = [];

  if (schedules.value) {
        
    schedules.value.forEach((schedule) => {
      for (let i = 0; i < 14; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        if (days[date.getDay()] === schedule.day) {
          result.push(date.toDateString());
        }
      }
    });

  }
  return result;
});
const availableTimes = computed(() => {
  if (!selectedDay.value) {
    return [];
  }
  const selectedDayName = new Date(selectedDay.value).toLocaleDateString('es-ES', { weekday: 'long' });
  const schedule = schedules.value?.find((s) => s.day.toLowerCase() === selectedDayName.toLowerCase());

  if (!schedule) {
    return [];
  }

  const openHour = parseInt(schedule.open.split(':')[0]);
  const closeHour = parseInt(schedule.close.split(':')[0]);
  const times: string[] = [];
  for (let i = openHour; i < closeHour; i++) {
    times.push(`${i}:00`);
  }
  return times;
});

function confirmSelection(): void {
  if (selectedDay.value && selectedTime.value) {
    confirmation.date = selectedDay.value,
    confirmation.time = selectedTime.value
  }
}

function handleInput($event: string, selectType: string): void {
  if (selectType === 'DAY') {
    selectedDay.value = $event;
  }
  if (selectType === 'TIME') {
    selectedTime.value = $event;
  }
}

onMounted(async () => {
  const { query } = route;
  if (typeof query.restaurantId === 'string') {
    restaurantId.value = query.restaurantId;
  }
  if (typeof query.orderId === 'string') {
    orderId.value = query.orderId;
  }
  await restaurantStore.getRestaurantById(restaurantId.value);
  console.log(restaurantStore.restaurant);
});
</script>

<template>
  <div class="schedule">
    <Card>
      <template #title>
        <div class="header">
          <img
            :src="fudibot"
            alt="fuditbot logo">
          <h3>
            Programa tu pedido
          </h3>
        </div>
      </template>
  
      <template #content>
        <div class="form">
          <CrushSelect
            :options="availableDates"
            :value="selectedDay"
            label="Seleccione un dia de entrega"
            class="form-group"
            @update:value="handleInput($event, 'DAY')" />

          <CrushSelect
            :options="availableTimes"
            :value="selectedTime"
            label="Seleccione una hora de entrega:"
            class="form-group"
            @update:value="handleInput($event, 'TIME')" />
  
          <div class="form-action">
            <CrushButton
              :small="true"
              :disabled="!(selectedDay && selectedTime)"
              @click="confirmSelection">
              Confirmar
            </CrushButton>
          </div>
          <div v-if="confirmation">
            <p>Ha seleccionado el {{ confirmation.date }} a las {{ confirmation.time }}.</p>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<style lang="scss" scoped>
.schedule {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;

    img {
      width: 64px;
      height: 64px;
      margin: auto;
    }
  }

  .form {
    margin: 12px 0;
 
    :deep(.form-container-label-select){
      color: $black;
      border-color: $green;
    }
    :deep(.form-container-label-select){
      color: $black;
      border-color: $green;
    }
    :deep(.form-container-label) {
      color: $black;
    }
    :deep(.crush-text-field .input-container .content) {
      color: black;
      font-family: $font;
    }

    &-action {
      display: flex;
      justify-content: center;
      max-width: 420px;
      min-width: 300px;
    }
  }
}
</style>