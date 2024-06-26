<script setup lang="ts">
import { onMounted } from 'vue';

import useAuthStore from '@/store/auth';
import useDrinkStore from '@/store/drink';
import useClientStore from '@/store/client';
import ProductTable from '@/components/TableItems/ProductTable.vue'; 

const authStore = useAuthStore();
const drinksStore = useDrinkStore();
const clientStore = useClientStore();

onMounted( async () => {
  const userAuth = await authStore.checkAuth();
  await clientStore.getClientByEmail(userAuth?.email!);

  drinksStore.getDrinks(clientStore.client?.restaurant?.uuid!);
});
</script>

<template>
  <div class="meals">
    <ProductTable
      v-if="drinksStore.drinks.length"
      :items="drinksStore.drinks" />
  </div>
</template>