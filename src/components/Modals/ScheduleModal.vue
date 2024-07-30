<script setup lang="ts">
import { onMounted } from 'vue';

import useBillStore from '@/store/bill';
import useUserStore from '@/store/user';
import useOrderStore from '@/store/order';
import Modal from '@/components/Modal.vue';

const emits = defineEmits(['close-modal']);
const props = defineProps({
  isModalOpen: {
    type: Boolean,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  orderId: {
    type: String,
    required: true
  },
  restaurantId: {
    type: String,
    required: true
  }
});

const userStore = useUserStore();
const billStore = useBillStore();
const orderStore = useOrderStore();

function closeModal(): void {
  emits('close-modal');
}

async function confirmScheduleOrder(): Promise<void> {
  await orderStore.updateOrderScheduled(props.orderId, { date: props.date, time: props.time });
  if (userStore.user) {
    await billStore.sendCreateBill(props.restaurantId, userStore.user?.currentBill, userStore.user?.number)
  }
  closeModal();
}

onMounted(async () => {
  if (orderStore.orderScheduled) {
    await userStore.getUser(orderStore.orderScheduled?.userId);
  }
  if (userStore.user) {
    await billStore.getBillById(userStore.user.currentBill);
  }
});
</script>

<template>
  <Modal :modalValue="isModalOpen">
    <template #header>
      <div class="header">
        <h2 class="modal-title">
          Confirmar fecha
        </h2>
        <a @click="closeModal">
          <i class="fa-solid fa-xmark modal-icon"></i>
        </a>
      </div>
    </template>

    <template #content>
      <div class="content">
        <p>Ha seleccionado el {{ date }} a las {{ time }}.</p>
      </div>
    </template>

    <template #footer>
      <div class="footer">
        <CrushButton
          variant="secondary"
          @click="closeModal">
          Cancel
        </CrushButton>
        <CrushButton
          @click="confirmScheduleOrder">
          Guardar
        </CrushButton>
      </div>
    </template>
  </Modal>
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.content {
  margin: 12px 0;
}
.footer {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  :deep(.crush-secondary) {
    border: 1px solid $grey;
    color: $grey;
  }
}
</style>