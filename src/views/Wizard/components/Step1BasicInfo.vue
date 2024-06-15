<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { Loader } from '@googlemaps/js-api-loader';
import CrushTextField from '@nabux-crush/crush-text-field'

import useRestaurantStore from '@/store/restaurant';


const emit = defineEmits(['next']);

const restaurantStore = useRestaurantStore();

const apiKey = 'AIzaSyA-m3u-eZGtvXPnO4Z3bQ_L_iybWOwQgdY';
const map = ref<google.maps.Map | null>(null);
const marker = ref<google.maps.Marker | null>(null);
const form = ref({
  botName: '',
  location: {
    lat: 0,
    radius: '10',
    lng: 0,
    fullAdress: ''
  }
});
const isFormValid = computed(() => form.value.botName && form.value.location.fullAdress && form.value.location.radius);

function initializeMap(lat: number, lng: number): void {
  const loader = new Loader({
    apiKey: apiKey,
    version: 'weekly'
  });

  loader.load().then(() => {
    const mapElement = document.getElementById('map') as HTMLElement;
    map.value = new google.maps.Map(mapElement, {
      center: { lat, lng },
      zoom: 18,
      mapTypeControl: false,
      streetViewControl: false
    });

    marker.value = new google.maps.Marker({
      map: map.value,
      position: { lat, lng },
      draggable: false,
      icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    });

    map.value.addListener('center_changed', () => {
      const center = map.value!.getCenter();
      if (center) {
        marker.value!.setPosition(center);
        form.value.location.lat = center.lat();
        form.value.location.lng = center.lng();
      }
    });

    google.maps.event.addListener(map.value, 'idle', () => {
      const center = map.value!.getCenter();
      if (center) {
        form.value.location.lat = center.lat();
        form.value.location.lng = center.lng();
      }
    });
  });
}
function getUserLocation(): void {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        initializeMap(latitude, longitude);
        form.value.location.lat = latitude;
        form.value.location.lng = longitude;
      },
      () => {
        initializeMap(-2.170998, -79.922356); // Guayaquil coordinates
      }
    );
  } else {
    initializeMap(-2.170998, -79.922356); // Guayaquil coordinates
  }
}
function handleInput(event: string, type: string): void {
  if (type === 'botName') {
    form.value.botName = event;
    console.log('botname: ', form.value.botName)
  }
  if (type === 'location') {
    form.value.location.fullAdress = event;
  } 
  if (type === 'radius') {
    form.value.location.radius = Number(event).toString();
    console.log('radio de atencion: ', form.value.location.radius)
  }
}
function submitForm(): void {
  emit('next', form.value);
  restaurantStore.addBasicInfo(form.value);
}

onMounted(getUserLocation);
</script>

<template>
  <div class="step-content">
    <h2>
      Información Básica
    </h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <CrushTextField
          :value="form.botName"
          placeholder="Superbot"
          label="Nombre del Bot:"
          class="form-group-text-field"
          @update:modelValue="handleInput($event, 'botName')" />
      </div>

      <div class="form-group">
        <CrushTextField
          :value="form.location.radius"
          placeholder="Radio de atención en Kilómetros"
          label="Radio de atención"
          class="form-group-text-field"
          @update:modelValue="handleInput($event, 'radius')" />
      </div>

      <div class="form-group">
        <CrushTextField
          :value="form.location.fullAdress"
          placeholder="Dirección"
          label="Ubicación del Restaurante:"
          class="form-group-text-field"
          @update:modelValue="handleInput($event, 'location')" />
      </div>

      <div class="form-group">
        <label for="coordinates">
          Coordenadas:
        </label>
        <div id="map"></div>
      </div>

      <div class="form-actions">
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
  :deep(.crush-text-field-label-text){
    color: $black;
    font-family: $font;
  };
  :deep(.form-group-text-field .crush-text-field-input) {
    color: $black;
    font-family: $font;
  }
  :deep(.crush-text-field .input-container.active) {
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
#map {
  height: 300px;
  width: 100%;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
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
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  &:not(:disabled):hover {
    background-color: $light-green;
  }
}
</style>
