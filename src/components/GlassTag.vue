<template>
  <span 
    class="glass-tag"
    :class="{ 'glass-tag-clickable': clickable }"
    @click="$emit('click', $event)"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
interface Props {
  clickable?: boolean
}

defineEmits<{
  click: [event: MouseEvent]
}>()

withDefaults(defineProps<Props>(), {
  clickable: false
})
</script>

<style scoped>
.glass-tag {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: var(--glass-backdrop);
  -webkit-backdrop-filter: var(--glass-backdrop);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 12px;
  color: #4a4a4a;
  transition: all 0.3s ease;
  display: inline-block;
  white-space: nowrap;
}

.glass-tag-clickable {
  cursor: pointer;
}

.glass-tag-clickable:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: scale(1.05);
}
</style>