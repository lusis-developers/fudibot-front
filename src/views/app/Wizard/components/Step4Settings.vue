<script setup lang="ts">
import { computed, ref } from 'vue';
import CrushTextField from '@nabux-crush/crush-text-field';
import CrushUpload from '@nabux-crush/crush-upload'
import { managerNameRules, websiteOrInstagramRules } from '@/utils/validations';

const emit = defineEmits(['next']);

const form = ref({
  managerName: '',
  websiteOrInstagram: '',
  logo: null as File | null,
});


const rules = {
  managerName: managerNameRules,
  websiteOrInstagram: websiteOrInstagramRules
};
const isFormValid = computed(() => {
  const isManagerNameValid = managerNameRules.every(rule => rule.validate(form.value.managerName));
  const isWebsiteOrInstagramValid = websiteOrInstagramRules.every(rule => rule.validate(form.value.websiteOrInstagram));
  return isManagerNameValid && isWebsiteOrInstagramValid && form.value.logo !== null;
});

// function handleFileUpload(event: Event) {
//   const target = event.target as HTMLInputElement;
//   if (target.files && target.files.length > 0) {
//     form.value.logo = target.files[0];
//   }
// }

function handleInput(event: string, type: string): void {
  if (type === 'managerName') {
    form.value.managerName = event;
  }
  if (type === 'websiteOrInstagram') {
    form.value.websiteOrInstagram = event;
  }
}
function handleFileSelected(file: File): void {
  form.value.logo = file;
  console.log('file: ', file)
}

function submitForm(): void {
  emit('next', form.value);
}
</script>

<template>
  <div class="step-content">
    <h2>Configuración del Restaurante</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <CrushTextField
          label="Nombre del Manager del Restaurante:"
          placeholder="Nombre del Manager"
          :value="form.managerName"
          :valid-rules="rules.managerName"
          @update:modelValue="handleInput($event, 'managerName')"
          class="form-group-text-field"
        />
      </div>
      <div class="form-group">
        <CrushTextField
          label="Sitio Web o link de el Instagram del Restaurante:"
          placeholder="Sitio Web o Instagram"
          :value="form.websiteOrInstagram"
          :valid-rules="rules.websiteOrInstagram"
          @update:modelValue="handleInput($event, 'websiteOrInstagram')"
          class="form-group-text-field"
        />
      </div>
      <div class="form-group">
        <label for="logo">Subir Logo:</label>
        <CrushUpload @file-selected="handleFileSelected"/>
      </div>
      <div class="form-actions">
        <button 
          type="submit"
          :disabled="!isFormValid"
          :style="{ cursor: isFormValid ? 'pointer' : 'not-allowed' }">
          Siguiente
        </button>
      </div>
    </form>
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
  justify-content: flex-end;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: $green;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: $light-green;
}
</style>