<script setup lang="ts">
import { ref, computed } from 'vue';
import CrushSelect from '@nabux-crush/crush-select';
import CrushUpload from '@nabux-crush/crush-upload';
import CrushTextField from '@nabux-crush/crush-text-field';

import useMenuStore from '@/store/menu';
import useRestaurantStore from '@/store/restaurant';
import { priceRules, productNameRules } from '@/utils/validations';


const emit = defineEmits(['next', 'prev']);

const menuStore = useMenuStore();
const restaurantStore = useRestaurantStore();

const form = ref({
  productName: '',
  price: '',
  category: '',
  image: '',
  currency: 'USD',
  description: ''
});
const categories = ['Bebidas', 'Platillos'];
const isFormValid = computed(() => {
  const isProductNameValid = productNameRules.every(rule => rule.validate(form.value.productName));
  const isPriceValid = priceRules.every(rule => rule.validate(form.value.price));
  return isProductNameValid && isPriceValid && form.value.category !== '';
});

function handleInput(event: string, type: string): void {
  if (type === 'productName') {
    form.value.productName = event;
  }
  if (type === 'price') {
    form.value.price = event;
  } 
  if (type === 'category') {
    form.value.category = event;
  }
  if (type === 'image') {
    form.value.image = event;
  }
  if (type === 'description') {
    form.value.description = event;
  }
}
async function addMealOrDrink(): Promise<void> {
  if (isFormValid.value) {
    const newItem = {
      item: form.value.productName,
      price: parseFloat(form.value.price),
      image: form.value.image,
      currency: form.value.currency,
      description: form.value.description,
      companyName: restaurantStore.restaurant.companyName,
      uuid: restaurantStore.restaurant.others.uuid
    };

    if (form.value.category === 'Platillos') {
      await menuStore.addMeal(newItem);
    } else if (form.value.category === 'Bebidas') {
      await menuStore.addDrink(newItem);
    }

    form.value = {
      productName: '',
      price: '',
      category: '',
      image: '',
      currency: 'USD',
      description: ''
    };
  }
}
async function handleFileSelected(target: File) {
  const formData = new FormData();
  formData.append('file', target);
  if(form.value.category === 'Platillos') {
    form.value.image = await menuStore.addMealImage(formData) as string;
  } else if(form.value.category === 'Bebidas') {
    form.value.image = await menuStore.addDrinkImage(formData) as string;
  }
}
function submitForm(): void {
  emit('next', form.value);
}
function goBack(): void {
  emit('prev')
}
</script>

<template>
  <div class="step-content">
    <h2>
      Agregar Productos
    </h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <CrushSelect
          :options="categories"
          :value="form.category"
          label="Categoría:"
          class="form-group-select"
          @update:value="handleInput($event, 'category')" />
      </div>

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
      </div>

      <div class="form-group">
        <CrushTextField
          :value="form.description"
          placeholder="Descripción del Producto"
          label="Descripción:"
          class="form-group-text-field"
          @update:modelValue="handleInput($event, 'description')" />
      </div>

      <div class="form-actions">
        <button 
          :disabled="!isFormValid"
          :style="{ cursor: isFormValid ? 'pointer' : 'not-allowed' }"
          type="button"
          class="add-meal-button"
          @click="addMealOrDrink">
            Agregar Producto
        </button>
        
      </div>
      <h3>
        Productos
      </h3>
      <div class="products">
        <div 
          v-for="(meal, index) in menuStore.items" 
          :key="index" 
          class="product-card">
            <h4>
              {{ meal.item }}
            </h4>
            <p>
              {{ meal.price }}
            </p>
            <p>
              {{ meal.description.length > 50 ? 
                meal.description.substring(0, 50) + '...' : 
                meal.description }}
            </p>
        </div>
      </div>
       <div class="form-actions">
        <button
          type="button"
          @click="goBack">
            Retroceder
        </button>
        <button 
          type="submit"
          :disabled="menuStore.items.length < 1"
          :style="{ cursor: menuStore.items.length > 0 ? 'pointer' : 'not-allowed' }">
            Siguiente
        </button>
       </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.step-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  padding-bottom: 20px;
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
  justify-content: space-between;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: $green;
  color: white;
  cursor: pointer;
}

.add-meal-button {
  background-color: $blue;
}

button:disabled {
  background-color: $gray;
  cursor: not-allowed;
}

.products {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;

  .product-card {
    border: 1px solid $green;
    padding: 16px;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    h4 {
      margin: 0 0 8px 0;
      color: $green;
      font-size: 1.2em;
    }

    p {
      margin: 0;
      color: #333;
    }
  }
}
</style>
