<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import CrushTextField from '@nabux-crush/crush-text-field'

import useClientStore from '@/store/client';
import useRestaurantStore from '@/store/restaurant';
import { cellphoneRules, emailRules } from '@/utils/validations';


const emit = defineEmits(['next', 'prev']);

const restaurantStore = useRestaurantStore();
const clientStore = useClientStore();

const form = ref({
  email: '',
  cellphone: '',
});
const rules = {
  cellphone: cellphoneRules,
  email: emailRules
};
const isFormValid = computed(() => {
  const isCellphoneValid = cellphoneRules.every(rule => rule.validate(form.value.cellphone));
  return isCellphoneValid;
});

function handleInput(event: string, type: string): void {
  if (type === 'cellphone') {
    form.value.cellphone = event;
  }
}
function submitForm(): void {
  emit('next');
  restaurantStore.addContactInfo(form.value);
}
function goBack(): void {
  emit('prev')
}
function getEmail() {
  const user = clientStore.getUser();
  if(!user?.email) return;
  form.value.email = user.email;
}

onMounted(getEmail)
</script>

<template>
  <div class="step-content">
    <h2>
      Información de Contacto
    </h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <CrushTextField 
          :value="form.cellphone"
          :valid-rules="rules.cellphone" 
          placeholder="Número de Celular" 
          label="Tu número celular 📲" 
          class="form-group-text-field" 
          @update:modelValue="handleInput($event, 'cellphone')" />
      </div>
      <div class="form-actions">
        <button
          class="action-button prev-button"
          type="button"
          @click="goBack">
            Retroceder
        </button>
        <button 
          :disabled="!isFormValid" 
          :style="{ cursor: isFormValid ? 'pointer' : 'not-allowed' }"
          class="action-button next-button"
          type="submit">
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
  margin-bottom: 20px;
  padding: 20px 0;
  :deep(.crush-text-field-label-text) {
    color: $black;
    font-family: $font;
  }
  :deep(.form-group-text-field .crush-text-field-input) {
    color: $black;
    font-family: $font;
  }
  :deep(.crush-text-field .input-container.active) {
    border-color: $green;
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
#map {
  height: 300px;
  width: 100%;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.form-actions {
  display: flex;
  justify-content: space-between;
}
.action-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #28a745; 
  color: white;
  cursor: pointer;
  transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;
}
.action-button:hover {
  background-color: #81c784; 
}
.action-button.prev-button:active {
  transform: translateX(-10px);
}
.action-button.next-button:active {
  transform: translateX(10px);
}
.action-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: $green;
  color: white;
  cursor: pointer;
  &:hover {
  background-color: $light-green;
  }
}
</style>
