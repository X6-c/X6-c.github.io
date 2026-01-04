<template>
  <button
    :class="[
      'glass-button',
      {
        'glass-button-primary': variant === 'primary',
        'glass-button-secondary': variant === 'secondary',
        'glass-button-outline': variant === 'outline',
        'glass-button-danger': variant === 'danger',
        'glass-button-small': size === 'small',
        'glass-button-large': size === 'large'
      }
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger'
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
}

defineEmits<{
  click: [event: MouseEvent]
}>()

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  disabled: false,
  size: 'medium'
})
</script>

<style scoped>
.glass-button {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-backdrop);
  -webkit-backdrop-filter: var(--glass-backdrop);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 12px 24px;
  color: var(--glass-text-primary);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.glass-button:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px 0 rgba(31, 38, 135, 0.4);
}

.glass-button:active:not(:disabled) {
  transform: translateY(0);
}

.glass-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.glass-button-primary {
  background: rgba(102, 126, 234, 0.3);
  border-color: rgba(102, 126, 234, 0.5);
}

.glass-button-primary:hover:not(:disabled) {
  background: rgba(102, 126, 234, 0.4);
}

.glass-button-secondary {
  background: rgba(240, 147, 251, 0.3);
  border-color: rgba(240, 147, 251, 0.5);
}

.glass-button-secondary:hover:not(:disabled) {
  background: rgba(240, 147, 251, 0.4);
}

.glass-button-outline {
  background: transparent;
  border-color: var(--glass-border);
}

.glass-button-outline:hover:not(:disabled) {
  background: var(--glass-bg);
}

.glass-button-danger {
  background: rgba(239, 68, 68, 0.3);
  border-color: rgba(239, 68, 68, 0.5);
}

.glass-button-danger:hover:not(:disabled) {
  background: rgba(239, 68, 68, 0.4);
}

/* Size variants */
.glass-button-small {
  padding: 8px 16px;
  font-size: 14px;
}

.glass-button-large {
  padding: 16px 32px;
  font-size: 18px;
}
</style>