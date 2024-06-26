<script setup lang="ts">
import { computed } from 'vue';

import { formatToCurrency } from '@/utils/inputFormats';
import mealGenericImage from '@/assets/fudi-plato.png';

const props = defineProps({
  image: {
    type: String,
    required: true
  },
  item: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const formattedPrice = computed(() => formatToCurrency(props.price));
const imageToDisplay = computed(() => props.image.length > 0 ? props.image : mealGenericImage);
</script>

<template>
  <div class="product-item">
    <div class="product-item-image">
      <img
        :src="imageToDisplay"
        alt="meal image"
        class="image">
    </div>
    <div class="product-item-name">
      {{ item }}
    </div>
    <div class="product-item-description">
      {{ description }}
    </div>
    <div class="product-item-price">
      {{ formattedPrice }}
    </div>
  </div>
</template>

<style lang="scss"coped>
.product-item {
  border-top: 1px solid $grey;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (min-width: $tablet-upper-breakpoint) {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &-image {
    width: 25%;
    display: flex;
    justify-content: center;
    align-items: center;

    .image {
      width: 64px;
      height: 64px;
      object-fit: cover;
      border-radius: 5px;
    }
  }

  &-name {
    width: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  &-description {
    width: 25%;
    display: none;

    @media (min-width: $tablet-upper-breakpoint) {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  &-price {
    width: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>