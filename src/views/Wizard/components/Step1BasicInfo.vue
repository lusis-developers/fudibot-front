<script setup lang="ts">
import { onMounted, ref, computed, reactive } from 'vue';
import { Loader } from '@googlemaps/js-api-loader';

import useRestaurantStore from '@/store/restaurant';
import CrushTextField from '@nabux-crush/crush-text-field'

const emit = defineEmits(['next']);

const restaurantStore = useRestaurantStore();

const apiKey = 'AIzaSyA-m3u-eZGtvXPnO4Z3bQ_L_iybWOwQgdY';
const map = ref<google.maps.Map | null>(null);
const marker = ref<google.maps.Marker | null>(null);
const form = reactive({
  botName: '',
  location: {
    latitude: 0,
    radius: '',
    longitude: 0,
    fullAddress: ''
  }
});
const isFormValid = computed(() => form.botName && form.location.fullAddress && (Number(form.location.radius) > 0));

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
        form.location.latitude = center.lat();
        form.location.longitude = center.lng();
      }
    });

    google.maps.event.addListener(map.value, 'idle', () => {
      const center = map.value!.getCenter();
      if (center) {
        form.location.latitude = center.lat();
        form.location.longitude = center.lng();
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
        form.location.latitude = latitude;
        form.location.longitude = longitude;
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
    form.botName = event;
  }
  if (type === 'fullAddress') {
    form.location.fullAddress = event;
  } 
  if (type === 'radius') {
    form.location.radius = Number(event).toString();
  }
}
function submitForm(): void {
  emit('next');
  restaurantStore.addBasicInfo(
    { ...form.location, radius: Number(form.location.radius) },
    form.botName
  );
}

onMounted(() => {
  getUserLocation();
});
</script>

<template>
  <div class="step-content">
    <h2>
      Información Básica
    </h2>
    <div class="form">
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
          type="number"
          placeholder="Radio de atención en Kilómetros"
          label="Radio de atención"
          class="form-group-text-field"
          @update:modelValue="handleInput($event, 'radius')" />
      </div>

      <div class="form-group">
        <CrushTextField
          :value="form.location.fullAddress"
          placeholder="Dirección"
          label="Ubicación del Restaurante:"
          class="form-group-text-field"
          @update:modelValue="handleInput($event, 'fullAddress')" />
      </div>

      <div class="form-group">
        <label for="coordinates">
          Coordenadas: {{ form.location.latitude }}, {{ form.location.longitude }}
        </label>
        <div id="map"></div>
      </div>

      <div class="form-actions">
        <CrushButton
          :disabled="!isFormValid"
          @click="submitForm">
            Siguiente
        </CrushButton>
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
