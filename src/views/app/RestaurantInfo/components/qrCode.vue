<script setup lang="ts">
import { onMounted, ref } from 'vue';
import QRCode from 'qrcode';
import Card from '@/components/Card.vue';

const props = defineProps({
  base64: {
    type: String,
    required: true
  }
});

const canvasRef = ref<HTMLCanvasElement | null>(null);

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
</script>

<template>
  <div class="qr-wrapper">
    <Card>
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
}
</style>
