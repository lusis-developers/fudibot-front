<script setup lang="ts">
import { computed, reactive } from 'vue';

import useRestaurantStore from '@/store/restaurant';
import { managerNameRules, websiteOrInstagramRules } from '@/utils/validations';


const emit = defineEmits(['next', 'prev']);

const restaurantStore = useRestaurantStore();

const form = reactive({
  manager: '',
  website: '',
  logo: ''
});
const rules = {
  manager: managerNameRules,
  website: websiteOrInstagramRules
};
const isFormValid = computed(() => {
  const isManagerNameValid = managerNameRules.every(rule => rule.validate(form.manager));
  const isWebsiteOrInstagramValid = websiteOrInstagramRules.every(rule => rule.validate(form.website));
  return isManagerNameValid && isWebsiteOrInstagramValid;
});

function handleInput(event: string, type: string): void {
  if (type === 'managerName') {
    form.manager = event;
  }
  if (type === 'websiteOrInstagram') {
    form.website = event;
  }
}
async function handleFileSelected(target: File) {
  restaurantStore.postRestaurantLogo(target);
  if (restaurantStore.restaurant?.logo.length) {
    form.logo = restaurantStore.restaurant?.logo;
  }
}
async function submitForm() {
  restaurantStore.addWebAndManager(form.website, form.manager);
  emit('next');
}
function goBack(): void {
  emit('prev')
}
</script>

<template>
  <div class="step-content">
    <h2>
      Configuración del Restaurante
    </h2>
    <div class="form">
      <div class="form-group">
        <CrushTextField
          :value="form.manager"
          :valid-rules="rules.manager"
          placeholder="Nombre del Manager"
          label="Nombre del Manager del Restaurante:"
          class="form-group-text-field"
          @update:modelValue="handleInput($event, 'managerName')" />
      </div>
      
      <div class="form-group">
        <CrushTextField
          :value="form.website"
          :valid-rules="rules.website"
          placeholder="Sitio Web o Instagram"
          label="Sitio Web o link de el Instagram del Restaurante:"
          class="form-group-text-field"
          @update:modelValue="handleInput($event, 'websiteOrInstagram')" />
      </div>

      <div class="form-group">
        <label for="logo">
          Subir Logo:
        </label>
        <CrushUpload @file-selected="handleFileSelected"/>
      </div>
      <div class="form-actions">
        <button
          type="button"
          @click="goBack">
            Retroceder
        </button>
        <button 
          :disabled="!isFormValid"
          @click="submitForm">
            Siguiente
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.step-content {
  width: 100%;
}
.form-group {
  padding: 16px 0;
  :deep(.crush-text-field-label-text){
    color: $black;
    font-family: $font;
  };
  :deep(.form-group-text-field .crush-text-field-input) {
    color: $black;
    font-family: $font;
  }
  :deep(.container div label) {
    color: $black;
  }
  :deep(.input-name ul) {
    color: $black;
  }
  :deep(.crush-text-field .input-container.active) {
    border-color: $green;
  }
  :deep(.input-name ul::before) {
    color: $green;
  }
  :deep(.container) {
    border-color: $green;
    color: $black;
  }
  :deep(input) {
    color: $black;
  }
}
label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}
input {
  width: 100%;
  padding: 10px;
  border: 1px solid $white;
  border-radius: 5px;
  box-sizing: border-box;
}
.form-actions {
  display: flex;
  justify-content: space-between;
}
button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: $green;
  color: white;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  &:not(:disabled):hover {
    background-color: $light-green;
  }
}
</style>