<script setup lang="ts">
import { PropType } from 'vue';

import Card from '@/components/Card.vue';
import OrderRow from '@/components/Tables/OrderRow.vue';

import type { OrdersRequested } from '@/interfaces/order.interface';
import { PaymentType, PaymentTypeSpanishTranslate } from '@/enum/PaymentType.enum';

defineProps({
  orders: {
    type: Array as PropType<OrdersRequested[]>,
    required: true
  },
});

const paymentTypeTranslations = {
  [PaymentType.WIRE_TRANSFER]: PaymentTypeSpanishTranslate.WIRE_TRANSFER,
  [PaymentType.PAYMENT_LINK]: PaymentTypeSpanishTranslate.PAYMENT_LINK,
  [PaymentType.MISSING_PAY]: PaymentTypeSpanishTranslate.MISSING_PAY,
};

function translatePaymentType (paymentType: PaymentType) {
  const sentence = paymentTypeTranslations[paymentType] || PaymentTypeSpanishTranslate.MISSING_PAY; 
  return sentence
};
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
          :_id="order._id"
          :deliveryCost="order.deliveryCost"
          :items="order.items"
          :total="order.totalOrder"
          :status="order.orderStatus"
          :userId="order.userId"
          :schedule="order.schedule"
          :paymentType="translatePaymentType(order.paymentType)"
          :wireTransferImage="order.wireTransferUrl">
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
    justify-content: space-evenly;
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

    div:nth-of-type(3), div:nth-of-type(2), div:nth-of-type(4) {
      width: 25%;
      display: none;

      @media (min-width: $tablet-upper-breakpoint) {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>