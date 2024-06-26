<script setup lang="ts">
import { reactive, computed } from "vue";

import {
  pagopluxClientIdRules,
  pagopluxSecretKeyRules,
  rucRules
} from '@/utils/validations'

import pagopluxImage from "@/assets/integrations/pagoplux.png";
import ToggleInput from "@/components/ToggleInput.vue";
import Card from "@/components/Card.vue";

const pagopluxForm = reactive({
  ruc: "",
  clientId: "",
  secretKey: "",
  active: false,
});

const toggleText = computed(() => {
  return pagopluxForm.active ? "Desactivar" : "Activar";
});

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
  console.log("evento de switch: ", event);
  pagopluxForm.active = event;
  if(!event) {
    pagopluxForm.ruc = '';
    pagopluxForm.clientId = '',
    pagopluxForm.secretKey = ''
  };
};
</script>

<template>
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
        <div class="form-content" v-show="pagopluxForm.active">
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
          v-if="pagopluxForm.active"
          :disabled="isFormValid"
          text="Guardar"
          class="button"/>
      </form>
    </template>
  </Card>
</template>

<style lang="scss" scoped>
.expanded {
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