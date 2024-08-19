<script setup lang="ts">
import { PropType, computed, onMounted, ref } from 'vue';

import useUserStore from '@/store/user';
import useAuthStore from '@/store/auth';
import useBillStore from '@/store/bill';
import useOrderStore from '@/store/order';
import useDeliveryStore from '@/store/delivery';
import useClientStore from '@/store/client';
import { OrderStatus } from '@/enum/order.enum';
import { statusAvailable } from '@/utils/order';
import useRestaurantStore from '@/store/restaurant';
import { formatToCurrency } from '@/utils/inputFormats';
import Modal from '@/components/Modal.vue';

import type { OrderItem, OrderSchedule } from '@/interfaces/order.interface';
import { PaymentTypeSpanishTranslate } from '@/enum/PaymentType.enum';
import axios from 'axios';

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
  userId: {
    type: String,
    required: true
  },
  paymentType: {
    type: String,
    required: true
  },
  wireTransferImage: {
    type: String,
    required: false,
  },
  schedule: {
    type: Object as PropType<OrderSchedule>,
    required: false,
    default: null
  }
});

const orderStore = useOrderStore();
const restaurantStore = useRestaurantStore();
const authStore = useAuthStore();
const clientStore = useClientStore();
const userStore = useUserStore();
const deliveryStore = useDeliveryStore();
const billStore = useBillStore();

const validTransitions: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.OPEN]: [OrderStatus.PREPARING, OrderStatus.CANCELLED_BY_RESTAURANT],
  [OrderStatus.PREPARING]: [OrderStatus.ON_THE_WAY],
  [OrderStatus.ON_THE_WAY]: [OrderStatus.DELIVERED],
  [OrderStatus.DELIVERED]: [],
  [OrderStatus.CANCELLED_BY_RESTAURANT]: [],
  [OrderStatus.FAILED_DELIVERY]: []
};
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
const showTransfer = computed(() => props.paymentType === PaymentTypeSpanishTranslate.WIRE_TRANSFER);

const isWithinHalfHour = computed(() => {
  if (!props.schedule.date.length || !props.schedule.time.length) {
    return true;
  }

  // Extraer los componentes de la fecha
  const dateParts = props.schedule.date.split(', ')[1].split(' ');
  const day = parseInt(dateParts[0]);
  const month = getMonthFromName(dateParts[2]);
  const year = parseInt(dateParts[4]);

  // Extraer los componentes de la hora
  const timeParts = props.schedule.time.split(':');
  const hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1]);

  // Crear el objeto Date para la fecha del evento
  const eventDate = new Date(year, month, day, hours, minutes);

  // Verifica que eventDate es un objeto Date válido
  if (isNaN(eventDate.getTime())) {
    return false;
  }

  // Obtener la fecha y hora actual
  const now = new Date();

  // Calcular la diferencia en minutos
  const diffInMinutes = (eventDate.getTime() - now.getTime()) / (1000 * 60);

  return diffInMinutes >= 0 && diffInMinutes <= 30;
});

function updateStatus(status: OrderStatus): void {
  if (validTransitions[statusSelected.value as OrderStatus].includes(status)) {
    statusSelected.value = status;
  }
}

function closeModal(): void {
  emit('closeModal');
  statusSelected.value = props.status;
}

async function downloadTransfer() {
  const transferImage = props.wireTransferImage;
  if (transferImage) {
    try {
      const response = await axios.get(transferImage, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: response.data.type });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'transferencia.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
      window.open(transferImage, '_blank');
    }
  } else {
    console.error('Is not possible to download wire transfer');
  };
};

async function submitStatus(): Promise<void> {
  if (restaurantStore.restaurant) {
    await orderStore.updateOrderStatus(
      props._id, statusSelected.value,
      restaurantStore.restaurant?._id,
      restaurantStore.restaurant?.scheduledDelivery
    );
  }


  if (statusSelected.value === OrderStatus.PREPARING) {
    await userStore.getUser(props.userId);

    if (userStore.user) {

      const data = {
        from: userStore.user.number,
        name: userStore.user.name
      }
      // TODO: dispatch picker if not own fleet
      if (!deliveryStore.delivery?.hasOwnFleet) {
        await deliveryStore.createBooking(
          restaurantStore.restaurant?.uuid!,
          data
        );
      }
      // TODO: dispatch bill link if not sheduledDelivery setup
      if (restaurantStore.restaurant && !restaurantStore.restaurant?.scheduledDelivery) {
        await billStore.sendCreateBill(
          restaurantStore.restaurant?.uuid,
          userStore.user.number
        );
      }
    }
  }
  closeModal();
}

