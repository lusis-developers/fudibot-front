<script setup lang="ts">
import { PropType, computed, ref } from 'vue';

import { OrderStatus } from '@/enum/order.enum';
import { statusAvailable } from '@/utils/order';
import { formatToCurrency } from '@/utils/inputFormats';
import Modal from '@/components/Modal.vue';

import type { OrderItem } from '@/interfaces/order.interface';

const emit = defineEmits(['update:modalValue', 'closeModal'])

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

const statusSelected = ref(props.status);
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

function updateStatus(status: OrderStatus): void {
  statusSelected.value = status;
  
}

function closeModal(): void {
  emit('closeModal');
}
async function submitStatus(): Promise<void> {
  // TODO: update oorder status;
  closeModal();
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
      <div class="content">
        <div class="item-order">
          <span>
            Pedido
          </span>
          <span
            v-for="(item, index) in items"
            :key="index">
            {{ item.quantity }} X {{ item.item }} - {{  item.price }}
          </span>
        </div>
        <div class="item-total">
          <span>
            Total
          </span>
          <span>
            {{ formattedTotal }}
          </span>
        </div>
        <div class="item-delivery">
          <span>
            Flete
          </span>
          <span>
            ${{ deliveryCost }}
          </span>
        </div>
        <div class="item-status">
          <span>
            Estado
          </span>
          <span :class="[statusClass]">
            {{ status }}
          </span>
        </div>
        <div class="status-actions">
          <span>
            Cambiar estado
          </span>
          <button
            v-for="(status, index) in statusAvailable"
            :key="index"
            :class="{ active: statusSelected === status.status, [statusClass]: statusSelected === status.status }"
            @click="updateStatus(status.status)">
            {{ status.nameDisplayed }}
          </button>
        </div>
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
          @click="submitStatus">
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

  .content {
    margin: 12px 0;

    .item {
      &-order, &-total, &-status, &-delivery {
        width: 100%;
        margin: 12px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      &-status {
        span:nth-of-type(2) {
          padding: 4px 8px;
          border-radius: 8px;
        }
      }
    }

    .status-actions {
      display: flex;
      flex-direction: column;


      button {
        width: 128px;
        background-color: white;
        border-radius: 8px;
        padding: 8px 4px;
        margin: 4px auto;

        &.active {
          background-color: $green;
          color: $white;
        }

      }
    }
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