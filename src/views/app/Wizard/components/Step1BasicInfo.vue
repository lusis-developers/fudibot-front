<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Loader } from '@googlemaps/js-api-loader';

const emit = defineEmits(['next']);

const apiKey = 'AIzaSyA-m3u-eZGtvXPnO4Z3bQ_L_iybWOwQgdY';
const map = ref<google.maps.Map | null>(null);
const marker = ref<google.maps.Marker | null>(null);
const form = ref({
  botName: '',
  location: '',
  coordinates: {
    latitude: 0,
    longitude: 0,
    radius: 10
  }
});

function submitForm(): void {
  emit('next', form.value);
}

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
        form.value.coordinates.latitude = center.lat();
        form.value.coordinates.longitude = center.lng();
      }
    });

    google.maps.event.addListener(map.value, 'idle', () => {
      const center = map.value!.getCenter();
      if (center) {
        form.value.coordinates.latitude = center.lat();
        form.value.coordinates.longitude = center.lng();
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
        form.value.coordinates.latitude = latitude;
        form.value.coordinates.longitude = longitude;
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
  if (type === 'sport') {
    bet.sport = event;
  }
  if (type === 'league') {
    bet.league = event;
  }
  if (type === 'teamA') {
    bet.teamA = event;
  }
  if (type === 'teamB') {
    bet.teamB = event;
  }
  if (type === 'date') {
    bet.date = event;
  }
  if (type === 'percentage') {
    bet.percentage = event;
  }
  if (type === 'description') {
    bet.description = event;
  }
}

onMounted(() => {
  getUserLocation();
});
</script>

<template>
  <div class="step-content">
    <h2>Información Básica</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="botName">Nombre del Bot:</label>
        <input id="botName" v-model="form.botName" required />
        <CrushInput
          label="Nombre del Bot:"
          placeholder="Superbot"
          :value="form.botName"
          @update:modelValue="handleInput($event, 'botName')"
           />
      </div>

      <div class="form-group">
        <label for="location">Ubicación del Restaurante:</label>
        <input id="location" v-model="form.location" required />
      </div>

      <div class="form-group">
        <label for="coordinates">Coordenadas:</label>
        <div id="map"></div>
      </div>

      <div class="form-actions">
        <button type="submit">Siguiente</button>
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
}

button:hover {
  background-color: $light-green;
}
</style>
