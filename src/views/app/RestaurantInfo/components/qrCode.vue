<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import QRCode from 'qrcode';

import { QrCode } from '@/enum/qrCode.enum';
import Card from '@/components/Card.vue';

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

const canvasRef = ref<HTMLCanvasElement | null>(null);
const statusMessage = computed(() => props.status === QrCode.ONLINE ? 'Conectado' : 'Escanea el código');
const statusClass = computed(() => props.status === QrCode.ONLINE ? 'online' : 'pending');

function generateQRCode(): void {
  if (canvasRef.value) {
    QRCode.toCanvas(canvasRef.value, props.base64, function (error) {
      if (error) console.error(error);
      console.log('QR code generado con éxito!');
    });
  }
}

onMounted(() => {
  generateQRCode();
});

watch(() => props.base64, () => {
  generateQRCode();
});
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
            {{ statusMessage }}
          </span>
        </div>
      </template>
      <template #content>
        <div>
          <canvas ref="canvasRef"></canvas>
        </div>
      </template>
    </Card>
  </div>
</template>

<style lang="scss" scoped>
.qr-wrapper {
  width: 100%;
  max-width: 320px;
  .header {
    margin-bottom: 12px;
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
        margin-right: 8px;
      }
      .online {
        background: $light-green;
      }
      .pending {
        background: $light-yellow;
      }
    }
  }
}
</style>
