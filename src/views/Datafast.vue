<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import fudibot from '@/assets/fudi-isologo-color.png';
import Card from '@/components/Card.vue';

const route = useRoute();

const totalAmount = computed(() => route.query.totalAmount);
const number = computed(() => route.query.number);

async function loadDatafastWidget(): Promise<void> {
  try {
    const id = route.params.id as string;
    console.log(id);
    const checkoutId = id;
    const script = document.createElement('script');
    script.src = `https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}`;
    script.async = true;
    script.defer = true;

    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
      paymentForm.appendChild(script);
    } else {
      console.error('Elemento de formulario no encontrado');
    }
  } catch (error) {
    console.error('Error cargando el widget de Datafast:', error);
  }
}

async function checkPayment(): Promise<void> {
  console.log(number.value);
}

onMounted(async () => {
  await loadDatafastWidget();
});
</script>

<template>
  <div class="datafast">
    <Card>
      <template #title>
        <div class="header">
          <img
            :src="fudibot"
            alt="fuditbot logo">
          <h3>
            Realiza tu pago :)
          </h3>
          <span>
            Valor a pagar {{ totalAmount }}
          </span>
        </div>
      </template>
      <template #content>
        <div>
          <form
            id="payment-form"
            action="https://test.oppwa.com/v1/payments"
            class="paymentWidgets"
            data-brands="VISA MASTER AMEX"></form>
        </div>
      </template>
    </Card>
  </div>
</template>

<style lang="scss" scoped>
.datafast {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;

    img {
      width: 64px;
      height: 64px;
      margin: auto;
    }
  }
}
</style>