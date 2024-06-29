<script setup lang="ts">
import { ref, onMounted, computed, reactive } from 'vue';

import Card from '@/components/Card.vue';
import useAuthStore from '@/store/auth';
import useClientStore from '@/store/client';
import useDeliveryStore from '@/store/delivery';
import FleetConfig from './components/FleetConfig.vue';
import AddFleetDetails from './components/AddFleetDetails.vue';
import FleetDetailCard from './components/FleetDetailCard.vue';
import { formatPriceToDisplay, formatNumberToSave } from '@/utils/inputFormats';

const deliveryStore = useDeliveryStore();
const clientStore = useClientStore();
const authStore = useAuthStore();

const showForm = ref(false);
const showFormOnePrice = ref(false);
const generalDeliveryCost = reactive({
  price: '',
})

const cards = computed(()=> {
  return deliveryStore.delivery?.hasOwnFleet
});

function showAddUniquePriceToAllDelieveries(): void {
  showFormOnePrice.value = !showFormOnePrice.value
};

function showAddFleetDetails (): void {
  showForm.value = !showForm.value;
};

function handleVisibleForm (data: boolean): void {
  showForm.value = data
};

function handleInput(event: string, type: string): void {
  if (type === 'price') {
    console.log('sin formatear: ', event)
    generalDeliveryCost.price = formatPriceToDisplay(event);
    console.log("formateado: ", generalDeliveryCost.price)
  }
}

async function addgeneralDeliveryCost(): Promise<void> {
  const id = deliveryStore.delivery?._id;
  if (id) {
    const data = {
      id: id,
      generalDeliveryCost: formatNumberToSave(generalDeliveryCost.price),
    };
    const attentionRadius = clientStore.client?.restaurant?.location.radius;
    
    if (!deliveryStore.delivery?.fleetDetails?.length) {
      await deliveryStore.addFleetDetail(
      {
        id: deliveryStore.delivery?._id!, 
        price: 0, 
        radius: attentionRadius!
      })
    }
    await deliveryStore.addGeneralDeliveryCost(data);
  }
}
onMounted(async() => {
  const userAuth = await authStore.checkAuth();
  await clientStore.getClientByEmail(userAuth?.email!);
  const deliveryId = clientStore.client?.restaurant?.delivery!;
  await deliveryStore.getDeliveryData(deliveryId);
});
</script>

<template>
  <div class="container" v-if="deliveryStore.delivery">
    <FleetConfig />
    <CrushButton
      class="container-button"
      text="Agregar detalle de flota"
      @click="showAddFleetDetails"/>
    <CrushButton
      class="container-button"
      text="Establecer precio único de envío"
      @click="showAddUniquePriceToAllDelieveries" />
    <AddFleetDetails 
      v-if="showForm" 
      @update:visibleForm="handleVisibleForm"/> 
    <div v-if="showFormOnePrice">
      <CrushTextField 
        :value="generalDeliveryCost.price"
        prependContent="$"
        placeholder="Establece un precio estandar para todos los envíos"
        label="Precio estándar"
        @update:modelValue="handleInput($event, 'price')"/>
      <CrushButton
        text="Guardar"
        @click="addgeneralDeliveryCost"/>
    </div>
    <div class="container-cards" v-if="cards">
      <Card class="card">
        <template #content>
          <FleetDetailCard
            v-for="(fleetDetail, index) in deliveryStore.delivery.fleetDetails"
            :key="index"
            :km="formatPriceToDisplay(String(fleetDetail.radiusKm))"
            :price="formatPriceToDisplay(String(fleetDetail.price))"
            :deliveryId="deliveryStore.delivery._id" 
            :fleetDetailId="fleetDetail._id"/>
        </template>
      </Card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  &-button {
    width: 40%;
  }
  &-cards {
    width: 100%;
    gap: 24px;
    flex-wrap: wrap;
    .card {
      & > *:not(:last-child) {
        border-bottom: 1px solid $green;
      }
    }
  }
  :deep(.crush-text-field-label-text){
    color: $black;
    font-family: $font;
  }
  :deep(.form-group-text-field .crush-text-field-input) {
    color: $black;
    font-family: $font;
  }
  :deep(.crush-text-field .input-container .crush-text-field-input ) {
    color: $black;
    border-color: $light-green;
  }
  :deep(.crush-text-field .input-container .content) {
    color: $black;
  }
}
</style>