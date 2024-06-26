<script setup lang="ts">
import { reactive, computed, onMounted } from "vue";

import {
  pagopluxClientIdRules,
  pagopluxSecretKeyRules,
  rucRules
} from '@/utils/validations'

import pagopluxImage from '@/assets/integrations/pagoplux.png';
import usePaymentMethodsStore from '@/store/paymentMethods';
import ToggleInput from '@/components/ToggleInput.vue';
import useClientStore from '@/store/client'
import Card from '@/components/Card.vue';
import useAuthStore from '@/store/auth';

const authStore = useAuthStore();
const clientStore = useClientStore();
const paymentMethodsStore = usePaymentMethodsStore();

const pagopluxForm = reactive({
  ruc: "",
  clientId: "",
  secretKey: "",
  active: false,
  formVisible: false,
});

const toggleText = computed(() => {
  return pagopluxForm.active ? "Desactivar" : "Activar";
});
const isFormVisibled = computed(() => 
  pagopluxForm.active && pagopluxForm.formVisible
)

const rules = {
  ruc: rucRules,
  clientId: pagopluxClientIdRules,
  secretKey: pagopluxSecretKeyRules
};

const isFormValid = computed(() => {
  const isRucValid = rucRules.every(rule => rule.validate(pagopluxForm.ruc));
  const isClientIdValid = pagopluxClientIdRules.every(rule => rule.validate(pagopluxForm.clientId));
  const isSecretKeyValid = pagopluxSecretKeyRules.every(rule => rule.validate(pagopluxForm.secretKey));
  return isRucValid && isClientIdValid && isSecretKeyValid;
});

function isActive(event: boolean): void {
  pagopluxForm.active = event;
  if(!event) {
    pagopluxForm.ruc = '';
    pagopluxForm.clientId = '',
    pagopluxForm.secretKey = ''
  };
  pagopluxForm.formVisible = event;
};

async function sendPagoPluxData () {
  try {
    const data = {
      restaurantRUC: pagopluxForm.ruc,
      clientToken: `${pagopluxForm.clientId}:${pagopluxForm.secretKey}`
    };
    const restaurantUuid = clientStore.client?.restaurant?.uuid;
    const response = await paymentMethodsStore.putPagopluxData(data, restaurantUuid!);
    console.log('response: ', response)
    pagopluxForm.formVisible = false;
    paymentMethodsStore.paymentMethods?.pagoplux
  } catch(e) {
    console.error('error: ', e)
  }
}

onMounted( async () => {
  const userAuth = await authStore.checkAuth();

  await clientStore.getClientByEmail(userAuth?.email!);

  await paymentMethodsStore.getPaymentMethods(clientStore.client?.restaurant?.uuid!)
})
</script>

<template>
  <p class="title">
    <li>
      Configura tu cuenta de pagoplux 😊
    </li>
  </p>
  <Card :class="{ expanded: pagopluxForm.active }">
    <template #title>
      <div class="form-integration">
        <p class="form-integration-title">Pagoplux</p>
        <img :src="pagopluxImage" alt="logo de pagoplux" class="form-integration-image" />
      </div>
    </template>
    <template #content>
      <form class="form">
        <ToggleInput
          v-model:value="pagopluxForm.active"
          :text="toggleText"
          @update:modelValue="isActive" />
        <div class="form-content" v-show="isFormVisibled">
          <CrushTextField
            v-model="pagopluxForm.ruc"
            :valid-rules="rules.ruc"
            label="Ruc del establecimiento" 
            placeholder="0954227382001" />
          <CrushTextField
            :valid-rules="rules.clientId"
            v-model="pagopluxForm.clientId"
            label="id del client" 
            placeholder="k3rTOL7NCbGULs2m2jK6a04SUg"/>
          <CrushTextField
            :valid-rules="rules.secretKey"
            v-model="pagopluxForm.secretKey"
            label="Clave secreta" 
            placeholder="pV5uMhA7oyQr0yXqB2bmoQkCtBfwivb5IVVz7pSUCCAWSDp3" />
        </div>
        <CrushButton
          v-if="isFormVisibled"
          :disabled="!isFormValid"
          text="Guardar"
          class="button"
          @click="sendPagoPluxData" />
      </form>
    </template>
  </Card>
</template>

<style lang="scss" scoped>
.title {
  width: 100%;
  font-size: 1rem;
}
.expanded {
  max-width: 680px;
  padding: 32px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.form {
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  &-integration {
    gap: 8px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    &-title {
      color: $black;
      font-size: 16px;
    }
    &-image {
      width: 24px;
      height: 24px;
    }
  }
  &-content {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;
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
    :deep(.crush-text-field .input-container .crush-text-field-input) {
      color: $black;
    }
    :deep(.crush-text-field) {
      width: 100%;
      max-width: $tablet-lower-breakpoint;
    }
  }
  .button {
    background-color: $light-green;
    color: $white;
    border: none;
    @media(min-width: $tablet-upper-breakpoint) {
      width: 50%;
      margin-left: auto;
    }
    transition: background-color 0.3s ease;
    &:hover {
      background-color: darken($light-green, 10%);
    }
  }
}
</style>