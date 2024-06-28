<script setup lang="ts">
import { PropType, computed } from 'vue';

import { formatToCurrency } from '@/utils/inputFormats';
import { OrderStatus } from '@/enum/order.enum';
import Modal from '@/components/Modal.vue';

import type { OrderItem } from '@/interfaces/order.interface';

const emit = defineEmits(['update:modalValue'])

const props = defineProps({
  modalValue: {
    type: Boolean,
    required: true
  },
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

function closeModal(): void {
  emit('update:modalValue');
}
</script>


<template>
  <Modal
    :modalValue="modalValue">
    <template #header>
      <div class="modal-header">
        <h4>Order Details</h4>
        <CrushButton
          variant="secondary"
          @click="closeModal">
          <i class="fa-solid fa-x"></i>
        </CrushButton>
      </div>
    </template>
    <template #content>
      <div>
        <span
          v-for="(item, index) in items"
          :key="index">
          {{ item.quantity }} X {{ item.item }} - {{  item.price }}
        </span>
      </div>
      <div class="item-cost">
        {{ formattedTotal }}
      </div>
      <div class="item-delivery">
        ${{ deliveryCost }}
      </div>
      <div class="item-status">
        <span :class="[statusClass]">
          {{ status }}
        </span>
      </div>
    </template>
    <template #footer>
      <div class="modal-footer">
        <CrushButton
          variant="secondary"
          @click="closeModal">
          Cancel
        </CrushButton>
        <CrushButton
          @click="closeModal">
          Guardar
        </CrushButton>
      </div>
    </template>
  </Modal>
</template>

<style lang="scss" scoped>
:deep(.crush-primary) {
  color: $white;
  background-color: $green;
  border: 1px solid $green;
}
:deep(.crush-secondary) {
  color: $black;
  background-color: $white;
  border: 1px solid $grey;
}

.modal {
  &-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &-footer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 12px;
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