<script setup lang="ts">
import Pagoplux from './components/PagoPlux.vue';
</script>

<template>
  <div class="principal-container">
    <h3 class="title">
      Configura tu cuenta de link de pago 😊
    </h3>
    <div class="principal-container-integration">
      <Pagoplux /> 
    </div>
  </div>
</template>

<style lang="scss" scoped>
.principal-container {
  width: 100%;
  &-integration {
    padding: 24px;
    display: flex;
    justify-content: left;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
  }
}
</style>