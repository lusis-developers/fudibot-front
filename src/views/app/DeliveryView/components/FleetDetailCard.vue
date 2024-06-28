<script setup lang="ts">
import Card from '@/components/Card.vue';

const props = defineProps({
  km: {
    type: String,
    required: true,
  },
  price: {
    type: String, 
    required: true
  }
})
</script>

<template>
  <Card class="card">
    <template #content>
      <p>
        kilometros a la redonda: {{ props.km }}
      </p>
      <p>
        precio establecido: {{ props.price }}
      </p>
    </template>
  </Card>

</template>

<style lang="scss" scoped>
.card {
  width: 100%;
  max-width: $mobile-lower-breakpoint;
}
</style>