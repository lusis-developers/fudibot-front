<script setup lang="ts">
import { reactive, computed } from 'vue';

import useMealStore from '@/store/meal';
import useDrinkStore from '@/store/drink';
import useRestaurantStore from '@/store/restaurant';
import { priceRules, productNameRules } from '@/utils/validations';
import { CurrencyEnum } from '@/enum/currency.enum';
import { Categories } from '@/enum/mealOrDrink.enum';
import ProductCard from '@/views/Wizard/components/ProductCard.vue';

const emit = defineEmits(['next', 'prev']);

const mealStore = useMealStore();
const drinkStore = useDrinkStore()
const restaurantStore = useRestaurantStore();

const form = reactive({
  productName: '',
  price: '',
  category: '',
  image: '',
  currency: CurrencyEnum.USD,
  description: ''
});
const categories = ['Bebidas', 'Platillos'];
const isFormValid = computed(() => {
  const isProductNameValid = productNameRules.every(rule => rule.validate(form.productName));
  const isPriceValid = priceRules.every(rule => rule.validate(form.price));
  return isProductNameValid && isPriceValid && form.category !== '';
});
const isDisabled = computed(() => {
  return !(mealStore.meals.length < 1 || drinkStore.drinks.length < 1)
});
const cursorDiplay = computed(() => {
  return (mealStore.meals.length > 0 || drinkStore.drinks.length > 0) ? 'pointer' : 'not-allowed'
})

function handleInput(event: string, type: string): void {
  if (type === 'productName') {
    form.productName = event;
  }
  if (type === 'price') {
    form.price = event;
  } 
  if (type === 'category') {
    form.category = event;
  }
  if (type === 'image') {
    form.image = event;
  }
  if (type === 'description') {
    form.description = event;
  }
}
async function addMealOrDrink(): Promise<void> {
  if (isFormValid.value) {
    const newItem = {
      item: form.productName,
      price: parseFloat(form.price),
      image: form.image,
      currency: CurrencyEnum.USD,
      description: form.description,
      companyName: restaurantStore.restaurant?.companyName!
    };

    if (form.category === Categories.MEAL) {
      await mealStore.addMeal(newItem, restaurantStore.restaurant?.uuid!);
    } else if (form.category === Categories.DRINK) {
      await drinkStore.addDrink(newItem, restaurantStore.restaurant?.uuid!);
    }

    resetForm();
  }
}
async function handleFileSelected(target: File) {
  if(form.category === Categories.MEAL) {
    const linkURL = await mealStore.addMealImage(target);
    form.image = linkURL; 
  } else if(form.category === Categories.DRINK) {
    const linkURL = await drinkStore.addDrinkImage(target);
    form.image = linkURL;
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
function submitForm(): void {
  emit('next');
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
    <div class="form">
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
      <div
        v-if="mealStore.meals.length"
        class="products">
        <ProductCard
          v-for="(meal, index) in mealStore.meals" 
          :key="index"
          :item="meal.item"
          :price="meal.price"
          :description="meal.description" />
      </div>
      <div
        v-if="drinkStore.drinks.length"
        class="products">
        <ProductCard
          v-for="(drink, index) in drinkStore.drinks" 
          :key="index"
          :item="drink.item"
          :price="drink.price"
          :description="drink.description" />
      </div>
       <div class="form-actions">
        <CrushButton
          type="button"
          @click="goBack">
            Retroceder
        </CrushButton>
        <CrushButton 
          type="submit"
          :disabled="isDisabled"
          :style="{ cursor:  cursorDiplay}"
          @click="submitForm">
            Siguiente
        </CrushButton>
       </div>
      </div>
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
}
</style>
