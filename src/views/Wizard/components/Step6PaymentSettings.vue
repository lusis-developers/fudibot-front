<script setup lang="ts">
import { reactive, computed } from 'vue';

import useBankStore from '@/store/bank';
import useRestaurantStore from '@/store/restaurant';
import { emailRules, phoneRules } from '@/utils/validations';
import { AccountType } from '@/enum/bank.enum';

const emit = defineEmits(['next', 'complete']);

const restaurantStore = useRestaurantStore();
const bankStore = useBankStore();

const form = reactive({
  bankName: '',
  accountType: '',
  accountNumber: '',
  accountHolderName: '',
  identification: '',
  email: '',
  phone: ''
});
const accountTypeOptions = ['Ahorros', 'Corriente'];
const rules = {
  email: emailRules,
  phone: phoneRules
};
const isFormValid = computed(() => {
  return form.bankName !== '' &&
         form.accountType !== '' &&
         form.accountNumber !== '' &&
         form.accountHolderName !== '' &&
         form.identification !== '' &&
         emailRules.every(rule => rule.validate(form.email)) &&
         phoneRules.every(rule => rule.validate(form.phone));
});

function handleInput(event: string, type: string): void {
  (form as any)[type] = event;
}
function submitForm(): void {
  if (isFormValid.value) {
    const paymentSettings = {
      bankName: form.bankName,
      accountType: form.accountType as AccountType,
      accountNumber: form.accountNumber,
      accountHolderName: form.accountHolderName,
      identification: form.identification,
      email: form.email,
      phone: form.phone
    };
    const uuid = restaurantStore.restaurant?.uuid!;
    bankStore.postBank(paymentSettings, uuid);
  }
  emit('next');
  emit('complete');
}
</script>

<template>
  <div class="step-content">
    <h2>
      Configuración de Pago
    </h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <CrushTextField
          label="Nombre del Banco:"
          placeholder="Banco"
          :value="form.bankName"
          @update:modelValue="handleInput($event, 'bankName')"
          class="form-group-text-field"
        />
      </div>

      <div class="form-group">
        <CrushSelect
          label="Tipo de Cuenta:"
          :options="accountTypeOptions"
          :value="form.accountType"
          @update:value="handleInput($event, 'accountType')"
          class="form-group-select"
        />
      </div>

      <div class="form-group">
        <CrushTextField
          label="Número de Cuenta:"
          placeholder="Número de Cuenta"
          :value="form.accountNumber"
          @update:modelValue="handleInput($event, 'accountNumber')"
          class="form-group-text-field"
        />
      </div>

      <div class="form-group">
        <CrushTextField
          label="Nombre del Titular:"
          placeholder="Nombre del Titular"
          :value="form.accountHolderName"
          @update:modelValue="handleInput($event, 'accountHolderName')"
          class="form-group-text-field"
        />
      </div>

      <div class="form-group">
        <CrushTextField
          label="Identificación o RUC:"
          placeholder="Identificación o RUC"
          :value="form.identification"
          @update:modelValue="handleInput($event, 'identification')"
          class="form-group-text-field"
        />
      </div>

      <div class="form-group">
        <CrushTextField
          label="Correo Electrónico:"
          placeholder="Correo Electrónico"
          :value="form.email"
          :valid-rules="rules.email"
          @update:modelValue="handleInput($event, 'email')"
          class="form-group-text-field"
        />
      </div>

      <div class="form-group">
        <CrushTextField
          label="Teléfono:"
          placeholder="Teléfono"
          :value="form.phone"
          :valid-rules="rules.phone"
          @update:modelValue="handleInput($event, 'phone')"
          class="form-group-text-field"
        />
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
  margin-bottom: 20px;
  :deep(.crush-text-field-label-text){
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
  :deep(.form-container-label-select){
    color: $black;
    border-color: $green;
  }
  :deep(.form-container-label-select){
    color: $black;
    border-color: $green;
  }
  :deep(.form-container-label) {
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