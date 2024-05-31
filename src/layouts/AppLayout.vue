<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';

import AppNavbar from '@/components/AppNavbar.vue';

const route = useRoute();

const pageTitle = computed(() => route.meta.title);
</script>

<template>
  <div class="layout-container">
    <app-navbar />
    <div class="layout-container-content">
      <h1 class="title">
        {{ pageTitle }}
      </h1>
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
    padding: 16px;
    .title {
      font-size: $h2-font-size;
      margin-bottom: 16px;
    }
  }
}
</style>