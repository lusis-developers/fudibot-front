<script setup lang="ts">
import { PropType } from 'vue';

import ProductRow from '@/components/Tables/ProductRow.vue';
import Card from '../Card.vue';

const props = defineProps({
  items: {
    type: Array as PropType<any[]>,
    required: true
  }
})
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
        </div>
        
        <ProductRow
          v-for="(meal, index) in items"
          :key="index"
          :item="meal.item"
          :price="meal.price"
          :description="meal.description"
          :image="meal.image"
          class="product-table-body" />
      
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