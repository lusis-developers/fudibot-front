<script setup lang="ts">
import { computed, watch } from 'vue';

import useSalesStore from '@/store/sales';
import useRestaurantStore from '@/store/restaurant';
import GlobalLoading from '@/components/GlobalLoading.vue';
import SalesGraph from '@/components/Graphs/SalesGraph.vue';
import DetailCard from '@/views/app/Dashboard/components/DetailCard.vue';
import { formatPriceToDisplay } from '@/utils/inputFormats';

const salesStore = useSalesStore()
const restaurantStore = useRestaurantStore();

const hasDetailData = computed(() => salesStore.currentMonthRevenue && salesStore.ordersOpen && salesStore.salesMonthClosed)
const currentRevenue = computed(() => formatPriceToDisplay(String(salesStore.currentMonthRevenue)));

async function getDashboardData(restaurantId: string): Promise<void> {
  if (!salesStore.salesPerMonth) {
    await salesStore.getSalesPerMonth(restaurantId);
  }
  if (!hasDetailData.value) {
    await salesStore.getSalesCurrentMonth(restaurantId);
  }
}

watch(
  () => restaurantStore.restaurant?._id,
  async () => {
    if (restaurantStore.restaurant) {
      await getDashboardData(restaurantStore.restaurant?._id);
    }
  }
)
</script>

<template>
  <div class="dashboard">
    <GlobalLoading v-if="!salesStore.salesPerMonth" />
    <template v-else>
      <div>
        <div class="details">
          <DetailCard
            v-if="currentRevenue"
            :title="'Ventas del mes'"
            :data="currentRevenue" />
          <DetailCard
            v-if="salesStore.salesMonthClosed"
            :title="'Entregados'"
            :data="salesStore.salesMonthClosed" />
          <DetailCard
            v-if="salesStore.ordersOpen"
            :title="'Abiertos'"
            :data="salesStore.ordersOpen" />
        </div>
        <SalesGraph
          :salesData="salesStore.salesPerMonth" />
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.dashboard {
  .details {
    margin: 24px 0;
    width: 100%;
    display: grid;
    gap: 16px;
    justify-content: stretch;
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  }
}
</style>