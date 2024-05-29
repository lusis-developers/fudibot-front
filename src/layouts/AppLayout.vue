<script setup lang="ts">
import { RouterView } from 'vue-router';

import AppHeader from '@/components/AppHeader.vue';
</script>

<template>
  <div class="layout-container flex flex-col">
    <app-header />
    <div class="view-container flex-grow p-4"> 
      <router-view />
    </div>
  </div>
</template>