<script setup lang="ts">
import { reactive, computed, ref } from 'vue';

import { CurrencyEnum } from '@/enum/currency.enum';
import { Categories } from '@/enum/mealOrDrink.enum';
import { productNameRules, priceRules } from '@/utils/validations';
import useMealStore from '@/store/meal';
import useDrinkStore from '@/store/drink';
import useRestaurantStore from '@/store/restaurant';
import { formatPriceToDisplay, formatNumberToSave } from '@/utils/inputFormats';
import Modal from '@/components/Modal.vue';

const emit = defineEmits(['close-modal']);

const props = defineProps({
  isModalOpen: {
    type: Boolean,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});


const mealStore = useMealStore();
const drinkStore = useDrinkStore()
const restaurantStore = useRestaurantStore();

const imageURL = ref<string>('');
const imageFile = ref<File>(new File([], ''));
const form = reactive({
  productName: '',
  price: '',
  category: '',
  image: '',
  currency: CurrencyEnum.USD,
  description: ''
});

const isFormValid = computed(() => {
  const isProductNameValid = productNameRules.every(rule => rule.validate(form.productName));
  const isPriceValid = priceRules.every(rule => rule.validate(form.price));
  return isProductNameValid && isPriceValid && imageFile.value !== null;
});

function handleInput(event: string, type: string): void {
  if (type === 'productName') {
    form.productName = event;
  }
  if (type === 'price') {
    form.price = formatPriceToDisplay(event);
  }
  if (type === 'image') {
    form.image = event;
  }
  if (type === 'description') {
    form.description = event;
  }
}

async function addMealOrDrink(): Promise<void> {
  if (props.category === Categories.MEAL) {
    if (!imageURL.value.length) {
      form.image = 'https://storage.googleapis.com/fudi-meals/fudi-plato.png';
    } else {
      const linkURL = await mealStore.addMealImage(imageFile.value);
      form.image = linkURL; 
    }
  }
  console.log(form.image)
  if (props.category === Categories.DRINK) {
    if (!imageURL.value.length) {
      form.image = 'https://storage.googleapis.com/fudi-drinks/fudi-bebida.png';
    } else {
      const linkURL = await drinkStore.addDrinkImage(imageFile.value);
      form.image = linkURL;
    }
  }
  if (isFormValid.value) {
    const newItem = {
      item: form.productName,
      price: formatNumberToSave(form.price),
      image: form.image,
      currency: CurrencyEnum.USD,
      description: form.description,
      companyName: restaurantStore.restaurant?.companyName!
    };

    console.log(restaurantStore.restaurant?.uuid);
    if (props.category === Categories.MEAL) {
      await mealStore.addMeal(newItem, restaurantStore.restaurant?.uuid!);
    } else if (props.category === Categories.DRINK) {
      await drinkStore.addDrink(newItem, restaurantStore.restaurant?.uuid!);
    }

    resetForm();
    closeModal();
  }
}


function resetForm(): void {
  form.productName = '';
  form.price = '';
  form.category = '';
  form.image = '';
  form.currency = CurrencyEnum.USD;
  form.description = '';
}

function handleFileSelected(file: File) {
  imageURL.value = URL.createObjectURL(file);
  imageFile.value = file;
}

function closeModal(): void {
  emit('close-modal');
}
</script>

<template>
  <Modal :modalValue="isModalOpen">
    <template #header>
      <div class="modal-header">
        <h2 class="modal-title">
          Agregar {{ category }}
        </h2>
        <a @click="closeModal">
          <i class="fa-solid fa-xmark modal-icon"></i>
        </a>
      </div>
    </template>
    <template #content>
      <div class="modal-content">
        <div class="form-group">
          <CrushTextField
            :value="form.productName"
            :valid-rules="productNameRules"
            placeholder="Nombre del Producto"
            label="Nombre del Producto:"
            class="form-group-text-field"
            @update:modelValue="handleInput($event, 'productName')" />
        </div>

        <div class="form-group">
          <CrushTextField
            :value="form.price"
            :valid-rules="priceRules"
            placeholder="Precio"
            prependContent="$" 
            label="Precio:"
            class="form-group-text-field"
            @update:modelValue="handleInput($event, 'price')" />
        </div>

        <div class="form-group">
          <label for="logo">
            Subir imagen:
          </label>
          <CrushUpload @file-selected="handleFileSelected"/>
          <div class="form-group-image">
            <img
              v-if="imageURL.length"
              :src="imageURL" alt="product image">
          </div>
        </div>

        <div class="form-group">
          <CrushTextField
            :value="form.description"
            placeholder="Descripción del Producto"
            label="Descripción:"
            class="form-group-text-field"
            @update:modelValue="handleInput($event, 'description')" />
        </div>
      </div>
    </template>
    <template #footer>
      <div class="modal-footer">
        <CrushButton
          variant="secondary"
          @click="closeModal">
          Cancel
        </CrushButton>
        <CrushButton
          :disabled="!isFormValid"
          @click="addMealOrDrink">
          Guardar
        </CrushButton>
      </div>
    </template>
  </Modal>
</template>

<style lang="scss" scoped>
:deep(.crush-secondary) {
  border: 1px solid $grey;
  color: $grey;
}
.modal {
  &-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  &-content {
    margin-top: 12px;

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
    :deep(.crush-text-field .input-container .content) {
      color: black;
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

    .form-group {
      margin: 8px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      label {
        margin-bottom: 8px;
        font-weight: bold;
      }

      &-image {
        margin: auto;

        img {
          width: 64px;
          height: 64px;
        }
      }

    }
  }

  &-footer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }
}
</style>