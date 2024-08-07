<script setup lang="ts">
import { reactive, computed, onMounted, ref } from "vue";

import {
  datafastBearerTokenRules,
  datafastEntityIdRules
} from "@/utils/validations";

import datafastImage from '@/assets/integrations/Datafast-Icon-web.webp';
import usePaymentMethodsStore from '@/store/paymentMethods';
import ToggleInput from '@/components/ToggleInput.vue';
import useClientStore from '@/store/client'
import Card from '@/components/Card.vue';
import useAuthStore from '@/store/auth';
import { PaymentLinkType } from "@/enum/paymentMethods.enum";

const authStore = useAuthStore();
const clientStore = useClientStore();
const paymentMethodsStore = usePaymentMethodsStore();

const rules = {
  bearerToken: datafastBearerTokenRules,
  entityId: datafastEntityIdRules
};
const datafast = reactive({
  bearerToken: '',
  entityId: '',
});
const isCardOpen = ref(false);
const toggleText = computed(() => {
  return !isSelected.value ? "Desactivar" : "Activar";
});
const isSelected = computed(() => paymentMethodsStore.paymentMethods?.paymentLinkSelected === PaymentLinkType.DATAFAST);

const isFormValid = computed(() => {
  const isEntityIdValid = datafastEntityIdRules.every(rule => rule.validate(datafast.entityId));
  const isBearerTokenValid = datafastBearerTokenRules.every(rule => rule.validate(datafast.bearerToken));
  return isEntityIdValid && isBearerTokenValid;
});

function openCloseCard(): void {
  datafast.entityId = '',
  datafast.bearerToken = ''
  isCardOpen.value = !isCardOpen.value;
};

async function sendPagoPluxData () {
  try {
    const data = {
      entityId: datafast.entityId,
      bearerToken: datafast.bearerToken
    };
    const restaurantUuid = clientStore.client?.restaurant?.uuid;
    await paymentMethodsStore.putDatafastData(data, restaurantUuid!);
    openCloseCard();
  } catch(e) {
    console.error('error: ', e)
  }
}

onMounted( async () => {
  const userAuth = await authStore.checkAuth();

  await clientStore.getClientByEmail(userAuth?.email!);

  await paymentMethodsStore.getPaymentMethods(clientStore.client?.restaurant?.uuid!)
})
</script>

<template>
  <Card
    class="card"
    :class="{ expanded: isCardOpen }">
    <template #title>
      <div class="header-wrapper">
        <div class="form-integration">
          <div class="header">
            <img
              :src="datafastImage"
              alt="logo de pagoplux"
              class="image" />
            <p class="title">
              Dataweb
            </p>
          </div>
          <div class="toggle">
            <ToggleInput
              v-model:value="isSelected"
              :text="toggleText" />
          </div>
        </div>
        <div class="edit-section">
          <span>Tienes Dataweb?</span>
          <CrushButton
            :small="true"
            class="edit-button"
            @click="openCloseCard">
            Editar
          </CrushButton>
        </div>
      </div>
    </template>
    <template #content>
      <form
        v-show="isCardOpen"
        class="form">
        <div class="form-content">
          <CrushTextField
            :valid-rules="rules.entityId"
            v-model="datafast.entityId"
            label="entityId" 
            placeholder="k3rTOL7NCbGULs2m2jK6a04SUg"/>
          <CrushTextField
            :valid-rules="rules.bearerToken"
            v-model="datafast.bearerToken"
            label="Bearer Token" 
            placeholder="pV5uMhA7oyQr0yXqB2bmoQkCtBfwivb5IVVz7pSUCCAWSDp3==" />
        </div>
        <div class="actions-wrapper">
          <CrushButton
            :disabled="!isFormValid"
            text="Guardar"
            class="button"
            @click="sendPagoPluxData" />
        </div>
      </form>
    </template>
  </Card>
</template>

<style lang="scss" scoped>
.card {
  max-width: 600px;
  width: 100%;
  .header-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .form-integration {
      gap: 8px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .header {
        display: flex;
        align-items: center;
        .title {
          color: $black;
          font-size: 16px;
        }
        .image {
          width: 112px;
          height: 24px;
        }
      }
      .toggle {
        width: auto;
      }
    }
    .edit-section {
      width: 100%;
      margin-top: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .edit-button {
        background-color: $white;
        color: $black;
        border: 1px solid $black;
        cursor: pointer;
        transition: .3s background-color;
        &:hover {
          background-color: darken($white, 10%);
        }
      }
    }
  }
  .form-content {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;
    :deep(.crush-text-field-label-text) {
      color: $black;
      font-family: $font;
    }
    :deep(.form-group-text-field .crush-text-field-input) {
      color: $black;
      font-family: $font;
    }
    :deep(.crush-text-field .input-container.active) {
      border-color: $green;
    }
    :deep(.crush-text-field .input-container .crush-text-field-input) {
      color: $black;
    }
    :deep(.crush-text-field) {
      width: 100%;
      max-width: $tablet-lower-breakpoint;
    }
  }
  .actions-wrapper {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    .crush-button {
      width: 128px;
    }
  }
  .button {
    background-color: $light-green;
    color: $white;
    border: none;
    @media(min-width: $tablet-upper-breakpoint) {
      width: 50%;
      margin-left: auto;
    }
    transition: background-color 0.3s ease;
    &:hover {
      background-color: darken($light-green, 10%);
    }
  }
}
</style>