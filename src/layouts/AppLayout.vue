<script setup lang="ts">
import { RouterView } from 'vue-router';

import AppNavbar from '@/components/AppNavbar.vue';
</script>

<template>
  <div class="layout-container">
    <app-navbar />
    <div class="layout-container-content"> 
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout-container {
  display: flex;
  &-content {
    flex-grow: 1;
    min-height: 100vh;
  }
}
</style>