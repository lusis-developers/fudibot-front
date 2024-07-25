<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';

import useAuthStore from '@/store/auth';
import useDrinkStore from '@/store/drink';
import useClientStore from '@/store/client';
import { Categories } from '@/enum/mealOrDrink.enum';
import ProductTable from '@/components/Tables/ProductTable.vue'; 
import useRestaurantStore from '@/store/restaurant';

const authStore = useAuthStore();
const drinksStore = useDrinkStore();
const clientStore = useClientStore();
const restaurantStore = useRestaurantStore();

const isModalOpen = ref(false);

function openCloseModal(): void {
  isModalOpen.value = !isModalOpen.value
}

function changePage(page: number) {
  drinksStore.getDrinks(clientStore.client?.restaurant?._id!, page);
}

const nextPage = computed(() => drinksStore.nextPage !== null ? drinksStore.nextPage : 0);
const previousPage = computed(() => drinksStore.previousPage !== null ? drinksStore.previousPage : 0);
const drinks = computed(() => drinksStore.drinks);
const restaurantUuid = computed(() => restaurantStore.restaurant?.uuid);

onMounted( async () => {
  const userAuth = await authStore.checkAuth();
  await clientStore.getClientByEmail(userAuth?.email!);

  await restaurantStore.getRestaurantById(clientStore.client?.restaurant?._id!);
  await drinksStore.getDrinks(clientStore.client?.restaurant?.uuid!);
});
</script>

<template>
  <div class="drinks">
    <div class="drinks-actions">
      <CrushButton
        variant="primary"
        text="Crear bebida"
        @click="openCloseModal" />
    </div>
    <ProductTable
      v-if="drinks && restaurantUuid"
      :items="drinks"
      :restaurantUuid="restaurantUuid"
      :categoryType="Categories.DRINK" />
    <div class="meals-pagination">
      <Pagination
        :totalPages="drinksStore.totalPages"
        :currentPage="drinksStore.currentPage"
        :hasNextPage="drinksStore.hasPreviousPage"
        :hasPreviousPage="drinksStore.hasPreviousPage"
        :nextPage="nextPage"
        :previousPage="previousPage"
        @pageChange="changePage" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.drinks {
  &-actions {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 12px;
  }
  &-pagination {
    margin-top: 12px;
  }
}
</style>