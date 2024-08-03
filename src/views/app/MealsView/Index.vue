<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';

import useMealStore from '@/store/meal';
import useAuthStore from '@/store/auth';
import useClientStore from '@/store/client';
import useRestaurantStore from '@/store/restaurant';
import { Categories } from '@/enum/mealOrDrink.enum';
import ProductTable from '@/components/Tables/ProductTable.vue'; 
import Pagination from '@/components/Pagination.vue';

import CreateMealDrinkModal from '@/components/Modals/CreateMealDrinkModal.vue';

const authStore = useAuthStore();
const mealStore = useMealStore();
const clientStore = useClientStore();
const restaurantStore = useRestaurantStore();

const isModalOpen = ref(false);

function openCloseModal(): void {
  isModalOpen.value = !isModalOpen.value;
}

function changePage(page: number) {
  mealStore.getMeals(clientStore.client?.restaurant?._id!, page);
}

const nextPage = computed(() => mealStore.nextPage !== null ? mealStore.nextPage : 0);
const previousPage = computed(() => mealStore.previousPage !== null ? mealStore.previousPage : 0);
const meals = computed(() => mealStore.meals);
const restaurantUuid = computed(() => restaurantStore.restaurant?.uuid);

onMounted(async () => {
  const userAuth = await authStore.checkAuth();
  await clientStore.getClientByEmail(userAuth?.email!);
  await restaurantStore.getRestaurantById(clientStore.client?.restaurant?._id!);
  await mealStore.getMeals(clientStore.client?.restaurant?.uuid!);
});
</script>

<template>
  <div class="meals">
    <div class="meals-actions">
      <CrushButton
        variant="primary"
        text="Crear plato"
        @click="openCloseModal" />
    </div>
    <ProductTable
      v-if="meals && restaurantUuid"
      :items="meals"
      :restaurantUuid="restaurantUuid"
      :categoryType="Categories.MEAL" />
    <div class="meals-pagination">
      <Pagination
        :totalPages="mealStore.totalPages"
        :currentPage="mealStore.currentPage"
        :hasNextPage="mealStore.hasPreviousPage"
        :hasPreviousPage="mealStore.hasPreviousPage"
        :nextPage="nextPage"
        :previousPage="previousPage"
        @pageChange="changePage" />
    </div>
  </div>
  <CreateMealDrinkModal
    :isModalOpen="isModalOpen"
    :category="Categories.MEAL"
    @close-modal="openCloseModal" />
</template>

<style lang="scss" scoped>
.meals {
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
