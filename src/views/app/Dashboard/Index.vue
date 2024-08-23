<script setup lang="ts">
import { watch } from 'vue';

import useSalesStore from '@/store/sales';
import useRestaurantStore from '@/store/restaurant';
import SalesGraph from '@/components/Graphs/SalesGraph.vue';
import GlobalLoading from '@/components/GlobalLoading.vue';

const salesStore = useSalesStore()
const restaurantStore = useRestaurantStore();

async function getSalesPerMonth(restaurantId: string): Promise<void> {
  if (!salesStore.salesPerMonth) {
    await salesStore.getSalesPerMonth(restaurantId);
  }
}

watch(
  () => restaurantStore.restaurant?._id,
  async () => {
    if (restaurantStore.restaurant) {
      await getSalesPerMonth(restaurantStore.restaurant?._id);
    }
  }
)
</script>

<template>
  <div>
    <GlobalLoading v-if="!salesStore.salesPerMonth" />
    <SalesGraph
      v-else
      :salesData="salesStore.salesPerMonth" />
  </div>
</template>

<style lang="scss" scoped>
</style>