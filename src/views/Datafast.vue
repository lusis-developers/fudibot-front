<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

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

onMounted(async () => {
  await loadDatafastWidget();
});
</script>

<template>
  <div>
    <form
      id="payment-form"
      action="https://test.oppwa.com/v1/payments"
      class="paymentWidgets"
      data-brands="VISA MASTER AMEX"></form>
  </div>
</template>
