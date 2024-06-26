<script setup lang="ts">
import { onMounted } from 'vue';

import useOrderStore from '@/store/order';
import useAuthStore from '@/store/auth';
import useClientStore from '@/store/client';
import ProductTable from '@/components/TableItems/ProductTable.vue'; 

const authStore = useAuthStore();
const orderStore = useOrderStore();
const clientStore = useClientStore();

onMounted( async () => {
  const userAuth = await authStore.checkAuth();
  await clientStore.getClientByEmail(userAuth?.email!);

  orderStore.getOrders(clientStore.client?.restaurant?._id!);
});
</script>

<template>
  <div class="meals">
    <ProductTable
      v-if="orderStore.orders.length"
      :items="orderStore.orders" />
  </div>
</template>