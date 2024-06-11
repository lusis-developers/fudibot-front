<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import CrushTextField from '@nabux-crush/crush-text-field'

import useRestaurantStore from '@/store/restaurant';
import useClientStore from '@/store/client';
import { cellphoneRules, emailRules } from '@/utils/validations';

const emit = defineEmits(['next']);

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
    console.log('cellphone: ', form.value.cellphone)
    form.value.cellphone = event;
  }
}
function submitForm(): void {
  emit('next');
  restaurantStore.addContactInfo(form.value);
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
    <form 
      @submit.prevent="submitForm">
        <div class="form-group">
          <CrushTextField label="Tu número celular 📲" 
            :value="form.cellphone"
            :valid-rules="rules.cellphone" 
            @update:modelValue="handleInput($event, 'cellphone')"
            placeholder="Número de Celular" 
            class="form-group-text-field" />
        </div>
        <div class="form-actions">
          <button 
            :disabled="!isFormValid" 
            :style="{ cursor: isFormValid ? 'pointer' : 'not-allowed' }"
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
