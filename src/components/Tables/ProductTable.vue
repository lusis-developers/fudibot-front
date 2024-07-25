<script setup lang="ts">
import { computed, PropType } from 'vue';

import ProductRow from '@/components/Tables/ProductRow.vue';
import Card from '../Card.vue';
import { Categories } from '@/enum/mealOrDrink.enum';

const props = defineProps({
  items: {
    type: Array as PropType<any[]>,
    required: true
  },
  restaurantUuid: {
    type: String,
    required: true
  },
  categoryType: {
    type: String as PropType<Categories>,
    required: true
  }
});

const displayProducts = computed(() => props.items.length > 0 && props.restaurantUuid.length > 0);
</script>

<template>
  <Card>
    <template #content>
      <div class="product-table">
        <div class="product-table-head">
          <div>Imagen</div>
          <div>Nombre</div>
          <div>Descripcion</div>
          <div>Precio</div>
          <div>Acciones</div>
        </div>
        
        <template v-if="displayProducts">
          <ProductRow
            v-for="(product, index) in items"
            :key="index"
            :item="product.item"
            :price="product.price"
            :description="product.description"
            :image="product.image"
            :id="product._id"
            :categoryType="categoryType"
            :restaurantUuid="restaurantUuid"
            class="product-table-body" />
        </template>
      
      </div>
    </template>
  </Card>
</template>

<style lang="scss" scoped>
.product-table {
  width: 100%;
  margin: 20px 0;
  display: flex;
  flex-direction: column;

  &-head {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;

    @media (min-width: $tablet-upper-breakpoint) {
      display: flex;
      justify-content: center;
      align-items: center;
    }    
    
    div {
      width: 25%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    div:nth-of-type(1) {
      width: 25%;
      display: none;

      @media (min-width: $tablet-upper-breakpoint) {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    div:nth-of-type(3) {
      width: 25%;
      display: none;

      @media (min-width: $tablet-upper-breakpoint) {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  &-body {
    padding: 12px 0;
  }
  
}
</style>