<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="app-container">
    <router-view />
  </div>
</template>

<style scoped>
.app-container {
  width: 100%;
  padding: 0;
  margin: 0;
}
</style>
