<template>
  <div 
    :class="[
      'glass-card',
      'glass-fade-in',
      { 'glass-hover': hoverable }
    ]"
    :style="{ 
      padding: padding,
      margin: margin,
      maxWidth: maxWidth 
    }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  hoverable?: boolean
  padding?: string
  margin?: string
  maxWidth?: string
}

withDefaults(defineProps<Props>(), {
  hoverable: true,
  padding: '24px',
  margin: '',
  maxWidth: ''
})
</script>

<style scoped>
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-backdrop);
  -webkit-backdrop-filter: var(--glass-backdrop);
  border-radius: 20px;
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
  transition: all 0.3s ease;
}

.glass-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px 0 rgba(31, 38, 135, 0.5);
}
</style>