function getMonthFromName(monthName: string) {
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  return months.indexOf(monthName.toLowerCase());
}

onMounted( async () => {
  const userAuth = await authStore.checkAuth();
  await clientStore.getClientByEmail(userAuth?.email!);

  if (clientStore.client?.restaurant) {
    await restaurantStore.getRestaurantById(clientStore.client?.restaurant?._id);
    await deliveryStore.getDeliveryData(clientStore.client.restaurant.delivery);
  }
});

// Function to check if a status button should be enabled
function isStatusButtonEnabled(status: OrderStatus): boolean {
  if (status === OrderStatus.CANCELLED_BY_RESTAURANT) {
    return statusSelected.value === OrderStatus.OPEN;
  }
  // Check if the transition is valid
  return validTransitions[statusSelected.value as OrderStatus].includes(status);
}
</script>

<template>
  <Modal :modalValue="modalValue">
    <template #header>
      <div class="modal-header">
        <h4>Detalle de orden</h4>
        <CrushButton variant="secondary" @click="closeModal">
          <i class="fa-solid fa-x"></i>
        </CrushButton>
      </div>
    </template>
    <template #content>
      <div class="content">
        <div class="item-order">
          <span>Pedido</span>
          <span v-for="(item, index) in items" :key="index">
            {{ item.quantity }} X {{ item.item }} - {{ item.price }}
          </span>
        </div>
        <div class="item-total">
          <span>Total</span>
          <span>{{ formattedTotal }}</span>
        </div>
        <div class="item-delivery">
          <span>Flete</span>
          <span>${{ deliveryCost }}</span>
        </div>
        <div class="item-status">
          <span>Estado</span>
          <span :class="[statusClass]">{{ status }}</span>
        </div>
        <div class="status-actions">
          <span 
            class="payment-type">
            Tipo de pago:
            <span class="payment-detail">
              {{ props.paymentType }}
            </span>
            <CrushButton 
              v-if="showTransfer"
              @click="downloadTransfer"
              class="show-transfer-button">
              Descargar transferencia
              <i class="fa-solid fa-download"></i>
            </CrushButton>
          </span>          
          <template v-if="isWithinHalfHour">
            <span>Cambiar estado</span>
            <button
              v-for="(status, index) in statusAvailable"
              :key="index"
              :class="{
                active: statusSelected === status.status,
                [statusClass]: statusSelected === status.status,
                disabled: !isStatusButtonEnabled(status.status) && statusSelected !== status.status
              }"
              :disabled="!isStatusButtonEnabled(status.status)"
              @click="isStatusButtonEnabled(status.status) ? updateStatus(status.status) : null">
              {{ status.nameDisplayed }}
            </button>
          </template>
          <template v-else>
            <h3>
              Este pedido está programado para el día
              {{ schedule.date }}
              a las {{ schedule.time }} horas.
            </h3>
            <CrushButton
              variant="secondary"
              @click="updateStatus(statusAvailable[statusAvailable.length - 1].status)">
              {{ statusAvailable[statusAvailable.length - 1].nameDisplayed }}
            </CrushButton>
          </template>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="modal-footer">
        <CrushButton variant="secondary" @click="closeModal">
          Cancel
        </CrushButton>
        <CrushButton @click="submitStatus">
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
        
        @media (min-width: $tablet-upper-breakpoint) {
          display: none;
        }
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
      align-items: flex-start;
      margin-bottom: 20px;
      gap: 16px;

      .payment-type {
        width: 100%;
        padding: 16px 0;
        font-weight: bold;  
        color: $black;  
        border-top: 1px solid $light-grey;
        border-bottom: 1px solid $light-grey;

        .show-transfer-button {
          width: 50%;
          display: inline-block;
          margin: 16px 0 0 0;
          font-size: 16px; 
          color: $black;
          font-weight: normal;
        }

        .payment-detail {
          color: $green;
          font-weight: normal;
        }
      }

      button {
        width: 100%;
        max-width: 256px;
        background-color: white;
        border-radius: 8px;
        padding: 8px 4px;
        margin: 4px auto;
        cursor: pointer;

        &.active {
          background-color: $green;
          color: $white;
        }

        &.disabled {
          background-color: $grey;
          color: $dark-grey;
          cursor: not-allowed;
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
