<script setup lang="ts">
import { ref, computed } from 'vue';
import CrushTextField from '@nabux-crush/crush-text-field';
import CrushSelect from '@nabux-crush/crush-select';

// import useMenuStore from '@/store/menu';
import { priceRules, productNameRules } from '@/utils/validations';

const emit = defineEmits(['next']);

// const menuStore = useMenuStore();
const form = ref({
  productName: '',
  price: '',
  category: ''
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
}
function addMeal(): void {
  if (isFormValid.value && form.value.category === 'Platillos') {
    const newMeal = {
      id: Date.now().toString(),
      name: form.value.productName,
      price: parseFloat(form.value.price)
    };
    console.log('Platillo agregado:', newMeal);
  }
}
function submitForm(): void {
  if (isFormValid.value) {
    emit('next', form.value);
  }
}
</script>

<template>
  <div class="step-content">
    <h2>Agregar Productos</h2>
    <form @submit.prevent="submitForm">
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
      <div class="form-actions">
        <button 
          type="button"
          @click="addMeal"
          :disabled="!isFormValid || form.category !== 'Platillos'"
          :style="{ cursor: isFormValid && form.category === 'Platillos' ? 'pointer' : 'not-allowed' }"
          class="add-meal-button">
          Agregar Platillo
        </button>
        
      </div>
    </form>

    <h3>Productos</h3>
    <div class="products">
    </div>
     <div class="form-actions">
       <button 
         type="submit"
         :disabled="!isFormValid"
         :style="{ cursor: isFormValid ? 'pointer' : 'not-allowed' }">
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
  padding: 20px 0;
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

button:hover {
  background-color: $green;
}

.add-meal-button {
  background-color: $blue;
}

.add-meal-button:hover {
  background-color: $green;
}

.products {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
  justify-content: center;
}

.product-card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  width: 150px;
  text-align: center;
  background-color: #f9f9f9;
}

.product-card h4 {
  margin: 0 0 10px;
}

.product-card p {
  margin: 0;
}
</style>