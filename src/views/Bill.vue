<script setup lang="ts">
import { onMounted, reactive, ref, computed } from 'vue';
import { useRoute } from 'vue-router';

import useBillStore from '@/store/bill';
import { ciRules, emailRules, rucRules } from '@/utils/validations';
import { BillIdType } from '@/enum/bill.enum';
import Card from '@/components/Card.vue';
import fudibot from '@/assets/fudi-isologo-color.png';

const route = useRoute();

const billStore = useBillStore()

const rules = {
  ruc: rucRules,
  email: emailRules,
  ci: ciRules,
};
const options = [BillIdType.CI, BillIdType.RUC]
const billId = ref('');
const form = reactive({
  name: '',
  email: '',
  documentType: '' as BillIdType,
  documentNumber: ''
});
const documentValidation = computed(() => form.documentType === BillIdType.CI ? rules.ci : rules.ruc);
const isFormValid = computed(() => {
  const documentNumber = documentValidation.value.every(rule => rule.validate(form.documentNumber));
  const documentType = form.documentType === BillIdType.CI || form.documentType === BillIdType.RUC;
  const email = emailRules.every(rule => rule.validate(form.email));
  return documentNumber && documentType && email;
});
const isBillSent = computed(() => billStore.bill?.isSent);
const billCardTitle = computed(() => isBillSent.value ? 'Tus datos han sido enviados' : 'Llena tu Factura');

function handleInput(event: string, textFieldName: string): void {
  if (textFieldName === 'name') {
    form.name = event;
  }
  if (textFieldName === 'email') {
    form.email = event;
  }
  if (textFieldName === 'documentType') {
    form.documentType = event as BillIdType;
  }
  if (textFieldName === 'documentNumber') {
    form.documentNumber = event;
  }
}

async function submitForm(): Promise<void> {
  await billStore.updateBill(billId.value, form);
}

onMounted(async () => {
  const { id } = route.params;

  if (typeof id === 'string') {
    billId.value = id;
    await billStore.getBillById(id);
  }
});
</script>

<template>
  <div class="bill">
    <Card>
      <template #title>
        <div class="header">
          <img
            :src="fudibot"
            alt="fuditbot logo">
          <h3>
            {{ billCardTitle }}
          </h3>
        </div>
      </template>
      <template
        #content
        v-if="!isBillSent">
        <div class="form">
          <div class="form-group">
            <CrushTextField
              :value="form.name"
              placeholder="Luis Reyes"
              label="Nombre"
              class="form-group-text-field"
              @update:modelValue="handleInput($event, 'name')" />  
          </div>  
          <div class="form-group">
            <CrushTextField
              :value="form.email"
              :valid-rules="rules.email"
              placeholder="luisreyes@correo.com"
              label="Email"
              class="form-group-text-field"
              @update:modelValue="handleInput($event, 'email')" />  
          </div>  
          <div class="form-group">
            <CrushSelect
              :options="options"
              :value="form.documentType"
              label="Tipo de documento"
              class="form-group-text-field"
              @update:value="handleInput($event, 'documentType')" />
          </div>  
          <div class="form-group">
            <CrushTextField
              :value="form.documentNumber"
              :valid-rules="documentValidation"
              placeholder="0999999999"
              label="Número de documento"
              class="form-group-text-field"
              @update:modelValue="handleInput($event, 'documentNumber')" />  
          </div>
          <div class="form-action">
            <CrushButton
              :disabled="!isFormValid"
              @click="submitForm">
                Siguiente
            </CrushButton>
          </div>  
        </div>
      </template>
      <template
        #content
        v-else>
        <p>Tus datos ya han sido enviados</p>
      </template>
    </Card>
  </div>
</template>

<style lang="scss" scoped>
.bill {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;

    img {
      width: 64px;
      height: 64px;
      margin: auto;
    }
  }

  .form {
    
    &-group {
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
      :deep(.form-container-label-select){
        color: $black;
      }
      :deep(.form-container-label-select){
        color: $black;
        border-color: $grey;
      }
      :deep(.form-container-label) {
        color: $black;
      }
    } 

    &-action {
      display: flex;
      justify-content: flex-end;
      max-width: 420px;
      min-width: 300px;
    }
  }
}
</style>