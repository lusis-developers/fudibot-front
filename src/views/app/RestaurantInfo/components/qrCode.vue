<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import QRCode from 'qrcode';

import { QrCode } from '@/enum/qrCode.enum';
// import useBotStore from '@/store/bot';
import QrCodeImage from '@/assets/QRCode.png';
import Card from '@/components/Card.vue';
import DeleteModal from '@/views/app/RestaurantInfo/components/DeleteModal.vue/Index.vue';

const props = defineProps({
  base64: {
    type: String,
    required: true
  },
  botId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});

// const botStore = useBotStore();

const canvasRef = ref<HTMLCanvasElement | null>(null);
const isDeleteModalOpen = ref(false);
const isBotConnected = computed(() => props.status === QrCode.ONLINE);
const statusMessage = computed(() => isBotConnected.value ? 'Conectado' : 'Escanea el código');
const statusClass = computed(() => isBotConnected.value ? 'online' : 'pending');

function generateQRCode(): void {
  if (canvasRef.value) {
    QRCode.toCanvas(canvasRef.value, props.base64, function (error) {
      if (error) console.error(error);
    });
  }
}

async function openCloseDeleteModal(): Promise<void> {
  isDeleteModalOpen.value = !isDeleteModalOpen.value
}

onMounted(() => {
  generateQRCode();
});

watch(
  () => props.base64,
  () => { generateQRCode(); }
);
</script>

<template>
  <div class="qr-wrapper">
    <Card>
      <template #title>
        <div class="header">
          <span 
            class="header-status">
            <div
            class="icon"
            :class="[statusClass]"></div>
            <span class="message">
              {{ statusMessage }}
            </span>
          </span>
          <CrushButton
            :small="true"
            @click="openCloseDeleteModal">
            Desconectar
          </CrushButton> 
        </div>
      </template>
      <template #content>
        <div class="content">
          <div
            v-if="isBotConnected"
            class="image-container">
            <img
              :src="QrCodeImage"
              alt="fake-qr-code"
              class="styled-image">
            <span></span>
          </div>
          <canvas
            v-else
            ref="canvasRef"></canvas>
        </div>
      </template>
    </Card>
  </div>
  <DeleteModal
    v-if="botId"
    :modalValue="isDeleteModalOpen"
    :botId="botId!"
    @close-modal="openCloseDeleteModal" />
</template>

<style lang="scss" scoped>
.qr-wrapper {
  width: 100%;
  max-width: 420px;
  .header {
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;

    &-status {
      padding: 4px 8px;
      border-radius: 8px;
      background: $light-grey;
      display: inline-flex;
      
      .icon {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin: auto;
        
        @media (min-width: $tablet-upper-breakpoint) {
          margin-right: 8px;
        }
      }
      .online {
        background: $light-green;
      }
      .pending {
        background: $light-yellow;
      }
      .message {
        display: none;

        @media (min-width: $tablet-upper-breakpoint) {
          display: block;
        }
      }
    }
  }

  .content {
    display: flex;
    justify-content: center;

    .image-container {
      position: relative;
      width: 273px;

      .styled-image {
        position: relative;
        display: block;
        width: 263px;
        height: auto;
        margin: auto;
      }

      span {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.2);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(4.9px);
        -webkit-backdrop-filter: blur(2.9px);
        border: 1px solid rgba(255, 255, 255, 0.12);
      }
    }

  }
}
</style>
