<script setup lang="ts"></script>

<template>
  <div class="card">
    <slot>

    </slot>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 12px;
  background-color: #ffffff;
  color: #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>