<script setup lang="ts">
import Card from '@/components/Card.vue';

defineProps({
  title: {
    type: String,
    required: true
  },
  data: {
    type: [Number, String],
    required: true
  }
});
</script>

<template>
  <Card class="detail-card">
    <template #content>
      <span class="data">
        {{ data }}
      </span>
      <span class="title">
        {{ title }}
      </span>
    </template>
  </Card>
</template>

<style lang="scss" scoped>
.detail-card {
  display: flex;
  flex-direction: column;
  .title {
    font-weight: 600;
    font-size: $body-font-size;
  }
}
</style>