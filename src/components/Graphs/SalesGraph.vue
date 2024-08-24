<script setup lang="ts">
import { onMounted, PropType, ref, watch } from 'vue';
import Chart from 'chart.js/auto';

import { completeMonths } from '@/utils/timeData';
import Card from '@/components/Card.vue';

import type { SalesDataItem } from '@/interfaces/sales.interface';

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

  // Crear un mapa para facilitar el acceso a los datos proporcionados
  const dataMap = new Map<string, number>(
    props.salesData.map(item => [item.month, item.revenue])
  );

  // Preparar las etiquetas (labels) y los datos (data) completos
  const labels: string[] = [];
  const data: number[] = [];

  // Iterar sobre todos los meses completos
  completeMonths.forEach(month => {
    labels.push(`${month}`);  // Asumimos que el año es siempre 2024
    data.push(dataMap.has(month) ? dataMap.get(month)! : 0);
  });

  // Encontrar el índice del último mes con datos
  const lastMonthWithDataIndex = data.map((value, index) => value > 0 ? index : null).filter(i => i !== null).pop() || 0;

  // Si hay menos de 12 meses con datos, llenamos con ceros al principio
  if (lastMonthWithDataIndex >= 0 && lastMonthWithDataIndex < 11) {
    const offset = 11 - lastMonthWithDataIndex;
    labels.splice(0, offset); // Remover meses posteriores
    data.splice(0, offset);   // Remover datos de meses posteriores
  }

  // Si hay menos de 12 elementos, rellenamos los meses anteriores con ceros
  while (labels.length < 12) {
    labels.unshift(`${completeMonths[labels.length]}`);
    data.unshift(0);
  }

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
  height: 320px;
  width: 100%
}
</style>
