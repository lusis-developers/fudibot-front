<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  item: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const displayDescription = computed(() => {
  return props.description.length > 50
    ? props.description.substring(0, 50) + '...'
    : props.description
});
</script>

<template>
  <div class="product-card">
    <h4>
      {{ item }}
    </h4>
    <p>
      {{ price }}
    </p>
    <p>
      {{ displayDescription }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.product-card {
  border: 1px solid $green;
  padding: 16px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  h4 {
    margin: 0 0 8px 0;
    color: $green;
    font-size: 1.2em;
  }

  p {
    margin: 0;
    color: #333;
  }
}
</style>