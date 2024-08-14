<script setup lang="ts">
import { computed, onMounted } from 'vue';

import useAuthStore from '@/store/auth';
import useOrderStore from '@/store/order';
import useClientStore from '@/store/client';

import Pagination from '@/components/Pagination.vue';
import GlobalLoading from '@/components/GlobalLoading.vue'
import OrderTable from '@/components/Tables/OrderTable.vue';

const authStore = useAuthStore();
const orderStore = useOrderStore();
const clientStore = useClientStore();

function changePage(page: number) {
  if (clientStore.client?.restaurant) {
    orderStore.getOrders(clientStore.client?.restaurant?._id!, page, clientStore.client?.restaurant?.scheduledDelivery);
  }
}

const nextPage = computed(() => orderStore.nextPage !== null ? orderStore.nextPage : 0)
const previousPage = computed(() => orderStore.previousPage !== null ? orderStore.previousPage : 0)

onMounted( async () => {
  const userAuth = await authStore.checkAuth();
  await clientStore.getClientByEmail(userAuth?.email!);

  if (clientStore.client?.restaurant) {
    await orderStore.getOrders(clientStore.client?.restaurant?._id, 1,clientStore.client?.restaurant?.scheduledDelivery);
  }
});
</script>

<template>
  <GlobalLoading v-if="orderStore.isLoading"/>
  <div 
    v-else
    class="orders">
    <OrderTable
      v-if="orderStore.orders.length"
      :orders="orderStore.orders" />
    <div class="orders-pagination">
      <Pagination
        :totalPages="orderStore.totalPages"
        :currentPage="orderStore.currentPage"
        :hasNextPage="orderStore.hasPreviousPage"
        :hasPreviousPage="orderStore.hasPreviousPage"
        :nextPage="nextPage"
        :previousPage="previousPage"
        @pageChange="changePage" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.meals {
  &-pagination {
    margin-top: 12px;
  }
}
</style>