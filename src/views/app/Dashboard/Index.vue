<script setup lang="ts">
import SalesGraph from '@/components/Graphs/SalesGraph.vue';

const salesData = [
  { year: "2024", month: "Julio", revenue: 1750.90 },
  { year: "2024", month: "Agosto", revenue: 1900.50 },
];
</script>

<template>
  <div>
    <SalesGraph :salesData="salesData" />
  </div>
</template>

<style lang="scss" scoped>
</style>