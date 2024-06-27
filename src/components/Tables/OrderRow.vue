<script setup lang="ts">
import { computed, PropType } from 'vue';

import { formatToCurrency } from '@/utils/inputFormats';
import { OrderItem } from '@/interfaces/order.interface';

const props = defineProps({
  items: {
    type: Array as PropType<OrderItem[]>,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  deliveryCost: {
    type: Number,
    required: true
  },
});

const formattedTotal = computed(() => formatToCurrency(props.total));
</script>

<template>
  <div class="product-item">
    <div class="product-item-order">
      <span
        v-for="(item, index) in items"
        :key="index">
        {{ item.quantity }} X {{ item.item }} - {{  item.price }}
      </span>
    </div>
    <div class="product-item-cost">
      {{ formattedTotal }}
    </div>
    <div class="product-item-delivery">
      {{ deliveryCost }}
    </div>
    <div class="product-item-status">
      {{ status }}
    </div>
    <div class="product-item-actions">
      Acciones
    </div>
  </div>
</template>

<style lang="scss" scoped>
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

  &-order {
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    span {
      display: block;
      white-space: pre-wrap;
      word-wrap: break-word;
      overflow-wrap: break-word;
      font-size: 14px;
    }
  }

  &-cost {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  &-delivery {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &-status {
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