<script setup lang="ts">
import Pagoplux from './components/PagoPlux.vue';
</script>

<template>
  <div class="principal-container">
    <h3 class="principal-container-title">
      Integraciones disponibles
    </h3>
    <div class="principal-container-integration">
      <Pagoplux /> 
    </div>
  </div>
</template>

<style lang="scss" scoped>
.principal-container {
  width: 100%;
  &-title {
    font-weight: 500;
  }
  &-integration {
    padding: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
  }
}
</style>