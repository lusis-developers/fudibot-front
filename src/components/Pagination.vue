<script setup lang="ts">
const emit = defineEmits(['pageChange']);

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  hasNextPage: {
    type: Boolean,
    required: true
  },
  nextPage: {
    type: Number,
    required: true
  },
  hasPreviousPage: {
    type: Boolean,
    required: true
  },
  previousPage: {
    type: Number,
    required: true
  }
});


function changePage(page: number) {
  emit('pageChange', page);
}
</script>

<template>
  <div class="pagination">
    <button
      :disabled="!hasPreviousPage"
      @click="changePage(previousPage)">
      Previous
    </button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button
      :disabled="!hasNextPage"
      @click="changePage(nextPage)">
      Next
    </button>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  
  button {
    padding: 5px 10px;
  }
  
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

</style>