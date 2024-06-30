<script setup lang="ts">
import { defineProps } from 'vue';
import { formFields } from '@/utils/editInfoForm';

const props = defineProps({
  form: {
    type: Object,
    required: true
  },
  handleFileSelected: {
    type: Function,
    required: true
  }
})
</script>

<template>
  <form 
    id="editForm" 
    class="form">
      <div 
        v-for="field in formFields" 
        :key="field.label" 
        class="form-group">
          <label class="form-label">
            {{ field.label }}
          </label>
          <input 
            v-if="!field.CrushUpload" 
            v-model="props.form[field.model]" 
            class="form-control" 
            type="text" />
          <CrushUpload 
            v-else 
            @file-selected="handleFileSelected" />
      </div>
  </form>
</template>

<style lang="scss" scoped>
:deep(.container div label) {
  color: $black;
}
:deep(.container) {
  border: 1px solid $grey;
}
:deep(.container div i) {
  color: $black;
}
.form-label {
  font-weight: bold;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
}
.form-control {
  padding: 8px;
  border: 1px solid $grey;
  border-radius: 4px;
}
</style>