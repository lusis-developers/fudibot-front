<script setup lang="ts">
import { computed, onMounted, ref, reactive } from 'vue';
import { useRoute } from 'vue-router';

import useOrderStore from '@/store/order';
import useRestaurantStore from '@/store/restaurant';
import fudibot from '@/assets/fudi-isologo-color.png';
import Card from '@/components/Card.vue';
import ScheduleModal from '@/components/Modals/ScheduleModal.vue';

const route = useRoute();

const orderStore = useOrderStore();
const restaurantStore = useRestaurantStore();

const orderId = ref('');
const restaurantId = ref('');
const selectedDay = ref<string>('');
const selectedTime = ref<string>('');
const isModalOpen = ref(false);
const confirmation = reactive({
  date: '',
  time: ''
});
const schedules = computed(() => restaurantStore.restaurant?.schedule);
const isOrderSet = computed(() => !orderStore.orderScheduled?.schedule?.set);
const cardTitle = computed(() => isOrderSet.value ? 'Programa tu entrega' : 'Tu entrega ha sido programada');
const availableDates = computed(() => {
  const today = new Date();
  today.setDate(today.getDate() + 1); // Empezar desde el día siguiente
  const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const result: { value: string; label: string }[] = [];

  if (schedules.value) {
    schedules.value.forEach((schedule) => {
      for (let i = 0; i < 14; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        if (days[date.getDay()] === schedule.day.toLowerCase()) {
          result.push({
            value: date.toISOString().split('T')[0], // Formato ISO para manejo
            label: formatDate(date) // Formato legible para mostrar
          });
        }
      }
    });
  }
  
  // Ordenar las fechas desde la más cercana a la más lejana
  result.sort((a, b) => new Date(a.value).getTime() - new Date(b.value).getTime());

  return result;
});
const datesToDisplay = computed(() => availableDates.value.map(date => date.label));
const availableTimes = computed(() => {
  if (!selectedDay.value) {
    return [];
  }

  const selectedDayName = selectedDay.value.split(',')[0];
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
    confirmation.date = selectedDay.value;
    confirmation.time = selectedTime.value;
    openCloseModal();
  }
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function handleInput($event: string, selectType: string): void {
  if (selectType === 'DAY') {
    const matchedDate = availableDates.value.find(date => date.label === $event);
    if (matchedDate) {
      selectedDay.value = matchedDate.label;
      confirmation.date = matchedDate.value;
    }
  }
  if (selectType === 'TIME') {
    selectedTime.value = $event;
  }
}

function openCloseModal(): void {
  isModalOpen.value = !isModalOpen.value;
}

onMounted(async () => {
  const { query } = route;
  if (typeof query.restaurantId === 'string') {
    restaurantId.value = query.restaurantId;
  }
  if (typeof query.orderId === 'string') {
    orderId.value = query.orderId as string;
  }
  await restaurantStore.getRestaurantById(restaurantId.value);
  await orderStore.getOrderById(orderId.value);
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
            {{ cardTitle }}
          </h3>
        </div>
      </template>
  
      <template
        v-if="isOrderSet"
        #content>
        <div class="form">
          <CrushSelect
            v-if="availableDates !== null"
            :options="datesToDisplay"
            :value="selectedDay"
            label="Seleccione un dia de entrega"
            class="form-group"
            @update:value="handleInput($event, 'DAY')" />

          <CrushSelect
            v-if="availableTimes.length"
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
        </div>
      </template>
    </Card>
  </div>
  <ScheduleModal
    v-if="isModalOpen"
    :isModalOpen="isModalOpen"
    :date="confirmation.date"
    :time="confirmation.time"
    :orderId="orderId"
    @close-modal="openCloseModal" />
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