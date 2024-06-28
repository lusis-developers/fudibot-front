<script setup lang="ts">
import { ref, computed, PropType } from 'vue';

import { OrderStatus } from '@/enum/order.enum';
import { formatToCurrency } from '@/utils/inputFormats';
import { OrderItem } from '@/interfaces/order.interface';
import DetailsModal from '@/views/app/OrderHistory/components/DetailsModal.vue';

const props = defineProps({
  _id: {
    type: String,
    required: true
  },
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

const isModalOpen = ref(false);
const formattedTotal = computed(() => formatToCurrency(props.total));
const statusClass = computed(() => {
  switch (props.status) {
    case OrderStatus.OPEN:
      return 'status-open';
    case OrderStatus.PREPARING:
      return 'status-preparing';
    case OrderStatus.ON_THE_WAY:
      return 'status-on-the-way';
    case OrderStatus.DELIVERED:
      return 'status-delivered';
    case OrderStatus.CANCELLED_BY_RESTAURANT:
      return 'status-cancelled-by-restaurant';
    case OrderStatus.FAILED_DELIVERY:
      return 'status-failed-delivery';
    default:
      return '';
  }
});

function openCloseModal(): void {
  isModalOpen.value = !isModalOpen.value;
}
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
      ${{ deliveryCost }}
    </div>
    <div class="product-item-status">
      <span :class="[statusClass]">
        {{ status }}
      </span>
    </div>
    <div class="product-item-actions">
      <CrushButton
        :small="true"
        variant="secondary"
        @click="openCloseModal">
        detalles
      </CrushButton>
    </div> 
  </div>
  <DetailsModal
    :modalValue="isModalOpen"
    :_id="_id"
    :deliveryCost="deliveryCost"
    :items="items"
    :total="total"
    :status="status"
    @closeModal="openCloseModal" />
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
  justify-content: space-evenly;
  align-items: center;
  padding: 16px 0;
  
  @media (min-width: $tablet-upper-breakpoint) {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &-order {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    @media (min-width: $tablet-upper-breakpoint) {
      width: 20%;
      justify-content: center;
      align-items: flex-start;
    }

    span {
      display: block;
      white-space: pre-wrap;
      word-wrap: break-word;
      overflow-wrap: break-word;
      font-size: 14px;
    }
  }

  &-cost, &-delivery, &-status {
    width: 20%;
    display: none;
    justify-content: center;
    align-items: center;
    
    @media (min-width: $tablet-upper-breakpoint) {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  &-status {
    span {
      padding: 4px 8px;
      border-radius: 8px;
      font-size: 10px;
    }
  }

  &-actions {
    width: 50%;
    display: flex;
    justify-content: center;
    
    @media (min-width: $tablet-upper-breakpoint) {
      width: 20%;
    }
  }
}

.status-open {
  background-color: lightblue;
}

.status-preparing {
  background-color: yellow;
}

.status-on-the-way {
  background-color: orange;
}

.status-delivered {
  background-color: lightgreen;
}

.status-cancelled-by-restaurant {
  background-color: lightcoral;
}

.status-failed-delivery {
  background-color: darkred;
}
</style>