<script setup lang="ts">
import { watch } from 'vue';

import useSalesStore from '@/store/sales';
import useRestaurantStore from '@/store/restaurant';
import GlobalLoading from '@/components/GlobalLoading.vue';
import SalesGraph from '@/components/Graphs/SalesGraph.vue';
import DetailsCard from '@/views/app/Dashboard/components/DetailsCard.vue';

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
    <template v-else>
      <div>
        <DetailsCard
          :title="'superCard'"
          :data="100" />
        <SalesGraph
          :salesData="salesStore.salesPerMonth" />
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
</style>