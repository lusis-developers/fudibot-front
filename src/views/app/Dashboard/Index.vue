<script setup lang="ts">
import SalesGraph from '@/components/Graphs/SalesGraph.vue';

const salesData = [
  { year: "2024", month: "Enero", revenue: 1200.50 },
  { year: "2024", month: "Febrero", revenue: 1500.00 },
  { year: "2024", month: "Marzo", revenue: 1700.75 },
  { year: "2024", month: "Abril", revenue: 1600.30 },
  { year: "2024", month: "Mayo", revenue: 1800.00 },
  { year: "2024", month: "Junio", revenue: 1300.25 },
  { year: "2024", month: "Julio", revenue: 1750.90 },
  { year: "2024", month: "Agosto", revenue: 1900.50 },
  { year: "2024", month: "Septiembre", revenue: 1400.00 },
  { year: "2024", month: "Octubre", revenue: 1550.75 },
  { year: "2024", month: "Noviembre", revenue: 2000.00 },
  { year: "2024", month: "Diciembre", revenue: 2100.00 },
];
</script>

<template>
  <div>
    <SalesGraph
      :salesData="salesData" />
  </div>
</template>

<style lang="scss" scoped>
</style>