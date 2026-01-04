<template>
  <div class="particle-background">
    <canvas ref="canvas" class="particle-canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ParticleSystem } from '@/utils/particleSystem'

const canvas = ref<HTMLCanvasElement | null>(null)
let animationId: number | null = null
let particleSystem: ParticleSystem | null = null

const resizeCanvas = () => {
  if (particleSystem) {
    particleSystem.resize()
  }
}

const animate = () => {
  if (particleSystem) {
    particleSystem.animate()
    animationId = requestAnimationFrame(animate)
  }
}

onMounted(() => {
  if (!canvas.value) return

  particleSystem = new ParticleSystem(canvas.value)
  
  resizeCanvas()
  animate()

  window.addEventListener('resize', resizeCanvas)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<style scoped>
.particle-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
}

.particle-canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>