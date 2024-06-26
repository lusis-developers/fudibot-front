<script setup lang="ts">
import { reactive, computed } from 'vue';


import ToggleInput from '@/components/ToggleInput.vue';
import pagopluxImage from '@/assets/integrations/pagoplux.png';
import Card from '@/components/Card.vue';

const pagopluxForm = reactive({
  ruc: '',
  clientId: '',
  secretKey: '',
  active: false
});
const toggleText = computed(() => {
  return pagopluxForm.active ? 'Desactivar' : 'Activar';
});

function isActive(event: boolean): void {
  console.log('evento de switch: ', event);
  pagopluxForm.active = event;;
};

</script>

<template>
  <Card>
    <form class="form">
      <ToggleInput
        v-model:value="pagopluxForm.active"
        :text="toggleText"
        @update:modelValue="isActive"/>
      <div class="form-integration">
        <p class="form-integration-title">Pagoplux</p>
        <img 
          :src="pagopluxImage" 
          alt="logo de pagoplux"
          class="form-integration-image">
      </div>
      <div class="form-content" v-show="pagopluxForm.active">
        <CrushTextField
        v-model="pagopluxForm.ruc"
        label="Ruc del establecimiento"/>
        <CrushTextField
          v-model="pagopluxForm.clientId"
          label="id del client"/>
        <CrushTextField
          v-model="pagopluxForm.secretKey"
          label="Clave secreta"/>
      </div>
    </form>
  </Card>
</template>

<style lang="scss" scoped>
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
    :deep(.crush-text-field-label-text){
    color: $black;
    font-family: $font;
    };
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
}
</style>