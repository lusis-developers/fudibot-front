<script setup lang="ts">
import { ref, computed } from 'vue';
import CrushTextField from '@nabux-crush/crush-text-field';
import CrushSelect from '@nabux-crush/crush-select';
import useMenuStore from '@/store/menu';
import { priceRules, productNameRules } from '@/utils/validations';
import { Meal } from '@/types/menu.interface';
import { Drink } from '@/types/menu.interface';

const emit = defineEmits(['next']);
const menuStore = useMenuStore();

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
      id: Date.now().toString(),
      item: form.value.productName,
      price: parseFloat(form.value.price),
      image: form.value.image,
      currency: form.value.currency,
      description: form.value.description,
    };

    if (form.value.category === 'Platillos') {
      await menuStore.addMeal(newItem as Meal);
      console.log('Platillo agregado:', newItem);
    } else if (form.value.category === 'Bebidas') {
      await menuStore.addDrink(newItem as Drink);
      console.log('Bebida agregada:', newItem);
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
  formData.append('data', target);
  try {
    const response = await fetch('https://primary-production-559e.up.railway.app/webhook/post-logo', {
      method: 'POST',
      body: formData
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      const selfLink = jsonResponse[0].selfLink;
      form.value.image  = selfLink;
    }
  } catch (error) {
    console.error('Error al enviar la solicitud', error);
  }
}
</script>

<template>
  <div class="step-content">
    <h2>Agregar Productos</h2>
    <form @submit.prevent="addMealOrDrink">
      <div class="form-group">
        <CrushSelect
          label="Categoría:"
          :options="categories"
          :value="form.category"
          @update:value="handleInput($event, 'category')"
          class="form-group-select"
        />
      </div>
      <div class="form-group">
        <CrushTextField
          label="Nombre del Producto:"
          placeholder="Nombre del Producto"
          :value="form.productName"
          :valid-rules="productNameRules"
          @update:modelValue="handleInput($event, 'productName')"
          class="form-group-text-field"
        />
      </div>
      <div class="form-group">
        <CrushTextField
          label="Precio:"
          placeholder="Precio"
          :value="form.price"
          :valid-rules="priceRules"
          prependContent="$" 
          @update:modelValue="handleInput($event, 'price')"
          class="form-group-text-field"
        />
      </div>
      <div class="form-group">
        <label for="logo">Subir imagen:</label>
        <CrushUpload
          @file-selected="handleFileSelected"
        />
      </div>
      <div class="form-group">
        <CrushTextField
          label="Descripción:"
          placeholder="Descripción del Producto"
          :value="form.description"
          @update:modelValue="handleInput($event, 'description')"
          class="form-group-text-field"
        />
      </div>
      <div class="form-actions">
        <button 
          type="button"
          @click="addMealOrDrink"
          :disabled="!isFormValid"
          :style="{ cursor: isFormValid ? 'pointer' : 'not-allowed' }"
          class="add-meal-button">
          Agregar Producto
        </button>
        
      </div>
    </form>

    <h3>Productos</h3>
    <div class="products">
      <div v-for="(meal, index) in menuStore.items" :key="index" class="product-card">
        <h4>{{ meal.item }}</h4>
        <p>{{ meal.price }}</p>
        <p>{{ meal.description.length > 50 ? meal.description.substring(0, 50) + '...' : meal.description }}</p>
      </div>
    </div>
     <div class="form-actions">
       <button 
         type="submit"
         :disabled="menuStore.items.length < 1"
         :style="{ cursor: menuStore.items.length > 0 ? 'pointer' : 'not-allowed' }">
         Siguiente
       </button>
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
