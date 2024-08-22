<script setup lang="ts">
import { onMounted, PropType, ref, watch } from 'vue';
import Chart from 'chart.js/auto';

import Card from '@/components/Card.vue';

interface SalesDataItem {
  year: string;
  month: string;
  revenue: number;
}

const props = defineProps({
  salesData: {
    type: Array as PropType<SalesDataItem[]>,
    required: true,
  }
});

const salesChart = ref<Chart<'line', number[], string> | null>(null);

function initializeChart(): void {
  const ctx = document.getElementById('salesChart') as HTMLCanvasElement;
  if (!ctx) return;

  const labels = props.salesData.map(item => `${item.month} ${item.year}`);
  const data = props.salesData.map(item => item.revenue);

  salesChart.value = new Chart<'line', number[], string>(ctx.getContext('2d')!, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Ventas mensuales',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          fill: true,
          tension: 0.5 // Suaviza las líneas
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

watch(
  () => props.salesData,
  () => {
    if (salesChart.value) {
      salesChart.value.destroy();
    }
    initializeChart();
  }
)
onMounted(() => {
  initializeChart();
})
</script>

<template>
  <Card>
    <template #title>
      <h3>
        Historial de ventas
      </h3>
    </template>
    <template #content>
      <div>
        <canvas
          id="salesChart"
          class="chart" />
      </div>
    </template>
  </Card>
</template>

<style lang="scss" scoped>
#salesChart {
  height: 400px;
}
</style>
