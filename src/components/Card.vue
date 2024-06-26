<script setup lang="ts"></script>

<template>
  <div class="card">
    <slot name="title"></slot>
    <slot name="content"></slot>
  </div>
</template>

<style lang="scss" scoped>
.card {
  border: 1px solid $grey;
  padding: 16px;
  border-radius: 12px;
  background-color: $white;
  color: $dark-grey;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>