<script setup lang="ts">
import Modal from '@/components/Modal.vue';
import { defineProps, defineEmits, computed } from 'vue';

import { form } from '@/utils/editInfoForm';
import ModalEditContent from './Content.vue';
import useRestaurantStore from '@/store/restaurant';

const props = defineProps({
  showModal: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['closeModal'])

const restaurantStore = useRestaurantStore();

const isFormEmpty = computed(() => Object.values(form).every(value => value === ''));

function closeModal():void {
  emit('closeModal');
}
async function handleFileSelected(target: File): Promise<void> {
  await restaurantStore.deleteRestaurantLogo()
  await restaurantStore.postRestaurantLogo(target);
  if (restaurantStore.restaurant?.logo.length) {
    form.logo = restaurantStore.restaurant?.logo;
  }
}
async function handleForm(): Promise<void> {
  const filteredForm = Object.fromEntries(
    Object.entries(form).filter(([_, value]) => value !== '')
  );
  await restaurantStore.updateRestaurantInfoView(filteredForm);
}
</script>

<template>
  <div>
    <Modal :modal-value="props.showModal">
      <template #header>
        <h2 class="modal-title">
          Editar
        </h2>
        <a @click="closeModal">
          <i class="fa-solid fa-xmark modal-icon"></i>
        </a>
      </template>
      <template #content>
        <ModalEditContent 
          :form="form" 
          :handleFileSelected="handleFileSelected" />
      </template>
      <template #footer>
        <CrushButton 
          :small="true"
          :disabled="isFormEmpty"
          variant="secondary"
          form="editForm"
          @click="handleForm"
          class="form-btn">
            Guardar
        </CrushButton>
      </template>
    </Modal>
  </div>
</template>

<style lang="scss" scoped>
:deep(.modal) {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 32px;
}
:deep(header) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px ;
}
:deep(footer) {
  display: flex;
  justify-content: flex-end;
}
.modal-icon {
  font-size: 24px;
  color: $black;
  cursor: pointer;
}
.form-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: $green;
  color: white;
  transition: .3s background-color;
  &:disabled {
    background-color: $gray;
    border: none;  
  }
  &:not(:disabled):hover {
    background-color: darken($green, 10%);
    border: none;
  }
}
</style>
