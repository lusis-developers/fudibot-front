<script setup lang="ts">
import { computed, PropType, ref } from 'vue';

import { formatToCurrency } from '@/utils/inputFormats';
import mealGenericImage from '@/assets/fudi-plato.png';
import { Categories } from '@/enum/mealOrDrink.enum';

import RemoveMealDrinkModal from '@/components/Modals/RemoveMealDrinkModal.vue'

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
  },
  id: {
    type: String,
    required: true
  },
  categoryType: {
    type: String as PropType<Categories>,
    required: true
  },
  restaurantUuid: {
    type: String,
    required: true
  }
});

const isModalOpen = ref(false);

const formattedPrice = computed(() => formatToCurrency(props.price));
const imageToDisplay = computed(() => props.image.length > 0 ? props.image : mealGenericImage);

function openCloseModal(): void {
  isModalOpen.value = !isModalOpen.value
}
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
    <div class="product-item-actions">
      <CrushButton
        :small="true"
        variant="secondary"
        @click="openCloseModal">
        <i class="fa-solid fa-trash"></i>
      </CrushButton>
    </div>
    <RemoveMealDrinkModal
      :isModalOpen="isModalOpen"
      :id="id"
      :restaurantUuid="restaurantUuid"
      :categoryType="categoryType"
      @close-modal="openCloseModal" />
  </div>
</template>

<style lang="scss" scoped>
:deep(.crush-secondary) {
  border: 1px solid $grey;
  color: $grey;
}

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
    width: 20%;
    display: none;
    justify-content: center;
    align-items: center;

    .image {
      width: 64px;
      height: 64px;
      object-fit: cover;
      border-radius: 5px;
    }

    @media (min-width: $tablet-upper-breakpoint) {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  &-name {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  &-description {
    width: 20%;
    display: none;

    @media (min-width: $tablet-upper-breakpoint) {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  &-price {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &-actions {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>