<script setup lang="ts">
import { onMounted } from 'vue';

import useMealStore from '@/store/meal';
import useClientStore from '@/store/client';
import useAuthStore from '@/store/auth';
import ProductTable from '@/components/TableItems/ProductTable.vue'; 

const authStore = useAuthStore();
const mealStore = useMealStore();
const clientStore = useClientStore();

onMounted( async () => {
  const userAuth = await authStore.checkAuth();
  await clientStore.getClientByEmail(userAuth?.email!);

  mealStore.getMeals(clientStore.client?.restaurant?.uuid!);
});
</script>

<template>
  <div class="meals">
    <ProductTable
      v-if="mealStore.meals.length"
      :items="mealStore.meals" />
  </div>
</template>