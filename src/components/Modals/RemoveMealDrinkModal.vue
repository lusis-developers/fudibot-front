<script setup lang="ts">
import { PropType } from 'vue';

import useMealStore from '@/store/meal';
import useDrinkStore from '@/store/drink';
import { Categories } from '@/enum/mealOrDrink.enum';

import Modal from '../Modal.vue';

const emit = defineEmits(['close-modal'])

const props = defineProps({
  restaurantUuid: {
    type: String,
    required: true
  },
  categoryType: {
    type: String as PropType<Categories>,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  isModalOpen: {
    type: Boolean,
    required: true
  }
});

const mealStore = useMealStore();
const drinkStore = useDrinkStore();

async function deleteProduct(): Promise<void> {
  if (props.categoryType === Categories.MEAL) {
    await mealStore.removeMeal(props.id, props.restaurantUuid);
  }
  if (props.categoryType === Categories.DRINK) {
    await drinkStore.removeDrink(props.id, props.restaurantUuid);
  }
}

function closeModal(): void {
  emit('close-modal');
}
</script>

<template>
  <Modal :modalValue="isModalOpen">
    <template #header>
      Eliminar {{ categoryType }}
    </template>
    <template #content>
      <p>
        ¿Estás seguro de elimminar este producto?
      </p>
    </template>
    <template #footer>
      <div class="modal-footer">
        <CrushButton
          variant="secondary"
          @click="closeModal">
          Cancelar
        </CrushButton>
        <CrushButton
          @click="deleteProduct">
          Eliminar
        </CrushButton>
      </div>
    </template>
  </Modal>
</template>

<style lang="scss" scoped>
:deep(.crush-primary) {
  border: 1px solid $red;
  color: $white;
  background-color: $red;
}

.modal {
  &-footer {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }
}

</style>