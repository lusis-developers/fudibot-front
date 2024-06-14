<script setup lang="ts">
import {computed} from 'vue'

const props = defineProps({
  currentSectionIndex: {
    type: Number,
    required: true
  },
  totalSections: {
    type: Number,
    required: true,
  }
})

const progressPercentage = computed(() => {
  return (props.currentSectionIndex/props.totalSections) * 100
})
</script>

<template>
  <div class="container-progress-bard">
    <div class="container-progress-bard-progress-bar" :style="{width: progressPercentage + '%'}"/>
    <div class="container-progress-bard-progress-percentage">{{ progressPercentage.toFixed(0) }}</div>
  </div>
</template>

<style scoped lang="scss">
.container-progress-bard {
  width: 100%;
  background-color: transparent;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  gap: 16px;
  &-progress-bar {
    border-radius: 8px;
    height: 20px;
    background-color: $light-green;
    width: 0; 
    transition: width 0.3s ease;
  }
  &-progress-percentage {
    width: 8%;
    color: $light-green;
    font-weight: bold;
  }
}
</style>