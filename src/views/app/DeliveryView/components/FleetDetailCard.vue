<script setup lang="ts">
import { onMounted } from 'vue';

import useAuthStore from '@/store/auth';
import useClientStore from '@/store/client';
import useDeliveryStore from '@/store/delivery';

const deliveryStore = useDeliveryStore();
const clientStore = useClientStore();
const authStore = useAuthStore();

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

// function deleteFleetDetail (): void {
//   const data = {
//     deliveryId = deliveryStore.delivery?._id
//   }
//   deliveryStore.deleteFleetDetail(deliveryId, fleetId);
// };

onMounted(async () => {
  const userAuth = await authStore.checkAuth();
  await clientStore.getClientByEmail(userAuth?.email!);
  const deliveryId = clientStore.client?.restaurant?.delivery!;
  await deliveryStore.getDeliveryData(deliveryId);
})
</script>

<template>
  <div class="principal">
    <h3 class="principal-title">
      Detalles:
    </h3>
    <div class="card">
      <p class="principal-indicator_distance">
        Kilometros a la redonda: {{ props.km }}
      </p>
      <p class="principal-indicator_price">
        Costo de viaje: {{ props.price }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.principal {
  .card {
    padding: 24px;
  }
  &-title {
    font-size: $h2-font-size;
  }
  &-indicator_distance {
    font-size: $h3-font-size
  }
  &-indicator_price {
    font-size: $h3-font-size;
  }

}
</style>