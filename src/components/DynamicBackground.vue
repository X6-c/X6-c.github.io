<template>
  <canvas ref="canvas" class="dynamic-background"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

const canvas = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)
let particles: Particle[] = []
let animationId: number | null = null
const maxParticles = 80
const connectionDistance = 150
const mouseDistance = 200

const mouseX = ref(0)
const mouseY = ref(0)

const initCanvas = () => {
  const el = canvas.value
  if (!el) return

  el.width = window.innerWidth
  el.height = window.innerHeight
  ctx.value = el.getContext('2d')

  if (!ctx.value) {
    console.error('无法获取Canvas上下文')
    return
  }

  createParticles()
  animate()
}

const createParticles = () => {
  particles = []
  const el = canvas.value
  if (!el) return

  for (let i = 0; i < maxParticles; i++) {
    particles.push({
      x: Math.random() * el.width,
      y: Math.random() * el.height,
      vx: (Math.random() - 0.5) * 1,
      vy: (Math.random() - 0.5) * 1,
      radius: Math.random() * 2 + 1
    })
  }
}

const drawParticles = () => {
  const context = ctx.value
  const el = canvas.value
  if (!context || !el) return

  context.clearRect(0, 0, el.width, el.height)

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
  const particleColor = isDark ? 'rgba(129, 140, 248, 0.6)' : 'rgba(99, 102, 241, 0.4)'

  particles.forEach((particle, i) => {
    // 更新位置
    particle.x += particle.vx
    particle.y += particle.vy

    // 边界检测
    if (particle.x < 0 || particle.x > el.width) particle.vx *= -1
    if (particle.y < 0 || particle.y > el.height) particle.vy *= -1

    // 鼠标交互
    const dx = particle.x - mouseX.value
    const dy = particle.y - mouseY.value
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < mouseDistance) {
      const force = (mouseDistance - distance) / mouseDistance
      particle.x += (dx / distance) * force * 2
      particle.y += (dy / distance) * force * 2
    }

    // 绘制粒子
    context.beginPath()
    context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
    context.fillStyle = particleColor
    context.fill()

    // 连接附近的粒子
    for (let j = i + 1; j < particles.length; j++) {
      const other = particles[j]
      const dx2 = particle.x - other.x
      const dy2 = particle.y - other.y
      const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)

      if (distance2 < connectionDistance) {
        context.beginPath()
        context.moveTo(particle.x, particle.y)
        context.lineTo(other.x, other.y)
        const opacity = (1 - distance2 / connectionDistance) * 0.5
        context.strokeStyle = isDark
          ? `rgba(129, 140, 248, ${opacity * 0.15})`
          : `rgba(99, 102, 241, ${opacity * 0.1})`
        context.lineWidth = 0.5
        context.stroke()
      }
    }
  })
}

const animate = () => {
  drawParticles()
  animationId = requestAnimationFrame(animate)
}

const handleResize = () => {
  const el = canvas.value
  if (!el) return
  el.width = window.innerWidth
  el.height = window.innerHeight
  createParticles()
}

const handleMouseMove = (e: MouseEvent) => {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
}

onMounted(() => {
  initCanvas()
  window.addEventListener('resize', handleResize)
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<style scoped>
.dynamic-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}
</style>
