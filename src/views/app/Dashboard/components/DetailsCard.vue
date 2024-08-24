<script setup lang="ts">
import Card from '@/components/Card.vue';

defineProps({
  title: {
    type: String,
    required: true
  },
  data: {
    type: Number,
    required: true
  }
});
</script>

<template>
  <div class="detail">
    <Card class="detail-card">
      <template #content>
        <span class="data">
          {{ data }}
        </span>
        <h4 class="title">
          {{ title }}
        </h4>
      </template>
    </Card>
    <Card class="detail-card">
      <template #content>
        <span class="data">
          {{ data }}
        </span>
        <h4 class="title">
          {{ title }}
        </h4>
      </template>
    </Card>
    <Card class="detail-card">
      <template #content>
        <span class="data">
          {{ data }}
        </span>
        <h4 class="title">
          {{ title }}
        </h4>
      </template>
    </Card>
  </div>
</template>

<style lang="scss" scoped>
.detail {
  margin: 24px 0;
  width: 100%;
  display: grid;
  gap: 16px;
  justify-content: stretch;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
}
</style>