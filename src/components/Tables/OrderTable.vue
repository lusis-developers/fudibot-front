<script setup lang="ts">
import { PropType } from 'vue';

import Card from '@/components/Card.vue';
import OrderRow from '@/components/Tables/OrderRow.vue';

import type { OrdersRequested } from '@/interfaces/order.interface';

const props = defineProps({
  orders: {
    type: Array as PropType<OrdersRequested[]>,
    required: true
  },
})
</script>

<template>
  <Card>
    <template #content>
      <div class="product-table">
        <div class="product-table-head">
          <div>Pedido</div>
          <div>Total</div>
          <div>Flete</div>
          <div>Estado del pedido</div>
          <div>Acciones</div>
        </div>
        
        <OrderRow
          v-for="(order, index) in orders"
          :key="index"
          :deliveryCost="order.deliveryCost"
          :items="order.items"
          :total="order.totalOrder"
          :status="order.orderStatus"
          class="product-table-body">
        </OrderRow>      
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
      width: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  &-body {
    padding: 12px 0;
  }
}
</style>