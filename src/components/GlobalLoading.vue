<script setup lang="ts">
const loadingColor = '#25a563'
</script>

<template>
  <div class="loading-card">
    <CrushGlobalLoading
      size="100px"
      :color="loadingColor"/>
  </div>
</template>

<style lang="scss" scoped>
.loading-card {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>