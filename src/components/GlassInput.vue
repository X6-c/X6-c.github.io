<template>
  <div class="glass-input-wrapper">
    <label v-if="label" class="glass-label">{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      class="glass-input"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string
  type?: string
  placeholder?: string
  label?: string
  disabled?: boolean
}

defineEmits<{
  'update:modelValue': [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  label: '',
  disabled: false
})
</script>

<style scoped>
.glass-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.glass-label {
  color: var(--glass-text-primary);
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
}

.glass-input {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  padding: 12px 16px;
  color: #2d2d2d;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;
  width: 100%;
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.05),
    inset 0 2px 4px rgba(255, 255, 255, 0.3);
}

[data-theme='dark'] .glass-input {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 0.9);
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.2),
    inset 0 2px 4px rgba(255, 255, 255, 0.1);
}

.glass-input::placeholder {
  color: var(--glass-text);
  opacity: 0.7;
}

.glass-input:focus {
  border-color: var(--accent-color);
  background: var(--card-hover);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1), inset 0 2px 4px rgba(0, 0, 0, 0.03);
}

.glass-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>