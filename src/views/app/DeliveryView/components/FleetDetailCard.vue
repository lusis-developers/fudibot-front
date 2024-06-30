<script setup lang="ts">
import useDeliveryStore from '@/store/delivery';

const deliveryStore = useDeliveryStore();

const props = defineProps({
  km: {
    type: String,
    required: true,
  },
  price: {
    type: String, 
    required: true,
  },
  deliveryId: {
    type: String,
    required: true,
  },
  fleetDetailId: {
    type: String,
    required: true,
  },
})

function deleteFleetDetail (): void {
  deliveryStore.deleteFleetDetail(props.deliveryId, props.fleetDetailId); 
};

</script>

<template>
  <div class="principal">
    <h3 class="principal-title">
      Detalles:
    </h3>
    <div class="card">
      <button class="principal-close-button" @click="deleteFleetDetail">
        <i class="fa-brands fa-x principal-close-icon"></i>
      </button>
      <p class="principal-indicator_distance">
        Kilometros a la redonda: {{ props.km }}
      </p>
      <p class="principal-indicator_price">
        Costo de viaje: ${{ props.price }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.principal {
  padding: 24px;
  .card {
    display: flex; 
    flex-direction: column; 
  }
  &-title {
    font-size: $h2-font-size;
  }
  &-indicator_distance {
    font-size: $h3-font-size
  }
  &-indicator_price {
    font-size: $h3-font-size;
  }
  &-close-button {
    align-self: flex-end; 
    background: none; 
    border: none; 
    cursor: pointer; 
    padding: 0; 
    margin-bottom: auto; 
  }
  &-close-icon {
    font-size: $h3-font-size;
    color: $red;
  }
}
</style>